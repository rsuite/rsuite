/// <reference types="react" />
import { ItemDataType } from '../../internals/types';
interface SearchPanelProps<T> {
    labelKey: string;
    valueKey: string;
    childrenKey: string;
    flattenedData: ItemDataType<T>[];
    uncheckableItemValues?: any[];
    onSearch?: (value: string, event: React.SyntheticEvent) => void;
}
declare function useSearch<T>(props: SearchPanelProps<T>): {
    searchKeyword: string;
    setSearchKeyword: import("react").Dispatch<import("react").SetStateAction<string>>;
    items: ItemDataType<T>[];
    handleSearch: (...args: any[]) => any;
};
export default useSearch;
