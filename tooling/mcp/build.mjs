import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { build } from 'esbuild';

const { dependencies } = JSON.parse(await readFile(new URL('./package.json', import.meta.url)));
const require = createRequire(import.meta.url);
const sdkEntry = require.resolve('@modelcontextprotocol/sdk/server/index.js');
const license = await readFile(resolve(dirname(sdkEntry), '../../../LICENSE'), 'utf8');

// Ship the stdio implementation without installing the SDK's HTTP adapters at runtime.
await build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node18',
  sourcemap: true,
  external: Object.keys(dependencies),
  banner: { js: '/*\n' + license.trim() + '\n*/' }
});
