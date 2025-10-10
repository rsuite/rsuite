'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));
var _utils = require("../utils");
/**
 * A hook that handles search filter options
 */
function useSearch(data, props) {
  var labelKey = props.labelKey,
    searchBy = props.searchBy,
    callback = props.callback;

  // Use search keywords to filter options.
  var _useState = (0, _react.useState)(''),
    searchKeyword = _useState[0],
    setSearchKeyword = _useState[1];
  var resetSearch = (0, _react.useCallback)(function () {
    setSearchKeyword('');
  }, []);

  /**
   * Index of keyword  in `label`
   * @param {node} label
   */
  var checkShouldDisplay = (0, _react.useCallback)(function (item, keyword) {
    var checkValue = typeof item === 'object' ? item === null || item === void 0 ? void 0 : item[labelKey] : String(item);
    var _keyword = (0, _isUndefined.default)(keyword) ? searchKeyword : keyword;
    if (typeof searchBy === 'function') {
      return searchBy(_keyword, checkValue, item);
    }
    return (0, _utils.shouldDisplay)(checkValue, _keyword);
  }, [labelKey, searchBy, searchKeyword]);
  var filteredData = (0, _react.useMemo)(function () {
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
var _default = exports.default = useSearch;