import React from 'react';
import type { CascadeTreeProps } from '../CascadeTree/types';
import { PickerLocale } from '../locales';
import { PickerHandle, PickerToggleProps } from '../internals/Picker';
import { ItemDataType, DataItemValue, FormControlPickerProps } from '../internals/types';
export interface CascaderProps<T = DataItemValue> extends FormControlPickerProps<T, PickerLocale, ItemDataType<T>>, CascadeTreeProps<T, T, PickerLocale>, Pick<PickerToggleProps, 'label' | 'caretAs' | 'loading'> {
    /**
     * The panel is displayed directly when the component is initialized
     * @deprecated Use CascadeTree instead
     * @see CascadeTree https://rsuitejs.com/components/cascade-tree
     */
    inline?: boolean;
    /**
     * When true, make the parent node selectable
     */
    parentSelectable?: boolean;
    /**
     * Custom popup style
     */
    popupClassName?: string;
    /**
     * Custom popup style
     */
    popupStyle?: React.CSSProperties;
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
     * Sets the width of the menu.
     *
     * @deprecated Use columnWidth instead
     */
    menuWidth?: number;
    /**
     * Sets the height of the menu
     * @deprecated Use columnHeight instead
     */
    menuHeight?: number | string;
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
    renderValue?: (value: T, selectedPaths: ItemDataType<T>[], selectedElement: React.ReactNode) => React.ReactNode;
    /**
     * Called when clean
     */
    onClean?: (event: React.SyntheticEvent) => void;
}
export interface CascaderComponent {
    <T>(props: CascaderProps<T> & {
        ref?: React.Ref<PickerHandle>;
    }): JSX.Element | null;
    displayName?: string;
    propTypes?: React.WeakValidationMap<CascaderProps<any>>;
}
/**
 * The `Cascader` component displays a hierarchical list of options.
 * @see https://rsuitejs.com/components/cascader
 */
declare const Cascader: CascaderComponent;
export default Cascader;
