# CITYLENS — CODEX NIGHTLINE OPERATING MANUAL
**Event:** Codex Nightline, Kochi Metro — 18 July 2026, sprint 11:00 PM–1:00 AM
**Builder:** You (solo). **Track:** 02 Civic & Community Tools. **Goal:** 1st place.
**Rule of the night:** ideas may be prepared beforehand; implementation starts at 11:00 PM. Your git log is your proof.

---

## PART 1 — YOUR COMPANY (7 roles, not 50)

You are the CEO. Codex is your entire staff, hired one role at a time via pre-written job briefs (prompts). You never improvise a prompt on the train — you paste, supervise, verify, commit.

| # | Role | Who runs it | When | Job brief |
|---|------|------------|------|-----------|
| 1 | CEO / Product | **You** | Whole night | Decide, cut scope, keep time, never code by hand |
| 2 | Architect | Codex session 1 | 0:00–0:05 | Scaffold repo per AGENTS.md, walking skeleton |
| 3 | Frontend Eng | Codex | 0:05–0:50 | Map, pins, report flow (P1, P2) |
| 4 | AI/Backend Eng | Codex | 0:50–1:20 | Vision triage API + fallback (P3, P4) |
| 5 | QA Eng | Codex (or gstack /review) | After EVERY feature | Test checklist, break it, fix it (P-QA) |
| 6 | Deploy Eng | You + Vercel CLI | Continuous | `git push` auto-deploys; verify on phone |
| 7 | Scribe | Codex | 1:40–1:45 | README, demo data check (P5) |

**Why sequential, not 50 parallel:** one repo + one reviewer (you) + train internet = parallel agents create merge conflicts and unreviewed slop. Garry Tan caps at 10–15 parallel sprints with desktop, fiber internet, and weeks of runway. You have 2 hours and 4G that dies between stations. Sequence wins. Your speed comes from **zero thinking time**, not parallelism.

**CEO operating rules (memorize):**
1. One feature per prompt. Commit after every green feature. `git commit -m "P2 done"` is your save point.
2. If a fix fails twice, STOP. Paste the E1 (investigate) prompt. Never let Codex thrash.
3. At every checkpoint time, compare against the runbook. Behind = execute the cut list, no debate.
4. You type prompts and test the app. You never write code by hand — at a Codex event, the AI-assisted git log is part of the judging story.
5. 1:40 AM: pencils down. A rehearsed demo of 4 features beats an unrehearsed demo of 6.

---

## PART 2 — TONIGHT (17 July) PREP CHECKLIST

Everything installable, configurable, or thinkable happens tonight. Tomorrow you only execute.

**Accounts & deploy rail (do first — needs internet):**
- [ ] GitHub: create empty **private** repo `citylens` (create it now; push starts only at 11 PM)
- [ ] Vercel: account ready, `npm i -g vercel`, `vercel login` on your laptop
- [ ] Vercel: create the project shell, add env var `OPENAI_API_KEY` (your key, with a few dollars of credit)
- [ ] Do ONE throwaway test deploy of a hello-world page + one serverless function that calls the vision API on a sample image. Confirm the full pipe works end to end. Then delete the code — keep the project + env var. This kills 90% of possible 12:30 AM deploy surprises.
- [ ] Confirm Codex CLI/desktop logged in, model = GPT‑5.5 medium default (extra-high reserved for one hard bug)

**gstack (optional, tonight only):**
- [ ] Skim `setup` script contents first (unofficial repo — read before running)
- [ ] `git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/gstack && cd ~/gstack && ./setup --host codex`
- [ ] Test that `/review` and `/investigate` load in Codex. If either fights you → uninstall, forget it, your prompts cover the same ground
- [ ] Do NOT set up /browse, /qa, GBrain, browser daemons — too much machinery for a train
- [ ] Optionally run `/office-hours` tonight against the CityLens pitch to sharpen it

