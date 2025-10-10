'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = useTreeSearch;
var _react = require("react");
var _isArray = _interopRequireDefault(require("lodash/isArray"));
var _Picker = require("../../internals/Picker");
var _TreeProvider = require("../../internals/Tree/TreeProvider");
/**
 * Custom hook for searching and filtering data in a tree structure.
 */
function useTreeSearch(props) {
  var _useItemDataKeys = (0, _TreeProvider.useItemDataKeys)(),
    labelKey = _useItemDataKeys.labelKey,
    childrenKey = _useItemDataKeys.childrenKey;
  var searchKeyword = props.searchKeyword,
    data = props.data,
    searchBy = props.searchBy,
    callback = props.callback;
  var filterVisibleData = (0, _react.useCallback)(function (data, searchKeyword) {
    var setVisible = function setVisible(nodes) {
      return nodes.forEach(function (item) {
        item.visible = searchBy ? searchBy(searchKeyword, item[labelKey], item) : (0, _Picker.shouldDisplay)(item[labelKey], searchKeyword);
        if ((0, _isArray.default)(item[childrenKey])) {
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
  var _useState = (0, _react.useState)(searchKeyword !== null && searchKeyword !== void 0 ? searchKeyword : ''),
    keyword = _useState[0],
    setSearchKeyword = _useState[1];
  var _useState2 = (0, _react.useState)(function () {
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
  (0, _react.useEffect)(function () {
    handleSearch(searchKeyword !== null && searchKeyword !== void 0 ? searchKeyword : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);
  (0, _react.useEffect)(function () {
    setSearchKeyword(searchKeyword !== null && searchKeyword !== void 0 ? searchKeyword : '');
  }, [searchKeyword, setSearchKeyword]);
  var setVisibleData = (0, _react.useCallback)(function (data, searchKeyword) {
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