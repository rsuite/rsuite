import type { TreeNodeMap } from '../../internals/Tree/types';
/**
 * Retrieves the active node from a tree based on the provided value and value key.
 */
export declare function getTreeActiveNode<T extends number | string | undefined | null>(nodes: TreeNodeMap, value: T, valueKey: string): import("../../internals/Tree/types").TreeNode | undefined;
