export function snapshot() {
  const brokenReferences = [],
    duplicateIds = [],
    counts = new Map();
  for (const node of document.querySelectorAll('[id]'))
    counts.set(node.id, (counts.get(node.id) || 0) + 1);
  for (const [id, count] of counts) if (count > 1) duplicateIds.push({ id, count });
  for (const node of document.querySelectorAll('*'))
    for (const attribute of [
      'aria-labelledby',
      'aria-describedby',
      'aria-errormessage',
      'aria-controls',
      'aria-activedescendant',
      'aria-owns'
    ])
      for (const id of (node.getAttribute(attribute) || '').trim().split(/\s+/).filter(Boolean))
        if (!document.getElementById(id))
          brokenReferences.push({ tag: node.tagName, attribute, id });
  return {
    ids: [...document.querySelectorAll('[data-row-id]')].map(node => node.dataset.rowId),
    selected: document.querySelector('output')?.textContent,
    checkboxes: [...document.querySelectorAll('input[type="checkbox"],[role="checkbox"]')].map(
      node => ({
        kind: node instanceof HTMLInputElement ? 'input' : 'aria-checkbox',
        rowId:
          node.closest('tr,[role="row"]')?.querySelector('[data-row-id]')?.dataset.rowId ?? null,
        name: node.getAttribute('aria-label'),
        checked:
          node instanceof HTMLInputElement
            ? node.checked
            : node.getAttribute('aria-checked') === 'true',
        disabled: node.disabled === true || node.getAttribute('aria-disabled') === 'true'
      })
    ),
    headers: [...document.querySelectorAll('[role="columnheader"],th')].map(node => ({
      text: node.textContent,
      sort: node.getAttribute('aria-sort'),
      tabIndex: node.tabIndex
    })),
    focus: document.activeElement?.outerHTML.slice(0, 3000),
    brokenReferences,
    duplicateIds
  };
}
