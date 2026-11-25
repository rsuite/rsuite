const assert = require('node:assert/strict');
const path = require('node:path');
const { test } = require('node:test');
const sass = require('sass');
const postcss = require('postcss');
const { plugins } = require('../../postcss.config.cjs');

test('PostCSS preserves theme line-height ratios without decimal truncation', async () => {
  const from = path.resolve(__dirname, '../../src/styles/_themes.scss');
  const { css } = sass.compile(from);
  const result = await postcss(plugins).process(css, { from });
  const declarations = {};
  result.root.walkDecls(declaration => {
    declarations[declaration.prop] = declaration.value;
  });

  const sizes = [
    ['xs', 12, 16],
    ['sm', 14, 20],
    ['md', 16, 24],
    ['lg', 18, 28],
    ['xl', 20, 28],
    ['2xl', 24, 32],
    ['3xl', 30, 36],
    ['4xl', 36, 40]
  ];
  for (const [size, fontSize, lineHeight] of sizes) {
    const ratio = Number(declarations[`--rs-text-line-height-${size}`]);
    assert.equal(ratio * fontSize, lineHeight, `${size} text line-height`);
  }
  assert.equal(Number(declarations['--rs-line-height-md']) * 14, 20);
});

test('PostCSS still simplifies calculations and removes redundant CSS', async () => {
  const result = await postcss(plugins).process(
    '/* comment */ .example { width: calc(100px + 20px); margin: 0px 0px; }',
    { from: undefined }
  );

  const declarations = {};
  result.root.walkDecls(declaration => {
    declarations[declaration.prop] = declaration.value;
  });
  assert.deepEqual(declarations, { margin: '0', width: '120px' });
  result.root.walkComments(() => assert.fail('Comments should still be removed'));
});
