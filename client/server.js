import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();
const PORT = process.env.PORT || 5173;

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://194.163.173.37:8801',
    changeOrigin: true,
    secure: false,
    logLevel: 'debug' // remove after verification
  })
);
// Serve static files from the build/dist directory
app.use(express.static(path.join(dirname, 'dist')));

// Handle SPA routing: return index.html for all non-api routes
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Client server is running on port ${PORT}`);
});