export function virtualSnapshot() {
  const section = document.querySelector('section[aria-label="Virtual ledger"]');
  const box = section.getBoundingClientRect();
  const headerBottom = Math.max(
    box.top,
    ...[...section.querySelectorAll('th,[role="columnheader"]')].map(
      n => n.getBoundingClientRect().bottom
    )
  );
  const rect = b => ({
    top: b.top,
    bottom: b.bottom,
    left: b.left,
    right: b.right,
    width: b.width,
    height: b.height
  });
  const screenViewport = { width: innerWidth, height: innerHeight };
  const wholeRowGeometry = marker => {
    const row = marker.closest('[data-virtual-row-id],tr,[role="row"]');
    if (!row) throw new Error('Missing public row container for ' + marker.dataset.rowId);
    const b = row.getBoundingClientRect();
    const clip = {
      top: Math.max(0, box.top, headerBottom),
      bottom: Math.min(box.bottom, screenViewport.height),
      left: Math.max(0, box.left),
      right: Math.min(box.right, screenViewport.width)
    };
    const clipping = [];
    for (let p = row.parentElement; p && p !== section; p = p.parentElement) {
      const style = getComputedStyle(p);
      const a = p.getBoundingClientRect();
      const scrollport = {
        top: a.top + p.clientTop,
        bottom: a.top + p.clientTop + p.clientHeight,
        left: a.left + p.clientLeft,
        right: a.left + p.clientLeft + p.clientWidth,
        width: p.clientWidth,
        height: p.clientHeight
      };
      if (['auto', 'scroll', 'hidden', 'clip'].includes(style.overflowY)) {
        clip.top = Math.max(clip.top, scrollport.top);
        clip.bottom = Math.min(clip.bottom, scrollport.bottom);
        clipping.push({ tag: p.tagName, axis: 'y', rect: scrollport });
      }
      if (['auto', 'scroll', 'hidden', 'clip'].includes(style.overflowX)) {
        clip.left = Math.max(clip.left, scrollport.left);
        clip.right = Math.min(clip.right, scrollport.right);
        clipping.push({ tag: p.tagName, axis: 'x', rect: scrollport });
      }
    }
    return {
      rowRect: rect(b),
      rowClip: clip,
      rowClipping: clipping,
      rowFullyVisible:
        b.width > 0 &&
        b.height > 0 &&
        b.top >= clip.top - 0.5 &&
        b.bottom <= clip.bottom + 0.5 &&
        b.left >= clip.left - 0.5 &&
        b.right <= clip.right + 0.5
    };
  };
  const rows = [...section.querySelectorAll('[data-row-id]')].map(node => {
    const b = node.getBoundingClientRect();
    let top = Math.max(box.top, headerBottom),
      bottom = box.bottom,
      left = box.left,
      right = box.right;
    const clipping = [];
    for (let p = node.parentElement; p && p !== section; p = p.parentElement) {
      const style = getComputedStyle(p),
        a = p.getBoundingClientRect();
      if (['auto', 'scroll', 'hidden', 'clip'].includes(style.overflowY)) {
        top = Math.max(top, a.top);
        bottom = Math.min(bottom, a.bottom);
        clipping.push({ tag: p.tagName, axis: 'y', rect: rect(a) });
      }
      if (['auto', 'scroll', 'hidden', 'clip'].includes(style.overflowX)) {
        left = Math.max(left, a.left);
        right = Math.min(right, a.right);
      }
    }
    return {
      id: node.dataset.rowId,
      rect: rect(b),
      clip: { top, bottom, left, right },
      visible:
        b.width > 0 &&
        b.height > 0 &&
        b.top >= top - 0.5 &&
        b.bottom <= bottom + 0.5 &&
        b.left >= left - 0.5 &&
        b.right <= right + 0.5,
      clipping,
      ...wholeRowGeometry(node)
    };
  });
  return {
    checkboxes: [...document.querySelectorAll('input[type="checkbox"],[role="checkbox"]')].map(
      node => {
        const row = node.closest('[data-virtual-row-id],tr,[role="row"]');
        return {
          kind: node instanceof HTMLInputElement ? 'input' : 'aria-checkbox',
          rowId:
            row?.dataset.virtualRowId ?? row?.querySelector('[data-row-id]')?.dataset.rowId ?? null,
          name: node.getAttribute('aria-label'),
          checked:
            node instanceof HTMLInputElement
              ? node.checked
              : node.getAttribute('aria-checked') === 'true',
          disabled: node.disabled === true || node.getAttribute('aria-disabled') === 'true'
        };
      }
    ),
    virtual: {
      viewport: rect(box),
      headerBottom,
      rows,
      rendered: rows.length,
      geometryVersion: 1,
      screenViewport,
      fullyVisibleRows: rows.filter(row => row.rowFullyVisible).length,
      selectedRowMounted: rows.some(row => row.id === 'entry-09000'),
      scope:
        'Mounted rows include native focused-row persistence. visible measures the identity marker; rowFullyVisible measures the whole row border box inside client scrollports and the browser viewport below column headers. No unmount/performance/occlusion-conformance claim.'
    }
  };
}
