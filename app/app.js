/* MediAUS prototype — SAMPLE DATA for UI/UX review only. Not for clinical use. */
(function () {
  'use strict';

  var D = window.MEDIAUS_DATA;
  var TEAL = '#1A6F67';
  var MUTED = '#5B6F75';

  // ---------- state ----------
  var state = {
    screen: 'splash',
    medId: 'amiodarone',
    formId: 'tab',
    tab: 'overview',
    selected: ['amiodarone', 'digoxin', 'warfarin'],
    notif: true,
    query: '',
    route: 'All',
    area: '',
    addq: '',
    addIdx: 0,
    pro: false,
    demo: false,
    pillMode: 'describe',
    pill: { shape: '', color: '', imprint: '', scored: 'any' },
    photo: null,
    photoState: 'idle',
    pop: 'all',
    prov: null,
    routeId: '',
    doseId: '',
    scan: { phase: 'idle', code: '', manual: false, torch: false }
  };
  var depth = 0;

  // ---------- reference data ----------
  var SEV = {
    major:    { label: 'Major',     bg: '#FEF3F2', bd: '#FDA29B', icon: '#D92D20', fg: '#912018', rank: 0 },
    moderate: { label: 'Moderate',  bg: '#FFFAEB', bd: '#FEC84B', icon: '#DC6803', fg: '#7A2E0E', rank: 1 },
    minor:    { label: 'Minor',     bg: '#EFF8FF', bd: '#B2DDFF', icon: '#1570EF', fg: '#194185', rank: 2 },
    conflict: { label: 'Sources differ', bg: '#F4F3FF', bd: '#BDB4FE', icon: '#6941C6', fg: '#4A1FB8', rank: 2.5 },
    none:     { label: 'No action', bg: '#ECFDF3', bd: '#ABEFC6', icon: '#079455', fg: '#054F31', rank: 3 }
  };

  // Checker names and pairs are demo facts (data/facts/demo.js).
  var CHECK_MEDS = D.CHECK_MEDS;
  var PAIRS = D.PAIRS;

  var ROUTES = ['All', 'Oral', 'Enteral tube', 'IV', 'IM', 'SC', 'Intrathecal', 'Local', 'Sublingual', 'Rectal', 'Inhaled', 'Topical'];
  var PERKS = ['Full interaction checker', 'Pregnancy & breastfeeding safety', 'Detailed dosing and administration', 'AI photo pill identifier', 'Barcode scanner for medicine packs', 'Ad-free experience'];
  var TABS = [['overview', 'Overview'], ['dosage', 'Dosage'], ['admin', 'Administration'], ['interactions', 'Interactions'], ['pregnancy', 'Pregnancy'], ['more', 'More']];
  var SHAPES = ['round', 'oval', 'oblong', 'capsule'];
  var SWATCHES = ['white', 'ivory', 'yellow', 'blue', 'pink', 'orange', 'red', 'green', 'maroon'];

  // All pills for the identifier
  var PILLS = [];
  D.ORDER.forEach(function (id) {
    var m = D.MEDS[id];
    m.forms.forEach(function (f) {
      f.appearance.forEach(function (a) {
        if (SHAPES.indexOf(a.shape) >= 0) PILLS.push({ a: a, medId: id, formId: f.id, sub: m.name + ' · ' + f.label });
      });
    });
  });
  D.EXTRA_PILLS.forEach(function (a) { PILLS.push({ a: a, sub: 'Details coming soon' }); }); // demo facts

  // ---------- helpers ----------
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function med() { return D.MEDS[state.medId]; }
  function form() {
    var m = med();
    for (var i = 0; i < m.forms.length; i++) if (m.forms[i].id === state.formId) return m.forms[i];
    return m.forms[0];
  }
  function hex(c) { return (D.COLORS[c] || D.COLORS.white).hex; }
  function colorNames(cs) { return cs.map(function (c) { return (D.COLORS[c] || { label: c }).label; }).join(' and '); }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  var LOGO = '<svg width="{s}" height="{s}" viewBox="0 0 74 74" aria-hidden="true"><rect x="25" y="4" width="24" height="66" rx="6" fill="#3FC1B2"/><rect x="4" y="25" width="66" height="24" rx="6" fill="#3FC1B2"/><rect x="25" y="25" width="24" height="24" fill="#7DE0D4"/></svg>';
  function logo(size) { return LOGO.replace(/\{s\}/g, size); }
  var AUS_PATH = 'M20 120L40 105L70 100L100 80L115 65L130 45L150 40L170 50L180 25L200 15L220 20L240 20L250 55L275 75L290 50L295 25L305 7L315 40L335 50L340 85L370 110L390 135L410 155L415 185L405 220L390 240L380 275L360 278L345 290L325 282L290 280L275 265L260 255L258 230L240 248L230 245L220 225L190 215L140 223L120 238L80 240L55 250L30 243L37 215L28 180L15 155Z M328 307L363 309L360 332L348 336L332 322Z';

  var ICON = {
    chevron: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B6F75" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
    back: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#142B33" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    search: function (c, w) { return '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="' + c + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>'; },
    alert: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M12 6v8M12 18v.5"/></svg>',
    x: function (c, s) { return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="' + c + '" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'; },
    drop: function (c) { return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="' + c + '" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z"/></svg>'; },
    camera: function (c) { return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="' + c + '" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>'; },
    lock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>'
  };

  // Draws a tablet, capsule, ampoule, vial, inhaler, nebule, tube, bag, sachet or bottle. viewBox 80 x 50.
  function drawPill(a, w) {
    var h = Math.round(w * 50 / 80);
    var c1 = hex(a.colors[0]), c2 = hex(a.colors[1] || a.colors[0]);
    var stroke = '#B9C6C9';
    var body = '';
    var imp = a.imprint ? esc(a.imprint) : '';
    var fs = imp.length > 4 ? 8 : 10;
    var text = imp ? '<text x="40" y="' + (25 + fs / 3) + '" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="700" font-size="' + fs + '" fill="#2A3B40" stroke="#FFFFFF" stroke-width="2.2" paint-order="stroke">' + imp + '</text>' : '';
    if (a.shape === 'round') {
      body = '<circle cx="40" cy="25" r="22" fill="' + c1 + '" stroke="' + stroke + '" stroke-width="1.5"/><circle cx="40" cy="25" r="18" fill="none" stroke="#000" stroke-opacity="0.06" stroke-width="1"/>' +
        (a.scored ? '<line x1="40" y1="5" x2="40" y2="45" stroke="#000" stroke-opacity="0.18" stroke-width="1.5"/>' : '') + text;
    } else if (a.shape === 'oval') {
      body = '<ellipse cx="40" cy="25" rx="32" ry="20" fill="' + c1 + '" stroke="' + stroke + '" stroke-width="1.5"/>' +
        (a.scored ? '<line x1="40" y1="6" x2="40" y2="44" stroke="#000" stroke-opacity="0.18" stroke-width="1.5"/>' : '') + text;
    } else if (a.shape === 'oblong') {
      body = '<rect x="5" y="11" width="70" height="28" rx="14" fill="' + c1 + '" stroke="' + stroke + '" stroke-width="1.5"/>' +
        (a.scored ? '<line x1="40" y1="11" x2="40" y2="39" stroke="#000" stroke-opacity="0.18" stroke-width="1.5"/>' : '') + text;
    } else if (a.shape === 'capsule') {
      body = '<path d="M40 11H19a14 14 0 0 0 0 28h21z" fill="' + c1 + '" stroke="' + stroke + '" stroke-width="1.5"/><path d="M40 11h21a14 14 0 0 1 0 28H40z" fill="' + c2 + '" stroke="' + stroke + '" stroke-width="1.5"/>' +
        '<path d="M14 17h14" stroke="#FFFFFF" stroke-opacity="0.45" stroke-width="2.5" stroke-linecap="round"/>' + text;
    } else if (a.shape === 'ampoule') {
      body = '<path d="M34 4h12v6l-2 4v4l4 4v24a3 3 0 0 1-3 3H35a3 3 0 0 1-3-3V22l4-4v-4l-2-4z" fill="#F4F8F9" stroke="' + stroke + '" stroke-width="1.5"/>' +
        '<path d="M33 28h14v18a2 2 0 0 1-2 2H35a2 2 0 0 1-2-2z" fill="' + c1 + '" stroke="#9FB2B6" stroke-width="1"/><line x1="34" y1="14" x2="46" y2="14" stroke="#D92D20" stroke-width="1.5"/>';
    } else if (a.shape === 'vial') {
      body = '<rect x="31" y="3" width="18" height="7" rx="2" fill="#5B6F75"/><path d="M32 10h16v4l2 2v30a3 3 0 0 1-3 3H33a3 3 0 0 1-3-3V16l2-2z" fill="#F4F8F9" stroke="' + stroke + '" stroke-width="1.5"/>' +
        '<rect x="32" y="34" width="16" height="13" rx="1.5" fill="' + c1 + '" stroke="#C9D3D5" stroke-width="1"/><rect x="31" y="20" width="18" height="10" fill="#E5F4F2"/>';
    } else if (a.shape === 'inhaler') {
      body = '<rect x="30" y="3" width="14" height="30" rx="4" fill="#C9D3D5" stroke="#9FB2B6" stroke-width="1.2"/><path d="M27 30h20v10a3 3 0 0 1-3 3H27z" fill="#F4F8F9" stroke="' + stroke + '" stroke-width="1.5"/><path d="M44 34h12a3 3 0 0 1 3 3v6H44z" fill="#F4F8F9" stroke="' + stroke + '" stroke-width="1.5"/>';
    } else if (a.shape === 'nebule') {
      body = '<path d="M36 3h8v6l3 3v30a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4V12l3-3z" fill="#F4F8F9" stroke="' + stroke + '" stroke-width="1.5"/><path d="M34 26h12v16a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 34 42z" fill="' + c1 + '" stroke="#C9D3D5" stroke-width="1"/>';
    } else if (a.shape === 'tube') {
      body = '<path d="M8 15h48l8 4v12l-8 4H8z" fill="#E4E9EA" stroke="' + stroke + '" stroke-width="1.5"/><rect x="64" y="20" width="9" height="10" rx="1.5" fill="#5B6F75"/><rect x="18" y="20" width="30" height="10" rx="1.5" fill="#FFFFFF"/><rect x="21" y="23" width="18" height="2" fill="#3FC1B2"/>';
    } else if (a.shape === 'bag') {
      body = '<path d="M26 4h28a4 4 0 0 1 4 4v28l-8 6H30l-8-6V8a4 4 0 0 1 4-4z" fill="#F4F8F9" stroke="' + stroke + '" stroke-width="1.5"/><rect x="36" y="42" width="8" height="6" rx="1" fill="#5B6F75"/><rect x="30" y="12" width="20" height="12" rx="1.5" fill="#FFFFFF" stroke="#C9D3D5" stroke-width="1"/><rect x="33" y="16" width="14" height="2" fill="#3FC1B2"/>';
    } else if (a.shape === 'sachet') {
      body = '<rect x="22" y="5" width="36" height="40" rx="3" fill="#FFFFFF" stroke="' + stroke + '" stroke-width="1.5"/><path d="M22 11h36M22 39h36" stroke="#C9D3D5" stroke-width="1" stroke-dasharray="2 2"/><circle cx="35" cy="24" r="3" fill="' + c1 + '"/><circle cx="43" cy="27" r="3" fill="' + c1 + '"/><circle cx="39" cy="20" r="2.5" fill="' + c1 + '"/>';
    } else {
      body = '<rect x="33" y="2" width="14" height="7" rx="1.5" fill="#F2F2F2" stroke="' + stroke + '" stroke-width="1.2"/><path d="M31 9h18v4l3 3v30a3 3 0 0 1-3 3H31a3 3 0 0 1-3-3V16l3-3z" fill="#9C5A1E" stroke="#6E3D12" stroke-width="1.2"/>' +
        '<rect x="30" y="22" width="20" height="16" rx="1.5" fill="#FFFFFF"/><rect x="33" y="26" width="14" height="2" fill="#3FC1B2"/><rect x="33" y="31" width="10" height="2" fill="#C9D3D5"/>';
    }
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 80 50" aria-hidden="true">' + body + '</svg>';
  }

  var PROFILE_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#142B33" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>';
  // Header for every screen but Home and the splash.
  // opts: back (arrow on the left), profile (default true), dark, tag (default h1).
  function pageHeader(title, opts) {
    opts = opts || {};
    var fg = opts.dark ? '#FFFFFF' : '#142B33', tag = opts.tag || 'h1';
    var back = opts.back ? '<button data-act="back" aria-label="Back" style="flex:none;width:44px;height:44px;margin-left:-10px;border:0;border-radius:22px;background:transparent;display:flex;align-items:center;justify-content:center">' + ICON.back.replace('#142B33', fg) + '</button>' : '';
    var prof = opts.profile === false ? '' : '<button data-act="go:profile" aria-label="Profile and settings" style="flex:none;width:44px;height:44px;border-radius:22px;border:1.5px solid #D9E3E4;background:#FFFFFF;display:flex;align-items:center;justify-content:center">' + PROFILE_SVG + '</button>';
    return '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:44px">' +
      '<div style="display:flex;align-items:center;gap:8px;min-width:0">' + back + '<span style="flex:none;display:flex">' + logo(28) + '</span>' +
      '<' + tag + ' style="margin:0;font-size:21px;font-weight:800;letter-spacing:-0.4px;color:' + fg + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + title + '</' + tag + '></div>' + prof + '</div>';
  }

  function sampleBadge() {
    return '<span style="display:inline-flex;align-items:center;gap:6px;align-self:flex-start;background:#FFF4D6;color:#5C3D00;border-radius:999px;padding:3px 10px;font-size:11px;font-weight:700">Draft data under SME review · not for clinical use</span>';
  }

  function sevDeco(sev) {
    var v = SEV[sev];
    return {
      v: v,
      icon: '<span style="flex:none;width:24px;height:24px;border-radius:12px;background:' + v.icon + ';display:flex;align-items:center;justify-content:center">' + ICON.alert + '</span>',
      tag: '<span style="flex:none;font-size:11px;font-weight:700;color:' + v.fg + ';background:#FFFFFF;border:1px solid ' + v.bd + ';border-radius:6px;padding:2px 8px">' + v.label + '</span>'
    };
  }

  var H2 = 'margin:0;font-size:16px;font-weight:700';
  var VERIFY_TAG = '<span style="white-space:nowrap;font-size:10px;font-weight:800;color:#7A2E0E;background:#FFF4D6;border:1px solid #FEC84B;border-radius:6px;padding:1px 6px">To verify</span>';
  var DEMO_TAG = '<span style="white-space:nowrap;font-size:10px;font-weight:800;color:#5C3D00;background:#FFF4D6;border:1px solid #F2B53A;border-radius:6px;padding:1px 6px">Demo data</span>';
  // Tag for a fact's status: To verify, or Demo data.
  function tagOf(x) { return x && x.verify ? VERIFY_TAG : x && x.demo ? DEMO_TAG : ''; }
  // Source line under a block, built from the cites of the facts shown in it. Tapping opens each line's trail.
  var provBlocks = [];
  function provLine(ids, title, empty) {
    var line = D.prov.citeLine(ids), look = D.prov.lookInLine(ids);
    var txt = (line ? 'Sources: ' + line : '') + (look ? (line ? '. ' : '') + 'To check: ' + look : '');
    provBlocks.push({ ids: ids, title: title });
    return '<button data-act="prov:' + (provBlocks.length - 1) + '" style="text-align:left;border:0;background:transparent;padding:4px 0;min-height:44px;font-size:12px;color:#5B6F75;line-height:1.5">' +
      esc(txt || empty || 'No document found yet.') + ' <span style="color:#1A6F67;font-weight:700;white-space:nowrap">Trail ›</span></button>';
  }
  var CARD = 'background:#FFFFFF;border:1.5px solid #E1E8E9;border-radius:14px';

  // ---------- splash ----------
  function viewSplash() {
    return '<div style="flex:1;min-height:0;overflow-y:auto;background:#0C2A30;color:#FFFFFF;display:flex;flex-direction:column;align-items:center;padding:max(56px,env(safe-area-inset-top)) 28px max(28px,env(safe-area-inset-bottom))">' +
      logo(74) +
      '<span style="margin-top:18px;font-size:42px;font-weight:800;letter-spacing:-1px">MediAUS</span>' +
      '<span style="margin-top:8px;font-size:17px;font-weight:600">Australian Medication Reference</span>' +
      '<span style="margin-top:6px;font-size:13px;color:#A9C7C8">Trusted. Accurate. For Better Decisions.</span>' +
      '<svg width="210" height="168" viewBox="0 0 430 345" aria-hidden="true" style="margin-top:32px;flex:none"><path d="' + AUS_PATH + '" fill="#163E45" stroke="#2A5960" stroke-width="3" stroke-linejoin="round"/></svg>' +
      '<span style="margin-top:32px;font-size:14px;line-height:1.55;color:#D6E6E6;text-align:center">Comprehensive medication information<br>for Australian healthcare professionals.</span>' +
      '<div style="margin-top:auto;padding-top:28px;width:100%;display:flex;flex-direction:column;gap:14px">' +
        '<button data-act="start" style="font-size:16px;font-weight:700;color:#0C2A30;background:#FFFFFF;border:0;border-radius:14px;min-height:52px">Get Started</button>' +
        '<button data-act="start" style="font-size:16px;font-weight:700;color:#FFFFFF;background:transparent;border:1.5px solid #A9C7C8;border-radius:14px;min-height:52px">Sign In</button>' +
        '<span style="margin-top:12px;font-size:13px;line-height:1.55;color:#D6E6E6;text-align:center">Free access to essential information.<br>Upgrade for full features.</span>' +
      '</div></div>';
  }

  // ---------- home ----------
  function viewHome() {
    function tile(svg, title, sub, act, badge) {
      return '<button ' + (act ? 'data-act="' + act + '" ' : '') + 'style="text-align:left;display:flex;align-items:center;gap:14px;' + CARD + ';border-radius:16px;padding:14px">' +
        '<span style="flex:none;width:56px;height:56px;border-radius:14px;background:#E5F4F2;display:flex;align-items:center;justify-content:center">' + svg + '</span>' +
        '<span style="flex:1;display:flex;flex-direction:column;gap:3px"><span style="display:flex;align-items:center;gap:8px;font-size:15px;font-weight:700">' + title + (badge || '') + '</span><span style="font-size:13px;color:#5B6F75">' + sub + '</span></span></button>';
    }
    var recent = [['amiodarone', 'tab', '200 mg tablet'], ['digoxin', 'tab', '250 microgram tablet'], ['amoxicillin', 'cap', '500 mg capsule']].map(function (r) {
      var m = D.MEDS[r[0]];
      var f = m.forms.filter(function (x) { return x.id === r[1]; })[0];
      return '<button data-act="med:' + r[0] + ':' + r[1] + '" style="text-align:left;display:flex;align-items:center;gap:12px;' + CARD + ';padding:10px 14px;min-height:58px">' +
        '<span style="flex:none">' + drawPill(f.appearance[0], 40) + '</span>' +
        '<span style="flex:1;display:flex;flex-direction:column;gap:2px"><span style="font-size:14px;font-weight:600">' + m.name + ' ' + r[2] + '</span><span style="font-size:12px;color:#5B6F75">' + esc(m.cls) + '</span></span>' + ICON.chevron + '</button>';
    }).join('');
    var proBadge = '<span style="font-size:10px;font-weight:800;color:#5C3D00;background:#F2B53A;border-radius:999px;padding:2px 8px">PRO</span>';
    var newBadge = '<span style="font-size:10px;font-weight:800;color:#0E5E59;background:#D3EEEA;border-radius:999px;padding:2px 8px">NEW</span>';
    return '<div style="padding:18px 18px 24px;display:flex;flex-direction:column;gap:14px">' +
      '<div style="display:flex;align-items:center;justify-content:space-between">' +
        '<div style="display:flex;align-items:center;gap:8px">' + logo(28) + '<span style="font-size:21px;font-weight:800;letter-spacing:-0.4px">Medi<span style="color:#1A8A7E">AUS</span></span></div>' +
        '<button data-act="go:profile" aria-label="Profile and settings" style="width:44px;height:44px;border-radius:22px;border:1.5px solid #D9E3E4;background:#FFFFFF;display:flex;align-items:center;justify-content:center">' + PROFILE_SVG + '</button>' +
      '</div>' +
      '<button data-act="go:search" style="text-align:left;display:flex;align-items:center;gap:10px;border:1.5px solid #D9E3E4;background:#FFFFFF;border-radius:14px;padding:0 14px;min-height:50px;color:#5B6F75;font-size:15px">' + ICON.search('#5B6F75') + 'Search by active ingredient…</button>' +
      '<div style="background:#0C2A30;color:#FFFFFF;border-radius:16px;padding:18px;display:flex;align-items:center;gap:12px">' +
        '<div style="display:flex;flex-direction:column;gap:8px;flex:1"><span style="font-size:16px;font-weight:700;line-height:1.35">Australian Medication Information at your fingertips</span><span style="font-size:12px;line-height:1.5;color:#C3DADB">Evidence-based. Up to date. Built for healthcare professionals.</span></div>' +
        '<svg width="64" height="52" viewBox="0 0 430 345" aria-hidden="true" style="flex:none"><path d="' + AUS_PATH + '" fill="#3FC1B2" opacity="0.85"/></svg>' +
      '</div>' +
      tile('<svg width="28" height="28" viewBox="0 0 80 50" aria-hidden="true"><circle cx="30" cy="25" r="16" fill="#FFFFFF" stroke="#0E5E59" stroke-width="3.5"/><path d="M48 11h10a14 14 0 0 1 0 28H48z" fill="#3FC1B2" stroke="#0E5E59" stroke-width="3.5"/></svg>', 'Pill Identifier', 'Describe or photograph a pill to identify it', 'go:pill', newBadge) +
      tile('<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0E5E59" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 5v14M7 5v14M10 5v14M14 5v14M17 5v14M20 5v14"/></svg>', 'Scan Barcode', 'Point your camera at a medicine pack', 'go:scan', proBadge) +
      tile('<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0E5E59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>', 'Browse Categories', 'Explore by class, condition or therapeutic area', 'go:search') +
      '<div style="display:flex;flex-direction:column;gap:10px;margin-top:4px"><h2 style="' + H2 + '">Recently Viewed</h2>' + recent + '</div>' +
      '</div>';
  }

  // ---------- route status labels ----------
  var RSTATUS = {
    licensed:   { label: 'Licensed', bg: '#ECFDF3', fg: '#054F31', bd: '#ABEFC6', dot: '#079455' },
    restricted: { label: 'Licensed, restricted', bg: '#ECFDF3', fg: '#054F31', bd: '#ABEFC6', dot: '#079455' },
    accepted:   { label: 'Accepted practice', bg: '#EFF8FF', fg: '#194185', bd: '#B2DDFF', dot: '#1570EF' },
    no:         { label: 'Do not use', bg: '#FEF3F2', fg: '#912018', bd: '#FDA29B', dot: '#D92D20' },
    unverified: { label: 'Not verified', bg: '#F2F4F7', fg: '#344054', bd: '#D0D5DD', dot: '#98A2B3' },
    differ:     { label: 'Sources differ', bg: '#F4F3FF', fg: '#4A1FB8', bd: '#BDB4FE', dot: '#6941C6' },
    na:         { label: 'Not for this group', bg: '#FFFFFF', fg: '#5B6F75', bd: '#D0D5DD', dot: '#D0D5DD' }
  };
  function rPill(status, note) {
    var v = RSTATUS[status] || RSTATUS.unverified;
    return '<span style="flex:none;white-space:nowrap;font-size:11px;font-weight:700;color:' + v.fg + ';background:' + v.bg + ';border:1px solid ' + v.bd + ';border-radius:6px;padding:2px 8px">' + v.label + (note ? ' · ' + esc(note) : '') + '</span>';
  }
  // ---------- populations ----------
  var GROUPS = { adult: 'Adults', child: 'Children', newborn: 'Newborns', all: 'All ages' };
  function popsOf(x) { var p = x && x.pop; return !p ? ['all'] : (typeof p === 'string' ? [p] : p); }
  function forPop(x, g) { var p = popsOf(x); return g === 'all' || p.indexOf('all') >= 0 || p.indexOf(g) >= 0; }
  function formPops(f) { return f.pops || ['adult', 'child']; }
  function curPop(f) { return formPops(f).indexOf(state.pop) >= 0 ? state.pop : 'all'; }
  function popLabel(x) { return popsOf(x).map(function (p) { return GROUPS[p]; }).join(', '); }
  function popSwitch(list) {
    var opts = list.concat(['all']), cur = list.indexOf(state.pop) >= 0 ? state.pop : 'all';
    return '<div role="group" aria-label="Patient group" style="display:flex;gap:4px;background:#EEF2F3;border-radius:12px;padding:4px">' + opts.map(function (g) {
      var on = cur === g;
      return '<button data-act="pop:' + g + '" aria-pressed="' + on + '" style="flex:1;min-height:40px;border:0;border-radius:10px;font-size:13px;font-weight:700;background:' + (on ? '#FFFFFF' : 'transparent') + ';color:' + (on ? '#142B33' : '#5B6F75') + ';box-shadow:' + (on ? '0 1px 3px rgba(0,0,0,.12)' : 'none') + '">' + (g === 'all' ? 'All' : GROUPS[g]) + '</button>';
    }).join('') + '</div>';
  }
  function groupTag(label) {
    return '<span style="flex:none;font-size:10px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;color:#0E5E59;background:#E5F4F2;border-radius:5px;padding:2px 6px">' + esc(label) + '</span>';
  }
  function groupHead(label) {
    return '<span style="display:block;font-size:12px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;color:#0E5E59;border-left:3px solid #1A8A7E;padding-left:8px;margin-top:4px">' + esc(label) + '</span>';
  }

  function positionsHtml(list) {
    return '<div style="display:flex;flex-direction:column;gap:8px">' + list.map(function (p) {
      return '<div style="border-left:3px solid #BDB4FE;background:#FAFAFF;border-radius:0 10px 10px 0;padding:8px 12px;display:flex;flex-direction:column;gap:2px">' +
        '<span style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">' + (p.pop ? groupTag(popLabel(p)) : '') + '<span style="font-size:11px;font-weight:800;color:#4A1FB8;text-transform:uppercase;letter-spacing:.4px">' + esc(p.src) + '</span>' + tagOf(p) + '</span>' +
        '<span style="font-size:13px;line-height:1.45;color:#24414A">' + esc(p.text) + '</span></div>';
    }).join('') + '</div>';
  }
  function formRouteCats(f) {
    var cats = {};
    f.routes.forEach(function (r) {
      if (r.status === 'no') return;
      if (!cats[r.cat]) cats[r.cat] = { verified: false };
      if (r.status !== 'unverified') cats[r.cat].verified = true;
    });
    return cats;
  }
  function routeForCat(f, cat) {
    var hits = f.routes.filter(function (r) { return r.cat === cat && r.status !== 'no'; });
    var best = hits.filter(function (r) { return r.status !== 'unverified'; })[0];
    return best || hits[0] || null;
  }

  // ---------- search ----------
  // #live holds chips + results so the input keeps focus while typing.

  // Draft browse groups. SME to confirm.
  var AREAS = [
    { id: 'heart', label: 'Heart & circulation', match: ['antiarrhythmic', 'cardiac glycoside', 'antianginal', 'cholesterol'],
      icon: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>' },
    { id: 'infection', label: 'Infections', match: ['antibiotic'],
      icon: '<circle cx="12" cy="12" r="5"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>' },
    { id: 'pain', label: 'Pain & fever', match: ['analgesic', 'anaesthetic'],
      icon: '<path d="M10 14V5a2 2 0 0 1 4 0v9a4 4 0 1 1-4 0z"/><path d="M12 11v6"/>' },
    { id: 'diabetes', label: 'Diabetes', match: ['diabetes'],
      icon: '<path d="M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z"/>' },
    { id: 'breathing', label: 'Breathing', match: ['bronchodilator'],
      icon: '<path d="M12 4v7M12 11l-3 2M12 11l3 2"/><path d="M9 8c-3 0-5 5-5 9.5 0 1.8 1.8 2.6 3.4 1.8L9 18.5z"/><path d="M15 8c3 0 5 5 5 9.5 0 1.8-1.8 2.6-3.4 1.8L15 18.5z"/>' }
  ];
  function areaOf(id) { return AREAS.filter(function (a) { return a.id === id; })[0]; }
  function inArea(it, a) { var c = it.cls.toLowerCase(); return a.match.some(function (k) { return c.indexOf(k) >= 0; }); }
  function areaIcon(a, s) { return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="#0E5E59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + a.icon + '</svg>'; }

  function allItems() {
    var items = D.ORDER.map(function (id) {
      var m = D.MEDS[id], routes = [];
      m.forms.forEach(function (f) { Object.keys(formRouteCats(f)).forEach(function (c) { if (routes.indexOf(c) < 0) routes.push(c); }); });
      return { name: m.name, cls: m.cls, sched: m.schedule.split(' ')[0], routes: routes, med: m };
    });
    return items.concat(D.OTHERS.map(function (o) { return { name: o.name, cls: o.cls, sched: o.schedule, routes: o.routes }; }));
  }
  // Brand that matched the query, when the name didn't.
  function brandHit(it, q) {
    if (!it.med || !q || it.name.toLowerCase().indexOf(q) >= 0) return '';
    return it.med.brands.split(',').map(function (b) { return b.trim(); }).filter(function (b) { return b.toLowerCase().indexOf(q) >= 0; })[0] || '';
  }
  function findItems(route) {
    var q = state.query.trim().toLowerCase(), a = areaOf(state.area);
    return allItems().filter(function (it) {
      var qOk = !q || it.name.toLowerCase().indexOf(q) >= 0 || !!brandHit(it, q);
      return qOk && (!a || inArea(it, a)) && (route === 'All' || it.routes.indexOf(route) >= 0);
    });
  }

  var THUMB = 'flex:none;width:56px;height:56px;border-radius:14px;background:#E5F4F2;display:flex;align-items:center;justify-content:center';
  var MINI = 'font-size:10px;font-weight:800;border-radius:999px;padding:2px 8px';

  function recentRow(id, fid) {
    var m = D.MEDS[id], f = m.forms.filter(function (x) { return x.id === fid; })[0];
    return '<button data-act="med:' + id + ':' + fid + '" style="text-align:left;display:flex;align-items:center;gap:12px;' + CARD + ';padding:10px 14px;min-height:58px">' +
      '<span style="flex:none">' + drawPill(f.appearance[0], 40) + '</span>' +
      '<span style="flex:1;display:flex;flex-direction:column;gap:2px"><span style="font-size:14px;font-weight:600">' + esc(m.name) + ' ' + esc(f.unit) + '</span><span style="font-size:12px;color:#5B6F75">' + esc(m.cls) + '</span></span>' + ICON.chevron + '</button>';
  }

  function routeChipsHtml() {
    return ROUTES.map(function (r) {
      var on = state.route === r, n = findItems(r).length;
      var fg = on ? '#FFFFFF' : (n ? '#142B33' : '#9AA9AD');
      return '<button data-act="route:' + r + '" aria-pressed="' + on + '" style="flex:none;display:flex;align-items:center;gap:6px;font-size:13px;font-weight:600;border-radius:999px;padding:0 12px 0 14px;min-height:38px;border:1.5px solid ' + (on ? '#0C2A30' : '#D9E3E4') + ';background:' + (on ? '#0C2A30' : '#FFFFFF') + ';color:' + fg + '">' + r +
        '<span style="font-size:11px;font-weight:700;min-width:18px;border-radius:999px;padding:1px 6px;background:' + (on ? '#3FC1B2' : '#EEF2F3') + ';color:' + (on ? '#0C2A30' : '#5B6F75') + '">' + n + '</span></button>';
    }).join('');
  }

  function searchStart() {
    var tiles = AREAS.map(function (a) {
      var n = allItems().filter(function (it) { return inArea(it, a); });
      return '<button data-act="area:' + a.id + '" style="text-align:left;display:flex;flex-direction:column;gap:10px;' + CARD + ';border-radius:16px;padding:12px 14px">' +
        '<span style="width:40px;height:40px;border-radius:12px;background:#E5F4F2;display:flex;align-items:center;justify-content:center">' + areaIcon(a, 22) + '</span>' +
        '<span style="display:flex;flex-direction:column;gap:2px"><span style="font-size:14px;font-weight:700">' + esc(a.label) + '</span><span style="font-size:12px;color:#5B6F75">' + n.length + (n.length === 1 ? ' medicine' : ' medicines') + '</span></span></button>';
    }).join('');
    var legend = ['licensed', 'accepted', 'differ', 'unverified', 'no'].map(function (k) { return rPill(k); }).join('');
    return '<div style="display:flex;flex-direction:column;gap:18px">' +
      '<div style="background:#0C2A30;color:#FFFFFF;border-radius:16px;padding:16px 18px;display:flex;flex-direction:column;gap:10px">' +
        '<span style="font-size:15px;font-weight:700;line-height:1.35">Pick a route to see how each form can be given</span>' +
        '<span style="font-size:12px;line-height:1.5;color:#C3DADB">Every route shows its status and the source behind it.</span>' +
        '<div style="display:flex;flex-wrap:wrap;gap:6px">' + legend + '</div></div>' +
      '<div style="display:flex;flex-direction:column;gap:10px"><h2 style="' + H2 + '">Recently Viewed</h2>' +
        recentRow('amiodarone', 'tab') + recentRow('digoxin', 'tab') + recentRow('amoxicillin', 'cap') + '</div>' +
      '<div style="display:flex;flex-direction:column;gap:10px"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px"><h2 style="' + H2 + '">Browse by Area</h2><span style="font-size:11px;color:#5B6F75">Draft groups</span></div>' +
        '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px">' + tiles + '</div></div></div>';
  }

  function resultCard(it, q) {
    if (!it.med) {
      return '<div style="' + CARD + ';border-radius:16px;padding:12px 14px;display:flex;align-items:center;gap:14px;background:#FAFBFB">' +
        '<span style="' + THUMB + ';background:#EEF2F3;font-size:16px;font-weight:800;color:#5B6F75">' + esc(it.name.slice(0, 2)) + '</span>' +
        '<span style="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px"><span style="display:flex;align-items:center;gap:8px;font-size:15px;font-weight:700">' + esc(it.name) + '<span style="' + MINI + ';color:#5B6F75;background:#EEF2F3">SOON</span></span>' +
        '<span style="font-size:13px;color:#5B6F75">' + esc(it.cls) + ' · ' + esc(it.sched) + '</span>' +
        '<span style="font-size:12px;color:#5B6F75">Routes listed: ' + esc(it.routes.join(', ')) + '. Full entry not built yet.</span></span></div>';
    }
    // Route filter on: open the first form given that way, on the Administration tab.
    var m = it.med, b = brandHit(it, q), act = 'med:' + m.id + ':' + m.forms[0].id;
    if (state.route !== 'All') {
      for (var i = 0; i < m.forms.length; i++) { var r = routeForCat(m.forms[i], state.route); if (r) { act = 'medr:' + m.id + ':' + m.forms[i].id + ':' + r.id; break; } }
    }
    return '<button data-act="' + act + '" style="text-align:left;display:flex;align-items:center;gap:14px;' + CARD + ';border-radius:16px;padding:14px">' +
      '<span style="' + THUMB + '">' + drawPill(m.forms[0].appearance[0], 40) + '</span>' +
      '<span style="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px">' +
        '<span style="display:flex;align-items:center;flex-wrap:wrap;gap:6px 8px;font-size:15px;font-weight:700">' + esc(m.name) + '<span style="' + MINI + ';color:#0E5E59;background:#D3EEEA">' + esc(it.sched) + '</span>' + (b ? '<span style="' + MINI + ';color:#5C3D00;background:#FFF4D6">Brand: ' + esc(b) + '</span>' : '') + '</span>' +
        '<span style="font-size:13px;color:#5B6F75">' + esc(m.cls) + '</span><span style="font-size:12px;color:#5B6F75">' + esc(m.brands) + '</span></span>' + ICON.chevron + '</button>';
  }

  function searchResults() {
    var q = state.query.trim().toLowerCase(), a = areaOf(state.area);
    if (!q && state.route === 'All' && !a) return searchStart();
    var items = findItems(state.route);
    var filters = (a ? '<button data-act="area:" aria-label="Remove filter ' + esc(a.label) + '" style="display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:#0E5E59;background:#E5F4F2;border:0;border-radius:999px;padding:0 10px;min-height:30px">' + areaIcon(a, 14) + esc(a.label) + ICON.x('#0E5E59', 10) + '</button>' : '');
    var any = q || a || state.route !== 'All';
    var head = '<div style="display:flex;align-items:center;flex-wrap:wrap;gap:8px"><span style="font-size:13px;font-weight:700;color:#24414A">' + items.length + (items.length === 1 ? ' medicine' : ' medicines') + '</span>' + filters +
      (any ? '<button data-act="sclear" style="margin-left:auto;font-size:13px;font-weight:600;color:#1A6F67;background:transparent;border:0;min-height:30px;padding:0 4px">Clear all</button>' : '') + '</div>';
    if (!items.length) {
      return '<div style="display:flex;flex-direction:column;gap:12px">' + head +
        '<div style="border:1.5px dashed #D9E3E4;border-radius:16px;padding:18px;display:flex;flex-direction:column;gap:10px;align-items:flex-start">' +
        '<span style="font-size:15px;font-weight:700">No medicines match' + (q ? ' “' + esc(state.query.trim()) + '”' : '') + '</span>' +
        '<span style="font-size:13px;line-height:1.5;color:#24414A">Try the active ingredient, for example amoxicillin, or a brand name such as Aratac.</span>' +
        (state.route !== 'All' ? '<button data-act="route:All" style="font-size:13px;font-weight:700;color:#FFFFFF;background:#1A6F67;border:0;border-radius:12px;min-height:40px;padding:0 14px">Search all routes</button>' : '') + '</div></div>';
    }
    return '<div style="display:flex;flex-direction:column;gap:12px">' + head + items.map(function (it) { return resultCard(it, q); }).join('') + sampleBadge() + '</div>';
  }

  function searchLive() {
    return '<div style="display:flex;flex-direction:column;gap:16px"><div class="tabs" role="group" aria-label="Route" style="display:flex;gap:8px;overflow-x:auto;padding-bottom:2px">' + routeChipsHtml() + '</div>' + searchResults() + '</div>';
  }

  function viewSearch() {
    var has = !!state.query;
    return '<div style="padding:18px 18px 24px;display:flex;flex-direction:column;gap:14px">' +
      pageHeader('Search') +
      '<label style="display:flex;align-items:center;gap:10px;border:2px solid #1A8A7E;background:#FFFFFF;border-radius:14px;padding:0 4px 0 14px;min-height:52px;box-shadow:0 0 0 4px #E5F4F2">' + ICON.search('#1A6F67', 2.2) +
        '<span class="sr">Search by active ingredient or brand</span><input id="q" type="text" inputmode="search" enterkeyhint="search" autocomplete="off" placeholder="Active ingredient or brand" style="font-size:16px;border:0;outline:none;background:transparent;flex:1;min-width:0;min-height:46px">' +
        '<button id="qclear" data-act="qclear" aria-label="Clear search"' + (has ? '' : ' hidden') + ' style="flex:none;width:40px;height:40px;border:0;border-radius:20px;background:#EEF2F3;display:flex;align-items:center;justify-content:center">' + ICON.x('#24414A', 14) + '</button></label>' +
      '<div id="live">' + searchLive() + '</div></div>';
  }

  // ---------- medication ----------
  function viewMed() {
    var m = med(), f = form();
    var formChips = m.forms.map(function (x) {
      var on = x.id === f.id;
      return '<button data-act="form:' + x.id + '" aria-pressed="' + on + '" style="flex:none;display:flex;flex-direction:column;align-items:flex-start;gap:1px;text-align:left;border-radius:12px;padding:6px 12px;min-height:44px;border:1.5px solid ' + (on ? '#1A6F67' : '#D9E3E4') + ';background:' + (on ? '#1A6F67' : '#FFFFFF') + ';color:' + (on ? '#FFFFFF' : '#142B33') + '"><span style="font-size:13px;font-weight:700">' + esc(x.label) + '</span><span style="font-size:11px;opacity:.85">' + esc(x.strengths) + '</span></button>';
    }).join('');
    var tabs = TABS.map(function (t) {
      var on = state.tab === t[0];
      return '<button role="tab" aria-selected="' + on + '" data-act="tab:' + t[0] + '" style="flex:none;min-height:44px;padding:0 9px;border:0;background:transparent;font-size:13px;font-weight:' + (on ? 700 : 500) + ';color:' + (on ? TEAL : MUTED) + ';border-bottom:2.5px solid ' + (on ? TEAL : 'transparent') + '">' + t[1] + '</button>';
    }).join('');
    var body = { overview: tabOverview, dosage: tabDosage, admin: tabAdmin, interactions: tabInteractions, pregnancy: tabPregnancy, more: tabMore }[state.tab]();
    return '<div style="display:flex;flex-direction:column">' +
      '<div style="padding:18px 20px 0;display:flex;flex-direction:column;gap:8px">' + pageHeader('Medicine', { back: true, tag: 'span' }) + sampleBadge() +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px"><div style="display:flex;flex-direction:column;gap:4px"><h1 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.4px">' + esc(m.name) + '</h1><span style="font-size:16px;font-weight:600;color:#1A8A7E">' + esc(f.unit) + '</span></div>' +
        '<span style="flex:none">' + drawPill(f.appearance[0], 72) + '</span></div>' +
        '<span style="font-size:13px;color:#5B6F75">Brands: ' + esc(m.brands) + '</span>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap">' + m.chips.map(function (c) { return '<span style="background:#E5F4F2;color:#0E5E59;font-size:12px;font-weight:600;border-radius:999px;padding:4px 12px">' + esc(c) + '</span>'; }).join('') + '</div>' +
        '<div style="display:flex;flex-direction:column;gap:6px;margin-top:4px"><span style="font-size:12px;font-weight:600;color:#5B6F75">Physical form</span><div class="tabs" style="display:flex;gap:8px;overflow-x:auto;padding-bottom:2px">' + formChips + '</div></div>' +
      '</div>' +
      '<div class="tabs" role="tablist" aria-label="Medication sections" style="display:flex;overflow-x:auto;margin-top:10px;padding:0 8px;border-bottom:1px solid #E1E8E9">' + tabs + '</div>' +
      '<div style="padding:18px 20px 24px;display:flex;flex-direction:column;gap:14px">' + body + '</div></div>';
  }

  function appearanceCards(f) {
    return f.appearance.map(function (a) {
      var rows = [];
      if (SHAPES.indexOf(a.shape) >= 0) {
        rows.push(['Shape', cap(a.shape === 'oblong' ? 'oblong (capsule-shaped tablet)' : a.shape)]);
        rows.push(['Colour', colorNames(a.colors)]);
        if (a.size) rows.push(['Size', a.size]);
        if (a.imprint) rows.push(['Markings', '“' + a.imprint + '”']);
        if (a.shape !== 'capsule') rows.push(['Score line', a.scored ? 'Yes' : 'No']);
      }
      return '<div style="' + CARD + ';padding:14px;display:flex;flex-direction:column;gap:10px">' +
        '<div style="display:flex;gap:14px;align-items:center"><span style="flex:none;width:92px;height:62px;border-radius:12px;background:#F3F6F6;display:flex;align-items:center;justify-content:center">' + drawPill(a, 80) + '</span>' +
        '<div style="display:flex;flex-direction:column;gap:4px"><span style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;font-size:14px;font-weight:700">' + esc(a.label) + tagOf(a) + '</span><span style="font-size:13px;line-height:1.45;color:#24414A">' + esc(a.desc) + '</span></div></div>' +
        (rows.length ? '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px 12px">' + rows.map(function (r) { return '<span style="display:flex;flex-direction:column;font-size:13px"><span style="font-size:11px;font-weight:600;color:#5B6F75;text-transform:uppercase;letter-spacing:.4px">' + r[0] + '</span><span style="font-weight:600">' + esc(r[1]) + '</span></span>'; }).join('') + '</div>' : '') +
        (a.src ? '<span style="font-size:11px;color:#5B6F75">Appearance source: ' + esc(a.src) + '</span>' : '') +
        '</div>';
    }).join('');
  }

  function tabOverview() {
    var m = med(), f = form();
    var cats = formRouteCats(f);
    var routeText = Object.keys(cats).map(function (c) { return c + (cats[c].verified ? '' : ' (not verified)'); }).join(', ');
    var facts = [['Class', m.cls], ['ATC Code', m.atc], ['Schedule', m.schedule], ['PBS Listed', m.pbs], ['Form', f.label], ['Strengths', f.strengths], ['Routes', routeText]];
    var rows = facts.map(function (r) {
      return '<div style="display:grid;grid-template-columns:112px minmax(0,1fr);gap:12px;padding:10px 0;border-bottom:1px solid #EEF2F3;font-size:14px;line-height:1.4"><span style="color:#5B6F75">' + r[0] + '</span><span style="font-weight:500">' + esc(r[1]) + (r[0] === 'Routes' ? ' <button data-act="tab:admin" style="border:0;background:transparent;padding:0;color:#1A6F67;font-weight:700;font-size:13px">How to give →</button>' : '') + '</span></div>';
    }).join('');
    return '<h2 style="' + H2 + '">Key Information</h2><div>' + rows + '</div>' +
      '<h2 style="' + H2 + ';margin-top:6px">What it looks like</h2>' + appearanceCards(f) +
      provLine(m._ids.overview.concat([f._f], f.appearance.map(function (a) { return a._f; })), 'Key information · ' + f.label) +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
        '<button data-act="go:pill" style="font-size:14px;font-weight:700;color:#1A6F67;background:#FFFFFF;border:1.5px solid #1A6F67;border-radius:14px;min-height:50px">Identify a pill</button>' +
        '<button style="font-size:14px;font-weight:700;color:#FFFFFF;background:#1A6F67;border:0;border-radius:14px;min-height:50px">Save to List</button>' +
      '</div>';
  }

  var STATUS = {
    yes:     { label: 'Yes', bg: '#ECFDF3', fg: '#054F31', bd: '#ABEFC6', glyph: '<path d="M7.5 12.5l3 3 6-6.5" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>', dot: '#079455' },
    no:      { label: 'Do not', bg: '#FEF3F2', fg: '#912018', bd: '#FDA29B', glyph: '<path d="M8 8l8 8M16 8l-8 8" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>', dot: '#D92D20' },
    caution: { label: 'Caution', bg: '#FFFAEB', fg: '#7A2E0E', bd: '#FEC84B', glyph: '<path d="M12 6.5v7M12 17v.5" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>', dot: '#DC6803' },
    info:    { label: 'Info', bg: '#EFF8FF', fg: '#194185', bd: '#B2DDFF', glyph: '<path d="M12 11v6M12 7.5v.5" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"/>', dot: '#1570EF' }
  };

  function chipRow(list, selId, act) {
    return '<div class="tabs" style="display:flex;gap:8px;overflow-x:auto;padding-bottom:2px">' + list.map(function (x) {
      var on = x.id === selId;
      return '<button data-act="' + act + ':' + x.id + '" aria-pressed="' + on + '" style="flex:none;font-size:13px;font-weight:600;border-radius:999px;padding:0 14px;min-height:38px;border:1.5px solid ' + (on ? '#1A6F67' : '#D9E3E4') + ';background:' + (on ? '#1A6F67' : '#FFFFFF') + ';color:' + (on ? '#FFFFFF' : '#142B33') + '">' + esc(x.label) + '</button>';
    }).join('') + '</div>';
  }

  function tabDosage() {
    var f = form(), sets = f.dosing;
    var d = sets.filter(function (s) { return s.id === state.doseId; })[0] || sets[0];
    var col = { adult: -1, child: -1, newborn: -1 }, mi = -1;
    d.head.forEach(function (h, i) {
      if (i === 0) return;
      if (h.indexOf('Adult') === 0) col.adult = i;
      else if (h.indexOf('Child') === 0) col.child = i;
      else if (h.indexOf('Newborn') === 0) col.newborn = i;
      else if (h === 'Max') mi = i;
    });
    var groups = ['adult', 'child', 'newborn'].filter(function (g) { return col[g] > 0; });
    var split = groups.length > 1;
    var g = split && groups.indexOf(state.pop) >= 0 ? state.pop : 'all';
    var cols = d.head.map(function (h, i) { return i; });
    if (g !== 'all') cols = [0, col[g]].concat(g === 'adult' && mi > 0 ? [mi] : []);
    var narrow = cols.length <= 3;
    var head = '<tr>' + cols.map(function (i) { return d.head[i]; }).map(function (h, i) { return '<th scope="col" style="text-align:left;padding:10px 12px;background:#F3F6F6;font-size:12px;font-weight:700;color:#24414A;border-bottom:1.5px solid #E1E8E9;' + (i === 0 ? 'position:sticky;left:0;z-index:1;' : '') + '">' + esc(h) + '</th>'; }).join('') + '</tr>';
    var body = d.rows.map(function (r) {
      return '<tr>' + cols.map(function (i) { return r[i]; }).map(function (c, i) {
        var tag = i === 0 ? 'th scope="row"' : 'td';
        return '<' + tag + ' style="text-align:left;vertical-align:top;padding:10px 12px;font-size:13px;line-height:1.4;border-bottom:1px solid #EEF2F3;' + (i === 0 ? 'position:sticky;left:0;background:#FFFFFF;font-weight:700;color:#142B33;min-width:104px;' : 'min-width:' + (narrow ? '90' : '150') + 'px;color:#24414A;') + '">' + esc(c.text) + (tagOf(c) ? ' ' + tagOf(c) : '') + '</' + tag.split(' ')[0] + '>';
      }).join('') + '</tr>';
    }).join('');
    var notes = (d.notes || []).map(function (n) { return '<li>' + esc(n.text) + (tagOf(n) ? ' ' + tagOf(n) : '') + '</li>'; }).join('');
    return '<div style="display:flex;align-items:baseline;justify-content:space-between;gap:8px"><h2 style="' + H2 + '">Dosage · ' + esc(f.label) + '</h2>' + (narrow ? '' : '<span style="font-size:11px;color:#5B6F75">Scroll table →</span>') + '</div>' +
      (sets.length > 1 ? '<div style="display:flex;flex-direction:column;gap:6px"><span style="font-size:12px;font-weight:600;color:#5B6F75">Route</span>' + chipRow(sets, d.id, 'dsel') + '</div>' : '<span style="font-size:13px;color:#5B6F75">Route: ' + esc(d.label) + '</span>') +
      (split ? popSwitch(groups) : '') +
      (split ? '<span style="font-size:14px;font-weight:700;color:#142B33">Showing: ' + (g === 'all' ? 'all groups' : GROUPS[g]) + '</span>' : '') +
      '<div style="overflow-x:auto;border:1.5px solid #E1E8E9;border-radius:12px"><table style="border-collapse:separate;border-spacing:0;width:100%;min-width:' + (narrow ? '0' : '560px') + '"><caption class="sr">' + esc(d.label) + ' doses for ' + esc(f.label) + '</caption><thead>' + head + '</thead><tbody>' + body + '</tbody></table></div>' +
      provLine(d._ids, 'Dosage · ' + f.label + ' · ' + d.label) +
      (notes ? '<ul style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:6px;font-size:13px;line-height:1.45;color:#24414A">' + notes + '</ul>' : '') +
      '<button data-act="tab:admin" style="display:flex;align-items:center;justify-content:space-between;gap:8px;border:1.5px solid #1A6F67;background:#FFFFFF;color:#1A6F67;border-radius:14px;padding:0 16px;min-height:50px;font-size:14px;font-weight:700">How to give this form' + '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A6F67" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>';
  }

  function adminItemsHtml(items) {
    return '<div style="display:flex;flex-direction:column">' + items.map(function (a) {
      var s = STATUS[a.status];
      return '<div style="display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-top:1px solid #EEF2F3">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" style="flex:none"><circle cx="12" cy="12" r="11" fill="' + s.dot + '"/>' + s.glyph + '</svg>' +
        '<div style="flex:1;display:flex;flex-direction:column;gap:3px"><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><span style="font-size:14px;font-weight:700">' + esc(a.label) + '</span>' + (a.verify ? VERIFY_TAG : '') + '<span style="font-size:11px;font-weight:700;color:' + s.fg + ';background:' + s.bg + ';border:1px solid ' + s.bd + ';border-radius:6px;padding:1px 7px">' + s.label + '</span></div>' +
        '<span style="font-size:13px;line-height:1.45;color:#24414A">' + esc(a.text) + '</span></div></div>';
    }).join('') + '</div>';
  }

  var STEPS = [['reconstitute', 'Reconstitute'], ['dilute', 'Dilute'], ['give', 'Give']];
  function fmtMin(m) { return m % 60 === 0 ? (m / 60) + (m === 60 ? ' hour' : ' hours') : m + ' minutes'; }
  function pumpText(p) {
    var lo = p.min[0], hi = p.min[1], fast = Math.round(p.ml / (lo / 60)), slow = Math.round(p.ml / (hi / 60));
    return {
      text: p.ml + ' mL over ' + fmtMin(lo) + ' to ' + fmtMin(hi) + ' = ' + slow + ' to ' + fast + ' mL/h.',
      work: 'Worked out: ' + p.ml + ' mL ÷ ' + (hi / 60) + ' h = ' + slow + ' mL/h; ' + p.ml + ' mL ÷ ' + (Math.round(lo / 60 * 100) / 100) + ' h = ' + fast + ' mL/h.'
    };
  }
  function prepEntryHtml(e, showTag) {
    var tag = (showTag ? groupTag(popLabel(e)) : '') + tagOf(e);
    var src = e.src ? '<span style="font-size:11px;color:#5B6F75">Source: ' + esc(e.src) + '</span>' : '';
    var wrap = function (inner, style) { return '<div style="display:flex;flex-direction:column;gap:3px;padding:8px 10px;border-radius:10px;' + style + '">' + inner + '</div>'; };
    if (e.missing) return wrap('<span style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">' + tag + '<span style="font-size:11px;font-weight:800;color:#344054;text-transform:uppercase;letter-spacing:.4px">Not found yet</span></span><span style="font-size:13px;line-height:1.45;color:#344054">' + esc(e.missing) + '</span>', 'background:#F2F4F7;border:1px dashed #98A2B3');
    if (e.none) return wrap((tag ? '<span style="display:flex">' + tag + '</span>' : '') + '<span style="font-size:13px;line-height:1.45;color:#5B6F75">' + esc(e.none) + '</span>' + src, 'background:#F7F9F9');
    if (e.pump) {
      var p = pumpText(e.pump);
      return wrap('<span style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">' + tag + '<span style="font-size:11px;font-weight:800;color:#0E5E59;text-transform:uppercase;letter-spacing:.4px">Pump rate</span></span><span style="font-size:14px;font-weight:700;color:#142B33">' + esc(p.text) + '</span><span style="font-size:12px;color:#5B6F75">' + esc(p.work) + ' Uses only the volume and times the source states.</span>' + src, 'background:#E5F4F2');
    }
    return wrap((tag ? '<span style="display:flex">' + tag + '</span>' : '') + '<span style="font-size:13px;line-height:1.45;color:#24414A">' + esc(e.text) + '</span>' + src, 'background:#F7F9F9');
  }
  function prepHtml(prep, g, gl) {
    var steps = STEPS.map(function (st, i) {
      var list = (prep[st[0]] || []).filter(function (e) { return forPop(e, g); });
      var inner = list.length ? list.map(function (e) { return prepEntryHtml(e, true); }).join('') :
        prepEntryHtml({ missing: g === 'all' ? 'No source read covers this step.' : 'No source read covers this step for ' + gl.toLowerCase() + '.' }, false);
      return '<div style="display:flex;gap:10px"><span aria-hidden="true" style="flex:none;width:24px;height:24px;border-radius:12px;background:#1A6F67;color:#FFFFFF;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center">' + (i + 1) + '</span>' +
        '<div style="flex:1;display:flex;flex-direction:column;gap:6px"><span style="font-size:14px;font-weight:700;color:#142B33">' + (i + 1) + '. ' + st[1] + '</span>' + inner + '</div></div>';
    }).join('');
    return '<div style="display:flex;flex-direction:column;gap:10px;border:1.5px solid #E1E8E9;border-radius:12px;padding:12px"><span style="font-size:12px;font-weight:700;color:#5B6F75;text-transform:uppercase;letter-spacing:.4px">Preparation</span>' + steps + '</div>';
  }
  function itemsByGroupHtml(items, g, gl, pops, rp) {
    var order = (g === 'all' ? ['all'].concat(pops) : ['all', g]).filter(function (k) { return !(rp && rp[k] && rp[k].status === 'na'); });
    var out = order.map(function (k) {
      var list = (items || []).filter(function (a) { return popsOf(a).indexOf(k) >= 0; });
      if (!list.length) return k === 'all' ? '' : groupHead(GROUPS[k] + ' only') + '<span style="font-size:13px;color:#5B6F75;padding:6px 0">No ' + (k === 'adult' ? 'adult' : k === 'child' ? 'child' : 'newborn') + '-specific guidance found in the sources read.</span>';
      return groupHead(k === 'all' ? 'All ages' : GROUPS[k] + ' only') + adminItemsHtml(list);
    }).join('');
    return '<div style="display:flex;flex-direction:column;gap:2px">' + out + '</div>';
  }

  function tabAdmin() {
    var f = form(), pops = formPops(f), g = curPop(f), gl = GROUPS[g];
    var sel = f.routes.filter(function (r) { return r.id === state.routeId; })[0] || f.routes[0];
    var cards = f.routes.map(function (r) {
      var open = r.id === sel.id;
      var gp = r.pops && g !== 'all' ? (r.pops[g] || { status: 'unverified', note: 'Not found in the sources read.' }) : null;
      var st = gp ? gp.status : r.status;
      var v = RSTATUS[st] || RSTATUS.unverified;
      var mini = g === 'all' && r.pops ? '<span style="display:flex;flex-wrap:wrap;gap:4px">' + pops.map(function (p) {
        var x = r.pops[p] || { status: 'unverified' }, vv = RSTATUS[x.status] || RSTATUS.unverified;
        return '<span style="font-size:10px;font-weight:700;color:' + vv.fg + ';background:' + vv.bg + ';border:1px solid ' + vv.bd + ';border-radius:5px;padding:1px 6px">' + GROUPS[p] + ': ' + vv.label + '</span>';
      }).join('') + '</span>' : '<span>' + rPill(st, gp ? '' : r.statusNote) + '</span>';
      var head = '<button data-act="rsel:' + r.id + '" aria-expanded="' + open + '" style="width:100%;text-align:left;display:flex;align-items:center;gap:10px;border:0;background:transparent;padding:12px 14px;min-height:56px">' +
        '<span aria-hidden="true" style="flex:none;width:10px;height:10px;border-radius:5px;background:' + v.dot + '"></span>' +
        '<span style="flex:1;display:flex;flex-direction:column;gap:4px"><span style="font-size:14px;font-weight:700;color:#142B33">' + esc(r.label) + '</span>' + mini + '</span>' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B6F75" stroke-width="2" stroke-linecap="round" aria-hidden="true" style="flex:none;' + (open ? 'transform:rotate(180deg)' : '') + '"><path d="M6 9l6 6 6-6"/></svg></button>';
      var body = '';
      if (open) {
        var who = r.pops ? '<div style="display:flex;flex-direction:column;gap:6px">' + (g === 'all' ? pops : [g]).map(function (p) {
          var x = r.pops[p] || { status: 'unverified', note: 'Not found in the sources read.' };
          return '<div style="display:flex;flex-direction:column;gap:3px;padding:8px 10px;border-radius:10px;background:#F7F9F9"><span style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><span style="font-size:13px;font-weight:800;color:#142B33">' + GROUPS[p] + '</span>' + rPill(x.status) + tagOf(x) + '</span>' + (x.note ? '<span style="font-size:13px;line-height:1.45;color:#24414A">' + esc(x.note) + '</span>' : '') + '</div>';
        }).join('') + '</div>' : '';
        var na = gp && gp.status === 'na';
        var pos = (r.positions || []).filter(function (p) { return forPop(p, g); });
        var brands = r.brands ? '<div style="display:flex;flex-direction:column;gap:6px"><span style="font-size:12px;font-weight:700;color:#5B6F75;text-transform:uppercase;letter-spacing:.4px">By brand</span>' + r.brands.map(function (b) {
          return '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 10px;border-radius:10px;background:#F7F9F9"><span style="display:flex;flex-direction:column;gap:1px"><span style="display:flex;gap:6px;align-items:center;font-size:14px;font-weight:700">' + esc(b.brand) + tagOf(b) + '</span><span style="font-size:11px;color:#5B6F75">' + esc(b.note) + '</span></span>' + rPill(b.status) + '</div>';
        }).join('') + '</div>' : '';
        body = '<div style="padding:0 14px 14px;display:flex;flex-direction:column;gap:12px">' +
          (r.summary ? '<span style="font-size:13px;line-height:1.5;color:#24414A">' + esc(r.summary) + '</span>' : '') +
          who +
          (na ? '' :
            (r.prep ? prepHtml(r.prep, g, gl) : '') +
            (pos.length ? '<div style="display:flex;flex-direction:column;gap:6px"><span style="font-size:12px;font-weight:700;color:#4A1FB8;text-transform:uppercase;letter-spacing:.4px">' + esc(r.positionsTitle || 'What each source says') + '</span>' + positionsHtml(pos) + '</div>' : '') +
            brands +
            (r.items ? itemsByGroupHtml(r.items, g, gl, pops, r.pops) : '')) +
          provLine(r._ids, f.label + ' · ' + r.label) + '</div>';
      }
      return '<div style="' + CARD + ';border-color:' + (open ? '#9CC5C0' : '#E1E8E9') + ';overflow:hidden">' + head + body + '</div>';
    }).join('');
    var legend = ['licensed', 'accepted', 'differ', 'unverified', 'no', 'na'].map(function (k) { return rPill(k); }).join('');
    return '<h2 style="' + H2 + '">How to give · ' + esc(f.label) + '</h2>' +
      popSwitch(pops) +
      '<span style="font-size:15px;font-weight:800;color:#142B33">Showing: ' + (g === 'all' ? 'all groups (' + pops.map(function (p) { return GROUPS[p].toLowerCase(); }).join(', ') + ')' : gl) + '</span>' +
      '<span style="font-size:13px;line-height:1.5;color:#5B6F75">Each route is checked against the Product Information and Australian guidelines, for each patient group. Tap a route for details.</span>' +
      cards +
      '<div style="display:flex;flex-direction:column;gap:6px"><span style="font-size:12px;font-weight:600;color:#5B6F75">Status labels</span><div style="display:flex;flex-wrap:wrap;gap:6px">' + legend + '</div>' +
      '<span style="font-size:12px;line-height:1.5;color:#5B6F75">Licensed: in the PI or on the ARTG. Accepted practice: in an Australian guideline. Sources differ: each source’s position is shown. Not verified: no document found yet. Not for this group: another form is used.</span></div>';
  }

  function tabInteractions() {
    var m = med();
    var cards = m.interactions.important.map(function (p) {
      var d = sevDeco(p.sev);
      return '<div style="display:flex;gap:12px;align-items:flex-start;background:' + d.v.bg + ';border:1.5px solid ' + d.v.bd + ';border-radius:14px;padding:14px">' + d.icon +
        '<div style="flex:1;display:flex;flex-direction:column;gap:4px"><div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start"><span style="font-size:14px;font-weight:700;color:' + d.v.fg + '">' + esc(p.title) + '</span>' + d.tag + '</div><span style="font-size:13px;line-height:1.45;color:#24414A">' + esc(p.text) + (tagOf(p) ? ' ' + tagOf(p) : '') + '</span></div></div>';
    }).join('');
    var other = m.interactions.other.map(function (o) {
      var v = SEV[o.sev];
      return '<li><span>' + esc(o.text) + (tagOf(o) ? ' ' + tagOf(o) : '') + ' <span style="white-space:nowrap;font-size:11px;font-weight:700;color:' + v.fg + ';background:' + v.bg + ';border:1px solid ' + v.bd + ';border-radius:6px;padding:1px 7px">' + v.label + '</span></span>' + (o.positions ? '<div style="margin-top:6px">' + positionsHtml(o.positions) + '</div>' : '') + '</li>';
    }).join('');
    return '<h2 style="' + H2 + '">Important Interactions</h2>' + cards +
      '<h2 style="' + H2 + ';margin-top:6px">Other Notable Interactions</h2>' +
      '<ul style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:10px;font-size:14px;line-height:1.45">' + other + '</ul>' +
      provLine(m._ids.interactions, 'Interactions') +
      '<button data-act="checkwith" style="font-size:15px;font-weight:700;color:#FFFFFF;background:#1A6F67;border:0;border-radius:14px;min-height:50px">Check with other medicines</button>';
  }

  var TONES = {
    green:  { bg: '#EEF8F1', bd: '#BFE3CB', fg: '#145C34', icon: '#1E7A45' },
    amber:  { bg: '#FFFAEB', bd: '#FEC84B', fg: '#7A2E0E', icon: '#B54708' },
    red:    { bg: '#FEF3F2', bd: '#FDA29B', fg: '#912018', icon: '#B42318' },
    blue:   { bg: '#EEF5FC', bd: '#C2DAF3', fg: '#174D87', icon: '#1D5FA8' },
    purple: { bg: '#F4F3FF', bd: '#BDB4FE', fg: '#4A1FB8', icon: '#6941C6' }
  };

  function tabPregnancy() {
    var m = med();
    function card(t, title, strong, text, extra, tag) {
      var c = TONES[t];
      return '<div style="display:flex;gap:12px;background:' + c.bg + ';border:1.5px solid ' + c.bd + ';border-radius:16px;padding:14px"><span style="flex:none;width:40px;height:40px;border-radius:20px;background:#FFFFFF;display:flex;align-items:center;justify-content:center">' + ICON.drop(c.icon) + '</span>' +
        '<div style="flex:1;display:flex;flex-direction:column;gap:6px"><span style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;font-size:15px;font-weight:700;color:' + c.fg + '">' + title + (tag || '') + '</span><span style="font-size:14px;font-weight:600">' + esc(strong) + '</span><span style="font-size:13px;line-height:1.45;color:#24414A">' + esc(text) + '</span>' + (extra || '') + '</div></div>';
    }
    var bf = m.breastfeeding;
    return '<h2 style="' + H2 + '">Pregnancy &amp; Breastfeeding</h2>' +
      card(m.pregnancy.tone, 'Pregnancy', m.pregnancy.label || ('TGA Category ' + m.pregnancy.cat), m.pregnancy.text + ' Categories describe the evidence, not a safety ranking.', '', tagOf(m.pregnancy)) +
      card(bf.tone, 'Breastfeeding', bf.status, bf.text, bf.positions ? positionsHtml(bf.positions) : '', tagOf(bf)) +
      provLine(m._ids.pregnancy, 'Pregnancy and breastfeeding') +
      '<div style="display:flex;gap:10px;align-items:flex-start;border:1.5px solid #D6E3EE;background:#F7FAFC;border-radius:14px;padding:12px 14px"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D5FA8" stroke-width="2" stroke-linecap="round" aria-hidden="true" style="flex:none;margin-top:1px"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.5"/></svg><span style="font-size:13px;line-height:1.5;color:#24414A">Always consider the individual clinical situation. For advice in NSW, MotherSafe: <a href="tel:0293826539" style="font-weight:600">(02) 9382 6539</a></span></div>';
  }

  function tabMore() {
    var m = med();
    function block(color, fill, glyph, title, items) {
      return '<div style="display:flex;flex-direction:column;gap:8px"><span style="display:flex;align-items:center;gap:8px;font-size:15px;font-weight:700;color:' + color + '"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="' + fill + '"/>' + glyph + '</svg>' + title + '</span>' +
        '<ul style="margin:0;padding-left:46px;display:flex;flex-direction:column;gap:6px;font-size:13px;line-height:1.45;color:#24414A">' + items.map(function (i) { return '<li>' + esc(i.text) + (tagOf(i) ? ' ' + tagOf(i) : '') + '</li>'; }).join('') + '</ul></div>';
    }
    var X = '<path d="M8 8l8 8M16 8l-8 8" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round"/>';
    var BANG = '<path d="M12 6.5v7M12 17v.5" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round"/>';
    var PULSE = '<path d="M5 12h3l2-4 3 8 2-4h4" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
    return block('#B42318', '#D92D20', X, 'Contraindications', m.contraindications) +
      block('#93370D', '#F79009', BANG, 'Use with Caution', m.caution) +
      block('#93370D', '#E8590C', BANG, 'Warnings', m.warnings) +
      block('#0E5E59', '#1A8A7E', PULSE, 'Monitoring', m.monitoring) +
      provLine(m._ids.more, 'Contraindications, cautions, warnings, monitoring') +
      '<a href="https://www.tga.gov.au/resources/artg" target="_blank" rel="noopener" style="display:flex;gap:12px;align-items:center;background:#EEF5FC;border:1.5px solid #C2DAF3;border-radius:14px;padding:12px 14px;text-decoration:none;color:#142B33"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D5FA8" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h9l4 4v14H6z"/><path d="M9 12h7M9 16h5"/></svg><span style="display:flex;flex-direction:column;gap:2px"><span style="font-size:14px;font-weight:600">Full prescribing information</span><span style="font-size:12px;color:#1D5FA8">View TGA product information (PI)</span></span></a>';
  }

  // ---------- interaction checker ----------
  // Add picker: type to filter, so it scales past a handful of medicines.
  var SEV_ORDER = ['major', 'moderate', 'minor', 'conflict', 'none'];

  function checkHits(sel) {
    return PAIRS.filter(function (p) { return sel.indexOf(p.a) >= 0 && sel.indexOf(p.b) >= 0; })
      .sort(function (a, b) { return SEV[a.sev].rank - SEV[b.sev].rank; });
  }
  // PAIRS are demo facts. Look for the same pair in a medicine's interactions so the card can name a real source.
  function pairEvidence(p) {
    var out = [];
    [[p.a, p.b], [p.b, p.a]].forEach(function (x) {
      var m = D.MEDS[x[0]]; if (!m) return;
      var all = m.interactions.important.concat(m.interactions.other);
      var hit = all.filter(function (i) { return i['with'].indexOf(x[1]) >= 0; })[0];
      if (hit) out.push({ med: m, item: hit, verify: hit.verify });
    });
    return out;
  }
  function medThumb(id, s) {
    var m = D.MEDS[id];
    if (m) return '<span style="flex:none;width:' + s + 'px;height:' + s + 'px;border-radius:12px;background:#E5F4F2;display:flex;align-items:center;justify-content:center">' + drawPill(m.forms[0].appearance[0], Math.round(s * 0.75)) + '</span>';
    return '<span style="flex:none;width:' + s + 'px;height:' + s + 'px;border-radius:12px;background:#EEF2F3;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;color:#5B6F75">' + esc(CHECK_MEDS[id].slice(0, 2)) + '</span>';
  }

  function checkHero(sel, hits) {
    var title, sub, sevs = '';
    if (sel.length < 2) { title = 'Add two or more medicines'; sub = 'Every pair in your list is checked.'; }
    else if (!hits.length) { title = 'No interactions listed'; sub = 'None in our sample data for these ' + sel.length + '. That is not proof there are none.'; }
    else {
      title = hits.length + (hits.length === 1 ? ' interaction' : ' interactions') + ' across ' + sel.length + ' medicines';
      sub = 'Most serious first. Each one names its source.';
      sevs = '<div style="display:flex;flex-wrap:wrap;gap:6px">' + SEV_ORDER.map(function (k) {
        var n = hits.filter(function (p) { return p.sev === k; }).length;
        return n ? '<span style="display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:' + SEV[k].fg + ';background:' + SEV[k].bg + ';border-radius:999px;padding:3px 10px"><span aria-hidden="true" style="width:8px;height:8px;border-radius:4px;background:' + SEV[k].icon + '"></span>' + n + ' ' + SEV[k].label + '</span>' : '';
      }).join('') + '</div>';
    }
    return '<div style="background:#0C2A30;color:#FFFFFF;border-radius:16px;padding:18px;display:flex;align-items:center;gap:12px">' +
      '<div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:8px"><span style="font-size:16px;font-weight:700;line-height:1.35">' + title + '</span><span style="font-size:12px;line-height:1.5;color:#C3DADB">' + sub + '</span>' + sevs + '</div>' +
      '<svg width="58" height="40" viewBox="0 0 24 16" fill="none" stroke="#3FC1B2" stroke-width="1.6" aria-hidden="true" style="flex:none"><circle cx="8.5" cy="8" r="6.5"/><circle cx="15.5" cy="8" r="6.5" fill="#3FC1B2" fill-opacity="0.18"/></svg></div>';
  }

  function checkList(sel, hits) {
    var rows = sel.map(function (id, i) {
      var mine = hits.filter(function (p) { return p.a === id || p.b === id; });
      var worst = mine[0];
      var sub = D.MEDS[id] ? esc(D.MEDS[id].cls) : 'Checker only · full entry not built yet';
      var count = worst ? '<span style="font-size:12px;font-weight:700;color:' + SEV[worst.sev].fg + '">' + mine.length + (mine.length === 1 ? ' interaction' : ' interactions') + '</span>' : '';
      return '<div style="display:flex;align-items:center;gap:12px;padding:10px 4px 10px 12px;' + (i ? 'border-top:1px solid #EEF2F3' : '') + '">' + medThumb(id, 44) +
        '<span style="flex:1;min-width:0;display:flex;flex-direction:column;gap:2px"><span style="font-size:14px;font-weight:700">' + esc(CHECK_MEDS[id]) + '</span><span style="font-size:12px;color:#5B6F75">' + sub + '</span>' + count + '</span>' +
        '<button data-act="remove:' + id + '" aria-label="Remove ' + esc(CHECK_MEDS[id]) + '" style="flex:none;width:44px;height:44px;border:0;border-radius:22px;background:transparent;display:flex;align-items:center;justify-content:center">' + ICON.x('#5B6F75', 14) + '</button></div>';
    }).join('');
    var total = Object.keys(CHECK_MEDS).length;
    var adder = '<div style="border-top:1px solid #EEF2F3;padding:12px;display:flex;flex-direction:column;gap:6px;background:#F7FAFA">' +
      '<label style="display:flex;align-items:center;gap:10px;border:1.5px solid #D9E3E4;border-radius:12px;padding:0 12px;min-height:48px;background:#FFFFFF">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A6F67" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>' +
        '<span class="sr">Add a medicine by name or brand</span><input id="addq" type="text" role="combobox" aria-autocomplete="list" aria-controls="addlist" aria-expanded="false" autocomplete="off" enterkeyhint="done" placeholder="Add a medicine or brand" style="font-size:16px;border:0;outline:none;background:transparent;flex:1;min-width:0;min-height:44px"></label>' +
      '<div id="addlist" role="listbox" aria-label="Matching medicines" style="display:flex;flex-direction:column">' + addListHtml() + '</div>' +
      '<span id="addhint" style="font-size:12px;color:#5B6F75;padding:0 2px">Type a name or brand. Checks against ' + total + ' medicines.</span></div>';
    return '<div style="display:flex;flex-direction:column;gap:10px"><div style="display:flex;justify-content:space-between;align-items:baseline"><h2 style="' + H2 + '">Your Medicines</h2><span style="font-size:12px;color:#5B6F75">' + sel.length + ' added</span></div>' +
      '<div style="' + CARD + ';border-radius:16px;overflow:hidden">' + (rows || '<div style="padding:14px;font-size:13px;color:#5B6F75">Nothing added yet.</div>') + adder + '</div></div>';
  }

  // ---- add picker: scales to a long list by typing, not scrolling chips ----
  var ADD_MAX = 6;
  function addCandidates(raw) {
    var q = raw.trim().toLowerCase(), out = [];
    if (!q) return out;
    Object.keys(CHECK_MEDS).forEach(function (id) {
      var name = CHECK_MEDS[id], n = name.toLowerCase(), m = D.MEDS[id], score = -1, brand = '';
      if (n.indexOf(q) === 0) score = 0;
      else if (n.split(/\s+/).some(function (w) { return w.indexOf(q) === 0; })) score = 1;
      else if (n.indexOf(q) >= 0) score = 2;
      else if (m) {
        brand = m.brands.split(',').map(function (x) { return x.trim(); }).filter(function (x) { return x.toLowerCase().indexOf(q) >= 0; })[0] || '';
        if (brand) score = 3;
      }
      var added = state.selected.indexOf(id) >= 0;
      if (score >= 0) out.push({ id: id, name: name, brand: brand, score: added ? 9 : score, added: added });
    });
    return out.sort(function (a, b) { return a.score - b.score || a.name.localeCompare(b.name); });
  }
  function markq(text, q) {
    var i = text.toLowerCase().indexOf(q.trim().toLowerCase());
    if (i < 0 || !q.trim()) return esc(text);
    var j = i + q.trim().length;
    return esc(text.slice(0, i)) + '<strong style="font-weight:800;color:#0E5E59">' + esc(text.slice(i, j)) + '</strong>' + esc(text.slice(j));
  }
  function addListHtml() {
    var q = state.addq || '';
    if (!q.trim()) return '';
    var list = addCandidates(q), open = list.filter(function (x) { return !x.added; });
    if (!list.length) return '<span style="padding:10px 4px;font-size:13px;line-height:1.45;color:#24414A">No medicine matching “' + esc(q.trim()) + '” in the checker yet.</span>';
    var shown = open.slice(0, ADD_MAX).concat(list.filter(function (x) { return x.added; }).slice(0, 2));
    var html = shown.map(function (x, i) {
      var on = !x.added && i === state.addIdx;
      var sub = x.brand ? 'Brand: ' + markq(x.brand, q) : (D.MEDS[x.id] ? esc(D.MEDS[x.id].cls) : 'Checker only');
      var right = x.added ? '<span style="flex:none;font-size:11px;font-weight:700;color:#5B6F75">In your list</span>' :
        '<span aria-hidden="true" style="flex:none;width:28px;height:28px;border-radius:14px;background:' + (on ? '#1A6F67' : '#E5F4F2') + ';display:flex;align-items:center;justify-content:center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="' + (on ? '#FFFFFF' : '#1A6F67') + '" stroke-width="3" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span>';
      return '<button ' + (x.added ? 'disabled aria-disabled="true"' : 'data-act="add:' + x.id + '"') + ' role="option" id="opt-' + i + '" aria-selected="' + on + '" style="display:flex;align-items:center;gap:12px;width:100%;text-align:left;border:0;border-radius:10px;padding:6px 8px;min-height:52px;background:' + (on ? '#E5F4F2' : 'transparent') + ';opacity:' + (x.added ? '.6' : '1') + '">' + medThumb(x.id, 36) +
        '<span style="flex:1;min-width:0;display:flex;flex-direction:column;gap:1px"><span style="font-size:14px;font-weight:600">' + markq(x.name, q) + '</span><span style="font-size:12px;color:#5B6F75">' + sub + '</span></span>' + right + '</button>';
    }).join('');
    if (open.length > ADD_MAX) html += '<span style="padding:6px 8px;font-size:12px;color:#5B6F75">' + (open.length - ADD_MAX) + ' more. Keep typing to narrow.</span>';
    return html;
  }
  function updateAddList() {
    var l = document.getElementById('addlist'), i = document.getElementById('addq'), h = document.getElementById('addhint');
    if (l) l.innerHTML = addListHtml();
    var q = (state.addq || '').trim();
    if (h) h.hidden = !!q;
    if (i) {
      i.setAttribute('aria-expanded', q ? 'true' : 'false');
      if (q && document.getElementById('opt-' + state.addIdx)) i.setAttribute('aria-activedescendant', 'opt-' + state.addIdx);
      else i.removeAttribute('aria-activedescendant');
    }
  }
  function checkAddInput(v) { state.addq = v; state.addIdx = 0; updateAddList(); }
  function checkAdd(id) { if (state.selected.indexOf(id) < 0) state.selected = state.selected.concat([id]); state.addq = ''; state.addIdx = 0; }
  // Returns an id to add on Enter, else null.
  function checkAddKey(e) {
    var n = Math.min(ADD_MAX, addCandidates(state.addq || '').filter(function (x) { return !x.added; }).length);
    if (e.key === 'ArrowDown' && n) { e.preventDefault(); state.addIdx = (state.addIdx + 1) % n; updateAddList(); }
    else if (e.key === 'ArrowUp' && n) { e.preventDefault(); state.addIdx = (state.addIdx - 1 + n) % n; updateAddList(); }
    else if (e.key === 'Escape') { e.preventDefault(); e.target.value = ''; checkAddInput(''); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      var hit = addCandidates(state.addq || '').filter(function (x) { return !x.added; })[state.addIdx];
      return hit ? hit.id : null;
    }
    return null;
  }

  function pairCard(p) {
    var d = sevDeco(p.sev), ev = pairEvidence(p);
    var conflict = ev.filter(function (e) { return e.item.positions; })[0];
    var srcRows = ev.length ? ev.map(function (e) {
      return '<span style="font-size:12px;line-height:1.5;color:#24414A"><span style="font-weight:700">' + esc(e.med.name) + ' entry: </span>' + esc(D.prov.citeLine(e.item._ids) || 'To check: ' + D.prov.lookInLine(e.item._ids)) + (e.verify ? ' ' + VERIFY_TAG : '') + '</span>';
    }).join('') : '<span style="font-size:12px;line-height:1.5;color:#24414A"><span style="font-weight:700">No source yet.</span> Check the PI for each medicine.</span>';
    var open = [p.a, p.b].filter(function (id) { return D.MEDS[id]; }).map(function (id) {
      return '<button data-act="medtab:' + id + ':interactions" style="font-size:12px;font-weight:700;color:#0E5E59;background:#FFFFFF;border:1px solid ' + d.v.bd + ';border-radius:10px;padding:0 12px;min-height:36px">Open ' + esc(D.MEDS[id].name) + '</button>';
    }).join('');
    return '<div style="display:flex;flex-direction:column;gap:10px;background:' + d.v.bg + ';border:1.5px solid ' + d.v.bd + ';border-radius:16px;padding:14px">' +
      '<div style="display:flex;gap:10px;align-items:flex-start">' + d.icon +
        '<div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:4px"><div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start"><span style="font-size:15px;font-weight:700;color:' + d.v.fg + '">' + esc(p.title) + '</span>' + d.tag + '</div>' +
        '<span style="font-size:13px;line-height:1.45;color:#24414A">' + esc(p.text) + '</span></div></div>' +
      (conflict ? positionsHtml(conflict.item.positions) : '') +
      '<div style="display:flex;flex-direction:column;gap:4px;border-top:1px solid ' + d.v.bd + ';padding-top:10px">' + srcRows + '</div>' +
      (open ? '<div style="display:flex;flex-wrap:wrap;gap:6px">' + open + '</div>' : '') + '</div>';
  }

  function viewCheck() {
    var sel = state.selected, hits = checkHits(sel);
    var quiet = [];
    for (var i = 0; i < sel.length; i++) for (var j = i + 1; j < sel.length; j++) {
      var a = sel[i], b = sel[j];
      if (!hits.some(function (p) { return (p.a === a && p.b === b) || (p.a === b && p.b === a); })) quiet.push(CHECK_MEDS[a] + ' + ' + CHECK_MEDS[b]);
    }
    var results = sel.length < 2 ? '' :
      '<div style="display:flex;flex-direction:column;gap:10px"><h2 style="' + H2 + '">Potential Interactions</h2>' +
        (hits.length ? hits.map(pairCard).join('') : '') +
        (quiet.length ? '<details style="' + CARD + ';border-radius:14px;padding:0 14px"><summary style="cursor:pointer;min-height:48px;display:flex;align-items:center;font-size:13px;font-weight:600;color:#24414A">' + quiet.length + (quiet.length === 1 ? ' pair' : ' pairs') + ' with nothing listed</summary>' +
          '<div style="display:flex;flex-direction:column;gap:6px;padding:0 0 12px;font-size:13px;color:#24414A">' + quiet.map(function (q) { return '<span>' + esc(q) + '</span>'; }).join('') +
          '<span style="font-size:12px;color:#5B6F75">Not in our sample data. Confirm with a pharmacist.</span></div></details>' : '') + '</div>';
    return '<div style="padding:18px 18px 24px;display:flex;flex-direction:column;gap:14px">' +
      pageHeader('Interactions') +
      checkHero(sel, hits) + checkList(sel, hits) + results +
      '<div style="display:flex;flex-direction:column;gap:6px">' + sampleBadge() + '<span style="font-size:12px;line-height:1.5;color:#5B6F75">Checker pairs are demo data. Real pair data is on the MVP to-do list.</span></div>' +
      '</div>';
  }

  // ---------- pill identifier ----------
  function norm(s) { return String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); }

  function pillMatches() {
    var p = state.pill;
    var imp = norm(p.imprint);
    if (!p.shape && !p.color && !imp && p.scored === 'any') return null;
    var out = [];
    PILLS.forEach(function (x) {
      var a = x.a, score = 0, max = 0, why = [];
      if (p.shape) { max += 2; if (a.shape === p.shape) { score += 2; why.push('shape'); } }
      if (p.color) { max += 2; if (a.colors.indexOf(p.color) >= 0) { score += 2; why.push('colour'); } }
      if (imp) { max += 4; var ai = norm(a.imprint); if (ai === imp) { score += 4; why.push('imprint'); } else if (ai.indexOf(imp) >= 0) { score += 3; why.push('part of imprint'); } }
      if (p.scored !== 'any' && a.shape !== 'capsule') { max += 1; if ((p.scored === 'yes') === !!a.scored) { score += 1; why.push('score line'); } }
      if (score > 0 && score / max >= 0.5) out.push({ x: x, score: score, max: max, why: why });
    });
    out.sort(function (a, b) { return b.score / b.max - a.score / a.max; });
    return out.slice(0, 8);
  }

  function pillResultCard(x, label, labelColor, extra) {
    var a = x.a;
    var inner = '<span style="flex:none;width:76px;height:52px;border-radius:10px;background:#F3F6F6;display:flex;align-items:center;justify-content:center">' + drawPill(a, 66) + '</span>' +
      '<span style="flex:1;display:flex;flex-direction:column;gap:3px"><span style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><span style="font-size:14px;font-weight:700">' + esc(a.label) + '</span>' + tagOf(a) + '<span style="font-size:11px;font-weight:700;color:' + labelColor + '">' + label + '</span></span>' +
      '<span style="font-size:12px;color:#5B6F75">' + esc(a.desc) + '</span>' + (extra || '') +
      '<span style="font-size:12px;font-weight:600;color:#1A6F67">' + esc(x.sub) + '</span></span>' + (x.medId ? ICON.chevron : '');
    var style = 'text-align:left;display:flex;align-items:center;gap:12px;' + CARD + ';padding:10px 12px';
    return x.medId ? '<button data-act="med:' + x.medId + ':' + x.formId + '" style="' + style + '">' + inner + '</button>' : '<div style="' + style + '">' + inner + '</div>';
  }

  function pillResultsHtml() {
    var res = pillMatches();
    if (!res) return '<div style="' + CARD + ';padding:16px;font-size:14px;line-height:1.5;color:#24414A">Pick a shape, colour or imprint to see possible matches.</div>';
    if (!res.length) return '<div style="' + CARD + ';padding:16px;font-size:14px;line-height:1.5;color:#24414A">No pills in our sample data match. Try fewer details, or just the imprint.</div>';
    return '<span style="font-size:13px;font-weight:600;color:#5B6F75">' + res.length + ' possible ' + (res.length === 1 ? 'match' : 'matches') + '</span>' +
      res.map(function (r) {
        var full = r.score === r.max;
        return pillResultCard(r.x, full ? 'Strong match' : 'Partial match', full ? '#054F31' : '#7A2E0E', '<span style="font-size:11px;color:#5B6F75">Matches: ' + r.why.join(', ') + '</span>');
      }).join('');
  }

  function viewPill() {
    var mode = state.pillMode;
    function modeBtn(id, label, extra) {
      var on = mode === id;
      return '<button data-act="pillmode:' + id + '" aria-pressed="' + on + '" style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;min-height:42px;border:0;border-radius:10px;font-size:14px;font-weight:700;background:' + (on ? '#FFFFFF' : 'transparent') + ';color:' + (on ? '#142B33' : '#5B6F75') + ';box-shadow:' + (on ? '0 1px 3px rgba(0,0,0,.12)' : 'none') + '">' + label + (extra || '') + '</button>';
    }
    var proTag = '<span style="font-size:10px;font-weight:800;color:#5C3D00;background:#F2B53A;border-radius:999px;padding:2px 7px">PRO</span>';
    var top = '<div style="display:flex;gap:4px;background:#EEF2F3;border-radius:12px;padding:4px">' + modeBtn('describe', 'Describe it') + modeBtn('photo', 'Photo', proTag) + '</div>';
    var content = mode === 'describe' ? pillDescribe() : pillPhoto();
    return '<div style="display:flex;flex-direction:column">' +
      '<div style="padding:18px 20px 24px;display:flex;flex-direction:column;gap:16px">' + pageHeader('Pill Identifier', { back: true }) + top + content +
      '<div style="display:flex;gap:10px;align-items:flex-start;background:#FFFAEB;border:1.5px solid #FEC84B;border-radius:14px;padding:12px 14px"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style="flex:none;margin-top:1px"><circle cx="12" cy="12" r="11" fill="#DC6803"/><path d="M12 6.5v7M12 17v.5" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round"/></svg><span style="font-size:13px;line-height:1.5;color:#4D2A06">Always confirm a pill’s identity with its packaging, imprint and a pharmacist before giving it. Appearances marked “To verify” are not yet confirmed.</span></div>' +
      '</div></div>';
  }

  function pillDescribe() {
    var p = state.pill;
    var shapes = SHAPES.map(function (s) {
      var on = p.shape === s;
      return '<button data-act="pshape:' + s + '" aria-pressed="' + on + '" style="display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 4px;border-radius:12px;min-height:72px;border:2px solid ' + (on ? '#1A6F67' : '#E1E8E9') + ';background:' + (on ? '#E5F4F2' : '#FFFFFF') + ';font-size:12px;font-weight:600">' +
        drawPill({ shape: s, colors: s === 'capsule' ? ['white', 'blue'] : ['white'] }, 48) + cap(s) + '</button>';
    }).join('');
    var colors = SWATCHES.map(function (c) {
      var on = p.color === c;
      return '<button data-act="pcolor:' + c + '" aria-pressed="' + on + '" aria-label="' + D.COLORS[c].label + '" style="display:flex;flex-direction:column;align-items:center;gap:4px;border:0;background:transparent;padding:2px;min-height:56px;font-size:11px;font-weight:600;color:' + (on ? '#142B33' : '#5B6F75') + '">' +
        '<span style="width:34px;height:34px;border-radius:17px;background:' + hex(c) + ';border:' + (c === 'white' ? '1.5px solid #C9D3D5' : '1.5px solid rgba(0,0,0,.08)') + ';box-shadow:' + (on ? '0 0 0 3px #FFFFFF,0 0 0 5px #1A6F67' : 'none') + '"></span>' + D.COLORS[c].label + '</button>';
    }).join('');
    var scored = [['any', 'Any'], ['yes', 'Yes'], ['no', 'No']].map(function (s) {
      var on = p.scored === s[0];
      return '<button data-act="pscored:' + s[0] + '" aria-pressed="' + on + '" style="flex:1;min-height:40px;border-radius:10px;font-size:13px;font-weight:600;border:1.5px solid ' + (on ? '#1A6F67' : '#D9E3E4') + ';background:' + (on ? '#1A6F67' : '#FFFFFF') + ';color:' + (on ? '#FFFFFF' : '#142B33') + '">' + s[1] + '</button>';
    }).join('');
    return '<div style="display:flex;flex-direction:column;gap:8px"><span style="font-size:14px;font-weight:700">Imprint (letters or numbers)</span>' +
        '<label style="display:flex;align-items:center;gap:10px;border:1.5px solid #D9E3E4;border-radius:12px;padding:0 12px;min-height:48px"><span class="sr">Imprint</span><input id="imp" type="text" autocomplete="off" autocapitalize="characters" placeholder="e.g. D25 or 200" style="font-size:16px;border:0;outline:none;background:transparent;flex:1;min-width:0;min-height:44px;text-transform:uppercase"></label></div>' +
      '<div style="display:flex;flex-direction:column;gap:8px"><span style="font-size:14px;font-weight:700">Shape</span><div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px">' + shapes + '</div></div>' +
      '<div style="display:flex;flex-direction:column;gap:8px"><span style="font-size:14px;font-weight:700">Colour</span><div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px">' + colors + '</div></div>' +
      '<div style="display:flex;flex-direction:column;gap:8px"><span style="font-size:14px;font-weight:700">Score line</span><div style="display:flex;gap:8px">' + scored + '</div></div>' +
      '<div style="display:flex;justify-content:space-between;align-items:center"><h2 style="' + H2 + '">Possible matches</h2><button data-act="pclear" style="border:0;background:transparent;color:#1A6F67;font-size:13px;font-weight:700;min-height:36px">Clear all</button></div>' +
      '<div id="pillresults" style="display:flex;flex-direction:column;gap:10px">' + pillResultsHtml() + '</div>';
  }

  function pillPhoto() {
    if (!state.pro && !state.demo) {
      return '<div style="background:#0C2A30;color:#FFFFFF;border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:12px;align-items:flex-start">' +
        ICON.camera('#3FC1B2') +
        '<span style="font-size:18px;font-weight:800">Identify a pill from a photo</span>' +
        '<span style="font-size:14px;line-height:1.5;color:#D6E6E6">Take a photo and MediAUS uses AI to compare its shape, colour and imprint with every pill in the database. Part of MediAUS Pro.</span>' +
        '<div style="display:flex;gap:10px;width:100%;margin-top:4px"><button data-act="go:plan" style="flex:1;min-height:46px;border:0;border-radius:12px;background:#1F9D8E;color:#FFFFFF;font-size:14px;font-weight:700">See Pro plans</button>' +
        '<button data-act="demo" style="flex:1;min-height:46px;border:1.5px solid #A9C7C8;border-radius:12px;background:transparent;color:#FFFFFF;font-size:14px;font-weight:700">Try the demo</button></div></div>';
    }
    var tips = '<ul style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:4px;font-size:13px;line-height:1.45;color:#24414A"><li>Put the pill on a plain, dark surface</li><li>Use good light, without flash glare</li><li>Imprint facing up and in focus</li></ul>';
    if (state.photoState === 'idle') {
      return '<div style="border:2px dashed #A8D3CD;border-radius:16px;padding:20px;display:flex;flex-direction:column;align-items:center;gap:12px;background:#F7FBFA">' +
        ICON.camera('#1A6F67') + '<span style="font-size:16px;font-weight:700">Photograph the pill</span>' +
        '<label style="width:100%;display:flex;align-items:center;justify-content:center;gap:8px;min-height:50px;border-radius:12px;background:#1A6F67;color:#FFFFFF;font-size:15px;font-weight:700;cursor:pointer">' + ICON.camera('#FFFFFF') + 'Take photo<input class="sr" type="file" accept="image/*" capture="environment" data-photo="1"></label>' +
        '<label style="width:100%;display:flex;align-items:center;justify-content:center;min-height:46px;border-radius:12px;border:1.5px solid #1A6F67;color:#1A6F67;font-size:14px;font-weight:700;cursor:pointer">Choose from gallery<input class="sr" type="file" accept="image/*" data-photo="1"></label>' +
        '</div><div style="display:flex;flex-direction:column;gap:6px"><span style="font-size:14px;font-weight:700">For the best result</span>' + tips + '</div>' +
        (state.pro ? '' : '<span style="font-size:12px;color:#5B6F75">Demo mode: results are simulated.</span>');
    }
    var img = '<div style="position:relative;border-radius:16px;overflow:hidden;background:#0C2A30;height:200px;display:flex;align-items:center;justify-content:center">' +
      (state.photo ? '<img src="' + state.photo + '" alt="Your pill photo" style="width:100%;height:100%;object-fit:cover">' : '') +
      (state.photoState === 'analysing' ? '<div style="position:absolute;inset:0;background:rgba(12,42,48,.6);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:#FFFFFF"><span class="spin" style="width:34px;height:34px;border-radius:17px;border:4px solid rgba(255,255,255,.3);border-top-color:#3FC1B2"></span><span style="font-size:14px;font-weight:600">Analysing shape, colour and imprint…</span></div>' : '') +
      '</div>';
    if (state.photoState === 'analysing') return img;
    // simulated AI results
    var picks = [
      { find: 'Cordarone X 200 mg', conf: 86 },
      { find: 'Lanoxin 250 microgram', conf: 58 },
      { find: 'Metformin 500 mg', conf: 31 }
    ];
    var cards = picks.map(function (p) {
      var x = PILLS.filter(function (y) { return y.a.label === p.find; })[0];
      var bar = '<span style="display:flex;align-items:center;gap:8px"><span style="flex:1;height:6px;border-radius:3px;background:#E1E8E9;overflow:hidden"><span style="display:block;height:100%;width:' + p.conf + '%;background:' + (p.conf > 70 ? '#079455' : p.conf > 45 ? '#DC6803' : '#98A2B3') + '"></span></span><span style="font-size:12px;font-weight:700;color:#24414A">' + p.conf + '%</span></span>';
      return pillResultCard(x, p.conf > 70 ? 'Likely' : 'Possible', p.conf > 70 ? '#054F31' : '#7A2E0E', bar);
    }).join('');
    return img + '<div style="display:flex;justify-content:space-between;align-items:center"><h2 style="' + H2 + '">AI suggestions</h2><button data-act="retake" style="border:0;background:transparent;color:#1A6F67;font-size:13px;font-weight:700;min-height:36px">Retake</button></div>' +
      cards + '<span style="font-size:12px;color:#5B6F75">' + (state.pro ? 'Pro preview' : 'Demo') + ': results are simulated for this prototype.</span>';
  }


  // ---------- barcode scanner (Pro) ----------
  var cam = { stream: null, track: null, timer: null, detector: null, detectorReady: false, torchOk: false, simIndex: 0 };
  function scanUnlocked() { return state.pro || state.demo; }

  function lookupCode(raw) {
    var c = String(raw || '').replace(/\D/g, '');
    if (c.length === 14 && c.charAt(0) === '0') c = c.slice(1);
    return { code: c || String(raw || ''), item: D.BARCODES[c] || null };
  }

  var BARCODE_ICON = function (c) { return '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="' + c + '" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 7V4h3M18 4h3v3M21 17v3h-3M6 20H3v-3"/><path d="M7 8v8M10 8v8M13 8v8M16 8v8"/></svg>'; };

  function viewScanLocked() {
    return '<div style="display:flex;flex-direction:column">' +
      '<div style="padding:18px 20px 24px;display:flex;flex-direction:column;gap:16px">' + pageHeader('Scan Barcode', { back: true }) +
      '<div style="background:#0C2A30;color:#FFFFFF;border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:12px;align-items:flex-start">' +
        BARCODE_ICON('#3FC1B2') +
        '<span style="font-size:18px;font-weight:800">Scan a medicine pack</span>' +
        '<span style="font-size:14px;line-height:1.5;color:#D6E6E6">Point your camera at the barcode on an Australian medicine pack and MediAUS opens the right medicine, strength and form. Part of MediAUS Pro.</span>' +
        '<div style="display:flex;gap:10px;width:100%;margin-top:4px"><button data-act="go:plan" style="flex:1;min-height:46px;border:0;border-radius:12px;background:#1F9D8E;color:#FFFFFF;font-size:14px;font-weight:700">See Pro plans</button>' +
        '<button data-act="demo" style="flex:1;min-height:46px;border:1.5px solid #A9C7C8;border-radius:12px;background:transparent;color:#FFFFFF;font-size:14px;font-weight:700">Try the demo</button></div></div>' +
      '<div style="display:flex;flex-direction:column;gap:8px"><span style="font-size:14px;font-weight:700">How it works</span>' +
        '<ol style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:6px;font-size:13px;line-height:1.45;color:#24414A"><li>Allow camera access</li><li>Line up the barcode inside the frame</li><li>MediAUS reads it automatically and opens the medicine</li></ol></div>' +
      '</div></div>';
  }

  function scanStatusCard(title, text, spin) {
    return '<div role="status" style="position:absolute;left:20px;right:20px;top:42%;transform:translateY(-50%);background:rgba(12,42,48,.92);border-radius:16px;padding:18px;display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center">' +
      (spin ? '<span class="spin" style="width:30px;height:30px;border-radius:15px;border:4px solid rgba(255,255,255,.3);border-top-color:#3FC1B2"></span>' : '') +
      '<span style="font-size:16px;font-weight:700">' + title + '</span>' + (text ? '<span style="font-size:13px;line-height:1.5;color:#D6E6E6">' + text + '</span>' : '') + '</div>';
  }

  function scanResultSheet() {
    var r = lookupCode(state.scan.code);
    var body;
    if (r.item) {
      var m = D.MEDS[r.item.medId];
      var f = m.forms.filter(function (x) { return x.id === r.item.formId; })[0] || m.forms[0];
      var a = f.appearance.filter(function (x) { return x.label === r.item.product; })[0] || f.appearance[0];
      body = '<div style="display:flex;gap:14px;align-items:center"><span style="flex:none;width:84px;height:58px;border-radius:12px;background:#F3F6F6;display:flex;align-items:center;justify-content:center">' + drawPill(a, 72) + '</span>' +
        '<div style="display:flex;flex-direction:column;gap:3px"><span style="font-size:12px;font-weight:700;color:#079455">Match found</span><span style="font-size:17px;font-weight:800">' + esc(r.item.product) + '</span><span style="font-size:13px;color:#5B6F75">' + esc(m.name) + ' · ' + esc(f.label) + ' · ' + esc(r.item.pack) + '</span></div></div>' +
        '<span style="font-size:12px;color:#5B6F75">Barcode ' + esc(r.code) + ' · sample code</span>' +
        '<button data-act="med:' + m.id + ':' + f.id + '" style="min-height:50px;border:0;border-radius:14px;background:#1A6F67;color:#FFFFFF;font-size:15px;font-weight:700">View medicine</button>';
    } else {
      body = '<div style="display:flex;flex-direction:column;gap:4px"><span style="font-size:12px;font-weight:700;color:#B54708">Not in the database</span><span style="font-size:17px;font-weight:800">We don’t recognise this barcode yet</span>' +
        '<span style="font-size:13px;line-height:1.5;color:#5B6F75">Barcode ' + esc(r.code) + '. This prototype only knows a few sample codes. Real pack barcodes will work once the product database is loaded.</span></div>' +
        '<button data-act="go:search" style="min-height:50px;border:0;border-radius:14px;background:#1A6F67;color:#FFFFFF;font-size:15px;font-weight:700">Search by name instead</button>';
    }
    return '<div style="position:absolute;inset:0;background:rgba(0,0,0,.35);display:flex;align-items:flex-end">' +
      '<div role="dialog" aria-label="Scan result" style="width:100%;background:#FFFFFF;color:#142B33;border-radius:20px 20px 0 0;padding:10px 20px max(20px,env(safe-area-inset-bottom));display:flex;flex-direction:column;gap:14px">' +
      '<span aria-hidden="true" style="align-self:center;width:40px;height:4px;border-radius:2px;background:#D9E3E4"></span>' + body +
      '<button data-act="scanagain" style="min-height:46px;border:1.5px solid #1A6F67;border-radius:14px;background:#FFFFFF;color:#1A6F67;font-size:14px;font-weight:700">Scan another</button></div></div>';
  }

  function scanManualSheet() {
    var chips = Object.keys(D.BARCODES).slice(0, 4).map(function (c) {
      return '<button data-act="scancode:' + c + '" style="font-size:12px;font-weight:600;color:#0E5E59;background:#E5F4F2;border:0;border-radius:8px;padding:0 10px;min-height:32px">' + c + '</button>';
    }).join('');
    return '<div style="position:absolute;inset:0;background:rgba(0,0,0,.35);display:flex;align-items:flex-end">' +
      '<div role="dialog" aria-label="Enter barcode" style="width:100%;background:#FFFFFF;color:#142B33;border-radius:20px 20px 0 0;padding:10px 20px max(20px,env(safe-area-inset-bottom));display:flex;flex-direction:column;gap:12px">' +
      '<span aria-hidden="true" style="align-self:center;width:40px;height:4px;border-radius:2px;background:#D9E3E4"></span>' +
      '<span style="font-size:17px;font-weight:800">Enter the barcode number</span>' +
      '<label style="display:flex;align-items:center;border:1.5px solid #D9E3E4;border-radius:12px;padding:0 12px;min-height:50px"><span class="sr">Barcode number</span><input id="gtin" type="text" inputmode="numeric" autocomplete="off" placeholder="13 digits under the barcode" style="font-size:18px;letter-spacing:1px;border:0;outline:none;background:transparent;flex:1;min-width:0;min-height:46px"></label>' +
      '<div style="display:flex;flex-direction:column;gap:6px"><span style="font-size:12px;color:#5B6F75">Try a sample code:</span><div style="display:flex;flex-wrap:wrap;gap:6px">' + chips + '</div></div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><button data-act="scancancel" style="min-height:48px;border:1.5px solid #D9E3E4;border-radius:14px;background:#FFFFFF;font-size:14px;font-weight:700">Cancel</button>' +
      '<button data-act="scansubmit" style="min-height:48px;border:0;border-radius:14px;background:#1A6F67;color:#FFFFFF;font-size:14px;font-weight:700">Look up</button></div></div></div>';
  }

  function viewScan() {
    var sc = state.scan;
    var corner = function (pos) {
      var b = 'position:absolute;width:30px;height:30px;border-color:#3FC1B2;border-style:solid;';
      var m = { tl: 'top:-2px;left:-2px;border-width:4px 0 0 4px;border-radius:16px 0 0 0', tr: 'top:-2px;right:-2px;border-width:4px 4px 0 0;border-radius:0 16px 0 0', bl: 'bottom:-2px;left:-2px;border-width:0 0 4px 4px;border-radius:0 0 0 16px', br: 'bottom:-2px;right:-2px;border-width:0 4px 4px 0;border-radius:0 0 16px 0' };
      return '<span style="' + b + m[pos] + '"></span>';
    };
    var live = sc.phase === 'live';
    var frame = '<div aria-hidden="true" style="position:absolute;left:50%;top:42%;transform:translate(-50%,-50%);width:78%;max-width:340px;height:170px;border-radius:16px;box-shadow:0 0 0 9999px rgba(5,20,24,.62)">' +
      corner('tl') + corner('tr') + corner('bl') + corner('br') +
      (live && !sc.manual ? '<span class="scanline" style="position:absolute;left:8%;right:8%;height:2px;border-radius:1px;background:#3FC1B2;box-shadow:0 0 12px 2px rgba(63,193,178,.8)"></span>' : '') + '</div>';
    var torch = cam.torchOk
      ? '<button data-act="torch" aria-pressed="' + sc.torch + '" aria-label="Torch" style="width:44px;height:44px;border-radius:22px;border:0;background:' + (sc.torch ? '#F2B53A' : 'rgba(255,255,255,.18)') + ';display:flex;align-items:center;justify-content:center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="' + (sc.torch ? '#0C2A30' : '#FFFFFF') + '" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M8 2h8l-1 6H9z"/><path d="M9 8h6v6l-1 8h-4l-1-8z"/></svg></button>'
      : '<span style="width:44px"></span>';
    var status = '';
    if (sc.phase === 'starting' || sc.phase === 'idle') status = scanStatusCard('Starting camera…', '', true);
    else if (sc.phase === 'denied') status = scanStatusCard('Camera access is blocked', 'Allow camera access for this site in your browser settings, then reopen the scanner. Or enter the number instead.');
    else if (sc.phase === 'unsupported') status = scanStatusCard('Camera not available here', 'The camera only works on a secure (https) link or on this computer’s localhost address. You can still enter the number.');
    var noAuto = live && !cam.detector;
    var bottom = '<div style="position:absolute;left:0;right:0;bottom:0;padding:16px 20px max(20px,env(safe-area-inset-bottom));display:flex;flex-direction:column;gap:10px;background:linear-gradient(transparent,rgba(5,20,24,.85) 30%)">' +
      (noAuto ? '<span style="font-size:12px;line-height:1.45;color:#D6E6E6;text-align:center">This browser can’t read barcodes automatically (common on iPhone). The full app will use a built-in reader.</span><button data-act="scansim" style="min-height:48px;border:0;border-radius:14px;background:#3FC1B2;color:#0C2A30;font-size:15px;font-weight:700">Simulate a scan (demo)</button>' : '') +
      '<button data-act="scanmanual" style="min-height:48px;border:1.5px solid rgba(255,255,255,.6);border-radius:14px;background:transparent;color:#FFFFFF;font-size:15px;font-weight:700">Enter barcode number</button>' +
      '<span style="font-size:11px;color:#A9C7C8;text-align:center">' + (state.pro ? 'Pro preview' : 'Demo') + ' · sample barcodes only. Test codes: open test-barcodes.html on another screen.</span></div>';
    return '<div style="position:relative;flex:1;min-height:0;background:#000000;color:#FFFFFF;overflow:hidden">' +
      '<video id="cam" playsinline muted autoplay style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover"></video>' +
      frame +
      '<div style="position:absolute;top:0;left:0;right:0;display:flex;align-items:center;justify-content:space-between;padding:max(10px,env(safe-area-inset-top)) 12px 10px;background:linear-gradient(rgba(5,20,24,.7),transparent)">' +
        '<button data-act="back" aria-label="Close scanner" style="width:44px;height:44px;border-radius:22px;border:0;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center">' + ICON.x('#FFFFFF', 18) + '</button>' +
        '<span style="font-size:16px;font-weight:700">Scan Barcode</span>' + torch + '</div>' +
      (live ? '<div style="position:absolute;left:0;right:0;top:calc(42% + 100px);display:flex;flex-direction:column;align-items:center;gap:4px;padding:0 24px;text-align:center"><span style="font-size:15px;font-weight:700">Line up the barcode inside the frame</span><span style="font-size:12px;color:#C3DADB">' + (cam.detector ? 'It scans automatically. Hold steady, about 15 cm away.' : 'Hold steady, about 15 cm away.') + '</span></div>' : '') +
      status + bottom +
      (sc.phase === 'result' ? scanResultSheet() : '') + (sc.manual ? scanManualSheet() : '') +
      '</div>';
  }

  function setupDetector() {
    if (cam.detectorReady) return Promise.resolve();
    cam.detectorReady = true;
    if (!('BarcodeDetector' in window)) { cam.detector = null; return Promise.resolve(); }
    var want = ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128', 'data_matrix', 'qr_code'];
    return window.BarcodeDetector.getSupportedFormats().then(function (f) {
      var use = want.filter(function (x) { return f.indexOf(x) >= 0; });
      cam.detector = use.length ? new window.BarcodeDetector({ formats: use }) : null;
    }).catch(function () { cam.detector = null; });
  }

  function startDetectLoop() {
    clearInterval(cam.timer);
    if (!cam.detector) return;
    var busy = false;
    cam.timer = setInterval(function () {
      var v = document.getElementById('cam');
      if (busy || !v || v.readyState < 2 || state.scan.phase !== 'live' || state.scan.manual) return;
      busy = true;
      cam.detector.detect(v).then(function (codes) {
        busy = false;
        if (codes && codes.length && state.scan.phase === 'live') gotCode(codes[0].rawValue);
      }).catch(function () { busy = false; });
    }, 250);
  }

  function gotCode(raw) {
    if (navigator.vibrate) { try { navigator.vibrate(60); } catch (e) { /* ignore */ } }
    state.scan.code = raw;
    state.scan.manual = false;
    state.scan.phase = 'result';
    render();
  }

  function startCamera() {
    state.scan.phase = 'starting';
    render();
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.isSecureContext) {
      state.scan.phase = 'unsupported'; render(); return;
    }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false })
      .then(function (stream) {
        if (state.screen !== 'scan') { stream.getTracks().forEach(function (t) { t.stop(); }); state.scan.phase = 'idle'; return; }
        cam.stream = stream;
        cam.track = stream.getVideoTracks()[0];
        try { var caps = cam.track.getCapabilities ? cam.track.getCapabilities() : {}; cam.torchOk = !!caps.torch; } catch (e) { cam.torchOk = false; }
        return setupDetector().then(function () {
          state.scan.phase = 'live';
          render();
          startDetectLoop();
        });
      })
      .catch(function (err) {
        state.scan.phase = (err && (err.name === 'NotAllowedError' || err.name === 'SecurityError')) ? 'denied' : 'unsupported';
        render();
      });
  }

  function stopCamera() {
    clearInterval(cam.timer);
    cam.timer = null;
    if (cam.stream) cam.stream.getTracks().forEach(function (t) { t.stop(); });
    cam.stream = null; cam.track = null; cam.torchOk = false;
    state.scan.torch = false;
    state.scan.phase = 'idle';
    state.scan.manual = false;
  }

  function afterRender() {
    if (state.screen === 'scan' && scanUnlocked()) {
      var v = document.getElementById('cam');
      if (cam.stream) {
        if (v && v.srcObject !== cam.stream) { v.srcObject = cam.stream; var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
      } else if (state.scan.phase === 'idle') {
        setTimeout(startCamera, 0);
      }
      var g = document.getElementById('gtin');
      if (g && document.activeElement !== g) g.focus({ preventScroll: true });
    } else if (cam.stream || state.scan.phase !== 'idle') {
      stopCamera();
    }
  }

  // ---------- profile & plan ----------
  function viewProfile() {
    var ROW = 'display:flex;align-items:center;gap:14px;width:100%;min-height:52px;padding:0;border:0;border-bottom:1px solid #EEF2F3;background:transparent;font-size:14px;font-weight:500;text-align:left';
    function row(icon, label, value, act) {
      return '<button ' + (act ? 'data-act="' + act + '" ' : '') + 'style="' + ROW + '">' + icon + '<span style="flex:1">' + label + '</span>' + (value ? '<span style="color:#5B6F75;font-size:13px">' + value + '</span>' : '') + ICON.chevron + '</button>';
    }
    function ic(d) { return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#142B33" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>'; }
    var on = state.notif;
    return '<div style="padding:18px 20px 24px;display:flex;flex-direction:column;gap:18px">' +
      pageHeader('Profile &amp; Settings', { profile: false }) +
      '<div style="display:flex;align-items:center;gap:16px"><span style="width:64px;height:64px;border-radius:32px;background:#EEF2F3;display:flex;align-items:center;justify-content:center"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#142B33" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg></span><div style="display:flex;flex-direction:column;gap:3px"><span style="font-size:18px;font-weight:700">Taylor Wilson</span><span style="font-size:13px;color:#5B6F75">Registered Nurse</span></div></div>' +
      '<div style="display:flex;flex-direction:column"><h2 style="margin:0 0 4px;font-size:16px;font-weight:700">Account</h2>' +
        row(ic('<path d="M4 8l4 4 4-6 4 6 4-4-2 11H6z"/>'), 'Subscription', state.pro ? 'Pro (demo)' : 'Free Plan', 'go:plan') +
        row(ic('<path d="M6 3h12v18l-6-4-6 4z"/>'), 'Saved Medications', '12') +
        row(ic('<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M9 9h6"/>'), 'Clinical References') +
        '<button data-act="notif" role="switch" aria-checked="' + on + '" style="' + ROW + '">' + ic('<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>') + '<span style="flex:1">Notifications</span>' +
          '<span style="flex:none;width:46px;height:28px;border-radius:14px;position:relative;background:' + (on ? '#1F9D8E' : '#C9D3D5') + '"><span style="position:absolute;top:3px;left:' + (on ? '21px' : '3px') + ';width:22px;height:22px;border-radius:11px;background:#FFFFFF;transition:left .15s"></span></span></button>' +
      '</div>' +
      '<div style="display:flex;flex-direction:column"><h2 style="margin:0 0 4px;font-size:16px;font-weight:700">App Settings</h2>' +
        row(ic('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>'), 'Appearance', 'System') +
        row(ic('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>'), 'Region', 'Australia') +
        row(ic('<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/>'), 'About', 'Version 1.1.0') +
      '</div>' +
      '<p style="margin:0;font-size:12px;line-height:1.5;color:#5B6F75">Prototype with sample data for review. Not for clinical use.</p>' +
      '</div>';
  }

  function viewPlan() {
    var perks = PERKS.map(function (p) {
      return '<span style="display:flex;align-items:center;gap:12px;font-size:14px"><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" style="flex:none"><circle cx="12" cy="12" r="11" fill="#2DB3A3"/><path d="M7.5 12.5l3 3 6-6.5" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' + esc(p) + '</span>';
    }).join('');
    var freeBtn = state.pro
      ? '<button data-act="downgrade" style="margin-top:10px;font-size:13px;font-weight:600;color:#1A6F67;background:#FFFFFF;border:1.5px solid #1A6F67;border-radius:10px;min-height:40px">Switch to Free</button>'
      : '<span style="margin-top:10px;font-size:13px;font-weight:600;color:#5B6F75;background:#EEF2F3;border-radius:10px;min-height:40px;display:flex;align-items:center;justify-content:center">Current Plan</span>';
    var proBtn = state.pro
      ? '<span style="margin-top:10px;font-size:13px;font-weight:700;color:#0C2A30;background:#3FC1B2;border-radius:10px;min-height:40px;display:flex;align-items:center;justify-content:center">Current Plan (demo)</span>'
      : '<button data-act="upgrade" style="margin-top:10px;font-size:13px;font-weight:700;color:#FFFFFF;background:#1F9D8E;border:0;border-radius:10px;min-height:40px">Upgrade Now</button>';
    return '<div style="flex:1;min-height:100%;background:#0C2A30;color:#FFFFFF;padding:12px 18px max(24px,env(safe-area-inset-bottom));display:flex;flex-direction:column;align-items:center;gap:14px">' +
      '<div style="align-self:stretch;padding-top:6px">' + pageHeader('Upgrade', { back: true, dark: true, profile: false }) + '</div>' +
      '<svg width="40" height="32" viewBox="0 0 40 32" aria-hidden="true"><path d="M4 26L2 8l10 8 8-14 8 14 10-8-2 18z" fill="#F2B53A"/><rect x="4" y="27" width="32" height="4" rx="2" fill="#F2B53A"/></svg>' +
      '<h2 style="margin:0;font-size:26px;font-weight:800;letter-spacing:-0.3px">Unlock Full Access</h2>' +
      '<span style="font-size:14px;line-height:1.55;color:#D6E6E6;text-align:center">Get complete medication information, including detailed interactions, pregnancy and breastfeeding data, and more.</span>' +
      '<div style="align-self:stretch;display:flex;flex-direction:column;gap:12px;padding:4px 8px">' + perks + '</div>' +
      '<div style="align-self:stretch;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:6px">' +
        '<div style="background:#FFFFFF;color:#142B33;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:4px"><span style="font-size:17px;font-weight:700">Free</span><span style="font-size:12px;color:#5B6F75">Essential information</span><span style="margin-top:10px;font-size:13px;color:#5B6F75"><span style="font-size:24px;font-weight:800;color:#142B33">$0</span> / forever</span>' + freeBtn + '</div>' +
        '<div style="background:#0F3A40;border:2px solid #2DB3A3;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:4px"><span style="font-size:17px;font-weight:700">Pro</span><span style="font-size:12px;color:#C3DADB">Full access to all features</span><span style="margin-top:10px;font-size:13px;color:#C3DADB"><span style="font-size:24px;font-weight:800;color:#FFFFFF">$14.99</span> / month</span>' + proBtn + '</div>' +
      '</div>' +
      '<span style="margin-top:auto;display:flex;align-items:center;gap:8px;font-size:12px;color:#C3DADB">' + ICON.lock + 'Cancel anytime. Secure payment via Stripe.</span>' +
      '</div>';
  }

  // ---------- bottom nav ----------
  function navHtml() {
    var scr = state.screen;
    var section = scr === 'search' ? 'search' : scr === 'check' ? 'check' : (scr === 'profile' || scr === 'plan') ? 'more' : 'home';
    function item(id, act, label, svg) {
      var on = section === id;
      return '<button data-act="' + act + '"' + (on ? ' aria-current="page"' : '') + ' style="position:relative;min-height:64px;border:0;background:transparent;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;font-size:11px;font-weight:' + (on ? 800 : 500) + ';color:' + (on ? TEAL : MUTED) + '">' +
        '<span aria-hidden="true" style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:40px;height:3px;border-radius:0 0 3px 3px;background:' + (on ? TEAL : 'transparent') + '"></span>' +
        '<span style="display:flex;align-items:center;justify-content:center;width:58px;height:30px;border-radius:15px;background:' + (on ? '#D3EEEA' : 'transparent') + '">' + svg(on) + '</span>' + label + '</button>';
    }
    return '<nav class="nav" aria-label="Main">' +
      item('home', 'go:home', 'Home', function (on) { return '<svg width="22" height="22" viewBox="0 0 24 24" fill="' + (on ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="' + (on ? 2.6 : 2) + '" stroke-linejoin="round" aria-hidden="true"><path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/></svg>'; }) +
      item('search', 'go:search', 'Search', function (on) { return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (on ? 2.6 : 2) + '" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>'; }) +
      item('check', 'go:check', 'Interactions', function (on) { return '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (on ? 2.6 : 2) + '" aria-hidden="true"><circle cx="8.5" cy="12" r="5.5"/><circle cx="15.5" cy="12" r="5.5"/></svg>'; }) +
      item('more', 'go:profile', 'More', function () { return '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="2.2"/><circle cx="12" cy="12" r="2.2"/><circle cx="19" cy="12" r="2.2"/></svg>'; }) +
      '</nav>';
  }

  // ---------- provenance: every line in a block, its sources, dates and sign-off ----------
  var FSTATUS = {
    draft:   { label: 'Draft', fg: '#344054', bg: '#F2F4F7', bd: '#D0D5DD', help: 'Sourced, not yet signed off' },
    verify:  { label: 'To verify', fg: '#7A2E0E', bg: '#FFF4D6', bd: '#FEC84B', help: 'Not yet confirmed against a document' },
    signed:  { label: 'Signed off', fg: '#054F31', bg: '#ECFDF3', bd: '#ABEFC6', help: 'Checked by the SME' },
    gap:     { label: 'Gap', fg: '#344054', bg: '#FFFFFF', bd: '#98A2B3', help: 'No document found yet' },
    demo:    { label: 'Demo data', fg: '#5C3D00', bg: '#FFF4D6', bd: '#F2B53A', help: 'Invented for testing' },
    retired: { label: 'Retired', fg: '#5B6F75', bg: '#FFFFFF', bd: '#D0D5DD', help: 'No longer shown' }
  };
  var SRCSTATUS = { 'read': 'Read', 'partly-read': 'Partly read', 'not-read': 'Not read yet', 'paywalled': 'Paid, not read', 'not-recorded': 'Not recorded', 'demo': 'Not a source' };
  var FIELDS = { name: 'Name', cls: 'Class', chips: 'Groups', brands: 'Brands', atc: 'ATC code', schedule: 'Schedule', pbs: 'PBS' };
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function fmtDate(s) {
    if (!s) return '';
    var p = String(s).split('-');
    return (p[2] ? +p[2] + ' ' : '') + (p[1] ? MONTHS[+p[1] - 1] + ' ' : '') + p[0];
  }
  function chip(v) { return '<span style="flex:none;font-size:10px;font-weight:800;color:' + v.fg + ';background:' + v.bg + ';border:1px solid ' + v.bd + ';border-radius:6px;padding:1px 6px">' + v.label + '</span>'; }
  // One readable line for any fact.
  function factText(id) {
    var P = D.prov, f = P.fact(id), r = function (t) { return P.render(t, f); }, st = function (u) { return (RSTATUS[u] || RSTATUS.unverified).label; };
    switch (id.split('-')[0]) {
      case 'IDN': return FIELDS[f.field] + ': ' + (Array.isArray(f.value) ? f.value.join(', ') : f.value);
      case 'FRM': return f.unit + ' · ' + f.strengths;
      case 'APP': return f.label + '. ' + f.desc;
      case 'RTE': return f.label + ': ' + st(f.use) + (f.summary ? '. ' + r(f.summary) : '');
      case 'ROU': return GROUPS[f.pop] + ': ' + st(f.use) + (f.note ? '. ' + r(f.note) : '');
      case 'BRD': return f.brand + ': ' + st(f.use) + '. ' + r(f.note);
      case 'PRP': return cap(f.step) + ': ' + (f.missing !== undefined ? r(f.missing) : f.none !== undefined ? r(f.none) : f.pump ? pumpText(f.pump).text : r(f.text));
      case 'ADM': return f.label + ': ' + r(f.text);
      case 'POS': return (f.heading ? r(f.heading) + ': ' : '') + r(f.text);
      case 'INT': return (f.title ? f.title + '. ' : '') + r(f.text);
      case 'PRG': return (f.label || 'Category ' + f.cat) + '. ' + r(f.text);
      case 'BRF': return f.label + '. ' + r(f.text);
      default: return r(f.text || f.name || f.title || f.product || '');
    }
  }
  function viewProv() {
    var P = D.prov, blk = state.prov || { ids: [], title: '' }, ids = blk.ids;
    var counts = {};
    ids.forEach(function (id) { var s = P.fact(id).status; counts[s] = (counts[s] || 0) + 1; });
    var summary = Object.keys(FSTATUS).filter(function (k) { return counts[k]; }).map(function (k) { return counts[k] + ' ' + FSTATUS[k].label.toLowerCase(); }).join(' · ');
    var lines = ids.map(function (id) {
      var f = P.fact(id), v = FSTATUS[f.status] || FSTATUS.draft;
      var cites = (f.cites || []).map(function (c) {
        var s = P.source(c.src);
        return '<li>' + esc(s.label) + (c.loc ? ', section ' + esc(c.loc) : '') + (c.note ? ' (' + esc(c.note) + ')' : '') +
          (c.broad ? ' <span style="color:#7A2E0E">· from the block’s source list; section not pinned yet</span>' : '') + '</li>';
      }).join('');
      var look = (f.lookIn || []).map(function (x) { var k = typeof x === 'string' ? { src: x } : x; return esc(P.source(k.src).title) + (k.loc ? ' section ' + esc(k.loc) : ''); }).join(' · ');
      var rv = f.review && P.reviews[f.review];
      return '<div style="' + CARD + ';padding:12px 14px;display:flex;flex-direction:column;gap:6px">' +
        '<div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap"><span style="font-size:11px;font-weight:700;color:#5B6F75;font-family:ui-monospace,Menlo,monospace">' + esc(id) + '</span>' + chip(v) +
          (f.pop !== undefined ? groupTag(popLabel(f)) : '') + '</div>' +
        '<span style="font-size:13px;line-height:1.45;color:#142B33">' + esc(factText(id)) + '</span>' +
        (cites ? '<ul style="margin:0;padding-left:18px;font-size:12px;line-height:1.5;color:#24414A">' + cites + '</ul>' : '') +
        (look ? '<span style="font-size:12px;line-height:1.5;color:#344054"><span style="font-weight:700">Where to look: </span>' + look + '</span>' : '') +
        (f.derived ? '<span style="font-size:12px;color:#5B6F75">' + esc(f.derived) + '</span>' : '') +
        '<span style="font-size:11px;color:#5B6F75">Last changed ' + esc(fmtDate(f.changed)) + ' · ' + (rv ? 'Signed off by ' + esc(rv.by) + ', ' + esc(fmtDate(rv.on)) : 'Not signed off yet') + '</span></div>';
    }).join('');
    var docs = P.citesOf(ids).map(function (g) { return g.src; });
    P.lookInsOf(ids).forEach(function (k) { if (docs.indexOf(k.src) < 0) docs.push(k.src); });
    var docHtml = docs.map(function (id) {
      var s = P.source(id), meta = [s.publisher, s.kind, s.revised ? 'revised ' + fmtDate(s.revised) : '', s.read ? 'read ' + fmtDate(s.read) : '', SRCSTATUS[s.status] && s.status !== 'read' ? SRCSTATUS[s.status] : '', s.tier ? 'tier ' + s.tier : ''].filter(Boolean).join(' · ');
      return '<div style="display:flex;flex-direction:column;gap:2px;padding:10px 0;border-top:1px solid #EEF2F3">' +
        '<span style="font-size:13px;font-weight:700;color:#142B33">' + esc(s.title) + '</span>' +
        '<span style="font-size:12px;color:#5B6F75">' + esc(meta) + '</span>' +
        (s.note ? '<span style="font-size:12px;color:#5B6F75">' + esc(s.note) + '</span>' : '') +
        (s.url ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener" style="font-size:12px;font-weight:700;color:#1A6F67;min-height:32px;display:flex;align-items:center">Open document</a>' : '') + '</div>';
    }).join('');
    return '<div style="padding:18px 18px 24px;display:flex;flex-direction:column;gap:12px">' +
      pageHeader('Sources', { back: true }) +
      '<h1 style="margin:0;font-size:20px;font-weight:800;letter-spacing:-0.3px">' + esc(blk.title) + '</h1>' +
      '<span style="font-size:13px;line-height:1.5;color:#24414A">Each card is one record in the data: what it says, the documents behind it, and when it last changed. ' + ids.length + (ids.length === 1 ? ' line' : ' lines') + (summary ? ': ' + summary : '') + '.</span>' +
      lines +
      (docHtml ? '<div style="display:flex;flex-direction:column"><h2 style="' + H2 + ';margin:6px 0 4px">Documents</h2>' + docHtml + '</div>' : '') +
      sampleBadge() + '</div>';
  }

  // ---------- render & navigation ----------
  var app = document.getElementById('app');
  var VIEWS = { splash: viewSplash, home: viewHome, search: viewSearch, med: viewMed, check: viewCheck, profile: viewProfile, plan: viewPlan, pill: viewPill, scan: viewScanLocked, prov: viewProv };
  var TITLES = { home: 'MediAUS', search: 'Search', check: 'Interactions', profile: 'Profile', plan: 'Upgrade', pill: 'Pill Identifier', scan: 'Scan Barcode', prov: 'Sources' };

  function render(keepScroll) {
    var scr = state.screen;
    var sc = document.getElementById('scroll');
    var top = keepScroll && sc ? sc.scrollTop : 0;
    var dark = scr === 'splash' || scr === 'plan' || (scr === 'scan' && scanUnlocked());
    app.className = 'app' + (dark ? ' is-dark' : '');
    document.querySelector('meta[name="theme-color"]').setAttribute('content', dark ? '#0C2A30' : '#FFFFFF');
    provBlocks = [];
    var showNav = scr === 'home' || scr === 'search' || scr === 'check' || scr === 'profile';
    if (scr === 'splash') app.innerHTML = viewSplash();
    else if (scr === 'scan' && scanUnlocked()) app.innerHTML = viewScan();
    else app.innerHTML = '<div class="scroll" id="scroll">' + (VIEWS[scr] || viewHome)() + '</div>' + (showNav ? navHtml() : '');
    var q = document.getElementById('q'); if (q) q.value = state.query;
    var aq = document.getElementById('addq'); if (aq) { aq.value = state.addq; if (state.addq) updateAddList(); }
    var imp = document.getElementById('imp'); if (imp) imp.value = state.pill.imprint;
    var sc2 = document.getElementById('scroll'); if (sc2 && top) sc2.scrollTop = top;
    document.title = scr === 'med' ? med().name + ' · MediAUS' : (TITLES[scr] ? TITLES[scr] + (scr === 'home' ? '' : ' · MediAUS') : 'MediAUS');
    app.querySelectorAll('.tabs [aria-pressed="true"]').forEach(function (el) {
      var row = el.parentNode;
      if (el.offsetLeft + el.offsetWidth > row.scrollLeft + row.clientWidth || el.offsetLeft < row.scrollLeft) row.scrollLeft = el.offsetLeft - 16;
    });
    afterRender();
  }

  function snapshot() { return { screen: state.screen, tab: state.tab, medId: state.medId, formId: state.formId, prov: state.screen === 'prov' ? state.prov : null }; }

  function navigate(screen, extra, opts) {
    var before = JSON.stringify(snapshot());
    state.screen = screen;
    if (extra) for (var k in extra) state[k] = extra[k];
    var changed = JSON.stringify(snapshot()) !== before;
    if (opts && opts.replace) history.replaceState(snapshot(), '');
    else if (changed) { history.pushState(snapshot(), ''); depth++; }
    render();
    if (screen === 'search' && !(opts && opts.noFocus)) {
      var q = document.getElementById('q');
      if (q) q.focus({ preventScroll: true });
    }
  }

  function goBack() {
    if (depth > 0) history.back();
    else navigate('home', null, { replace: true });
  }

  window.addEventListener('popstate', function (e) {
    if (depth > 0) depth--;
    var s = e.state || { screen: 'home' };
    if (s.screen === 'splash') s.screen = 'home';
    state.screen = s.screen;
    if (s.tab) state.tab = s.tab;
    if (s.medId) state.medId = s.medId;
    if (s.formId) state.formId = s.formId;
    if (s.prov) state.prov = s.prov;
    if (state.screen === 'prov' && !state.prov) state.screen = 'home';
    render();
  });

  function updatePill() {
    var r = document.getElementById('pillresults');
    if (r) r.innerHTML = pillResultsHtml();
  }

  app.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) { if (e.target.closest('a[href="#"]')) e.preventDefault(); return; }
    var parts = el.getAttribute('data-act').split(':');
    var act = parts[0], arg = parts[1], arg2 = parts[2];
    switch (act) {
      case 'start': navigate('home', null, { replace: true }); break;
      case 'go': navigate(arg); break;
      case 'med': navigate('med', { medId: arg, formId: arg2 || D.MEDS[arg].forms[0].id, tab: 'overview', routeId: '', doseId: '' }); break;
      case 'medtab': navigate('med', { medId: arg, formId: D.MEDS[arg].forms[0].id, tab: arg2, routeId: '', doseId: '' }); break;
      case 'medr': navigate('med', { medId: arg, formId: arg2, tab: 'admin', routeId: parts[3] || '', doseId: '' }); break;
      case 'rsel': state.routeId = arg; render(true); break;
      case 'dsel': state.doseId = arg; render(true); break;
      case 'form': state.formId = arg; state.routeId = ''; state.doseId = ''; history.replaceState(snapshot(), ''); render(true); break;
      case 'pop': state.pop = arg; render(true); break;
      case 'tab': state.tab = arg; history.replaceState(snapshot(), ''); render(true); break;
      case 'back': goBack(); break;
      case 'prov': if (provBlocks[+arg]) navigate('prov', { prov: provBlocks[+arg] }); break;
      case 'checkwith':
        if (state.selected.indexOf(state.medId) < 0 && CHECK_MEDS[state.medId]) state.selected = [state.medId].concat(state.selected);
        navigate('check');
        break;
      case 'remove': state.selected = state.selected.filter(function (x) { return x !== arg; }); render(true); break;
      case 'add': addAndFocus(arg); break;
      case 'notif': state.notif = !state.notif; render(true); break;
      case 'route': state.route = arg; searchUpdate(); break;
      case 'area': state.area = arg || ''; searchUpdate(); break;
      case 'sclear': state.query = ''; state.route = 'All'; state.area = ''; render(true); break;
      case 'qclear':
        state.query = ''; render(true);
        var qi = document.getElementById('q'); if (qi) qi.focus({ preventScroll: true });
        break;
      case 'pillmode': state.pillMode = arg; render(true); break;
      case 'pshape': state.pill.shape = state.pill.shape === arg ? '' : arg; render(true); break;
      case 'pcolor': state.pill.color = state.pill.color === arg ? '' : arg; render(true); break;
      case 'pscored': state.pill.scored = arg; render(true); break;
      case 'pclear': state.pill = { shape: '', color: '', imprint: '', scored: 'any' }; render(true); break;
      case 'demo': state.demo = true; render(true); break;
      case 'retake': state.photoState = 'idle'; state.photo = null; render(true); break;
      case 'upgrade': state.pro = true; goBack(); break;
      case 'downgrade': state.pro = false; render(true); break;
      case 'scanagain': state.scan.code = ''; state.scan.phase = cam.stream ? 'live' : 'idle'; render(); break;
      case 'scanmanual': state.scan.manual = true; render(); break;
      case 'scancancel': state.scan.manual = false; render(); break;
      case 'scancode': gotCode(arg); break;
      case 'scansubmit':
        var g = document.getElementById('gtin');
        if (g && g.value.replace(/\D/g, '').length >= 8) gotCode(g.value);
        else if (g) { g.setAttribute('aria-invalid', 'true'); g.style.color = '#B42318'; g.focus(); }
        break;
      case 'scansim':
        var codes = Object.keys(D.BARCODES);
        gotCode(codes[cam.simIndex++ % codes.length]);
        break;
      case 'torch':
        if (cam.track) {
          var want = !state.scan.torch;
          cam.track.applyConstraints({ advanced: [{ torch: want }] }).then(function () { state.scan.torch = want; render(); }).catch(function () {});
        }
        break;
    }
  });

  function searchUpdate() {
    var live = document.getElementById('live');
    if (!live) return;
    live.innerHTML = searchLive();
    var c = document.getElementById('qclear'); if (c) c.hidden = !state.query;
  }
  function addAndFocus(id) {
    checkAdd(id); render(true);
    var a = document.getElementById('addq'); if (a) a.focus({ preventScroll: true });
  }

  app.addEventListener('input', function (e) {
    if (e.target.id === 'q') {
      state.query = e.target.value;
      searchUpdate();
    } else if (e.target.id === 'addq') {
      checkAddInput(e.target.value);
    } else if (e.target.id === 'imp') {
      state.pill.imprint = e.target.value;
      updatePill();
    }
  });

  app.addEventListener('keydown', function (e) {
    if (e.target.id === 'addq') { var id = checkAddKey(e); if (id) addAndFocus(id); return; }
    if (e.key === 'Enter' && e.target.id === 'gtin') { e.preventDefault(); var b = app.querySelector('[data-act="scansubmit"]'); if (b) b.click(); }
  });

  app.addEventListener('change', function (e) {
    if (e.target.getAttribute && e.target.getAttribute('data-photo') && e.target.files && e.target.files[0]) {
      if (state.photo) { try { URL.revokeObjectURL(state.photo); } catch (err) { /* ignore */ } }
      state.photo = URL.createObjectURL(e.target.files[0]);
      state.photoState = 'analysing';
      render(true);
      setTimeout(function () { state.photoState = 'done'; if (state.screen === 'pill') render(true); }, 1800);
    }
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden && cam.stream) { stopCamera(); }
    else if (!document.hidden && state.screen === 'scan') { render(); }
  });

  history.replaceState(snapshot(), '');
  render();

  if ('serviceWorker' in navigator && window.isSecureContext) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
})();
