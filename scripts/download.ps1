$wc = New-Object System.Net.WebClient
$wc.Headers.Add('User-Agent', 'RASTROHistoricalArchiveGame/1.0 (https://github.com/lukeetaah/RASTRO; lucas@rastro-game.org)')
$wc.Headers.Add('Accept', 'image/webp,image/jpeg,image/*,*/*')

$items = @(
  @{ Name = "obelisco_1936.jpg"; Url = "https://upload.wikimedia.org/wikipedia/commons/c/ca/Construccion_del_Obelisco_%28Buenos_Aires%29.jpg" },
  @{ Name = "solvay_1927.jpg"; Url = "https://upload.wikimedia.org/wikipedia/commons/6/6e/Solvay_conference_1927.jpg" },
  @{ Name = "apollo11_1969.jpg"; Url = "https://upload.wikimedia.org/wikipedia/commons/9/98/Aldrin_Apollo_11_original.jpg" },
  @{ Name = "berlin_1989.jpg"; Url = "https://upload.wikimedia.org/wikipedia/commons/5/5d/Berlinermauer.jpg" },
  @{ Name = "cordobazo_1969.jpg"; Url = "https://upload.wikimedia.org/wikipedia/commons/d/d3/Cordobazo_-_Marcha.jpg" },
  @{ Name = "lamoneda_1973.jpg"; Url = "https://upload.wikimedia.org/wikipedia/commons/4/47/Palacio_de_la_moneda_11_septiembre_1973.jpg" },
  @{ Name = "panama_1914.jpg"; Url = "https://upload.wikimedia.org/wikipedia/commons/0/07/Ancon_at_Miraflores_Locks_1914.jpg" },
  @{ Name = "centenario_1910.jpg"; Url = "https://upload.wikimedia.org/wikipedia/commons/f/f6/Cabildo_de_Buenos_Aires_-_1910.jpg" }
)

foreach ($item in $items) {
  $target = Join-Path "public\evidences" $item.Name
  Write-Host "Downloading $($item.Name) from $($item.Url)..."
  try {
    $wc.DownloadFile($item.Url, $target)
    $len = (Get-Item $target).Length
    Write-Host "SUCCESS: $($item.Name) -> $len bytes"
  } catch {
    Write-Host "FAILED: $($item.Name) -> $($_.Exception.Message)"
  }
}