**Assets folder (`~/nightline-kit/`) on laptop AND phone:**
- [ ] `AGENTS.md` (Part 4 below) — final text
- [ ] `PROMPTS.md` (Part 5 below) — final text
- [ ] `seed.json` — ~20 realistic Kochi reports, **8–10 clustered within ~500 m of Vyttila / Kaloor / Edappally / Aluva / Thrippunithura exits** (the station-radius reframe). Real lat/lngs from Google Maps, Malayalam + English descriptions, mixed categories/severities
- [ ] 6–8 test photos on your **phone**: real pothole, waterlogged patch, garbage, streetlight + 2 negatives (selfie, blank wall) to demo the rejection moment
- [ ] Demo script (Part 8) — printed or in notes app
- [ ] This manual on your phone

**Hardware:**
- [ ] Laptop fully charged + power bank + phone hotspot tested + backup SIM/second hotspot if possible
- [ ] Phone charged (it's your demo device and camera)
- [ ] Offline copies: Leaflet JS/CSS files downloaded into the kit folder (so the map works even if CDN is unreachable mid-train)

**Rehearsal (most important item):**
- [ ] One full dry run of the entire prompt sequence on your private CivicScan rehearsal build. Time each step. Fix any prompt that produced garbage. Sleep before 1 AM — tomorrow you're up till 5.

**Tomorrow 9:30–11:00 PM (check-in):** eat, bathroom, laptop on, hotspot on, kit folder open, empty repo cloned locally with AGENTS.md + PROMPTS.md + seed.json + Leaflet files copied in (files prepared ≠ implementation; commit nothing until 11:00). Listen to what others are building — only an improbable cluster of civic/flood projects flips you to the backup plan. Decide before boarding. Never look back.

---

## PART 3 — THE SPRINT RUNBOOK (11:00 PM – 1:00 AM)

| Clock | Phase | Action | Success gate |
|-------|-------|--------|--------------|
| 0:00–0:05 | Bootstrap | `git init`, commit kit files, paste **P0** | Page loads locally |
| 0:05–0:25 | Map | Paste **P1** | Dark map of Kochi, 20 seed pins, popups work → commit, `git push` (first deploy) |
| 0:25–0:50 | Report flow | Paste **P2** | Photo + GPS + severity + submit works on phone → commit, push |
| 0:50–1:20 | AI triage | Paste **P3**, then **P4** | Real photo → verified/classified/severity + drafted Malayalam+English complaint; selfie → rejected → commit, push |
| 1:20–1:30 | QA pass | Paste **P-QA** (or gstack `/review`) | All checklist items pass on the DEPLOYED URL from your phone |
| 1:30–1:40 | Polish | Paste **P5** | Filters, heatmap toggle, offline banner, README |
| 1:40–2:00 | FREEZE | No new code. Rehearse demo 3× on phone against production URL. Charge phone. | You can do the 90s demo without notes |

**Checkpoint law:** at 0:25, 0:50, and 1:20 — if behind, execute the cut list (Part 6) immediately.

---

## PART 4 — AGENTS.md (copy verbatim into repo root)

```markdown
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
```

---

## PART 5 — PROMPTS.md (the job briefs — paste in order)

### P0 — Architect: walking skeleton
> Read AGENTS.md fully. Create index.html (dark theme shell: header "CityLens — കൊച്ചിയുടെ കണ്ണ്", empty map div filling the viewport, floating "Report / റിപ്പോർട്ട്" button) and api/triage.js as a stub that returns a hardcoded valid JSON verdict per the schema in AGENTS.md. Wire Leaflet from /vendor. No features yet — I just need the page loading locally and deployable to Vercel unchanged. Create TODO.md listing the full plan: map+pins, report flow, real triage, offline mode, filters+heatmap.

### P1 — Frontend: living map
> Load seed.json and render every report as a Leaflet circle marker on a dark-tiles map centered on Kochi: color by category (palette in AGENTS.md), radius scaled by severity. Popup on tap: photo placeholder, category badge, severity dots, bilingual description, relative time. Add a legend. Must feel alive at first glance on a phone. Tell me the one-sentence test, update TODO.md.

### P2 — Frontend: report flow
> Add the report flow behind the Report button as a bottom sheet: (1) photo via `<input type=file accept=image/* capture=environment>`, preview it; (2) location from navigator.geolocation with a 5s timeout — on failure show a mini map to tap-set location (GPS dies inside trains; this fallback is mandatory); (3) severity 1–5 selector; (4) submit → POST photo (base64, client-side downscale to ≤1024px) + lat/lng + severity to /api/triage → show a "AI verifying… / AI പരിശോധിക്കുന്നു…" state → render the verdict card (stub verdict for now) → on verified, drop the new pin on the map live. One-sentence test. Update TODO.md.

### P3 — AI Eng: real triage
> Implement api/triage.js for real. Call the OpenAI vision model with the photo and this instruction: verify the image shows a genuine civic infrastructure problem visible in a public place (reject selfies, indoor scenes, memes, blank images — set verified:false with a clear reason); classify into the AGENTS.md categories; rate severity 1–5 from visual evidence only, with confidence 0–1; draft a formal, polite grievance to the Kochi Municipal Corporation in BOTH Malayalam and English including category, severity, coordinates, and timestamp, ready to send. Force JSON-only output matching the AGENTS.md schema exactly; parse defensively (strip fences, try/catch). 8-second timeout. Any failure → the offline JSON per AGENTS.md. One-sentence test. Update TODO.md.

### P4 — AI Eng: verdict UI + honest offline mode
> Wire the real verdict into the UI. Verified: green card — category, severity, confidence bar, both complaint drafts with a copy button each, pin drops with a subtle animation. Rejected: amber card — "✗ Not verified / സ്ഥിരീകരിച്ചിട്ടില്ല" + the AI's reason, no pin (this rejection is a feature, make it look intentional). Offline/timeout: dashed-border banner "Offline mode — report saved locally, AI verification pending / ഓഫ്‌ലൈൻ മോഡ്", queue the report in memory, auto-retry when back online. Never a raw error, never a fake verdict. One-sentence test. Update TODO.md.

### P-QA — QA Eng (run after P2 and after P4; also gstack /review if installed)
> Act as a hostile QA engineer on this codebase and the deployed URL. Walk every path: happy path; deny GPS permission; airplane mode mid-submit; huge photo; double-tap submit; rotate phone; popup on every seed pin; API timeout. List each bug with severity, then fix only the demo-breaking ones with minimal diffs. Do not refactor. Update TODO.md with anything left unfixed.

### P5 — Polish + Scribe
> Add: bilingual filter chips by category, a severity heatmap toggle (Leaflet circle overlay is fine), report count in the header, and smooth pin animation. Then write a README: one-line pitch, 3-step usage, architecture in 5 lines, "built in a 2-hour sprint aboard Kochi Metro at Codex Nightline" with the git log as evidence. Nothing else — feature freeze after this.

### E1 — Emergency: Investigate (any bug that survived 2 fixes) — or gstack /investigate
> STOP writing fixes. State three hypotheses for the root cause, ranked. Add targeted console.log/network evidence to confirm exactly one. Show me the evidence, then apply the single minimal fix for the confirmed cause only.

### E2 — Emergency: Cut to core (behind at 1:20)
> We are out of time. Strip to: map + seed pins + photo→triage→verdict card. Comment out everything else cleanly. The demo is those three things working flawlessly on a phone.

---

## PART 6 — CONTINGENCY PLAYBOOK

| Failure | Response |
|---------|----------|
| Codex unreachable (network dead) | It's temporary between stations — breathe, wait 2–3 min, switch hotspot. Meanwhile hand-test the last committed feature on the phone. This is why every prompt is small. |
| Vision API down/slow | Your offline mode IS the answer — demo it proudly: "the app degrades honestly." If down all night: set `DEMO_MODE=true` returning the P0 stub verdict, and SAY it's stubbed if asked. Never pass a stub off as live AI. |
| GPS fails in demo | Tap-the-map fallback (built in P2). Say: "GPS dies inside concrete and trains — so we built for that." Weakness → talking point. |
| Vercel deploy fails | Demo from `localhost` via laptop; phone joins the laptop's hotspot to hit the local server. Deployment is a bonus, not the demo. |
| Behind at 0:50 | Cut heatmap + filters now (they're P5 anyway). |
| Behind at 1:20 | Execute E2. Four features rehearsed > six features shaky. |
| Laptop dies | Power bank; worst case Codex mobile app for tiny fixes; the deployed URL still demos from your phone. |
| Rain at 3 AM (35% chance) | Umbrella in bag. If it rains during judging at Vyttila — a live waterlogging report at the station is the single best demo moment of the night. Rain is your co-founder. |
| Judges toggle airplane mode | Let them. The offline banner is your proudest screen. |

---

## PART 7 — DEPLOYMENT

1. Tonight: Vercel project exists, `OPENAI_API_KEY` env var set, test pipe verified, then emptied.
2. On train: first `git push` at ~0:25 (Vercel auto-deploys from GitHub). Every later push = new deploy. Production URL is fixed all night — put it in a QR code generated at 1:45 for judges' phones.
3. Verify every deploy from your PHONE on mobile data, not the laptop — that's the judge's experience.
4. Never demo localhost if the URL works; "deployed live from a moving train" is part of the pitch.

---

## PART 8 — THE 90-SECOND DEMO (memorize)

1. **(0–15s) Problem:** "Every one of us waded through a flooded street this month. Kochi doesn't lack complaints — it lacks structured, verified, actionable information. Complaints die in WhatsApp groups."
2. **(15–45s) Live moment:** open the deployed URL on your phone, photograph a REAL issue at Vyttila station area — there will be one — submit. "Ten seconds for the citizen. Now watch the AI: verified ✓, classified, severity rated, and a formal grievance drafted to the Corporation in Malayalam and English." Pin drops on the map in the room.
3. **(45–60s) The rejection:** submit the selfie. "✗ Not verified. This is not a form with a map — the AI exercises judgment. No spam reaches the city."
4. **(60–80s) The station angle (to KMRL):** zoom the map to the route. "You can see inside your stations. Nobody can see the first 500 meters after the exit — the flooded ramp, the dead streetlight that decides whether people ride at all. Tonight, citizens became that sensor."
5. **(80–90s) Close:** "One page, one function, one AI call doing four jobs — built in two hours on your train, and the git log proves it. CityLens: കൊച്ചിയുടെ കണ്ണ് — Kochi's eyes."

**Q&A armor:** Why no database? — "Every piece of infrastructure we didn't build is ten minutes we got back and one less thing that dies at 12:40 AM on a moving train; the pin schema drops into Postgres in an afternoon." What if people fake reports? — "That's exactly what the verification layer is for; next step is cross-report corroboration by location." Why not the existing corporation portal? — "We don't replace it — we're the structured, verified front door that feeds it."

---

## PART 9 — ANALYSIS AGAINST YOUR GOAL (honest)

**Goal:** 1st of 100 curated builders.

**What this plan gets right:**
- *Preparation asymmetry* — your real edge. Most of the 100 will spend 20–30 min of the sprint deciding and prompt-improvising. You spend 0. That's ~25% more effective build time, legally.
- *Judge fit* — the community's stated taste is domain agents + multimodal reasoning with real-world constraints. CityLens's verify/reject/severity/draft pipeline is visible AI judgment, not a wrapper; the rejection moment is engineered for exactly these judges.
- *Demo variance* — offline mode, GPS fallback, seed data, and a feature freeze at 1:40 make the 3 AM demo nearly unkillable. Most winners are decided by who *didn't* crash.
- *Story* — live report at the venue + station-radius framing + "built on your train" = the media byte.

**Residual risks you cannot prompt away:**
1. *Train connectivity* is the #1 threat — every AI call and deploy needs it. Mitigated (small tasks, commits, offline mode, dual hotspots), not eliminated.
2. *Civic-track crowding* — flooding is on everyone's mind in July. Your differentiators if neighbors overlap: the rejection moment, the bilingual complaint drafts, and the station framing. The check-in listening window is your only intel op; use it.
3. *Judge subjectivity* — no plan guarantees 1st. This plan maximizes the controllable: felt problem, visible AI, unkillable demo, retellable story.
4. *You at 3 AM* — the biggest single variable is the pitch, delivered by a person awake for 20 hours. That's why the demo script is memorized tonight and rehearsed thrice at 1:45, not improvised.

**Verdict:** the "prepared company" philosophy is your winning move — at 7 roles, not 50. Execute tonight's checklist completely (especially the Vercel test-pipe and the full dry run), and you walk on that train as the only builder among 100 who is purely executing while everyone else is still thinking.

One train. One night. കൊച്ചിയുടെ കണ്ണ്. Go win it.
