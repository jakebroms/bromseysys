function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendNotificationEmail(env, { name, email, company, notes }) {
  if (!env.RESEND_API_KEY) return;

  const notesHtml = notes
    ? `<p><strong>Notes:</strong><br>${escapeHtml(notes).replaceAll("\n", "<br>")}</p>`
    : "";

  const html = `
    <p>New workflow audit request from the site:</p>
    <p>
      <strong>Name:</strong> ${escapeHtml(name)}<br>
      <strong>Email:</strong> ${escapeHtml(email)}<br>
      <strong>Company:</strong> ${escapeHtml(company || "—")}
    </p>
    ${notesHtml}
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Bromsey Systems <onboarding@resend.dev>",
      to: ["jakebromsey@gmail.com"],
      reply_to: email,
      subject: `New workflow audit request from ${name}`,
      html,
    }),
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let data;
  try {
    data = await request.json();
  } catch (err) {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  // Honeypot: bots tend to fill every field, humans never see this one.
  if ((data.website || "").trim() !== "") {
    return jsonResponse({ ok: true }, 200);
  }

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const company = (data.company || "").trim();
  const notes = (data.notes || "").trim();

  if (!name || !email) {
    return jsonResponse({ error: "Name and email are required." }, 400);
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return jsonResponse({ error: "Enter a valid email address." }, 400);
  }

  if (name.length > 200 || email.length > 200 || company.length > 200 || notes.length > 4000) {
    return jsonResponse({ error: "One of the fields is too long." }, 400);
  }

  const createdAt = new Date().toISOString();

  await env.DB.prepare(
    "INSERT INTO submissions (name, email, company, notes, created_at) VALUES (?, ?, ?, ?, ?)"
  )
    .bind(name, email, company, notes, createdAt)
    .run();

  try {
    await sendNotificationEmail(env, { name, email, company, notes });
  } catch (err) {
    // The submission is already saved in D1 — don't fail the request over a flaky email send.
    console.error("Resend notification failed:", err);
  }

  return jsonResponse({ ok: true }, 200);
}

export async function onRequestGet() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
