import type { Condition, Measurement, Snapshot } from './protocol';
import { rowHeight } from './shared';

const combo = () => document.querySelector<HTMLElement>('#root [role="combobox"]');
const popup = () => document.querySelector<HTMLElement>('.benchmark-popup');

function visible(element: HTMLElement, viewport?: HTMLElement | null, fully = false) {
  const rect = element.getBoundingClientRect();
  const style = getComputedStyle(element);
  if (!rect.width || !rect.height || style.visibility === 'hidden' || style.display === 'none')
    return false;
  const frame = viewport?.getBoundingClientRect();
  let top = Math.max(0, frame?.top ?? 0),
    bottom = Math.min(innerHeight, frame?.bottom ?? innerHeight);
  let left = Math.max(0, frame?.left ?? 0),
    right = Math.min(innerWidth, frame?.right ?? innerWidth);
  for (let parent = element.parentElement; parent; parent = parent.parentElement) {
    const css = getComputedStyle(parent),
      bounds = parent.getBoundingClientRect();
    if (/(auto|scroll|hidden|clip)/.test(css.overflowY)) {
      top = Math.max(top, bounds.top + parent.clientTop);
      bottom = Math.min(bottom, bounds.top + parent.clientTop + parent.clientHeight);
    }
    if (/(auto|scroll|hidden|clip)/.test(css.overflowX)) {
      left = Math.max(left, bounds.left + parent.clientLeft);
      right = Math.min(right, bounds.left + parent.clientLeft + parent.clientWidth);
    }
    if (parent === viewport) break;
  }
  return fully
    ? rect.top >= top - 0.5 &&
        rect.bottom <= bottom + 0.5 &&
        rect.left >= left - 0.5 &&
        rect.right <= right + 0.5
    : rect.bottom > top && rect.top < bottom && rect.right > left && rect.left < right;
}

function valueFrom(element: HTMLElement | null) {
  return (
    element?.querySelector<HTMLElement>('[data-bench-value]')?.dataset.benchValue ??
    element?.dataset.benchValue ??
    element?.getAttribute('aria-label')?.match(/Item (\d+)/)?.[1] ??
    element?.textContent?.match(/Item (\d+)/)?.[1] ??
    null
  );
}

function paintedRows(menu: HTMLElement | null) {
  if (!menu) return [];
  const bounds = menu.getBoundingClientRect();
  const top = Math.max(0, bounds.top + 1),
    bottom = Math.min(innerHeight, bounds.bottom - 1);
  const x = Math.max(0, Math.min(innerWidth - 1, bounds.left + bounds.width / 2));
  const found = new Set<HTMLElement>();
  for (let y = top; y < bottom; y += rowHeight / 2) {
    for (const hit of document.elementsFromPoint(x, y)) {
      if (!(hit instanceof HTMLElement) || !menu.contains(hit)) continue;
      const label =
        hit.closest<HTMLElement>('[data-bench-value]') ??
        hit
          .closest('[role="option"], .ant-select-item-option')
          ?.querySelector<HTMLElement>('[data-bench-value]');
      if (label && menu.contains(label)) found.add(label);
    }
  }
  return [...found].sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
}

export function snapshot(): Snapshot {
  const menu = popup();
  const rows = Array.from(menu?.querySelectorAll<HTMLElement>('[data-bench-value]') ?? []);
  const painted = paintedRows(menu).filter(row => visible(row, menu));
  const visibleValues = painted.map(row => row.dataset.benchValue!);
  const fullyVisibleValues = painted
    .filter(row => visible(row, menu, true))
    .map(row => row.dataset.benchValue!);
  const rowHeights = painted.map(
    row =>
      row.closest<HTMLElement>('[role="option"], .ant-select-item-option')?.getBoundingClientRect()
        .height ?? NaN
  );
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
    if (performance.now() - start > 10000) {
      result = {
        status: 'failed',
        error: 'Expected visible outcome did not settle: ' + JSON.stringify(snapshot())
      };
      return;
    }
    if (!matches(snapshot())) {
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
        const state = snapshot();
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
