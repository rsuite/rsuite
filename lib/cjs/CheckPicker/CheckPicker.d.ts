import React from 'react';
import { PickerLocale } from '../locales';
import { PickerHandle, PickerToggleProps } from '../internals/Picker';
import { ItemDataType, FormControlPickerProps } from '../internals/types';
import type { SelectProps } from '../SelectPicker';
export type ValueType = (number | string)[];
export interface CheckPickerProps<T = any> extends FormControlPickerProps<T[], PickerLocale, ItemDataType<T>>, Omit<SelectProps<T>, 'renderValue'>, Pick<PickerToggleProps, 'label' | 'caretAs' | 'loading'> {
    /** Top the selected option in the options */
    sticky?: boolean;
    /** A picker that can be counted */
    countable?: boolean;
    /** Custom render selected items */
    renderValue?: (value: T[], item: ItemDataType<T>[], selectedElement: React.ReactNode) => React.ReactNode;
}
export interface CheckPickerComponent {
    <T>(props: CheckPickerProps<T> & {
        ref?: React.Ref<PickerHandle>;
    }): JSX.Element | null;
    displayName?: string;
    propTypes?: React.WeakValidationMap<CheckPickerProps<any>>;
}
/**
 * A component for selecting checkable items in a dropdown list.
 * @see https://rsuitejs.com/components/check-picker
 */
declare const CheckPicker: CheckPickerComponent;
export default CheckPicker;
