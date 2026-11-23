# Runs the already-built React UI without npm or a Mac.
$previewRoot = Join-Path $PSScriptRoot 'dist'
if (-not (Test-Path -LiteralPath (Join-Path $previewRoot 'index.html'))) {
    throw 'Build the project first with npm install and npm run build.'
}
python -m http.server 8792 --bind 127.0.0.1 --directory $previewRoot
