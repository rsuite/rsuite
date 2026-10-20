import type { Item, Snapshot } from '../src/protocol';

export interface AsyncItem extends Item {
  disabled?: boolean;
}
export interface AsyncAdapterProps {
  items: AsyncItem[];
  virtualized: boolean;
  value: string | null;
  onQuery: (query: string) => void;
  onSelectionChange: (value: string | null) => void;
}
export interface RequestRecord {
  id: number;
  query: string;
  outcome: 'pending' | 'applied' | 'ignored' | 'error';
  count?: number;
  error?: string;
}
export interface AsyncSnapshot extends Snapshot {
  query: string;
  loading: boolean;
  error: string | null;
  itemValues: string[];
  requests: RequestRecord[];
  selections: Array<string | null>;
  keys: Array<{ key: string; trusted: boolean }>;
  inputs: Array<{ value: string; trusted: boolean }>;
  idReferenceFailures: string[];
}
declare global {
  interface Window {
    pickerAsync: {
      ready: boolean;
      snapshot: () => AsyncSnapshot;
      metadata: () => Record<string, unknown>;
    };
  }
}
