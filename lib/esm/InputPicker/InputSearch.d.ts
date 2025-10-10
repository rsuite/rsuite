import React from 'react';
import { StandardProps } from '../internals/types';
export interface InputSearchProps extends StandardProps, Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {
    as?: React.ElementType | string;
    readOnly?: boolean;
    value?: string;
    inputStyle?: React.CSSProperties;
    inputRef?: React.Ref<any>;
    onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}
declare const InputSearch: React.ForwardRefExoticComponent<InputSearchProps & React.RefAttributes<HTMLDivElement>>;
export default InputSearch;
