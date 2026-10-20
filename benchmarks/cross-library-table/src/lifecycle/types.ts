import type { LedgerRow } from '../types';
export type Phase = 'loaded' | 'loading' | 'empty' | 'recovered';
export interface LifecycleAdapterProps {
  rows: LedgerRow[];
  loading: boolean;
  selected: string[];
  onSelected: (keys: string[]) => void;
}
