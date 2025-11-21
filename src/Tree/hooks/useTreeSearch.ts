import React, { useState, useCallback, useEffect } from 'react';
import isArray from 'lodash/isArray';
import { shouldDisplay } from '@/internals/Picker';
import { useItemDataKeys } from '@/internals/Tree/TreeProvider';

interface TreeSearchProps<T> {
  searchKeyword?: string;
  data: T[];
  searchBy?: (keyword, label, item) => boolean;
  callback?: (keyword: string, data: T[], event: React.SyntheticEvent) => void;
}

/**
 * Custom hook for searching and filtering data in a tree structure.
 */
export default function useTreeSearch<T>(props: TreeSearchProps<T>) {
  const { labelKey, childrenKey } = useItemDataKeys();
  const { searchKeyword, data, searchBy, callback } = props;

  const filterVisibleData = useCallback(
    (data: T[], searchKeyword: string) => {
      const setVisible = (nodes: T[]) =>
        nodes.forEach((item: any) => {
          item.visible = searchBy
            ? searchBy(searchKeyword, item[labelKey], item)
            : shouldDisplay(item[labelKey], searchKeyword);

          if (isArray(item[childrenKey])) {
            filterVisibleData(item[childrenKey], searchKeyword);
            item[childrenKey].forEach((child: any) => {
              if (child.visible) {
                item.visible = child.visible;
              }
            });
          }
        });

      setVisible(data);
      return data;
    },
    [childrenKey, labelKey, searchBy]
  );

  // Use search keywords to filter options.
  const [keyword, setSearchKeyword] = useState(searchKeyword ?? '');
  const [filteredData, setFilteredData] = useState(() => filterVisibleData(data, keyword));

  const handleSearch = (searchKeyword: string, event?: React.ChangeEvent) => {
    const filteredData = filterVisibleData(data, searchKeyword);

    setFilteredData(filteredData);
    setSearchKeyword(searchKeyword);

    if (event) {
      callback?.(searchKeyword, filteredData, event);
    }
  };

  useEffect(() => {
    handleSearch(searchKeyword ?? '');
  }, [searchKeyword]);

  useEffect(() => {
    setSearchKeyword(searchKeyword ?? '');
  }, [searchKeyword, setSearchKeyword]);

  const setVisibleData = useCallback(
    (data: T[], searchKeyword: string) => {
      setFilteredData(filterVisibleData(data, searchKeyword));
    },
    [filterVisibleData]
  );

  return {
    keyword,
    filteredData,
    setFilteredData: setVisibleData,
    setSearchKeyword,
    handleSearch
  };
}
