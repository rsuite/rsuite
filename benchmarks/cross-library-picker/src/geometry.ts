import { rowHeight } from './shared';

export const optionElement = (label: HTMLElement) =>
  label.closest<HTMLElement>('[role="option"], .ant-select-item-option') ?? label;

export function visible(element: HTMLElement, viewport?: HTMLElement | null, fully = false) {
  const rect = element.getBoundingClientRect();
  const style = getComputedStyle(element);
  if (
    !rect.width ||
    !rect.height ||
    style.visibility === 'hidden' ||
    style.display === 'none' ||
    Number(style.opacity) === 0
  )
    return false;
  const frame = viewport?.getBoundingClientRect();
  let top = Math.max(0, frame?.top ?? 0),
    bottom = Math.min(innerHeight, frame?.bottom ?? innerHeight);
  let left = Math.max(0, frame?.left ?? 0),
    right = Math.min(innerWidth, frame?.right ?? innerWidth);
  let checkClipping = true;
  for (let parent = element.parentElement; parent; parent = parent.parentElement) {
    const css = getComputedStyle(parent);
    // Opacity also composes through ancestors outside the clipping viewport.
    if (Number(css.opacity) === 0) return false;
    if (!checkClipping) continue;
    const bounds = parent.getBoundingClientRect();
    if (/(auto|scroll|hidden|clip)/.test(css.overflowY)) {
      top = Math.max(top, bounds.top + parent.clientTop);
      bottom = Math.min(bottom, bounds.top + parent.clientTop + parent.clientHeight);
    }
    if (/(auto|scroll|hidden|clip)/.test(css.overflowX)) {
      left = Math.max(left, bounds.left + parent.clientLeft);
      right = Math.min(right, bounds.left + parent.clientLeft + parent.clientWidth);
    }
    if (parent === viewport) checkClipping = false;
  }
  return fully
    ? rect.top >= top - 0.5 &&
        rect.bottom <= bottom + 0.5 &&
        rect.left >= left - 0.5 &&
        rect.right <= right + 0.5
    : rect.bottom > top && rect.top < bottom && rect.right > left && rect.left < right;
}

export function visibleRows(menu: HTMLElement | null, rows: HTMLElement[]) {
  if (!menu || !rows.length || !visible(menu)) return [];
  let candidates = rows;
  if (rows.length > 128) {
    // Ordinary lists follow DOM order with the fixture's uniform row pitch. Probe
    // three positions before indexing, avoiding a geometry scan of 50k options.
    const first = optionElement(rows[0]).getBoundingClientRect();
    if (!first.width || Math.abs(first.height - rowHeight) > 0.5) return [];
    const last = optionElement(rows[rows.length - 1]).getBoundingClientRect();
    const middleIndex = Math.floor(rows.length / 2);
    const middle = optionElement(rows[middleIndex]).getBoundingClientRect();
    const pitch = (last.top - first.top) / (rows.length - 1);
    if (
      !Number.isFinite(pitch) ||
      Math.abs(pitch - rowHeight) > 0.5 ||
      Math.abs(middle.top - first.top - middleIndex * pitch) > 0.5
    ) {
      const error = new Error('Expected a uniform, DOM-ordered ordinary list');
      try {
        const rect = (value: DOMRect) => ({
          top: value.top,
          right: value.right,
          bottom: value.bottom,
          left: value.left,
          width: value.width,
          height: value.height
        });
        const style = getComputedStyle(menu);
        error.message +=
          ': ' +
          JSON.stringify({
            rowCount: rows.length,
            expectedRowHeight: rowHeight,
            middleIndex,
            pitch: Number.isFinite(pitch) ? pitch : String(pitch),
            pitchDeviation: Math.abs(pitch - rowHeight),
            middleDeviation: Math.abs(middle.top - first.top - middleIndex * pitch),
            probes: { first: rect(first), middle: rect(middle), last: rect(last) },
            afterGuard: {
              at: performance.now(),
              menu: rect(menu.getBoundingClientRect()),
              transform: style.transform.slice(0, 240),
              animationName: style.animationName.slice(0, 240),
              animations: menu
                .getAnimations()
                .slice(0, 8)
                .map(animation => ({
                  playState: animation.playState,
                  currentTime: String(animation.currentTime).slice(0, 80)
                }))
            },
            scope:
              'Probes retain the exact guard operands; afterGuard is collected after the predicate, not an atomic animation snapshot.'
          });
      } catch (contextError) {
        error.message += ': ' + JSON.stringify({ contextError: String(contextError) });
      }
      throw error;
    }
    const bounds = menu.getBoundingClientRect();
    const top = Math.max(0, bounds.top),
      bottom = Math.min(innerHeight, bounds.bottom);
    const start = Math.max(0, Math.floor((top - first.top) / pitch) - 1);
    candidates = rows.slice(start, start + Math.ceil(Math.max(0, bottom - top) / pitch) + 4);
  }
  // Virtualizers may disable pointer hit testing while continuing to paint rows.
  // Geometry and clipping must therefore remain independent of pointer-events.
  return candidates
    .filter(row => visible(optionElement(row), menu))
    .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
}
