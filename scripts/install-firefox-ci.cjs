const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');

const MISSING_DEPENDENCIES = 78;
const SMOKE_TIMEOUT = 45_000;
const INSTALL_TIMEOUT = 450_000;

// These are the Linux host-validator diagnostics, not Firefox crash messages.
function isMissingHostDependencies(message, platform = process.platform) {
  const lines = message.split('\n').map(line => line.replace(/^[\s║]+|[\s║]+$/g, ''));
  return (
    platform === 'linux' &&
    lines.includes('Host system is missing dependencies to run browsers.') &&
    !message.includes('Docker image version not matching Playwright version') &&
    (lines.includes('Please install them with the following command:') ||
      lines.includes('Missing libraries:'))
  );
}

function localPlaywright(projectRoot) {
  const directory = path.join(projectRoot, 'node_modules', 'playwright');
  const metadata = JSON.parse(fs.readFileSync(path.join(directory, 'package.json'), 'utf8'));
  const cli = path.join(directory, 'cli.js');
  if (metadata.name !== 'playwright' || !fs.statSync(cli).isFile()) {
    throw new Error(
      'The project-local Playwright installation is unavailable. Run npm install first.'
    );
  }
  const corePackage = require.resolve('playwright-core/package.json', { paths: [directory] });
  const core = JSON.parse(fs.readFileSync(corePackage, 'utf8'));
  if (
    !metadata.dependencies?.['playwright-core'] ||
    core.version !== metadata.dependencies['playwright-core']
  ) {
    throw new Error(
      `Playwright/core version mismatch: ${metadata.version} requires ${metadata.dependencies?.['playwright-core']}, found ${core.version}.`
    );
  }
  return { directory, cli, version: metadata.version };
}

function runCommand(command, args, { cwd, timeout, label }) {
  console.log(`[Firefox install] ${label}`);
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: ['ignore', 'pipe', 'pipe'], detached: true });
    let timedOut = false;
    let interrupted = false;
    let output = '';
    let secondInterrupt;
    let forceKill;
    const signal = name => {
      if (!child.pid) return;
      try {
        process.kill(-child.pid, name);
      } catch (error) {
        if (error.code !== 'ESRCH') console.error(`[Firefox install] cleanup: ${error.message}`);
      }
    };
    const interrupt = () => {
      // Playwright handles a second SIGINT by force-closing its detached browser.
      signal('SIGINT');
      secondInterrupt ||= setTimeout(() => signal('SIGINT'), 1_000);
      forceKill ||= setTimeout(() => signal('SIGKILL'), 3_000);
    };
    const onCancel = () => {
      interrupted = true;
      console.error(`[Firefox install] ${label} cancelled; closing its owned child.`);
      interrupt();
    };
    process.on('SIGINT', onCancel);
    process.on('SIGTERM', onCancel);
    const timer = setTimeout(() => {
      timedOut = true;
      console.error(`[Firefox install] ${label} exceeded ${timeout}ms.`);
      interrupt();
    }, timeout);
    for (const [stream, destination] of [
      [child.stdout, process.stdout],
      [child.stderr, process.stderr]
    ]) {
      stream.on('data', chunk => {
        destination.write(chunk);
        // The full output is streamed to CI; retain a bounded diagnostic tail.
        output = (output + chunk.toString()).slice(-64_000);
      });
    }
    const cleanup = () => {
      clearTimeout(timer);
      clearTimeout(secondInterrupt);
      clearTimeout(forceKill);
      process.removeListener('SIGINT', onCancel);
      process.removeListener('SIGTERM', onCancel);
    };
    child.once('error', error => {
      cleanup();
      reject(error);
    });
    child.once('close', (code, childSignal) => {
      cleanup();
      resolve({ code, signal: childSignal, timedOut, interrupted, output });
    });
  });
}

function requireSuccess(result, label) {
  if (result.timedOut || result.interrupted || result.code !== 0) {
    throw new Error(`${label} failed (exit=${result.code}, signal=${result.signal || 'none'}).`);
  }
}

