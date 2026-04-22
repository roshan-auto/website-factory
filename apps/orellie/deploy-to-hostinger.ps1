$ErrorActionPreference = "Stop"

Write-Host "[Start] Compiling and deploying Orellie (Hostinger WordPress)..." -ForegroundColor Cyan

# Safely generate a unique branch name based on timestamp
$BranchName = "deploy-orellie-" + (Get-Date -Format "yyyyMMdd-HHmmss")

Write-Host "[1/3] Extracting cleanly isolated WordPress files..." -ForegroundColor Yellow
git subtree split --prefix=apps/orellie/content -b $BranchName

Write-Host "[2/3] Pushing directly to standalone deployment repository..." -ForegroundColor Yellow
git push https://github.com/roshan-auto/orellie.git "$BranchName`:main" --force

Write-Host "[3/3] Cleaning up local deployment branches..." -ForegroundColor Yellow
git branch -D $BranchName

Write-Host "[Done] Factory Output Pushed Successfully! Hostinger auto-deploy will now update the live site." -ForegroundColor Green
