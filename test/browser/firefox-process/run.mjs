import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn, execFile } from 'node:child_process';
import { once } from 'node:events';
import { promisify } from 'node:util';
import { startSampler } from './sampler.mjs';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const npm = process.env.npm_execpath;
if (!npm || process.env.BROWSER !== 'firefox') {
  throw new Error('Use BROWSER=firefox npm run test:ci:firefox-process');
}
const base = process.env.RSUITE_FIREFOX_PROCESS_DIR || path.join(root, 'artifacts/firefox-process');
await fs.mkdir(base, { recursive: true, mode: 0o700 });
const directory = await fs.mkdtemp(path.join(base, 'run-'));
const log = await fs.open(path.join(directory, 'tests.log'), 'wx', 0o600);
const events = await fs.open(path.join(directory, 'log-events.jsonl'), 'wx', 0o600);
const args = ['run', 'test:ci', '--', '--browser.headless', ...process.argv.slice(2)];
const summary = {
  startedAt: Date.now(),
  platform: process.platform,
  node: process.version,
  arguments: args,
  nativeProfilerAdded: false,
  browserConfigurationChanged: false,
  testsExitCode: null,
  testsExitSignal: null
};
if (process.platform === 'linux') {
  try {
    const result = await promisify(execFile)('getconf', ['CLK_TCK'], { timeout: 2000 });
    const value = Number(result.stdout.trim());
    if (!Number.isSafeInteger(value) || value <= 0) throw new Error('Invalid clock frequency');
    summary.clockTicksPerSecond = value;
  } catch (error) {
    summary.clockTicksPerSecond = null;
    summary.clockQueryError = error.code || error.message;
  }
}
console.info('[Firefox process diagnostics]', directory);
let child;
let closed;
let sampler;
let writes = Promise.resolve();
let logOffset = 0;
let runnerError;
let logError;
const interrupt = signal => {
  if (!child?.pid || child.exitCode !== null || child.signalCode !== null) return;
  try {
    process.kill(process.platform === 'win32' ? child.pid : -child.pid, signal);
  } catch (error) {
    if (error.code !== 'ESRCH') console.error(error);
  }
};
const sigint = () => interrupt('SIGINT');
const sigterm = () => interrupt('SIGTERM');
try {
  child = spawn(process.execPath, [npm, ...args], {
    cwd: root,
    env: process.env,
    detached: process.platform !== 'win32',
    stdio: ['ignore', 'pipe', 'pipe']
  });
  closed = once(child, 'close');
  summary.testsPID = child.pid;
  for (const [channel, stream, output] of [
    ['stdout', child.stdout, process.stdout],
    ['stderr', child.stderr, process.stderr]
  ]) {
    stream.on('data', data => {
      const receivedAt = Date.now();
      const startOffset = logOffset;
      logOffset += data.length;
      output.write(data);
      writes = writes
        .then(async () => {
          await log.writeFile(data);
          await events.writeFile(
            JSON.stringify({ receivedAt, channel, startOffset, bytes: data.length }) + '\n'
          );
        })
        .catch(error => {
          logError ||= error;
        });
    });
  }
  process.on('SIGINT', sigint);
  process.on('SIGTERM', sigterm);
  sampler = await startSampler({ rootPID: child.pid, directory });
  const [code, signal] = await closed;
  summary.testsExitCode = code;
  summary.testsExitSignal = signal;
} catch (error) {
  runnerError = error;
  summary.runnerError = error.stack || String(error);
  interrupt('SIGTERM');
  if (closed) {
    const cleanup = setTimeout(() => interrupt('SIGKILL'), 2000);
    cleanup.unref();
    try {
      const [code, signal] = await closed;
      summary.testsExitCode = code;
      summary.testsExitSignal = signal;
    } catch {
      // Spawn errors have no original test result to replace.
    } finally {
      clearTimeout(cleanup);
    }
  }
} finally {
  process.off('SIGINT', sigint);
  process.off('SIGTERM', sigterm);
  const captureErrors = [];
  if (sampler) {
    try {
      summary.scheduler = await sampler.stop();
    } catch (error) {
      captureErrors.push(error.message);
    }
  }
  await writes;
  summary.logBytesExpected = logOffset;
  try {
    summary.logBytesCaptured = (await log.stat()).size;
    if (summary.logBytesCaptured !== logOffset) logError ||= new Error('Incomplete child log');
  } catch (error) {
    captureErrors.push(error.message);
  }
  if (logError) summary.logError = logError.message;
  for (const result of await Promise.allSettled([log.close(), events.close()])) {
    if (result.status === 'rejected') captureErrors.push(result.reason.message);
  }
  if (captureErrors.length) summary.captureErrors = captureErrors;
  summary.finishedAt = Date.now();
  summary.missingLinuxCapture =
    process.platform === 'linux' &&
    (!summary.scheduler?.samples || !summary.scheduler?.sawFirefoxScheduler);
  summary.wrapperExitCode =
    summary.testsExitCode ||
    (summary.testsExitSignal ||
    runnerError ||
    logError ||
    captureErrors.length ||
    summary.missingLinuxCapture
      ? 1
      : 0);
  try {
    await fs.writeFile(
      path.join(directory, 'summary.json'),
      JSON.stringify(summary, null, 2) + '\n'
    );
  } catch (error) {
    console.error('Firefox process diagnostics could not write its summary:', error.message);
    summary.wrapperExitCode = summary.testsExitCode || 1;
  }
}
if (summary.missingLinuxCapture) console.error('Firefox process scheduler capture is unavailable.');
process.exitCode = summary.wrapperExitCode;
