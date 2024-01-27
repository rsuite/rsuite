import { useState, useCallback, useMemo } from 'react';
import isUndefined from 'lodash/isUndefined';
import { shouldDisplay } from '../utils';

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

  /**
   * Index of keyword  in `label`
   * @param {node} label
   */
  const checkShouldDisplay = useCallback(
    (item: T, keyword?: string) => {
      const checkValue = typeof item === 'object' ? item?.[labelKey] : String(item);
      const _keyword = isUndefined(keyword) ? searchKeyword : keyword;

      if (typeof searchBy === 'function') {
        return searchBy(_keyword, checkValue, item);
      }
      return shouldDisplay(checkValue, _keyword);
    },
    [labelKey, searchBy, searchKeyword]
  );

  const filteredData = useMemo(() => {
    return data.filter(item => checkShouldDisplay(item, searchKeyword));
  }, [checkShouldDisplay, data, searchKeyword]);

  const handleSearch = (searchKeyword: string, event: React.SyntheticEvent) => {
    const filteredData = data.filter(item => checkShouldDisplay(item, searchKeyword));
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
