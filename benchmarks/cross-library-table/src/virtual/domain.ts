import type { LedgerRow } from '../types';
import { virtualRowId } from './workload.mjs';
export const ROW_HEIGHT = 40;
export const BODY_HEIGHT = 400;
export const HEADER_HEIGHT = 40;
export function createRows(rowCount: number): LedgerRow[] {
  return Array.from({ length: rowCount }, (_, index) => ({
    id: virtualRowId(index),
    name: 'Record ' + index,
    amount: index,
    disabled: false
  }));
}
