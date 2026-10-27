/* Builds window.MEDIAUS_DATA for the app: walks each medicine skeleton, looks up every fact id,
   and hands the views plain objects. Every object made from a fact carries _f (its id), so any line on
   screen can be traced back. Citation markers [n] in fact text become the cited source's short label. */
window.MEDIAUS_DATA = (function () {
  'use strict';
  var M = window.MEDIAUS, db = M.db, SRC = db.SOURCES;

  // App vocabulary, not facts: colour swatches for drawing pills.
  var COLORS = {
    white: { hex: '#FFFFFF', label: 'White' },
    ivory: { hex: '#F3EBD3', label: 'Ivory' },
    yellow: { hex: '#F2C230', label: 'Yellow' },
    blue: { hex: '#8DB3E2', label: 'Blue' },
    pink: { hex: '#F2A7B8', label: 'Pink' },
    orange: { hex: '#F08A3C', label: 'Orange' },
    red: { hex: '#C23B3B', label: 'Red' },
    green: { hex: '#5FAE6A', label: 'Green' },
    maroon: { hex: '#7A1F2B', label: 'Maroon' },
    paleyellow: { hex: '#F6E7A6', label: 'Pale yellow' },
    clear: { hex: '#EAF3F5', label: 'Clear' }
  };

  var errors = db.errors.slice();
  function get(id) {
    var f = M.fact(id);
    if (!f) { errors.push('missing fact ' + id); return { status: 'gap', text: '', cites: [] }; }
    return f;
  }
  function source(id) { return SRC[id] || { title: id, label: id, short: id, missing: true }; }
  function citeLabel(c) { return (c.as || source(c.src).short) + (c.loc ? ' ' + c.loc : ''); }
  function render(text, f) {
    return String(text == null ? '' : text).replace(/\[(\d+)\]/g, function (m, n) {
      var c = (f.cites || [])[n - 1];
      if (!c) { errors.push('marker ' + m + ' without cite'); return m; }
      return citeLabel(c);
    });
  }
  // Shared fields for anything made from a fact.
  function base(id) {
    var f = get(id);
    return { _f: id, verify: f.status === 'verify', gap: f.status === 'gap', demo: f.status === 'demo' };
  }
  function popOf(o, f) { if (f.pop !== undefined) o.pop = f.pop; return o; }

  // ---------- builders: fact -> the shape the views use ----------
  function appearance(id) {
    var f = get(id), o = base(id);
    ['label', 'shape', 'colors', 'imprint', 'scored', 'size', 'desc'].forEach(function (k) { if (f[k] !== undefined) o[k] = f[k]; });
    o.src = f.status === 'demo' ? 'Sample' : f.cites && f.cites.length ? citeLine([id]) : 'To verify: ' + lookInLine([id]);
    return o;
  }
  function position(id) {
    var f = get(id), o = popOf(base(id), f);
    o.src = f.heading ? render(f.heading, f) : (f.cites || []).map(function (c) { return source(c.src).label; }).join(' · ');
    o.text = render(f.text, f);
    return o;
  }
  function prepEntry(id) {
    var f = get(id), o = popOf(base(id), f);
    if (f.missing !== undefined) o.missing = render(f.missing, f);
    else if (f.none !== undefined) o.none = render(f.none, f);
    else if (f.pump) o.pump = f.pump;
    else o.text = render(f.text, f);
    // Per-entry source line: only cites made for this entry, not ones inherited from the route.
    var own = (f.cites || []).filter(function (c) { return !c.broad; });
    if (own.length) o.src = own.map(citeLabel).join(', ');
    return o;
  }
  function route(r) {
    var h = get(r.head), o = base(r.head);
    o.id = r.id; o.cat = r.cat; o.label = h.label; o.status = h.use;
    if (h.statusNote) o.statusNote = h.statusNote;
    if (h.summary !== undefined) o.summary = render(h.summary, h);
    if (h.positionsTitle) o.positionsTitle = h.positionsTitle;
    var ids = [r.head];
    if (r.pops) {
      o.pops = {};
      Object.keys(r.pops).forEach(function (g) {
        var id = r.pops[g], f = get(id), x = base(id);
        x.status = f.use; if (f.note !== undefined) x.note = render(f.note, f);
        o.pops[g] = x; ids.push(id);
      });
    }
    if (r.brands) o.brands = r.brands.map(function (id) { var f = get(id), x = base(id); x.brand = f.brand; x.status = f.use; x.note = render(f.note, f); ids.push(id); return x; });
    if (r.prep) {
      o.prep = {};
      Object.keys(r.prep).forEach(function (st) { o.prep[st] = r.prep[st].map(function (id) { ids.push(id); return prepEntry(id); }); });
    }
    if (r.positions) o.positions = r.positions.map(function (id) { ids.push(id); return position(id); });
    if (r.items) o.items = r.items.map(function (id) {
      var f = get(id), x = popOf(base(id), f);
      x.label = f.label; x.status = f.tone; x.text = render(f.text, f);
      ids.push(id); return x;
    });
    o._ids = ids;
    o.gapOnly = h.status === 'gap';
    return o;
  }
  function textItem(id) { var f = get(id), o = base(id); o.text = render(f.text, f); return o; }
  function dosing(d) {
    var ids = [];
    var cell = function (id) { if (!id) return { text: '—' }; ids.push(id); return textItem(id); };
    return {
      id: d.id, label: d.label, head: d.head,
      rows: d.rows.map(function (row) { return row.map(cell); }),
      notes: (d.notes || []).map(function (id) { ids.push(id); return textItem(id); }),
      _ids: ids
    };
  }
  function interaction(x) {
    var id = typeof x === 'string' ? x : x.id, f = get(id), o = base(id);
    o.sev = f.sev; if (f.title) o.title = f.title; o.text = render(f.text, f); o.with = f['with'] || [];
    if (x.positions) o.positions = x.positions.map(position);
    o._ids = [id].concat(x.positions || []);
    return o;
  }

  function med(sk) {
    var m = { id: sk.id, _ids: {} };
    var idn = sk.identity;
    Object.keys(idn).forEach(function (k) { m[k] = get(idn[k]).value; });
    m._ids.overview = Object.keys(idn).map(function (k) { return idn[k]; });

    var p = get(sk.pregnancy);
    m.pregnancy = base(sk.pregnancy);
    ['cat', 'label', 'tone'].forEach(function (k) { if (p[k] !== undefined) m.pregnancy[k] = p[k]; });
    m.pregnancy.text = render(p.text, p);
    var b = get(sk.breastfeeding.main);
    m.breastfeeding = base(sk.breastfeeding.main);
    m.breastfeeding.status = b.label; m.breastfeeding.tone = b.tone; m.breastfeeding.text = render(b.text, b);
    if (sk.breastfeeding.positions) m.breastfeeding.positions = sk.breastfeeding.positions.map(position);
    m._ids.pregnancy = [sk.pregnancy, sk.breastfeeding.main].concat(sk.breastfeeding.positions || []);

    m.forms = sk.forms.map(function (fs) {
      var info = get(fs.info);
      var f = { id: fs.id, label: fs.label, pops: fs.pops, unit: info.unit, strengths: info.strengths, _f: fs.info };
      f.appearance = fs.appearance.map(appearance);
      f.routes = fs.routes.map(route);
      f.dosing = fs.dosing.map(dosing);
      return f;
    });

    m.interactions = { important: sk.interactions.important.map(interaction), other: sk.interactions.other.map(interaction) };
    m._ids.interactions = [].concat.apply([], m.interactions.important.concat(m.interactions.other).map(function (i) { return i._ids; }));
    m._ids.more = [];
    ['contraindications', 'caution', 'warnings', 'monitoring'].forEach(function (k) {
      m[k] = sk.safety[k].map(textItem);
      m._ids.more = m._ids.more.concat(sk.safety[k]);
    });
    return m;
  }

  var MEDS = {};
  db.ORDER.forEach(function (id) { MEDS[id] = med(db.MEDS[id]); });

  // ---------- demo sets ----------
  var S = db.SETS;
  var OTHERS = (S.OTHERS || []).map(function (id) { var f = get(id), o = base(id); o.name = f.name; o.cls = f.cls; o.schedule = f.schedule; o.routes = f.routes; return o; });
  var EXTRA_PILLS = (S.EXTRA_PILLS || []).map(appearance);
  var BARCODES = {};
  (S.BARCODES || []).forEach(function (id) { var f = get(id); BARCODES[f.code] = { medId: f.medId, formId: f.formId, product: f.product, pack: f.pack, _f: id }; });
  var CHECK_MEDS = {}, CHECK_MED_IDS = {};
  (S.CHECK_MEDS || []).forEach(function (id) { var f = get(id); CHECK_MEDS[f.key] = f.name; CHECK_MED_IDS[f.key] = id; });
  var PAIRS = (S.CHECK_PAIRS || []).map(function (id) { var f = get(id), o = base(id); o.a = f.a; o.b = f.b; o.sev = f.sev; o.title = f.title; o.text = f.text; return o; });

  // ---------- interaction links: agents, groups, index ----------
  // Agents = the full medicines (keyed by id) + AGT records. Groups expand to agents by ATC prefix or MEM records.
  var ATC_RE = /[A-Z]\d{2}[A-Z]{2}\d{2}|[A-Z]\d{2}[A-Z]{1,2}/g;
  var AGENTS = [], AGENT = {};
  db.ORDER.forEach(function (id) {
    var m = MEDS[id], sk = db.MEDS[id];
    var a = { key: id, name: m.name, kind: 'medicine', medId: id, cls: m.cls, brands: m.brands, also: [], atc: String(m.atc || '').match(ATC_RE) || [], _atc: sk.identity.atc };
    AGENTS.push(a); AGENT[id] = a;
  });
  (S.AGENTS || []).forEach(function (id) {
    var f = get(id), a = base(id);
    a.key = f.key; a.name = f.name; a.kind = f.kind; a.atc = f.atc || []; a.also = f.also || []; a._atc = id;
    if (AGENT[a.key]) errors.push(id + ': agent key ' + a.key + ' already used');
    AGENTS.push(a); AGENT[a.key] = a;
  });
  var GROUP = {};
  (S.GROUPS || []).forEach(function (id) {
    var f = get(id), g = base(id);
    g.key = f.key; g.name = f.name; g.basis = f.basis; g.atc = f.atc || []; g.members = [];
    if (GROUP[g.key]) errors.push(id + ': group key ' + g.key + ' already used');
    GROUP[g.key] = g;
  });
  (S.MEMBERS || []).forEach(function (id) {
    var f = get(id), g = GROUP[f.group];
    if (!g) return errors.push(id + ': unknown group ' + f.group);
    if (g.basis !== 'list') errors.push(id + ': group ' + f.group + ' takes members from ATC codes, not records');
    g.members.push({ member: f.member, _f: id });
  });
  // Agents a 'with' target reaches: key -> how (null = named directly; else the group, and the fact that puts the agent in it).
  function expand(t, seen) {
    var out = {};
    if (t.indexOf('g:') !== 0) { if (AGENT[t]) out[t] = null; return out; }
    var g = GROUP[t.slice(2)];
    if (!g || (seen = seen || {})[g.key]) return out;
    seen[g.key] = true;
    if (g.basis === 'atc') {
      AGENTS.forEach(function (a) {
        var code = a.atc.filter(function (c) { return g.atc.some(function (p) { return c.indexOf(p) === 0; }); })[0];
        if (code) out[a.key] = { group: g, code: code, ids: [g._f, a._atc] };
      });
    } else {
      g.members.forEach(function (mb) {
        var sub = expand(mb.member, seen);
        Object.keys(sub).forEach(function (k) { if (!(k in out)) out[k] = { group: g, ids: [g._f, mb._f].concat(sub[k] ? sub[k].ids : []) }; });
      });
    }
    return out;
  }
  // REACH[a + '|' + b] = a's interaction lines that reach b. Built once.
  var REACH = {};
  db.ORDER.forEach(function (a) {
    var m = MEDS[a];
    m.interactions.important.concat(m.interactions.other).forEach(function (it) {
      var hit = {};
      it['with'].forEach(function (t) {
        if (t.indexOf('g:') === 0 ? !GROUP[t.slice(2)] : !AGENT[t]) errors.push(it._f + ": unknown 'with' target " + t);
        var r = expand(t);
        Object.keys(r).forEach(function (b) { if (b !== a && (!(b in hit) || r[b] === null)) hit[b] = r[b]; });
      });
      Object.keys(hit).forEach(function (b) { (REACH[a + '|' + b] = REACH[a + '|' + b] || []).push({ med: m, item: it, how: hit[b] }); });
    });
  });
  // Every line in either entry that reaches the other, most serious first.
  function reach(a, b) {
    var SEV_RANK = { major: 0, moderate: 1, minor: 2, conflict: 2.5, none: 3 };
    return (REACH[a + '|' + b] || []).concat(REACH[b + '|' + a] || [])
      .sort(function (x, y) { return SEV_RANK[x.item.sev] - SEV_RANK[y.item.sev]; });
  }
  function groupMembers(key) { return Object.keys(expand('g:' + key)); }

  // ---------- provenance helpers for the views ----------
  function locKey(l) { return l.split('.').map(function (n) { return ('000' + n).slice(-4); }).join('.'); }
  // Union of cites over facts, grouped by source in first-seen order.
  function citesOf(ids) {
    var order = [], by = {};
    (ids || []).forEach(function (id) {
      (get(id).cites || []).forEach(function (c) {
        var g = by[c.src];
        if (!g) { g = by[c.src] = { src: c.src, locs: [], notes: [] }; order.push(g); }
        if (c.loc) c.loc.split(', ').forEach(function (l) { if (g.locs.indexOf(l) < 0) g.locs.push(l); });
        if (c.note && g.notes.indexOf(c.note) < 0) g.notes.push(c.note);
      });
    });
    order.forEach(function (g) { g.locs.sort(function (a, b) { return locKey(a) < locKey(b) ? -1 : 1; }); });
    return order;
  }
  function citeLine(ids) {
    return citesOf(ids).map(function (g) {
      return source(g.src).label + (g.locs.length ? ' ' + g.locs.join(', ') : '') + (g.notes.length ? ' (' + g.notes.join('; ') + ')' : '');
    }).join(' · ');
  }
  function lookInsOf(ids) {
    var out = [];
    (ids || []).forEach(function (id) {
      (get(id).lookIn || []).forEach(function (x) {
        var k = typeof x === 'string' ? { src: x } : x;
        if (!out.some(function (o) { return o.src === k.src && o.loc === k.loc; })) out.push(k);
      });
    });
    return out;
  }
  function lookInLine(ids) {
    return lookInsOf(ids).map(function (k) { return source(k.src).label + (k.loc ? ' section ' + k.loc : ''); }).join(' · ');
  }

  return {
    COLORS: COLORS, MEDS: MEDS, ORDER: db.ORDER.slice(),
    OTHERS: OTHERS, EXTRA_PILLS: EXTRA_PILLS, BARCODES: BARCODES,
    CHECK_MEDS: CHECK_MEDS, CHECK_MED_IDS: CHECK_MED_IDS, PAIRS: PAIRS,
    AGENTS: AGENTS, AGENT: AGENT, GROUPS: GROUP, reach: reach, groupMembers: groupMembers,
    prov: {
      fact: get, source: source, sources: SRC, reviews: db.REVIEWS, render: render, citeLabel: citeLabel,
      citesOf: citesOf, citeLine: citeLine, lookInsOf: lookInsOf, lookInLine: lookInLine
    },
    errors: errors
  };
})();
