import type { Ref } from 'react';
import type { LedgerRow } from '../types';
export interface VirtualActions {
  jumpToIndex(index: number): void;
}
export interface VirtualAdapterProps {
  rows: LedgerRow[];
  selected: string[];
  onSelected(next: string[]): void;
  actionsRef: Ref<VirtualActions>;
}
