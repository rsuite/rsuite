export function treeSnapshot() {
  const visible = node =>
    !!node.getClientRects().length &&
    getComputedStyle(node).display !== 'none' &&
    getComputedStyle(node).visibility !== 'hidden';
  const markers = [...document.querySelectorAll('[data-row-id]')];
  const region = document.querySelector('section[aria-label="Tree ledger"]');
  const table = region?.querySelector('[role="treegrid"],[role="grid"],table');
  return {
    ids: markers.filter(visible).map(node => node.dataset.rowId),
    mountedIds: markers.map(node => node.dataset.rowId),
    rootRole: table?.getAttribute('role') || (table?.tagName === 'TABLE' ? 'table' : null),
    rowCount: table?.getAttribute('aria-rowcount'),
    rows: markers.filter(visible).map(node => {
      const row = node.closest('tr,[role="row"]');
      const buttons = [...(row?.querySelectorAll('button,[role="button"]') ?? [])];
      return {
        id: node.dataset.rowId,
        level: row?.getAttribute('aria-level'),
        expanded: row?.getAttribute('aria-expanded'),
        cellExpanded: [
          ...(row?.querySelectorAll('[role="gridcell"],[role="rowheader"],td,th') ?? [])
        ]
          .map(cell => cell.getAttribute('aria-expanded'))
          .filter(value => value !== null),
        position: row?.getAttribute('aria-posinset'),
        siblings: row?.getAttribute('aria-setsize'),
        index: row?.getAttribute('aria-rowindex'),
        buttons: buttons.map(button => ({
          name:
            button.getAttribute('aria-label') ||
            (button.getAttribute('aria-labelledby') || '')
              .split(/\s+/)
              .filter(Boolean)
              .map(id => document.getElementById(id)?.textContent || '')
              .join(' ') ||
            button.textContent.trim(),
          expanded: button.getAttribute('aria-expanded'),
          tabIndex: button.tabIndex,
          html: button.outerHTML.slice(0, 1800)
        }))
      };
    })
  };
}
