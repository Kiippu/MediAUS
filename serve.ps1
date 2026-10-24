# MediAUS local network test server
# Serves the "app" folder to phones and tablets on the same Wi-Fi.
# No install needed: uses only what ships with Windows PowerShell 5.1+.
# Stop it by closing this window or pressing Ctrl+C.

param([int]$Port = 8080, [switch]$Quiet)

$ErrorActionPreference = 'Stop'
$root = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot 'app'))
$sep = [System.IO.Path]::DirectorySeparatorChar
if (-not $root.EndsWith([string]$sep)) { $root = $root + $sep }

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
Write-Host '  Keep this window open while testing. Close it to stop.' -ForegroundColor Yellow
Write-Host ''
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
      while ($true) {
        $line = $reader.ReadLine()
        if ($line -eq $null -or $line -eq '') { break }
      }

      $parts = $requestLine.Split(' ')
      $method = $parts[0]
      $rawPath = if ($parts.Length -gt 1) { $parts[1] } else { '/' }
      $headOnly = ($method -eq 'HEAD')

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
