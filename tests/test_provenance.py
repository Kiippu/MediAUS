"""Provenance test: every fact shown has a source trail. Fails on any rule error.

Rules: tests/provenance_rules.js. Prints a per-medicine report (facts by status, broad cites, gaps).
Also opens one Trail screen to check the provenance view works.
"""
import asyncio, datetime, json, os, sys
from playwright.async_api import async_playwright

HERE = os.path.dirname(__file__)
OUT = os.path.join(HERE, 'shots') + '/'
URL = 'http://localhost:8090/'


async def main():
    os.makedirs(OUT, exist_ok=True)
    rules = open(os.path.join(HERE, 'provenance_rules.js'), encoding='utf-8').read()
    today = datetime.date.today().isoformat()
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True, has_touch=True)
        pg = await ctx.new_page()
        errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto(URL, wait_until='networkidle')
        res = await pg.evaluate('(' + rules + ')(' + json.dumps(today) + ')')

        r = res['report']
        print('facts by status:', r['byStatus'])
        for med, c in r['byMed'].items():
            print(f'  {med}: {c}')
        print('cites taken from a block source line (narrow to a section):', r['broadCites'])
        print('cites shown with a different label (as):', r['labelOverrides'])
        print('gaps with no lead yet:', len(r['gapsNoLead']), ' '.join(r['gapsNoLead']))
        print('sources read over 12 months ago:', r['oldReads'] or 'none')
        print('sources not cited anywhere:', r['unusedSources'] or 'none')
        print('ATC groups with no members yet:', ' '.join(r['emptyAtcGroups']) or 'none')
        for w in res['warnings']:
            print('warning:', w)
        for e in res['errors']:
            print('ERROR:', e)

        # the Trail screen
        await pg.click('text=Get Started')
        if await pg.locator('#wn-ok').count(): await pg.click('#wn-ok')
        await pg.evaluate("a => { const b = document.createElement('button'); b.dataset.act = a; document.getElementById('app').appendChild(b); b.click(); }", 'medr:amiodarone:tab:swallow')
        await pg.click('[data-act^="prov:"] >> nth=0')
        t = await pg.inner_text('#app')
        assert 'ADM-0001' in t and 'Documents' in t and 'Open document' in t, 'trail screen'
        await pg.screenshot(path=OUT + 'v01-trail-amio-swallow.png', full_page=True)
        await pg.click('[data-act="back"]')
        assert await pg.locator('[data-act="rsel:swallow"]').count() == 1, 'back returns to the route'

        print('errors:', errs)
        await b.close()
    if res['errors'] or errs:
        sys.exit(1)

asyncio.run(main())
