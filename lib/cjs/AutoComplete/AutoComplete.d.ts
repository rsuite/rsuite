import React from 'react';
import { PickerComponent } from '../internals/Picker';
import { WithAsProps, FormControlPickerProps, TypeAttributes, ItemDataType } from '../internals/types';
export interface AutoCompleteProps<T = string> extends WithAsProps, FormControlPickerProps<T, any, ItemDataType | string> {
    /** Additional classes for menu */
    menuClassName?: string;
    /** The placement of component */
    placement?: TypeAttributes.Placement;
    /** When set to false, the Enter key selection function is invalid */
    selectOnEnter?: boolean;
    /** A component can have different sizes */
    size?: TypeAttributes.Size;
    /** Open the menu and control it */
    open?: boolean;
    /** Placeholder text */
    placeholder?: string;
    /** The width of the menu will automatically follow the width of the input box */
    menuAutoWidth?: boolean;
    /** AutoComplete Content */
    autoComplete?: string;
    /** Custom filter function to determine whether the item will be displayed */
    filterBy?: (value: string, item: ItemDataType) => boolean;
    /** Called when a option is selected */
    onSelect?: (value: any, item: ItemDataType, event: React.SyntheticEvent) => void;
    /** Called on focus */
    onFocus?: React.FocusEventHandler;
    /** Called on blur */
    onBlur?: React.FocusEventHandler;
    /** Called on menu focus */
    onMenuFocus?: (focusItemValue: any, event: React.KeyboardEvent) => void;
    /** The callback triggered by keyboard events. */
    onKeyDown?: (event: React.KeyboardEvent) => void;
    /** Called on open */
    onOpen?: () => void;
    /** Called on close */
    onClose?: () => void;
    /** Customizing the Rendering Menu list */
    renderMenu?: (menu: React.ReactNode) => React.ReactNode;
    /** Custom selected option */
    renderMenuItem?: (label: React.ReactNode, item: ItemDataType) => React.ReactNode;
}
/**
 * Autocomplete function of input field.
 * @see https://rsuitejs.com/components/auto-complete
 *
 * TODO: Remove unnecessary .rs-auto-complete element
 * TODO: role=combobox and aria-autocomplete on input element
 */
declare const AutoComplete: PickerComponent<AutoCompleteProps>;
export default AutoComplete;
