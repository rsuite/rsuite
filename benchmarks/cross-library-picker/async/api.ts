import type { AsyncItem } from './types';

export async function fetchItems(query: string, signal: AbortSignal): Promise<AsyncItem[]> {
  const response = await fetch('/items?query=' + encodeURIComponent(query), { signal });
  if (!response.ok) throw new Error('Search HTTP ' + response.status);
  const result: unknown = await response.json();
  if (!result || typeof result !== 'object' || !('items' in result) || !Array.isArray(result.items))
    throw new Error('Search response has no items array');
  const items = result.items as unknown[];
  if (
    items.length > 1000 ||
    items.some(
      item =>
        !item ||
        typeof item !== 'object' ||
        !('value' in item) ||
        typeof item.value !== 'string' ||
        !item.value ||
        !('label' in item) ||
        typeof item.label !== 'string' ||
        ('disabled' in item && typeof item.disabled !== 'boolean')
    )
  )
    throw new Error('Invalid search item');
  const typed = items as AsyncItem[];
  if (new Set(typed.map(item => item.value)).size !== typed.length)
    throw new Error('Duplicate search value');
  return typed;
}
