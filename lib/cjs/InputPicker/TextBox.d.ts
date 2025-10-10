import React from 'react';
import { InputSearchProps } from './InputSearch';
interface TextBoxProps {
    tags?: React.ReactNode;
    inputProps?: InputSearchProps;
    readOnly?: boolean;
    disabled?: boolean;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
    inputValue?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    editable?: boolean;
    multiple?: boolean;
    showTagList?: boolean;
}
declare const TextBox: React.ForwardRefExoticComponent<TextBoxProps & React.RefAttributes<HTMLDivElement>>;
export default TextBox;
