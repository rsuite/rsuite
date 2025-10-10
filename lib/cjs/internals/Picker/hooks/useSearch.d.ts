/// <reference types="react" />
interface SearchOptions<T> {
    labelKey: string;
    searchBy?: (keyword: string, label: any, item: T) => boolean;
    callback?: (keyword: string, data: T[], event: React.SyntheticEvent) => void;
}
type UseSearchResult<T> = {
    searchKeyword: string;
    filteredData: T[];
    checkShouldDisplay: (item: T, keyword?: string) => boolean;
    handleSearch: (searchKeyword: string, event: React.SyntheticEvent) => void;
    resetSearch: () => void;
};
/**
 * A hook that handles search filter options
 */
declare function useSearch<T>(data: readonly T[], props: SearchOptions<T>): UseSearchResult<T>;
export default useSearch;
