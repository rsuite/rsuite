'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "data", "defaultValue", "className", "classPrefix", "value", "valueKey", "labelKey", "locale", "childrenKey", "disabledItemValues", "cascade", "columnWidth", "columnHeight", "searchable", "uncheckableItemValues", "getChildren", "renderColumn", "renderTreeNode", "onSelect", "onCheck", "onChange", "onSearch"];
import React from 'react';
import TreeView from "./TreeView.js";
import SearchView from "./SearchView.js";
import { useCascadeValue, useSelect, useSearch } from "./hooks/index.js";
import { useClassNames, useControlled } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
var emptyArray = [];

/**
 * The `MultiCascadeTree` component is used to select multiple values from cascading options.
 * @see https://rsuitejs.com/components/multi-cascade-tree/
 */
var MultiCascadeTree = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('MultiCascadeTree', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$da = propsWithDefaults.data,
    data = _propsWithDefaults$da === void 0 ? emptyArray : _propsWithDefaults$da,
    defaultValue = propsWithDefaults.defaultValue,
    className = propsWithDefaults.className,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'cascade-tree' : _propsWithDefaults$cl,
    valueProp = propsWithDefaults.value,
    _propsWithDefaults$va = propsWithDefaults.valueKey,
    valueKey = _propsWithDefaults$va === void 0 ? 'value' : _propsWithDefaults$va,
    _propsWithDefaults$la = propsWithDefaults.labelKey,
    labelKey = _propsWithDefaults$la === void 0 ? 'label' : _propsWithDefaults$la,
    locale = propsWithDefaults.locale,
    _propsWithDefaults$ch = propsWithDefaults.childrenKey,
    childrenKey = _propsWithDefaults$ch === void 0 ? 'children' : _propsWithDefaults$ch,
    _propsWithDefaults$di = propsWithDefaults.disabledItemValues,
    disabledItemValues = _propsWithDefaults$di === void 0 ? emptyArray : _propsWithDefaults$di,
    _propsWithDefaults$ca = propsWithDefaults.cascade,
    cascade = _propsWithDefaults$ca === void 0 ? true : _propsWithDefaults$ca,
    columnWidth = propsWithDefaults.columnWidth,
    columnHeight = propsWithDefaults.columnHeight,
    searchable = propsWithDefaults.searchable,
    _propsWithDefaults$un = propsWithDefaults.uncheckableItemValues,
    uncheckableItemValues = _propsWithDefaults$un === void 0 ? emptyArray : _propsWithDefaults$un,
    getChildren = propsWithDefaults.getChildren,
    renderColumn = propsWithDefaults.renderColumn,
    renderTreeNode = propsWithDefaults.renderTreeNode,
    onSelect = propsWithDefaults.onSelect,
    onCheck = propsWithDefaults.onCheck,
    onChange = propsWithDefaults.onChange,
    onSearch = propsWithDefaults.onSearch,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var itemKeys = {
    childrenKey: childrenKey,
    labelKey: labelKey,
    valueKey: valueKey
  };
  var _useSelect = useSelect({
      data: data,
      childrenKey: childrenKey,
      labelKey: labelKey,
      valueKey: valueKey,
      onSelect: onSelect,
      getChildren: getChildren
    }),
    selectedPaths = _useSelect.selectedPaths,
    flattenData = _useSelect.flattenData,
    columnData = _useSelect.columnData,
    handleSelect = _useSelect.handleSelect;
  var _useControlled = useControlled(valueProp, defaultValue),
    controlledValue = _useControlled[0];
  var cascadeValueProps = _extends({}, itemKeys, {
    uncheckableItemValues: uncheckableItemValues,
    cascade: cascade,
    value: controlledValue,
    onCheck: onCheck,
    onChange: onChange
  });
  var _useCascadeValue = useCascadeValue(cascadeValueProps, flattenData),
    value = _useCascadeValue.value,
    handleCheck = _useCascadeValue.handleCheck;
  var _useSearch = useSearch({
      labelKey: labelKey,
      valueKey: valueKey,
      childrenKey: childrenKey,
      flattenedData: flattenData,
      uncheckableItemValues: uncheckableItemValues,
      onSearch: onSearch
    }),
    items = _useSearch.items,
    searchKeyword = _useSearch.searchKeyword,
    handleSearch = _useSearch.handleSearch;
  var _useClassNames = useClassNames(classPrefix),
    withClassPrefix = _useClassNames.withClassPrefix,
    merge = _useClassNames.merge;
  var classes = merge(className, withClassPrefix('multi'));
  return /*#__PURE__*/React.createElement(Component, _extends({
    ref: ref,
    className: classes
  }, rest), searchable && /*#__PURE__*/React.createElement(SearchView, {
    cascade: cascade,
    data: items,
    value: value,
    searchKeyword: searchKeyword,
    valueKey: valueKey,
    labelKey: labelKey,
    locale: locale,
    childrenKey: childrenKey,
    disabledItemValues: disabledItemValues,
    onCheck: handleCheck,
    onSearch: handleSearch
  }), !searchKeyword && /*#__PURE__*/React.createElement(TreeView, {
    cascade: cascade,
    columnWidth: columnWidth,
    columnHeight: columnHeight,
    uncheckableItemValues: uncheckableItemValues,
    disabledItemValues: disabledItemValues,
    valueKey: valueKey,
    labelKey: labelKey,
    childrenKey: childrenKey,
    classPrefix: classPrefix,
    cascadeData: columnData,
    cascadePaths: selectedPaths,
    value: value,
    onSelect: handleSelect,
    onCheck: handleCheck,
    renderColumn: renderColumn,
    renderTreeNode: renderTreeNode
  }));
});
MultiCascadeTree.displayName = 'MultiCascadeTree';
export default MultiCascadeTree;