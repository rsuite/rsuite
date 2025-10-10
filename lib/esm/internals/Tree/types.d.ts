/// <reference types="react" />
import type { CheckStateType } from '../constants';
/**
 * Represents a single node in a tree.
 */
export interface TreeNode extends Record<string, any> {
    /**
     * Specifies whether the node is uncheckable.
     */
    uncheckable?: boolean;
    /**
     * The reference key of the node.
     */
    refKey?: string;
    /**
     * Specifies whether the node is checked.
     */
    check?: boolean;
    /**
     * The parent node of the current node.
     */
    parent?: TreeNode;
    /**
     * Specifies whether all child nodes are checked.
     */
    checkAll?: boolean;
    /**
     * Specifies whether the node is visible.
     */
    visible?: boolean;
    /**
     * Specifies whether the node is expanded.
     */
    expand?: boolean;
    /**
     * The layer of the node in the tree hierarchy.
     */
    layer?: number;
    /**
     * The label of the node.
     */
    label?: string | React.ReactNode;
    /**
     * The value of the node.
     */
    value?: string | number;
    /**
     * The property to group nodes by.
     */
    groupBy?: string;
    /**
     * The child nodes of the current node.
     */
    children?: TreeNode[];
    /**
     * Specifies whether the node has children.
     */
    hasChildren?: boolean;
    /**
     * The check state of the node.
     */
    checkState?: CheckStateType;
}
/**
 * Represents a map of tree nodes.
 */
export interface TreeNodeMap {
    [key: string]: TreeNode;
}
