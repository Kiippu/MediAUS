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
        # what's new pop-up: once per version, then hidden features stay hidden
        await pg.wait_for_selector('#wn-ok'); await shot('00-whats-new')
        await pg.click('#wn-ok')
        assert await pg.locator('#wn-ok').count() == 0, 'pop-up closes'
        assert await pg.locator('text=Pill Identifier').count() == 0, 'pill identifier hidden'
        assert await pg.locator('text=Scan Barcode').count() == 0, 'scanner hidden'
        # search opens without focusing the input (no keyboard on phones)
        await pg.click('nav >> text=Search'); assert await pg.evaluate("document.activeElement.id") != 'q', 'search not auto-focused'
        await pg.click('nav >> text=Home')
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
        await pg.click('nav >> text=Search'); await pg.fill('#q', 'dig'); await pg.click('[data-act^="med:digoxin:"]'); await pg.click('[data-act="form:inj"]')
        await pg.click('[role=tab]:has-text("Administration")'); await top(330); await shot('12-dig-iv')
        await pg.click('[data-act="rsel:im"]'); await top(330); await shot('13-dig-im')
        await pg.click('[data-act="form:tab"]'); await top(560); await shot('14-dig-tab-overview')
        # amoxicillin interactions conflict
        await pg.goto('http://localhost:8090/', wait_until='networkidle'); await pg.click('text=Get Started')
        await pg.click('[data-act="med:amoxicillin:cap"]'); await pg.click('[role=tab]:has-text("Interactions")'); await top(500); await shot('15-amox-int')
        await pg.click('[role=tab]:has-text("Administration")'); await pg.click('[data-act="rsel:open"]'); await top(300); await shot('16-amox-open')
        # tap the open route again to collapse it
        await pg.click('[data-act="rsel:open"]')
        assert await pg.locator('[aria-expanded="true"]').count() == 0, 'route collapses'
        await pg.click('[data-act="rsel:open"]')
        assert await pg.locator('[data-act="rsel:open"][aria-expanded="true"]').count() == 1, 'route reopens'
        # pill identifier hidden on the medicine page too
        await pg.click('[role=tab]:has-text("Overview")')
        assert await pg.locator('text=Save to List').count() == 1
        assert await pg.locator('[data-act="go:pill"]').count() == 0, 'no Identify a pill button'
        # checker: type-to-add picker
        await pg.click('[data-act="back"]'); await pg.click('nav >> text=Interactions'); await shot('18-check')
        await pg.fill('#addq', 'cord'); await pg.keyboard.press('ArrowDown')
        assert await pg.locator('#addlist >> text=In your list').count() == 1, 'added meds show as in list'
        await pg.fill('#addq', 'meth'); await pg.keyboard.press('Enter'); await pg.wait_for_timeout(150)
        assert await pg.locator('[data-act="remove:methotrexate"]').count() == 1, 'enter adds top match'
        assert await pg.evaluate("document.activeElement.id") == 'addq', 'focus stays in picker'
        await shot('19-check-added')
        # every screen but home uses the shared header
        await pg.click('nav >> text=More'); await shot('20-profile')
        assert await pg.locator('h1:has-text("Profile")').count() == 1
        # About reopens the pop-up
        await pg.click('[data-act="whatsnew"]'); await pg.wait_for_selector('#wn-ok'); await pg.keyboard.press('Escape')
        assert await pg.locator('#wn-ok').count() == 0, 'Esc closes the pop-up'
        print('errors:', errs)
        await b.close()

asyncio.run(main())
