import React from 'react';
import { ItemDataType, WithAsProps } from '../internals/types';
interface SearchViewProps<T> extends WithAsProps {
    searchKeyword: string;
    labelKey: string;
    valueKey: string;
    parentMap: WeakMap<ItemDataType<T>, ItemDataType<T>>;
    data: ItemDataType<T>[];
    focusItemValue?: T | null;
    disabledItemValues: any[];
    locale?: Record<string, string>;
    renderSearchItem?: (label: React.ReactNode, items: ItemDataType<T>[]) => React.ReactNode;
    onSelect: (item: ItemDataType<T>, items: ItemDataType<T>[], event: React.MouseEvent) => void;
    onSearch: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
    inputRef?: React.RefObject<HTMLInputElement>;
}
declare function SearchView<T>(props: SearchViewProps<T>): React.JSX.Element;
export default SearchView;
