# MediAUS

Prototype PWA for looking up Australian medicines: forms, routes, administration, dosing, interactions, pregnancy and breastfeeding, pill identifier and barcode scanner.

**Draft data. Not for clinical use.** Items marked "To verify" are unconfirmed.

## Run

- Windows: double-click `Start MediAUS.bat` (LAN, http) or `Start MediAUS (HTTPS).bat` (Cloudflare quick tunnel). See `README.txt`.
- Anywhere: `python -m http.server 8090 -d app`, then open http://localhost:8090.

## Layout

| Path | What |
| --- | --- |
| `app/index.html` | Shell. Loads the data files, then `app.js` |
| `app/data/` | Sources, fact tables, medicine skeletons, reviews; `resolve.js` builds `window.MEDIAUS_DATA`. Rules in `CLAUDE.md` |
| `app/app.js` | UI: state, views, router, event delegation |
| `app/styles.css` | Base styles (most styling is inline in `app.js`) |
| `app/sw.js` | Service worker, network first. Bump `CACHE` on release |
| `app/test-barcodes.html` | Sample EAN-13 codes for scanner testing |
| `serve.ps1`, `https.ps1` | Windows static server and tunnel |
| `tests/` | Playwright tests, including `test_provenance.py` (every fact has a source trail) |
| `migrations/` | One-off data migrations, kept as a record |

Docs (design, pillars, business, budget, handover, sources) live as Claude Docs artifacts. See `CLAUDE.md`.
