$ErrorActionPreference = "Stop"

Write-Host "🚀 Compiling and deploying Orellie (Hostinger WordPress)..." -ForegroundColor Cyan

# Safely generate a unique branch name based on timestamp
$BranchName = "deploy-orellie-" + (Get-Date -Format "yyyyMMdd-HHmmss")

Write-Host "📦 Extracting cleanly isolated WordPress files..." -ForegroundColor Yellow
git subtree split --prefix=apps/orellie/content -b $BranchName

Write-Host "📡 Pushing directly to standalone deployment repository..." -ForegroundColor Yellow
# Using the exact GitHub repository you setup
git push https://github.com/roshan-auto/orellie.git "$BranchName`:main" --force

Write-Host "🧹 Cleaning up local deployment branches..." -ForegroundColor Yellow
git branch -D $BranchName

Write-Host "✅ Factory Output Pushed Successfully! Hostinger auto-deploy will now update the live site." -ForegroundColor Green
