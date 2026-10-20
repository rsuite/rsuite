export function lifecycleSnapshot() {
  const section = document.querySelector('section[aria-label="Lifecycle ledger"]');
  const visible = node => {
    const b = node.getBoundingClientRect();
    if (b.width <= 0 || b.height <= 0) return false;
    for (let p = node; p; p = p.parentElement) {
      const s = getComputedStyle(p);
      if (s.display === 'none' || s.visibility !== 'visible' || Number(s.opacity) === 0)
        return false;
    }
    return true;
  };
  const indicators = selector =>
    [...section.querySelectorAll(selector)].map(node => ({
      text: node.textContent,
      visible: visible(node)
    }));
  return {
    lifecycle: {
      phase: document.querySelector('[data-app-phase]')?.dataset.appPhase,
      statusText: document.querySelector('[data-app-phase]')?.textContent,
      statusRole: document.querySelector('[data-app-phase]')?.getAttribute('role'),
      loadingIndicators: indicators('[data-loading-indicator]'),
      emptyIndicators: indicators('[data-empty-indicator]'),
      nativeBusy: [...section.querySelectorAll('[aria-busy]')].map(node => ({
        tag: node.tagName,
        role: node.getAttribute('role'),
        value: node.getAttribute('aria-busy'),
        visible: visible(node)
      })),
      scope:
        'Application phase/status and selection clearing are explicit. Native busy attributes observed separately; no AT conformance claim.'
    }
  };
}
