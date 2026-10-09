const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

function fixture(t, layout) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-docs-examples-'));
  t.after(() => fs.rmSync(root, { recursive: true }));
  const docs = path.join(root, layout);
  const script = path.join(docs, 'scripts/generate-examples.js');
  fs.mkdirSync(path.dirname(script), { recursive: true });
  fs.copyFileSync(path.join(__dirname, '../docs/scripts/generate-examples.js'), script);
  const cwd = path.join(root, 'unrelated working directory');
  fs.mkdirSync(cwd);
  return {
    docs,
    write(relative, content = '') {
      const file = path.join(docs, relative);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, content);
    },
    run: () => spawnSync(process.execPath, [script], { cwd, encoding: 'utf8', timeout: 10000 })
  };
}

for (const layout of ['repository/docs', 'standalone app']) {
  test(`generates portable examples from ${layout} independently of the working directory`, t => {
    const { docs, write, run } = fixture(t, layout);
    const content = 'const App = () => <Button>复制 \\"example\\"</Button>;\nrender(<App />);\n';
    write('pages/components/button/examples/basic.tsx', content);
    write('pages/components/button/examples/index.tsx', 'not an example');
    write('pages/components/button/examples/.hidden.tsx', 'not an example');
    write('pages/components/button/examples/notes.md', 'not an example');
    write('pages/components/.hidden/examples/secret.tsx', 'not an example');
    write('pages/components/no-examples/index.tsx', 'not an example');
    write('pages/components/README.md', 'not a component');
    const result = run();
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stderr, '');
    const output = path.join(docs, 'public/examples');
    assert.deepEqual(fs.readdirSync(output), ['button-basic.json']);
    assert.deepEqual(JSON.parse(fs.readFileSync(path.join(output, 'button-basic.json'), 'utf8')), {
      component: 'button',
      name: 'basic',
      content
    });
  });
}

test('fails when the components directory is missing', t => {
  const { run } = fixture(t, 'repository/docs');
  const result = run();
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stderr, /Components directory not found/);
});

test('fails when an example cannot be read while still generating valid examples', t => {
  const { docs, write, run } = fixture(t, 'repository/docs');
  write('pages/components/button/examples/basic.tsx', 'render(<Button />);');
  fs.mkdirSync(path.join(docs, 'pages/components/button/examples/broken.tsx'));
  const result = run();
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stderr, /Error processing example file broken.tsx/);
  assert(fs.existsSync(path.join(docs, 'public/examples/button-basic.json')));
});

test('fails when a component examples directory cannot be read', t => {
  const { write, run } = fixture(t, 'repository/docs');
  write('pages/components/button/examples', 'not a directory');
  const result = run();
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stderr, /Error processing component button/);
});
