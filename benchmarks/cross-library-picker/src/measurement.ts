import type { Condition, Measurement, Snapshot } from './protocol';
import { rowHeight } from './shared';
import { optionElement, visible, visibleRows } from './geometry';

const combo = () => document.querySelector<HTMLElement>('#root [role="combobox"]');
const popup = () => document.querySelector<HTMLElement>('.benchmark-popup');

function valueFrom(element: HTMLElement | null) {
  return (
    element?.querySelector<HTMLElement>('[data-bench-value]')?.dataset.benchValue ??
    element?.dataset.benchValue ??
    element?.getAttribute('aria-label')?.match(/Item (\d+)/)?.[1] ??
    element?.textContent?.match(/Item (\d+)/)?.[1] ??
    null
  );
}

export function snapshot(): Snapshot {
  const menu = popup();
  const rows = Array.from(menu?.querySelectorAll<HTMLElement>('[data-bench-value]') ?? []);
  const painted = visibleRows(menu, rows);
  const visibleValues = painted.map(row => row.dataset.benchValue!);
  const fullyVisibleValues = painted
    .filter(row => visible(optionElement(row), menu, true))
    .map(row => row.dataset.benchValue!);
  const rowHeights = painted.map(row => optionElement(row).getBoundingClientRect().height);
  const focused = document.activeElement as HTMLElement | null;
  const ref = combo()?.getAttribute('aria-activedescendant');
  const active = ref
    ? document.getElementById(ref)
    : (focused?.closest<HTMLElement>('[role="option"]') ?? null);
  const empty = menu?.querySelector<HTMLElement>('[data-bench-empty]');
  return {
    expanded: combo()?.getAttribute('aria-expanded') === 'true',
    popupVisible: !!menu && visible(menu),
    mountedRows: rows.length,
    visibleValues,
    fullyVisibleValues,
    rowHeights,
    firstVisible: visibleValues[0] ?? null,
    activeValue: valueFrom(active),
    activeReferenceConnected: !!active?.isConnected,
    emptyVisible:
      (!!empty && visible(empty, menu)) ||
      (!!menu &&
        visible(menu) &&
        rows.length === 0 &&
        menu.textContent?.includes('No results') === true),
    selected:
      document.querySelector<HTMLElement>('[data-bench-selected]')?.dataset.benchSelected || null
  };
}

export function createMeasurement() {
  let result: Measurement = { status: 'idle' };
  let condition: Condition;
  let start = 0;
  let domReady = 0;
  let eventType = '';
  let trusted = false;
  let generation = 0;
  let settling = false;

  function readSnapshot() {
    try {
      return snapshot();
    } catch (error) {
      result = { status: 'failed', error: String(error) };
      return null;
    }
  }

  function matches(state: Snapshot) {
    if (!state.expanded || !state.popupVisible) return false;
    if (
      state.rowHeights.some(
        height => !Number.isFinite(height) || Math.abs(height - rowHeight) > 0.5
      )
    )
      return false;
    if (condition.kind === 'key') {
      return (
        state.activeReferenceConnected &&
        state.activeValue === condition.value &&
        state.fullyVisibleValues.includes(condition.value)
      );
    }
    return condition.first === null
      ? state.emptyVisible && state.visibleValues.length === 0
      : state.firstVisible === condition.first;
  }

  function check() {
    if (result.status !== 'running' || settling) return;
    const state = readSnapshot();
    if (!state) return;
    if (performance.now() - start > 10000) {
      result = {
        status: 'failed',
        error: 'Expected visible outcome did not settle: ' + JSON.stringify(state)
      };
      return;
    }
    if (!matches(state)) {
      requestAnimationFrame(check);
      return;
    }
    domReady = performance.now() - start;
    settling = true;
    const current = generation;
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (current !== generation) return;
        settling = false;
        const state = readSnapshot();
        if (!state) return;
        if (!matches(state)) return check();
        result = {
          status: 'complete',
          sample: {
            domReadyMs: domReady,
            frameReadyMs: performance.now() - start,
            eventType,
            trusted,
            snapshot: state
          }
        };
      })
    );
  }

  new MutationObserver(check).observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true
  });
  document.addEventListener('focusin', check, true);
  for (const type of ['pointerdown', 'input', 'keydown']) {
    document.addEventListener(
      type,
      event => {
        if (result.status !== 'armed' || condition.event !== event.type) return;
        if (!event.isTrusted) {
          result = { status: 'failed', error: 'Measurement requires a trusted browser event' };
          return;
        }
        start = performance.now();
        eventType = event.type;
        trusted = event.isTrusted;
        result = { status: 'running' };
        queueMicrotask(check);
      },
      true
    );
  }

  return {
    arm(next: Condition) {
      if (result.status === 'armed' || result.status === 'running')
        throw new Error('Measurement already active');
      generation++;
      settling = false;
      condition = next;
      result = { status: 'armed' };
    },
    result: () => result
  };
}
