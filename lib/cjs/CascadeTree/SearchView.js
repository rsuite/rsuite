'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _SearchBox = _interopRequireDefault(require("../internals/SearchBox"));
var _Highlight = _interopRequireDefault(require("../Highlight"));
var _hooks = require("../internals/hooks");
var _utils = require("../internals/Tree/utils");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "classPrefix", "className", "searchKeyword", "labelKey", "locale", "valueKey", "parentMap", "data", "focusItemValue", "disabledItemValues", "inputRef", "renderSearchItem", "onSearch", "onSelect"];
function SearchView(props) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'cascade-search-view' : _props$classPrefix,
    className = props.className,
    searchKeyword = props.searchKeyword,
    labelKey = props.labelKey,
    overrideLocale = props.locale,
    valueKey = props.valueKey,
    parentMap = props.parentMap,
    data = props.data,
    focusItemValue = props.focusItemValue,
    disabledItemValues = props.disabledItemValues,
    inputRef = props.inputRef,
    renderSearchItem = props.renderSearchItem,
    onSearch = props.onSearch,
    onSelect = props.onSelect,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix,
    rootPrefix = _useClassNames.rootPrefix;
  var classes = merge(className, withClassPrefix());
  var _useCustom = (0, _CustomProvider.useCustom)(),
    getLocale = _useCustom.getLocale;
  var _getLocale = getLocale('Combobox', overrideLocale),
    searchPlaceholder = _getLocale.searchPlaceholder,
    noResultsText = _getLocale.noResultsText;
  var renderSearchRow = function renderSearchRow(item, key) {
    var items = (0, _utils.getPathTowardsItem)(item, function (item) {
      return parentMap.get(item);
    });
    var formattedNodes = items.map(function (itemData) {
      var _extends2;
      var label = /*#__PURE__*/_react.default.createElement(_Highlight.default, {
        as: "span",
        query: searchKeyword
      }, itemData[labelKey]);
      return (0, _extends3.default)({}, itemData, (_extends2 = {}, _extends2[labelKey] = label, _extends2));
    });
    var disabled = disabledItemValues.some(function (value) {
      return formattedNodes.some(function (itemData) {
        return itemData[valueKey] === value;
      });
    });
    var itemClasses = prefix('row', {
      'row-disabled': disabled,
      'row-focus': item[valueKey] === focusItemValue
    });
    var label = formattedNodes.map(function (itemData, index) {
      return /*#__PURE__*/_react.default.createElement("span", {
        key: "col-" + index,
        className: prefix('col')
      }, itemData[labelKey]);
    });
    var handleCheck = function handleCheck(event) {
      if (!disabled) {
        onSelect(item, items, event);
      }
    };
    return /*#__PURE__*/_react.default.createElement("div", {
      role: "treeitem",
      "aria-disabled": disabled,
      "aria-label": item[labelKey],
      key: key,
      "data-key": item[valueKey],
      className: itemClasses,
      tabIndex: -1,
      onClick: handleCheck
    }, renderSearchItem ? renderSearchItem(label, items) : label);
  };
  return /*#__PURE__*/_react.default.createElement(Component, (0, _extends3.default)({
    className: classes
  }, rest), /*#__PURE__*/_react.default.createElement(_SearchBox.default, {
    placeholder: searchPlaceholder,
    onChange: onSearch,
    value: searchKeyword,
    inputRef: inputRef
  }), searchKeyword !== '' && /*#__PURE__*/_react.default.createElement("div", {
    className: prefix('panel'),
    "data-layer": 0,
    role: "tree"
  }, data.length ? data.map(renderSearchRow) : /*#__PURE__*/_react.default.createElement("div", {
    className: merge(prefix('none'), rootPrefix('picker-none'))
  }, noResultsText)));
}
var _default = exports.default = SearchView;