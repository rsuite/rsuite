const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');
const { verifySSRCoverage } = require('./verify-ssr-coverage-ci.cjs');

function fixture(t) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-ssr-coverage-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  const report = {
    '/src/server.tsx': {
      path: '/src/server.tsx',
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
    const folder = path.join(directory, `server-coverage-${react}`);
    fs.mkdirSync(folder);
    const json = path.join(folder, 'coverage-final.json');
    const clover = path.join(folder, 'clover.xml');
    fs.writeFileSync(json, JSON.stringify(report));
    fs.writeFileSync(
      clover,
      '<?xml version="1.0"?><coverage><project><file name="server.tsx"></file></project></coverage>'
    );
    files.push(json, clover);
  }
  return { directory, files, report };
}

test('accepts both coverage formats from every SSR runtime', t => {
  const { directory, files } = fixture(t);
  assert.deepEqual(verifySSRCoverage(directory).sort(), files.sort());
});

test('rejects missing runtimes and unexpected artifacts', t => {
  const { directory, files } = fixture(t);
  const folder = path.dirname(files[0]);
  fs.renameSync(folder, folder + '-unexpected');
  assert.throws(() => verifySSRCoverage(directory), /exactly one SSR report/);
  fs.rmSync(folder + '-unexpected', { recursive: true });
  assert.throws(() => verifySSRCoverage(directory), /exactly one SSR report/);
});

test('rejects reports without executed statements, malformed counts and missing uncovered files', t => {
  const { directory, files, report } = fixture(t);
  const json = files.filter(file => file.endsWith('.json'));
  const invalid = structuredClone(report);
  invalid['/src/server.tsx'].s[0] = 0;
  fs.writeFileSync(json[0], JSON.stringify(invalid));
  assert.throws(() => verifySSRCoverage(directory), /no executed statements/);
  invalid['/src/server.tsx'].s[0] = -1;
  fs.writeFileSync(json[0], JSON.stringify(invalid));
  assert.throws(() => verifySSRCoverage(directory), /invalid counts/);
  const uncovered = structuredClone(report['/src/server.tsx']);
  uncovered.path = '/src/unloaded.tsx';
  uncovered.s = { 0: 0 };
  report[uncovered.path] = uncovered;
  for (const file of json) fs.writeFileSync(file, JSON.stringify(report));
  assert.equal(verifySSRCoverage(directory).length, 6);
  delete report[uncovered.path];
  fs.writeFileSync(json.at(-1), JSON.stringify(report));
  assert.throws(() => verifySSRCoverage(directory), /same source files/);
});

test('CLI exports exactly the validated files and leaves output unchanged after a report disappears', t => {
  const { directory, files } = fixture(t);
  const output = directory + '-output';
  t.after(() => fs.rmSync(output, { force: true }));
  const run = () =>
    spawnSync(process.execPath, [path.join(__dirname, 'verify-ssr-coverage-ci.cjs'), directory], {
      env: { ...process.env, GITHUB_OUTPUT: output },
      encoding: 'utf8'
    });
  assert.equal(run().status, 0);
  const written = fs.readFileSync(output, 'utf8');
  assert.deepEqual(written.trim().slice('files='.length).split(',').sort(), files.sort());
  fs.unlinkSync(files[0]);
  assert.notEqual(run().status, 0);
  assert.equal(fs.readFileSync(output, 'utf8'), written);
});
