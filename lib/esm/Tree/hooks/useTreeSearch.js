'use client';
import { useState, useCallback, useEffect } from 'react';
import isArray from 'lodash/isArray';
import { shouldDisplay } from "../../internals/Picker/index.js";
import { useItemDataKeys } from "../../internals/Tree/TreeProvider.js";
/**
 * Custom hook for searching and filtering data in a tree structure.
 */
export default function useTreeSearch(props) {
  var _useItemDataKeys = useItemDataKeys(),
    labelKey = _useItemDataKeys.labelKey,
    childrenKey = _useItemDataKeys.childrenKey;
  var searchKeyword = props.searchKeyword,
    data = props.data,
    searchBy = props.searchBy,
    callback = props.callback;
  var filterVisibleData = useCallback(function (data, searchKeyword) {
    var setVisible = function setVisible(nodes) {
      return nodes.forEach(function (item) {
        item.visible = searchBy ? searchBy(searchKeyword, item[labelKey], item) : shouldDisplay(item[labelKey], searchKeyword);
        if (isArray(item[childrenKey])) {
          filterVisibleData(item[childrenKey], searchKeyword);
          item[childrenKey].forEach(function (child) {
            if (child.visible) {
              item.visible = child.visible;
            }
          });
        }
      });
    };
    setVisible(data);
    return data;
  }, [childrenKey, labelKey, searchBy]);

  // Use search keywords to filter options.
  var _useState = useState(searchKeyword !== null && searchKeyword !== void 0 ? searchKeyword : ''),
    keyword = _useState[0],
    setSearchKeyword = _useState[1];
  var _useState2 = useState(function () {
      return filterVisibleData(data, keyword);
    }),
    filteredData = _useState2[0],
    setFilteredData = _useState2[1];
  var handleSearch = function handleSearch(searchKeyword, event) {
    var filteredData = filterVisibleData(data, searchKeyword);
    setFilteredData(filteredData);
    setSearchKeyword(searchKeyword);
    if (event) {
      callback === null || callback === void 0 || callback(searchKeyword, filteredData, event);
    }
  };
  useEffect(function () {
    handleSearch(searchKeyword !== null && searchKeyword !== void 0 ? searchKeyword : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);
  useEffect(function () {
    setSearchKeyword(searchKeyword !== null && searchKeyword !== void 0 ? searchKeyword : '');
  }, [searchKeyword, setSearchKeyword]);
  var setVisibleData = useCallback(function (data, searchKeyword) {
    setFilteredData(filterVisibleData(data, searchKeyword));
  }, [filterVisibleData]);
  return {
    keyword: keyword,
    filteredData: filteredData,
    setFilteredData: setVisibleData,
    setSearchKeyword: setSearchKeyword,
    handleSearch: handleSearch
  };
}