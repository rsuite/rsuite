import React from 'react';
import type { TreeNode, TreeNodeMap } from '../internals/Tree/types';
import type { RsRefForwardingComponent, ToArray, DataProps } from '../internals/types';
import type { TreeViewBaseProps } from '../Tree/types';
/**
 * Props for the CheckTreeView component.
 */
export interface CheckTreeViewProps<V = (string | number)[]> extends TreeViewBaseProps<V>, DataProps<TreeNode> {
    /**
     * Selected value.
     */
    value?: V;
    /**
     * Virtualized list ref object.
     */
    listRef?: React.RefObject<any>;
    /**
     * Searchbox input ref object.
     */
    searchInputRef?: React.RefObject<HTMLInputElement>;
    /**
     * Whether display search input box.
     */
    searchable?: boolean;
    /**
     * Tree node cascade.
     */
    cascade?: boolean;
    /**
     * Set the option value for the check box not to be rendered.
     */
    uncheckableItemValues?: V;
    /**
     * Disabled tree node.
     */
    disabledItemValues?: ToArray<NonNullable<V>>;
    /**
     * Called when scrolling.
     */
    onScroll?: (event: React.SyntheticEvent) => void;
    /**
     * Called after the value has been changed.
     */
    onChange?: (value: V, event: React.SyntheticEvent) => void;
}
interface CheckTreeViewInnerProps<V = (string | number)[]> extends Omit<CheckTreeViewProps<V>, 'onExpand'> {
    /**
     * Loading node values.
     */
    loadingNodeValues?: V;
    /**
     * Flattened nodes.
     */
    flattenedNodes?: TreeNodeMap;
    /**
     * A collection of localized strings.
     */
    locale?: Record<string, string>;
    /**
     * Callback function triggered when an item is focused.
     */
    onFocusItem?: (value?: TreeNode['value']) => void;
    /**
     * A callback function that is called when a node is expanded.
     *
     * @param nodeData - The data of the expanded node.
     */
    onExpand?: (nodeData: TreeNode, expanded?: boolean) => void;
}
declare const CheckTreeView: RsRefForwardingComponent<'div', CheckTreeViewInnerProps>;
export default CheckTreeView;
