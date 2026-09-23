import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const app = express();
const port = process.env.PORT || 3001;
const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dataDirectory = path.join(projectRoot, 'server', 'data');
const resourcesFile = path.join(dataDirectory, 'resources.json');

const readResources = () => {
  if (!fs.existsSync(resourcesFile)) return { spreadsheets: [], dashboards: [] };
  return JSON.parse(fs.readFileSync(resourcesFile, 'utf8'));
};

const writeResources = (resources) => {
  fs.mkdirSync(dataDirectory, { recursive: true });
  fs.writeFileSync(resourcesFile, JSON.stringify(resources, null, 2));
};

app.use(express.json());
app.use((_request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/api/resources', (_request, response) => {
  response.json(readResources());
});

app.post('/api/resources', (request, response) => {
  const resources = readResources();
  const { kind, resource } = request.body;
  if (!resources[kind] || !resource) return response.status(400).json({ error: 'Invalid resource payload' });
  const savedResource = { ...resource, id: randomUUID() };
  resources[kind].unshift(savedResource);
  writeResources(resources);
  response.status(201).json(savedResource);
});

app.patch('/api/resources/:kind/:id', (request, response) => {
  const resources = readResources();
  const collection = resources[request.params.kind];
  const index = collection?.findIndex((item) => item.id === request.params.id);
  if (!collection || index === -1) return response.status(404).json({ error: 'Resource not found' });
  collection[index] = { ...collection[index], ...request.body };
  writeResources(resources);
  response.json(collection[index]);
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'first-mile-control-room' });
});

app.get('/api/summary', (_request, response) => {
  response.json({ pickups: 12480, dispatchRate: 96.8, exceptions: 18, hubsOnline: 42 });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(projectRoot, 'dist')));
  app.get('*', (_request, response) => {
    response.sendFile(path.join(projectRoot, 'dist', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`First Mile API listening on http://localhost:${port}`);
});
