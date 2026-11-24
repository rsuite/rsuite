import test from 'node:test';
import assert from 'node:assert/strict';
import { states, summarize } from './report.mjs';
const clean = () => ({
  complete: true,
  config: { direction: 'ltr' },
  cases: [
    {
      scenario: 'nested-validation',
      status: 'completed',
      direction: 'ltr',
      directionLayout: {
        document: 'ltr',
        form: 'ltr',
        fieldDirections: [{ name: 'profile.email', direction: 'ltr' }],
        viewportWidth: 1280,
        actions: [
          { text: 'Submit', left: 40, right: 80, width: 40, height: 40 },
          { text: 'Reset', left: 90, right: 130, width: 40, height: 40 }
        ]
      },
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
    r => (r.cases[0].directionLayout.form = 'rtl'),
    r => (r.cases[0].directionLayout.fieldDirections[0].direction = 'rtl'),
    r => (r.cases[0].directionLayout.actions[0].left = -1),
    r => r.cases[0].directionLayout.actions.reverse(),
    r => (r.cases[0].states[0].state = { invalidReferences: ['missing-description'] })
  ]) {
    const report = clean();
    mutate(report);
    assert.equal(summarize(report, 1).exitCode, 1);
  }
  assert.equal(summarize(clean(), 1).exitCode, 0);
});

test('RTL requires the mirrored position of the same visible actions', () => {
  const report = clean();
  report.config.direction = 'rtl';
  const row = report.cases[0];
  row.direction = 'rtl';
  row.directionLayout.document = 'rtl';
  row.directionLayout.form = 'rtl';
  row.directionLayout.fieldDirections[0].direction = 'rtl';
  assert.equal(summarize(report, 1).exitCode, 1);
  const [submit, reset] = row.directionLayout.actions;
  submit.left = 90;
  submit.right = 130;
  reset.left = 40;
  reset.right = 80;
  assert.equal(summarize(report, 1).exitCode, 0);
});
