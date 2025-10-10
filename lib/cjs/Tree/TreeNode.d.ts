import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
import type { TreeNode as TreeNodeData } from '../internals/Tree/types';
export type DragStatus = 'drag-over' | 'drag-over-top' | 'drag-over-bottom';
interface TreeDragEventProps {
    /**
     * Callback function called when the drag operation starts.
     */
    onDragStart?: (nodeData: TreeNodeData, event: React.DragEvent<any>) => void;
    /**
     * Callback function called when a dragged item enters the node.
     */
    onDragEnter?: (nodeData: TreeNodeData, event: React.DragEvent<any>) => void;
    /**
     * Callback function called when a dragged item is over the node.
     */
    onDragOver?: (nodeData: TreeNodeData, event: React.DragEvent<any>) => void;
    /**
     * Callback function called when a dragged item leaves the node.
     */
    onDragLeave?: (nodeData: TreeNodeData, event: React.DragEvent<any>) => void;
    /**
     * Callback function called when the drag operation ends.
     */
    onDragEnd?: (nodeData: TreeNodeData, event: React.DragEvent<any>) => void;
    /**
     * Callback function called when a dragged item is dropped on the node.
     */
    onDrop?: (nodeData: TreeNodeData, event: React.DragEvent<any>) => void;
}
/**
 * Props for the TreeNode component.
 */
export interface TreeNodeProps extends WithAsProps, TreeDragEventProps {
    /**
     * The layer of the node in the tree hierarchy.
     */
    layer: number;
    /**
     * The value of the node.
     */
    value?: TreeNodeData['value'];
    /**
     * The label of the node.
     */
    label?: TreeNodeData['label'];
    /**
     * Whether the node should be focused.
     */
    focus?: boolean;
    /**
     * Whether the node is in a loading state.
     */
    loading?: boolean;
    /**
     * Whether the node is expanded.
     */
    expanded?: boolean;
    /**
     * Whether the node is active.
     */
    active?: boolean;
    /**
     * Whether the node is visible.
     */
    visible: boolean;
    /**
     * The data associated with the node.
     */
    nodeData: any;
    /**
     * Whether the node is disabled.
     */
    disabled?: boolean;
    /**
     * Whether the node is draggable.
     */
    draggable?: boolean;
    /**
     * Whether the node is being dragged.
     */
    dragging?: boolean;
    /**
     * Drag status of the node.
     */
    dragStatus?: DragStatus;
    /**
     * Whether the node has children.
     */
    hasChildren?: boolean;
    /**
     * Callback function called when the node is expanded.
     */
    onExpand?: (nodeData: TreeNodeData, expanded?: boolean) => void;
    /**
     * Callback function called when the node is selected.
     */
    onSelect?: (nodeData: TreeNodeData, event: React.SyntheticEvent) => void;
}
declare const TreeNode: RsRefForwardingComponent<'div', TreeNodeProps>;
export default TreeNode;
