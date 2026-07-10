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

async function sendNotificationEmail(env, { name, email, company, notes, type }) {
  if (!env.RESEND_API_KEY) return;

  const label = type === "ai-brain" ? "AI Brain — Knowledge Layer" : "Workflow Audit";

  const notesHtml = notes
    ? `<p><strong>Notes:</strong><br>${escapeHtml(notes).replaceAll("\n", "<br>")}</p>`
    : "";

  const html = `
    <p>New ${escapeHtml(label)} request from the site:</p>
    <p>
      <strong>Name:</strong> ${escapeHtml(name)}<br>
      <strong>Email:</strong> ${escapeHtml(email)}<br>
      <strong>Company:</strong> ${escapeHtml(company || "—")}
    </p>
    ${notesHtml}
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Bromsey Systems <notify@bromseysystems.com>",
      to: ["jakebromsey@gmail.com"],
      reply_to: email,
      subject: `New ${label} request from ${name}`,
      html,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend notification failed: ${response.status} ${await response.text()}`);
  }
}

async function sendConfirmationEmail(env, { name, email }) {
  if (!env.RESEND_API_KEY) return;

  const firstName = name.split(" ")[0];

  const html = `
    <p>Hi ${escapeHtml(firstName)},</p>
    <p>Thanks for reaching out to Bromsey Systems. We've received your request and will take a look — expect to hear from us soon.</p>
    <p>— Bromsey Systems</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Bromsey Systems <hello@bromseysystems.com>",
      to: [email],
      subject: "Thanks for reaching out to Bromsey Systems",
      html,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend confirmation failed: ${response.status} ${await response.text()}`);
  }
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
  const type = data.type === "ai-brain" ? "ai-brain" : "workflow-audit";

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

  // The submission is already saved in D1 — a flaky email send should never fail the request,
  // and one email failing shouldn't stop the other from going out.
  const emailResults = await Promise.allSettled([
    sendNotificationEmail(env, { name, email, company, notes, type }),
    sendConfirmationEmail(env, { name, email }),
  ]);
  emailResults.forEach(result => {
    if (result.status === "rejected") {
      console.error("Resend email failed:", result.reason);
    }
  });

  return jsonResponse({ ok: true }, 200);
}

export async function onRequestGet() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
