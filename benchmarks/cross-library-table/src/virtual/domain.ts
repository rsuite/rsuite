import type { LedgerRow } from '../types';
export const ROW_HEIGHT = 40;
export const BODY_HEIGHT = 400;
export const HEADER_HEIGHT = 40;
export const rows: LedgerRow[] = Array.from({ length: 10000 }, (_, index) => ({
  id: 'entry-' + String(index).padStart(5, '0'),
  name: 'Record ' + index,
  amount: index,
  disabled: false
}));
