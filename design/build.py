"""Bundle the whole app (app/) into one self-contained HTML page for an artifact preview.

Usage: python design/build.py out.html
"""
import sys, pathlib, subprocess
root = pathlib.Path(__file__).resolve().parent.parent
app = root / 'app'
git = lambda *a: subprocess.check_output(['git', '-C', str(root), *a], text=True).strip()
ref = git('rev-parse', '--abbrev-ref', 'HEAD') + ' @ ' + git('rev-parse', '--short', 'HEAD')
read = lambda n: (app / n).read_text(encoding='utf-8')
# data files in the order index.html loads them
import re
data = '\n'.join('<script>\n' + read(s) + '\n</script>' for s in re.findall(r'<script src="(data/[^"]+)"></script>', read('index.html')))
html = f'''<title>MediAUS App Preview</title>
<meta name="description" content="MediAUS prototype, built from {ref}.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
<meta name="theme-color" content="#0C2A30">
<style>
{read('styles.css')}
</style>
<main id="app" class="app" aria-live="polite"></main>
{data}
<script>
{read('app.js')}
</script>
'''
out = pathlib.Path(sys.argv[1]); out.write_text(html, encoding='utf-8')
print(out, len(html), ref)
