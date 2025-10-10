import React from 'react';
import { PickerLocale } from '../locales';
import { PickerHandle, PickerToggleProps } from '../internals/Picker';
import { FormControlPickerProps, ItemDataType } from '../internals/types';
import type { MultiCascadeTreeProps } from '../MultiCascadeTree';
export interface MultiCascaderProps<T = any> extends FormControlPickerProps<T[], PickerLocale, ItemDataType<T>, T>, MultiCascadeTreeProps<T, T[], PickerLocale>, Pick<PickerToggleProps, 'label' | 'caretAs' | 'loading'> {
    /**
     * A picker that can be counted
     */
    countable?: boolean;
    /**
     * Sets the width of the menu.
     *
     * @deprecated Use columnWidth instead
     */
    menuWidth?: number;
    /**
     * Sets the height of the menu
     * @deprecated Use columnHeight instead
     */
    menuHeight?: number;
    /**
     * Custom menu class name
     * @deprecated Use popupClassName instead
     */
    menuClassName?: string;
    /**
     * Custom menu style
     * @deprecated Use popupStyle instead
     */
    menuStyle?: React.CSSProperties;
    /**
     * Custom popup style
     */
    popupStyle?: React.CSSProperties;
    /**
     * Custom popup style
     */
    popupClassName?: string;
    /**
     * The panel is displayed directly when the component is initialized
     * @deprecated Use MultiCascadeTree instead
     * @see MultiCascadeTree https://rsuitejs.com/components/multi-cascade-tree
     */
    inline?: boolean;
    /**
     * Custom render menu
     * @deprecated Use renderColumn instead
     */
    renderMenu?: (items: readonly ItemDataType<T>[], menu: React.ReactNode, parentNode?: any, layer?: number) => React.ReactNode;
    /**
     * Custom render menu item
     * @deprecated Use renderTreeNode instead
     */
    renderMenuItem?: (node: React.ReactNode, item: ItemDataType<T>) => React.ReactNode;
    /**
     * Custom render selected items
     */
    renderValue?: (value: T[], selectedItems: ItemDataType<T>[], selectedElement: React.ReactNode) => React.ReactNode;
    /**
     * Called when clean
     */
    onClean?: (event: React.SyntheticEvent) => void;
}
export interface MultiCascaderComponent {
    <T>(props: MultiCascaderProps<T> & {
        ref?: React.Ref<PickerHandle>;
    }): JSX.Element | null;
    displayName?: string;
    propTypes?: React.WeakValidationMap<MultiCascaderProps<any>>;
}
/**
 * The `MultiCascader` component is used to select multiple values from cascading options.
 * @see https://rsuitejs.com/components/multi-cascader/
 */
declare const MultiCascader: MultiCascaderComponent;
export default MultiCascader;
