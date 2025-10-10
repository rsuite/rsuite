/// <reference types="react" />
import { ItemDataType } from '../../internals/types';
interface SearchPanelProps<T> {
    labelKey: string;
    childrenKey: string;
    parentMap: WeakMap<ItemDataType<T>, ItemDataType<T>>;
    flattenedData: ItemDataType<T>[];
    parentSelectable?: boolean;
    onSearch: (value: string, items: ItemDataType<T>[], event: React.SyntheticEvent) => void;
}
declare function useSearch<T>(props: SearchPanelProps<T>): {
    searchKeyword: string;
    setSearchKeyword: import("react").Dispatch<import("react").SetStateAction<string>>;
    items: ItemDataType<T>[];
    handleSearch: (...args: any[]) => any;
};
export default useSearch;
