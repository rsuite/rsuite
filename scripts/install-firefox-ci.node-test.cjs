const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { test } = require('node:test');
const {
  installFirefox,
  isMissingHostDependencies,
  localPlaywright,
  runCommand
} = require('./install-firefox-ci.cjs');

const success = { code: 0, signal: null, timedOut: false, output: '' };
const failure = { code: 1, signal: null, timedOut: false, output: 'original failure' };
const missing = { ...failure, code: 78 };

function fixture(results, options = {}) {
  const calls = [];
  const install = () =>
    installFirefox({
      projectRoot: '/fixture/project',
      platform: 'linux',
      resolvePlaywright: () => ({
        cli: '/fixture/project/node_modules/playwright/cli.js',
        version: 'fixture'
      }),
      run: async (command, args, control) => {
        calls.push({ command, args, ...control });
        assert(control.timeout > 0 && control.timeout <= 180_000);
        assert.strictEqual(control.cwd, '/fixture/project');
        const result = results.shift();
        assert(result, `Unexpected extra child: ${control.label}`);
        if (result instanceof Error) throw result;
        return result;
      },
      ...options
    });
  return { calls, install };
}

test('uses only project-local download and native smoke when Firefox is ready', async () => {
  const { calls, install } = fixture([success, success]);
  await install();
  assert.deepStrictEqual(calls[0].args, [
    '/fixture/project/node_modules/playwright/cli.js',
    'install',
    'firefox'
  ]);
  assert.deepStrictEqual(calls[1].args.slice(1), ['--smoke', '/fixture/project']);
  assert(calls.every(call => call.command === process.execPath));
  assert(!calls.some(call => call.args.includes('--with-deps')));
});

test('canonical missing host dependencies allow exactly one install-deps and another smoke', async () => {
  const { calls, install } = fixture([success, missing, failure, success, success]);
  await install();
  assert.deepStrictEqual(
    calls.map(call => call.label),
    [
      'Download Firefox',
      'Verify native Firefox',
      'Effective APT configuration (diagnostic only)',
      'Install missing Firefox dependencies',
      'Verify native Firefox after dependency installation'
    ]
  );
  assert.deepStrictEqual(calls[3].args, [
    '/fixture/project/node_modules/playwright/cli.js',
    'install-deps',
    'firefox'
  ]);
  assert.deepStrictEqual(calls[4].args, calls[1].args);
});

test('an unavailable diagnostic command cannot suppress the confirmed dependency repair', async () => {
  const { calls, install } = fixture([
    success,
    missing,
    new Error('apt-config unavailable'),
    success,
    success
  ]);
  await install();
  assert.strictEqual(calls.length, 5);
});

test('external cancellation during diagnostics must not start dependency installation', async () => {
  const { calls, install } = fixture([success, missing, { ...success, interrupted: true }]);
  await assert.rejects(install(), /cancelled during APT diagnostics/);
  assert.strictEqual(calls.length, 3);
});

test('download errors are preserved without launching or running APT', async () => {
  const { calls, install } = fixture([failure]);
  await assert.rejects(install(), /Firefox download failed/);
  assert.strictEqual(calls.length, 1);
});

for (const [name, result] of [
  ['generic launch or permission error', failure],
  ['smoke timeout', { ...missing, timedOut: true }],
  ['signal termination', { ...failure, code: null, signal: 'SIGINT' }]
]) {
  test(`${name} must not run APT`, async () => {
    const { calls, install } = fixture([success, result]);
    await assert.rejects(install(), /Native Firefox verification failed/);
    assert.strictEqual(calls.length, 2);
  });
}

test('non-Linux host diagnostics do not permit an APT fallback', async () => {
  const { calls, install } = fixture([success, missing], { platform: 'darwin' });
  await assert.rejects(install(), /Native Firefox verification failed/);
  assert.strictEqual(calls.length, 2);
});

test('dependency installation failure prevents a second smoke', async () => {
  const { calls, install } = fixture([success, missing, success, failure]);
  await assert.rejects(install(), /Firefox dependency installation failed/);
  assert.strictEqual(calls.length, 4);
});

test('failed second verification is final, including another missing-dependency result', async () => {
  const { calls, install } = fixture([success, missing, success, success, missing]);
  await assert.rejects(install(), /verification after dependency installation failed/);
  assert.strictEqual(calls.length, 5);
});

test('total deadline is shared across phases and cannot start a later phase after expiry', async () => {
  let clock = 0;
  const { calls, install } = fixture([success], { now: () => (clock++ === 0 ? 0 : 450_001) });
  await assert.rejects(install(), /total time limit/);
  assert.strictEqual(calls.length, 0);
});

