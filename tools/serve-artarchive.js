// Static server for the ARTARCHIVE site (lives outside this project on the Desktop).
// Usage: node tools/serve-artarchive.js [port]
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = '/Users/tunzy/Desktop/ARTARCHIVE';
const PORT = parseInt(process.argv[2] || process.env.PORT || '8900', 10);
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.json': 'application/json', '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

http.createServer((req, res) => {
  let p;
  try { p = decodeURIComponent((req.url || '/').split('?')[0]); } catch (e) { res.writeHead(400); res.end('Bad request'); return; }
  if (p === '/' || p.endsWith('/')) p += 'index.html';
  const file = path.normalize(path.join(ROOT, p));
  // Containment: require ROOT + separator (bare startsWith(ROOT) would also match
  // sibling dirs like ROOT + '-other'), and never serve dotfiles/.git.
  if (!(file === ROOT || file.startsWith(ROOT + path.sep)) ||
      path.relative(ROOT, file).split(path.sep).some((seg) => seg.startsWith('.'))) {
    res.writeHead(403); res.end('Forbidden'); return;
  }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => console.log(`ARTARCHIVE serving at http://localhost:${PORT}/`));
