# MediAUS local network test server
# Serves the "app" folder to phones and tablets on the same Wi-Fi.
# No install needed: uses only what ships with Windows PowerShell 5.1+.
# Stop it by closing this window or pressing Ctrl+C.

param([int]$Port = 8080, [switch]$Quiet)

$ErrorActionPreference = 'Stop'
$root = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot 'app'))
$sep = [System.IO.Path]::DirectorySeparatorChar
if (-not $root.EndsWith([string]$sep)) { $root = $root + $sep }

# Feedback reports from the app's Feedback tab: one JSON line each. Outside app\ so it is never served.
$fbDir = Join-Path $PSScriptRoot 'feedback'
$fbFile = Join-Path $fbDir 'reports.jsonl'
$fbMax = 20000          # bytes per report
$fbPerMin = 10          # reports per minute from one address
$fbHits = @{}
$utf8 = New-Object System.Text.UTF8Encoding($false)

$mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.js' = 'text/javascript; charset=utf-8'
  '.css' = 'text/css; charset=utf-8'
  '.webmanifest' = 'application/manifest+json'
  '.json' = 'application/json'
  '.png' = 'image/png'
  '.svg' = 'image/svg+xml'
  '.ico' = 'image/x-icon'
  '.txt' = 'text/plain; charset=utf-8'
}

# Find a free port starting at $Port
$listener = $null
for ($p = $Port; $p -lt ($Port + 20); $p++) {
  try {
    $listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $p)
    $listener.Start()
    $Port = $p
    break
  } catch {
    $listener = $null
  }
}
if (-not $listener) {
  Write-Host "Could not open a port between $Port and $($Port + 19). Close other servers and try again." -ForegroundColor Red
  exit 1
}

# LAN addresses: adapters that have a default gateway (real Wi-Fi / Ethernet)
$ips = @()
try {
  $ips = Get-NetIPConfiguration -ErrorAction Stop |
    Where-Object { $_.IPv4DefaultGateway -ne $null -and $_.NetAdapter.Status -eq 'Up' } |
    ForEach-Object { $_.IPv4Address.IPAddress }
} catch { }
if (-not $ips -or $ips.Count -eq 0) {
  $ips = [System.Net.Dns]::GetHostAddresses([System.Net.Dns]::GetHostName()) |
    Where-Object { $_.AddressFamily -eq 'InterNetwork' -and -not $_.ToString().StartsWith('127.') -and -not $_.ToString().StartsWith('169.254.') } |
    ForEach-Object { $_.ToString() }
}

if (-not $Quiet) {
Clear-Host
Write-Host ''
Write-Host '  MediAUS test server is running' -ForegroundColor Cyan
Write-Host '  ------------------------------'
Write-Host ''
Write-Host '  On a phone or tablet on the SAME Wi-Fi, open:' -ForegroundColor White
foreach ($ip in $ips) { Write-Host "      http://$($ip):$Port" -ForegroundColor Green }
Write-Host ''
Write-Host "  On this computer:  http://localhost:$Port" -ForegroundColor White
Write-Host ''
Write-Host '  If Windows asks to allow PowerShell through the firewall, tick'
Write-Host '  "Private networks" and click Allow. See README.txt for install steps.'
Write-Host ''
Write-Host "  Feedback reports are saved to:  $fbFile" -ForegroundColor White
Write-Host ''
Write-Host '  Keep this window open while testing. Close it to stop.' -ForegroundColor Yellow
Write-Host ''
}

function Send-Json($stream, [int]$code, [string]$status, [string]$json) {
  Send-Response $stream $code $status 'application/json; charset=utf-8' ([System.Text.Encoding]::ASCII.GetBytes($json)) $false
}

