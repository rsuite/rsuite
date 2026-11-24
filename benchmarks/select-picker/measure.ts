export type Condition =
  | { kind: 'open'; count: number }
  | { kind: 'filter'; query: string; count: number; firstValue: number | null }
  | { kind: 'key'; value: number };

export interface Snapshot {
  expanded: boolean;
  mountedRows: number;
  logicalRows: number | null;
  firstValue: string | null;
  lastValue: string | null;
  activeValue: string | null;
  activeDescendant: string | null;
}

export interface Sample extends Snapshot {
  domReadyMs: number;
  frameReadyMs: number;
  eventType: string;
  trusted: boolean;
  checks: number;
}

export interface Measurement {
  status: 'idle' | 'armed' | 'running' | 'settling' | 'complete' | 'failed';
  sample?: Sample;
  error?: string;
}

const toggle = () => document.querySelector<HTMLElement>('[role="combobox"]');
const listbox = () => document.querySelector<HTMLElement>('[role="listbox"]');
const options = () => Array.from(document.querySelectorAll<HTMLElement>('[role="option"]'));

export function snapshot(): Snapshot {
  const rows = options();
  const count = rows[0]?.getAttribute('aria-setsize');
  return {
    expanded: toggle()?.getAttribute('aria-expanded') === 'true',
    mountedRows: rows.length,
    logicalRows: count ? Number(count) : null,
    firstValue: rows[0]?.dataset.key ?? null,
    lastValue: rows.at(-1)?.dataset.key ?? null,
    activeValue: (document.activeElement as HTMLElement | null)?.dataset.key ?? null,
    activeDescendant: toggle()?.getAttribute('aria-activedescendant') ?? null
  };
}

function isPositioned(element: HTMLElement, viewport: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const frame = viewport.getBoundingClientRect();
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    rect.bottom > frame.top &&
    rect.top < frame.bottom &&
    rect.right > frame.left &&
    rect.left < frame.right &&
    rect.bottom > 0 &&
    rect.top < window.innerHeight &&
    rect.right > 0 &&
    rect.left < window.innerWidth
  );
}

function isReady(condition: Condition) {
  const state = snapshot();
  if (!state.expanded) return false;
  const popup = document.querySelector<HTMLElement>('.rs-picker-popup');
  const anchor = toggle();
  if (!popup || !anchor) return false;
  const popupRect = popup.getBoundingClientRect();
  const anchorRect = anchor.getBoundingClientRect();
  // The fixture explicitly uses bottomStart: include overlay positioning work.
  if (Math.abs(popupRect.left - anchorRect.left) > 1 || popupRect.top < anchorRect.bottom - 1) {
    return false;
  }
  const rows = options();
  const menu = listbox();

  if (condition.kind === 'key') {
    const row = rows.find(item => item.dataset.key === String(condition.value));
    const viewport = document.querySelector<HTMLElement>('.rs-virt-list');
    return (
      !!row &&
      !!viewport &&
      document.activeElement === row &&
      state.activeDescendant === row.id &&
      Number(row.getAttribute('aria-posinset')) === condition.value &&
      isPositioned(row, viewport)
    );
  }

  if (condition.kind === 'filter') {
    const input = document.querySelector<HTMLInputElement>('[role="searchbox"]');
    if (input?.value !== condition.query) return false;
    if (!condition.count) {
      return !rows.length && !!document.querySelector('.rs-picker-none');
    }
    const mark = rows[0]?.querySelector('.rs-highlight-mark');
    if (
      state.firstValue !== String(condition.firstValue) ||
      mark?.textContent?.toLowerCase() !== condition.query.toLowerCase()
    ) {
      return false;
    }
  } else if (state.firstValue !== '1') {
    return false;
  }

  return (
    !!menu && !!rows[0] && state.logicalRows === condition.count && isPositioned(rows[0], menu)
  );
}

/** Instrumentation is outside React and reads only the mounted virtual window. */
export function createMeasurement() {
  let measurement: Measurement = { status: 'idle' };
  let condition: Condition;
  let started = 0;
  let checks = 0;
  let timeout: ReturnType<typeof setTimeout>;
  let eventType = '';
  let trusted = false;
  let frameId = 0;

  const fail = (message: string) => {
    clearTimeout(timeout);
    cancelAnimationFrame(frameId);
    observer.disconnect();
    measurement = {
      status: 'failed',
      error: message + '; state=' + JSON.stringify(snapshot())
    };
  };

  const check = () => {
    if (measurement.status !== 'running') return;
    checks++;
    if (!isReady(condition)) return;
    const domReadyMs = performance.now() - started;
    const state = snapshot();
    measurement = { status: 'settling' };
    observer.disconnect();
    // Two rAF callbacks allow a rendering opportunity; this is not a paint/INP metric.
    frameId = requestAnimationFrame(() => {
      frameId = requestAnimationFrame(() => {
        if (!isReady(condition)) {
          return fail('The expected DOM/focus did not remain ready through the frame checks');
        }
        clearTimeout(timeout);
        frameId = 0;
        measurement = {
          status: 'complete',
          sample: {
            ...state,
            domReadyMs,
            frameReadyMs: performance.now() - started,
            eventType,
            trusted,
            checks
          }
        };
      });
    });
  };
  const observer = new MutationObserver(check);

  const capture = (event: Event) => {
    if (measurement.status !== 'armed') return;
    const target = event.target as HTMLElement;
    const matches =
      (condition.kind === 'open' &&
        event.type === 'click' &&
        !!target.closest('[role="combobox"]')) ||
      (condition.kind === 'filter' &&
        event.type === 'input' &&
        target.matches('[role="searchbox"]')) ||
      (condition.kind === 'key' &&
        event.type === 'keydown' &&
        (event as KeyboardEvent).key === 'ArrowDown');
    if (!matches) return;
    started = performance.now();
    eventType = event.type;
    trusted = event.isTrusted;
    if (!trusted) return fail('The measured interaction must use a trusted browser event');
    measurement = { status: 'running' };
    queueMicrotask(check);
  };
  document.addEventListener('click', capture, true);
  document.addEventListener('input', capture, true);
  document.addEventListener('keydown', capture, true);
  document.addEventListener('focusin', check, true);

  return {
    arm(next: Condition) {
      if (['armed', 'running', 'settling'].includes(measurement.status)) {
        throw new Error('A measurement is already active');
      }
      condition = next;
      checks = 0;
      measurement = { status: 'armed' };
      observer.observe(document.body, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: [
          'aria-expanded',
          'aria-activedescendant',
          'aria-setsize',
          'class',
          'style',
          'data-key'
        ]
      });
      timeout = setTimeout(() => fail('Interaction did not produce the expected DOM/focus'), 15000);
    },
    result: () => measurement
  };
}
