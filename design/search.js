  // ---------- search (redesign) ----------
  // Drop-in for viewSearch. Live region is #live (chips + results); the input stays put while typing.
  // New state: area ('' or AREAS id).

  // Draft browse groups. SME to confirm.
  var AREAS = [
    { id: 'heart', label: 'Heart & circulation', match: ['antiarrhythmic', 'cardiac glycoside', 'antianginal', 'cholesterol'],
      icon: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>' },
    { id: 'infection', label: 'Infections', match: ['antibiotic'],
      icon: '<circle cx="12" cy="12" r="5"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>' },
    { id: 'pain', label: 'Pain & fever', match: ['analgesic'],
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

  function searchResults2() {
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
    return '<div style="display:flex;flex-direction:column;gap:16px"><div class="tabs" role="group" aria-label="Route" style="display:flex;gap:8px;overflow-x:auto;padding-bottom:2px">' + routeChipsHtml() + '</div>' + searchResults2() + '</div>';
  }

  function viewSearch2() {
    var has = !!state.query;
    return '<div style="padding:18px 18px 24px;display:flex;flex-direction:column;gap:14px">' +
      '<div style="display:flex;align-items:center;justify-content:space-between">' +
        '<div style="display:flex;align-items:center;gap:8px">' + logo(28) + '<h1 style="margin:0;font-size:21px;font-weight:800;letter-spacing:-0.4px">Search</h1></div>' +
        '<button data-act="go:profile" aria-label="Profile and settings" style="width:44px;height:44px;border-radius:22px;border:1.5px solid #D9E3E4;background:#FFFFFF;display:flex;align-items:center;justify-content:center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#142B33" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg></button>' +
      '</div>' +
      '<label style="display:flex;align-items:center;gap:10px;border:2px solid #1A8A7E;background:#FFFFFF;border-radius:14px;padding:0 4px 0 14px;min-height:52px;box-shadow:0 0 0 4px #E5F4F2">' + ICON.search('#1A6F67', 2.2) +
        '<span class="sr">Search by active ingredient or brand</span><input id="q" type="text" inputmode="search" enterkeyhint="search" autocomplete="off" placeholder="Active ingredient or brand" style="font-size:16px;border:0;outline:none;background:transparent;flex:1;min-width:0;min-height:46px">' +
        '<button id="qclear" data-act="qclear" aria-label="Clear search"' + (has ? '' : ' hidden') + ' style="flex:none;width:40px;height:40px;border:0;border-radius:20px;background:#EEF2F3;display:flex;align-items:center;justify-content:center">' + ICON.x('#24414A', 14) + '</button></label>' +
      '<div id="live">' + searchLive() + '</div></div>';
  }
