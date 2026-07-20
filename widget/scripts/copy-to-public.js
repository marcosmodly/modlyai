// Copies the built widget UMD bundle into the main app's public/ folder,
// which is where it's actually served from (https://modlyai.tech/widget.js).
// Runs automatically after `npm run build` via the postbuild script in
// package.json, so a rebuild always reaches the file that's actually live,
// without a manual copy step that's easy to forget.

import { copyFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const source = resolve(__dirname, '..', 'dist', 'widget.umd.js');
const destination = resolve(__dirname, '..', '..', 'public', 'widget.js');

if (!existsSync(source)) {
  console.error(`[postbuild] Build output not found at ${source}. Skipping copy to public/.`);
  process.exit(1);
}

try {
  copyFileSync(source, destination);
  console.log(`[postbuild] Copied widget.umd.js -> ${destination}`);
  console.log('[postbuild] This is the file served at https://modlyai.tech/widget.js. Redeploy the main app to publish it.');
} catch (error) {
  console.error('[postbuild] Failed to copy widget build into public/:', error);
  process.exit(1);
}
