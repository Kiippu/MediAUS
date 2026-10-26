  // ---------- interaction checker (redesign) ----------
  // Drop-in for viewCheck. New state: adding (picker open).
  var SEV_ORDER = ['major', 'moderate', 'minor', 'conflict', 'none'];

  function checkHits(sel) {
    return PAIRS.filter(function (p) { return sel.indexOf(p.a) >= 0 && sel.indexOf(p.b) >= 0; })
      .sort(function (a, b) { return SEV[a.sev].rank - SEV[b.sev].rank; });
  }
  // PAIRS are demo text. Look for the same pair in data.js so the card can name a real source.
  function pairEvidence(p) {
    var out = [];
    [[p.a, p.b], [p.b, p.a]].forEach(function (x) {
      var m = D.MEDS[x[0]]; if (!m) return;
      var other = CHECK_MEDS[x[1]].toLowerCase();
      var all = m.interactions.important.concat(m.interactions.other);
      var hit = all.filter(function (i) { return ((i.title || '') + ' ' + i.text).toLowerCase().indexOf(other) >= 0; })[0];
      if (hit) out.push({ med: m, item: hit, verify: /to verify/i.test(hit.text) || hit.verify });
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
    var addable = Object.keys(CHECK_MEDS).filter(function (id) { return sel.indexOf(id) < 0; });
    var picker = state.adding && addable.length ? '<div style="border-top:1px solid #EEF2F3;padding:12px;display:flex;flex-direction:column;gap:10px;background:#F7FAFA">' +
      '<span style="font-size:12px;font-weight:600;color:#5B6F75">Tap to add</span><div style="display:flex;flex-wrap:wrap;gap:6px">' + addable.map(function (id) {
        return '<button data-act="add:' + id + '" style="display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:#0E5E59;background:#FFFFFF;border:1.5px solid #A8D3CD;border-radius:999px;padding:0 12px;min-height:36px">+ ' + esc(CHECK_MEDS[id]) + '</button>';
      }).join('') + '</div></div>' : '';
    var addBtn = addable.length ? '<button data-act="adding" aria-expanded="' + !!state.adding + '" style="display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:0;border-top:1px solid #EEF2F3;background:transparent;padding:0 14px;min-height:52px;font-size:14px;font-weight:700;color:#1A6F67">' +
      '<span style="width:28px;height:28px;border-radius:14px;background:#E5F4F2;display:flex;align-items:center;justify-content:center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A6F67" stroke-width="3" stroke-linecap="round" aria-hidden="true">' + (state.adding ? '<path d="M5 12h14"/>' : '<path d="M12 5v14M5 12h14"/>') + '</svg></span>' + (state.adding ? 'Done adding' : 'Add a medicine') + '</button>' : '';
    return '<div style="display:flex;flex-direction:column;gap:10px"><div style="display:flex;justify-content:space-between;align-items:baseline"><h2 style="' + H2 + '">Your Medicines</h2><span style="font-size:12px;color:#5B6F75">' + sel.length + ' added</span></div>' +
      '<div style="' + CARD + ';border-radius:16px;overflow:hidden">' + (rows || '<div style="padding:14px;font-size:13px;color:#5B6F75">Nothing added yet.</div>') + addBtn + picker + '</div></div>';
  }

  function pairCard(p) {
    var d = sevDeco(p.sev), ev = pairEvidence(p);
    var conflict = ev.filter(function (e) { return e.item.positions; })[0];
    var srcRows = ev.length ? ev.map(function (e) {
      return '<span style="font-size:12px;line-height:1.5;color:#24414A"><span style="font-weight:700">' + esc(e.med.name) + ' entry: </span>' + esc(e.med.src.interactions) + (e.verify ? ' ' + VERIFY_TAG : '') + '</span>';
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

  function viewCheck2() {
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
      '<div style="display:flex;align-items:center;justify-content:space-between">' +
        '<div style="display:flex;align-items:center;gap:8px">' + logo(28) + '<h1 style="margin:0;font-size:21px;font-weight:800;letter-spacing:-0.4px">Interactions</h1></div>' +
        '<button data-act="go:profile" aria-label="Profile and settings" style="width:44px;height:44px;border-radius:22px;border:1.5px solid #D9E3E4;background:#FFFFFF;display:flex;align-items:center;justify-content:center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#142B33" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg></button>' +
      '</div>' +
      checkHero(sel, hits) + checkList(sel, hits) + results +
      '<div style="display:flex;flex-direction:column;gap:6px">' + sampleBadge() + '<span style="font-size:12px;line-height:1.5;color:#5B6F75">Checker pairs are demo data. Real pair data is on the MVP to-do list.</span></div>' +
      '</div>';
  }
