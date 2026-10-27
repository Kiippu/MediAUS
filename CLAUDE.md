# MediAUS: notes for Claude

Read the "MediAUS technical handover" doc first, then the "MediAUS data provenance plan". Read the source pack before changing data.

## Data model (`app/data/`)
- `sources.js`: SOURCES. One record per document revision: title, label, short, kind, tier, revised, read, url, status.
- `facts/<medicine>.js`: fact tables. One record per displayed line or table cell. The id prefix names the table (`TABLES` in `core.js`).
- `meds.js`: medicine skeletons. Structure, order and the app's own words only (form names, dose set names, headings). Fact ids, never clinical text.
- `reviews.js`: SME sign-off sessions.
- `resolve.js`: builds `MEDIAUS_DATA` for `app.js`. Every object it builds carries `_f`, the fact id behind it.

Every fact: `status` (draft | verify | signed | gap | demo | retired), `pop`, `changed` (YYYY-MM-DD), `cites: [{ src, loc?, as?, note?, broad? }]`, `lookIn: [source ids]`, `review`. Then the fields for its kind.

## Rules
- Every clinical or regulatory fact shown is a fact record with cites. No source yet: status `verify` or `gap`, with `lookIn` naming where to look.
- Cite inside text only with `[n]` markers (n = position in `cites`). Never type "(PI 4.2)" or "(to verify)" into text; the To verify tag comes from status.
- A new document, or a new revision of one, gets a new source id.
- Ids are permanent. Never reuse or renumber; next id = highest in that prefix + 1. Removing a fact = status `retired`.
- Any edit to a fact: set `changed` to today. A signed fact goes back to `draft`.
- `signed` only with a `review` dated on or after `changed`, citing sources marked read.
- `broad: true` = the cite came from a block's source list in the migration. Replace it with the exact section when you can.
- Sources conflict: one POS fact per source. Don't pick one.
- Routes differ by brand: BRD facts on the route.
- Forms are physical forms (tablet, injection), never routes.
- Rephrase, don't copy. Facts only; no PI/CMI text pasted.
- Keep comments short.

## Code
- Vanilla JS, no build. Views return HTML strings; clicks go through `data-act="name:arg"`.
- Source lines come from `provLine(ids, title)`; tapping one opens the Sources (trail) screen for those facts.
- New data file: add it to `app/index.html` and to `ASSETS` in `app/sw.js`.
- Bump `CACHE` in `app/sw.js` when shipping changes.
- Test: `python -m http.server 8090 -d app`, then `python tests/test_provenance.py`, `python tests/test_routes.py` and `python tests/test_population.py`.

## Team
Dev (software engineer) and SME (registered nurse). The SME signs off clinical data.
