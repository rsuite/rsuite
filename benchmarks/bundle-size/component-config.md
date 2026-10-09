# Component configuration bundle baseline

Button and the four Animation primitives use provider defaults and configuration without
formatting or parsing dates. Their shared configuration hook previously created both date
adapters unconditionally. A private configuration hook now serves these components, while the
existing `useCustom` hook retains its date methods, return shape and synchronous behavior.
Button's Ripple and SafeAnchor dependencies use the same configuration hook.

## Results

[component-config.json](./component-config.json) records actual built-package consumers before
and after the extraction, comparing main `5eb66116951b0cb30cf6e1baf4767be1583e3216` with the measured
configuration extraction at `bc919ff0a1f3f9da157440736109a90c8ff82c47`. Both checkouts
were rebuilt with the same physical dependencies and Node 22.22.3. The after commit precedes
this benchmark-only record update.
The recorded dependencies include **date-fns 4.1.0, Lodash 4.18.1, and esbuild 0.25.2**.
Values are JavaScript bytes, with React and ReactDOM external, ES2020 output, minification,
tree shaking, and gzip level 9. They exclude CSS and runtime timing.

| Consumer               | Before minified bytes | After minified bytes | Before gzip bytes | After gzip bytes |
| ---------------------- | --------------------: | -------------------: | ----------------: | ---------------: |
| Root Button            |               109,148 |               73,080 |            35,388 |           27,784 |
| Button subpath         |               109,158 |               73,094 |            35,310 |           27,767 |
| Root Fade              |                87,476 |               51,408 |            27,464 |           20,030 |
| Fade subpath           |                87,476 |               51,408 |            27,420 |           19,968 |
| Root Animation         |                92,636 |               56,563 |            29,411 |           21,931 |
| Animation subpath      |                92,646 |               56,573 |            29,400 |           21,890 |
| Root `Animation.Fade`  |                92,651 |               56,578 |            29,414 |           21,930 |
| Root DateInput         |               103,364 |              103,493 |            32,993 |           33,030 |
| DateInput subpath      |               103,374 |              103,503 |            32,999 |           33,043 |
| Root CustomProvider    |                55,640 |               55,640 |            22,040 |           22,040 |
| CustomProvider subpath |                55,652 |               55,652 |            22,012 |           22,012 |

The seven Button/Animation consumers retain approximately 7KB of date-fns locale code for the existing default
English locale. Date dependencies are **not zero**: provider locale and component locale contracts
remain intact. The date formatting and parsing implementations disappear from these bundles.
CustomProvider's consumer is unchanged; DateInput retains its date adapters and adds 129
minified bytes for the compatibility wrapper. Both controls are included in the JSON report.

## Reproduce

Run `npx gulp build` in each checkout with Node 22.22.3 and the recorded dependencies. With the recorded esbuild version installed, run this
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
  ['Button', 'Fade', 'Animation', 'DateInput', 'CustomProvider'].flatMap(name => [
    [`${name}-root`, `import { ${name} as imported } from 'rsuite'; export { imported };`],
    [`${name}-subpath`, `import imported from 'rsuite/${name}'; export { imported };`]
  ])
);
entries['Animation-Fade-root'] =
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
    mainFields: ['browser', 'module', 'main'],
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