test('classifier accepts only canonical Linux missing-host diagnostics', () => {
  const prefix = '\n╔══════════════════════════════════════════════════╗\n';
  for (const detail of ['Please install them with the following command:', 'Missing libraries:']) {
    const message = `${prefix}║ Host system is missing dependencies to run browsers. ║\n║ ${detail} ║\n`;
    assert.strictEqual(isMissingHostDependencies(message, 'linux'), true);
    assert.strictEqual(isMissingHostDependencies(message, 'win32'), false);
  }
  for (const message of [
    'Host system is missing dependencies!',
    'libgtk-3.so.0: cannot open shared object file',
    'browserType.launch: Target page, context or browser has been closed',
    'Host system is missing dependencies to run browsers.',
    'prefix Host system is missing dependencies to run browsers.\nMissing libraries:',
    'Host system is missing dependencies to run browsers.\nThis is most likely due to Docker image version not matching Playwright version:\nPlease install them with the following command:'
  ]) {
    assert.strictEqual(isMissingHostDependencies(message, 'linux'), false, message);
  }
});

test('local resolution cannot silently use a global or ancestor Playwright', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-firefox-local-'));
  try {
    assert.throws(() => localPlaywright(root), /ENOENT/);
    const directory = path.join(root, 'node_modules', 'playwright');
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(
      path.join(directory, 'package.json'),
      JSON.stringify({
        name: 'playwright',
        version: 'fixture',
        dependencies: { 'playwright-core': 'fixture' }
      })
    );
    fs.writeFileSync(path.join(directory, 'cli.js'), '');
    const core = path.join(root, 'node_modules', 'playwright-core');
    fs.mkdirSync(core);
    fs.writeFileSync(
      path.join(core, 'package.json'),
      JSON.stringify({ name: 'playwright-core', version: 'different' })
    );
    assert.throws(() => localPlaywright(root), /version mismatch/);
    fs.writeFileSync(
      path.join(core, 'package.json'),
      JSON.stringify({ name: 'playwright-core', version: 'fixture' })
    );
    assert.deepStrictEqual(localPlaywright(root), {
      directory,
      cli: path.join(directory, 'cli.js'),
      version: 'fixture'
    });
  } finally {
    fs.rmSync(root, { recursive: true });
  }
});

test('bounded command retains actual diagnostics and waits for terminated child', async () => {
  const result = await runCommand(
    process.execPath,
    ['-e', 'console.error("native-fixture-original"); setInterval(() => {}, 1000);'],
    {
      cwd: __dirname,
      timeout: 2_000,
      label: 'bounded fixture'
    }
  );
  assert.strictEqual(result.timedOut, true);
  assert.strictEqual(result.signal, 'SIGINT');
  assert.match(result.output, /native-fixture-original/);
});

test('spawn errors remove timeout and cancellation listeners', async () => {
  const before = [process.listenerCount('SIGINT'), process.listenerCount('SIGTERM')];
  await assert.rejects(
    runCommand(path.join(__dirname, 'not-an-installed-command'), [], {
      cwd: __dirname,
      timeout: 1_000,
      label: 'spawn-error fixture'
    }),
    { code: 'ENOENT' }
  );
  assert.deepStrictEqual(
    [process.listenerCount('SIGINT'), process.listenerCount('SIGTERM')],
    before
  );
});

test('external cancellation closes and reaps the detached command before the helper exits', async () => {
  const helper = path.join(__dirname, 'install-firefox-ci.cjs');
  const source = `
    const { runCommand } = require(${JSON.stringify(helper)});
    runCommand(process.execPath, ['-e', 'console.log("owned-child=" + process.pid); setInterval(() => {}, 1000);'],
      { cwd: ${JSON.stringify(__dirname)}, timeout: 5000, label: 'cancel fixture' })
      .then(result => { console.log(JSON.stringify({ ...result, listeners: [process.listenerCount('SIGINT'), process.listenerCount('SIGTERM')] })); process.exit(result.interrupted ? 0 : 1); });
  `;
  const parent = spawn(process.execPath, ['-e', source], { stdio: ['ignore', 'pipe', 'pipe'] });
  let output = '';
  let ownedPID;
  let cleanupError;
  const watchdog = setTimeout(() => parent.kill('SIGKILL'), 8_000);
  parent.stdout.on('data', chunk => {
    output += chunk.toString();
    const match = output.match(/owned-child=(\d+)/);
    if (match && !ownedPID) {
      ownedPID = Number(match[1]);
      parent.kill('SIGTERM');
    }
  });
  parent.stderr.on('data', chunk => (output += chunk.toString()));
  try {
    const code = await new Promise((resolve, reject) => {
      parent.once('error', reject);
      parent.once('close', resolve);
    });
    assert.strictEqual(code, 0, output);
    assert(ownedPID, output);
    assert.match(output, /"interrupted":true/);
    assert.match(output, /"listeners":\[0,0\]/);
    assert.throws(() => process.kill(ownedPID, 0), { code: 'ESRCH' });
  } finally {
    clearTimeout(watchdog);
    if (ownedPID) {
      try {
        process.kill(-ownedPID, 'SIGKILL');
      } catch (error) {
        if (error.code !== 'ESRCH') cleanupError = error;
      }
    }
    if (parent.exitCode === null && parent.signalCode === null) parent.kill('SIGKILL');
  }
  assert.ifError(cleanupError);
});
