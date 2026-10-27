/* One-off migration (27 Oct 2026): app/data.js (old nested data) -> fact tables + skeletons.
   Kept as the record of how every fact got its id, cites and status. Do not re-run on edited data.

   git show 2bf353f:app/data.js > old-data.js
   node migrations/2026-10-27-provenance/convert.js old-data.js app/data

   Guarantees, checked at the end:
   - every displayed string renders back exactly (citation markers [n] re-render to the old labels),
     except "(to verify)" suffixes, which become status 'verify' and show as the To verify tag;
   - every fact has cites, or is a gap / verify fact with somewhere to look, or is demo. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execSync } = require('child_process');

const [OLD, OUT] = process.argv.slice(2);
const ROOT = path.resolve(__dirname, '../..');
const DATE_MIGRATED = '2026-10-27';
const BASE = '2bf353f'; // last commit with the old data.js

// ---------- load old data and the new source registry ----------
const ctx = {};
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(OLD, 'utf8'), ctx);
const OLDD = JSON.parse(JSON.stringify(ctx.window.MEDIAUS_DATA));
vm.runInContext(fs.readFileSync(path.join(ROOT, 'app/data/core.js'), 'utf8'), ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'app/data/sources.js'), 'utf8'), ctx);
const SOURCES = JSON.parse(JSON.stringify(ctx.window.MEDIAUS.db.SOURCES));
const SRC_OLD = (() => { // the old SRC map, read from the file
  const m = fs.readFileSync(OLD, 'utf8').match(/var SRC = (\{[\s\S]*?\n  \});/);
  return vm.runInNewContext('(' + m[1] + ')');
})();

// ---------- git blame: date each old line was last changed ----------
const OLD_LINES = fs.readFileSync(OLD, 'utf8').split('\n');
const BLAME = (() => {
  const out = execSync('git blame --line-porcelain ' + BASE + ' -- app/data.js', { cwd: ROOT, encoding: 'utf8', maxBuffer: 1e8 });
  const dates = []; let t = null;
  out.split('\n').forEach(l => {
    if (l.startsWith('author-time ')) t = new Date(+l.slice(12) * 1000 + 11 * 3600e3).toISOString().slice(0, 10); // AEDT
    else if (l.startsWith('\t')) dates.push(t);
  });
  return dates;
})();
let cursor = 0;
function changedOf(needle) {
  const lit = "'" + needle + "'";
  for (let pass = 0; pass < 2; pass++) {
    const from = pass ? 0 : cursor;
    for (let i = from; i < OLD_LINES.length; i++) {
      if (OLD_LINES[i].includes(lit) || (needle.length > 25 && OLD_LINES[i].includes(needle))) { cursor = i; return BLAME[i]; }
    }
  }
  return BLAME[cursor];
}

// ---------- source lookups ----------
const S = id => { if (!SOURCES[id]) throw new Error('no source ' + id); return id; };
const LONG = {}; // old long label -> source id (context free)
Object.entries({
  cordarone: 'S-cordarone-pi-2026-05', aratac: 'S-aratac-pi-2022-01', alphamox: 'S-alphamox-pi-2026-09', alphamoxCmi: 'S-alphamox-cmi-2026-09',
  fisamox: 'S-fisamox-pi-2022-07', anmfAmio: 'S-anmf-amiodarone-2026-02', anmfDig: 'S-anmf-digoxin-2021-04', pchAmio: 'S-pch-amiodarone-2025',
  pchDig: 'S-pch-digoxin-2025', rchAmio: 'S-rch-amiodarone', rchDig: 'S-rch-digoxin', rchAmox: 'S-rch-amoxicillin', seslhd: 'S-seslhd-amiodarone-iv-2025',
  anzcor: 'S-anzcor-11-5-2025-04', anzcorPaed: 'S-anzcor-12-2-2026-04', ibiamoxCmi: 'S-ibiamox-cmi-2015'
}).forEach(([k, id]) => { LONG[SRC_OLD[k]] = S(id); });
const PER_MED = { // old labels that mean a different document per medicine (and form)
  amiodarone: { lactmed: ['S-lactmed-amiodarone-2025-09'], artg: ['S-artg-15359'] },
  digoxin: { lactmed: ['S-lactmed-digoxin'], artg: ['S-artg-40661', 'S-artg-11108', 'S-artg-lanoxin-250'],
    hd: { tab: ['S-hd-sigmaxin', 'S-hd-sigmaxin-pg'], liquid: ['S-hd-lanoxin-elixir'], inj: ['S-hd-lanoxin-adult', 'S-hd-lanoxin-infants'] } },
  amoxicillin: { lactmed: ['S-lactmed-amoxicillin-2026-06'], artg: ['S-artg-amoxicillin'], pbs: ['S-pbs-amoxicillin'],
    hd: { liquid: ['S-hd-cilamox'], inj: ['S-hd-ibiamox'] } }
};
// Short labels used inside text, per medicine (and form). A list = first gets the marker, the rest are cited too.
function aliases(med, form) {
  const A = {
    amiodarone: { 'PI': ['S-cordarone-pi-2026-05'], 'PCH': ['S-pch-amiodarone-2025'], 'RCH': ['S-rch-amiodarone'], 'ANMF': ['S-anmf-amiodarone-2026-02'],
      'SESLHD': ['S-seslhd-amiodarone-iv-2025'], 'ANZCOR 11.5': ['S-anzcor-11-5-2025-04'], 'ANZCOR 12.2': ['S-anzcor-12-2-2026-04'],
      'ANZCOR': ['S-anzcor-11-5-2025-04', 'S-anzcor-12-2-2026-04'], 'LactMed': ['S-lactmed-amiodarone-2025-09'] },
    digoxin: { 'PCH': ['S-pch-digoxin-2025'], 'RCH': ['S-rch-digoxin'], 'ANMF': ['S-anmf-digoxin-2021-04'], 'LactMed': ['S-lactmed-digoxin'],
      'ARTG': (PER_MED.digoxin.hd[form] || []) },
    amoxicillin: { 'PI': form === 'inj' ? ['S-fisamox-pi-2022-07'] : ['S-alphamox-pi-2026-09'], 'Fisamox PI': ['S-fisamox-pi-2022-07'],
      'Alphamox PI': ['S-alphamox-pi-2026-09'], 'RCH': ['S-rch-amoxicillin'], 'LactMed': ['S-lactmed-amoxicillin-2026-06'],
      'Ibiamox CMI (2015)': ['S-ibiamox-cmi-2015'], 'ARTG (healthdirect)': ['S-hd-ibiamox'], 'ARTG': (PER_MED.amoxicillin.hd[form] || []) }
  }[med];
  Object.keys(A).forEach(k => { if (!A[k].length) delete A[k]; });
  return A;
}
const short = id => SOURCES[id].short;

// ---------- tokenizer: citation labels inside text -> [n] markers ----------
const LOC = '\\d+(?:\\.\\d+)?(?:, \\d+\\.\\d+)*';
function tokenize(text, med, form, opts) {
  opts = opts || {};
  const A = aliases(med, form);
  const keys = Object.keys(A).sort((a, b) => b.length - a.length).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const left = opts.and ? '(?<=^|\\(|, |; |\\. | and )' : '(?<=^|\\(|, |; |\\. )';
  const right = opts.and ? '(?=\\)|,|:|;|\\.(?: |$)| \\(| and |$)' : '(?=\\)|,|:|;|\\.(?: |$)| \\(|$)';
  const re = new RegExp(left + '(' + keys.join('|') + ')(?: (' + LOC + '))?' + right, 'g');
  const cites = [];
  const out = text.replace(re, (m, label, loc) => {
    // a loc only belongs to PI-like labels; "ANZCOR 11.5" carries its number in the label
    const ids = A[label];
    const c = { src: ids[0] };
    if (loc) c.loc = loc;
    if (label !== short(ids[0])) c.as = label;
    cites.push(c);
    const n = cites.length;
    ids.slice(1).forEach(x => cites.push({ src: x, unmarked: true }));
    return '[' + n + ']';
  });
  // unmarked extras go after marked ones so marker numbers stay valid
  const marked = [], extra = [];
  cites.forEach(c => (c.unmarked ? extra : marked).push(c));
  const remap = {}; let i = 0;
  cites.forEach((c, k) => { if (!c.unmarked) remap[k + 1] = ++i; });
  const text2 = out.replace(/\[(\d+)\]/g, (m, n) => '[' + remap[n] + ']');
  extra.forEach(c => delete c.unmarked);
  return { text: text2, cites: marked.concat(extra) };
}
function label(c) { return (c.as || short(c.src)) + (c.loc ? ' ' + c.loc : ''); }
function render(text, cites) { return text.replace(/\[(\d+)\]/g, (m, n) => label(cites[n - 1])); }

// ---------- long source strings (route, dose set, tab source lines) ----------
const LOOKIN_TEXT = {
  'Don’t Rush to Crush': ['S-drtc'], 'TGA pregnancy database': ['S-tga-pregnancy-db'], 'Lanoxin PI': ['S-lanoxin-pi'],
  'Lanoxin Paediatric Elixir CMI': ['S-lanoxin-elixir-cmi'], 'Cilamox PI': ['S-cilamox-pi']
};
function parseLong(str, med, form) {
  const r = { cites: [], lookIn: [], col: {}, notes: [] };
  if (!str || str === '—') return r;
  str.split(' · ').forEach(part => parsePart(part, null));
  return r;
  function push(c, col) { if (col) (r.col[col] = r.col[col] || []).push(c); else r.cites.push(c); }
  function parsePart(p, col) {
    let m;
    if ((m = p.match(/^(Adult|Child|Newborn): (.*)$/))) return parsePart(m[2], m[1].toLowerCase());
    if ((m = p.match(/^Needs (.*)$/))) return r.lookIn.push(...LOOKIN_TEXT[m[1]]);
    if (p === 'to verify') return (r.col[col + ':gap'] = med === 'digoxin' ? ['S-lanoxin-pi'] : []); // "As for tablets": tablet doses await the Lanoxin PI
    if ((m = p.match(/^to verify \((.*)\)$/))) return (r.col[col + ':gap'] = LOOKIN_TEXT[m[1]]);
    if ((m = p.match(/^To verify: (Lanoxin PI) section (\d+)$/))) return r.lookIn.push({ src: 'S-lanoxin-pi', loc: m[2] });
    if ((m = p.match(/^To verify: (.*)$/))) return r.lookIn.push(...LOOKIN_TEXT[m[1]]);
    if (p === 'items marked “to verify” are unconfirmed') return;
    if (p === 'others to verify against the Lanoxin PI') return (r.othersLookIn = ['S-lanoxin-pi']);
    if (p === 'reconstitution and storage to verify (Cilamox PI)') return (r.othersLookIn = ['S-cilamox-pi']);
    if (p === 'FSRH guidance (contraceptives)') return push({ src: 'S-fsrh-2022-05', note: 'contraceptives' }, col);
    if (p === 'Sample') return push({ src: 'S-demo' }, col);
    if ((m = p.match(/^(.*) \((adult|child|newborn)\)$/))) {
      if (m[1].includes(' and ')) return m[1].split(' and ').forEach(x => parsePart(x, m[2]));
      return parsePart(m[1], m[2]);
    }
    if ((m = p.match(/^(.*) \((amiodarone|same amoxicillin doses)\)$/))) { parsePart(m[1], col); const last = col ? r.col[col].at(-1) : r.cites.at(-1); last.note = m[2]; return; }
    if ((m = p.match(/^(.*) \((Australian guidelines such as eTG may recommend higher doses)\)$/))) { r.notes.push(m[2]); return parsePart(m[1], col); }
    if (p === 'healthdirect (ARTG data)') return PER_MED[med].hd[form].forEach(id => push({ src: id }, col));
    if (p === 'ARTG (TGA)') return PER_MED[med].artg.forEach(id => push({ src: id }, col));
    if (p === 'LactMed (US National Library of Medicine)') return PER_MED[med].lactmed.forEach(id => push({ src: id }, col));
    if (p === 'PBS Schedule') return PER_MED[med].pbs.forEach(id => push({ src: id }, col));
    if ((m = p.match(/^PBS Schedule items? (.*)$/))) return m[1].split(', ').forEach(n => push({ src: S('S-pbs-' + n) }, col));
    const lab = Object.keys(LONG).sort((a, b) => b.length - a.length).find(l => p === l || p.startsWith(l + ' '));
    if (lab) {
      const loc = p.slice(lab.length).trim();
      const c = { src: LONG[lab] };
      if (loc) { if (!new RegExp('^' + LOC + '$').test(loc)) throw new Error('bad loc "' + loc + '" in ' + p); c.loc = loc; }
      return push(c, col);
    }
    throw new Error('unparsed source part: "' + p + '" (' + med + '/' + form + ')');
  }
}
// short source strings (prep entries): "PI 4.2, RCH, ANMF" -> cites; must be fully covered
function parseShort(str, med, form) {
  const t = tokenize(str, med, form);
  if (!/^\[\d+\](, \[\d+\])*$/.test(t.text)) throw new Error('short src not fully parsed: "' + str + '" -> ' + t.text);
  if (render(t.text, t.cites) !== str) throw new Error('short src round trip: ' + str);
  return t.cites;
}

// ---------- per-text corrections found in review ----------
// Citations written as prose ("The PI advises", "Alphamox PI doses") are not markers; add them as cites.
const EXTRA = {
  'ARTG; Alphamox PI doses': ['S-alphamox-pi-2026-09'],
  'ARTG; Alphamox PI doses under 20 kg': ['S-alphamox-pi-2026-09'],
  'Alphamox PI: data too limited for a neonatal dose.': ['S-alphamox-pi-2026-09'],
  'ARTG route: intravenous': ['S-hd-ibiamox'],
  'Acceptable in nursing mothers (LactMed). Small amounts pass into milk; occasional rash, diarrhoea or thrush in the baby. The PI advises caution.': ['S-alphamox-pi-2026-09'],
  'ARTG lists IV only. Lanoxin Adult PI not read.': ['S-hd-lanoxin-adult'],
  'ARTG. Preparation and rate not verified: needs the Lanoxin Adult PI.': [],
  'amiodarone|Not in the PI.': ['S-cordarone-pi-2026-05'],
  'amoxicillin|Not in the PI.': ['S-fisamox-pi-2022-07'],
  'The PI does not mention IM.': ['S-cordarone-pi-2026-05'],
  'The PI does not mention SC.': ['S-cordarone-pi-2026-05'],
  'Not recommended. The Fisamox PI does not mention SC.': ['S-rch-amoxicillin', 'S-fisamox-pi-2022-07'],
  'PCH lists only the elixir and injection. Tablet use in children not found.': ['S-pch-digoxin-2025'],
  'PCH lists only the elixir and injection; no tablet guidance found. Consider the elixir.': ['S-pch-digoxin-2025'],
  'PCH and ANMF do not require routine pre-dose pulse checks in children.': ['S-pch-digoxin-2025', 'S-anmf-digoxin-2021-04'],
  'PCH advice (children). No adult source found; it applies to the solution itself.': ['S-pch-amiodarone-2025'],
  'PCH advice (children). Not covered by ANMF.': ['S-pch-amiodarone-2025'],
  'PCH covers enteral use but gives no tube instructions; ANMF does not mention tubes.': ['S-pch-digoxin-2025', 'S-anmf-digoxin-2021-04'],
  'RCH gives a maximum strength. The PI has no neonatal data.': ['S-rch-amoxicillin', 'S-fisamox-pi-2022-07'],
  'PCH doses are for enteral use; PCH lists the elixir, not tablets.': ['S-pch-digoxin-2025'],
  'Not stated in ANZCOR 11.5. Check the local resuscitation protocol.': ['S-anzcor-11-5-2025-04'],
  'Bag volume not stated in the Fisamox PI. Check the Australian Injectable Drugs Handbook.': ['S-fisamox-pi-2022-07'],
  'Rate not found. The PI has no neonatal data. Check ANMF Amoxicillin.': ['S-fisamox-pi-2022-07'],
  'ANMF Digoxin v2.0 was due for review in April 2026.': ['S-anmf-digoxin-2021-04'],
  'The PI does not recommend amiodarone in children; child doses come from hospital guidelines.': ['S-cordarone-pi-2026-05'],
  'The PI does not recommend amiodarone in children and contraindicates the injection in neonates (benzyl alcohol). Child and newborn doses come from hospital guidelines.': ['S-cordarone-pi-2026-05'],
  'The CMI says to swallow whole. No document supports opening the capsule. Use the oral liquid if swallowing is a problem.': ['S-alphamox-cmi-2026-09'],
  'Not covered by the PI, PCH, ANMF or SESLHD documents.': [],
  'Both products are listed as intravenous on the ARTG. The infant injection is ten times weaker than the adult injection.': [],
  'Sources differ by group. Both products are listed on the ARTG as IV only.': [],
  'Licensed for Fisamox. Sources differ for Ibiamox. Painful.': [],
  'Not covered by ANMF.': ['S-anmf-amiodarone-2026-02'],
  'Not in ANMF.': ['S-anmf-digoxin-2021-04']
};
// Where to look, read from gap text.
const LOOKIN_RE = [
  [/Don’t Rush to Crush/, 'S-drtc'], [/Lanoxin Adult PI|Lanoxin PI|Lanoxin or Sigmaxin PI/, 'S-lanoxin-pi'], [/Sigmaxin PI/, 'S-sigmaxin-pi'],
  [/Australian Injectable Drugs Handbook/, 'S-aidh'], [/ANMF Amoxicillin|Check ANMF\./, 'S-anmf-amoxicillin'],
  [/local resuscitation protocol/, 'S-local-resus'], [/Check PCH/, 'S-pch-amiodarone-2025'], [/TGA pregnancy database/, 'S-tga-pregnancy-db'],
  [/PCH IV loading dose/, 'S-pch-digoxin-2025']
];
function lookInFromText(t) { const out = []; LOOKIN_RE.forEach(([re, id]) => { if (re.test(t) && out.indexOf(id) < 0) out.push(id); }); return out; }

// "(to verify)" style suffixes become status 'verify'.
const VERIFY_SUFFIX = [/ \((?:t|T)o verify\)(?=\.?$)/, / — to verify$/];
function stripVerify(t) {
  for (const re of VERIFY_SUFFIX) if (re.test(t)) return { text: t.replace(re, ''), verify: true };
  return { text: t, verify: false };
}

// ---------- fact minting ----------
const COUNT = {};
const FILES = {}; // medId -> [ [id, record], ... ]
const REPORT = [];
let curMed = null;
function mint(prefix, rec, needle, original) {
  COUNT[prefix] = (COUNT[prefix] || 0) + 1;
  const id = prefix + '-' + String(COUNT[prefix]).padStart(4, '0');
  if (!rec.changed) rec.changed = needle ? changedOf(needle) : BLAME[cursor];
  (FILES[curMed] = FILES[curMed] || []).push([id, rec]);
  if (original !== undefined) REPORT.push({ id, original, rec });
  return id;
}
const uniq = cs => { const seen = new Set(); return cs.filter(c => { const k = JSON.stringify(c); if (seen.has(k)) return false; seen.add(k); return true; }); };
const broad = cs => cs.map(c => Object.assign({}, c, { broad: true }));

// Text fact: markers from the text, else inherited block cites (broad).
// Prose that names documents as a list, not as citations: no markers, cite them all.
const NO_TOKEN = {
  'Not covered by the PI, PCH, ANMF or SESLHD documents.': ['S-cordarone-pi-2026-05', 'S-pch-amiodarone-2025', 'S-anmf-amiodarone-2026-02', 'S-seslhd-amiodarone-iv-2025']
};
function textFact(text, med, form, inherit, opts) {
  opts = opts || {};
  if (NO_TOKEN[text]) return { text, cites: NO_TOKEN[text].map(src => ({ src })), verify: false, lookIn: lookInFromText(text) };
  const v = stripVerify(text);
  const t = tokenize(v.text, med, form, opts);
  let cites = t.cites;
  const extra = EXTRA[med + '|' + text] || EXTRA[text] || EXTRA[v.text];
  if (extra) cites = cites.concat(extra.map(src => ({ src })));
  if (!cites.length && inherit && !opts.noInherit) cites = broad(inherit);
  return { text: t.text, cites: uniq(cites), verify: v.verify || !!opts.verify, lookIn: lookInFromText(v.text) };
}
function envelope(rec, status, cites, lookIn, extra) {
  const o = Object.assign({ status }, extra || {});
  if (rec.pop !== undefined) { o.pop = rec.pop; delete rec.pop; }
  Object.assign(o, rec);
  if (cites && cites.length) o.cites = cites;
  if (lookIn && lookIn.length) o.lookIn = lookIn;
  return o;
}
function statusOf(f, gap) {
  if (f.verify) return 'verify';
  if (gap) return 'gap';
  return f.cites.length ? 'draft' : 'gap';
}

// ---------- walk each medicine ----------
const SKELS = [];
OLDD.ORDER.forEach(mid => {
  const m = OLDD.MEDS[mid];
  curMed = mid;
  cursor = OLD_LINES.findIndex(l => l.includes('// ') && l.toUpperCase().includes(mid.toUpperCase()));
  const sk = { id: mid };

  // identity
  const ov = parseLong(m.src.overview, mid, null);
  sk.identity = {};
  ['name', 'cls', 'chips', 'brands', 'atc', 'schedule', 'pbs'].forEach(k => {
    const needle = Array.isArray(m[k]) ? m[k][0] : m[k];
    sk.identity[k] = mint('IDN', { status: 'draft', field: k, value: m[k], cites: broad(ov.cites) }, needle, m[k]);
  });

  // pregnancy and breastfeeding
  const pg = parseLong(m.src.pregnancy, mid, null);
  const pgCites = pg.cites.filter(c => !/lactmed/.test(c.src)), bfCites = pg.cites.filter(c => /lactmed/.test(c.src));
  {
    const p = m.pregnancy, f = textFact(p.text, mid, null, pgCites);
    const verify = /to verify/i.test(p.text) || pg.lookIn.length > 0;
    const rec = { cat: p.cat }; if (p.label) rec.label = p.label; rec.tone = p.tone; rec.text = f.text;
    sk.pregnancy = mint('PRG', envelope(rec, verify ? 'verify' : statusOf(f), f.cites, uniq(pg.lookIn.concat(f.lookIn))), p.text, p.text);
  }
  {
    const b = m.breastfeeding, f = textFact(b.text, mid, null, bfCites.concat(pgCites));
    const rec = { label: b.status, tone: b.tone, text: f.text };
    sk.breastfeeding = { main: mint('BRF', envelope(rec, statusOf(f), f.cites), b.text, b.text) };
    if (b.positions) sk.breastfeeding.positions = b.positions.map(p => positionFact(p, mid, null, []));
  }

  // forms
  sk.forms = m.forms.map(f => {
    const fs_ = { id: f.id, label: f.label, pops: f.pops };
    fs_.info = mint('FRM', { status: 'draft', unit: f.unit, strengths: f.strengths, cites: broad(ov.cites) }, f.unit, f.unit + ' | ' + f.strengths);
    fs_.appearance = f.appearance.map(a => {
      const pl = parseLong(a.src, mid, f.id);
      const rec = { label: a.label, shape: a.shape, colors: a.colors };
      if (a.imprint !== undefined) rec.imprint = a.imprint;
      if (a.scored !== undefined) rec.scored = a.scored;
      if (a.size) rec.size = a.size;
      rec.desc = a.desc;
      const st = a.verify ? 'verify' : (pl.cites.length ? 'draft' : 'gap');
      return mint('APP', envelope(rec, st, pl.cites, pl.lookIn), a.label, a.desc);
    });
    fs_.routes = f.routes.map(r => routeSkel(r, mid, f.id));
    fs_.dosing = f.dosing.map(d => doseSkel(d, mid, f.id));
    return fs_;
  });

  // interactions
  const ip = parseLong(m.src.interactions, mid, null);
  const intFact = (o, important) => {
    const f = textFact(o.text, mid, null, null);
    let cites = f.cites, lookIn = f.lookIn, verify = f.verify || /\(To verify\)$/.test(o.text);
    let text = f.text.replace(/ \(To verify\)$/, '');
    if (!cites.length) {
      if (mid === 'digoxin') {
        if (/amiodarone/i.test(o.text)) cites = ip.cites.slice(); else lookIn = ['S-lanoxin-pi'];
      } else cites = broad(ip.cites);
    }
    if (o.positions) cites = uniq([].concat(...o.positions.map(p => p.src === 'UK FSRH guidance' ? [{ src: 'S-fsrh-2022-05' }] : parseLong(p.src, mid, null).cites))); // the conflict's sources
    if (verify && !cites.length && !lookIn.length && mid === 'amiodarone') lookIn = ['S-cordarone-pi-2026-05'];
    const rec = { sev: o.sev };
    if (o.title) rec.title = o.title;
    rec.text = text;
    rec.with = checkerIds(mid, (o.title || '') + ' ' + o.text);
    const st = verify ? 'verify' : (o.positions ? 'draft' : statusOf({ cites, verify: false }));
    const id = mint('INT', envelope(rec, st, cites, lookIn), o.text, o.text);
    if (o.positions) return { id, positions: o.positions.map(p => positionFact(p, mid, null, [])) };
    return id;
  };
  sk.interactions = { important: m.interactions.important.map(o => intFact(o, true)), other: m.interactions.other.map(o => intFact(o, false)) };

  // safety lists
  const mo = parseLong(m.src.more, mid, null);
  sk.safety = {};
  ['contraindications', 'caution', 'warnings', 'monitoring'].forEach(list => {
    sk.safety[list] = m[list].map(t => {
      const f = textFact(t, mid, null, mo.cites);
      let lookIn = f.lookIn;
      if (f.verify && mo.othersLookIn) { f.cites = f.cites.filter(c => !c.broad); lookIn = mo.othersLookIn; }
      if (f.verify && !f.cites.length && !lookIn.length) lookIn = mo.cites.map(c => c.src);
      return mint('SAF', envelope({ list, text: f.text }, statusOf(f), f.cites, lookIn), t, t);
    });
  });
  SKELS.push(sk);
});

function checkerIds(mid, text) {
  const t = text.toLowerCase();
  const CM = { amiodarone: 'Amiodarone', digoxin: 'Digoxin', warfarin: 'Warfarin', amoxicillin: 'Amoxicillin', furosemide: 'Furosemide', verapamil: 'Verapamil',
    simvastatin: 'Simvastatin', methotrexate: 'Methotrexate', coc: 'Oral Contraceptive', paracetamol: 'Paracetamol' };
  return Object.keys(CM).filter(k => k !== mid && t.indexOf(CM[k].toLowerCase()) >= 0);
}

function positionFact(p, mid, form, inherit) {
  // heading: the old src label. A full source label -> no heading (drawn from the source).
  let cites, heading;
  const full = Object.keys(LONG).includes(p.src) || p.src === SRC_OLD.lactmed || p.src === 'UK FSRH guidance';
  if (full) {
    cites = parseLong(p.src === 'UK FSRH guidance' ? 'FSRH guidance (contraceptives)' : p.src, mid, form).cites;
    if (p.src === 'UK FSRH guidance') { cites = [{ src: 'S-fsrh-2022-05' }]; }
  } else {
    const t = tokenize(p.src, mid, form, { and: true });
    if (render(t.text, t.cites) !== p.src) throw new Error('heading round trip ' + p.src);
    heading = t.text; cites = t.cites;
  }
  const f = textFact(p.text, mid, form, null);
  cites = uniq(cites.concat(f.cites));
  const rec = {}; if (p.pop) rec.pop = p.pop; if (heading) rec.heading = heading; rec.text = f.text;
  return mint('POS', envelope(rec, statusOf({ cites, verify: f.verify }), cites, f.lookIn), p.text, p.text);
}

function routeSkel(r, mid, fid) {
  const rs = { id: r.id, cat: r.cat };
  const L = parseLong(r.src, mid, fid);
  const inherit = L.cites;
  const lookAll = uniq((L.lookIn || []).concat(L.othersLookIn || []));
  // headline
  {
    const rec = { label: r.label, use: r.status };
    if (r.statusNote) rec.statusNote = r.statusNote;
    let cites = L.cites.slice(), lookIn = lookAll.slice();
    if (r.summary) {
      const f = textFact(r.summary, mid, fid, null);
      rec.summary = f.text;
      cites = uniq(f.cites.concat(cites)); // summary markers first, so [n] stays valid
      lookIn = uniq(lookIn.concat(f.lookIn));
    }
    if (r.positionsTitle) rec.positionsTitle = r.positionsTitle;
    const gap = r.status === 'unverified' && !L.cites.length;
    rs.head = mint('RTE', envelope(rec, gap ? 'gap' : (cites.length ? 'draft' : 'gap'), cites, lookIn), r.label, r.label + ' | ' + (r.summary || ''));
  }
  if (r.pops) {
    rs.pops = {};
    Object.keys(r.pops).forEach(g => {
      const x = r.pops[g];
      const f = textFact(x.note || '', mid, fid, null);
      let cites = f.cites;
      const marked = /\[\d+\]/.test(f.text);
      if (!cites.length && x.status !== 'unverified' && x.status !== 'na') cites = broad(inherit);
      if (!cites.length && x.status === 'na') cites = broad(inherit);
      let lookIn = f.lookIn;
      if (x.status === 'unverified' && !lookIn.length && !marked) lookIn = lookAll;
      const st = f.verify ? 'verify' : (x.status === 'unverified' && !marked ? 'gap' : (cites.length ? 'draft' : 'gap'));
      const rec = { pop: g, use: x.status }; if (x.note) rec.note = f.text;
      rs.pops[g] = mint('ROU', envelope(rec, st, cites, lookIn), x.note || r.label, g + ': ' + (x.note || ''));
    });
  }
  if (r.brands) rs.brands = r.brands.map(b => {
    const f = textFact(b.note, mid, fid, inherit);
    return mint('BRD', envelope({ brand: b.brand, use: b.status, note: f.text }, statusOf(f), f.cites, f.lookIn), b.note, b.brand + ': ' + b.note);
  });
  if (r.prep) {
    rs.prep = {};
    ['reconstitute', 'dilute', 'give'].forEach(step => {
      if (!r.prep[step]) return;
      rs.prep[step] = r.prep[step].map(e => {
        const rec = {}; if (e.pop !== undefined) rec.pop = e.pop;
        let cites = e.src ? parseShort(e.src, mid, fid) : [];
        let st, lookIn = [], needle;
        if (e.missing) {
          const f = textFact(e.missing, mid, fid, null);
          rec.missing = f.text; cites = uniq(cites.concat(f.cites)); lookIn = f.lookIn; st = 'gap'; needle = e.missing;
        } else if (e.none) {
          rec.none = e.none; needle = e.none;
          if (!cites.length) cites = broad(inherit);
          st = 'draft';
        } else if (e.pump) {
          rec.pump = e.pump; rec.derived = 'Pump rate worked out from the volume and times the source states.'; needle = e.src; st = 'draft';
        } else {
          const f = textFact(e.text, mid, fid, null, { noInherit: true });
          rec.text = f.text; cites = uniq(cites.concat(f.cites)); needle = e.text; st = f.verify ? 'verify' : 'draft';
        }
        if (!cites.length && st !== 'gap') throw new Error('prep without cites ' + JSON.stringify(e));
        return mint('PRP', envelope(rec, st, cites, lookIn, { step }), needle, e.text || e.none || e.missing || JSON.stringify(e.pump));
      });
    });
  }
  if (r.positions) rs.positions = r.positions.map(p => positionFact(p, mid, fid, inherit));
  if (r.items) rs.items = r.items.map(a => {
    const f = textFact(a.text, mid, fid, inherit);
    const rec = {}; if (a.pop !== undefined) rec.pop = a.pop;
    rec.label = a.label; rec.tone = a.status; rec.text = f.text;
    let lookIn = f.lookIn, cites = f.cites;
    const verify = f.verify || a.verify;
    if (verify && L.othersLookIn) lookIn = uniq(lookIn.concat(L.othersLookIn));
    return mint('ADM', envelope(rec, verify ? 'verify' : statusOf(f), cites, lookIn), a.text, a.text);
  });
  return rs;
}

function doseSkel(d, mid, fid) {
  const L = parseLong(d.src, mid, fid);
  const ds = { id: d.id, label: d.label, head: d.head };
  const colOf = h => /^Adult/.test(h) ? 'adult' : /^Child/.test(h) ? 'child' : /^Newborn/.test(h) ? 'newborn' : null;
  const all = uniq(L.cites.concat(...Object.keys(L.col).filter(k => !k.includes(':')).map(k => L.col[k])));
  ds.rows = d.rows.map(row => row.map((cell, i) => {
    if (i === 0) {
      return mint('DOS', envelope({ role: 'use', text: cell }, all.length ? 'draft' : 'gap', broad(all), []), cell, cell);
    }
    if (cell === '—') return null;
    const col = colOf(d.head[i]);
    const colCites = uniq(L.cites.concat(L.col[col] || []));
    const f = textFact(cell, mid, fid, colCites);
    const gapCol = L.col[col + ':gap'];
    const isGap = /^(To verify|Not covered|No dose)|Check /.test(f.text);
    let lookIn = f.lookIn;
    if (gapCol && !lookIn.length) lookIn = gapCol.slice();
    if ((f.verify || isGap) && !lookIn.length && gapCol) lookIn = gapCol;
    let cites = f.cites;
    if (gapCol && !/\[\d+\]/.test(f.text)) cites = cites.filter(c => !c.broad); // adult column had no document
    const st = f.verify ? 'verify' : (isGap || !cites.length ? 'gap' : 'draft');
    if (st !== 'draft' && !lookIn.length && !cites.length) lookIn = [];
    return mint('DOS', envelope({ role: 'cell', col, text: f.text }, st, cites, lookIn), cell, cell);
  }));
  const notes = (d.notes || []).concat(L.notes.map(n => n + '.'));
  ds.notes = notes.map(n => {
    const isETG = /eTG/.test(n);
    const f = textFact(n, mid, fid, isETG ? null : all);
    if (isETG) return mint('DOS', envelope({ role: 'note', text: f.text }, 'verify', [], ['S-etg']), 'eTG', n);
    return mint('DOS', envelope({ role: 'note', text: f.text }, statusOf(f), f.cites, f.lookIn), n, n);
  });
  return ds;
}

// ---------- demo sets ----------
curMed = 'demo';
cursor = OLD_LINES.findIndex(l => l.includes('var OTHERS'));
const DEMO = { S: [{ src: 'S-demo' }] };
const SETS = {};
SETS.OTHERS = OLDD.OTHERS.map(o => mint('OTH', { status: 'demo', name: o.name, cls: o.cls, schedule: o.schedule, routes: o.routes, cites: DEMO.S }, o.name, o.name));
SETS.EXTRA_PILLS = OLDD.EXTRA_PILLS.map(a => mint('APP', { status: 'demo', label: a.label, shape: a.shape, colors: a.colors, imprint: a.imprint, scored: a.scored, desc: a.desc, cites: DEMO.S }, a.label, a.desc));
SETS.BARCODES = Object.keys(OLDD.BARCODES).map(code => { const b = OLDD.BARCODES[code]; return mint('BAR', Object.assign({ status: 'demo', code }, b, { cites: DEMO.S }), code, code); });
// checker lists lived in app.js; copied here verbatim
const APPJS = execSync('git show ' + BASE + ':app/app.js', { cwd: ROOT, encoding: 'utf8' });
const CHECK_MEDS = vm.runInNewContext('(' + APPJS.match(/var CHECK_MEDS = (\{[\s\S]*?\});/)[1] + ')');
const PAIRS = vm.runInNewContext('(' + APPJS.match(/var PAIRS = (\[[\s\S]*?\]);/)[1] + ')');
const APPJS_DATE = '2026-10-27';
SETS.CHECK_MEDS = Object.keys(CHECK_MEDS).map(k => mint('CKM', { status: 'demo', changed: APPJS_DATE, key: k, name: CHECK_MEDS[k], cites: DEMO.S }, null, CHECK_MEDS[k]));
SETS.CHECK_PAIRS = PAIRS.map(p => mint('CHK', Object.assign({ status: 'demo', changed: APPJS_DATE }, p, { cites: DEMO.S }), null, p.text));

// ---------- checks ----------
const ALL = {};
Object.values(FILES).forEach(list => list.forEach(([id, r]) => { ALL[id] = r; }));
const problems = [], nolead = [];
REPORT.forEach(({ id, original, rec }) => {
  const txt = rec.text !== undefined ? rec.text : rec.note !== undefined ? rec.note : rec.missing;
  if (txt === undefined || typeof original !== 'string') return;
  const back = render(txt, rec.cites || []);
  const orig = stripVerify(original).text.replace(/ \(To verify\)$/, '');
  const origOk = back === orig || back === original;
  if (!origOk && !(original.includes(' | ') || original.includes(': '))) problems.push(id + ' round trip:\n   was: ' + original + '\n   now: ' + back);
  (txt.match(/\[(\d+)\]/g) || []).forEach(mk => { if (!(rec.cites || [])[+mk.slice(1, -1) - 1]) problems.push(id + ' marker without cite ' + mk); });
});
Object.entries(ALL).forEach(([id, r]) => {
  if (!r.cites && !r.lookIn && r.status === 'gap') nolead.push(id);
  else if (!r.cites && !r.lookIn && r.status !== 'demo') problems.push(id + ' has no cites and nowhere to look: ' + JSON.stringify(r).slice(0, 160));
  (r.cites || []).forEach(c => { if (!SOURCES[c.src]) problems.push(id + ' unknown source ' + c.src); });
  (r.lookIn || []).forEach(c => { const s = typeof c === 'string' ? c : c.src; if (!SOURCES[s]) problems.push(id + ' unknown lookIn ' + s); });
});

// ---------- write files ----------
const q = s => JSON.stringify(s);
function lit(v) { // compact JS literal, single quotes
  if (Array.isArray(v)) return '[' + v.map(lit).join(', ') + ']';
  if (v && typeof v === 'object') return '{ ' + Object.keys(v).map(k => (/^[a-zA-Z_]\w*$/.test(k) ? k : q(k)) + ': ' + lit(v[k])).join(', ') + ' }';
  if (typeof v === 'string') return "'" + v.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
  return String(v);
}
const ORDER_KEYS = ['status', 'pop', 'step', 'role', 'col', 'list', 'field', 'changed', 'cites', 'lookIn'];
function factLine(id, r) {
  const keys = ORDER_KEYS.filter(k => k in r).concat(Object.keys(r).filter(k => ORDER_KEYS.indexOf(k) < 0));
  const o = {}; keys.forEach(k => { o[k] = r[k]; });
  return "  '" + id + "': " + lit(o);
}
const TITLE = { amiodarone: 'Amiodarone', digoxin: 'Digoxin', amoxicillin: 'Amoxicillin', demo: 'Demo data' };
fs.mkdirSync(path.join(OUT, 'facts'), { recursive: true });
Object.keys(FILES).forEach(mid => {
  const head = '/* ' + TITLE[mid] + ' facts. One record per displayed line. Fields: CLAUDE.md.\n' +
    '   Migrated from data.js on ' + DATE_MIGRATED + '. "changed" = date the line last changed (git). broad: true = cite came from the block\'s\n' +
    '   source line, not the line itself; narrow it to a section. Text markers [n] show cites[n-1]. */\n';
  fs.writeFileSync(path.join(OUT, 'facts', mid + '.js'), head + 'MEDIAUS.facts({\n' + FILES[mid].map(([id, r]) => factLine(id, r)).join(',\n') + '\n});\n');
});
function skelJs(sk) {
  return 'MEDIAUS.med(' + JSON.stringify(sk, null, 2).replace(/"([a-zA-Z_]\w*)":/g, '$1:').replace(/"/g, "'")
    .replace(/\[\n\s+('[^']*'|null)(?:,\n\s+('[^']*'|null))*\n\s+\]/g, m => '[' + m.replace(/\s*\n\s*/g, ' ').slice(1, -1).trim() + ']') + ');\n';
}
fs.writeFileSync(path.join(OUT, 'meds.js'), '/* Medicine skeletons: structure and order only. Every clinical word lives in a fact (see facts/).\n' +
  '   Labels here are the app\'s own words (form names, dose set names, table headings). */\n' + SKELS.map(skelJs).join('\n') +
  '\n// Lists outside a medicine. All demo data.\n' + Object.keys(SETS).map(k => "MEDIAUS.set('" + k + "', " + lit(SETS[k]) + ');').join('\n') + '\n');

// review listing for people
const lines = REPORT.map(({ id, original, rec }) => {
  const cs = (rec.cites || []).map(c => label(c) + (c.broad ? '*' : '')).join(', ');
  const lk = (rec.lookIn || []).map(x => typeof x === 'string' ? short(x) : short(x.src)).join(', ');
  return [id, rec.status, cs, lk, String(original).replace(/\n/g, ' ')].join('\t');
});
fs.writeFileSync(path.join(OUT, '..', '..', 'migrations', '2026-10-27-provenance', 'mapping.tsv'), 'id\tstatus\tcites (*=broad)\tlook in\toriginal text\n' + lines.join('\n') + '\n');
console.log('facts:', Object.keys(ALL).length, COUNT);
console.log('gaps with no lead yet:', nolead.length, nolead.join(' '));
console.log('problems:', problems.length);
problems.forEach(p => console.log(' -', p));
if (problems.length) process.exitCode = 1;
