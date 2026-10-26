"""Smoke test: population switch and preparation panel."""
import asyncio, os
from playwright.async_api import async_playwright

OUT = os.path.join(os.path.dirname(__file__), 'shots') + '/'
URL = 'http://localhost:8090/'


async def main():
    os.makedirs(OUT, exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True, has_touch=True)
        pg = await ctx.new_page()
        errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))

        async def to(sel):
            await pg.evaluate("s => { const e = document.querySelector(s); if (e) e.scrollIntoView({block: 'start'}); }", sel)
            await pg.wait_for_timeout(150)

        async def shot(name):
            await pg.screenshot(path=OUT + name + '.png')

        async def text():
            return await pg.inner_text('#app')

        async def open_med(q, act):
            await pg.goto(URL, wait_until='networkidle')
            await pg.click('text=Get Started')
            await pg.click('nav >> text=Search')
            await pg.fill('#q', q)
            _, med, frm = act.split(':')
            await pg.click(f'[data-act^="med:{med}:"]')
            await pg.click(f'[data-act="form:{frm}"]')
            await pg.click('[role=tab]:has-text("Administration")')

        # amoxicillin powder, IV infusion
        await open_med('amox', 'med:amoxicillin:inj')
        await pg.click('[data-act="rsel:ivinf"]')
        t = await text()
        for want in ['Showing: all groups', '1. Reconstitute', '2. Dilute', '3. Give', 'Bag volume not stated', 'Pump rate (mL/h) not shown']:
            assert want in t, want
        await to('[data-act="rsel:ivinf"]'); await shot('p01-amox-ivinf-all')
        await pg.click('[data-act="pop:adult"]')
        t = await text()
        assert 'Showing: Adults' in t and '9.2 mL' not in t, 'adult filter'
        await to('[data-act="rsel:ivinf"]'); await shot('p02-amox-ivinf-adult')
        await pg.click('[data-act="pop:newborn"]')
        t = await text()
        assert 'Up to 100 mg/mL' in t and 'Rate not found' in t, 'newborn filter'
        await to('[data-act="rsel:ivinf"]'); await shot('p03-amox-ivinf-newborn')
        await pg.click('[data-act="rsel:im"]')
        t = await text()
        assert 'Ibiamox CMI (2015): IM or IV' in t, 'ibiamox differ'

        # amiodarone injection: infusion pump rate, arrest by group
        await open_med('amio', 'med:amiodarone:inj')
        await pg.click('[data-act="pop:adult"]')
        t = await text()
        assert '125 to 750 mL/h' in t, 'pump rate'
        await to('[data-act="rsel:ivinf"]'); await shot('p04-amio-ivinf-adult')
        await pg.click('[data-act="pop:child"]')
        await pg.click('[data-act="rsel:arrest"]')
        t = await text()
        assert '5 mg/kg (max 300 mg)' in t and 'sources differ for children' in t.lower(), 'child arrest'
        await to('[data-act="rsel:arrest"]'); await shot('p05-amio-arrest-child')
        await pg.click('[data-act="pop:newborn"]')
        await pg.click('[data-act="rsel:ivinj"]')
        t = await text()
        assert 'contraindicated in neonates' in t, 'newborn ivinj'
        # dosage tab shares the switch
        await pg.click('[role=tab]:has-text("Dosage")')
        await pg.click('[data-act="dsel:arrest"]')
        t = await text()
        assert 'Showing: Newborns' in t and '5 mg/kg rapid bolus' in t, 'dosage newborn'
        await shot('p06-amio-dose-newborn')

        # tablets: newborn not offered; 'na' state for swallow
        await pg.click('[data-act="form:tab"]')
        await pg.click('[role=tab]:has-text("Administration")')
        await to('[data-act="rsel:swallow"]'); await shot('p07-amio-tab-all')

        # digoxin injection adult gaps
        await open_med('dig', 'med:digoxin:inj')
        await pg.click('[data-act="pop:adult"]')
        t = await text()
        assert 'Lanoxin Adult PI' in t and 'not found yet' in t.lower(), 'digoxin adult gap'
        await to('[data-act="rsel:iv"]'); await shot('p08-dig-iv-adult')
        await pg.click('[data-act="pop:newborn"]')
        t = await text()
        assert '2 mL (50 microgram) to 8 mL' in t
        await to('[data-act="rsel:iv"]'); await shot('p09-dig-iv-newborn')

        print('errors:', errs)
        assert not errs
        await b.close()

asyncio.run(main())
