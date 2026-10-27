# Needs FEATURES.scan = true in app/app.js (the scanner is hidden for the MVP).
import asyncio, os
SHOTS = os.path.join(os.path.dirname(__file__), 'shots')
CAM = os.path.join(os.path.dirname(__file__), 'fakecam.y4m')
from playwright.async_api import async_playwright


async def main():
    os.makedirs(SHOTS, exist_ok=True)
    async with async_playwright() as p:
        b = await p.chromium.launch(args=['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--use-file-for-fake-video-capture=' + CAM])
        ctx = await b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True, has_touch=True)
        await ctx.grant_permissions(['camera'], origin='http://localhost:8090')
        pg = await ctx.new_page()
        errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('http://localhost:8090/', wait_until='networkidle')
        print('BarcodeDetector available:', await pg.evaluate("'BarcodeDetector' in window"))
        await pg.click('text=Get Started')
        await pg.screenshot(path=SHOTS + '/s0-home.png')
        await pg.click('text=Scan Barcode'); await pg.screenshot(path=SHOTS + '/s1-locked.png')
        await pg.click('[data-act="demo"]'); await pg.wait_for_timeout(2500)
        await pg.screenshot(path=SHOTS + '/s2-live.png')
        playing = await pg.evaluate("(()=>{const v=document.getElementById('cam'); return v && v.srcObject ? v.videoWidth+'x'+v.videoHeight : 'no stream'})()")
        print('video:', playing)
        # auto-detect or simulate
        if await pg.query_selector('[data-act="scansim"]'):
            await pg.click('[data-act="scansim"]')
        else:
            await pg.wait_for_selector('[aria-label="Scan result"]', timeout=8000)
        await pg.wait_for_timeout(300); await pg.screenshot(path=SHOTS + '/s3-result.png')
        await pg.click('[data-act="scanagain"]'); await pg.wait_for_timeout(500)
        if await pg.query_selector('[aria-label="Scan result"]'):
            await pg.click('[data-act="scanagain"]')
        await pg.click('[data-act="scanmanual"]'); await pg.fill('#gtin', '1234567890128'); await pg.screenshot(path=SHOTS + '/s4-manual.png')
        await pg.click('[data-act="scansubmit"]'); await pg.wait_for_timeout(300); await pg.screenshot(path=SHOTS + '/s5-notfound.png')
        await pg.click('[data-act="scanagain"]'); await pg.click('[data-act="scanmanual"]'); await pg.click('[data-act="scancode:9300001020016"]')
        await pg.click('text=View medicine'); await pg.wait_for_timeout(300)
        print('after view:', await pg.evaluate('document.title'))
        tracks = await pg.evaluate("navigator.mediaDevices ? 'ok' : 'none'")
        await pg.go_back(); await pg.wait_for_timeout(1500)
        print('back to:', await pg.evaluate('document.title'))
        await pg.click('[data-act="back"]'); await pg.wait_for_timeout(300)
        print('closed to:', await pg.evaluate('document.title'))
        # amoxicillin interactions conflict tag
        await pg.click('[data-act="med:amoxicillin:cap"]'); await pg.click('[role=tab]:has-text("Interactions")')
        await pg.evaluate("document.getElementById('scroll').scrollTop=400"); await pg.screenshot(path=SHOTS + '/s6-conflict.png')
        print('errors:', errs)
        await b.close()

asyncio.run(main())
