export async function POST(req) {
  try {
    const payload = await req.json();

    // только нужные поля
    const clean = {
      createdAt: payload.createdAt || new Date().toISOString(),
      lang: payload.lang || "",
      serviceCategory: payload.serviceCategory || "",
      serviceOtherText: payload.serviceOtherText || "",
      package: payload.package || "",
      carBrand: payload.carBrand || "",
      carModel: payload.carModel || "",
      carYear: payload.carYear || "",
      carColor: payload.carColor || "",
      name: payload.name || "",
      phone: payload.phone || "",
      comment: payload.comment || "",
      website: "",
    };

    const endpoint = process.env.QUIZ_APPS_SCRIPT_ENDPOINT;
    if (!endpoint) {
      return Response.json({ ok: false, error: "Missing QUIZ_APPS_SCRIPT_ENDPOINT" }, { status: 500 });
    }

    const r = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clean),
    });

    const text = await r.text();

    // пытаемся вернуть JSON
    try {
      return Response.json(JSON.parse(text), { status: r.status });
    } catch {
      return Response.json({ ok: r.ok, raw: text }, { status: r.status });
    }
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
