import React from 'react';
import { type InputProps } from '../Input';
interface ComboboxProps extends InputProps {
    expanded?: boolean;
    focusItemValue?: string | null;
}
declare const Combobox: React.ForwardRefExoticComponent<ComboboxProps & React.RefAttributes<HTMLInputElement>>;
export default Combobox;
