import { snapshot } from '../src/measurement';
import type { AsyncItem } from './types';

export function componentSnapshot(items: AsyncItem[]) {
  const result = snapshot();
  const combo = document.querySelector<HTMLElement>('#root [role="combobox"]');
  const reference = combo?.getAttribute('aria-activedescendant');
  const active = reference
    ? document.getElementById(reference)
    : document.activeElement?.closest('[role="option"]');
  const label = active?.getAttribute('aria-label') ?? active?.textContent?.trim();
  // Virtual accessibility rows may expose only text, rather than the painted row marker.
  const activeValue = result.activeValue ?? items.find(item => item.label === label)?.value ?? null;
  const idReferenceFailures: string[] = [];
  for (const attribute of ['aria-activedescendant', 'aria-controls']) {
    if (attribute === 'aria-controls' && !result.expanded) continue;
    for (const id of (combo?.getAttribute(attribute) ?? '').split(/\s+/).filter(Boolean))
      if (!document.getElementById(id)) idReferenceFailures.push(attribute + ':' + id);
  }
  return { ...result, activeValue, idReferenceFailures };
}
