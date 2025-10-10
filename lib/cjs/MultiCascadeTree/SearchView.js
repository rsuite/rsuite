'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireDefault(require("react"));
var _SearchBox = _interopRequireDefault(require("../internals/SearchBox"));
var _Checkbox = _interopRequireDefault(require("../Checkbox"));
var _Highlight = _interopRequireDefault(require("../Highlight"));
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _utils = require("./utils");
var _excluded = ["as", "classPrefix", "className", "searchKeyword", "childrenKey", "labelKey", "valueKey", "value", "data", "disabledItemValues", "inputRef", "cascade", "locale", "onSearch", "onCheck"];
function SearchView(props) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'cascade-search-view' : _props$classPrefix,
    className = props.className,
    searchKeyword = props.searchKeyword,
    childrenKey = props.childrenKey,
    labelKey = props.labelKey,
    valueKey = props.valueKey,
    value = props.value,
    data = props.data,
    disabledItemValues = props.disabledItemValues,
    inputRef = props.inputRef,
    cascade = props.cascade,
    overrideLocale = props.locale,
    onSearch = props.onSearch,
    onCheck = props.onCheck,
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
    var _extends2;
    var nodes = (0, _utils.getNodeParents)(item);
    var label = /*#__PURE__*/_react.default.createElement(_Highlight.default, {
      as: "span",
      query: searchKeyword
    }, item[labelKey]);
    nodes.push((0, _extends3.default)({}, item, (_extends2 = {}, _extends2[labelKey] = label, _extends2)));
    var active = value.some(function (value) {
      if (cascade) {
        return nodes.some(function (node) {
          return node[valueKey] === value;
        });
      }
      return item[valueKey] === value;
    });
    var disabled = disabledItemValues.some(function (value) {
      return nodes.some(function (node) {
        return node[valueKey] === value;
      });
    });
    var rowClasses = prefix('row', {
      'row-disabled': disabled
    });
    var indeterminate = cascade && !active && (0, _utils.isSomeChildChecked)(item, value, {
      valueKey: valueKey,
      childrenKey: childrenKey
    });
    var handleChange = function handleChange(_value, checked, event) {
      onCheck === null || onCheck === void 0 || onCheck(item, event, checked);
    };
    return /*#__PURE__*/_react.default.createElement("div", {
      role: "treeitem",
      "aria-disabled": disabled,
      key: key,
      className: rowClasses,
      "data-key": item[valueKey]
    }, /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      disabled: disabled,
      checked: active,
      value: item[valueKey],
      indeterminate: indeterminate,
      onChange: handleChange
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: prefix('col-group')
    }, nodes.map(function (node, index) {
      return /*#__PURE__*/_react.default.createElement("span", {
        key: "col-" + index,
        className: prefix('col')
      }, node[labelKey]);
    }))));
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