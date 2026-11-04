import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const packageJson = JSON.parse(
  await readFile(new URL('../package.json', import.meta.url), 'utf8'),
);

test('development server defaults to loopback and LAN access is explicit', () => {
  assert.match(packageJson.scripts.dev, /--host 127\.0\.0\.1/);
  assert.match(packageJson.scripts['dev:host'], /--host 0\.0\.0\.0/);
});
