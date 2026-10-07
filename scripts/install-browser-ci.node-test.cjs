const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { test } = require('node:test');
const {
  installBrowser,
  smokeBrowser,
  isMissingHostDependencies,
  localPlaywright,
  runCommand
} = require('./install-browser-ci.cjs');

const success = { code: 0, signal: null, timedOut: false, output: '' };
const failure = { code: 1, signal: null, timedOut: false, output: 'original failure' };
const missing = { ...failure, code: 78 };

function fixture(browserName, results, options = {}) {
  const calls = [];
  const install = () =>
    installBrowser(browserName, {
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

for (const [browserName, displayName] of [
  ['firefox', 'Firefox'],
  ['chromium', 'Chromium']
]) {
  test(`uses only project-local download and native smoke when ${displayName} is ready (${browserName})`, async () => {
    const { calls, install } = fixture(browserName, [success, success]);
    await install();
    assert.deepStrictEqual(calls[0].args, [
      '/fixture/project/node_modules/playwright/cli.js',
      'install',
      browserName
    ]);
    assert.deepStrictEqual(calls[1].args.slice(1), ['--smoke', browserName, '/fixture/project']);
    assert(calls.every(call => call.command === process.execPath));
    assert(!calls.some(call => call.args.includes('--with-deps')));
  });

  test(`canonical missing host dependencies allow exactly one install-deps and another smoke (${browserName})`, async () => {
    const { calls, install } = fixture(browserName, [success, missing, failure, success, success]);
    await install();
    assert.deepStrictEqual(
      calls.map(call => call.label),
      [
        `Download ${displayName}`,
        `Verify native ${displayName}`,
        'Effective APT configuration (diagnostic only)',
        `Install missing ${displayName} dependencies`,
        `Verify native ${displayName} after dependency installation`
      ]
    );
    assert.deepStrictEqual(calls[3].args, [
      '/fixture/project/node_modules/playwright/cli.js',
      'install-deps',
      browserName
    ]);
    assert.deepStrictEqual(calls[4].args, calls[1].args);
  });

  test(`an unavailable diagnostic command cannot suppress the confirmed dependency repair (${browserName})`, async () => {
    const { calls, install } = fixture(browserName, [
      success,
      missing,
      new Error('apt-config unavailable'),
      success,
      success
    ]);
    await install();
    assert.strictEqual(calls.length, 5);
  });

  test(`external cancellation during diagnostics must not start dependency installation (${browserName})`, async () => {
    const { calls, install } = fixture(browserName, [
      success,
      missing,
      { ...success, interrupted: true }
    ]);
    await assert.rejects(install(), /cancelled during APT diagnostics/);
    assert.strictEqual(calls.length, 3);
  });

  test(`download errors are preserved without launching or running APT (${browserName})`, async () => {
    const { calls, install } = fixture(browserName, [failure]);
    await assert.rejects(install(), new RegExp(`${displayName} download failed`));
    assert.strictEqual(calls.length, 1);
  });

  for (const [scenario, result] of [
    ['generic launch or permission error', failure],
    ['smoke timeout', { ...missing, timedOut: true }],
    ['signal termination', { ...failure, code: null, signal: 'SIGINT' }]
  ]) {
    test(`${scenario} must not run APT (${browserName})`, async () => {
      const { calls, install } = fixture(browserName, [success, result]);
      await assert.rejects(install(), new RegExp(`Native ${displayName} verification failed`));
      assert.strictEqual(calls.length, 2);
    });
  }

  test(`non-Linux host diagnostics do not permit an APT fallback (${browserName})`, async () => {
    const { calls, install } = fixture(browserName, [success, missing], { platform: 'darwin' });
    await assert.rejects(install(), new RegExp(`Native ${displayName} verification failed`));
    assert.strictEqual(calls.length, 2);
  });

  test(`dependency installation failure prevents a second smoke (${browserName})`, async () => {
    const { calls, install } = fixture(browserName, [success, missing, success, failure]);
    await assert.rejects(install(), new RegExp(`${displayName} dependency installation failed`));
    assert.strictEqual(calls.length, 4);
  });

  test(`failed second verification is final, including another missing-dependency result (${browserName})`, async () => {
    const { calls, install } = fixture(browserName, [success, missing, success, success, missing]);
    await assert.rejects(install(), /verification after dependency installation failed/);
    assert.strictEqual(calls.length, 5);
  });

  test(`total deadline is shared across phases and cannot start a later phase after expiry (${browserName})`, async () => {
    let clock = 0;
    const { calls, install } = fixture(browserName, [success], {
      now: () => (clock++ === 0 ? 0 : 450_001)
    });
    await assert.rejects(install(), /total time limit/);
    assert.strictEqual(calls.length, 0);
  });
}

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
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'rsuite-browser-local-'));
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
  const helper = path.join(__dirname, 'install-browser-ci.cjs');
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

for (const [browserName, displayName] of [
  ['firefox', 'Firefox'],
  ['chromium', 'Chromium']
]) {
  test(`remaining total time caps the next phase (${browserName})`, async () => {
    const clock = [0, 100_000, 449_990];
    const { calls, install } = fixture(browserName, [success, success], {
      now: () => clock.shift()
    });
    await install();
    assert.strictEqual(calls[0].timeout, 180_000);
    assert.strictEqual(calls[1].timeout, 10);
  });

  test(`host-validation bypass is rejected before local resolution (${browserName})`, async () => {
    const before = process.env.PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS;
    process.env.PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = '1';
    try {
      await assert.rejects(
        installBrowser(browserName, {
          resolvePlaywright: () => assert.fail('must not resolve'),
          run: () => assert.fail('must not spawn')
        }),
        /must not bypass browser validation/
      );
    } finally {
      if (before === undefined) delete process.env.PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS;
      else process.env.PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = before;
    }
  });

  function smokeFixture(actual, launchError) {
    const calls = [];
    const page = {
      setContent: async markup => calls.push(['setContent', markup]),
      evaluate: async () => actual,
      close: async () => calls.push(['page.close'])
    };
    const browser = {
      version: () => 'fixture-native',
      newPage: async () => {
        calls.push(['newPage']);
        return page;
      },
      close: async () => calls.push(['browser.close'])
    };
    return {
      calls,
      smoke: () =>
        smokeBrowser(browserName, '/fixture/project', {
          resolvePlaywright: root => {
            assert.strictEqual(root, '/fixture/project');
            return { directory: '/fixture/local/playwright', version: 'fixture' };
          },
          loadPlaywright: directory => {
            assert.strictEqual(directory, '/fixture/local/playwright');
            return {
              [browserName]: {
                launch: async options => {
                  calls.push(['launch', options]);
                  if (launchError) throw launchError;
                  return browser;
                }
              }
            };
          }
        })
    };
  }

  test(`native smoke uses the selected default engine and verifies DOM/protocol/close (${browserName})`, async () => {
    const { calls, smoke } = smokeFixture({
      title: `${displayName} smoke`,
      text: 'ready',
      userAgent:
        browserName === 'firefox' ? 'Mozilla Firefox/142.0' : 'Mozilla HeadlessChrome/141.0'
    });
    assert.strictEqual(await smoke(), 0);
    assert.deepStrictEqual(calls, [
      ['launch', { headless: true, timeout: 30_000 }],
      ['newPage'],
      ['setContent', `<!doctype html><title>${displayName} smoke</title><p id="smoke">ready</p>`],
      ['page.close'],
      ['browser.close']
    ]);
  });

  test(`wrong engine UA fails smoke and closes the owned browser (${browserName})`, async () => {
    const { calls, smoke } = smokeFixture({
      title: `${displayName} smoke`,
      text: 'ready',
      userAgent:
        browserName === 'firefox' ? 'Mozilla HeadlessChrome/141.0' : 'Mozilla Firefox/142.0'
    });
    assert.strictEqual(await smoke(), 1);
    assert.deepStrictEqual(calls.at(-1), ['browser.close']);
  });

  test(`generic native launch errors cannot acquire missing-dependency exit (${browserName})`, async () => {
    const { calls, smoke } = smokeFixture(null, new Error('browserType.launch: permission denied'));
    assert.strictEqual(await smoke(), 1);
    assert.deepStrictEqual(calls, [['launch', { headless: true, timeout: 30_000 }]]);
  });
}

test('unsupported engines are rejected before resolution, import or spawning', async () => {
  for (const browserName of ['webkit', 'chrome', '', undefined, 'constructor', '__proto__']) {
    const fail = () => assert.fail('unsupported engine must not start work');
    await assert.rejects(
      installBrowser(browserName, { resolvePlaywright: fail, run: fail }),
      /supported browser/
    );
    await assert.rejects(
      smokeBrowser(browserName, '/fixture', { resolvePlaywright: fail, loadPlaywright: fail }),
      /supported browser/
    );
  }
});
