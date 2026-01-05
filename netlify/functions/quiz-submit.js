const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const APPS_SCRIPT_URL = process.env.GSCRIPT_WEBAPP_URL;

const corsHeaders = (origin, requestHeaders = '') => ({
  'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': requestHeaders || 'Content-Type',
  Vary: 'Origin',
});

const getRequestOrigin = (event) => {
  const directOrigin = event.headers?.origin;
  if (directOrigin) return directOrigin;

  const referer = event.headers?.referer;
  if (!referer) return '';

  try {
    return new URL(referer).origin;
  } catch {
    return '';
  }
};

const isOriginAllowed = (origin) => {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.length === 0) return true; // default to permissive if not configured
  return ALLOWED_ORIGINS.includes(origin);
};

exports.handler = async (event) => {
  const origin = getRequestOrigin(event);
  const requestHeaders = event.headers?.['access-control-request-headers'];

  if (!isOriginAllowed(origin)) {
    return {
      statusCode: 403,
      headers: corsHeaders(origin || '', requestHeaders),
      body: JSON.stringify({ error: 'Origin not allowed' }),
    };
  }

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders(origin, requestHeaders),
      body: 'OK',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders(origin, requestHeaders),
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  if (!APPS_SCRIPT_URL) {
    return {
      statusCode: 500,
      headers: corsHeaders(origin, requestHeaders),
      body: JSON.stringify({ error: 'Apps Script URL is not configured' }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (error) {
    return {
      statusCode: 400,
      headers: corsHeaders(origin, requestHeaders),
      body: JSON.stringify({ error: 'Invalid JSON payload' }),
    };
  }

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: corsHeaders(origin, requestHeaders),
        body: JSON.stringify({ error: 'Failed to submit quiz data' }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: corsHeaders(origin, requestHeaders),
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: corsHeaders(origin, requestHeaders),
      body: JSON.stringify({ error: 'Proxy request failed' }),
    };
  }
};
