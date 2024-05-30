const { assert } = require('chai');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const flatten = require('lodash/flatten');
const { findResources } = require('../scripts/proxyDirectories');

const components = findResources({
  dir: path.join(__dirname, '../src'),
  ignores: ['styles', 'internals']
});

function getChildComponents() {
  const childComponents = [];

  components.forEach(item => {
    const buildJsonPath = path.join(__dirname, '../src', item, 'build.json');
    if (fs.existsSync(buildJsonPath)) {
      const buildJson = require(buildJsonPath);
      const { components, proxy = true } = buildJson;
      if (proxy && components) {
        childComponents.push(...Object.entries(components));
      }
    }
  });

  return childComponents;
}

/**
 * Flatten proxy resources to an array
 * @param {string[] | [name, path][] } options.resources - Resources to flatten
 * @param {string} options.path  - Path to the resources
 * @param {boolean} options.hasIndexFile - Whether the resource has an index file
 */
function flattenProxyResources(options) {
  const { resources = [], path = '', hasIndexFile = true } = options;

  return flatten(
    resources.map(res => {
      const [resName, proxyRes] = Array.isArray(res) ? res : [res, res];
      const filePath = hasIndexFile ? `${proxyRes}/index` : proxyRes;

      return [
        `lib${path}/${resName}/package.json`,
        `lib/cjs${path}/${filePath}.js`,
        `lib/esm${path}/${filePath}.js`,
        `lib/esm${path}/${filePath}.d.ts`,
        `lib/cjs${path}/${filePath}.d.ts`
      ];
    })
  );
}

const unstyledComponents = [
  'Schema',
  'DOMHelper',
  'Whisper',
  'SafeAnchor',
  'Affix',
  'internals',
  'CustomProvider',
  'locales',
  'MaskedInput'
];

const styledComponents = components.filter(
  i => !unstyledComponents.includes(i) && !/^use[A-Za-z]+/.test(i)
);

const locales = findResources({
  dir: path.join(__dirname, '../src/locales'),
  ignores: ['index'],
  isFile: true
});

const filesToEnsureExistence = [
  // Validate dist
  'lib/dist/rsuite.js',
  'lib/dist/rsuite.min.js',
  'lib/dist/rsuite.css',
  'lib/dist/rsuite.min.css',
  'lib/dist/rsuite-no-reset.css',
  'lib/dist/rsuite-no-reset.min.css',
  'lib/dist/rsuite-rtl.css',
  'lib/dist/rsuite-rtl.min.css',
  'lib/dist/rsuite-no-reset-rtl.css',
  'lib/dist/rsuite-no-reset-rtl.min.css',

  // Validate docs
  'lib/CHANGELOG.md',
  'lib/README.md',
  'lib/LICENSE',
  'lib/package.json',

  // Validate less
  'lib/styles/index.less',
  'lib/styles/plugins/palette.js', // See https://github.com/rsuite/rsuite/issues/1767
  ...styledComponents.map(i => `lib/${i}/styles/index.less`),

  // Validate components
  ...flattenProxyResources({ resources: components }),

  // Validate child components
  ...flattenProxyResources({
    resources: getChildComponents(),
    hasIndexFile: false
  }),

  // Validate locales
  ...flattenProxyResources({
    resources: locales,
    hasIndexFile: false,
    path: '/locales'
  })
];

it('Ensure file existence', () => {
  filesToEnsureExistence.forEach(function ensureFileExistence(filePath) {
    assert.isTrue(fs.existsSync(path.join(__dirname, `../${filePath}`)), `File ${filePath} exists`);
  });
});

it('Should enable Dark mode by default', () => {
  const css = fs.readFileSync(path.join(__dirname, '../lib/dist/rsuite.css'));
  assert.isTrue(/\.rs-theme-dark/.test(css), 'Dark mode styles are included');
});

it('Prepends the `use client` directive to components', () => {
  const libfiles = glob.sync('lib/{cjs,esm}/**/*.js');

  libfiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    assert.isTrue(content.startsWith(`'use client';`), `File ${file} has 'use client' directive`);
  });

  console.log(`  ✅ ${libfiles.length} .js files have been validated.`);
});

it('Should not include @/internals in d.ts files', () => {
  const dtsFiles = glob.sync('lib/{cjs,esm}/**/*.d.ts');

  dtsFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    assert.isFalse(/@\/internals/.test(content), `File ${file} does not include @/internals`);
  });

  console.log(`  ✅ ${dtsFiles.length} .d.ts files have been validated.`);
});
