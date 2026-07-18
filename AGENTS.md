# CityLens — AGENTS.md

## What this is
CityLens: a citizen photographs a civic problem in Kochi; AI verifies it,
classifies it, rates severity, and drafts a formal complaint to Kochi Municipal
Corporation in Malayalam + English; verified reports appear as pins on a live map.
Built solo in a 2-hour hackathon sprint on a moving metro train.

## Architecture (deliberately boring — do not add to it)
- ONE static page: index.html (HTML + CSS + vanilla JS, no framework, no build step)
- ONE serverless function: api/triage.js (Vercel, Node 20) — the only backend
- Leaflet for the map, loaded from local files in /vendor (NOT CDN)
- seed.json: demo reports loaded at startup; new reports held in memory only
- NO database, NO auth, NO accounts, NO npm dependencies in the frontend

## The one external dependency
api/triage.js calls the OpenAI vision API (key in env var OPENAI_API_KEY).
It must ALWAYS return valid JSON matching:
{ "verified": bool, "category": "waterlogging|pothole|streetlight|garbage|fallen_tree|other",
  "severity": 1-5, "confidence": 0-1, "reason": str,
  "complaint_en": str, "complaint_ml": str }
On ANY error or timeout (8s cap): return { "verified": null, "offline": true }
and the frontend shows a labeled OFFLINE MODE banner — never a fake verdict,
never a crash. Honesty over fakery: judges will toggle airplane mode.

## Working rules
- Small diffs. One feature per request. Never refactor unrelated code.
- After each feature, state exactly how to test it in one sentence.
- Update TODO.md yourself after every task: done / remaining / known bugs.
- Mobile-first: the demo runs on a phone. Test at 390px width mentally.
- Dark theme. Category colors: waterlogging #38bdf8, pothole #f59e0b,
  streetlight #facc15, garbage #4ade80, fallen_tree #a78bfa, other #94a3b8.
- All user-facing text bilingual: English + Malayalam.
- If a fix fails twice, stop and explain three hypotheses before touching code.