# POST /api/feedback. The app sends ASCII-only JSON (non-ASCII as \uXXXX), so bytes = chars here.
function Save-Feedback($stream, $reader, $headers, [string]$remote) {
  $ip = $remote
  if ($headers['cf-connecting-ip']) { $ip = $headers['cf-connecting-ip'] }  # via the Cloudflare tunnel
  $ip = ($ip -replace '[^0-9A-Fa-f:.]', '')

  $now = [DateTime]::UtcNow
  $recent = @($fbHits[$ip] | Where-Object { $_ -gt $now.AddMinutes(-1) })
  if ($recent.Count -ge $fbPerMin) { Send-Json $stream 429 'Too Many Requests' '{"ok":false,"error":"too many reports, try again in a minute"}'; return }

  $len = 0
  [void][int]::TryParse([string]$headers['content-length'], [ref]$len)
  if ($len -le 0 -or $len -gt $fbMax) { Send-Json $stream 413 'Payload Too Large' '{"ok":false,"error":"empty or too large"}'; return }
  $buf = New-Object char[] $len
  $got = 0
  while ($got -lt $len) {
    $n = $reader.Read($buf, $got, $len - $got)
    if ($n -le 0) { break }
    $got += $n
  }
  $body = ([string]::new($buf, 0, $got)).Trim() -replace "[\r\n]+", ' '

  $r = $null
  try { $r = $body | ConvertFrom-Json } catch { $r = $null }
  $ok = $r -and ($r.id -match '^R-[0-9A-Za-z-]{6,40}$')
  if ($ok -and $r.type -eq 'problem') { $ok = [bool]$r.problem -and ([string]$r.problem.what).Trim().Length -gt 0 }
  elseif ($ok -and $r.type -eq 'request') { $ok = [bool]$r.request -and ([string]$r.request.name).Trim().Length -gt 0 }
  else { $ok = $false }
  if (-not $ok) { Send-Json $stream 400 'Bad Request' '{"ok":false,"error":"not a valid report"}'; return }

  if (-not (Test-Path -LiteralPath $fbDir)) { New-Item -ItemType Directory -Path $fbDir | Out-Null }
  $line = '{"received":"' + (Get-Date).ToString('o') + '","ip":"' + $ip + '","report":' + $body + '}'
  [System.IO.File]::AppendAllText($fbFile, $line + "`n", $utf8)
  $fbHits[$ip] = @($recent) + $now

  Send-Json $stream 200 'OK' ('{"ok":true,"id":"' + $r.id + '"}')
  if (-not $Quiet) { Write-Host ("  {0}  {1}  feedback {2} ({3})" -f (Get-Date -Format 'HH:mm:ss'), $ip, $r.id, $r.type) -ForegroundColor Cyan }
}

function Send-Response($stream, [int]$code, [string]$status, [string]$type, [byte[]]$body, [bool]$headOnly) {
  $header = "HTTP/1.1 $code $status`r`nContent-Type: $type`r`nContent-Length: $($body.Length)`r`nCache-Control: no-cache`r`nX-Content-Type-Options: nosniff`r`nConnection: close`r`n`r`n"
  $hb = [System.Text.Encoding]::ASCII.GetBytes($header)
  $stream.Write($hb, 0, $hb.Length)
  if (-not $headOnly -and $body.Length -gt 0) { $stream.Write($body, 0, $body.Length) }
  $stream.Flush()
}

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      # Browsers sometimes open idle "spare" connections; drop them quickly so real requests are not blocked.
      $waited = 0
      while ($client.Available -eq 0 -and $waited -lt 1500) { Start-Sleep -Milliseconds 10; $waited += 10 }
      if ($client.Available -eq 0) { continue }

      $client.ReceiveTimeout = 3000
      $stream = $client.GetStream()
      $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::ASCII, $false, 8192, $true)
      $requestLine = $reader.ReadLine()
      if (-not $requestLine) { continue }
      $headers = @{}
      while ($true) {
        $line = $reader.ReadLine()
        if ($line -eq $null -or $line -eq '') { break }
        $i = $line.IndexOf(':')
        if ($i -gt 0) { $headers[$line.Substring(0, $i).Trim().ToLower()] = $line.Substring($i + 1).Trim() }
      }

      $parts = $requestLine.Split(' ')
      $method = $parts[0]
      $rawPath = if ($parts.Length -gt 1) { $parts[1] } else { '/' }
      $headOnly = ($method -eq 'HEAD')

      if ($method -eq 'POST' -and ($rawPath -split '\?')[0].EndsWith('/api/feedback')) {
        Save-Feedback $stream $reader $headers $client.Client.RemoteEndPoint.Address.ToString()
        continue
      }

      if ($method -ne 'GET' -and $method -ne 'HEAD') {
        Send-Response $stream 405 'Method Not Allowed' 'text/plain' ([System.Text.Encoding]::ASCII.GetBytes('Method not allowed')) $false
        continue
      }

      $path = [System.Uri]::UnescapeDataString(($rawPath -split '\?')[0])
      if ($path.EndsWith('/')) { $path = $path + 'index.html' }
      $rel = $path.TrimStart('/').Replace('/', [string]$sep)
      $full = [System.IO.Path]::GetFullPath((Join-Path $root $rel))

      if (-not $full.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path -LiteralPath $full -PathType Leaf)) {
        Send-Response $stream 404 'Not Found' 'text/plain' ([System.Text.Encoding]::ASCII.GetBytes('Not found')) $headOnly
        if (-not $Quiet) { Write-Host ("  {0}  404  {1}" -f (Get-Date -Format 'HH:mm:ss'), $path) -ForegroundColor DarkGray }
        continue
      }

      $bytes = [System.IO.File]::ReadAllBytes($full)
      $ext = [System.IO.Path]::GetExtension($full).ToLower()
      $type = $mime[$ext]
      if (-not $type) { $type = 'application/octet-stream' }
      Send-Response $stream 200 'OK' $type $bytes $headOnly
      $who = $client.Client.RemoteEndPoint.Address.ToString()
      if (-not $Quiet) { Write-Host ("  {0}  {1}  {2}" -f (Get-Date -Format 'HH:mm:ss'), $who, $path) -ForegroundColor DarkGray }
    } catch {
      # ignore broken connections
    } finally {
      $client.Close()
    }
  }
} finally {
  $listener.Stop()
}
