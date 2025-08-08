export async function POST(req) {
  const { name, suggestion } = await req.json();

  const response = await fetch("https://script.google.com/macros/s/AKfycbw80OJ1krxweCnSb47dlbsvguXDUO-zYgCf8bb5j6fiFWYIq0dIl_jZ6iXzFiyZmI7j/exec", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, suggestion }),
  });

  return new Response(await response.text(), {
    status: response.ok ? 200 : response.status,
  });
}
