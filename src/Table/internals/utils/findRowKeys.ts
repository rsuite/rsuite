import type { RowDataType, RowKeyType } from '../types';

export default function findRowKeys<Row extends RowDataType, Key>(
  rows: readonly Row[],
  rowKey?: RowKeyType,
  expanded?: boolean
): Key[] {
  let keys: Key[] = [];

  if (!rowKey) {
    return keys;
  }

  for (let i = 0; i < rows.length; i++) {
    const item = rows[i];
    if (item.children) {
      keys.push(item[rowKey]);
      keys = [...keys, ...findRowKeys<Row, Key>(item.children as Row[], rowKey)];
    } else if (expanded) {
      keys.push(item[rowKey]);
    }
  }
  return keys;
}
