'use client';
import { useState } from 'react';
import { useEventCallback } from "../../internals/hooks/index.js";
import { getSafeRegExpString } from "../../internals/utils/index.js";
function useSearch(props) {
  var _useState = useState(''),
    searchKeyword = _useState[0],
    setSearchKeyword = _useState[1];
  var labelKey = props.labelKey,
    childrenKey = props.childrenKey,
    parentMap = props.parentMap,
    flattenedData = props.flattenedData,
    parentSelectable = props.parentSelectable,
    onSearch = props.onSearch;
  var _someKeyword = function someKeyword(item, keyword) {
    if (item[labelKey].match(new RegExp(getSafeRegExpString(keyword || searchKeyword), 'i'))) {
      return true;
    }
    var parent = parentMap.get(item);
    if (parent && _someKeyword(parent)) {
      return true;
    }
    return false;
  };
  var getSearchResult = function getSearchResult(keyword) {
    var items = [];
    var result = flattenedData.filter(function (item) {
      if (!parentSelectable && item[childrenKey]) {
        return false;
      }
      return _someKeyword(item, keyword);
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
    var items = getSearchResult(value);
    setSearchKeyword(value);
    onSearch === null || onSearch === void 0 || onSearch(value, items, event);
  });
  return {
    searchKeyword: searchKeyword,
    setSearchKeyword: setSearchKeyword,
    items: getSearchResult(),
    handleSearch: handleSearch
  };
}
export default useSearch;