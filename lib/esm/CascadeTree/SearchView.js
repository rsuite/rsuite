'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "classPrefix", "className", "searchKeyword", "labelKey", "locale", "valueKey", "parentMap", "data", "focusItemValue", "disabledItemValues", "inputRef", "renderSearchItem", "onSearch", "onSelect"];
import React from 'react';
import SearchBox from "../internals/SearchBox/index.js";
import Highlight from "../Highlight/index.js";
import { useClassNames } from "../internals/hooks/index.js";
import { getPathTowardsItem } from "../internals/Tree/utils/index.js";
import { useCustom } from "../CustomProvider/index.js";
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
    var items = getPathTowardsItem(item, function (item) {
      return parentMap.get(item);
    });
    var formattedNodes = items.map(function (itemData) {
      var _extends2;
      var label = /*#__PURE__*/React.createElement(Highlight, {
        as: "span",
        query: searchKeyword
      }, itemData[labelKey]);
      return _extends({}, itemData, (_extends2 = {}, _extends2[labelKey] = label, _extends2));
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
      return /*#__PURE__*/React.createElement("span", {
        key: "col-" + index,
        className: prefix('col')
      }, itemData[labelKey]);
    });
    var handleCheck = function handleCheck(event) {
      if (!disabled) {
        onSelect(item, items, event);
      }
    };
    return /*#__PURE__*/React.createElement("div", {
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