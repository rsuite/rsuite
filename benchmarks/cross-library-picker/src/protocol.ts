export interface Item {
  value: string;
  label: string;
}

export interface AdapterProps {
  items: Item[];
  virtualized: boolean;
  onSelectionChange: (value: string | null) => void;
}

export type Condition =
  | { event: 'pointerdown'; kind: 'open'; first: string }
  | { event: 'input'; kind: 'filter'; first: string | null }
  | { event: 'keydown'; kind: 'key'; value: string };

export interface Snapshot {
  expanded: boolean;
  popupVisible: boolean;
  mountedRows: number;
  visibleValues: string[];
  fullyVisibleValues: string[];
  rowHeights: number[];
  firstVisible: string | null;
  activeValue: string | null;
  activeReferenceConnected: boolean;
  emptyVisible: boolean;
  selected: string | null;
}

export interface Sample {
  domReadyMs: number;
  frameReadyMs: number;
  eventType: string;
  trusted: boolean;
  snapshot: Snapshot;
}

export interface Measurement {
  status: 'idle' | 'armed' | 'running' | 'complete' | 'failed';
  sample?: Sample;
  error?: string;
}

declare global {
  const __LIBRARY__: string;
  interface Window {
    pickerBenchmark: {
      ready: boolean;
      arm: (condition: Condition) => void;
      result: () => Measurement;
      snapshot: () => Snapshot;
      metadata: () => Record<string, unknown>;
    };
  }
}
