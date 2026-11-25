import assert from 'node:assert/strict';
import { virtualOracle, virtualOwnership } from './virtual-oracle.mjs';

export const jumpTimingProtocol = 'trusted-click-to-visible-and-hit-testable-marker-v1';

export function validateJumpRounds(rounds) {
  assert(
    Number.isInteger(rounds) && rounds >= 4 && rounds <= 24 && rounds % 4 === 0,
    'Jump timing requires 4–24 measured rounds in multiples of four'
  );
}

export function jumpTimingCases(rounds) {
  validateJumpRounds(rounds);
  const libraries = Object.keys(virtualOwnership);
  const cases = libraries.map(library => ({ library, profile: 'pointer', round: -1 }));
  for (let round = 0; round < rounds; round++) {
    for (const offset of [0, 1, 3, 2]) {
      cases.push({
        library: libraries[(round + offset) % libraries.length],
        profile: 'pointer',
        round
      });
    }
  }
  return cases;
}

export function jumpProbeTargets(rowCount) {
  const { jumpIndex, virtualStates } = virtualOracle(rowCount);
  const jump = 'Jump row ' + jumpIndex;
  const buttons = [
    [jump, 'jump'],
    ['Jump top', 'top'],
    ['Jump end', 'end'],
    [jump, 'restored']
  ];
  return buttons.map(([button, checkpoint]) => ({
    button,
    checkpoint,
    target: virtualStates[checkpoint].target
  }));
}

// Playwright serializes this function into the page before React mounts.
export function observeVirtualJumps(targets) {
  const samples = (window.__virtualJumpSamples = []);
  const labels = new Set(targets.map(row => row.button));
  const ledgerSelector = 'section[aria-label="Virtual ledger"]';
  function observeTarget(id) {
    const ledger = document.querySelector(ledgerSelector);
    const marker = ledger?.querySelector('[data-row-id="' + id + '"]');
    if (!marker) return { visible: false, hitTestable: false };

    const box = marker.getBoundingClientRect();
    const ledgerBox = ledger.getBoundingClientRect();
    const headerBottom = Math.max(
      ledgerBox.top,
      ...Array.from(
        ledger.querySelectorAll('th,[role="columnheader"]'),
        node => node.getBoundingClientRect().bottom
      )
    );
    const clip = {
      top: Math.max(0, headerBottom),
      bottom: Math.min(innerHeight, ledgerBox.bottom),
      left: Math.max(0, ledgerBox.left),
      right: Math.min(innerWidth, ledgerBox.right)
    };
    for (
      let parent = marker.parentElement;
      parent && parent !== ledger;
      parent = parent.parentElement
    ) {
      const style = getComputedStyle(parent);
      const ancestor = parent.getBoundingClientRect();
      if (['auto', 'scroll', 'hidden', 'clip'].includes(style.overflowY)) {
        clip.top = Math.max(clip.top, ancestor.top);
        clip.bottom = Math.min(clip.bottom, ancestor.bottom);
      }
      if (['auto', 'scroll', 'hidden', 'clip'].includes(style.overflowX)) {
        clip.left = Math.max(clip.left, ancestor.left);
        clip.right = Math.min(clip.right, ancestor.right);
      }
    }

    const visible =
      box.width > 0 &&
      box.height > 0 &&
      box.top >= clip.top - 0.5 &&
      box.bottom <= clip.bottom + 0.5 &&
      box.left >= clip.left - 0.5 &&
      box.right <= clip.right + 0.5;
    const hitTestable =
      visible &&
      marker.contains(
        document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2)
      );
    return { visible, hitTestable };
  }

  document.addEventListener(
    'click',
    event => {
      const button = event.target.closest?.('button')?.textContent.trim();
      if (!labels.has(button)) return;

      const startedMs = performance.now();
      const expected = targets[samples.length];
      const pending = samples.some(sample => sample.hitTestableMs === null && !sample.error);
      const sample = {
        button,
        checkpoint: expected?.checkpoint ?? null,
        target: expected?.target ?? null,
        trusted: event.isTrusted,
        startedMs,
        alreadyVisible: expected ? observeTarget(expected.target).visible : null,
        visibleMs: null,
        visibleFrame: null,
        hitTestableMs: null,
        frames: 0
      };
      samples.push(sample);
      if (
        !expected ||
        button !== expected.button ||
        !event.isTrusted ||
        pending ||
        sample.alreadyVisible
      ) {
        sample.error = 'Unexpected input order, trust, overlap or starting target';
        return;
      }

      function frame() {
        sample.frames++;
        const state = observeTarget(sample.target);
        const observedMs = performance.now();
        if (state.visible && sample.visibleMs === null) {
          sample.visibleMs = observedMs;
          sample.visibleFrame = sample.frames;
        }
        if (state.hitTestable) {
          sample.hitTestableMs = observedMs;
        } else if (performance.now() - startedMs < 10000) {
          requestAnimationFrame(frame);
        } else {
          sample.error = 'Target was not hit-testable within the virtual action deadline';
        }
      }
      requestAnimationFrame(frame);
    },
    true
  );
}

