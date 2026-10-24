import test from 'node:test';
import assert from 'node:assert/strict';
import { graphAssets, assetTotals } from './asset-report.mjs';
import { styleBuild } from './style-profiles.mjs';

const manifest = {
  'index.html': {
    file: 'entry.js',
    imports: ['shared', 'feature'],
    css: ['common.css'],
    dynamicImports: ['lazy']
  },
  shared: { file: 'shared.js', css: ['common.css'] },
  feature: { file: 'feature.js', imports: ['shared'] },
  lazy: { file: 'lazy.js', imports: ['shared'], css: ['lazy.css'] }
};
const artifacts = ['entry.js', 'shared.js', 'feature.js', 'common.css', 'lazy.js', 'lazy.css'].map(
  (file, i) => ({
    file,
    bytes: (i + 1) * 10,
    gzipBytes: i + 1,
    sha256: file
  })
);

test('static entry accounting deduplicates shared JavaScript and CSS and excludes lazy assets', () => {
  const files = graphAssets(manifest);
  assert.deepEqual(files, ['common.css', 'entry.js', 'feature.js', 'shared.js']);
  const total = assetTotals(files, artifacts);
  assert.equal(total.javascript.bytes, 60);
  assert.equal(total.css.bytes, 40);
  assert.deepEqual(total.javascriptAndCSS, { bytes: 100, gzipBytes: 10 });
});

test('reachable accounting includes on-demand chunks once and tolerates import cycles', () => {
  const graph = structuredClone(manifest);
  graph.shared.imports = ['feature'];
  const files = graphAssets(graph, 'index.html', true);
  assert.equal(files.length, 6);
  assert.deepEqual(assetTotals(files, artifacts).javascriptAndCSS, { bytes: 210, gzipBytes: 21 });
});

test('missing dependencies, unaccounted files and overwriting ordinary timing profiles are rejected', () => {
  assert.throws(
    () => graphAssets({ 'index.html': { file: 'entry.js', imports: ['missing'] } }),
    /Missing manifest/
  );
  assert.throws(() => assetTotals(['unknown.js'], artifacts), /Unaccounted asset/);
  assert.throws(
    () => styleBuild('/fixture', 'component', false),
    /ordinary timing builds stay full/
  );
  assert.throws(() => styleBuild('/fixture', '../outside', true), /Unknown picker style/);
});
