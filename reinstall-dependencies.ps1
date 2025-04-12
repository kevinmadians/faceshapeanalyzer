# PowerShell script to reinstall dependencies after removing lovable-tagger

# Check if node_modules directory exists
Write-Host "Removing node_modules and package-lock.json..."
if (Test-Path -Path ".\node_modules") {
  Remove-Item -Recurse -Force ".\node_modules"
}

# Check if package-lock.json exists
if (Test-Path -Path ".\package-lock.json") {
  Remove-Item -Force ".\package-lock.json"
}

# Reinstall dependencies
Write-Host "Reinstalling dependencies..."
npm install --legacy-peer-deps

Write-Host "Dependencies reinstalled successfully without lovable-tagger!" -ForegroundColor Green 