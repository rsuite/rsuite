import { useState } from 'react';
import { ItemDataType } from '@/internals/types';
import { useEventCallback } from '@/internals/hooks';
import { getSafeRegExpString } from '@/internals/utils';

interface SearchPanelProps<T> {
  labelKey: string;
  childrenKey: string;
  parentMap: WeakMap<ItemDataType<T>, ItemDataType<T>>;
  flattenedData: ItemDataType<T>[];
  parentSelectable?: boolean;
  onSearch: (value: string, items: ItemDataType<T>[], event: React.SyntheticEvent) => void;
}

function useSearch<T>(props: SearchPanelProps<T>) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const { labelKey, childrenKey, parentMap, flattenedData, parentSelectable, onSearch } = props;

  const someKeyword = (item: ItemDataType<T>, keyword?: string) => {
    if (item[labelKey].match(new RegExp(getSafeRegExpString(keyword || searchKeyword), 'i'))) {
      return true;
    }

    const parent = parentMap.get(item);

    if (parent && someKeyword(parent)) {
      return true;
    }

    return false;
  };

  const getSearchResult = (keyword?: string): ItemDataType<T>[] => {
    const items: ItemDataType<T>[] = [];
    const result = flattenedData.filter(item => {
      if (!parentSelectable && item[childrenKey]) {
        return false;
      }
      return someKeyword(item, keyword);
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
    const items = getSearchResult(value);

    setSearchKeyword(value);
    onSearch?.(value, items, event);
  });

  return {
    searchKeyword,
    setSearchKeyword,
    items: getSearchResult(),
    handleSearch
  };
}

export default useSearch;
