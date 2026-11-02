/* MediAUS feedback: right-edge tab and slide-in panel for bug reports and medicine requests (MVP testing).
   Lives outside #app so re-renders never wipe a draft. Reports post to api/feedback (serve.ps1 saves them
   to feedback/reports.jsonl on the laptop); unsent ones wait in an outbox on this device. */
(function () {
  'use strict';

  var HOOK = window.MEDIAUS_APP;
  if (!HOOK || !HOOK.feedback) return;

  var D = window.MEDIAUS_DATA || { MEDS: {}, ORDER: [] };
  var ENDPOINT = 'api/feedback';
  var K = { draft: 'mediaus.fbDraft', outbox: 'mediaus.fbOutbox', sent: 'mediaus.fbSent', me: 'mediaus.fbMe' };
  var MAX_TEXT = 4000;
  var SHARE_AFTER = 2; // failed tries before Share is offered

  var KINDS = [['data', 'Information looks wrong'], ['bug', 'App not working'], ['ux', 'Hard to use']];
  var SEVS = [['blocker', 'Stops me'], ['annoying', 'Annoying'], ['minor', 'Minor']];
  var ROLES = ['RN', 'EN', 'Midwife', 'Pharmacist', 'Doctor', 'Student', 'Other'];
  var SETTINGS = ['Ward', 'ICU or ED', 'Theatre', 'Community', 'Paediatrics', 'Aged care'];
  // Patient identifiers: URN/MRN words, long numbers, dates, DOB.
  var PHI_RE = /\b(urn|mrn|ur ?no|dob|d\.o\.b|medicare)\b|\b\d{6,}\b|\b\d{1,2}[\/.\-]\d{1,2}[\/.\-]\d{2,4}\b/i;

  // ---------- storage ----------
  function load(key, dflt) { try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : dflt; } catch (e) { return dflt; } }
  function save(key, v) { try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) { /* ignore */ } }

  function blankDraft() {
    return { mode: 'problem', kind: '', what: '', expected: '', sev: '', name: '', brand: '', need: '', settings: [], why: '', withCtx: true };
  }
  var draft = load(K.draft, null) || blankDraft();
  var me = load(K.me, null) || { name: '', role: '', email: '' };

  // ---------- view state ----------
  var ui = { open: false, view: 'form', meEdit: false, phiOk: false, err: '', last: null, ctx: null, pending: null, returnFocus: null };

  // ---------- helpers ----------
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function norm(s) { return String(s || '').toLowerCase().replace(/®/g, '').replace(/[^a-z0-9]+/g, ' ').trim(); }
  function newId() {
    var d = new Date(), p = function (n) { return (n < 10 ? '0' : '') + n; };
    return 'R-' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '-' + p(d.getHours()) + p(d.getMinutes()) + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
  }
  // JSON with every non-ASCII char as \uXXXX, so serve.ps1 can count bytes as chars.
  function asciiJson(o) {
    return JSON.stringify(o).replace(/[\u007f-￿]/g, function (c) { return '\\u' + ('000' + c.charCodeAt(0).toString(16)).slice(-4); });
  }
  function fmtDate(iso) {
    try { return new Date(iso).toLocaleString('en-AU', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }); } catch (e) { return iso; }
  }

  // Medicines in the app, with brand words, for the request check.
  var MED_INDEX = (D.ORDER || []).map(function (id) {
    var m = D.MEDS[id];
    var brands = String(m.brands || '').split(/[,;:.]| and /).map(function (b) { return norm(b); }).filter(function (b) { return b && b.length > 2; });
    return { id: id, name: m.name, n: norm(m.name), brands: brands };
  });
  function findMed(q) {
    q = norm(q);
    if (q.length < 3) return null;
    for (var i = 0; i < MED_INDEX.length; i++) {
      var m = MED_INDEX[i];
      if (m.n === q || m.n.indexOf(q) === 0 || q.indexOf(m.n) === 0) return { med: m, by: 'name' };
    }
    for (i = 0; i < MED_INDEX.length; i++) {
      for (var j = 0; j < MED_INDEX[i].brands.length; j++) {
        var b = MED_INDEX[i].brands[j];
        if (b === q || b.indexOf(q) === 0 || q.indexOf(b) === 0) return { med: MED_INDEX[i], by: 'brand' };
      }
    }
    return null;
  }

  // ---------- context (from app.js) ----------
  function appCtx() { try { return HOOK.ctx() || {}; } catch (e) { return {}; } }
  function deviceInfo() {
    var standalone = (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
    return {
      ua: navigator.userAgent,
      installed: !!standalone,
      lang: navigator.language,
      viewport: window.innerWidth + 'x' + window.innerHeight,
      online: navigator.onLine
    };
  }
  function ctxLines(c) {
    var out = [];
    if (c.medName) out.push(c.medName + (c.formLabel ? ' · ' + c.formLabel : ''));
    if (c.screenLabel) out.push(c.screenLabel + (c.tabLabel ? ' · ' + c.tabLabel : ''));
    if (c.pop && c.pop !== 'all') out.push('Patient group: ' + c.pop);
    if (c.facts && c.facts.length) out.push(c.facts.length + ' fact id' + (c.facts.length === 1 ? '' : 's') + ' on screen');
    out.push('MediAUS ' + (HOOK.version || '') + ' · ' + browserName());
    return out;
  }
  function browserName() {
    var ua = navigator.userAgent, os = /Android/.test(ua) ? 'Android' : /iPhone|iPad|iPod/.test(ua) ? 'iOS' : /Windows/.test(ua) ? 'Windows' : /Mac OS/.test(ua) ? 'Mac' : 'Other';
    var br = /Edg\//.test(ua) ? 'Edge' : /CriOS|Chrome\//.test(ua) ? 'Chrome' : /FxiOS|Firefox\//.test(ua) ? 'Firefox' : /Safari\//.test(ua) ? 'Safari' : 'Browser';
    return os + ' ' + br;
  }
  function cacheName() {
    if (!window.caches || !caches.keys) return Promise.resolve('');
    return caches.keys().then(function (ks) { return ks.filter(function (k) { return k.indexOf('mediaus-') === 0; }).join(','); }).catch(function () { return ''; });
  }

  // ---------- DOM ----------
  var root = document.createElement('div');
  root.id = 'fb-root';
  root.className = 'fb-root';
  root.innerHTML =
    '<button type="button" class="fb-tab" id="fb-tab" aria-haspopup="dialog" aria-controls="fb-panel" aria-expanded="false"><span>Feedback</span></button>' +
    '<div class="fb-dim" id="fb-dim" hidden></div>' +
    '<section class="fb-panel" id="fb-panel" role="dialog" aria-modal="true" aria-labelledby="fb-title" hidden></section>';
  document.body.appendChild(root);
  var tab = root.querySelector('#fb-tab');
  var dim = root.querySelector('#fb-dim');
  var panel = root.querySelector('#fb-panel');
  var appEl = document.getElementById('app');

  // Keep the overlay on the app column (480px, framed on desktop).
  function place() {
    if (!appEl) return;
    var r = appEl.getBoundingClientRect();
    var s = root.style;
    s.left = r.left + 'px'; s.top = r.top + 'px'; s.width = r.width + 'px'; s.height = r.height + 'px';
    s.borderRadius = getComputedStyle(appEl).borderRadius;
  }
  window.addEventListener('resize', place);

  // Called by app.js after each render.
  function update() {
    var c = appCtx();
    var hide = !c.screen || c.screen === 'splash' || c.camera || c.modal;
    tab.hidden = !!hide || ui.open;
    place();
  }

  // ---------- views ----------
  function chips(name, list, value, multi) {
    return '<div class="fb-chips" role="' + (multi ? 'group' : 'radiogroup') + '" aria-label="' + esc(name) + '">' + list.map(function (it) {
      var v = Array.isArray(it) ? it[0] : it, label = Array.isArray(it) ? it[1] : it;
      var on = multi ? value.indexOf(v) >= 0 : value === v;
      return '<button type="button" class="fb-chip" data-fb="' + (multi ? 'multi' : 'pick') + ':' + name + ':' + esc(v) + '" ' + (multi ? 'aria-pressed' : 'role="radio" aria-checked') + '="' + on + '">' + esc(label) + '</button>';
    }).join('') + '</div>';
  }
  function field(id, label, value, opts) {
    opts = opts || {};
    var tag = opts.area ? 'textarea' : 'input';
    var attrs = ' id="fb-' + id + '" data-fbin="' + id + '" maxlength="' + (opts.max || MAX_TEXT) + '"' + (opts.placeholder ? ' placeholder="' + esc(opts.placeholder) + '"' : '') + (opts.type ? ' type="' + opts.type + '"' : '') + (opts.auto ? ' autocomplete="' + opts.auto + '"' : '');
    return '<label class="fb-field"><span class="fb-label">' + esc(label) + (opts.optional ? ' <span class="fb-opt">(optional)</span>' : '') + '</span>' +
      (opts.area ? '<textarea rows="' + (opts.rows || 4) + '"' + attrs + '>' + esc(value) + '</textarea>' : '<input' + attrs + ' value="' + esc(value) + '">') + '</label>';
  }

  function header(title, back) {
    return '<header class="fb-head">' +
      (back ? '<button type="button" class="fb-icon" data-fb="view:form" aria-label="Back to the form"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button>' : '') +
      '<h2 id="fb-title">' + esc(title) + '</h2>' +
      '<button type="button" class="fb-icon" data-fb="close" aria-label="Close feedback"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
      '</header>';
  }

  function viewForm() {
    var d = draft, problem = d.mode === 'problem';
    var mine = load(K.sent, []).length + load(K.outbox, []).length;
    var h = header('Send feedback') + '<div class="fb-body" id="fb-body">' +
      '<div class="fb-seg" role="tablist" aria-label="Feedback type">' +
        '<button type="button" role="tab" data-fb="mode:problem" aria-selected="' + problem + '">Report a problem</button>' +
        '<button type="button" role="tab" data-fb="mode:request" aria-selected="' + !problem + '">Request a medicine</button>' +
      '</div>';
    if (problem) {
      h += '<div class="fb-field"><span class="fb-label" id="fb-kind-l">What’s wrong?</span>' + chips('kind', KINDS, d.kind) + '</div>' +
        field('what', 'What happened?', d.what, { area: true, rows: 4, placeholder: d.kind === 'data' ? 'Which line looks wrong, and what does your source say?' : 'What you tapped and what you saw' }) +
        field('expected', 'What did you expect?', d.expected, { area: true, rows: 2, optional: true }) +
        '<div class="fb-field"><span class="fb-label">How much does it affect you?</span>' + chips('sev', SEVS, d.sev) + '</div>';
    } else {
      var hit = findMed(d.name);
      h += field('name', 'Medicine name', d.name, { placeholder: 'Generic or brand name', auto: 'off', max: 120 }) +
        '<div id="fb-match" class="fb-match" aria-live="polite">' + matchHtml(hit) + '</div>' +
        field('brand', 'Brand', d.brand, { optional: true, max: 200 }) +
        field('need', 'Form or route you need', d.need, { optional: true, placeholder: 'IV infusion, oral liquid, patch', max: 300 }) +
        '<div class="fb-field"><span class="fb-label">Where you’d use it <span class="fb-opt">(optional)</span></span>' + chips('settings', SETTINGS, d.settings, true) + '</div>' +
        field('why', 'Why would you look it up?', d.why, { area: true, rows: 3, optional: true });
    }
    // sender
    if (me.name && !ui.meEdit) {
      h += '<div class="fb-me"><span>Sending as <strong>' + esc(me.name) + '</strong>' + (me.role ? ' · ' + esc(me.role) : '') + '</span><button type="button" class="fb-link" data-fb="meedit">Change</button></div>';
    } else {
      h += '<fieldset class="fb-box"><legend>About you <span class="fb-opt">(kept on this phone)</span></legend>' +
        field('mename', 'Your name', me.name, { optional: true, auto: 'name', max: 80 }) +
        '<div class="fb-field"><span class="fb-label">Role <span class="fb-opt">(optional)</span></span>' + chips('role', ROLES, me.role) + '</div>' +
        field('meemail', 'Email, if you’re happy to be contacted', me.email, { optional: true, type: 'email', auto: 'email', max: 120 }) +
        '</fieldset>';
    }
    // context
    var c = ui.ctx || appCtx();
    h += '<div class="fb-ctx"><label class="fb-check"><input type="checkbox" data-fbin="withCtx"' + (d.withCtx ? ' checked' : '') + '> <span>Include what’s on screen</span></label>' +
      (d.withCtx ? '<ul>' + ctxLines(c).map(function (l) { return '<li>' + esc(l) + '</li>'; }).join('') + '</ul>' : '<ul><li>' + esc('MediAUS ' + (HOOK.version || '') + ' · ' + browserName()) + '</li></ul>') + '</div>' +
      '<p class="fb-warn" id="fb-phi"' + (ui.phiOk ? '' : ' hidden') + '>This looks like it might include a patient identifier. Remove it, or tap Send anyway.</p>' +
      '<p class="fb-note">Don’t include patient names or details.</p>' +
      (ui.err ? '<p class="fb-err" role="alert">' + esc(ui.err) + '</p>' : '') +
      '</div>' +
      '<footer class="fb-foot">' +
        '<button type="button" class="fb-primary" data-fb="send">' + (ui.phiOk ? 'Send anyway' : (problem ? 'Send report' : 'Send request')) + '</button>' +
        (mine ? '<button type="button" class="fb-link" data-fb="view:mine">Your reports (' + mine + ')</button>' : '') +
      '</footer>';
    return h;
  }

  function matchHtml(hit) {
    if (!hit) return draft.name && norm(draft.name).length >= 3 ? '<span>Not in MediAUS yet.</span>' : '';
    return '<span><strong>' + esc(hit.med.name) + '</strong> is already in MediAUS' + (hit.by === 'brand' ? ' (matched a brand)' : '') + '. Tell us the form or route that’s missing, or </span>' +
      '<button type="button" class="fb-link" data-fb="openmed:' + esc(hit.med.id) + '">open it</button>';
  }

  function viewDone() {
    var r = ui.last || {};
    var sent = r.status === 'sent';
    return header(sent ? 'Sent' : 'Saved') + '<div class="fb-body"><div class="fb-done">' +
      '<svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="' + (sent ? '#2DB3A3' : '#F2B53A') + '"/>' +
      (sent ? '<path d="M7.5 12.5l3 3 6-6.5" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>' : '<path d="M12 7v6l3 2" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round"/>') + '</svg>' +
      '<p class="fb-big">' + (sent ? 'Thanks, your ' + (r.type === 'request' ? 'request' : 'report') + ' is in.' : 'Saved on this phone. It will send when MediAUS is reachable.') + '</p>' +
      '<p class="fb-ref">Reference ' + esc(r.id) + '</p>' +
      (sent ? '' : '<button type="button" class="fb-secondary" data-fb="share:' + esc(r.id) + '">Share it instead</button>') +
      '</div></div>' +
      '<footer class="fb-foot"><button type="button" class="fb-primary" data-fb="close">Done</button><button type="button" class="fb-link" data-fb="another">Send another</button></footer>';
  }

  function viewMine() {
    var out = load(K.outbox, []).map(function (o) { return { r: o.report, st: 'waiting', tries: o.tries || 0 }; });
    var sent = load(K.sent, []).map(function (r) { return { r: r, st: 'sent' }; });
    var all = out.concat(sent);
    var list = all.length ? '<ul class="fb-list">' + all.map(function (x) {
      var r = x.r, title = r.type === 'request' ? 'Request: ' + (r.request && r.request.name || '') : (kindLabel(r.problem && r.problem.kind) || 'Problem');
      var text = r.type === 'request' ? (r.request && (r.request.need || r.request.why)) : (r.problem && r.problem.what);
      return '<li><div class="fb-li-top"><strong>' + esc(title) + '</strong><span class="fb-pill ' + x.st + '">' + (x.st === 'sent' ? 'Sent' : 'Waiting') + '</span></div>' +
        (text ? '<span class="fb-li-text">' + esc(String(text).slice(0, 140)) + '</span>' : '') +
        '<span class="fb-li-meta">' + esc(fmtDate(r.created)) + ' · ' + esc(r.id) + '</span>' +
        (x.st === 'waiting' ? '<button type="button" class="fb-link" data-fb="share:' + esc(r.id) + '">Share it instead</button>' : '') + '</li>';
    }).join('') + '</ul>' : '<p class="fb-note">Nothing sent from this phone yet.</p>';
    var waiting = out.length ? '<div class="fb-row"><span class="fb-note">' + out.length + ' waiting to send.</span><button type="button" class="fb-secondary" data-fb="retry">Try again now</button></div>' : '';
    return header('Your reports', true) + '<div class="fb-body">' + waiting + list + '</div>';
  }
  function kindLabel(k) { for (var i = 0; i < KINDS.length; i++) if (KINDS[i][0] === k) return KINDS[i][1]; return ''; }

  function paint(focusSel) {
    var body = document.getElementById('fb-body');
    var top = body ? body.scrollTop : 0;
    var active = document.activeElement && panel.contains(document.activeElement) ? document.activeElement.id : '';
    panel.innerHTML = ui.view === 'done' ? viewDone() : ui.view === 'mine' ? viewMine() : viewForm();
    var nb = document.getElementById('fb-body'); if (nb && top) nb.scrollTop = top;
    var f = focusSel ? panel.querySelector(focusSel) : (active ? document.getElementById(active) : null);
    if (f) f.focus({ preventScroll: true });
  }

  // ---------- open / close (history entry so Android back closes it) ----------
  function open(view) {
    if (ui.open) { ui.view = view || 'form'; paint(); return; }
    ui.open = true; ui.view = view || 'form'; ui.err = ''; ui.phiOk = false;
    ui.ctx = appCtx();
    ui.returnFocus = document.activeElement;
    try { history.pushState(Object.assign({}, history.state || {}, { fb: 1 }), ''); } catch (e) { /* ignore */ }
    paint();
    dim.hidden = false; panel.hidden = false; tab.hidden = true;
    tab.setAttribute('aria-expanded', 'true');
    if (appEl) { appEl.inert = true; appEl.setAttribute('aria-hidden', 'true'); }
    requestAnimationFrame(function () { root.classList.add('fb-on'); });
    var first = panel.querySelector('[aria-selected="true"], button.fb-primary');
    if (first) first.focus({ preventScroll: true });
    flush();
  }
  function hide() {
    ui.open = false;
    root.classList.remove('fb-on');
    tab.setAttribute('aria-expanded', 'false');
    if (appEl) { appEl.inert = false; appEl.removeAttribute('aria-hidden'); }
    setTimeout(function () { if (!ui.open) { dim.hidden = true; panel.hidden = true; panel.innerHTML = ''; } }, 220);
    if (ui.view === 'done') { ui.view = 'form'; }
    update();
    if (ui.returnFocus && ui.returnFocus.focus && document.contains(ui.returnFocus)) ui.returnFocus.focus({ preventScroll: true });
    else if (!tab.hidden) tab.focus({ preventScroll: true });
  }
  // Close via history so the entry we pushed is removed; then run `after`.
  function close(after) {
    if (!ui.open) { if (after) after(); return; }
    if (history.state && history.state.fb) { ui.pending = after || null; history.back(); }
    else { hide(); if (after) after(); }
  }
  // app.js asks us first on popstate; true = we handled it.
  function onPop() {
    if (!ui.open) return false;
    hide();
    var fn = ui.pending; ui.pending = null;
    if (fn) setTimeout(fn, 0);
    return true;
  }

  // ---------- build + send ----------
  function validate() {
    var d = draft;
    if (d.mode === 'problem') {
      if (!d.kind) return ['Choose what’s wrong.', '[data-fb^="pick:kind"]'];
      if (d.what.trim().length < 3) return ['Tell us what happened.', '#fb-what'];
      return null;
    }
    if (norm(d.name).length < 2) return ['Enter the medicine name.', '#fb-name'];
    return null;
  }
  function hasPhi() {
    var d = draft, t = d.mode === 'problem' ? [d.what, d.expected] : [d.name, d.brand, d.need, d.why];
    return PHI_RE.test(t.join(' '));
  }
  function buildReport(cache) {
    var d = draft, c = ui.ctx || appCtx();
    var r = { id: newId(), v: 1, type: d.mode, created: new Date().toISOString(), app: { version: HOOK.version || '', cache: cache || '' } };
    if (d.mode === 'problem') r.problem = { kind: d.kind, what: d.what.trim(), expected: d.expected.trim(), severity: d.sev };
    else {
      var hit = findMed(d.name);
      r.request = { name: d.name.trim(), inApp: hit ? hit.med.id : null, brand: d.brand.trim(), need: d.need.trim(), settings: d.settings.slice(), why: d.why.trim() };
    }
    if (me.name || me.role || me.email) r.from = { name: me.name, role: me.role, email: me.email };
    if (d.withCtx) r.context = c;
    r.device = deviceInfo();
    return r;
  }
  function shareText(r) {
    var L = ['MediAUS ' + (r.type === 'request' ? 'medicine request' : 'problem report') + ' ' + r.id, 'Sent: ' + fmtDate(r.created)];
    if (r.from && r.from.name) L.push('From: ' + r.from.name + (r.from.role ? ' (' + r.from.role + ')' : ''));
    if (r.problem) {
      L.push('Type: ' + kindLabel(r.problem.kind));
      if (r.problem.severity) L.push('Effect: ' + (SEVS.filter(function (s) { return s[0] === r.problem.severity; })[0] || ['', ''])[1]);
      L.push('', 'What happened: ' + r.problem.what);
      if (r.problem.expected) L.push('Expected: ' + r.problem.expected);
    } else if (r.request) {
      L.push('Medicine: ' + r.request.name + (r.request.inApp ? ' (in app: ' + r.request.inApp + ')' : ''));
      if (r.request.brand) L.push('Brand: ' + r.request.brand);
      if (r.request.need) L.push('Form or route: ' + r.request.need);
      if (r.request.settings && r.request.settings.length) L.push('Setting: ' + r.request.settings.join(', '));
      if (r.request.why) L.push('Why: ' + r.request.why);
    }
    if (r.context) {
      var c = r.context;
      L.push('', 'Screen: ' + [c.screen, c.medId, c.formId, c.tab, c.pop, c.routeId, c.doseId].filter(Boolean).join(' / '));
      if (c.facts && c.facts.length) L.push('Facts: ' + c.facts.join(', '));
    }
    L.push('App: ' + r.app.version + (r.app.cache ? ' (' + r.app.cache + ')' : '') + ' · ' + browserName());
    return L.join('\n');
  }

  function post(r) {
    if (!window.fetch) return Promise.reject(new Error('no fetch'));
    var ctl = window.AbortController ? new AbortController() : null;
    var t = ctl ? setTimeout(function () { ctl.abort(); }, 10000) : null;
    return fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: asciiJson(r), cache: 'no-store', signal: ctl ? ctl.signal : undefined })
      .then(function (res) {
        if (t) clearTimeout(t);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json().catch(function () { return {}; });
      }).then(function (j) { if (j && j.ok === false) throw new Error(j.error || 'refused'); return j; });
  }
  function markSent(r) {
    var s = load(K.sent, []); s.unshift(r); save(K.sent, s.slice(0, 50));
  }

  var flushing = false;
  function flush() {
    if (flushing) return Promise.resolve();
    var box = load(K.outbox, []);
    if (!box.length) return Promise.resolve();
    flushing = true;
    var i = 0;
    function next() {
      var cur = load(K.outbox, []);
      if (i >= cur.length) return Promise.resolve();
      var item = cur[i];
      return post(item.report).then(function () {
        var now = load(K.outbox, []).filter(function (o) { return o.report.id !== item.report.id; });
        save(K.outbox, now); markSent(item.report);
        return next();
      }, function () {
        var now = load(K.outbox, []);
        now.forEach(function (o) { if (o.report.id === item.report.id) o.tries = (o.tries || 0) + 1; });
        save(K.outbox, now); i++;
        return next();
      });
    }
    return next().then(function () { flushing = false; if (ui.open && ui.view === 'mine') paint(); }, function () { flushing = false; });
  }

  function send() {
    var bad = validate();
    if (bad) { ui.err = bad[0]; paint(bad[1]); return; }
    if (hasPhi() && !ui.phiOk) { ui.phiOk = true; ui.err = ''; paint('#fb-phi'); var w = document.getElementById('fb-phi'); if (w) w.scrollIntoView({ block: 'center' }); return; }
    ui.err = '';
    var btn = panel.querySelector('[data-fb="send"]'); if (btn) { btn.textContent = 'Sending…'; btn.setAttribute('aria-busy', 'true'); }
    cacheName().then(function (cache) {
      var r = buildReport(cache);
      var box = load(K.outbox, []); box.push({ report: r, tries: 0 }); save(K.outbox, box); // saved before sending
      return post(r).then(function () {
        save(K.outbox, load(K.outbox, []).filter(function (o) { return o.report.id !== r.id; }));
        markSent(r); r.status = 'sent';
      }, function () {
        var b = load(K.outbox, []); b.forEach(function (o) { if (o.report.id === r.id) o.tries = 1; }); save(K.outbox, b);
        r.status = 'waiting';
      }).then(function () {
        ui.last = r; ui.view = 'done'; ui.phiOk = false;
        var keepMode = draft.mode; draft = blankDraft(); draft.mode = keepMode; save(K.draft, draft);
        paint('.fb-primary');
      });
    });
  }

  function share(id) {
    var all = load(K.outbox, []).map(function (o) { return o.report; }).concat(load(K.sent, []));
    if (ui.last && ui.last.id === id) all.unshift(ui.last);
    var r = all.filter(function (x) { return x.id === id; })[0];
    if (!r) return;
    var text = shareText(r);
    if (navigator.share) { navigator.share({ title: 'MediAUS feedback ' + r.id, text: text }).catch(function () {}); return; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast('Copied. Paste it into a message or email.'); }, function () { toast('Couldn’t copy it on this device.'); });
    } else toast('Couldn’t share on this device.');
  }
  function toast(msg) {
    var t = document.createElement('div'); t.className = 'fb-toast'; t.setAttribute('role', 'status'); t.textContent = msg;
    panel.appendChild(t); setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 2600);
  }

  // ---------- events ----------
  tab.addEventListener('click', function () { open('form'); });
  dim.addEventListener('click', function () { close(); });

  panel.addEventListener('click', function (e) {
    var el = e.target.closest('[data-fb]');
    if (!el) return;
    var p = el.getAttribute('data-fb').split(':'), act = p[0], a = p[1], b = p.slice(2).join(':');
    switch (act) {
      case 'close': close(); break;
      case 'mode': draft.mode = a; ui.err = ''; ui.phiOk = false; save(K.draft, draft); paint('[data-fb="mode:' + a + '"]'); break;
      case 'pick':
        if (a === 'role') { me.role = me.role === b ? '' : b; save(K.me, me); }
        else { draft[a] = draft[a] === b ? '' : b; save(K.draft, draft); }
        ui.err = ''; paint('[data-fb="pick:' + a + ':' + b + '"]'); break;
      case 'multi':
        var arr = draft[a] || [], i = arr.indexOf(b);
        if (i >= 0) arr.splice(i, 1); else arr.push(b);
        draft[a] = arr; save(K.draft, draft); paint('[data-fb="multi:' + a + ':' + b + '"]'); break;
      case 'meedit': ui.meEdit = true; paint('#fb-mename'); break;
      case 'send': send(); break;
      case 'view': ui.view = a; paint(a === 'mine' ? '.fb-icon' : '.fb-primary'); if (a === 'mine') flush(); break;
      case 'another': ui.view = 'form'; paint('[aria-selected="true"]'); break;
      case 'share': share(a + (b ? ':' + b : '')); break;
      case 'retry': flush().then(function () { if (ui.open) paint(); }); break;
      case 'openmed': close(function () { if (HOOK.openMed) HOOK.openMed(a); }); break;
    }
  });

  panel.addEventListener('input', function (e) {
    var k = e.target.getAttribute('data-fbin');
    if (!k) return;
    if (k === 'withCtx') { draft.withCtx = e.target.checked; save(K.draft, draft); paint('[data-fbin="withCtx"]'); return; }
    if (k === 'mename') { me.name = e.target.value; save(K.me, me); return; }
    if (k === 'meemail') { me.email = e.target.value; save(K.me, me); return; }
    draft[k] = e.target.value; save(K.draft, draft);
    if (ui.phiOk && !hasPhi()) { ui.phiOk = false; var w = document.getElementById('fb-phi'); if (w) w.hidden = true; var s = panel.querySelector('[data-fb="send"]'); if (s) s.textContent = draft.mode === 'problem' ? 'Send report' : 'Send request'; }
    if (k === 'name') { var m = document.getElementById('fb-match'); if (m) m.innerHTML = matchHtml(findMed(draft.name)); }
  });
  panel.addEventListener('change', function (e) {
    if (e.target.getAttribute('data-fbin') === 'withCtx') { draft.withCtx = e.target.checked; save(K.draft, draft); paint('[data-fbin="withCtx"]'); }
  });

  document.addEventListener('keydown', function (e) {
    if (!ui.open) return;
    if (e.key === 'Escape') { e.stopPropagation(); close(); return; }
    if (e.key === 'Tab') { // keep focus inside the panel
      var f = panel.querySelectorAll('button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, true);

  window.addEventListener('online', function () { flush(); });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) flush(); });

  window.MEDIAUS_FB = { update: update, onPop: onPop, open: open, close: close, flush: flush, count: function () { return load(K.outbox, []).length + load(K.sent, []).length; }, SHARE_AFTER: SHARE_AFTER };
  update();
  setTimeout(flush, 1500);
})();
