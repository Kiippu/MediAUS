MediAUS - test on your home network
===================================

Prototype with sample data. Not for clinical use.


1. START IT ON THIS COMPUTER
   Double-click "Start MediAUS.bat".
   A window opens showing an address like  http://192.168.1.20:8080
   Keep that window open while testing. Close it to stop.

   If Windows Firewall asks about PowerShell, tick "Private networks"
   and click Allow.


2. OPEN IT ON A PHONE (same Wi-Fi as this computer)
   Type the address from the window into the phone's browser.


3. INSTALL IT AS AN APP

   iPhone / iPad (Safari):
     Tap Share, then "Add to Home Screen", then Add.

   Android (Chrome):
     Browsers only offer "Install app" on secure (https) sites.
     For testing on your own Wi-Fi, mark this address as trusted:
       a. In Chrome, open:  chrome://flags/#unsafely-treat-insecure-origin-as-secure
       b. In the box, type the address from step 1, e.g.  http://192.168.1.20:8080
       c. Set the option to Enabled, then tap Relaunch.
       d. Open the address again, tap the menu (three dots), then "Install app".

   This computer (Chrome or Edge):
     Open  http://localhost:8080  and click the install icon in the address bar.


SECURE LINK (recommended for Android)
   Double-click "Start MediAUS (HTTPS).bat" instead of the normal one.
   - First run downloads Cloudflare Tunnel (about 60 MB) into a "tools" folder.
   - After about 10 seconds it shows a link like
       https://some-random-words.trycloudflare.com
     and copies it to your clipboard.
   - Open that link on the phone. It works on any network, not just your Wi-Fi.
   - Android Chrome: menu (three dots) > Install app. No chrome://flags needed,
     and the app opens full-screen without the browser bar.
   - If you installed the app from the old http address, uninstall that one first.
   - Anyone who has the link can open the app while the window is open.
     The link changes every time you start it. Close the window to stop.

TESTING THE BARCODE SCANNER (Pro feature, has a demo mode)
   - The camera needs the secure https link (or localhost on this computer).
   - On this computer, open  http://localhost:8080/test-barcodes.html
     (or add /test-barcodes.html to the https link) to show sample barcodes.
   - On the phone: Home > Scan Barcode > Try the demo, allow the camera,
     and point it at a barcode on the laptop screen.
   - Android Chrome reads barcodes automatically. On iPhone, use
     "Simulate a scan" or "Enter barcode number".

IF THE PHONE CANNOT CONNECT
   - Make sure the phone is on the same Wi-Fi, not mobile data or a guest network.
   - Windows: Settings > Network & internet > Wi-Fi > your network,
     set "Network profile type" to Private.
   - If you clicked "Cancel" on the firewall prompt: Windows Security >
     Firewall & network protection > Allow an app through firewall >
     tick "Private" for Windows PowerShell.
   - The address can change if your router gives this computer a new one.
     Always use the address shown in the server window.


WHAT'S IN THIS FOLDER
   app\                The web app files (index.html, app.js, styles.css, icons)
   Start MediAUS.bat   Starts the server on your Wi-Fi (http)
   Start MediAUS (HTTPS).bat   Starts the server plus a secure https link
   https.ps1           The secure-link script
   serve.ps1           The server itself (built into Windows, nothing to install)
