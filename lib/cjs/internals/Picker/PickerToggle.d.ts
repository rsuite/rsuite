import React from 'react';
import ToggleButton, { ToggleButtonProps } from './ToggleButton';
import { RsRefForwardingComponent, TypeAttributes, DataItemValue } from '../types';
import { IconProps } from '@rsuite/icons/Icon';
export interface PickerToggleProps<T = DataItemValue> extends ToggleButtonProps {
    active?: boolean;
    hasValue?: boolean;
    cleanable?: boolean;
    caret?: boolean;
    /**
     * Custom caret component
     * @deprecated Use `caretAs` instead
     */
    caretComponent?: React.FC<IconProps>;
    /**
     * Custom caret component
     */
    caretAs?: React.ElementType;
    disabled?: boolean;
    placement?: TypeAttributes.Placement;
    readOnly?: boolean;
    plaintext?: boolean;
    tabIndex?: number;
    /**
     * Whether to display an loading indicator on toggle button
     */
    loading?: boolean;
    label?: React.ReactNode;
    name?: string;
    inputValue?: T | T[];
    focusItemValue?: T | null;
    onClean?: (event: React.MouseEvent) => void;
}
declare const PickerToggle: RsRefForwardingComponent<typeof ToggleButton, PickerToggleProps>;
export default PickerToggle;
