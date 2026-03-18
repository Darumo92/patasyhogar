export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://patasyhogar.com',
  };

  try {
    const body = await request.json();
    const email = body.email?.trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Email no válido' }),
        { status: 400, headers }
      );
    }

    const apiKey = env.MAILERLITE_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Servicio no configurado' }),
        { status: 500, headers }
      );
    }

    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        groups: env.MAILERLITE_GROUP_ID ? [env.MAILERLITE_GROUP_ID] : [],
      }),
    });

    const data = await res.json();

    if (res.ok) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers }
      );
    }

    // MailerLite returns 422 for already subscribed — treat as success
    if (res.status === 422) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers }
      );
    }

    return new Response(
      JSON.stringify({ error: data.message || 'Error al suscribir' }),
      { status: res.status, headers }
    );
  } catch {
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500, headers }
    );
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': 'https://patasyhogar.com',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
