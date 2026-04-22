import { PARENT_KEY } from '../constants';
import type { RowDataType, RowKeyType } from '../types';

/**
 * Get all parent nodes of the given node in the flattened data
 * @param node target node
 */
function findAllParents<Row extends RowDataType, Key>(node: Row, rowKey: RowKeyType): Key[] {
  const parents: Key[] = [];
  let current = node[PARENT_KEY];

  // Iterate up through the parent chain and add each parent to the result array
  while (current) {
    parents.push(current[rowKey]);
    current = current[PARENT_KEY];
  }
  return parents;
}

export default findAllParents;
