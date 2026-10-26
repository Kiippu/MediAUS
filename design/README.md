# Design previews

Redesigned Search and Interactions views, matched to the Home page. Not loaded by the app yet.

- `search.js`, `check.js`: drop-in replacements for `viewSearch` and `viewCheck` (same vanilla style).
- `harness.js`, `shell.html`: preview-only page frame with a Redesign / Current toggle.
- Build a preview: `python design/build.py search out.html` (or `check`). Inlines `app/styles.css`, `app/data.js` and helpers from `app/app.js`.

To port: new state `area`, `adding`; new actions `area`, `sclear`, `qclear`, `adding`, `medtab`.
Browse-by-area groups are a draft for SME sign-off. Checker pairs are still demo data.
