export interface LedgerRow {
  id: string;
  name: string;
  amount: number;
  disabled: boolean;
}
export type SortState = { direction: 'ascending' | 'descending' } | null;
export interface AdapterProps {
  rows: LedgerRow[];
  sort: SortState;
  onSort: (next: NonNullable<SortState>) => void;
  selected: string[];
  onSelected: (next: string[]) => void;
}
