import type { TreeNode, TreeNodeMap } from '../../internals/Tree/types';
/**
 * Retrieves an array of parent keys for a given node in a tree.
 */
export declare function getNodeParentKeys<T>(nodes: TreeNodeMap, node: TreeNode, valueKey: string): T[];
