# MediAUS: notes for Claude

Read the "MediAUS technical handover" doc first. Then the source pack before changing data.

## Rules
- Every fact in `data.js` has a source. No source = `verify: true` or status `unverified`.
- Sources conflict: show each position with its source (`positions[]`). Don't pick one.
- Routes differ by brand: use `brands[]` on the route.
- Forms are physical forms (tablet, injection), never routes.
- Rephrase, don't copy. Facts only; no PI/CMI text pasted.
- Keep comments short.

## Code
- Vanilla JS, no build. Views return HTML strings; clicks go through `data-act="name:arg"`.
- Bump `CACHE` in `app/sw.js` when shipping changes.
- Test: `python -m http.server 8090 -d app` then `python tests/test_routes.py`.

## Team
Dev (software engineer) and SME (registered nurse). The SME signs off clinical data.
