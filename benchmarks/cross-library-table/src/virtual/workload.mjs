export const defaultVirtualRowCount = 10000;
export const virtualRowCounts = [defaultVirtualRowCount, 50000];

/** @param {string | undefined} value */
export function parseVirtualRowCount(value) {
  const rowCount = virtualRowCounts.find(count => String(count) === value);
  if (rowCount === undefined)
    throw new Error('Virtual row count must be one of: ' + virtualRowCounts.join(', '));
  return rowCount;
}

/** @param {number} rowCount */
export function virtualJumpIndex(rowCount) {
  return Math.floor(rowCount * 0.9);
}

/** @param {number} index */
export function virtualRowId(index) {
  return 'entry-' + String(index).padStart(5, '0');
}
