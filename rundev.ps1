# Start Django
Write-Host "Starting Python environment..."
Set-Location "C:\Users\maxbo\Desktop\inventory_management\backend"  # Set the location
.venv/scripts/activate
Write-Host "Running migrations..."
Start-Process -NoNewWindow -FilePath "python" -ArgumentList "manage.py migrate"  # Start migration
Write-Host "Starting django dev server..."
Start-Process -FilePath "python" -ArgumentList "manage.py runserver"

# Start React
Write-Host "Installing npm packages if necessary..."
Set-Location "C:\Users\maxbo\Desktop\inventory_management\react"
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "i"
Write-Host "Starting react dev server..."
Start-Process -FilePath "npm" -ArgumentList "run dev"