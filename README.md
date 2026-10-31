# Spark AI Matrix — responsible community AI adoption simulator and research breakdown

An interactive adoption simulator and research breakdown for the Spark AI Matrix
proposal: a disability-led, community-first approach to AI adoption — build the
conditions (accessible learning with human support, solar-powered offline-first
community centres, disability-led creators and local jobs, clear safety rules)
instead of just handing out tools.

## What this site is

- An **interactive simulator**: adjust community conditions and see how an
  adoption profile changes, with scenario summaries tailored to government,
  business, education, disability advocacy, and community organization
  perspectives.
- A **research breakdown**: the proposal's commitments (A: access and capacity,
  B: local economy, C: agency and safety, D: evidence), safety guardrails, and
  scrutiny prompts for local testing.
- A **prototype, not a promise**: the proposal needs scrutiny, local testing,
  and a responsible pilot before any scale-up claim.

## Evidence labels

Claims on this site are labelled **measured**, **reported**, or **synthetic**.
Simulator scores are **synthetic and illustrative** — they are not measured
evidence. Commitment C (agency and safety) is labelled synthetic: no
measurement, sample, or source is cited for it in this repository. (Its tag was
corrected from `measured` to `synthetic` in the repo-gaps PR; commitments A and
B carry `reported` tags that are likewise unverified in-repo and are flagged
for review, not silently changed.)

## Run it

```sh
npm install
npm run dev      # local development server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Structure

- `index.html` — page shell
- `src/app.js` — simulator, scenarios, commitments, guardrails
- `src/styles.css` — styles
- `dist/` — built output
- `TODO.md` — delivered-outcomes checklist
- `spark-ai-matrix-site.zip` — packaged site archive

## Links

- Framework proposal (Zenodo): https://doi.org/10.5281/zenodo.23644437
- Scholarly overview (Muse page):
  https://muse.ai/s/spark-ai-matrix-canada-io6jcxxmx0xzf2/oiQCc4O9UGjVPtn-GEwdQapFx9VKh06NxOT7StSh1vQ
- Author site: https://sparkainlpx.xyz

## Claims discipline

No partnership, funding, or endorsement is claimed here — not by any
organization, funder, or platform named anywhere in the proposal. No pilot,
customer, revenue, or measured outcome is claimed. Everything the simulator
shows is synthetic unless a label says otherwise.

## Licence

AGPL-3.0-only. See `LICENSE`.
