const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { after, test } = require('node:test');
const ts = require('typescript');

const docs = path.resolve(__dirname, '../../docs');
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-docs-type-boundary-'));
const fixture = path.join(temporary, 'project [with spaces]');
const directory = path.join(fixture, 'public/react/types');
fs.mkdirSync(directory, { recursive: true });
const button = { name: 'Button', props: { appearance: { type: 'string' } } };
const index = { components: ['button', 'button-group'] };
for (const [name, value] of Object.entries({
  'button.json': button,
  'button-group.json': { name: 'ButtonGroup' },
  'index.json': index
})) {
  fs.writeFileSync(path.join(directory, name), JSON.stringify(value));
}
fs.writeFileSync(path.join(directory, 'malformed.json'), '{');
fs.writeFileSync(path.join(directory, '../outside.json'), JSON.stringify({ outside: true }));
const compiled = path.join(temporary, 'read-types-file.cjs');
const result = ts.transpileModule(
  fs.readFileSync(path.join(docs, 'utils/read-types-file.ts'), 'utf8'),
  {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    reportDiagnostics: true,
    fileName: 'read-types-file.ts'
  }
);
assert.equal(
  result.diagnostics.filter(value => value.category === ts.DiagnosticCategory.Error).length,
  0
);
fs.writeFileSync(compiled, result.outputText);
const { readTypesFile, readComponentTypesFile } = require(compiled);

after(() => fs.rmSync(temporary, { recursive: true, force: true }));

async function inDirectory(directory, action) {
  const previous = process.cwd();
  try {
    process.chdir(directory);
    return await action();
  } finally {
    process.chdir(previous);
  }
}

test('reads flat component files and the literal index from a real filesystem', async () => {
  await inDirectory(fixture, async () => {
    assert.deepEqual(await readTypesFile('button.json'), button);
    assert.deepEqual(await readTypesFile('index.json'), index);
    assert.deepEqual(await readComponentTypesFile('button-group'), { name: 'ButtonGroup' });
  });
});

for (const filename of [
  '../outside.json',
  '../types/../outside.json',
  'nested/../../outside.json'
]) {
  test('does not read a sibling JSON file through ' + filename, async () => {
    await inDirectory(fixture, async () => {
      assert.equal(await readTypesFile(filename), null);
    });
  });
}

test('component helper also rejects an escape from the type directory', async () => {
  await inDirectory(fixture, async () => {
    assert.equal(await readComponentTypesFile('../outside'), null);
  });
});

for (const filename of [
  '..\\outside.json',
  'button.json/../button.json',
  'button.json\0',
  '/button.json',
  'C:\\button.json'
]) {
  test('rejects a non-flat filename ' + JSON.stringify(filename), async t => {
    t.mock.method(console, 'error', () => {});
    await inDirectory(fixture, async () => {
      assert.equal(await readTypesFile(filename), null);
    });
  });
}

test('keeps null results for missing files and malformed JSON', async t => {
  t.mock.method(console, 'error', () => {});
  await inDirectory(fixture, async () => {
    assert.equal(await readTypesFile('missing.json'), null);
    assert.equal(await readTypesFile('malformed.json'), null);
  });
});

test('continues to load every checked-in generated type JSON file', async () => {
  const files = fs
    .readdirSync(path.join(docs, 'public/react/types'))
    .filter(name => name.endsWith('.json'));
  assert(files.length > 50, 'The compatibility corpus must contain real generated component files');
  await inDirectory(docs, async () => {
    for (const filename of files) {
      assert.notEqual(await readTypesFile(filename), null, filename);
    }
  });
});
