// Builds docs/index.html (the installable phone app) from index.html (the artifact page).
// Run: node build.js
const fs = require('fs');
const body = fs.readFileSync(__dirname + '/index.html', 'utf8');
const head = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#0e131b">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Polyrhythm">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}[hidden]{display:none!important}</style>
`;
const sw = `<script>if ('serviceWorker' in navigator) { const had = !!navigator.serviceWorker.controller; navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(r => r.update()); navigator.serviceWorker.addEventListener('controllerchange', () => { if (had) location.reload(); }); }</script>`;
// Move the page's <title>/<link>/<style> into <head>, the rest into <body>.
const split = body.indexOf('</style>') + '</style>'.length;
const html = head + body.slice(0, split) + '\n</head>\n<body>\n' + body.slice(split) + '\n' + sw + '\n</body>\n</html>\n';
fs.writeFileSync(__dirname + '/docs/index.html', html);
console.log('Wrote docs/index.html');
