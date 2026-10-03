# ESM bundle size baseline

This baseline bundles the built RSuite package through its root and public component paths.
It records JavaScript bytes and gzip bytes, with React and ReactDOM external. It does not measure
runtime performance, include styles, or compare libraries. Results depend on the bundler, target,
consumer, dependency versions, and compression settings; these are recorded in the JSON report.

## useMediaQuery

[use-media-query.json](./use-media-query.json) records the breakpoint-module extraction from
commit `684e17d440c30223d29b17b504289fd8219e3fdd`, using esbuild 0.25.2 and gzip level 9.

| Import                                             | Before minified bytes | After minified bytes | Before gzip bytes | After gzip bytes |
| -------------------------------------------------- | --------------------: | -------------------: | ----------------: | ---------------: |
| `import { useMediaQuery } from 'rsuite'`           |                11,158 |                2,504 |             4,726 |            1,235 |
| `import useMediaQuery from 'rsuite/useMediaQuery'` |                11,169 |                2,512 |             4,738 |            1,241 |

Both resulting bundles retain zero bytes from Lodash. Previously, loading the breakpoint values
also loaded the CSS processor's CommonJS camelCase and kebabCase dependencies. The constant module
now has no runtime imports. The original responsive-module and styled-system exports remain
available; breakpoint values and query behavior are unchanged.

## Reproduce

Build each checkout with `npx gulp build`, then run this from its repository root with esbuild
0.25.2 installed. The temporary consumer resolves the package's `module` fields, including public
subpath proxies. Each export remains observable so the bundle cannot discard the hook itself.
Raw outputs and metafiles remain in the printed temporary directory for dependency attribution.
Only output inputs with positive `bytesInOutput` count as retained dependencies.

```js
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const zlib = require('node:zlib');
const esbuild = require('esbuild');
const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-bundle-size-'));
fs.mkdirSync(path.join(directory, 'node_modules'));
fs.symlinkSync(path.resolve('lib'), path.join(directory, 'node_modules/rsuite'), 'junction');
const entries = {
  root: "import { useMediaQuery as imported } from 'rsuite'; export { imported };",
  subpath: "import imported from 'rsuite/useMediaQuery'; export { imported };"
};
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
  const lodashBytes = retained
    .filter(([file]) => file.includes('/lodash/'))
    .reduce((total, [, input]) => total + input.bytesInOutput, 0);
  console.log(name, {
    bytes: output.length,
    gzipBytes: zlib.gzipSync(output, { level: 9 }).length,
    lodashBytes
  });
}
console.log(directory);
```

This is a local baseline, with no CI size threshold. Future reports can extend the same package
consumer method to additional components without changing their rendering contracts.
