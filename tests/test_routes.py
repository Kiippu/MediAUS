import asyncio, os
from playwright.async_api import async_playwright

OUT = os.path.join(os.path.dirname(__file__), 'shots') + '/'


async def main():

    os.makedirs(OUT, exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch()
        ctx = await b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True, has_touch=True)
        pg = await ctx.new_page()
        errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))

        async def top(px):
            await pg.evaluate(f"document.getElementById('scroll').scrollTop={px}")

        async def shot(name):
            await pg.screenshot(path=OUT + name + '.png')

        await pg.goto('http://localhost:8090/', wait_until='networkidle')
        await pg.click('text=Get Started')
        # search by route
        await pg.click('nav >> text=Search'); await pg.click('[data-act="route:Enteral tube"]'); await shot('01-search-tube')
        await pg.click('[data-act="route:IM"]'); await shot('02-search-im')
        await pg.click('[data-act^="medr:amoxicillin:inj:im"]'); await pg.wait_for_timeout(200); await top(380); await shot('03-amox-im')
        # amiodarone
        await pg.click('[data-act="back"]'); await pg.click('[data-act="route:All"]'); await pg.fill('#q', 'amio')
        await pg.click('[data-act="med:amiodarone:tab"]'); await top(380); await shot('04-amio-overview')
        await pg.click('[role=tab]:has-text("Administration")'); await top(330); await shot('05-amio-tab-admin')
        await pg.click('[data-act="rsel:disperse"]'); await top(330); await shot('06-amio-disperse')
        await pg.click('[data-act="form:inj"]'); await pg.click('[role=tab]:has-text("Administration")'); await top(330); await shot('07-amio-inj-admin')
        await pg.click('[data-act="rsel:arrest"]'); await top(560); await shot('08-amio-arrest')
        await pg.click('[role=tab]:has-text("Dosage")'); await top(330); await shot('09-amio-dose-ivinf')
        await pg.click('[data-act="dsel:arrest"]'); await top(330); await shot('10-amio-dose-arrest')
        await pg.click('[role=tab]:has-text("Pregnancy")'); await top(330); await shot('11-amio-preg')
        # digoxin IM differ
        await pg.click('[data-act="back"]')
        await pg.goto('http://localhost:8090/', wait_until='networkidle'); await pg.click('text=Get Started')
        await pg.click('nav >> text=Search'); await pg.fill('#q', 'dig'); await pg.click('[data-act="med:digoxin:inj"]')
        await pg.click('[role=tab]:has-text("Administration")'); await top(330); await shot('12-dig-iv')
        await pg.click('[data-act="rsel:im"]'); await top(330); await shot('13-dig-im')
        await pg.click('[data-act="form:tab"]'); await top(560); await shot('14-dig-tab-overview')
        # amoxicillin interactions conflict
        await pg.goto('http://localhost:8090/', wait_until='networkidle'); await pg.click('text=Get Started')
        await pg.click('[data-act="med:amoxicillin:cap"]'); await pg.click('[role=tab]:has-text("Interactions")'); await top(500); await shot('15-amox-int')
        await pg.click('[role=tab]:has-text("Administration")'); await pg.click('[data-act="rsel:open"]'); await top(300); await shot('16-amox-open')
        # pill identifier + scanner smoke
        await pg.click('[data-act="back"]'); await pg.click('text=Pill Identifier'); await pg.fill('#imp', 'u3a'); await top(600); await shot('17-pill-u3a')
        print('errors:', errs)
        await b.close()

asyncio.run(main())
