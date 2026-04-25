# Ataz Dev Sync Utility
# Automates the staging, commitment, and pushing of site updates.

Write-Host "--- ATAZ LABS SYNC INITIATED ---" -ForegroundColor Green

# 1. Enforce Identity
git config user.name "atazdev"
git config user.email "atazdev@users.noreply.github.com"

# 2. Stage Changes
Write-Host "Staging changes..." -ForegroundColor Cyan
git add .

# 3. Check Status
$status = git status --porcelain
if (-not $status) {
    Write-Host "No changes to sync. System is up to date." -ForegroundColor Yellow
    exit
}

# 4. Commit
$msg = Read-Host "Enter commit message (Leave blank for 'Optimization & Content Update')"
if (-not $msg) { $msg = "Optimization & Content Update" }

Write-Host "Committing: $msg" -ForegroundColor Cyan
git commit -m "$msg"

# 5. Push
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push

Write-Host "--- SYNC COMPLETE ---" -ForegroundColor Green
