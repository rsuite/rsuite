import type { LedgerRow, SortState } from './types';
export const ledger: LedgerRow[] = Array.from({ length: 24 }, (_, index) => ({
  id: 'entry-' + String(index + 1).padStart(3, '0'),
  name: 'Entry ' + String(index + 1).padStart(4, '0'),
  amount: ((index + 1) * 7) % 11,
  disabled: index === 2
}));
export function compareRows(a: LedgerRow, b: LedgerRow) {
  return a.amount - b.amount || a.id.localeCompare(b.id);
}
export function ordered(rows: LedgerRow[], sort: SortState) {
  return sort
    ? [...rows].sort((a, b) => compareRows(a, b) * (sort.direction === 'ascending' ? 1 : -1))
    : rows;
}
export function toggleKey(keys: string[], key: string, checked: boolean) {
  return checked ? [...new Set([...keys, key])] : keys.filter(value => value !== key);
}
