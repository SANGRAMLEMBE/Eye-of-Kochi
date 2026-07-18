# CityLens — കൊച്ചിയുടെ കണ്ണ്

**Photograph a civic problem in Kochi → AI verifies it, classifies it, rates severity, and drafts a formal complaint to Kochi Municipal Corporation in Malayalam + English → verified reports appear live on the city map.**

🔴 Live: https://citylens-gold.vercel.app

## Use it in 3 steps
1. Tap **Report / റിപ്പോർട്ട്** and photograph the problem (pothole, waterlogging, dead streetlight, garbage, fallen tree)
2. Confirm location — GPS, or tap the mini-map when GPS dies (it does, inside trains and concrete)
3. Submit. The AI verifies the photo is a genuine public civic issue, classifies it, rates severity 1–5, and drafts a ready-to-send bilingual grievance. Verified reports drop as a pin on the live map — selfies and fakes are rejected with a reason.

## Why the AI matters
This is not a form with a map. One vision call exercises judgment four ways: **verify** (rejects selfies, indoor scenes, memes — no spam reaches the city), **classify**, **rate severity from visual evidence**, and **draft** formal Malayalam + English complaints. If the network dies mid-submit, the app degrades honestly: a labeled offline banner, the report queued locally — never a fake verdict, never a crash.

## Architecture (deliberately boring)
- One static page: `index.html` — vanilla HTML/CSS/JS, no framework, no build step
- One serverless function: `api/triage.js` (Vercel, Node 20) — the only backend, calls the OpenAI vision API with an 8s cap and a fail-safe offline response
- Leaflet served from local `/vendor` files (CDN-proof on a moving train)
- `seed.json` demo reports at startup; live reports held in memory
- No database, no auth, no npm frontend dependencies

## The station angle
KMRL can see inside its stations — nobody can see the first 500 meters after the exit: the flooded ramp, the dead streetlight that decides whether people ride at all. CityLens turns citizens into that sensor. Zoom the map: reports cluster around Vyttila, Kaloor, Edappally, Aluva, Thrippunithura.

## Provenance
Built **solo in the 2-hour sprint aboard a moving Kochi Metro train** at **Codex Nightline** (18 July 2026, Track 02 — Civic & Community Tools). The git log is the proof: every feature is a timestamped commit made between Vyttila and Aluva.
