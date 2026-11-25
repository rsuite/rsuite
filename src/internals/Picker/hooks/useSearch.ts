import { useState, useCallback, useMemo } from 'react';
import isUndefined from 'lodash/isUndefined';
import trim from 'lodash/trim';
import matchesSearchKeyword from '../matchesSearchKeyword';

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
function useSearch<T>(data: readonly T[], props: SearchOptions<T>): UseSearchResult<T> {
  const { labelKey, searchBy, callback } = props;

  // Use search keywords to filter options.
  const [searchKeyword, setSearchKeyword] = useState('');

  const resetSearch = useCallback(() => {
    setSearchKeyword('');
  }, []);

  const createItemMatcher = useCallback(
    (keyword: string) => {
      // Trim only checks for whitespace. Spaces around a nonempty query are significant.
      const normalizedKeyword =
        typeof searchBy !== 'function' && trim(keyword) ? keyword.toLocaleLowerCase() : null;

      return (item: T) => {
        const checkValue = typeof item === 'object' ? item?.[labelKey] : String(item);
        if (typeof searchBy === 'function') {
          return searchBy(keyword, checkValue, item);
        }
        return normalizedKeyword === null || matchesSearchKeyword(checkValue, normalizedKeyword);
      };
    },
    [labelKey, searchBy]
  );

  const itemMatcher = useMemo(
    () => createItemMatcher(searchKeyword),
    [createItemMatcher, searchKeyword]
  );

  const checkShouldDisplay = useCallback(
    (item: T, keyword?: string) =>
      isUndefined(keyword) || keyword === searchKeyword
        ? itemMatcher(item)
        : createItemMatcher(keyword)(item),
    [createItemMatcher, itemMatcher, searchKeyword]
  );

  const filteredData = useMemo(() => {
    return data.filter(itemMatcher);
  }, [data, itemMatcher]);

  const handleSearch = (searchKeyword: string, event: React.SyntheticEvent) => {
    const filteredData = data.filter(createItemMatcher(searchKeyword));
    setSearchKeyword(searchKeyword);
    callback?.(searchKeyword, filteredData, event);
  };

  return {
    searchKeyword,
    filteredData,
    checkShouldDisplay,
    handleSearch,
    resetSearch
  };
}

export default useSearch;
