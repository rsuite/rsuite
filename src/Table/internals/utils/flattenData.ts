import { PARENT_KEY } from '../constants';
import type { RowDataType } from '../types';

/**
 * Flatten the tree data with parent association recorded on each node
 * @param tree tree data
 */
function flattenData<Row extends RowDataType<Row>>(tree: readonly Row[], parent?: Row): Row[] {
  return tree.reduce<Row[]>((acc, node) => {
    // Create a new flattened node with parent association
    const flattened = {
      ...node,
      [PARENT_KEY]: parent
    };

    // Add the flattened node and its flattened children (if any) to the result array
    acc.push(flattened, ...(node.children ? flattenData(node.children, flattened) : []));
    return acc;
  }, []);
}

export default flattenData;
