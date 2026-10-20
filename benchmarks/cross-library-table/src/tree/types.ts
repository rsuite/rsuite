import type { LedgerRow } from '../types';
export interface TreeRow extends LedgerRow {
  children?: TreeRow[];
}
export interface TreeAdapterProps {
  rows: TreeRow[];
  selected: string[];
  onSelected: (keys: string[]) => void;
}
