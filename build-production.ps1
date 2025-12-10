# Imbari Coffee - Production Build & Deployment Script
# Run this before uploading to Namecheap Stellar Hosting

Write-Host "🚀 Building Imbari Coffee for Production..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean previous build
Write-Host "🧹 Cleaning previous build..." -ForegroundColor Yellow
if (Test-Path "out") {
    Remove-Item -Path "out" -Recurse -Force
    Write-Host "✅ Removed old 'out' directory" -ForegroundColor Green
}

# Step 2: Set production environment
Write-Host ""
Write-Host "🔧 Setting production environment..." -ForegroundColor Yellow
$env:NEXT_PUBLIC_BASE_PATH = ""
$env:NODE_ENV = "production"
Write-Host "✅ Environment configured for custom domain" -ForegroundColor Green

# Step 3: Run build
Write-Host ""
Write-Host "📦 Building static site..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build completed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Step 4: Copy additional files to out/
Write-Host ""
Write-Host "📋 Copying additional files..." -ForegroundColor Yellow

# Copy .htaccess
Copy-Item -Path ".htaccess-production" -Destination "out/.htaccess" -Force
Write-Host "✅ Copied .htaccess" -ForegroundColor Green

# Copy sitemap.xml
Copy-Item -Path "sitemap.xml" -Destination "out/sitemap.xml" -Force
Write-Host "✅ Copied sitemap.xml" -ForegroundColor Green

# Copy robots.txt
Copy-Item -Path "robots.txt" -Destination "out/robots.txt" -Force
Write-Host "✅ Copied robots.txt" -ForegroundColor Green

# Step 5: Verify build output
Write-Host ""
Write-Host "🔍 Build Output Summary:" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan

$outSize = (Get-ChildItem -Path "out" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host "📦 Total Size: $([math]::Round($outSize, 2)) MB" -ForegroundColor White

$htmlFiles = (Get-ChildItem -Path "out" -Filter "*.html" -Recurse).Count
Write-Host "📄 HTML Files: $htmlFiles" -ForegroundColor White

$imageFiles = (Get-ChildItem -Path "out/images" -Filter "*.jpg" -ErrorAction SilentlyContinue).Count
Write-Host "🖼️  Images: $imageFiles" -ForegroundColor White

Write-Host ""
Write-Host "✨ Production build ready for upload!" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Files to upload are in: $PWD\out\" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Log in to cPanel at your Stellar Hosting server" -ForegroundColor White
Write-Host "2. Open File Manager and navigate to /public_html/" -ForegroundColor White
Write-Host "3. Delete default files in /public_html/" -ForegroundColor White
Write-Host "4. Upload ALL contents from 'out' folder" -ForegroundColor White
Write-Host "5. Visit https://imbaricoffee.com to verify" -ForegroundColor White
Write-Host ""
Write-Host "OR use FTP:" -ForegroundColor Yellow
Write-Host "ftp://ftp.imbaricoffee.com" -ForegroundColor White
Write-Host "Upload all files from 'out' to '/public_html/'" -ForegroundColor White
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
