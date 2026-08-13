Add-Type -AssemblyName System.Drawing

$inputPath = "app/images/logo/placex logo.png"
$outputPath = "public/images/logo/placex-logo.png"

$bmp = New-Object System.Drawing.Bitmap($inputPath)

$minX = $bmp.Width
$maxX = 0
$minY = $bmp.Height
$maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.A -gt 10) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
$bmp.Dispose()

Write-Host "Bounding box: minX=$minX maxX=$maxX minY=$minY maxY=$maxY"
$cropW = $maxX - $minX + 1
$cropH = $maxY - $minY + 1
Write-Host "Cropped dimensions: $cropW x $cropH"

$src = [System.Drawing.Image]::FromFile($inputPath)
$rect = New-Object System.Drawing.Rectangle($minX, $minY, $cropW, $cropH)
$cropped = $src.Clone($rect, $src.PixelFormat)
$src.Dispose()

$cropped.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Save("public/favicon.ico", [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Save("app/icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Dispose()

Write-Host "Successfully cropped transparent borders!"
