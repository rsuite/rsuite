import React from 'react';
import type { ValueType } from '../Checkbox';
export interface CheckboxGroupContextValue {
    inline?: boolean;
    name?: string;
    value?: ValueType[];
    controlled?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    plaintext?: boolean;
    onChange?: (value: any, checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}
export declare const CheckboxGroupContext: React.Context<CheckboxGroupContextValue | undefined>;
