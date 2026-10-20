import test from 'node:test';
import assert from 'node:assert/strict';
import { states, summarize } from './report.mjs';
const clean = () => ({
  complete: true,
  cases: [
    {
      scenario: 'nested-validation',
      status: 'completed',
      states: states['nested-validation'].map(name => ({ name })),
      browserErrors: []
    }
  ]
});
test('failed, incomplete, duplicated or missing form checkpoints cannot pass', () => {
  for (const mutate of [
    r => (r.complete = false),
    r => r.cases.pop(),
    r => (r.cases[0].status = 'failed'),
    r => r.cases[0].states.pop(),
    r => (r.cases[0].states[1].name = r.cases[0].states[0].name),
    r => r.cases[0].browserErrors.push('runtime failure'),
    r => (r.error = 'server failure'),
    r => (r.cases[0].states[0].state = { invalidReferences: ['missing-description'] })
  ]) {
    const report = clean();
    mutate(report);
    assert.equal(summarize(report, 1).exitCode, 1);
  }
  assert.equal(summarize(clean(), 1).exitCode, 0);
});
