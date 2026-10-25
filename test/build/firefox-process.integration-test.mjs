import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { fileURLToPath } from 'node:url';
import { parseSchedule, parseStat } from '../browser/firefox-process/proc.mjs';
import { startSampler } from '../browser/firefox-process/sampler.mjs';

function stat(pid, parent, name, start = 100) {
  const fields = Array(22).fill('0');
  fields[0] = 'S';
  fields[1] = String(parent);
  fields[11] = '17';
  fields[12] = '9';
  fields[19] = String(start);
  return `${pid} (${name}) ${fields.join(' ')}`;
}

test('process counters retain names and nanosecond precision without inventing unavailable data', () => {
  assert.deepEqual(parseStat(stat(42, 20, 'name with ) spaces')), {
    pid: 42,
    parentPID: 20,
    name: 'name with ) spaces',
    state: 'S',
    userTicks: 17,
    systemTicks: 9,
    startTicks: 100
  });
  assert.deepEqual(parseSchedule('9007199254740999 12 3'), {
    runtimeNS: '9007199254740999',
    runqueueWaitNS: '12',
    timeslices: '3'
  });
  assert.equal(parseStat(stat(42, 20, 'traced').replace(') S ', ') t ')).state, 't');
  for (const invalid of [
    '',
    '42 (missing)',
    stat(42, 20, 'x', 'unsafe'),
    stat(42, 20, 'x', '9007199254740999')
  ]) {
    assert.throws(() => parseStat(invalid));
  }
  for (const invalid of ['', '1 2', '-1 2 3', '1.2 2 3']) {
    assert.throws(() => parseSchedule(invalid));
  }
});

test('owned family discovery includes off-main-thread forks and rejects unrelated or reused PIDs', async () => {
  const folder = await fs.mkdtemp(path.join(os.tmpdir(), 'rsuite-firefox-process-'));
  const proc = path.join(folder, 'proc');
  const output = path.join(folder, 'output');
  await fs.mkdir(output);
  async function write(pid, parent, name, start = 100, schedule = true) {
    const main = path.join(proc, String(pid), 'task', String(pid));
    await fs.mkdir(main, { recursive: true });
    await fs.writeFile(path.join(proc, String(pid), 'stat'), stat(pid, parent, name, start));
    await fs.writeFile(path.join(main, 'stat'), stat(pid, parent, name, start));
    await fs.writeFile(path.join(main, 'wchan'), 'futex_wait_queue');
    if (schedule) await fs.writeFile(path.join(main, 'schedstat'), '123 456 7');
  }
  await write(500, process.pid, 'npm');
  await write(501, 500, 'firefox');
  await write(502, 501, 'Isolated Web Co', 100, false);
  await write(999, 1, 'unrelated firefox');
  await fs.mkdir(path.join(proc, 'sys/kernel'), { recursive: true });
  await fs.writeFile(path.join(proc, 'sys/kernel/sched_schedstats'), '0');
  let sampler;
  try {
    sampler = await startSampler({
      rootPID: 500,
      directory: output,
      procRoot: proc,
      platform: 'linux',
      intervalMS: 5
    });
    for (let i = 0; i < 100 && sampler.summary.samples < 1; i++) {
      await new Promise(resolve => setTimeout(resolve, 5));
    }
    assert(sampler.summary.samples > 0);
    await write(500, process.pid, 'reused root', 999);
    for (let i = 0; i < 100 && sampler.summary.samples < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 5));
    }
    const summary = await sampler.stop();
    sampler = null;
    assert(summary.samples >= 3);
    assert(summary.sawFirefox && summary.sawFirefoxScheduler);
    assert.equal(summary.sawContentScheduler, false);
    assert.deepEqual(summary.kernelSchedulerStats, { available: true, value: '0' });
    const rows = (await fs.readFile(path.join(output, 'process-samples.jsonl'), 'utf8'))
      .trim()
      .split('\n')
      .map(JSON.parse);
    assert.deepEqual(
      rows[0].processes.map(row => row.pid),
      [500, 501, 502]
    );
    assert.deepEqual(rows[0].processes.find(row => row.pid === 502).scheduler, {
      available: false,
      error: 'ENOENT'
    });
    assert.equal(rows[0].processes.find(row => row.pid === 501).scheduler.available, true);
    assert(
      rows.every(row =>
        row.processes.every(process => process.pid !== 999 && process.startTicks !== 999)
      )
    );
    assert.equal(rows.at(-1).processes.length, 0);
  } finally {
    if (sampler) await sampler.stop();
    await fs.rm(folder, { recursive: true, force: true });
  }
});

