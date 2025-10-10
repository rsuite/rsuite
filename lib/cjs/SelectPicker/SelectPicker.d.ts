import React from 'react';
import { PickerLocale } from '../locales';
import { PickerHandle, PickerToggleProps } from '../internals/Picker';
import type { ListProps } from '../internals/Windowing';
import type { FormControlPickerProps, ItemDataType } from '../internals/types';
export interface SelectProps<T> {
    /** Set group condition key in data */
    groupBy?: string;
    /** Whether dispaly search input box */
    searchable?: boolean;
    /** Whether using virtualized list */
    virtualized?: boolean;
    /**
     * Virtualized List Props
     */
    listProps?: Partial<ListProps>;
    /** Custom search rules. */
    searchBy?: (keyword: string, label: React.ReactNode, item: ItemDataType) => boolean;
    /** Sort options */
    sort?: (isGroup: boolean) => (a: any, b: any) => number;
    /** Customizing the Rendering Menu list */
    renderMenu?: (menu: React.ReactNode) => React.ReactNode;
    /** Custom render menuItems */
    renderMenuItem?: (label: React.ReactNode, item: ItemDataType) => React.ReactNode;
    /** Custom render menu group */
    renderMenuGroup?: (title: React.ReactNode, item: ItemDataType) => React.ReactNode;
    /** Custom render selected items */
    renderValue?: (value: T, item: ItemDataType<T>, selectedElement: React.ReactNode) => React.ReactNode;
    /** Called when the option is selected */
    onSelect?: (value: any, item: ItemDataType<T>, event: React.SyntheticEvent) => void;
    /** Called after clicking the group title */
    onGroupTitleClick?: (event: React.SyntheticEvent) => void;
    /** Called when searching */
    onSearch?: (searchKeyword: string, event?: React.SyntheticEvent) => void;
    /** Called when clean */
    onClean?: (event: React.SyntheticEvent) => void;
}
export interface MultipleSelectProps<T> extends Omit<SelectProps<T>, 'renderValue'> {
    /** Custom render selected items */
    renderValue?: (value: T[], item: ItemDataType<T>[], selectedElement: React.ReactNode) => React.ReactNode;
}
export interface SelectPickerProps<T = any> extends Omit<FormControlPickerProps<T, PickerLocale, ItemDataType<T>>, 'value' | 'defaultValue' | 'onChange'>, SelectProps<T>, Pick<PickerToggleProps, 'caretAs' | 'label' | 'loading'> {
    /** Initial value */
    defaultValue?: T;
    /** Current value of the component. Creates a controlled component */
    value?: T | null;
    /** Called after the value has been changed */
    onChange?: (value: T | null, event: React.SyntheticEvent) => void;
}
export interface SelectPickerComponent {
    <T>(props: SelectPickerProps<T> & {
        ref?: React.Ref<PickerHandle>;
    }): JSX.Element | null;
    displayName?: string;
    propTypes?: React.WeakValidationMap<SelectPickerProps<any>>;
}
/**
 * The `SelectPicker` component is used to select an item from a list of data.
 * @see https://rsuitejs.com/components/select-picker/
 */
declare const SelectPicker: SelectPickerComponent;
export default SelectPicker;
