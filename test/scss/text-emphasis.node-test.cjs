const assert = require('node:assert/strict');
const path = require('node:path');
const { test } = require('node:test');
const sass = require('sass');
const postcss = require('postcss');
const tinycolor = require('tinycolor2');

const loadPaths = [path.resolve(__dirname, '../../src/styles/mixins')];

function compile(selector, color = '#00f') {
  const warnings = [];
  const { css } = sass.compileString(
    `@use 'utilities' as utils;
     ${selector} { @include utils.text-emphasis-variant(${color}); }`,
    { loadPaths, logger: { warn: message => warnings.push(message), debug() {} } }
  );
  assert.deepEqual(warnings, [], 'Consumers should not receive Sass deprecation warnings');
  const rules = [];
  postcss.parse(css).walkRules(rule => {
    const colors = [];
    rule.walkDecls('color', declaration => colors.push(declaration.value));
    rules.push({ selectors: rule.selectors, colors });
  });
  return rules;
}

const selectors = [
  ['class', '.emphasis', ['a.emphasis']],
  ['nested class', '.theme .emphasis', ['.theme a.emphasis']],
  ['selector list', '.first, .second', ['a.first', 'a.second']],
  ['anchor', 'a.emphasis', ['a.emphasis']],
  ['child combinator', '.layout > .emphasis', ['.layout > a.emphasis']],
  ['attribute ancestor', '[data-theme] .emphasis', ['[data-theme] a.emphasis']],
  ['non-anchor element', 'span.emphasis', []],
  ['mixed element list', 'a.first, span.second', ['a.first']]
];

for (const [name, selector, anchors] of selectors) {
  test(`text emphasis compiles a ${name} and limits interactions to anchors`, () => {
    const rules = compile(selector);
    const interactions = rules.filter(rule => rule.selectors.some(s => /:(hover|focus)$/.test(s)));
    const actual = interactions.flatMap(rule => rule.selectors).sort();
    const expected = anchors.flatMap(anchor => [`${anchor}:hover`, `${anchor}:focus`]).sort();
    assert.deepEqual(actual, expected);
    const base = rules.filter(rule => !interactions.includes(rule));
    assert.deepEqual(
      base.flatMap(rule => rule.selectors).sort(),
      selector
        .split(',')
        .map(s => s.trim())
        .sort()
    );
    assert(base.every(rule => rule.colors.length === 1));
    assert(base.every(rule => tinycolor(rule.colors[0]).toHexString() === '#0000ff'));
    assert(interactions.every(rule => rule.colors.length === 1));
    assert(interactions.every(rule => tinycolor(rule.colors[0]).toHexString() === '#0000cc'));
  });
}

const colors = [
  ['blue', '#00f', { r: 0, g: 0, b: 204, a: 1 }],
  ['clamped dark color', '#001', { r: 0, g: 0, b: 0, a: 1 }],
  ['transparent color', 'transparent', { r: 0, g: 0, b: 0, a: 0 }],
  ['alpha color', 'rgba(0, 0, 255, 0.5)', { r: 0, g: 0, b: 204, a: 0.5 }],
  ['HSL color', 'hsl(120, 100%, 50%)', { r: 0, g: 204, b: 0, a: 1 }],
  ['white', '#fff', { r: 230, g: 230, b: 230, a: 1 }]
];

for (const [name, input, expected] of colors) {
  test(`text emphasis subtracts ten HSL lightness points from a ${name}`, () => {
    const rules = compile('.emphasis', input);
    const base = rules.find(rule => rule.selectors.includes('.emphasis'));
    assert.deepEqual(tinycolor(base.colors[0]).toRgb(), tinycolor(input).toRgb());
    const interactions = rules.filter(rule => rule !== base);
    assert(interactions.length > 0);
    for (const rule of interactions) {
      assert.equal(rule.colors.length, 1);
      assert.deepEqual(tinycolor(rule.colors[0]).toRgb(), expected);
    }
  });
}

test('the utilities module still compiles an existing unrelated mixin', () => {
  const { css } = sass.compileString(
    `@use 'utilities' as utils; .truncate { @include utils.ellipsis-basic; }`,
    { loadPaths }
  );
  const declarations = {};
  postcss.parse(css).walkDecls(decl => {
    declarations[decl.prop] = decl.value;
  });
  assert.deepEqual(declarations, {
    overflow: 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap'
  });
});
