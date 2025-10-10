import { CheckTreeProps, ValueType } from './CheckTree';
import { CheckStateType } from '../internals/constants';
import { TreeNode, TreeNodeMap } from '../internals/Tree/types';
/**
 * Checks if every child of a given parent node is checked.
 */
export declare function isEveryChildChecked(parent: TreeNode, options: {
    nodes: TreeNodeMap;
    childrenKey: string;
}): boolean;
/**
 * Checks if any child node is checked.
 */
export declare function isSomeChildChecked(nodes: TreeNodeMap, parent: TreeNode, childrenKey: string): boolean;
/**
 * Checks if any node in the data has a grandchild.
 */
export declare function hasGrandchild(data: any[], childrenKey: string): boolean;
/**
 * Checks if all sibling nodes of a given node are uncheckable.
 */
export declare function isAllSiblingNodeUncheckable(node: TreeNode, nodes: TreeNodeMap, uncheckableItemValues: (string | number)[], valueKey: string): boolean;
/**
 * Checks if every first-level node is uncheckable based on the provided criteria.
 */
export declare function isEveryFirstLevelNodeUncheckable(nodes: TreeNodeMap, uncheckableItemValues: (string | number)[], valueKey: string): boolean;
/**
 * Checks if a node is uncheckable.
 */
export declare function isNodeUncheckable(node: any, props: Required<Pick<CheckTreeProps, 'uncheckableItemValues' | 'valueKey'>>): boolean;
export declare function getFormattedTree(nodes: TreeNodeMap, data: any[], props: Required<Pick<CheckTreeProps, 'childrenKey' | 'cascade'>>): any[];
/**
 * Determines the disabled state of a tree node.
 */
export declare function getDisabledState(nodes: TreeNodeMap, node: TreeNode, props: Required<Pick<CheckTreeProps, 'disabledItemValues' | 'valueKey'>>): boolean;
/**
 * Returns the default value for the check tree.
 */
export declare function getCheckTreeDefaultValue<T = any>(value: T, uncheckableItemValues: T): any[] | T;
/**
 * Retrieves the selected items from the given nodes.
 */
export declare function getSelectedItems(nodes: TreeNodeMap, values: ValueType): TreeNode[];
interface NodeCheckStateOptions {
    nodes: TreeNodeMap;
    cascade: boolean;
    childrenKey: string;
}
/**
 * Calculates the check state of a node in a check tree.
 */
export declare function getNodeCheckState(node: TreeNode, options: NodeCheckStateOptions): CheckStateType;
export {};
