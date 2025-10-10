import React from 'react';
import { RsRefForwardingComponent, WithAsProps } from '../internals/types';
import { CheckStateType } from '../internals/constants';
import type { TreeNode as TreeNodeData } from '../internals/Tree/types';
export interface CheckTreeNodeProps extends WithAsProps {
    /**
     * The label of the node.
     */
    label?: any;
    /**
     * The layer of the node in the tree hierarchy.
     */
    layer: number;
    /**
     * The value of the node.
     */
    value?: any;
    /**
     * Whether the node should be focused.
     */
    focus?: boolean;
    /**
     * Whether the node should be expanded.
     */
    expanded?: boolean;
    /**
     * Whether the node is in a loading state.
     */
    loading?: boolean;
    /**
     * Whether the node is visible.
     */
    visible?: boolean;
    /**
     * Additional data associated with the node.
     */
    nodeData?: any;
    /**
     * Whether the node is disabled.
     */
    disabled?: boolean;
    /**
     * The check state of the node.
     */
    checkState?: CheckStateType;
    /**
     * Whether the node has children.
     */
    hasChildren?: boolean;
    /**
     * Whether the node is uncheckable.
     */
    uncheckable?: boolean;
    /**
     * Whether all nodes are uncheckable.
     */
    allUncheckable?: boolean;
    /**
     * Reference to the tree item.
     */
    treeItemRef?: React.Ref<any>;
    /**
     * Callback function called when the node is expanded.
     */
    onExpand?: (nodeData: TreeNodeData, expanded?: boolean) => void;
    /**
     * Callback function called when the node is selected.
     */
    onSelect?: (nodeData: TreeNodeData, event: React.SyntheticEvent) => void;
}
declare const CheckTreeNode: RsRefForwardingComponent<'div', CheckTreeNodeProps>;
export default CheckTreeNode;
