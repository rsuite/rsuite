import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import readline from 'node:readline';
import { assertBuildState } from '../runner/build-state.mjs';
const root = path.resolve(import.meta.dirname, '..'),
  output = path.resolve(
    process.argv[2] ?? path.join(root, 'results', 'runtime-controls-' + Date.now())
  );
assert(process.argv.length <= 3, 'Usage: node checks/runtime-mutations.mjs [output-directory]');
assert(
  !fs.existsSync(output) || fs.readdirSync(output).length === 0,
  'Output must be new or empty; inspect prior journals before retrying'
);
fs.mkdirSync(output, { recursive: true });
const built = JSON.parse(fs.readFileSync(root + '/dist/build-inputs.json'));
assertBuildState(root, built);
const sha = b => crypto.createHash('sha256').update(b).digest('hex');
const controls = [
  {
    name: 'source',
    file: 'src/virtual/domain.ts',
    text: '\n// controlled mid-run source mutation\n',
    error: 'Stale source/config/candidate build'
  },
  {
    name: 'sdk',
    file: '../../lib/package.json',
    text: '\n',
    error: 'Stale source/config/candidate build'
  },
  {
    name: 'installed-package',
    file: 'node_modules/@tanstack/react-virtual/package.json',
    text: '\n',
    error: 'Stale installed dependency build'
  },
  {
    name: 'served-artifact',
    file: 'dist/antd/virtual.html',
    text: '\n<!-- controlled mid-run response mutation -->\n'
  }
];
const ownedRoot = fs.realpathSync(path.resolve(root, '../..'));
for (const control of controls) {
  const relative = path.relative(ownedRoot, fs.realpathSync(path.resolve(root, control.file)));
  assert(
    relative &&
      relative !== '..' &&
      !relative.startsWith('..' + path.sep) &&
      !path.isAbsolute(relative),
    'Mutation target resolves outside this owned repository'
  );
}
const results = [];
let active;
function restore() {
  if (!active?.mutated) return;
  const current = fs.readFileSync(active.file);
  assert(
    current.equals(active.changed) || current.equals(active.original),
    'Target changed externally; original backup retained, refusing to overwrite'
  );
  fs.writeFileSync(active.file, active.original);
  assert(fs.readFileSync(active.file).equals(active.original));
  active.mutated = false;
  active.journal.phase = 'restored';
  fs.writeFileSync(active.journalFile, JSON.stringify(active.journal, null, 2) + '\n');
}
for (const signal of ['SIGINT', 'SIGTERM'])
  process.once(signal, () => {
    active?.child?.kill(signal);
    try {
      restore();
    } finally {
      process.exit(signal === 'SIGINT' ? 130 : 143);
    }
  });
try {
  for (const control of controls) {
    const folder = path.join(output, control.name);
    fs.mkdirSync(folder, { recursive: true });
    const file = path.resolve(root, control.file),
      original = fs.readFileSync(file),
      changed = Buffer.concat([original, Buffer.from(control.text)]),
      journalFile = path.join(folder, 'journal.json');
    fs.writeFileSync(path.join(folder, 'original.bin'), original);
    const journal = {
      name: control.name,
      file,
      originalSHA256: sha(original),
      mutatedSHA256: sha(changed),
      phase: 'prepared',
      backup: path.join(folder, 'original.bin')
    };
    fs.writeFileSync(journalFile, JSON.stringify(journal, null, 2) + '\n');
    const reportFile = path.join(folder, 'report.json'),
      args = [
        'run.mjs',
        '--skip-build',
        '--workflow',
        'virtual',
        '--browser',
        'chromium',
        '--output',
        reportFile
      ],
      child = spawn(process.execPath, args, { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] }),
      done = new Promise((resolve, reject) => {
        child.once('error', reject);
        child.once('close', (code, signal) => resolve({ code, signal }));
      });
    active = { file, original, changed, journal, journalFile, child, mutated: false };
    const log = fs.createWriteStream(path.join(folder, 'run.log'));
    child.stderr.on('data', bytes => log.write(bytes));
    let triggered = false,
      restoredDuringRun = false;
    try {
      for await (const line of readline.createInterface({ input: child.stdout })) {
        log.write(line + '\n');
        if (!triggered && line === 'chromium rsuite pointer PASS') {
          fs.writeFileSync(file, changed);
          active.mutated = true;
          triggered = true;
          journal.phase = 'mutated-after-first-browser-case';
          fs.writeFileSync(journalFile, JSON.stringify(journal, null, 2) + '\n');
        }
        if (
          triggered &&
          control.name === 'served-artifact' &&
          line.startsWith('chromium antd pointer ')
        ) {
          restore();
          restoredDuringRun = true;
        }
      }
      const terminal = await done;
      await new Promise(resolve => log.end(resolve));
      assert(triggered, 'Control never reached its mutation trigger');
      assert(terminal.code !== 0, 'Mutated run exited successfully');
      const report = JSON.parse(fs.readFileSync(reportFile));
      assert.equal(report.complete, false);
      assert.equal(report.validated, false);
      assert.equal(report.integrity.after, false);
      if (control.name === 'served-artifact') {
        assert(restoredDuringRun);
        const violation = report.integrity.violations.find(v => v.file === 'antd/virtual.html');
        assert(violation);
        assert.equal(violation.expected, sha(original));
        assert.equal(violation.actual, sha(changed));
        assert(report.integrityError);
      } else {
        assert(report.integrityError?.includes(control.error), report.integrityError);
        assert(
          report.cases.every(c => c.passed),
          'Non-artifact mutation should leave all frozen UI cases passing'
        );
      }
      results.push({
        name: control.name,
        rejected: true,
        terminal,
        allUIRowsPassed: report.cases.every(c => c.passed),
        complete: report.complete,
        validated: report.validated,
        integrityError: report.integrityError,
        violations: report.integrity.violations,
        restoredDuringRun
      });
      console.log(control.name + ' mutation rejected');
    } finally {
      restore();
      active = null;
    }
  }
  assertBuildState(root, built);
  fs.writeFileSync(
    path.join(output, 'proof.json'),
    JSON.stringify(
      {
        passed: true,
        sourceInputs: built.sourceInputs,
        SDKFingerprint: built.candidateFingerprint,
        dependenciesSHA256: built.installedDependencies.sha256,
        controls: results,
        allInputsAndArtifactsRestored: true,
        scope: 'Exclusive controlled mutation tests; not component benchmark outcomes'
      },
      null,
      2
    ) + '\n'
  );
  console.log('All four mid-run controls rejected and all inputs restored');
} catch (error) {
  fs.writeFileSync(
    path.join(output, 'failure.json'),
    JSON.stringify({ error: String(error), stack: error.stack, controls: results }, null, 2) + '\n'
  );
  throw error;
} finally {
  restore();
}
