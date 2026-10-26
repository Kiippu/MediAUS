  // ---------- preview harness (artifact only, not for app.js) ----------
  state.screen = PAGE;
  state.area = '';
  state.adding = false;
  var mode = 'new', toastMsg = '', toastTimer = null;
  var app = document.getElementById('app');
  var NAMES = { home: 'Home', search: 'Search', check: 'Interactions', profile: 'More', pill: 'Pill identifier', scan: 'Scan barcode' };

  function toast(msg) {
    toastMsg = msg; render(true);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastMsg = ''; var t = document.getElementById('toast'); if (t) t.hidden = true; }, 2600);
  }
  function render(keep) {
    var sc = document.getElementById('scroll'), top = keep && sc ? sc.scrollTop : 0;
    var view = PAGE === 'search' ? (mode === 'new' ? viewSearch2 : viewSearch) : (mode === 'new' ? viewCheck2 : viewCheck);
    app.innerHTML = '<div class="scroll" id="scroll">' + view() + '</div>' + navHtml() +
      '<div id="toast" role="status"' + (toastMsg ? '' : ' hidden') + ' style="position:absolute;left:16px;right:16px;bottom:84px;background:#0C2A30;color:#FFFFFF;border-radius:12px;padding:12px 14px;font-size:13px;line-height:1.4;box-shadow:0 8px 24px rgba(12,42,48,.25)">' + esc(toastMsg) + '</div>';
    var q = document.getElementById('q'); if (q) q.value = state.query;
    var s2 = document.getElementById('scroll'); if (s2 && top) s2.scrollTop = top;
    app.querySelectorAll('.tabs [aria-pressed="true"]').forEach(function (el) {
      var row = el.parentNode;
      if (el.offsetLeft + el.offsetWidth > row.scrollLeft + row.clientWidth || el.offsetLeft < row.scrollLeft) row.scrollLeft = el.offsetLeft - 16;
    });
  }
  function liveUpdate() {
    var live = document.getElementById('live');
    if (live) { live.innerHTML = searchLive(); var c = document.getElementById('qclear'); if (c) c.hidden = !state.query; }
    else { var r = document.getElementById('results'); if (r) r.innerHTML = searchResultsHtml(); }
  }
  function formName(id, fid) { var m = D.MEDS[id], f = m.forms.filter(function (x) { return x.id === fid; })[0] || m.forms[0]; return m.name + ' · ' + f.label; }

  app.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var p = el.getAttribute('data-act').split(':'), act = p[0], arg = p[1];
    switch (act) {
      case 'go': if (arg !== PAGE) toast(NAMES[arg] + ' is not part of this preview.'); break;
      case 'back': toast('Back is not part of this preview.'); break;
      case 'med': toast('Opens ' + formName(arg, p[2]) + ', Overview tab.'); break;
      case 'medr': toast('Opens ' + formName(arg, p[2]) + ', Administration tab, with this route selected.'); break;
      case 'medtab': toast('Opens ' + D.MEDS[arg].name + ', ' + cap(p[2]) + ' tab.'); break;
      case 'route': state.route = arg; liveUpdate(); if (mode === 'old') render(true); break;
      case 'area': state.area = arg || ''; liveUpdate(); break;
      case 'sclear': state.query = ''; state.route = 'All'; state.area = ''; render(true); break;
      case 'qclear': state.query = ''; render(true); var q = document.getElementById('q'); if (q) q.focus(); break;
      case 'pick': state.query = arg; var q2 = document.getElementById('q'); if (q2) q2.value = arg; liveUpdate(); break;
      case 'remove': state.selected = state.selected.filter(function (x) { return x !== arg; }); render(true); break;
      case 'add': state.selected = state.selected.concat([arg]); render(true); break;
      case 'adding': state.adding = !state.adding; render(true); break;
    }
  });
  app.addEventListener('input', function (e) { if (e.target.id === 'q') { state.query = e.target.value; liveUpdate(); } });

  function setMode(m) {
    mode = m;
    document.getElementById('m-new').setAttribute('aria-pressed', m === 'new');
    document.getElementById('m-old').setAttribute('aria-pressed', m === 'old');
    render();
  }
  document.getElementById('m-new').addEventListener('click', function () { setMode('new'); });
  document.getElementById('m-old').addEventListener('click', function () { setMode('old'); });
  render();
