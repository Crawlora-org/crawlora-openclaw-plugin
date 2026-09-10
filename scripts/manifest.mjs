import { readFileSync, writeFileSync } from 'node:fs';
const path = new URL('../openclaw.plugin.json', import.meta.url);
const manifest = JSON.parse(readFileSync(path, 'utf8'));
manifest.categories = ['web'];
manifest.uiHints = { apiKey: { label: 'Crawlora API key', sensitive: true, help: 'Use plugin config or CRAWLORA_API_KEY from the Gateway environment.' } };
writeFileSync(path, JSON.stringify(manifest, null, 2) + '\n');
