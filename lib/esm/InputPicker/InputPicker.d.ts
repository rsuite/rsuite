import React from 'react';
import { PickerComponent, PickerToggleProps } from '../internals/Picker';
import { type InputItemDataType } from './hooks/useData';
import type { ItemDataType, FormControlPickerProps } from '../internals/types';
import type { InputPickerLocale } from '../locales';
import type { SelectProps } from '../SelectPicker';
export type ValueType = any;
export interface InputPickerProps<V = ValueType> extends FormControlPickerProps<V, InputPickerLocale, InputItemDataType>, Omit<SelectProps<V>, 'renderValue'>, Pick<PickerToggleProps, 'caretAs' | 'loading'> {
    tabIndex?: number;
    /** Settings can create new options */
    creatable?: boolean;
    /** Option to cache value when searching asynchronously */
    cacheData?: InputItemDataType<V>[];
    /** The `onBlur` attribute for the `input` element. */
    onBlur?: React.FocusEventHandler;
    /** The `onFocus` attribute for the `input` element. */
    onFocus?: React.FocusEventHandler;
    /** Called when the option is created */
    onCreate?: (value: V, item: ItemDataType, event: React.SyntheticEvent) => void;
    /**
     * Customize whether to display "Create option" action with given textbox value
     *
     * By default, InputPicker hides "Create option" action when textbox value matches any filtered item's [valueKey] property
     *
     * @param searchKeyword Value of the textbox
     * @param filteredData The items filtered by the searchKeyword
     */
    shouldDisplayCreateOption?: (searchKeyword: string, filteredData: InputItemDataType<V>[]) => boolean;
    renderValue?: (value: V, item: ItemDataType<V>, selectedElement: React.ReactNode) => React.ReactNode;
}
/**
 * Single item selector with text box input.
 *
 * @see https://rsuitejs.com/components/input-picker
 */
declare const InputPicker: PickerComponent<InputPickerProps>;
export default InputPicker;
