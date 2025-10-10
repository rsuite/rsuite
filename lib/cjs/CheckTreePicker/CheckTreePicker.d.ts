import React from 'react';
import { PickerLocale } from '../locales';
import { PickerComponent, PickerToggleProps } from '../internals/Picker';
import { type CheckTreeViewProps } from '../CheckTree/CheckTreeView';
import type { TreeNode } from '../internals/Tree/types';
import type { FormControlPickerProps, ItemDataType, DeprecatedPickerProps } from '../internals/types';
import type { TreeExtraProps } from '../Tree/types';
export type ValueType = (string | number)[];
export interface CheckTreePickerProps<V = ValueType> extends Omit<CheckTreeViewProps<V>, 'value' | 'onChange' | 'data'>, TreeExtraProps, DeprecatedPickerProps, FormControlPickerProps<V, PickerLocale, ItemDataType>, Pick<PickerToggleProps, 'caretAs' | 'loading'> {
    /**
     * A picker that can be counted
     */
    countable?: boolean;
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
    /**
     * Custom render selected items
     */
    renderValue?: (value: V, selectedNodes: TreeNode[], selectedElement: React.ReactNode) => React.ReactNode;
    /**
     * In the cascade case, the leaf node's value change callbacks
     */
    onCascadeChange?: (v: ValueType, event: React.SyntheticEvent) => void;
}
/**
 * The `CheckTreePicker` component is used for selecting multiple options which are organized in a tree structure.
 *
 * @see https://rsuitejs.com/components/check-tree-picker
 */
declare const CheckTreePicker: PickerComponent<CheckTreePickerProps>;
export default CheckTreePicker;
