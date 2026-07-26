const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname; // project root, contains /templates and /static

// Basic MIME type map based on file extension
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.jpg': 'image/jpeg',
};

const server = http.createServer((req, res) => {
  // Decode and normalize the URL to avoid ../ path traversal
  let requestPath = decodeURIComponent(req.url.split('?')[0]); // strips away query searches and percent-encoded characters from the URL

  // Serve index.html at the site root
  if (requestPath === '/') {
    requestPath = '/templates/index.html';
  }

  const safePath = path.normalize(requestPath).replace(/^(\.\.[\/\\])+/, ''); // for URL security
  const filePath = path.join(ROOT, safePath);

  // Prevent escaping the project root
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});