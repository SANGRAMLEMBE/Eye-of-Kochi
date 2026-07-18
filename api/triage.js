const CATEGORIES = ['waterlogging', 'pothole', 'streetlight', 'garbage', 'fallen_tree', 'other'];

const OFFLINE = { verified: null, offline: true };

const clamp = (value, min, max, fallback) => {
  const n = Number(value);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
};

function parseVerdict(text) {
  const cleaned = String(text || '').replace(/```(?:json)?/gi, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('no JSON object in reply');
  const raw = JSON.parse(cleaned.slice(start, end + 1));
  return {
    verified: raw.verified === true,
    category: CATEGORIES.includes(raw.category) ? raw.category : 'other',
    severity: clamp(raw.severity, 1, 5, 3),
    confidence: clamp(raw.confidence, 0, 1, 0.5),
    reason: String(raw.reason || '').slice(0, 500),
    complaint_en: String(raw.complaint_en || ''),
    complaint_ml: String(raw.complaint_ml || '')
  };
}

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    response.status(405).json(OFFLINE);
    return;
  }
  const { photo, lat, lng, severity } = request.body || {};
  if (!photo || typeof photo !== 'string' || !photo.startsWith('data:image/')) {
    response.status(200).json(OFFLINE);
    return;
  }

  const timestamp = new Date().toISOString();
  const coords = `${clamp(lat, -90, 90, 9.9816).toFixed(5)}, ${clamp(lng, -180, 180, 76.2999).toFixed(5)}`;
  const instruction = [
    'You are the triage engine for CityLens, a civic reporting app for Kochi, India.',
    'Look at the photo and decide if it shows a GENUINE civic infrastructure problem visible in a public place.',
    'Reject selfies, portraits, indoor scenes, memes, screenshots, blank or unclear images: set verified=false with a clear one-sentence reason.',
    `If genuine, classify into exactly one of: ${CATEGORIES.join(', ')}.`,
    'Rate severity 1-5 from visual evidence only, and your confidence 0-1.',
    `The citizen rated severity ${clamp(severity, 1, 5, 3)}/5; trust the photo over the citizen.`,
    'If verified, draft a formal, polite grievance to the Kochi Municipal Corporation in BOTH English (complaint_en) and Malayalam (complaint_ml).',
    `Each complaint must mention the category, severity, coordinates (${coords}) and timestamp (${timestamp}), and be ready to send as-is.`,
    'If not verified, complaint_en and complaint_ml must be empty strings.',
    'Reply with ONLY a JSON object, no prose, no code fences, exactly these keys:',
    '{"verified": true|false, "category": "waterlogging|pothole|streetlight|garbage|fallen_tree|other", "severity": 1-5, "confidence": 0-1, "reason": "...", "complaint_en": "...", "complaint_ml": "..."}'
  ].join('\n');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.TRIAGE_MODEL || 'gpt-4o-mini',
        temperature: 0.2,
        max_tokens: 900,
        response_format: { type: 'json_object' },
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: instruction },
            { type: 'image_url', image_url: { url: photo, detail: 'low' } }
          ]
        }]
      })
    });
    if (!apiResponse.ok) throw new Error(`OpenAI ${apiResponse.status}`);
    const payload = await apiResponse.json();
    const verdict = parseVerdict(payload.choices?.[0]?.message?.content);
    response.status(200).json(verdict);
  } catch (error) {
    console.error('triage failed:', error.message);
    response.status(200).json(OFFLINE);
  } finally {
    clearTimeout(timer);
  }
};
