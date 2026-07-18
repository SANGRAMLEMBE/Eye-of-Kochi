# CityLens — PROMPTS.md (paste in order, one at a time)

## P0 — Architect: walking skeleton (0:00–0:05)
Read AGENTS.md fully. Create index.html (dark theme shell: header "CityLens — കൊച്ചിയുടെ കണ്ണ്", empty map div filling the viewport, floating "Report / റിപ്പോർട്ട്" button) and api/triage.js as a stub that returns a hardcoded valid JSON verdict per the schema in AGENTS.md. Wire Leaflet from /vendor. No features yet — I just need the page loading locally and deployable to Vercel unchanged. Create TODO.md listing the full plan: map+pins, report flow, real triage, offline mode, filters+heatmap.

## P1 — Frontend: living map (0:05–0:25)
Load seed.json and render every report as a Leaflet circle marker on a dark-tiles map centered on Kochi: color by category (palette in AGENTS.md), radius scaled by severity. Popup on tap: photo placeholder, category badge, severity dots, bilingual description, relative time. Add a legend. Must feel alive at first glance on a phone. Tell me the one-sentence test, update TODO.md.

## P2 — Frontend: report flow (0:25–0:50)
Add the report flow behind the Report button as a bottom sheet: (1) photo via `<input type=file accept=image/* capture=environment>`, preview it; (2) location from navigator.geolocation with a 5s timeout — on failure show a mini map to tap-set location (GPS dies inside trains; this fallback is mandatory); (3) severity 1–5 selector; (4) submit → POST photo (base64, client-side downscale to ≤1024px) + lat/lng + severity to /api/triage → show a "AI verifying… / AI പരിശോധിക്കുന്നു…" state → render the verdict card (stub verdict for now) → on verified, drop the new pin on the map live. One-sentence test. Update TODO.md.

## P3 — AI Eng: real triage (0:50–1:20)
Implement api/triage.js for real. Call the OpenAI vision model with the photo and this instruction: verify the image shows a genuine civic infrastructure problem visible in a public place (reject selfies, indoor scenes, memes, blank images — set verified:false with a clear reason); classify into the AGENTS.md categories; rate severity 1–5 from visual evidence only, with confidence 0–1; draft a formal, polite grievance to the Kochi Municipal Corporation in BOTH Malayalam and English including category, severity, coordinates, and timestamp, ready to send. Force JSON-only output matching the AGENTS.md schema exactly; parse defensively (strip fences, try/catch). 8-second timeout. Any failure → the offline JSON per AGENTS.md. One-sentence test. Update TODO.md.

## P4 — AI Eng: verdict UI + honest offline mode (0:50–1:20)
Wire the real verdict into the UI. Verified: green card — category, severity, confidence bar, both complaint drafts with a copy button each, pin drops with a subtle animation. Rejected: amber card — "✗ Not verified / സ്ഥിരീകരിച്ചിട്ടില്ല" + the AI's reason, no pin (this rejection is a feature, make it look intentional). Offline/timeout: dashed-border banner "Offline mode — report saved locally, AI verification pending / ഓഫ്‌ലൈൻ മോഡ്", queue the report in memory, auto-retry when back online. Never a raw error, never a fake verdict. One-sentence test. Update TODO.md.

## P-QA — QA Eng (run after P2 and after P4; also gstack /review if installed)
Act as a hostile QA engineer on this codebase and the deployed URL. Walk every path: happy path; deny GPS permission; airplane mode mid-submit; huge photo; double-tap submit; rotate phone; popup on every seed pin; API timeout. List each bug with severity, then fix only the demo-breaking ones with minimal diffs. Do not refactor. Update TODO.md with anything left unfixed.

## P5 — Polish + Scribe (1:30–1:40)
Add: bilingual filter chips by category, a severity heatmap toggle (Leaflet circle overlay is fine), report count in the header, and smooth pin animation. Then write a README: one-line pitch, 3-step usage, architecture in 5 lines, "built in a 2-hour sprint aboard Kochi Metro at Codex Nightline" with the git log as evidence. Nothing else — feature freeze after this.

## E1 — Emergency: Investigate (any bug that survived 2 fixes) — or gstack /investigate
STOP writing fixes. State three hypotheses for the root cause, ranked. Add targeted console.log/network evidence to confirm exactly one. Show me the evidence, then apply the single minimal fix for the confirmed cause only.

## E2 — Emergency: Cut to core (behind at 1:20)
We are out of time. Strip to: map + seed pins + photo→triage→verdict card. Comment out everything else cleanly. The demo is those three things working flawlessly on a phone.
