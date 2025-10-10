/// <reference types="react" />
import type { StandardProps } from '../internals/types';
import type { ListProps } from '../internals/Windowing';
import type { TreeNode } from '../internals/Tree/types';
/**
 * Tree Node Drag Type
 */
export declare enum TREE_NODE_DROP_POSITION {
    DRAG_OVER = 0,
    DRAG_OVER_TOP = 1,
    DRAG_OVER_BOTTOM = 2
}
export interface DropData<T> {
    /** drag node data */
    dragNode: T;
    /** dropNode data */
    dropNode: T;
    /** node drop position */
    dropNodePosition: TREE_NODE_DROP_POSITION;
    /** Update Data when drop node */
    createUpdateDataFunction: (data: T[]) => T[];
}
/**
 * Represents the drag-related props for the Tree component.
 */
export interface TreeDragProps<T = Record<string, any>> {
    /**
     * Specifies whether the node can be dragged.
     */
    draggable?: boolean;
    /**
     * Called when scrolling.
     * @param event - The scroll event.
     */
    onScroll?: (event: React.SyntheticEvent) => void;
    /**
     * Called when the node drag starts.
     * @param nodeData - The data associated with the dragged node.
     * @param e - The drag event.
     */
    onDragStart?: (nodeData: T, e: React.DragEvent) => void;
    /**
     * Called when the node is dragged over.
     * @param nodeData - The data associated with the dragged node.
     * @param e - The drag event.
     */
    onDragEnter?: (nodeData: T, e: React.DragEvent) => void;
    /**
     * Called when the node is dragged over.
     * @param nodeData - The data associated with the dragged node.
     * @param e - The drag event.
     */
    onDragOver?: (nodeData: T, e: React.DragEvent) => void;
    /**
     * Called when the node is dragged out.
     * @param nodeData - The data associated with the dragged node.
     * @param e - The drag event.
     */
    onDragLeave?: (nodeData: T, e: React.DragEvent) => void;
    /**
     * Called when the node drag ends.
     * @param nodeData - The data associated with the dragged node.
     * @param e - The drag event.
     */
    onDragEnd?: (nodeData: T, e: React.DragEvent) => void;
    /**
     * Called when a node is dropped.
     * @param dropData - The data associated with the dropped node.
     * @param e - The drag event.
     */
    onDrop?: (dropData: DropData<T>, e: React.DragEvent) => void;
}
/**
 * Represents the base props for the Tree component.
 *
 * @template V - The type of the value associated with each tree node.
 * @template T - The type of the tree node.
 */
/**
 * Represents the props for the Tree component.
 */
export interface TreeViewBaseProps<V = string | number, T = TreeNode> extends StandardProps {
    /**
     * The height of the tree.
     */
    height?: number;
    /**
     * Whether to display the search input box.
     */
    searchable?: boolean;
    /**
     * Whether to display an auxiliary line when the tree node is indented.
     */
    showIndentLine?: boolean;
    /**
     * Whether to use virtualized list.
     */
    virtualized?: boolean;
    /**
     * Props for the virtualized list.
     */
    listProps?: Partial<ListProps>;
    /**
     * The search keyword (controlled).
     */
    searchKeyword?: string;
    /**
     * The option values for the expand nodes with controlled.
     */
    expandItemValues?: any[];
    /**
     * Callback function for expanding tree nodes.
     * @param expandItemValues - The values of the expanded nodes.
     * @param activeNode - The currently active node.
     * @param concat - A function to concatenate data and children.
     */
    onExpand?: (expandItemValues: T[], activeNode: T, concat: (data: T[], children: T[]) => T[]) => void;
    /**
     * Callback function after selecting a tree node.
     * @param activeNode - The currently active node.
     * @param value - The value of the selected node.
     * @param event - The event object.
     */
    onSelect?: (activeNode: T, value: V, event: React.SyntheticEvent) => void;
    /**
     * Callback when a tree item is clicked.
     * @param item - The clicked tree item.
     * @param path - The path of the clicked item.
     */
    onSelectItem?: (item: T, path: T[]) => void;
    /**
     * Callback fired when searching.
     * @param searchKeyword - The search keyword.
     * @param event - The event object.
     */
    onSearch?: (searchKeyword: string, event: React.SyntheticEvent) => void;
    /**
     * Callback fired when cleaning.
     * @param event - The event object.
     */
    onClean?: (event: React.SyntheticEvent) => void;
    /**
     * Custom search rules.
     * @param keyword - The search keyword.
     * @param label - The label of the tree item.
     * @param item - The tree item.
     * @returns Whether the item matches the search criteria.
     */
    searchBy?: (keyword: string, label: React.ReactNode, item: any) => boolean;
    /**
     * Callback function called after the value has been changed.
     * @param value - The new value.
     * @param event - The event object.
     */
    onChange?: (value: V, event: React.SyntheticEvent) => void;
}
export interface TreeExtraProps<T = TreeNode> {
    /**
     * Whether to expand all nodes by default.
     */
    defaultExpandAll?: boolean;
    /**
     * The option values for the expand nodes by default.
     */
    defaultExpandItemValues?: any[];
    /**
     * Function to load node children data asynchronously.
     * @param activeNode - The currently active node.
     * @returns The children of the active node.
     */
    getChildren?: (activeNode: T) => T[] | Promise<T[]>;
    /**
     * Custom render function for the tree.
     * @param menu - The menu to be rendered.
     * @returns The rendered tree.
     */
    renderTree?: (menu: React.ReactNode) => React.ReactNode;
    /**
     * Custom render function for tree nodes.
     * @param nodeData - The data of the tree node.
     * @returns The rendered node.
     */
    renderTreeNode?: (nodeData: T) => React.ReactNode;
    /**
     * Custom render function for tree icons.
     * @param nodeData - The data of the tree node.
     * @returns The rendered icon.
     */
    renderTreeIcon?: (nodeData: T, expanded?: boolean) => React.ReactNode;
}
