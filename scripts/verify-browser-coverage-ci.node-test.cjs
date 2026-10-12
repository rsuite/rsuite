const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');
const { verifyBrowserCoverage } = require('./verify-browser-coverage-ci.cjs');

function fixture(t, browser = 'chromium') {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-coverage-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const report = {
    '/src/component.tsx': {
      path: '/src/component.tsx',
      statementMap: {},
      fnMap: {},
      branchMap: {},
      s: { 0: 1 },
      f: { 0: 0 },
      b: { 0: [1, 0] }
    }
  };
  const files = [];
  for (const react of ['React18', 'React19', 'React19.3']) {
    for (const shard of [1, 2]) {
      const folder = path.join(directory, `browser-coverage-${browser}-${react}-${shard}`);
      fs.mkdirSync(folder);
      const file = path.join(folder, 'coverage-final.json');
      fs.writeFileSync(file, JSON.stringify(report));
      const clover = path.join(folder, 'clover.xml');
      fs.writeFileSync(
        clover,
        '<?xml version="1.0"?><coverage><project><file name="component.tsx"></file></project></coverage>'
      );
      files.push(file, clover);
    }
  }
  return { directory, files, report };
}

for (const browser of ['chromium', 'firefox']) {
  test(`accepts both report formats from all six ${browser} shards without overwriting files`, t => {
    const { directory, files } = fixture(t, browser);
    assert.deepEqual(verifyBrowserCoverage(directory, browser).sort(), files.sort());
  });
}

test('fails when a runtime shard is missing or an unexpected artifact is present', t => {
  const { directory, files } = fixture(t);
  const folder = path.dirname(files[0]);
  fs.renameSync(folder, `${folder}-unexpected`);
  assert.throws(() => verifyBrowserCoverage(directory, 'chromium'), /exactly both shards/);
  fs.rmSync(`${folder}-unexpected`, { recursive: true });
  assert.throws(() => verifyBrowserCoverage(directory, 'chromium'), /exactly both shards/);
});

test('fails for missing, malformed and empty reports', t => {
  const { directory, files } = fixture(t);
  fs.unlinkSync(files[0]);
  assert.throws(() => verifyBrowserCoverage(directory, 'chromium'), /ENOENT/);
  for (const body of ['not JSON', '{}', 'null', '[]', '{"source":{}}']) {
    fs.writeFileSync(files[0], body);
    assert.throws(() => verifyBrowserCoverage(directory, 'chromium'));
  }
});

test('requires a Clover report in the expected generated format alongside each Istanbul report', t => {
  const { directory, files } = fixture(t);
  const clover = files.find(file => file.endsWith('clover.xml'));
  fs.unlinkSync(clover);
  assert.throws(() => verifyBrowserCoverage(directory, 'chromium'), /ENOENT/);
  for (const body of [
    '',
    'not XML',
    '<?xml version="1.0"?><coverage>',
    '<?xml version="1.0"?><coverage></coverage>'
  ]) {
    fs.writeFileSync(clover, body);
    assert.throws(() => verifyBrowserCoverage(directory, 'chromium'), /Clover report/);
  }
});

test('rejects malformed statement, function and branch counters', t => {
  const { directory, files, report } = fixture(t);
  for (const field of ['s', 'f', 'b']) {
    for (const value of [-1, 0.5, '1', null]) {
      const invalid = structuredClone(report);
      invalid['/src/component.tsx'][field][0] = field === 'b' ? [value] : value;
      fs.writeFileSync(files[0], JSON.stringify(invalid));
      assert.throws(() => verifyBrowserCoverage(directory, 'chromium'), /invalid counts/);
    }
  }
  report['/src/component.tsx'].b[0] = 1;
  fs.writeFileSync(files[0], JSON.stringify(report));
  assert.throws(() => verifyBrowserCoverage(directory, 'chromium'), /invalid branch counts/);
});

test('CLI supplies exact filenames to the upload step and fails before output on invalid input', t => {
  const { directory, files } = fixture(t);
  const output = path.join(path.dirname(directory), `${path.basename(directory)}-output`);
  t.after(() => fs.rmSync(output, { force: true }));
  const run = () =>
    spawnSync(
      process.execPath,
      [path.join(__dirname, 'verify-browser-coverage-ci.cjs'), directory, 'chromium'],
      {
        env: { ...process.env, GITHUB_OUTPUT: output },
        encoding: 'utf8'
      }
    );
  assert.equal(run().status, 0);
  const written = fs.readFileSync(output, 'utf8');
  assert.deepEqual(written.trim().slice('files='.length).split(',').sort(), files.sort());
  fs.unlinkSync(files[0]);
  assert.notEqual(run().status, 0);
  assert.equal(fs.readFileSync(output, 'utf8'), written);
});
