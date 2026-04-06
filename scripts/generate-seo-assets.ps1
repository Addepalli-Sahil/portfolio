Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"

function New-Color([int]$r, [int]$g, [int]$b, [int]$a = 255) {
  return [System.Drawing.Color]::FromArgb($a, $r, $g, $b)
}

function New-RoundedRectanglePath {
  param(
    [double]$X,
    [double]$Y,
    [double]$Width,
    [double]$Height,
    [double]$Radius
  )

  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $diameter = [Math]::Min($Radius * 2, [Math]::Min($Width, $Height))

  $path.AddArc($X, $Y, $diameter, $diameter, 180, 90)
  $path.AddArc($X + $Width - $diameter, $Y, $diameter, $diameter, 270, 90)
  $path.AddArc($X + $Width - $diameter, $Y + $Height - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($X, $Y + $Height - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()

  return $path
}

function Draw-GlowCircle {
  param(
    [System.Drawing.Graphics]$Graphics,
    [int]$X,
    [int]$Y,
    [int]$Diameter,
    [System.Drawing.Color]$Color
  )

  $brush = New-Object System.Drawing.SolidBrush($Color)
  $Graphics.FillEllipse($brush, $X, $Y, $Diameter, $Diameter)
  $brush.Dispose()
}

function Draw-CoverImage {
  param(
    [System.Drawing.Graphics]$Graphics,
    [System.Drawing.Image]$Image,
    [System.Drawing.RectangleF]$Destination,
    [float]$Radius
  )

  $targetRatio = $Destination.Width / $Destination.Height
  $sourceRatio = $Image.Width / $Image.Height

  if ($sourceRatio -gt $targetRatio) {
    $sourceHeight = $Image.Height
    $sourceWidth = [int]([Math]::Round($Image.Height * $targetRatio))
    $sourceX = [int]([Math]::Round(($Image.Width - $sourceWidth) / 2))
    $sourceY = 0
  }
  else {
    $sourceWidth = $Image.Width
    $sourceHeight = [int]([Math]::Round($Image.Width / $targetRatio))
    $sourceX = 0
    $sourceY = [int]([Math]::Round(($Image.Height - $sourceHeight) / 2))
  }

  $sourceRect = [System.Drawing.Rectangle]::new($sourceX, $sourceY, $sourceWidth, $sourceHeight)
  $path = New-RoundedRectanglePath -X $Destination.X -Y $Destination.Y -Width $Destination.Width -Height $Destination.Height -Radius $Radius
  $state = $Graphics.Save()
  $Graphics.SetClip($path)
  $Graphics.DrawImage($Image, $Destination, $sourceRect, [System.Drawing.GraphicsUnit]::Pixel)
  $Graphics.Restore($state)
  $path.Dispose()
}

function Draw-Pill {
  param(
    [System.Drawing.Graphics]$Graphics,
    [string]$Text,
    [System.Drawing.Font]$Font,
    [System.Drawing.PointF]$Origin,
    [System.Drawing.Color]$TextColor,
    [System.Drawing.Color]$FillColor,
    [System.Drawing.Color]$StrokeColor
  )

  $size = $Graphics.MeasureString($Text, $Font)
  $width = [Math]::Ceiling($size.Width) + 28
  $height = 34
  $path = New-RoundedRectanglePath -X $Origin.X -Y $Origin.Y -Width $width -Height $height -Radius 17
  $fill = New-Object System.Drawing.SolidBrush($FillColor)
  $stroke = New-Object System.Drawing.Pen($StrokeColor, 1)
  $textBrush = New-Object System.Drawing.SolidBrush($TextColor)
  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Center
  $format.LineAlignment = [System.Drawing.StringAlignment]::Center

  $Graphics.FillPath($fill, $path)
  $Graphics.DrawPath($stroke, $path)
  $Graphics.DrawString(
    $Text,
    $Font,
    $textBrush,
    ([System.Drawing.RectangleF]::new([float]$Origin.X, [float]($Origin.Y - 1), [float]$width, [float]$height)),
    $format
  )

  $format.Dispose()
  $textBrush.Dispose()
  $stroke.Dispose()
  $fill.Dispose()
  $path.Dispose()

  return $width
}

function New-Canvas {
  param(
    [int]$Width,
    [int]$Height
  )

  $bitmap = New-Object System.Drawing.Bitmap($Width, $Height)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit

  return @{
    Bitmap = $bitmap
    Graphics = $graphics
  }
}

function Save-Png {
  param(
    [System.Drawing.Bitmap]$Bitmap,
    [string]$Path
  )

  $directory = Split-Path -Parent $Path
  if (-not (Test-Path -LiteralPath $directory)) {
    New-Item -ItemType Directory -Path $directory | Out-Null
  }
  $Bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
}

$root = Split-Path -Parent $PSScriptRoot
$publicDir = Join-Path $root "public"
$imagesDir = Join-Path $publicDir "images"
$photoPath = Join-Path $imagesDir "sahil-photo.jpeg"

if (-not (Test-Path -LiteralPath $photoPath)) {
  throw "Missing source photo at $photoPath"
}

$photo = [System.Drawing.Image]::FromFile($photoPath)

try {
  $ogCanvas = New-Canvas -Width 1200 -Height 630
  $ogBitmap = $ogCanvas.Bitmap
  $ogGraphics = $ogCanvas.Graphics

  $background = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    ([System.Drawing.Point]::new(0, 0)),
    ([System.Drawing.Point]::new(1200, 630)),
    (New-Color 8 17 29),
    (New-Color 3 6 13)
  )
  $ogGraphics.FillRectangle($background, 0, 0, 1200, 630)
  $background.Dispose()

  for ($x = 0; $x -lt 1200; $x += 56) {
    $pen = New-Object System.Drawing.Pen((New-Color 255 255 255 10), 1)
    $ogGraphics.DrawLine($pen, $x, 0, $x, 630)
    $pen.Dispose()
  }

  for ($y = 0; $y -lt 630; $y += 56) {
    $pen = New-Object System.Drawing.Pen((New-Color 255 255 255 8), 1)
    $ogGraphics.DrawLine($pen, 0, $y, 1200, $y)
    $pen.Dispose()
  }

  Draw-GlowCircle -Graphics $ogGraphics -X -60 -Y 60 -Diameter 360 -Color (New-Color 255 153 97 36)
  Draw-GlowCircle -Graphics $ogGraphics -X 820 -Y 260 -Diameter 300 -Color (New-Color 131 220 202 28)
  Draw-GlowCircle -Graphics $ogGraphics -X 540 -Y 120 -Diameter 220 -Color (New-Color 124 182 255 22)

  $photoCardPath = New-RoundedRectanglePath -X 790 -Y 44 -Width 350 -Height 542 -Radius 34
  $photoCardBrush = New-Object System.Drawing.SolidBrush((New-Color 10 18 30 232))
  $photoCardPen = New-Object System.Drawing.Pen((New-Color 255 255 255 30), 1)
  $ogGraphics.FillPath($photoCardBrush, $photoCardPath)
  $ogGraphics.DrawPath($photoCardPen, $photoCardPath)
  $photoCardBrush.Dispose()
  $photoCardPen.Dispose()

  Draw-CoverImage -Graphics $ogGraphics -Image $photo -Destination ([System.Drawing.RectangleF]::new(812, 66, 306, 400)) -Radius 26
  $photoFrame = New-RoundedRectanglePath -X 812 -Y 66 -Width 306 -Height 400 -Radius 26
  $photoFramePen = New-Object System.Drawing.Pen((New-Color 255 255 255 24), 1)
  $ogGraphics.DrawPath($photoFramePen, $photoFrame)
  $photoFramePen.Dispose()
  $photoFrame.Dispose()

  $labelFont = New-Object System.Drawing.Font("Segoe UI Semibold", 14, [System.Drawing.FontStyle]::Bold)
  $nameFont = New-Object System.Drawing.Font("Segoe UI", 19, [System.Drawing.FontStyle]::Bold)
  $headlineFont = New-Object System.Drawing.Font("Segoe UI", 46, [System.Drawing.FontStyle]::Bold)
  $bodyFont = New-Object System.Drawing.Font("Segoe UI", 18, [System.Drawing.FontStyle]::Regular)
  $pillFont = New-Object System.Drawing.Font("Segoe UI", 13, [System.Drawing.FontStyle]::Bold)

  $tealBrush = New-Object System.Drawing.SolidBrush((New-Color 131 220 202))
  $textBrush = New-Object System.Drawing.SolidBrush((New-Color 244 237 228))
  $mutedBrush = New-Object System.Drawing.SolidBrush((New-Color 191 181 169))
  $accentBrush = New-Object System.Drawing.SolidBrush((New-Color 255 215 173))

  $ogGraphics.DrawString("SAHIL ADDEPALLI", $labelFont, $tealBrush, 74, 84)
  $ogGraphics.DrawString("BTech Student and", $headlineFont, $textBrush, 70, 128)
  $ogGraphics.DrawString("Software Developer", $headlineFont, $textBrush, 70, 184)
  $ogGraphics.DrawString(
    "Building practical full-stack products, automation workflows, and cleaner software interfaces with real-world intent.",
    $bodyFont,
    $mutedBrush,
    ([System.Drawing.RectangleF]::new(74, 286, 620, 120))
  )

  $pillX = 74
  $pillY = 410
  foreach ($pill in @("Python", "React", "Flask", "Automation")) {
    $pillWidth = Draw-Pill `
      -Graphics $ogGraphics `
      -Text $pill `
      -Font $pillFont `
      -Origin ([System.Drawing.PointF]::new($pillX, $pillY)) `
      -TextColor (New-Color 255 215 173) `
      -FillColor (New-Color 255 255 255 14) `
      -StrokeColor (New-Color 255 255 255 28)
    $pillX += $pillWidth + 12
  }

  $ogGraphics.DrawString("addepalli-sahil.github.io/portfolio", $nameFont, $accentBrush, 74, 492)
  $ogGraphics.DrawString("Open to internships, collaboration, and engineering opportunities.", $bodyFont, $mutedBrush, 74, 530)

  $ogGraphics.DrawString("PROFILE", $labelFont, $mutedBrush, 824, 490)
  $ogGraphics.DrawString("Sahil Addepalli", $nameFont, $textBrush, 822, 516)
  $ogGraphics.DrawString("Python | React | Flask", $bodyFont, $mutedBrush, 822, 548)

  $labelFont.Dispose()
  $nameFont.Dispose()
  $headlineFont.Dispose()
  $bodyFont.Dispose()
  $pillFont.Dispose()
  $tealBrush.Dispose()
  $textBrush.Dispose()
  $mutedBrush.Dispose()
  $accentBrush.Dispose()
  $photoCardPath.Dispose()

  Save-Png -Bitmap $ogBitmap -Path (Join-Path $publicDir "og-image.png")
  $ogGraphics.Dispose()
  $ogBitmap.Dispose()

  foreach ($size in @(512, 192, 32)) {
    $iconCanvas = New-Canvas -Width $size -Height $size
    $iconBitmap = $iconCanvas.Bitmap
    $iconGraphics = $iconCanvas.Graphics

    $iconBackground = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
      ([System.Drawing.Point]::new(0, 0)),
      ([System.Drawing.Point]::new($size, $size)),
      (New-Color 10 19 32),
      (New-Color 3 7 14)
    )
    $iconGraphics.FillRectangle($iconBackground, 0, 0, $size, $size)
    $iconBackground.Dispose()

    Draw-GlowCircle -Graphics $iconGraphics -X (-0.2 * $size) -Y (-0.15 * $size) -Diameter ([int](0.7 * $size)) -Color (New-Color 255 153 97 42)
    Draw-GlowCircle -Graphics $iconGraphics -X ([int](0.45 * $size)) -Y ([int](0.5 * $size)) -Diameter ([int](0.55 * $size)) -Color (New-Color 131 220 202 30)

    $borderPath = New-RoundedRectanglePath -X 10 -Y 10 -Width ($size - 20) -Height ($size - 20) -Radius ([Math]::Max(18, $size * 0.24))
    $borderPen = New-Object System.Drawing.Pen((New-Color 255 255 255 28), [Math]::Max(1, [Math]::Round($size / 170.0, 2)))
    $iconGraphics.DrawPath($borderPen, $borderPath)
    $borderPen.Dispose()
    $borderPath.Dispose()

    $initialFontSize = if ($size -ge 512) { 180 } elseif ($size -ge 192) { 68 } else { 14 }
    $initialFont = New-Object System.Drawing.Font("Segoe UI", $initialFontSize, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $initialBrush = New-Object System.Drawing.SolidBrush((New-Color 255 215 173))
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $iconGraphics.DrawString("SA", $initialFont, $initialBrush, ([System.Drawing.RectangleF]::new(0, -4, $size, $size)), $format)

    $initialFont.Dispose()
    $initialBrush.Dispose()
    $format.Dispose()

    switch ($size) {
      512 { $output = "icon-512.png" }
      192 { $output = "icon-192.png" }
      default { $output = "favicon-32.png" }
    }

    Save-Png -Bitmap $iconBitmap -Path (Join-Path $publicDir $output)

    if ($size -eq 512) {
      Save-Png -Bitmap $iconBitmap -Path (Join-Path $publicDir "apple-touch-icon.png")
    }

    $iconGraphics.Dispose()
    $iconBitmap.Dispose()
  }
}
finally {
  $photo.Dispose()
}
