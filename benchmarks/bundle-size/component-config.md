# Component configuration bundle baseline

Button and the four Animation primitives use provider defaults and configuration without
formatting or parsing dates. Their shared configuration hook previously created both date
adapters unconditionally. A private configuration hook now serves these components, while the
existing `useCustom` hook retains its date methods, return shape and synchronous behavior.
Button's Ripple and SafeAnchor dependencies use the same configuration hook.

## Results

[component-config.json](./component-config.json) records actual built-package consumers before
and after the extraction, based on `684e17d440c30223d29b17b504289fd8219e3fdd`.
The recorded dependencies include **date-fns 4.1.0, Lodash 4.17.21, and esbuild 0.25.2**.
Values are JavaScript bytes, with React and ReactDOM external, ES2020 output, minification,
tree shaking, and gzip level 9. They exclude CSS and runtime timing.

| Consumer              | Before minified bytes | After minified bytes | Before gzip bytes | After gzip bytes |
| --------------------- | --------------------: | -------------------: | ----------------: | ---------------: |
| Root Button           |               108,942 |               72,874 |            35,325 |           27,719 |
| Button subpath        |               108,952 |               72,888 |            35,245 |           27,692 |
| Root Fade             |                87,270 |               51,202 |            27,404 |           19,965 |
| Fade subpath          |                87,270 |               51,202 |            27,368 |           19,910 |
| Root Animation        |                92,430 |               56,357 |            29,337 |           21,862 |
| Animation subpath     |                92,440 |               56,367 |            29,352 |           21,832 |
| Root `Animation.Fade` |                92,445 |               56,372 |            29,352 |           21,869 |

These consumers retain approximately 7KB of date-fns locale code for the existing default
English locale. Date dependencies are **not zero**: provider locale and component locale contracts
remain intact. The date formatting and parsing implementations disappear from these bundles.
CustomProvider's consumer is unchanged; DateInput retains its date adapters and adds 129
minified bytes for the compatibility wrapper. Both controls are included in the JSON report.

## Reproduce

Run `npx gulp build` in each checkout. With the recorded esbuild version installed, run this
from the repository root. It creates a temporary consumer that resolves the built package's
root and public subpath `module` fields, retaining the exported component as observable output.
Raw JavaScript and metafiles remain in the printed directory. Dependency attribution uses
positive output `bytesInOutput`, rather than counting every module the bundler loaded.

```js
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const zlib = require('node:zlib');
const esbuild = require('esbuild');
const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-component-size-'));
fs.mkdirSync(path.join(directory, 'node_modules'));
fs.symlinkSync(path.resolve('lib'), path.join(directory, 'node_modules/rsuite'), 'junction');
const entries = Object.fromEntries(
  ['Button', 'Fade', 'Animation'].flatMap(name => [
    [`${name}-root`, `import { ${name} as imported } from 'rsuite'; export { imported };`],
    [`${name}-subpath`, `import imported from 'rsuite/${name}'; export { imported };`]
  ])
);
entries['Fade-namespace-root'] =
  "import { Animation } from 'rsuite'; export const imported = Animation.Fade;";
for (const [name, source] of Object.entries(entries)) {
  const entry = path.join(directory, `${name}.js`);
  fs.writeFileSync(entry, source);
  const result = esbuild.buildSync({
    entryPoints: [entry],
    outfile: path.join(directory, `${name}.bundle.js`),
    bundle: true,
    minify: true,
    treeShaking: true,
    platform: 'browser',
    format: 'esm',
    target: ['es2020'],
    external: ['react', 'react/*', 'react-dom', 'react-dom/*'],
    define: { 'process.env.NODE_ENV': '"production"', __DEV__: 'false' },
    metafile: true,
    sourcemap: false,
    legalComments: 'none',
    write: false
  });
  const output = result.outputFiles[0].contents;
  fs.writeFileSync(path.join(directory, `${name}.bundle.js`), output);
  fs.writeFileSync(path.join(directory, `${name}.metafile.json`), JSON.stringify(result.metafile));
  const retained = Object.entries(Object.values(result.metafile.outputs)[0].inputs);
  const dateFnsBytes = retained
    .filter(([file]) => file.includes('/date-fns/'))
    .reduce((total, [, input]) => total + input.bytesInOutput, 0);
  console.log(name, {
    bytes: output.length,
    gzipBytes: zlib.gzipSync(output, { level: 9 }).length,
    dateFnsBytes
  });
}
console.log(directory);
```

Results depend on consumer code, dependency versions, bundler configuration and compression.
The report records source and output hashes; it is a reproducible local baseline with no CI
size threshold or claim about runtime performance. Rebuild before every comparison.
