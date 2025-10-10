'use client';
import { useState } from 'react';
import { useEventCallback } from "../../internals/hooks/index.js";
import { getSafeRegExpString } from "../../internals/utils/index.js";
function useSearch(props) {
  var _useState = useState(''),
    searchKeyword = _useState[0],
    setSearchKeyword = _useState[1];
  var labelKey = props.labelKey,
    valueKey = props.valueKey,
    flattenedData = props.flattenedData,
    uncheckableItemValues = props.uncheckableItemValues,
    onSearch = props.onSearch;
  var getSearchResult = function getSearchResult() {
    var items = [];
    var result = flattenedData.filter(function (item) {
      if (uncheckableItemValues !== null && uncheckableItemValues !== void 0 && uncheckableItemValues.some(function (value) {
        return item[valueKey] === value;
      })) {
        return false;
      }
      if (item[labelKey].match(new RegExp(getSafeRegExpString(searchKeyword), 'i'))) {
        return true;
      }
      return false;
    });
    for (var i = 0; i < result.length; i++) {
      items.push(result[i]);

      // A maximum of 100 search results are returned.
      if (i === 99) {
        return items;
      }
    }
    return items;
  };
  var handleSearch = useEventCallback(function (value, event) {
    setSearchKeyword(value);
    onSearch === null || onSearch === void 0 || onSearch(value, event);
  });
  return {
    searchKeyword: searchKeyword,
    setSearchKeyword: setSearchKeyword,
    items: getSearchResult(),
    handleSearch: handleSearch
  };
}
export default useSearch;