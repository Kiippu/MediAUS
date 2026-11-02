"""Feedback tab and panel (app/feedback.js). Fakes POST api/feedback, so plain http.server is fine.
Run: python -m http.server 8090 -d app, then python tests/test_feedback.py"""
import asyncio, json, os
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

        posts = []
        mode = {'up': True}

        async def api(route):
            if not mode['up']:
                await route.abort()
                return
            body = route.request.post_data
            posts.append(body)
            r = json.loads(body)
            await route.fulfill(status=200, content_type='application/json', body=json.dumps({'ok': True, 'id': r['id']}))
        await pg.route('**/api/feedback', api)

        async def shot(name):
            await pg.screenshot(path=OUT + 'fb-' + name + '.png')

        async def is_open():
            return await pg.evaluate("!document.getElementById('fb-panel').hidden && document.getElementById('fb-root').classList.contains('fb-on')")

        await pg.goto(URL, wait_until='networkidle')
        assert await pg.locator('#fb-tab').is_hidden(), 'tab hidden on splash'
        await pg.click('text=Get Started')
        await pg.wait_for_selector('#wn-ok')
        assert await pg.locator('#fb-tab').is_hidden(), "tab hidden under What's new"
        await pg.click('#wn-ok')
        assert await pg.locator('#fb-tab').is_visible(), 'tab shows on Home'

        # open from a medicine page; Escape and back both close it
        await pg.click('nav >> text=Search'); await pg.fill('#q', 'dig'); await pg.click('[data-act^="med:digoxin:"]')
        await pg.click('[data-act="form:inj"]'); await pg.click('[role=tab]:has-text("Dosage")')
        await shot('01-tab')
        await pg.click('#fb-tab'); await pg.wait_for_timeout(300)
        assert await is_open(), 'panel opens'
        assert await pg.evaluate("document.getElementById('app').inert"), 'app is inert behind the panel'
        await shot('02-open')
        await pg.keyboard.press('Escape'); await pg.wait_for_timeout(300)
        assert not await is_open(), 'Escape closes'
        await pg.click('#fb-tab'); await pg.wait_for_timeout(200)
        await pg.go_back(); await pg.wait_for_timeout(300)
        assert not await is_open(), 'back closes'
        assert (await pg.evaluate("document.title")).startswith('Digoxin'), 'back stays on the medicine page'
        await pg.click('#fb-tab'); await pg.wait_for_timeout(200)
        await pg.click('[data-fb="close"]'); await pg.wait_for_timeout(300)
        assert not await is_open(), 'close button closes'
        assert (await pg.evaluate("document.title")).startswith('Digoxin'), 'close button stays on the medicine page'

        # validation, patient-detail warning, then send
        await pg.click('#fb-tab'); await pg.wait_for_timeout(200)
        await pg.click('[data-fb="send"]')
        assert await pg.locator('.fb-err').count() == 1, 'asks what is wrong'
        await pg.click('[data-fb="pick:kind:data"]')
        await pg.fill('#fb-what', 'Child IV dose shows 10 µg/kg; RCH says otherwise. URN 1234567')
        await pg.click('[data-fb="pick:sev:annoying"]')
        await pg.fill('#fb-mename', 'Test Nurse'); await pg.click('[data-fb="pick:role:RN"]')
        await pg.click('[data-fb="send"]')
        assert await pg.locator('#fb-phi').is_visible(), 'patient-detail warning'
        assert len(posts) == 0, 'not sent before Send anyway'
        await shot('03-warning')
        await pg.click('[data-fb="send"]'); await pg.wait_for_selector('text=Thanks, your report is in.')
        await shot('04-sent')
        assert len(posts) == 1, 'one post'
        raw = posts[0]
        assert all(ord(c) < 128 for c in raw), 'body is ASCII only'
        r = json.loads(raw)
        assert r['type'] == 'problem' and r['problem']['kind'] == 'data' and 'µg' in r['problem']['what'], 'problem fields, µ survives'
        assert r['context']['medId'] == 'digoxin' and r['context']['formId'] == 'inj' and r['context']['tab'] == 'dosage', 'context'
        assert len(r['context']['facts']) > 0, 'fact ids attached'
        assert r['from']['name'] == 'Test Nurse' and r['from']['role'] == 'RN', 'sender'
        assert r['app']['version'], 'version'

        # request: brand matches a medicine in the app, open it
        await pg.click('[data-fb="another"]')
        await pg.click('[data-fb="mode:request"]')
        assert await pg.locator('text=Sending as').count() == 1, 'sender remembered'
        await pg.fill('#fb-name', 'Cilamox')
        await pg.wait_for_selector('#fb-match >> text=Amoxicillin')
        await shot('05-request-match')
        await pg.click('[data-fb="openmed:amoxicillin"]'); await pg.wait_for_timeout(400)
        assert not await is_open(), 'open it closes the panel'
        assert (await pg.evaluate("document.title")).startswith('Amoxicillin'), 'opens the medicine'

        # offline: saved, shown as waiting, then sent on retry
        mode['up'] = False
        await pg.click('#fb-tab'); await pg.wait_for_timeout(200)
        assert await pg.input_value('#fb-name') == 'Cilamox', 'draft kept after closing'
        await pg.fill('#fb-name', 'Vancomycin'); await pg.fill('#fb-need', 'IV infusion')
        await pg.click('[data-fb="multi:settings:Ward"]')
        await pg.click('[data-fb="send"]'); await pg.wait_for_selector('text=Saved on this phone')
        await shot('06-saved')
        assert await pg.evaluate("JSON.parse(localStorage.getItem('mediaus.fbOutbox')).length") == 1, 'in outbox'
        await pg.click('[data-fb="another"]'); await pg.click('[data-fb="view:mine"]'); await pg.wait_for_timeout(300)
        assert await pg.locator('.fb-pill.waiting').count() == 1, 'listed as waiting'
        await shot('07-mine-waiting')
        mode['up'] = True
        await pg.click('[data-fb="retry"]'); await pg.wait_for_timeout(500)
        assert await pg.evaluate("JSON.parse(localStorage.getItem('mediaus.fbOutbox')).length") == 0, 'outbox empty'
        assert await pg.locator('.fb-pill.waiting').count() == 0, 'no longer waiting'
        assert len(posts) == 2 and json.loads(posts[1])['request']['settings'] == ['Ward'], 'request posted'
        await pg.click('[data-fb="close"]'); await pg.wait_for_timeout(300)

        # Profile row opens Your reports
        await pg.goto(URL, wait_until='networkidle'); await pg.click('text=Get Started')
        await pg.click('nav [data-act="go:profile"]')
        await pg.click('text=Feedback and your reports'); await pg.wait_for_timeout(300)
        assert await pg.locator('#fb-title >> text=Your reports').count() == 1, 'profile opens Your reports'
        await shot('08-profile-mine')

        print('posts:', len(posts))
        print('errors:', errs)
        await b.close()
        assert not errs, errs

asyncio.run(main())
