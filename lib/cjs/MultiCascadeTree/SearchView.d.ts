import React from 'react';
import type { ItemDataType, WithAsProps } from '../internals/types';
interface SearchViewProps<T> extends WithAsProps {
    searchKeyword: string;
    labelKey: string;
    valueKey: string;
    childrenKey: string;
    value: T[];
    data: ItemDataType<T>[];
    disabledItemValues: any[];
    cascade?: boolean;
    locale?: Record<string, string>;
    onSearch: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
    onCheck: (item: ItemDataType<T>, event: React.SyntheticEvent, checked: boolean) => void;
    inputRef?: React.RefObject<HTMLInputElement>;
}
declare function SearchView<T>(props: SearchViewProps<T>): React.JSX.Element;
export default SearchView;
