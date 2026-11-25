const assert = require('node:assert/strict');
const path = require('node:path');
const { test } = require('node:test');
const sass = require('sass');
const postcss = require('postcss');
const pruneRuntimeColors = require('../../scripts/postcss-prune-runtime-colors.cjs');

const spectrum = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];
const tokens = new Set([
  ...spectrum.map(color => `--rs-color-${color}`),
  ...[...spectrum, 'gray'].flatMap(color =>
    [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => `--rs-${color}-${shade}`)
  )
]);

function palette(root) {
  const declarations = [];
  root.walkDecls(declaration => {
    if (tokens.has(declaration.prop)) {
      declarations.push([
        declaration.parent.selector,
        declaration.prop,
        declaration.value,
        declaration.important
      ]);
    }
  });
  return declarations;
}

for (const component of ['Box', 'Text', 'Button']) {
  test(`${component} optimization preserves the public runtime palette in every theme`, async () => {
    const from = path.resolve(__dirname, '../../src', component, 'styles/index.scss');
    const { css } = sass.compile(from);
    const original = postcss.parse(css);
    const optimized = await postcss([pruneRuntimeColors()]).process(css, { from });

    assert.deepEqual(palette(optimized.root), palette(original));
    assert.equal(palette(original).length, tokens.size * 3);
    assert(optimized.css.length < css.length, 'Other unused variables should still be removed');
    const styleDeclarations = root => {
      const declarations = [];
      root.walkDecls(declaration => {
        if (!declaration.prop.startsWith('--')) {
          declarations.push([declaration.parent.selector, declaration.prop, declaration.value]);
        }
      });
      return declarations;
    };
    assert.deepEqual(styleDeclarations(optimized.root), styleDeclarations(original));
  });
}

test('runtime colors retain transitive dependencies and theme overrides, without unrelated variables', async () => {
  const css = `
    :root { --source: #123456; --rs-color-red: var(--source); --unused: #fff; }
    .dark { --source: #abcdef; --rs-color-red: var(--source); --unused: #000; }
    .consumer { display: block; }
  `;
  const result = await postcss([pruneRuntimeColors()]).process(css, { from: undefined });
  const declarations = [];
  result.root.walkDecls(declaration => declarations.push([declaration.prop, declaration.value]));
  assert.deepEqual(declarations, [
    ['--source', '#123456'],
    ['--rs-color-red', 'var(--source)'],
    ['--source', '#abcdef'],
    ['--rs-color-red', 'var(--source)'],
    ['display', 'block']
  ]);
});

test('runtime preservation is limited to supported presets and shades', async () => {
  const css = `:root {
    --rs-color-red: #123456;
    --rs-gray-50: #abcdef;
    --rs-gray-500: #999;
    --rs-gray-0: #fff;
    --rs-red-75: #f00;
    --rs-color-custom: #0f0;
    --unrelated: #00f;
  }`;
  const result = await postcss([pruneRuntimeColors()]).process(css, { from: undefined });
  const properties = [];
  result.root.walkDecls(declaration => properties.push(declaration.prop));
  assert.deepEqual(properties, ['--rs-color-red', '--rs-gray-50', '--rs-gray-500']);
  assert(!result.css.includes('color: var('), 'Temporary references should always be removed');
});
