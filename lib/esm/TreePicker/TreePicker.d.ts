import React from 'react';
import { type TreeViewProps } from '../Tree/TreeView';
import { PickerLocale } from '../locales';
import { PickerComponent, PickerToggleProps } from '../internals/Picker';
import { TreeNode } from '../internals/Tree/types';
import type { FormControlPickerProps, DeprecatedPickerProps } from '../internals/types';
import type { TreeExtraProps } from '../Tree/types';
export interface TreePickerProps<V = number | string | null> extends TreeViewProps<V>, TreeExtraProps, DeprecatedPickerProps, FormControlPickerProps<V, PickerLocale, TreeNode>, Pick<PickerToggleProps, 'caretAs' | 'loading'> {
    /**
     * Custom render selected items
     */
    renderValue?: (value: V, selectedNode: TreeNode, selectedElement: React.ReactNode) => React.ReactNode;
    /**
     * Custom popup style
     */
    popupClassName?: string;
    /**
     * Custom popup style
     */
    popupStyle?: React.CSSProperties;
    /**
     * The height of the tree
     */
    treeHeight?: number;
    /**
     * Popup auto width
     *
     * @default true
     */
    popupAutoWidth?: boolean;
}
/**
 * The `TreePicker` component is used for selecting single options which are organized in a tree structure.
 *
 * @see https://rsuitejs.com/components/tree-picker/
 */
declare const TreePicker: PickerComponent<TreePickerProps>;
export default TreePicker;
