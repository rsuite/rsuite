'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "searchKeyword", "childrenKey", "labelKey", "valueKey", "value", "data", "disabledItemValues", "inputRef", "cascade", "locale", "onSearch", "onCheck"];
import React from 'react';
import SearchBox from "../internals/SearchBox/index.js";
import Checkbox from "../Checkbox/index.js";
import Highlight from "../Highlight/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
import { isSomeChildChecked, getNodeParents } from "./utils.js";
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
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useClassNames = useClassNames(classPrefix),
    merge = _useClassNames.merge,
    prefix = _useClassNames.prefix,
    withClassPrefix = _useClassNames.withClassPrefix,
    rootPrefix = _useClassNames.rootPrefix;
  var classes = merge(className, withClassPrefix());
  var _useCustom = useCustom(),
    getLocale = _useCustom.getLocale;
  var _getLocale = getLocale('Combobox', overrideLocale),
    searchPlaceholder = _getLocale.searchPlaceholder,
    noResultsText = _getLocale.noResultsText;
  var renderSearchRow = function renderSearchRow(item, key) {
    var _extends2;
    var nodes = getNodeParents(item);
    var label = /*#__PURE__*/React.createElement(Highlight, {
      as: "span",
      query: searchKeyword
    }, item[labelKey]);
    nodes.push(_extends({}, item, (_extends2 = {}, _extends2[labelKey] = label, _extends2)));
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
    var indeterminate = cascade && !active && isSomeChildChecked(item, value, {
      valueKey: valueKey,
      childrenKey: childrenKey
    });
    var handleChange = function handleChange(_value, checked, event) {
      onCheck === null || onCheck === void 0 || onCheck(item, event, checked);
    };
    return /*#__PURE__*/React.createElement("div", {
      role: "treeitem",
      "aria-disabled": disabled,
      key: key,
      className: rowClasses,
      "data-key": item[valueKey]
    }, /*#__PURE__*/React.createElement(Checkbox, {
      disabled: disabled,
      checked: active,
      value: item[valueKey],
      indeterminate: indeterminate,
      onChange: handleChange
    }, /*#__PURE__*/React.createElement("span", {
      className: prefix('col-group')
    }, nodes.map(function (node, index) {
      return /*#__PURE__*/React.createElement("span", {
        key: "col-" + index,
        className: prefix('col')
      }, node[labelKey]);
    }))));
  };
  return /*#__PURE__*/React.createElement(Component, _extends({
    className: classes
  }, rest), /*#__PURE__*/React.createElement(SearchBox, {
    placeholder: searchPlaceholder,
    onChange: onSearch,
    value: searchKeyword,
    inputRef: inputRef
  }), searchKeyword !== '' && /*#__PURE__*/React.createElement("div", {
    className: prefix('panel'),
    "data-layer": 0,
    role: "tree"
  }, data.length ? data.map(renderSearchRow) : /*#__PURE__*/React.createElement("div", {
    className: merge(prefix('none'), rootPrefix('picker-none'))
  }, noResultsText)));
}
export default SearchView;