import assert from 'node:assert/strict';
import { test } from 'node:test';
import { states, summarize } from './report.mjs';

function report() {
  const scenario = 'nested-validation';
  const checkpoints = states[scenario];
  const box = { left: 16, right: 60, width: 44, height: 44 };
  return {
    complete: true,
    config: { direction: 'ltr' },
    cases: [
      {
        scenario,
        status: 'completed',
        submitMode: 'touch',
        direction: 'ltr',
        directionLayout: {
          document: 'ltr',
          form: 'ltr',
          fieldDirections: [{ name: 'profile.email', direction: 'ltr' }],
          actions: [
            { text: 'Submit', ...box },
            { text: 'Reset', ...box, left: 72, right: 116 }
          ],
          viewportWidth: 320
        },
        states: checkpoints.map(name => ({ name, state: { invalidReferences: [] } })),
        touch: {
          width: 320,
          layouts: ['initial', ...checkpoints].map(name => ({
            name,
            viewportWidth: 320,
            scrollWidth: 320,
            visualWidth: 320,
            scale: 1,
            touchPoints: 0,
            controls: [
              'field',
              'field',
              'field',
              'field',
              'field',
              'button',
              'button',
              'toggle'
            ].map(kind => ({ kind, ...box }))
          })),
          actions: 2,
          events: ['touchstart', 'touchend', 'touchstart', 'touchend'].map(type => ({
            type,
            trusted: true
          }))
        }
      }
    ]
  };
}

test('accepts a completed workflow with complete touch and layout measurements', () => {
  assert.equal(summarize(report(), 1).exitCode, 0);
});

test('fails completed workflows with missing measurements or invalid touch evidence', () => {
  for (const mutate of [
    row => row.touch.events.pop(),
    row => (row.touch.events[2].trusted = false),
    row => row.touch.layouts.pop(),
    row => (row.touch.layouts[1].viewportWidth = 980),
    row => (row.touch.layouts[1].scrollWidth = 335),
    row => (row.touch.layouts[1].controls[0].right = 330),
    row => (row.touch.layouts[1].controls[0].height = 32)
  ]) {
    const data = report();
    mutate(data.cases[0]);
    assert.equal(summarize(data, 1).exitCode, 1);
  }
});