export function assertJumpSamples(row, rowCount) {
  const expected = jumpProbeTargets(rowCount);
  const labels = new Set(expected.map(({ button }) => button));
  assert.deepEqual(
    row.events
      .filter(e => e.type === 'click' && labels.has(e.buttonText))
      .map(e => [e.buttonText, e.trusted]),
    expected.map(({ button }) => [button, true])
  );
  assert.equal(row.jumpSamples.length, expected.length);
  for (const [index, sample] of row.jumpSamples.entries()) {
    assert.deepEqual(
      { button: sample.button, checkpoint: sample.checkpoint, target: sample.target },
      expected[index]
    );
    assert.equal(sample.trusted, true);
    assert.equal(sample.alreadyVisible, false);
    assert.equal(sample.error, undefined);
    assert(Number.isFinite(sample.startedMs) && sample.startedMs >= 0);
    assert(Number.isFinite(sample.visibleMs) && sample.visibleMs >= sample.startedMs);
    assert(Number.isFinite(sample.hitTestableMs) && sample.hitTestableMs >= sample.visibleMs);
    assert(Number.isInteger(sample.visibleFrame) && sample.visibleFrame > 0);
    assert(sample.hitTestableMs - sample.startedMs <= 10000);
    assert(Number.isInteger(sample.frames) && sample.frames >= sample.visibleFrame);
    if (index > 0) assert(sample.startedMs >= row.jumpSamples[index - 1].hitTestableMs);
  }
}

function quantile(values, proportion) {
  const index = (values.length - 1) * proportion;
  const lower = Math.floor(index);
  return values[lower] + (values[Math.ceil(index)] - values[lower]) * (index - lower);
}

export function summarizeJumpTimings(cases) {
  const groups = new Map();
  for (const row of cases.filter(row => row.round >= 0)) {
    for (const time of row.jumpSamples) {
      const key = [row.browser, row.library, time.checkpoint].join('/');
      if (!groups.has(key)) groups.set(key, { visible: [], hitTestable: [] });
      groups.get(key).visible.push(time.visibleMs - time.startedMs);
      groups.get(key).hitTestable.push(time.hitTestableMs - time.startedMs);
    }
  }
  function summarize(measurements) {
    const sorted = measurements.sort((left, right) => left - right);
    return {
      count: sorted.length,
      minMs: sorted[0],
      p25Ms: quantile(sorted, 0.25),
      medianMs: quantile(sorted, 0.5),
      p75Ms: quantile(sorted, 0.75),
      maxMs: sorted.at(-1)
    };
  }
  return Object.fromEntries(
    [...groups.entries()].map(([key, measurements]) => [
      key,
      { visible: summarize(measurements.visible), hitTestable: summarize(measurements.hitTestable) }
    ])
  );
}
