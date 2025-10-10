import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../types';
export interface SearchBoxProps extends WithAsProps {
    value?: string;
    placeholder?: string;
    className?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}
declare const SearchBox: RsRefForwardingComponent<'div', SearchBoxProps>;
export default SearchBox;
