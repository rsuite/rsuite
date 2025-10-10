'use client';
import { useState, useCallback, useMemo } from 'react';
import isUndefined from 'lodash/isUndefined';
import { shouldDisplay } from "../utils.js";
/**
 * A hook that handles search filter options
 */
function useSearch(data, props) {
  var labelKey = props.labelKey,
    searchBy = props.searchBy,
    callback = props.callback;

  // Use search keywords to filter options.
  var _useState = useState(''),
    searchKeyword = _useState[0],
    setSearchKeyword = _useState[1];
  var resetSearch = useCallback(function () {
    setSearchKeyword('');
  }, []);

  /**
   * Index of keyword  in `label`
   * @param {node} label
   */
  var checkShouldDisplay = useCallback(function (item, keyword) {
    var checkValue = typeof item === 'object' ? item === null || item === void 0 ? void 0 : item[labelKey] : String(item);
    var _keyword = isUndefined(keyword) ? searchKeyword : keyword;
    if (typeof searchBy === 'function') {
      return searchBy(_keyword, checkValue, item);
    }
    return shouldDisplay(checkValue, _keyword);
  }, [labelKey, searchBy, searchKeyword]);
  var filteredData = useMemo(function () {
    return data.filter(function (item) {
      return checkShouldDisplay(item, searchKeyword);
    });
  }, [checkShouldDisplay, data, searchKeyword]);
  var handleSearch = function handleSearch(searchKeyword, event) {
    var filteredData = data.filter(function (item) {
      return checkShouldDisplay(item, searchKeyword);
    });
    setSearchKeyword(searchKeyword);
    callback === null || callback === void 0 || callback(searchKeyword, filteredData, event);
  };
  return {
    searchKeyword: searchKeyword,
    filteredData: filteredData,
    checkShouldDisplay: checkShouldDisplay,
    handleSearch: handleSearch,
    resetSearch: resetSearch
  };
}
export default useSearch;