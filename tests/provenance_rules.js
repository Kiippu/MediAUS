/* Provenance rules. Run in the page by tests/test_provenance.py, after the app's data has loaded.
   Returns { errors: [], warnings: [], report: {} }. Any error fails the test. */
(function (today) {
  'use strict';
  var M = window.MEDIAUS, db = M.db, D = window.MEDIAUS_DATA, SRC = db.SOURCES;
  var errors = [], warnings = [], report = { byStatus: {}, byMed: {}, broadCites: 0, labelOverrides: 0, gapsNoLead: [], oldReads: [], unusedSources: [] };
  var E = function (m) { errors.push(m); }, W = function (m) { warnings.push(m); };
  var ISO = /^\d{4}(-\d{2}(-\d{2})?)?$/, DAY = /^\d{4}-\d{2}-\d{2}$/;
  var NOT_READ = ['not-read', 'paywalled', 'not-recorded', 'demo'];
  var SHORTS = ['PI', 'PCH', 'RCH', 'ANMF', 'SESLHD', 'ANZCOR', 'LactMed', 'FSRH', 'ARTG', 'CMI'];

  db.errors.concat(D.errors).forEach(function (e) { E('load: ' + e); });

  // ---------- sources ----------
  var used = {};
  Object.keys(SRC).forEach(function (id) {
    var s = SRC[id];
    if (!/^S-[a-z0-9-]+[a-zA-Z0-9-]*$/.test(id)) E(id + ': source id should look like S-name');
    ['title', 'label', 'short', 'kind', 'status'].forEach(function (k) { if (!s[k]) E(id + ': source missing ' + k); });
    if (s.revised && !ISO.test(s.revised)) E(id + ': revised must be YYYY, YYYY-MM or YYYY-MM-DD');
    if (s.read && !DAY.test(s.read)) E(id + ': read must be YYYY-MM-DD');
    if (s.status === 'read' || s.status === 'partly-read') {
      if (!s.read) E(id + ': a read source needs its read date');
      if (!s.url && !s.note) E(id + ': a read source needs a url (or a note saying why not)');
      if (s.read && monthsBetween(s.read, today) > 12) report.oldReads.push(id + ' (read ' + s.read + ')');
    }
  });

  // ---------- facts ----------
  var seen = {};
  function walkSkeleton(x) { // every string that looks like a fact id, anywhere in a skeleton
    if (typeof x === 'string') { if (/^[A-Z]{3}-\d{4}$/.test(x)) { if (!M.fact(x)) E('skeleton points at missing fact ' + x); seen[x] = (seen[x] || 0) + 1; } }
    else if (Array.isArray(x)) x.forEach(walkSkeleton);
    else if (x && typeof x === 'object') Object.keys(x).forEach(function (k) { walkSkeleton(x[k]); });
  }
  db.ORDER.forEach(function (id) { walkSkeleton(db.MEDS[id]); });
  Object.keys(db.SETS).forEach(function (k) { walkSkeleton(db.SETS[k]); });

  var medOf = {};
  db.ORDER.forEach(function (mid) {
    (function walk(x) {
      if (typeof x === 'string') { if (/^[A-Z]{3}-\d{4}$/.test(x)) medOf[x] = mid; }
      else if (Array.isArray(x)) x.forEach(walk);
      else if (x && typeof x === 'object') Object.keys(x).forEach(function (k) { walk(x[k]); });
    })(db.MEDS[mid]);
  });

  Object.keys(db.FACTS).forEach(function (table) {
    var T = db.FACTS[table];
    Object.keys(T).forEach(function (id) {
      var f = T[id], where = id + ' (' + table + ')';
      if (!/^[A-Z]{3}-\d{4}$/.test(id)) E(where + ': id must be PREFIX-NNNN');
      if (M.STATUS.indexOf(f.status) < 0) E(where + ': unknown status ' + f.status);
      if (!f.changed || !DAY.test(f.changed)) E(where + ': changed must be YYYY-MM-DD');
      report.byStatus[f.status] = (report.byStatus[f.status] || 0) + 1;
      var med = medOf[id] || (['AGENT', 'GROUP', 'MEMBER'].indexOf(table) >= 0 ? 'interaction links' : 'demo');
      var bm = report.byMed[med] = report.byMed[med] || {};
      bm[f.status] = (bm[f.status] || 0) + 1;

      var cites = f.cites || [], look = f.lookIn || [];
      if (f.status === 'retired') { if (seen[id]) E(where + ': retired but still shown'); return; }
      if (!seen[id]) E(where + ': not used by any medicine or list (retire it instead)');

      // every displayed fact has a source, or says where to look
      if (f.status === 'draft' || f.status === 'signed') { if (!cites.length) E(where + ': no cites'); }
      if (f.status === 'verify' && !cites.length && !look.length) E(where + ': to verify, but no cites and nowhere to look');
      if (f.status === 'gap' && !cites.length && !look.length) report.gapsNoLead.push(id);
      if (f.status === 'demo') { if (!cites.length || cites.some(function (c) { return c.src !== 'S-demo'; })) E(where + ': demo facts cite S-demo only'); }

      cites.forEach(function (c, i) {
        if (!SRC[c.src]) E(where + ': cites unknown source ' + c.src);
        else used[c.src] = true;
        if (c.loc && !/^[\d.]+(, [\d.]+)*$/.test(c.loc)) E(where + ': cite ' + (i + 1) + ' loc should be section numbers like "4.2, 6.4"');
        if (c.broad) report.broadCites++;
        if (c.as) report.labelOverrides++;
      });
      look.forEach(function (x) { var s = typeof x === 'string' ? x : x.src; if (!SRC[s]) E(where + ': lookIn unknown source ' + s); else used[s] = true; });

      // signed off = reviewed after the last change, against documents we actually read
      if (f.status === 'signed') {
        var rv = f.review && db.REVIEWS[f.review];
        if (!rv) E(where + ': signed needs a review id that exists');
        else if (rv.on < f.changed) E(where + ': changed after its sign-off (' + rv.on + '); set status back to draft');
        cites.forEach(function (c) { if (SRC[c.src] && NOT_READ.indexOf(SRC[c.src].status) >= 0) E(where + ': signed, but cites ' + c.src + ' which is ' + SRC[c.src].status); });
      }

      // text: markers resolve; no citations or "to verify" typed into the words
      ['text', 'note', 'summary', 'missing', 'none', 'heading'].forEach(function (k) {
        var t = f[k]; if (typeof t !== 'string') return;
        (t.match(/\[\d+\]/g) || []).forEach(function (mk) { if (!cites[+mk.slice(1, -1) - 1]) E(where + ': ' + k + ' marker ' + mk + ' has no cite'); });
        if (/\((?:t|T)o verify\)|— to verify/.test(t)) E(where + ': "(to verify)" typed in ' + k + '; use status verify');
        var bare = t.match(new RegExp('\\((?:' + SHORTS.join('|') + ')(?: [\\d.]+(?:, [\\d.]+)*)?(?:, |\\))', 'g'));
        if (bare) E(where + ': citation typed as text in ' + k + ': ' + bare.join(' ') + ' (use a [n] marker)');
        if (/to verify/i.test(t) && f.status !== 'gap') W(where + ': says "to verify" in its ' + k + ': ' + t);
      });
    });
  });
  Object.keys(SRC).forEach(function (id) { if (!used[id]) report.unusedSources.push(id); });

  // ---------- interaction links (unknown 'with' targets are load errors from resolve.js) ----------
  report.emptyAtcGroups = Object.keys(D.GROUPS).filter(function (k) { return D.GROUPS[k].basis === 'atc' && !D.groupMembers(k).length; });
  report.listGroupsNoMembers = Object.keys(D.GROUPS).filter(function (k) { return D.GROUPS[k].basis === 'list' && !D.GROUPS[k].members.length; });
  report.listGroupsNoMembers.forEach(function (k) { E('group ' + k + ': list group with no MEM records'); });
  // A line whose text names an agent its links don't reach: probably a missing 'with' code.
  var names = D.AGENTS.map(function (a) {
    var ns = [a.name.split(' (')[0]].concat(a.also || []).filter(function (n) { return n.length > 3; });
    return { key: a.key, re: new RegExp('\\b(?:' + ns.map(function (n) { return n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')\\b', 'i') };
  });
  db.ORDER.forEach(function (mid) {
    var m = D.MEDS[mid];
    m.interactions.important.concat(m.interactions.other).forEach(function (it) {
      var reached = {};
      it['with'].forEach(function (t) { (t.indexOf('g:') === 0 ? D.groupMembers(t.slice(2)) : [t]).forEach(function (k) { reached[k] = true; }); });
      names.forEach(function (n) {
        if (n.key !== mid && !reached[n.key] && n.re.test((it.title || '') + ' ' + it.text)) W(it._f + ': text names ' + n.key + ' but its links do not reach it');
      });
    });
  });
  db.ORDER.forEach(function (mid) { if (!D.MEDS[mid]) E('medicine ' + mid + ' did not build'); });

  function monthsBetween(a, b) { var x = a.split('-'), y = b.split('-'); return (y[0] - x[0]) * 12 + (y[1] - x[1]); }
  return { errors: errors, warnings: warnings, report: report };
})