async function installFirefox({
  projectRoot = path.resolve(__dirname, '..'),
  run = runCommand,
  resolvePlaywright = localPlaywright,
  platform = process.platform,
  now = Date.now
} = {}) {
  if (process.env.PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS) {
    throw new Error(
      'PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS must not bypass Firefox validation.'
    );
  }
  const playwright = resolvePlaywright(projectRoot);
  console.log(`[Firefox install] project-local Playwright ${playwright.version}`);
  const deadline = now() + INSTALL_TIMEOUT;
  const execute = (args, label, maximum) => {
    const timeout = Math.min(maximum, deadline - now());
    if (timeout <= 0) throw new Error('Firefox installation exceeded its total time limit.');
    return run(process.execPath, args, { cwd: projectRoot, timeout, label });
  };
  requireSuccess(
    await execute([playwright.cli, 'install', 'firefox'], 'Download Firefox', 180_000),
    'Firefox download'
  );
  const smokeArgs = [__filename, '--smoke', projectRoot];
  const firstSmoke = await execute(smokeArgs, 'Verify native Firefox', 55_000);
  if (!firstSmoke.timedOut && !firstSmoke.interrupted && firstSmoke.code === 0) return;
  if (
    platform !== 'linux' ||
    firstSmoke.timedOut ||
    firstSmoke.interrupted ||
    firstSmoke.code !== MISSING_DEPENDENCIES
  ) {
    requireSuccess(firstSmoke, 'Native Firefox verification');
  }

  // APT diagnostics are useful only on the confirmed missing-host-dependencies path.
  const diagnostic = await run(
    'apt-config',
    [
      'shell',
      'Retries',
      'Acquire::Retries',
      'HttpTimeout',
      'Acquire::http::Timeout',
      'HttpsTimeout',
      'Acquire::https::Timeout'
    ],
    {
      cwd: projectRoot,
      timeout: Math.min(5_000, Math.max(1, deadline - now())),
      label: 'Effective APT configuration (diagnostic only)'
    }
  ).catch(error => console.error(`[Firefox install] APT diagnostic unavailable: ${error.message}`));
  if (diagnostic?.interrupted)
    throw new Error('Firefox dependency installation cancelled during APT diagnostics.');
  requireSuccess(
    await execute(
      [playwright.cli, 'install-deps', 'firefox'],
      'Install missing Firefox dependencies',
      120_000
    ),
    'Firefox dependency installation'
  );
  requireSuccess(
    await execute(smokeArgs, 'Verify native Firefox after dependency installation', 55_000),
    'Native Firefox verification after dependency installation'
  );
}

async function smokeFirefox(projectRoot) {
  // A hard exit runs Playwright's exit hook, which kills its detached browser group.
  const watchdog = setTimeout(() => {
    console.error(`[Firefox install] Native smoke exceeded ${SMOKE_TIMEOUT}ms.`);
    process.exit(1);
  }, SMOKE_TIMEOUT);
  let browser;
  try {
    if (process.env.PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS) {
      throw new Error(
        'PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS must not bypass Firefox validation.'
      );
    }
    const local = localPlaywright(projectRoot);
    const { firefox } = require(local.directory);
    try {
      browser = await firefox.launch({ headless: true, timeout: 30_000 });
    } catch (error) {
      console.error(error.stack || error.message);
      return isMissingHostDependencies(error.message) ? MISSING_DEPENDENCIES : 1;
    }
    console.log(
      `[Firefox install] Native Firefox ${browser.version()} / Playwright ${local.version}`
    );
    const page = await browser.newPage();
    await page.setContent('<!doctype html><title>Firefox smoke</title><p id="smoke">ready</p>');
    const actual = await page.evaluate(() => ({
      title: document.title,
      text: document.getElementById('smoke').textContent,
      userAgent: navigator.userAgent
    }));
    if (
      actual.title !== 'Firefox smoke' ||
      actual.text !== 'ready' ||
      !actual.userAgent.includes('Firefox/')
    ) {
      throw new Error(`Firefox DOM/protocol verification failed: ${JSON.stringify(actual)}`);
    }
    await page.close();
    await browser.close();
    browser = undefined;
    console.log('[Firefox install] Native launch, DOM/protocol and close passed.');
    return 0;
  } catch (error) {
    console.error(error.stack || error.message);
    return 1;
  } finally {
    try {
      if (browser) await browser.close();
    } finally {
      clearTimeout(watchdog);
    }
  }
}

module.exports = {
  installFirefox,
  isMissingHostDependencies,
  localPlaywright,
  runCommand,
  smokeFirefox
};

if (require.main === module) {
  const operation =
    process.argv[2] === '--smoke'
      ? smokeFirefox(path.resolve(process.argv[3]))
      : installFirefox().then(() => 0);
  operation.then(
    code => process.exit(code),
    error => {
      console.error(error.stack || error.message);
      process.exit(1);
    }
  );
}
