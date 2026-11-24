import type { LedgerRow } from '../types';
import type { Phase } from './types';
const createRows = (offset: number): LedgerRow[] =>
  Array.from({ length: 3 }, (_, index) => ({
    id: 'entry-' + String(offset + index).padStart(3, '0'),
    name: (offset ? 'Recovered ' : 'Original ') + (index + 1),
    amount: (index + 1) * 10,
    disabled: false
  }));
export const initialRows = createRows(0);
export const recoveredRows = createRows(100);
export const rowsForPhase = (phase: Phase) =>
  phase === 'loaded' ? initialRows : phase === 'recovered' ? recoveredRows : [];
export const phaseText: Record<Phase, string> = {
  loaded: 'Loaded 3 entries',
  loading: 'Loading entries',
  empty: 'No entries',
  recovered: 'Recovered 3 entries'
};
