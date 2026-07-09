function jsonResponse(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
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

  return jsonResponse({ ok: true }, 200);
}

export async function onRequestGet() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
