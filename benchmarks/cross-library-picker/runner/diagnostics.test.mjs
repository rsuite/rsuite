import assert from 'node:assert/strict';
import { test } from 'node:test';
import { captureFailureArtifacts } from './diagnostics.mjs';

const original = 'TimeoutError: page.goto: Timeout 12000ms exceeded.';
const failure = () => ({ status: 'failed', error: original, screenshot: 'failure.png' });
const never = () => new Promise(() => {});

test('captures available artifacts and preserves the primary failure', async () => {
  const record = failure();
  const payload = { snapshot: { expanded: true }, measurement: { status: 'idle' } };
  const result = await captureFailureArtifacts(
    { screenshot: async () => {}, evaluate: async () => payload },
    record
  );
  assert.equal(result, record);
  assert.equal(result.error, original);
  assert.equal(result.status, 'failed');
  assert.equal(result.screenshotCaptured, true);
  assert.equal(result.diagnosticStatus, 'captured');
  assert.deepEqual(result.diagnostic, payload);
});

test('a stalled snapshot cannot hold the failure report open', { timeout: 1000 }, async () => {
  const result = await captureFailureArtifacts(
    { screenshot: async () => {}, evaluate: never },
    failure(),
    { timeoutMs: 15 }
  );
  assert.equal(result.error, original);
  assert.equal(result.screenshotCaptured, true);
  assert.equal(result.diagnosticStatus, 'failed');
  assert.match(result.diagnosticError, /Failure snapshot exceeded 15ms/);
});

test('a stalled screenshot still permits snapshot collection', { timeout: 1000 }, async () => {
  const result = await captureFailureArtifacts(
    { screenshot: never, evaluate: async () => ({ snapshot: 'available' }) },
    failure(),
    { timeoutMs: 15 }
  );
  assert.equal(result.error, original);
  assert.equal(result.screenshotCaptured, false);
  assert.match(result.screenshotError, /Failure screenshot exceeded 15ms/);
  assert.equal(result.diagnosticStatus, 'captured');
});

test('artifact errors stay distinct from the primary error', async () => {
  const result = await captureFailureArtifacts(
    {
      screenshot: () => {
        throw new Error('screenshot unavailable');
      },
      evaluate: async () => {
        throw new Error('context unavailable');
      }
    },
    failure()
  );
  assert.equal(result.error, original);
  assert.match(result.screenshotError, /screenshot unavailable/);
  assert.match(result.diagnosticError, /context unavailable/);
});

test('two stalled artifacts still yield the original failed case', { timeout: 1000 }, async () => {
  const result = await captureFailureArtifacts({ screenshot: never, evaluate: never }, failure(), {
    timeoutMs: 15
  });
  assert.equal(result.status, 'failed');
  assert.equal(result.error, original);
  assert.equal(result.screenshot, 'failure.png');
  assert.equal(result.screenshotCaptured, false);
  assert.equal(result.diagnosticStatus, 'failed');
});
