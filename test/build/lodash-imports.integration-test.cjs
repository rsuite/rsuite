const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

const projectRoot = path.resolve(__dirname, '../..');
const lodashRoot = path.dirname(require.resolve('lodash/package.json'));
const expectedModules = {
  'CheckTree/utils.ts': ['lodash/isNil', 'lodash/isUndefined'],
  'List/helper/useManager.ts': ['lodash/flatten'],
  'internals/Picker/PickerToggle.tsx': ['lodash/isNil', 'lodash/omit', 'lodash/pick'],
  'internals/utils/getDataGroupBy.ts': ['lodash/groupBy']
};

// Load the actual compiler and project config, while resolving Lodash from the child's
// physical dependency directory. A node_modules symlink would hide the original bug.
const transform = `
const path = require('node:path');
const projectRoot = process.argv[1];
const babel = require(require.resolve('@babel/core', { paths: [projectRoot] }));
const config = require(path.join(projectRoot, 'babel.config.js'));
const files = JSON.parse(process.argv[2]);
const results = {};
for (const format of ['cjs', 'esm']) {
  for (const file of files) {
    const result = babel.transformFileSync(path.join(projectRoot, 'src', file), {
      ...config(null, { NODE_ENV: format === 'esm' ? 'esm' : 'production' }),
      cwd: projectRoot,
      configFile: false,
      babelrc: false,
      ast: true
    });
    const modules = new Set();
    function collect(value) {
      if (value === 'lodash' || value.startsWith('lodash/')) modules.add(value);
    }
    babel.traverse(result.ast, {
      ImportDeclaration(p) { collect(p.node.source.value); },
      CallExpression(p) {
        if (p.node.callee.type === 'Identifier' && p.node.callee.name === 'require' &&
            p.node.arguments.length === 1 && p.node.arguments[0].type === 'StringLiteral') {
          collect(p.node.arguments[0].value);
        }
      }
    });
    results[format + '/' + file] = [...modules].sort();
  }
}
process.stdout.write(JSON.stringify(results));
`;

for (const directory of ['project with spaces', 'project[fixture]', 'project{one,two}']) {
  test(`Lodash imports compile with physical dependencies in ${directory}`, () => {
    const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-lodash-imports-'));
    const fixtureRoot = path.join(temporary, directory);
    const dependencyRoot = path.join(fixtureRoot, 'node_modules/lodash');
    try {
      fs.mkdirSync(path.dirname(dependencyRoot), { recursive: true });
      fs.cpSync(lodashRoot, dependencyRoot, { recursive: true });
      assert.equal(fs.lstatSync(dependencyRoot).isSymbolicLink(), false);
      const result = spawnSync(
        process.execPath,
        ['-e', transform, projectRoot, JSON.stringify(Object.keys(expectedModules))],
        { cwd: fixtureRoot, encoding: 'utf8', timeout: 30000 }
      );
      assert.ifError(result.error);
      assert.equal(result.status, 0, result.stdout + result.stderr);
      const actual = JSON.parse(result.stdout);
      const expected = {};
      for (const format of ['cjs', 'esm']) {
        for (const [file, modules] of Object.entries(expectedModules)) {
          expected[`${format}/${file}`] = modules;
        }
      }
      assert.deepEqual(actual, expected);
    } finally {
      fs.rmSync(temporary, { recursive: true, force: true });
    }
  });
}
