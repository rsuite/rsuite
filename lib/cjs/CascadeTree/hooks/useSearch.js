'use client';
"use strict";

exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _hooks = require("../../internals/hooks");
var _utils = require("../../internals/utils");
function useSearch(props) {
  var _useState = (0, _react.useState)(''),
    searchKeyword = _useState[0],
    setSearchKeyword = _useState[1];
  var labelKey = props.labelKey,
    childrenKey = props.childrenKey,
    parentMap = props.parentMap,
    flattenedData = props.flattenedData,
    parentSelectable = props.parentSelectable,
    onSearch = props.onSearch;
  var _someKeyword = function someKeyword(item, keyword) {
    if (item[labelKey].match(new RegExp((0, _utils.getSafeRegExpString)(keyword || searchKeyword), 'i'))) {
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
  var handleSearch = (0, _hooks.useEventCallback)(function (value, event) {
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
var _default = exports.default = useSearch;