import type { LedgerRow } from './types';
export function RowIdentity({ row }: { row: LedgerRow }) {
  return <span data-row-id={row.id}>{row.name}</span>;
}
export const selectionName = (row: LedgerRow) => 'Select ' + row.name;
