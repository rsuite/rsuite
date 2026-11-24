import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import crypto from 'node:crypto';
import { hasMarker, markerPrefix } from './collector.mjs';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const directory = path.join(root, 'artifacts/firefox-profile');

test('native Firefox preserves passing results and captures the first original failure before cleanup', async () => {
  await fs.mkdir(directory, { recursive: true });
  const output = await fs.mkdtemp(path.join(directory, 'controls-'));
  const observations = [];
  try {
    for (const fail of [false, true]) {
      const base = path.join(output, fail ? 'failure' : 'passing');
      await fs.mkdir(base);
      const env = {
        ...process.env,
        RUN_ENV: 'test',
        RSUITE_FIREFOX_PROFILE_DIR: base,
        F: 'test/browser/firefox-profile/fixtures/collector.fixture.tsx',
        MOZ_PROFILER_STARTUP_FEATURES_BITFIELD: '1',
        MOZ_PROFILER_SHUTDOWN: path.join(base, 'unexpected-shutdown.json'),
        VITE_RSUITE_PROFILE_CONTROL_FAIL: fail ? '1' : '0'
      };
      delete env.M;
      const child = spawn(
        process.execPath,
        [
          path.join(root, 'test/browser/firefox-profile/run.mjs'),
          'test/browser/firefox-profile/fixtures/collector.fixture.tsx',
          '--reporter=default',
          '--reporter=json',
          '--outputFile=' + path.join(base, 'results.json')
        ],
        { cwd: root, env, stdio: ['ignore', 'pipe', 'pipe'] }
      );
      let log = '';
      child.stdout.on('data', data => {
        log += data.toString();
      });
      child.stderr.on('data', data => {
        log += data.toString();
      });
      const [exit, signal] = await once(child, 'close');
      await fs.writeFile(path.join(base, 'launcher.log'), log);
      assert.equal(signal, null);
      assert.equal(exit, fail ? 1 : 0, log);
      const runs = (await fs.readdir(base)).filter(name => name.startsWith('run-'));
      assert.equal(runs.length, 1);
      const run = path.join(base, runs[0]);
      const summary = JSON.parse(await fs.readFile(path.join(run, 'summary.json')));
      await assert.rejects(fs.stat(path.join(base, 'unexpected-shutdown.json')), {
        code: 'ENOENT'
      });
      assert.equal(summary.testsExitCode, exit);
      assert(!summary.runnerError, log);
      assert(!summary.cleanupErrors, log);
      assert(summary.browserExitCode !== null || summary.browserExitSignal !== null, log);
      const cases = JSON.parse(await fs.readFile(path.join(base, 'results.json')));
      assert.equal(cases.numTotalTests, 2);
      assert.equal(cases.numPendingTests, 0);
      assert.equal(cases.numFailedTests, fail ? 2 : 0);
      if (fail) {
        assert(log.includes('intentional collector control failure'), log);
        assert.equal(summary.capture.status, 'captured', log);
        const raw = await fs.readFile(path.join(run, summary.capture.file));
        assert.equal(crypto.createHash('sha256').update(raw).digest('hex'), summary.capture.sha256);
        const profile = JSON.parse(raw);
        assert(hasMarker(profile, markerPrefix + summary.capture.test.id));
        assert(hasMarker(profile, 'rsuite-firefox-profile:fixture:1'));
        assert.equal(hasMarker(profile, 'rsuite-firefox-profile:fixture:2'), false);
        assert.equal(summary.capture.test.name, 'retains the original assertion 1');
        assert(profile.meta.configuration.capacity >= 16777216);
        assert.deepEqual(profile.meta.configuration.features, ['js', 'stackwalk']);
        assert(cases.testResults[0].assertionResults.every(result => result.status === 'failed'));
      } else {
        assert.equal(summary.capture.status, 'not-requested');
        assert.equal(cases.numPassedTests, 2);
      }
      observations.push({ fail, exit, summary });
    }
  } finally {
    await fs.writeFile(
      path.join(output, 'control-results.json'),
      JSON.stringify(observations, null, 2) + '\n'
    );
    console.info('[Firefox profile control artifacts]', output);
  }
});
