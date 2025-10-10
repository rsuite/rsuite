import React from 'react';
export interface InputAutosizeProps {
    className?: string;
    defaultValue?: any;
    inputId?: string;
    inputClassName?: string;
    inputStyle?: React.CSSProperties;
    minWidth?: number;
    placeholder?: string;
    style?: React.CSSProperties;
    value?: string;
    tabIndex?: number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onAutosize?: (inputWidth: number) => void;
}
export interface InputInstance {
    root: HTMLDivElement;
    input: HTMLInputElement;
}
declare const InputAutosize: React.ForwardRefExoticComponent<InputAutosizeProps & React.RefAttributes<InputInstance>>;
export default InputAutosize;
