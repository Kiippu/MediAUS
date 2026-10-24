# MediAUS - secure (https) test link using a free Cloudflare quick tunnel.
# Starts the local server, then creates a temporary https address that works
# on any phone, on any network. Close this window to stop both.

$ErrorActionPreference = 'Stop'
$here = $PSScriptRoot
$tools = Join-Path $here 'tools'
$isWin = ($env:OS -eq 'Windows_NT')
$cfName = if ($isWin) { 'cloudflared.exe' } else { 'cloudflared' }
$cf = Join-Path $tools $cfName
$log = Join-Path $tools 'tunnel.log'
$server = $null
$tunnel = $null

function Read-Shared([string]$path) {
  if (-not (Test-Path -LiteralPath $path)) { return '' }
  try {
    $fs = [System.IO.File]::Open($path, 'Open', 'Read', 'ReadWrite')
    $sr = New-Object System.IO.StreamReader($fs)
    $text = $sr.ReadToEnd()
    $sr.Close()
    return $text
  } catch { return '' }
}

function Get-FreePort([int]$start) {
  for ($p = $start; $p -lt ($start + 20); $p++) {
    try {
      $l = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $p)
      $l.Start(); $l.Stop()
      return $p
    } catch { }
  }
  return 0
}

function Stop-All {
  foreach ($proc in @($tunnel, $server)) {
    if ($proc -and -not $proc.HasExited) { try { Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue } catch { } }
  }
}

Clear-Host
Write-Host ''
Write-Host '  MediAUS - secure test link' -ForegroundColor Cyan
Write-Host '  --------------------------'
Write-Host ''

try {
  # 1. Get Cloudflare Tunnel (once)
  if (-not (Test-Path -LiteralPath $cf)) {
    Write-Host '  First run: downloading Cloudflare Tunnel (about 60 MB, one time only)...'
    New-Item -ItemType Directory -Force -Path $tools | Out-Null
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $ProgressPreference = 'SilentlyContinue'
    $asset = if ($isWin) { 'cloudflared-windows-amd64.exe' } else { 'cloudflared-linux-amd64' }
    $tmp = "$cf.download"
    Invoke-WebRequest -UseBasicParsing -Uri "https://github.com/cloudflare/cloudflared/releases/latest/download/$asset" -OutFile $tmp
    Move-Item -Force -LiteralPath $tmp -Destination $cf
    if (-not $isWin) { chmod +x $cf }
    Write-Host '  Downloaded.' -ForegroundColor Green
    Write-Host ''
  }

  # 2. Start the local server quietly in this window
  $port = Get-FreePort 8080
  if ($port -eq 0) { throw 'No free port between 8080 and 8099.' }
  $hostExe = (Get-Process -Id $PID).Path
  $serveArgs = @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', ('"' + (Join-Path $here 'serve.ps1') + '"'), '-Port', "$port", '-Quiet')
  $server = Start-Process -FilePath $hostExe -ArgumentList $serveArgs -NoNewWindow -PassThru

  $ready = $false
  for ($i = 0; $i -lt 50; $i++) {
    try { $c = New-Object System.Net.Sockets.TcpClient('127.0.0.1', $port); $c.Close(); $ready = $true; break } catch { Start-Sleep -Milliseconds 200 }
  }
  if (-not $ready) { throw 'The local server did not start.' }
  Write-Host "  Local server running on port $port."

  # 3. Open the tunnel
  Write-Host '  Creating your secure link (this takes about 10 seconds)...'
  if (Test-Path -LiteralPath $log) { Remove-Item -LiteralPath $log -Force }
  $tunnelArgs = @('tunnel', '--no-autoupdate', '--url', "http://localhost:$port")
  $tunnel = Start-Process -FilePath $cf -ArgumentList $tunnelArgs -NoNewWindow -PassThru -RedirectStandardError $log -RedirectStandardOutput "$log.out"

  $url = $null
  for ($i = 0; $i -lt 120 -and -not $url; $i++) {
    Start-Sleep -Milliseconds 500
    if ($tunnel.HasExited) { break }
    $m = [regex]::Match((Read-Shared $log), 'https://[a-z0-9-]+\.trycloudflare\.com')
    if ($m.Success) { $url = $m.Value }
  }
  if (-not $url) {
    Write-Host ''
    Write-Host '  Could not create the secure link. Check this computer is online and try again.' -ForegroundColor Red
    Write-Host '  Last messages from Cloudflare Tunnel:' -ForegroundColor DarkGray
    ((Read-Shared $log) -split "`n" | Select-Object -Last 8) | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkGray }
    throw 'Tunnel failed.'
  }

  # Give the new address a moment to go live
  Start-Sleep -Seconds 5
  try { Set-Clipboard -Value $url } catch { }

  Write-Host ''
  Write-Host '  Your secure link:' -ForegroundColor White
  Write-Host ''
  Write-Host "      $url" -ForegroundColor Green
  Write-Host ''
  Write-Host '  It is copied to your clipboard. Send it to the phone (text or email),'
  Write-Host '  or open it on this computer and show a QR code:'
  Write-Host '    Chrome: click the share icon in the address bar > QR code'
  Write-Host '    Edge:   right-click the page > Create QR code for this page'
  Write-Host ''
  Write-Host '  On Android (Chrome): open the link, tap the menu (three dots) > Install app.'
  Write-Host '  On iPhone (Safari):  open the link, tap Share > Add to Home Screen.'
  Write-Host ''
  Write-Host '  Anyone with this link can open the app while this window is open.' -ForegroundColor Yellow
  Write-Host '  The link changes every time you start. Close this window to stop.' -ForegroundColor Yellow
  Write-Host ''

  if ($isWin) { try { Start-Process $url } catch { } }

  while (-not $tunnel.HasExited -and -not $server.HasExited) { Start-Sleep -Seconds 1 }
  Write-Host '  The link has stopped.' -ForegroundColor Yellow
}
catch {
  Write-Host ''
  Write-Host "  Problem: $($_.Exception.Message)" -ForegroundColor Red
}
finally {
  Stop-All
}