test('ordinary wrapper forwards the original command, exact log bytes and nonzero exit', async () => {
  const folder = await fs.mkdtemp(path.join(os.tmpdir(), 'rsuite-firefox-wrapper-'));
  const npm = path.join(folder, 'npm-control.mjs');
  const root = fileURLToPath(new URL('../../', import.meta.url));
  await fs.writeFile(
    npm,
    `
console.log('CONTROL_ARGS=' + JSON.stringify(process.argv.slice(2)));
console.log('UTF8=日志☃');
console.error('original process control failure');
process.exit(Number(process.env.RSUITE_PROCESS_CONTROL_EXIT));
`
  );
  try {
    for (const code of [7, 0]) {
      const output = path.join(folder, String(code));
      const child = spawn(
        process.execPath,
        [path.join(root, 'test/browser/firefox-process/run.mjs'), '--shard=2/2'],
        {
          cwd: root,
          env: {
            ...process.env,
            npm_execpath: npm,
            BROWSER: 'firefox',
            RSUITE_FIREFOX_PROCESS_DIR: output,
            RSUITE_PROCESS_CONTROL_EXIT: String(code)
          },
          stdio: ['ignore', 'pipe', 'pipe']
        }
      );
      let logs = '';
      child.stdout.on('data', data => {
        logs += data;
      });
      child.stderr.on('data', data => {
        logs += data;
      });
      const [exit, signal] = await once(child, 'close');
      assert.equal(signal, null);
      assert.equal(exit, code || (process.platform === 'linux' ? 1 : 0), logs);
      const directories = await fs.readdir(output);
      assert.equal(directories.length, 1);
      const run = path.join(output, directories[0]);
      const summary = JSON.parse(await fs.readFile(path.join(run, 'summary.json')));
      assert.equal(summary.testsExitCode, code);
      assert.equal(summary.nativeProfilerAdded, false);
      assert.equal(summary.browserConfigurationChanged, false);
      assert.equal(summary.logBytesExpected, summary.logBytesCaptured);
      const raw = await fs.readFile(path.join(run, 'tests.log'));
      assert.equal(raw.length, summary.logBytesCaptured);
      assert(raw.toString().includes('UTF8=日志☃'));
      assert(raw.toString().includes('original process control failure'));
      assert.deepEqual(summary.arguments, [
        'run',
        'test:ci',
        '--',
        '--browser.headless',
        '--shard=2/2'
      ]);
      const events = (await fs.readFile(path.join(run, 'log-events.jsonl'), 'utf8'))
        .trim()
        .split('\n')
        .map(JSON.parse);
      let offset = 0;
      for (const event of events) {
        assert.equal(event.startOffset, offset);
        assert(event.receivedAt >= summary.startedAt && event.receivedAt <= summary.finishedAt);
        offset += event.bytes;
      }
      assert.equal(offset, raw.length);
    }
  } finally {
    await fs.rm(folder, { recursive: true, force: true });
  }
});

test('summary write failure preserves the original nonzero test exit', async () => {
  const folder = await fs.mkdtemp(path.join(os.tmpdir(), 'rsuite-firefox-summary-failure-'));
  const npm = path.join(folder, 'npm-control.mjs');
  const output = path.join(folder, 'output');
  const root = fileURLToPath(new URL('../../', import.meta.url));
  await fs.writeFile(
    npm,
    `
import fs from 'node:fs/promises';
import path from 'node:path';
const output = process.env.RSUITE_FIREFOX_PROCESS_DIR;
const [run] = await fs.readdir(output);
await fs.mkdir(path.join(output, run, 'summary.json'));
console.error('original test failure before summary write');
process.exit(7);
`
  );
  try {
    const child = spawn(
      process.execPath,
      [path.join(root, 'test/browser/firefox-process/run.mjs')],
      {
        cwd: root,
        env: {
          ...process.env,
          npm_execpath: npm,
          BROWSER: 'firefox',
          RSUITE_FIREFOX_PROCESS_DIR: output
        },
        stdio: ['ignore', 'pipe', 'pipe']
      }
    );
    let logs = '';
    child.stdout.on('data', data => {
      logs += data;
    });
    child.stderr.on('data', data => {
      logs += data;
    });
    const [exit, signal] = await once(child, 'close');
    assert.equal(signal, null);
    assert.equal(exit, 7, logs);
    assert(logs.includes('Firefox process diagnostics could not write its summary:'));
    const [run] = await fs.readdir(output);
    assert((await fs.stat(path.join(output, run, 'summary.json'))).isDirectory());
    const raw = await fs.readFile(path.join(output, run, 'tests.log'), 'utf8');
    assert(raw.includes('original test failure before summary write'));
  } finally {
    await fs.rm(folder, { recursive: true, force: true });
  }
});
