import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { firefox } from 'playwright';
import { createCollector } from './collector.mjs';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const argv = process.argv.slice(2);
if (!['linux', 'darwin'].includes(process.platform)) {
  throw new Error('Native Firefox profiling requires Linux or macOS POSIX signals');
}
if (
  argv.some(arg =>
    /^-c|^--(?:config|workspace|project|environment)(?:=|$)|^--browser(?:[.=]|$)/.test(arg)
  )
) {
  throw new Error(
    'Use test filters, shard, coverage or reporter arguments; the Firefox profile configuration is fixed'
  );
}
if (process.env.RUN_ENV && !['test', 'ci'].includes(process.env.RUN_ENV)) {
  throw new Error(
    'Native Firefox profiling runs the component browser suite, not an SSR or control suite'
  );
}
const base = process.env.RSUITE_FIREFOX_PROFILE_DIR || path.join(root, 'artifacts/firefox-profile');
await fs.mkdir(base, { recursive: true, mode: 0o700 });
const directory = await fs.mkdtemp(path.join(base, 'run-'));
const summary = {
  startedAt: new Date().toISOString(),
  platform: process.platform,
  arch: process.arch,
  node: process.version,
  arguments: argv,
  requestedIntervalMs: 2,
  requestedCapacityEntries: 16777216,
  capture: { status: 'not-requested' }
};
console.info('[Firefox profile] Artifacts:', directory);
const browserEnv = Object.fromEntries(
  Object.entries(process.env).filter(
    ([key]) =>
      !key.startsWith('MOZ_PROFILER_') &&
      !key.startsWith('MOZ_BASE_PROFILER_') &&
      key !== 'MOZ_UPLOAD_DIR'
  )
);
let server;
let collector;
let log;
let child;
const interrupt = signal => child?.kill(signal);
const sigint = () => interrupt('SIGINT');
const sigterm = () => interrupt('SIGTERM');
try {
  server = await firefox.launchServer({
    headless: true,
    firefoxUserPrefs: { 'browser.cache.disk.enable': false, 'browser.cache.memory.enable': false },
    env: {
      ...browserEnv,
      MOZ_PROFILER_STARTUP: '1',
      MOZ_PROFILER_STARTUP_ENTRIES: '16777216',
      MOZ_PROFILER_STARTUP_INTERVAL: '2',
      MOZ_PROFILER_STARTUP_FEATURES: 'js,stackwalk',
      MOZ_PROFILER_STARTUP_FILTERS: 'GeckoMain',
      MOZ_UPLOAD_DIR: directory
    }
  });
  const inspector = await firefox.connect(server.wsEndpoint());
  summary.browserVersion = inspector.version();
  await inspector.close();
  const browserProcess = server.process();
  summary.browserPID = browserProcess.pid;
  collector = await createCollector({ browserProcess, directory });
  const config = fileURLToPath(new URL('./profile.config.mts', import.meta.url));
  log = await fs.open(path.join(directory, 'tests.log'), 'wx');
  child = spawn(
    process.execPath,
    [
      path.join(root, 'node_modules/vitest/vitest.mjs'),
      'run',
      '--config',
      config,
      '--browser.headless',
      ...argv
    ],
    {
      cwd: root,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: {
        ...process.env,
        BROWSER: 'firefox',
        RUN_ENV: process.env.RUN_ENV || 'test',
        RSUITE_FIREFOX_PROFILE_ENDPOINT: server.wsEndpoint(),
        RSUITE_FIREFOX_PROFILE_OUTPUT: directory,
        RSUITE_FIREFOX_PROFILE_COLLECTOR: collector.url
      }
    }
  );
  let writes = Promise.resolve();
  for (const [stream, target] of [
    [child.stdout, process.stdout],
    [child.stderr, process.stderr]
  ]) {
    stream.on('data', chunk => {
      writes = writes.then(() => log.write(chunk));
      target.write(chunk);
    });
  }
  process.once('SIGINT', sigint);
  process.once('SIGTERM', sigterm);
  const [code, signal] = await once(child, 'close');
  await writes;
  summary.testsExitCode = code;
  summary.testsExitSignal = signal;
  process.exitCode = code ?? (signal === 'SIGINT' ? 130 : signal === 'SIGTERM' ? 143 : 1);
} catch (error) {
  summary.runnerError = String(error.stack || error);
  process.exitCode = 1;
  console.error(error);
} finally {
  process.removeListener('SIGINT', sigint);
  process.removeListener('SIGTERM', sigterm);
  for (const close of [() => collector?.close(), () => server?.close(), () => log?.close()]) {
    try {
      await close();
    } catch (error) {
      (summary.cleanupErrors ||= []).push(String(error.stack || error));
      process.exitCode ||= 1;
    }
  }
  if (collector) summary.capture = collector.state;
  if (server) {
    summary.browserExitCode = server.process().exitCode;
    summary.browserExitSignal = server.process().signalCode;
  }
  summary.finishedAt = new Date().toISOString();
  await fs.writeFile(path.join(directory, 'summary.json'), JSON.stringify(summary, null, 2) + '\n');
  console.info('[Firefox profile] Summary:', path.join(directory, 'summary.json'));
}
