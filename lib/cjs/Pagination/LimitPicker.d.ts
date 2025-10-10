import React from 'react';
import { type SelectPickerProps } from '../SelectPicker';
import { PaginationLocale } from '../locales';
import { OnChangeCallback, TypeAttributes } from '../internals/types';
interface LimitPickerProps extends Omit<SelectPickerProps<any>, 'locale' | 'disabled' | 'data'> {
    disabled?: boolean | ((eventKey: number | string) => boolean);
    limitOptions: number[];
    locale: PaginationLocale;
    limit: number;
    size?: TypeAttributes.Size;
    prefix: (input: string) => string;
    onChangeLimit: OnChangeCallback<any>;
}
declare const LimitPicker: (props: LimitPickerProps) => React.JSX.Element;
export default LimitPicker;
