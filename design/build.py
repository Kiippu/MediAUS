"""Bundle a redesigned MediAUS view into one self-contained artifact page."""
import sys, pathlib, subprocess
root = pathlib.Path(__file__).resolve().parent.parent
page, out = sys.argv[1], pathlib.Path(sys.argv[2])
app = (root / 'app/app.js').read_text(encoding='utf-8')
def cut(a, b):
    i = app.index(a); j = app.index(b, i)
    return app[i:j]
core = (cut("  var D = window.MEDIAUS_DATA;", "  // ---------- splash ----------")
        + cut("  // ---------- route status labels ----------", "  // ---------- medication ----------")
        + cut("  // ---------- interaction checker ----------", "  // ---------- pill identifier ----------")
        + cut("  function navHtml() {", "  // ---------- render & navigation ----------"))
new = (root / 'design' / (page + '.js')).read_text(encoding='utf-8')
harness = (root / 'design/harness.js').read_text(encoding='utf-8')
sha = subprocess.check_output(['git', '-C', str(root), 'rev-parse', '--short', 'HEAD'], text=True).strip()
branch = subprocess.check_output(['git', '-C', str(root), 'rev-parse', '--abbrev-ref', 'HEAD'], text=True).strip()
title = {'search': 'MediAUS Search Redesign', 'check': 'MediAUS Interactions Redesign'}[page]
label = {'search': 'Search', 'check': 'Interactions'}[page]
tpl = (root / 'design/shell.html').read_text(encoding='utf-8')
html = (tpl.replace('{{TITLE}}', title).replace('{{LABEL}}', label).replace('{{SHA}}', sha).replace('{{BRANCH}}', branch)
        .replace('{{STYLES}}', (root / 'app/styles.css').read_text(encoding='utf-8'))
        .replace('{{DATA}}', (root / 'app/data.js').read_text(encoding='utf-8'))
        .replace('{{APP}}', "(function () {\n  'use strict';\n  var PAGE = '" + page + "';\n" + core + new + harness + "})();"))
out.write_text(html, encoding='utf-8')
print(out, len(html))
