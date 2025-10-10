'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "appearance", "classPrefix", "defaultValue", "columnHeight", "columnWidth", "childrenKey", "cleanable", "data", "disabled", "disabledItemValues", "value", "valueKey", "labelKey", "locale", "toggleAs", "style", "countable", "cascade", "placeholder", "placement", "popupClassName", "popupStyle", "searchable", "uncheckableItemValues", "id", "getChildren", "renderValue", "renderExtraFooter", "renderColumn", "renderTreeNode", "onEntered", "onExited", "onClean", "onSearch", "onSelect", "onChange", "onCheck", "menuClassName", "menuStyle", "menuWidth", "menuHeight", "renderMenu", "renderMenuItem"];
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';
import { findNodeOfTree } from "../internals/Tree/utils/index.js";
import { useClassNames, useControlled, useEventCallback } from "../internals/hooks/index.js";
import { getColumnsAndPaths } from "../CascadeTree/utils.js";
import { createChainedFunction, mergeRefs } from "../internals/utils/index.js";
import { PickerToggle, PickerPopup, SelectedElement, PickerToggleTrigger, usePickerClassName, usePickerRef, useToggleKeyDownEvent, useFocusItemValue, pickTriggerPropKeys, omitTriggerPropKeys, listPickerPropTypes } from "../internals/Picker/index.js";
import { deprecatePropTypeNew } from "../internals/propTypes/index.js";
import { useCascadeValue, useSearch, useSelect } from "../MultiCascadeTree/hooks/index.js";
import TreeView from "../MultiCascadeTree/TreeView.js";
import SearchView from "../MultiCascadeTree/SearchView.js";
import useActive from "../Cascader/useActive.js";
import { oneOf } from "../internals/propTypes/index.js";
import { useCustom } from "../CustomProvider/index.js";
var emptyArray = [];

/**
 * The `MultiCascader` component is used to select multiple values from cascading options.
 * @see https://rsuitejs.com/components/multi-cascader/
 */
