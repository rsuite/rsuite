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
      clipping
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
      selectedRowMounted: rows.some(row => row.id === 'entry-09000'),
      scope:
        'Mounted rows include native focused-row persistence. Visible means inside clipping ancestors below column headers; no unmount/performance claim.'
    }
  };
}
