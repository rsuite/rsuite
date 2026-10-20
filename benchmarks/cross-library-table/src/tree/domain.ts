import type { TreeRow } from './types';
const row = (id: string, name: string, amount: number, children?: TreeRow[]): TreeRow => ({
  id,
  name,
  amount,
  disabled: false,
  ...(children ? { children } : {})
});
export const treeRows: TreeRow[] = [
  row('north', 'North', 100, [
    row('north-projects', 'North projects', 20, [
      row('north-report', 'North report', 1),
      row('north-budget', 'North budget', 2)
    ]),
    row('north-overview', 'North overview', 3)
  ]),
  row('south', 'South', 200, [row('south-report', 'South report', 4)]),
  row('west', 'West', 300)
];
export function allTreeKeys(rows: TreeRow[]): string[] {
  return rows.flatMap(row => [row.id, ...allTreeKeys(row.children ?? [])]);
}
export function visibleTree(
  rows: TreeRow[],
  expanded: string[],
  level = 1
): Array<{
  row: TreeRow;
  level: number;
  position: number;
  siblings: number;
}> {
  return rows.flatMap((row, index) => [
    { row, level, position: index + 1, siblings: rows.length },
    ...(row.children && expanded.includes(row.id)
      ? visibleTree(row.children, expanded, level + 1)
      : [])
  ]);
}