var MultiCascader = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _selectedPaths;
  var _useCustom = useCustom('MultiCascader', props),
    propsWithDefaults = _useCustom.propsWithDefaults,
    rtl = _useCustom.rtl;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'picker' : _propsWithDefaults$cl,
    defaultValue = propsWithDefaults.defaultValue,
    columnHeight = propsWithDefaults.columnHeight,
    columnWidth = propsWithDefaults.columnWidth,
    _propsWithDefaults$ch = propsWithDefaults.childrenKey,
    childrenKey = _propsWithDefaults$ch === void 0 ? 'children' : _propsWithDefaults$ch,
    _propsWithDefaults$cl2 = propsWithDefaults.cleanable,
    cleanable = _propsWithDefaults$cl2 === void 0 ? true : _propsWithDefaults$cl2,
    _propsWithDefaults$da = propsWithDefaults.data,
    data = _propsWithDefaults$da === void 0 ? emptyArray : _propsWithDefaults$da,
    disabled = propsWithDefaults.disabled,
    _propsWithDefaults$di = propsWithDefaults.disabledItemValues,
    disabledItemValues = _propsWithDefaults$di === void 0 ? emptyArray : _propsWithDefaults$di,
    valueProp = propsWithDefaults.value,
    _propsWithDefaults$va = propsWithDefaults.valueKey,
    valueKey = _propsWithDefaults$va === void 0 ? 'value' : _propsWithDefaults$va,
    _propsWithDefaults$la = propsWithDefaults.labelKey,
    labelKey = _propsWithDefaults$la === void 0 ? 'label' : _propsWithDefaults$la,
    locale = propsWithDefaults.locale,
    toggleAs = propsWithDefaults.toggleAs,
    style = propsWithDefaults.style,
    _propsWithDefaults$co = propsWithDefaults.countable,
    countable = _propsWithDefaults$co === void 0 ? true : _propsWithDefaults$co,
    _propsWithDefaults$ca = propsWithDefaults.cascade,
    cascade = _propsWithDefaults$ca === void 0 ? true : _propsWithDefaults$ca,
    placeholder = propsWithDefaults.placeholder,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'bottomStart' : _propsWithDefaults$pl,
    popupClassName = propsWithDefaults.popupClassName,
    popupStyle = propsWithDefaults.popupStyle,
    _propsWithDefaults$se = propsWithDefaults.searchable,
    searchable = _propsWithDefaults$se === void 0 ? true : _propsWithDefaults$se,
    _propsWithDefaults$un = propsWithDefaults.uncheckableItemValues,
    uncheckableItemValues = _propsWithDefaults$un === void 0 ? emptyArray : _propsWithDefaults$un,
    id = propsWithDefaults.id,
    getChildren = propsWithDefaults.getChildren,
    renderValue = propsWithDefaults.renderValue,
    renderExtraFooter = propsWithDefaults.renderExtraFooter,
    renderColumn = propsWithDefaults.renderColumn,
    renderTreeNode = propsWithDefaults.renderTreeNode,
    onEntered = propsWithDefaults.onEntered,
    onExited = propsWithDefaults.onExited,
    onClean = propsWithDefaults.onClean,
    onSearch = propsWithDefaults.onSearch,
    onSelect = propsWithDefaults.onSelect,
    onChange = propsWithDefaults.onChange,
    onCheck = propsWithDefaults.onCheck,
    DEPRECATED_menuClassName = propsWithDefaults.menuClassName,
    DEPRECATED_menuStyle = propsWithDefaults.menuStyle,
    DEPRECATED_menuWidth = propsWithDefaults.menuWidth,
    DEPRECATED_menuHeight = propsWithDefaults.menuHeight,
    DEPRECATED_renderMenu = propsWithDefaults.renderMenu,
    DEPRECATED_renderMenuItem = propsWithDefaults.renderMenuItem,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _usePickerRef = usePickerRef(ref),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay,
    searchInput = _usePickerRef.searchInput;
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var onSelectCallback = useCallback(function (node, cascadePaths, event) {
    var _trigger$current, _trigger$current$upda;
    onSelect === null || onSelect === void 0 || onSelect(node, cascadePaths, event);
    (_trigger$current = trigger.current) === null || _trigger$current === void 0 || (_trigger$current$upda = _trigger$current.updatePosition) === null || _trigger$current$upda === void 0 || _trigger$current$upda.call(_trigger$current);
  }, [onSelect, trigger]);
  var _useSelect = useSelect({
      data: data,
      childrenKey: childrenKey,
      labelKey: labelKey,
      valueKey: valueKey,
      onSelect: onSelectCallback,
      getChildren: getChildren
    }),
    selectedPaths = _useSelect.selectedPaths,
    flattenData = _useSelect.flattenData,
    columnData = _useSelect.columnData,
    setColumnData = _useSelect.setColumnData,
    setSelectedPaths = _useSelect.setSelectedPaths,
    handleSelect = _useSelect.handleSelect;
  var _useControlled = useControlled(valueProp, defaultValue),
    controlledValue = _useControlled[0];
  var itemKeys = {
    childrenKey: childrenKey,
    labelKey: labelKey,
    valueKey: valueKey
  };
  var cascadeValueProps = _extends({}, itemKeys, {
    uncheckableItemValues: uncheckableItemValues,
    cascade: cascade,
    value: controlledValue,
    onCheck: onCheck,
    onChange: onChange
  });
  var _useCascadeValue = useCascadeValue(cascadeValueProps, flattenData),
    value = _useCascadeValue.value,
    setValue = _useCascadeValue.setValue,
    handleCheck = _useCascadeValue.handleCheck;
  var selectedItems = flattenData.filter(function (item) {
    return value.some(function (v) {
      return v === item[valueKey];
    });
  }) || [];
  var onFocusItemCallback = useCallback(function (value) {
    var _getColumnsAndPaths = getColumnsAndPaths(data, flattenData.find(function (item) {
        return item[valueKey] === value;
      }), {
        getParent: function getParent() {
          return undefined;
        },
        getChildren: function getChildren(item) {
          return item[childrenKey];
        }
      }),
      columns = _getColumnsAndPaths.columns,
      path = _getColumnsAndPaths.path;
    setColumnData(columns);
    setSelectedPaths(path);
  }, [childrenKey, data, flattenData, setColumnData, setSelectedPaths, valueKey]);

  // Used to hover the focuse item  when trigger `onKeydown`
  var _useFocusItemValue = useFocusItemValue(selectedPaths === null || selectedPaths === void 0 || (_selectedPaths = selectedPaths[selectedPaths.length - 1]) === null || _selectedPaths === void 0 ? void 0 : _selectedPaths[valueKey], {
      rtl: rtl,
      data: flattenData,
      valueKey: valueKey,
      defaultLayer: selectedPaths !== null && selectedPaths !== void 0 && selectedPaths.length ? selectedPaths.length - 1 : 0,
      target: function target() {
        return overlay.current;
      },
      callback: onFocusItemCallback
    }),
    focusItemValue = _useFocusItemValue.focusItemValue,
    setLayer = _useFocusItemValue.setLayer,
    setKeys = _useFocusItemValue.setKeys,
    onFocusItem = _useFocusItemValue.onKeyDown;
  var onSearchCallback = function onSearchCallback(value, event) {
    if (value) {
      setLayer(0);
    } else if (selectedPaths !== null && selectedPaths !== void 0 && selectedPaths.length) {
      setLayer(selectedPaths.length - 1);
    }
    setKeys([]);
    onSearch === null || onSearch === void 0 || onSearch(value, event);
  };
  var _useSearch = useSearch({
      labelKey: labelKey,
      valueKey: valueKey,
      childrenKey: childrenKey,
      flattenedData: flattenData,
      uncheckableItemValues: uncheckableItemValues,
      onSearch: onSearchCallback
    }),
    items = _useSearch.items,
    searchKeyword = _useSearch.searchKeyword,
    setSearchKeyword = _useSearch.setSearchKeyword,
    handleSearch = _useSearch.handleSearch;
  var _useActive = useActive({
      onEntered: onEntered,
      onExited: onExited,
      target: target,
      setSearchKeyword: setSearchKeyword
    }),
    active = _useActive.active,
    handleEntered = _useActive.handleEntered,
    handleExited = _useActive.handleExited;
  var handleClean = useEventCallback(function (event) {
    if (disabled || !target.current) {
      return;
    }
    setSelectedPaths([]);
    setValue([]);
    setColumnData([data]);
    onChange === null || onChange === void 0 || onChange([], event);
  });
  var handleMenuPressEnter = useEventCallback(function (event) {
    var _overlay$current;
    var focusItem = findNodeOfTree(data, function (item) {
      return item[valueKey] === focusItemValue;
    });
    var checkbox = (_overlay$current = overlay.current) === null || _overlay$current === void 0 ? void 0 : _overlay$current.querySelector("[data-key=\"" + focusItemValue + "\"] [type=\"checkbox\"]");
    if (checkbox) {
      handleCheck(focusItem, event, (checkbox === null || checkbox === void 0 ? void 0 : checkbox.getAttribute('aria-checked')) !== 'true');
    }
  });
  var onPickerKeyDown = useToggleKeyDownEvent(_extends({
    toggle: !focusItemValue || !active,
    trigger: trigger,
    target: target,
    overlay: overlay,
    searchInput: searchInput,
    active: active,
    onExit: handleClean,
    onMenuKeyDown: onFocusItem,
    onMenuPressEnter: handleMenuPressEnter
  }, rest));
  var renderCascadeColumn = function renderCascadeColumn(childNodes, column) {
    var items = column.items,
      parentItem = column.parentItem,
      layer = column.layer;
    if (typeof renderColumn === 'function') {
      return renderColumn(childNodes, column);
    } else if (typeof DEPRECATED_renderMenu === 'function') {
      return DEPRECATED_renderMenu(items, childNodes, parentItem, layer);
    }
    return childNodes;
  };
  var renderCascadeTreeNode = function renderCascadeTreeNode(node, itemData) {
    var render = typeof renderTreeNode === 'function' ? renderTreeNode : DEPRECATED_renderMenuItem;
    if (typeof render === 'function') {
      return render(node, itemData);
    }
    return node;
  };
  var renderTreeView = function renderTreeView(positionProps, speakerRef) {
    var _ref = positionProps || {},
      left = _ref.left,
      top = _ref.top,
      className = _ref.className;
    var styles = _extends({}, DEPRECATED_menuStyle, popupStyle, {
      left: left,
      top: top
    });
    var classes = merge(className, DEPRECATED_menuClassName, popupClassName, prefix('popup-multi-cascader'));
    return /*#__PURE__*/React.createElement(PickerPopup, {
      ref: mergeRefs(overlay, speakerRef),
      className: classes,
      style: styles,
      target: trigger,
      onKeyDown: onPickerKeyDown
    }, searchable && /*#__PURE__*/React.createElement(SearchView, {
      locale: locale,
      cascade: cascade,
      data: items,
      value: value,
      searchKeyword: searchKeyword,
      valueKey: valueKey,
      labelKey: labelKey,
      childrenKey: childrenKey,
      disabledItemValues: disabledItemValues,
      inputRef: searchInput,
      onCheck: handleCheck,
      onSearch: handleSearch
    }), !searchKeyword && /*#__PURE__*/React.createElement(TreeView, {
      cascade: cascade,
      columnWidth: columnWidth !== null && columnWidth !== void 0 ? columnWidth : DEPRECATED_menuWidth,
      columnHeight: columnHeight !== null && columnHeight !== void 0 ? columnHeight : DEPRECATED_menuHeight,
      classPrefix: "cascade-tree",
      uncheckableItemValues: uncheckableItemValues,
      disabledItemValues: disabledItemValues,
      valueKey: valueKey,
      labelKey: labelKey,
      childrenKey: childrenKey,
      cascadeData: columnData,
      cascadePaths: selectedPaths,
      value: value,
      onSelect: handleSelect,
      onCheck: handleCheck,
      renderColumn: renderCascadeColumn,
      renderTreeNode: renderCascadeTreeNode
    }), renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };
  var selectedElement = placeholder;
  if (selectedItems.length > 0) {
    selectedElement = /*#__PURE__*/React.createElement(SelectedElement, {
      selectedItems: selectedItems,
      countable: countable,
      valueKey: valueKey,
      labelKey: labelKey,
      childrenKey: childrenKey,
      prefix: prefix,
      cascade: cascade,
      locale: locale
    });
  }

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  var hasValue = selectedItems.length > 0 || Number(valueProp === null || valueProp === void 0 ? void 0 : valueProp.length) > 0 && isFunction(renderValue);
  if (hasValue && isFunction(renderValue)) {
    selectedElement = renderValue(value.length ? value : valueProp !== null && valueProp !== void 0 ? valueProp : [], selectedItems, selectedElement);
    // If renderValue returns null or undefined, hasValue is false.
    if (isNil(selectedElement)) {
      hasValue = false;
    }
  }
  var _usePickerClassName = usePickerClassName(_extends({}, props, {
      classPrefix: classPrefix,
      hasValue: hasValue,
      countable: countable,
      name: 'cascader',
      appearance: appearance,
      cleanable: cleanable
    })),
    classes = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  return /*#__PURE__*/React.createElement(PickerToggleTrigger, {
    id: id,
    popupType: "tree",
    multiple: true,
    pickerProps: pick(props, pickTriggerPropKeys),
    ref: trigger,
    placement: placement,
    onEnter: handleEntered,
    onExited: handleExited,
    speaker: renderTreeView
  }, /*#__PURE__*/React.createElement(Component, {
    className: classes,
    style: style,
    ref: root
  }, /*#__PURE__*/React.createElement(PickerToggle, _extends({}, omit(rest, [].concat(omitTriggerPropKeys, usedClassNamePropKeys)), {
    as: toggleAs,
    appearance: appearance,
    disabled: disabled,
    ref: target,
    onClean: createChainedFunction(handleClean, onClean),
    onKeyDown: onPickerKeyDown,
    cleanable: cleanable && !disabled,
    hasValue: hasValue,
    active: active,
    placement: placement,
    inputValue: value
  }), selectedElement || (locale === null || locale === void 0 ? void 0 : locale.placeholder))));
});
MultiCascader.displayName = 'MultiCascader';
MultiCascader.propTypes = _extends({}, listPickerPropTypes, {
  value: PropTypes.array,
  disabledItemValues: PropTypes.array,
  locale: PropTypes.any,
  appearance: oneOf(['default', 'subtle']),
  cascade: PropTypes.bool,
  countable: PropTypes.bool,
  uncheckableItemValues: PropTypes.array,
  searchable: PropTypes.bool,
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
  onCheck: PropTypes.func,
  inline: deprecatePropTypeNew(PropTypes.bool, 'Use `<MultiCascadeTree>` instead.'),
  renderMenu: deprecatePropTypeNew(PropTypes.func, 'Use "renderColumn" property instead.'),
  renderMenuItem: deprecatePropTypeNew(PropTypes.func, 'Use "renderTreeNode" property instead.'),
  menuWidth: deprecatePropTypeNew(PropTypes.number, 'Use "columnWidth" property instead.'),
  menuHeight: deprecatePropTypeNew(PropTypes.number, 'Use "columnHeight" property instead.')
});
export default MultiCascader;