$beats = @()

Get-ChildItem ".\BEATS" -File | ForEach-Object {

```
if ($_.Extension -eq ".wav" -or $_.Extension -eq ".mp3") {

    $productor = "Ale The Producer"

    if ($_.Name.StartsWith("TEST_")) {
        $productor = "Test"
    }

    $beats += [PSCustomObject]@{
        titulo    = $_.BaseName
        productor = $productor
        archivo   = "BEATS/$($_.Name)"
    }
}
```

}

$beats | ConvertTo-Json -Depth 3 | Set-Content "beats.json" -Encoding UTF8

Write-Host ""
Write-Host "======================="
Write-Host "beats.json generado"
Write-Host "======================="
Get-Content "beats.json"
Pause
