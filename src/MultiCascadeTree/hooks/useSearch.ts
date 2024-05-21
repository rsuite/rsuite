import { useState } from 'react';
import { ItemDataType } from '@/internals/types';
import { useEventCallback } from '@/internals/hooks';
import { getSafeRegExpString } from '@/internals/utils';

interface SearchPanelProps<T> {
  labelKey: string;
  valueKey: string;
  childrenKey: string;
  flattenedData: ItemDataType<T>[];
  uncheckableItemValues?: any[];
  onSearch?: (value: string, event: React.SyntheticEvent) => void;
}

function useSearch<T>(props: SearchPanelProps<T>) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { labelKey, valueKey, flattenedData, uncheckableItemValues, onSearch } = props;

  const getSearchResult = () => {
    const items: ItemDataType<T>[] = [];
    const result = flattenedData.filter(item => {
      if (uncheckableItemValues?.some(value => item[valueKey] === value)) {
        return false;
      }

      if (item[labelKey].match(new RegExp(getSafeRegExpString(searchKeyword), 'i'))) {
        return true;
      }
      return false;
    });

    for (let i = 0; i < result.length; i++) {
      items.push(result[i]);

      // A maximum of 100 search results are returned.
      if (i === 99) {
        return items;
      }
    }
    return items;
  };

  const handleSearch = useEventCallback((value: string, event: React.SyntheticEvent) => {
    setSearchKeyword(value);
    onSearch?.(value, event);
  });

  return {
    searchKeyword,
    setSearchKeyword,
    items: getSearchResult(),
    handleSearch
  };
}

export default useSearch;
