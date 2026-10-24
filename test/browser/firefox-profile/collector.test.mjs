import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  createCollector,
  hasMarker,
  markerPrefix,
  validateTrigger,
  waitForProfile
} from './collector.mjs';

const marker = id => ({
  threads: [
    {
      name: 'GeckoMain',
      processType: 'tab',
      markers: {
        schema: { data: 1 },
        data: [[0], [0, { type: 'UserTiming', name: markerPrefix + id }]]
      }
    }
  ]
});

test('rejects config overrides before creating an artifact directory or launching a browser', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'rsuite-profile-arguments-'));
  const output = path.join(directory, 'unused');
  try {
    for (const argument of ['--config=other.mts', '-cother.mts']) {
      const child = spawnSync(
        process.execPath,
        [fileURLToPath(new URL('./run.mjs', import.meta.url)), argument],
        { encoding: 'utf8', env: { ...process.env, RSUITE_FIREFOX_PROFILE_DIR: output } }
      );
      assert.equal(child.status, 1);
      assert.match(child.stderr, /configuration is fixed/);
    }
    await assert.rejects(fs.stat(output), { code: 'ENOENT' });
  } finally {
    await fs.rm(directory, { recursive: true });
  }
});

test('requires the exact content-process marker, including nested child profiles', () => {
  assert.equal(
    hasMarker({ processes: [{ processes: [marker('first')] }] }, markerPrefix + 'first'),
    true
  );
  assert.equal(hasMarker(marker('second'), markerPrefix + 'first'), false);
  const parent = marker('first');
  parent.threads[0].processType = 'default';
  assert.equal(hasMarker(parent, markerPrefix + 'first'), false);
  assert.equal(hasMarker({ threads: [null], processes: 'invalid' }, markerPrefix + 'first'), false);
});

test('rejects identities that could escape the owned profile directory', () => {
  for (const value of [
    null,
    {},
    { id: '../other', name: 'case' },
    { id: 'x'.repeat(257), name: 'case' }
  ]) {
    assert.throws(() => validateTrigger(value), /identity/);
  }
  assert.deepEqual(validateTrigger({ id: '-123_0', name: 'case', pid: 1 }), {
    id: '-123_0',
    name: 'case'
  });
});

test('waits past partial and parent-only exports for an aggregated content profile', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'rsuite-profile-reader-'));
  const file = path.join(directory, 'profile.json');
  try {
    await fs.writeFile(file, '{');
    const pending = waitForProfile(file, markerPrefix + 'first', 1000);
    await fs.writeFile(file, JSON.stringify({ threads: [], processes: [] }));
    await new Promise(resolve => setTimeout(resolve, 50));
    await fs.writeFile(file, JSON.stringify({ processes: [marker('first')] }));
    const captured = await pending;
    assert.equal(hasMarker(captured.profile, markerPrefix + 'first'), true);
  } finally {
    await fs.rm(directory, { recursive: true });
  }
});

test('bounds a missing-frame capture instead of accepting an unrelated profile', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'rsuite-profile-missing-'));
  try {
    const file = path.join(directory, 'profile.json');
    await fs.writeFile(file, JSON.stringify(marker('other')));
    await assert.rejects(waitForProfile(file, markerPrefix + 'first', 50), /timed out/);
  } finally {
    await fs.rm(directory, { recursive: true });
  }
});

test('signals only the owned handle once and retains the first failure identity', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'rsuite-profile-collector-'));
  const signals = [];
  const browserProcess = {
    pid: 123,
    exitCode: null,
    signalCode: null,
    kill(signal) {
      signals.push(signal);
      return true;
    }
  };
  const collector = await createCollector({ browserProcess, directory });
  try {
    const invalid = await fetch(collector.url, {
      method: 'POST',
      body: JSON.stringify({ id: '../other', name: 'case' })
    });
    assert.equal(invalid.status, 500);
    assert.deepEqual(signals, []);
    assert.equal(collector.state.status, 'not-requested');
    const request = async id => {
      const response = await fetch(collector.url, {
        method: 'POST',
        body: JSON.stringify({ id, name: id })
      });
      return response.json();
    };
    await fs.writeFile(path.join(directory, 'profile_0_123.json'), JSON.stringify(marker('first')));
    const first = await request('first');
    const second = await request('second');
    assert.equal(first.capturedTestId, 'first');
    assert.equal(second.capturedTestId, 'first');
    assert.deepEqual(signals, ['SIGUSR2']);
    assert.equal(collector.state.status, 'captured');
    assert.equal(collector.state.test.id, 'first');
    assert(!JSON.stringify(collector.state).includes(collector.url));
  } finally {
    await collector.close();
    await fs.rm(directory, { recursive: true });
  }
});

test('keeps a capture error separate and does not signal an exited process', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'rsuite-profile-exited-'));
  let signaled = false;
  const collector = await createCollector({
    directory,
    browserProcess: {
      pid: 123,
      exitCode: 0,
      signalCode: null,
      kill() {
        signaled = true;
      }
    }
  });
  try {
    const response = await fetch(collector.url, {
      method: 'POST',
      body: JSON.stringify({ id: 'first', name: 'case' })
    });
    assert.equal(response.status, 500);
    assert.equal(collector.state.status, 'error');
    assert.equal(signaled, false);
  } finally {
    await collector.close();
    await fs.rm(directory, { recursive: true });
  }
});

test('redacts HTTP error details while retaining local capture diagnostics', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'rsuite-profile-private-error-'));
  const details = 'Private browser diagnostic at ' + directory;
  let attempts = 0;
  const collector = await createCollector({
    directory,
    browserProcess: {
      pid: 123,
      exitCode: null,
      signalCode: null,
      kill() {
        attempts++;
        throw new Error(details);
      }
    }
  });
  try {
    for (const id of ['first', 'second']) {
      const response = await fetch(collector.url, {
        method: 'POST',
        body: JSON.stringify({ id, name: id })
      });
      assert.equal(response.status, 500);
      const body = await response.json();
      assert.deepEqual(body, {
        ok: false,
        error: 'Native profile capture failed; see summary.json'
      });
      assert(!JSON.stringify(body).includes(directory));
      assert(!JSON.stringify(body).includes('Private browser diagnostic'));
    }
    assert.equal(attempts, 1);
    assert.equal(collector.state.status, 'error');
    assert(collector.state.error.includes(details));
    assert.equal(collector.state.test.id, 'first');
  } finally {
    await collector.close();
    await fs.rm(directory, { recursive: true });
  }
});
