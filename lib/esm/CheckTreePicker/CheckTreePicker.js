'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _omit from "lodash/omit";
import _isFunction from "lodash/isFunction";
import _pick from "lodash/pick";
import _isNil from "lodash/isNil";
var _excluded = ["as", "id", "appearance", "cleanable", "countable", "cascade", "classPrefix", "childrenKey", "disabled", "data", "defaultValue", "defaultExpandAll", "disabledItemValues", "expandItemValues", "defaultExpandItemValues", "placeholder", "popupClassName", "popupStyle", "popupAutoWidth", "placement", "treeHeight", "toggleAs", "menuAutoWidth", "menuClassName", "menuStyle", "style", "searchBy", "searchKeyword", "showIndentLine", "searchable", "valueKey", "value", "virtualized", "uncheckableItemValues", "locale", "labelKey", "listProps", "getChildren", "renderExtraFooter", "onEnter", "onChange", "onClean", "onExit", "onSearch", "onSelect", "onSelectItem", "onScroll", "onExpand", "renderValue", "renderMenu", "renderTree", "renderTreeIcon", "renderTreeNode", "onCascadeChange"];
import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useClassNames, useEventCallback } from "../internals/hooks/index.js";
import { createChainedFunction, mergeRefs } from "../internals/utils/index.js";
import { PickerToggle, onMenuKeyDown, PickerPopup, SelectedElement, PickerToggleTrigger, usePickerClassName, useToggleKeyDownEvent, usePickerRef, pickTriggerPropKeys, omitTriggerPropKeys } from "../internals/Picker/index.js";
import CheckTreeView from "../CheckTree/CheckTreeView.js";
import useTreeValue from "../CheckTree/hooks/useTreeValue.js";
import useFlattenTree from "../Tree/hooks/useFlattenTree.js";
import useTreeWithChildren from "../Tree/hooks/useTreeWithChildren.js";
import useExpandTree from "../Tree/hooks/useExpandTree.js";
import useFocusState from "./hooks/useFocusState.js";
import { getSelectedItems } from "../CheckTree/utils.js";
import { TreeProvider, useTreeImperativeHandle } from "../internals/Tree/TreeProvider.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `CheckTreePicker` component is used for selecting multiple options which are organized in a tree structure.
 *
 * @see https://rsuitejs.com/components/check-tree-picker
 */
var CheckTreePicker = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('CheckTreePicker', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    id = propsWithDefaults.id,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    _propsWithDefaults$cl = propsWithDefaults.cleanable,
    cleanable = _propsWithDefaults$cl === void 0 ? true : _propsWithDefaults$cl,
    _propsWithDefaults$co = propsWithDefaults.countable,
    countable = _propsWithDefaults$co === void 0 ? true : _propsWithDefaults$co,
    _propsWithDefaults$ca = propsWithDefaults.cascade,
    cascade = _propsWithDefaults$ca === void 0 ? true : _propsWithDefaults$ca,
    _propsWithDefaults$cl2 = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl2 === void 0 ? 'picker' : _propsWithDefaults$cl2,
    _propsWithDefaults$ch = propsWithDefaults.childrenKey,
    childrenKey = _propsWithDefaults$ch === void 0 ? 'children' : _propsWithDefaults$ch,
    disabled = propsWithDefaults.disabled,
    _propsWithDefaults$da = propsWithDefaults.data,
    data = _propsWithDefaults$da === void 0 ? [] : _propsWithDefaults$da,
    _propsWithDefaults$de = propsWithDefaults.defaultValue,
    defaultValue = _propsWithDefaults$de === void 0 ? [] : _propsWithDefaults$de,
    _propsWithDefaults$de2 = propsWithDefaults.defaultExpandAll,
    defaultExpandAll = _propsWithDefaults$de2 === void 0 ? false : _propsWithDefaults$de2,
    _propsWithDefaults$di = propsWithDefaults.disabledItemValues,
    disabledItemValues = _propsWithDefaults$di === void 0 ? [] : _propsWithDefaults$di,
    controlledExpandItemValues = propsWithDefaults.expandItemValues,
    _propsWithDefaults$de3 = propsWithDefaults.defaultExpandItemValues,
    defaultExpandItemValues = _propsWithDefaults$de3 === void 0 ? [] : _propsWithDefaults$de3,
    placeholder = propsWithDefaults.placeholder,
    popupClassName = propsWithDefaults.popupClassName,
    popupStyle = propsWithDefaults.popupStyle,
    _propsWithDefaults$po = propsWithDefaults.popupAutoWidth,
    popupAutoWidth = _propsWithDefaults$po === void 0 ? true : _propsWithDefaults$po,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'bottomStart' : _propsWithDefaults$pl,
    _propsWithDefaults$tr = propsWithDefaults.treeHeight,
    treeHeight = _propsWithDefaults$tr === void 0 ? 320 : _propsWithDefaults$tr,
    toggleAs = propsWithDefaults.toggleAs,
    _propsWithDefaults$me = propsWithDefaults.menuAutoWidth,
    menuAutoWidth = _propsWithDefaults$me === void 0 ? popupAutoWidth : _propsWithDefaults$me,
    DEPRECATED_menuClassName = propsWithDefaults.menuClassName,
    DEPRECATED_menuStyle = propsWithDefaults.menuStyle,
    style = propsWithDefaults.style,
    searchBy = propsWithDefaults.searchBy,
    searchKeyword = propsWithDefaults.searchKeyword,
    showIndentLine = propsWithDefaults.showIndentLine,
    _propsWithDefaults$se = propsWithDefaults.searchable,
    searchable = _propsWithDefaults$se === void 0 ? true : _propsWithDefaults$se,
    _propsWithDefaults$va = propsWithDefaults.valueKey,
    valueKey = _propsWithDefaults$va === void 0 ? 'value' : _propsWithDefaults$va,
    controlledValue = propsWithDefaults.value,
    _propsWithDefaults$vi = propsWithDefaults.virtualized,
    virtualized = _propsWithDefaults$vi === void 0 ? false : _propsWithDefaults$vi,
    _propsWithDefaults$un = propsWithDefaults.uncheckableItemValues,
    uncheckableItemValues = _propsWithDefaults$un === void 0 ? [] : _propsWithDefaults$un,
    locale = propsWithDefaults.locale,
    _propsWithDefaults$la = propsWithDefaults.labelKey,
    labelKey = _propsWithDefaults$la === void 0 ? 'label' : _propsWithDefaults$la,
    listProps = propsWithDefaults.listProps,
    getChildren = propsWithDefaults.getChildren,
    renderExtraFooter = propsWithDefaults.renderExtraFooter,
    onEnter = propsWithDefaults.onEnter,
    onChange = propsWithDefaults.onChange,
    onClean = propsWithDefaults.onClean,
    onExit = propsWithDefaults.onExit,
    onSearch = propsWithDefaults.onSearch,
    onSelect = propsWithDefaults.onSelect,
    onSelectItem = propsWithDefaults.onSelectItem,
    onScroll = propsWithDefaults.onScroll,
    onExpand = propsWithDefaults.onExpand,
    renderValue = propsWithDefaults.renderValue,
    DEPRECATED_renderMenu = propsWithDefaults.renderMenu,
    _propsWithDefaults$re = propsWithDefaults.renderTree,
    renderTree = _propsWithDefaults$re === void 0 ? DEPRECATED_renderMenu : _propsWithDefaults$re,
    renderTreeIcon = propsWithDefaults.renderTreeIcon,
    renderTreeNode = propsWithDefaults.renderTreeNode,
    onCascadeChange = propsWithDefaults.onCascadeChange,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _usePickerRef = usePickerRef(ref),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay,
    list = _usePickerRef.list,
    searchInput = _usePickerRef.searchInput,
    treeView = _usePickerRef.treeView;
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix;
  var _useTreeValue = useTreeValue(controlledValue, {
      defaultValue: defaultValue,
      uncheckableItemValues: uncheckableItemValues
    }),
    value = _useTreeValue[0],
    setValue = _useTreeValue[1];
  var itemDataKeys = {
    childrenKey: childrenKey,
    labelKey: labelKey,
    valueKey: valueKey
  };
  var _useTreeWithChildren = useTreeWithChildren(data, itemDataKeys),
    treeData = _useTreeWithChildren.treeData,
    loadingNodeValues = _useTreeWithChildren.loadingNodeValues,
    appendChild = _useTreeWithChildren.appendChild;
  var _useExpandTree = useExpandTree(data, _extends({}, itemDataKeys, {
      defaultExpandAll: defaultExpandAll,
      defaultExpandItemValues: defaultExpandItemValues,
      controlledExpandItemValues: controlledExpandItemValues,
      onExpand: onExpand,
      getChildren: getChildren,
      appendChild: appendChild
    })),
    expandItemValues = _useExpandTree.expandItemValues,
    handleExpandTreeNode = _useExpandTree.handleExpandTreeNode;
  var flattenedNodes = useFlattenTree(treeData, _extends({}, itemDataKeys, {
    uncheckableItemValues: uncheckableItemValues,
    multiple: true,
    cascade: cascade,
    value: value
  }));
  var selectedNodes = getSelectedItems(flattenedNodes, value);
  var _useTreeImperativeHan = useTreeImperativeHandle(),
    register = _useTreeImperativeHan.register,
    focusFirstNode = _useTreeImperativeHan.focusFirstNode;
  var _useFocusState = useFocusState({
      target: target,
      onEnter: onEnter,
      onExit: onExit
    }),
    focusItemValue = _useFocusState.focusItemValue,
    setFocusItemValue = _useFocusState.setFocusItemValue,
    active = _useFocusState.active,
    triggerProps = _useFocusState.triggerProps;
  var handleClean = useEventCallback(function (event) {
    var target = event.target;
    // exclude searchbox
    if (target.matches('input[role="searchbox"]') || disabled || !cleanable) {
      return;
    }
    setFocusItemValue(null);
    setValue([]);
    onChange === null || onChange === void 0 || onChange([], event);
    onCascadeChange === null || onCascadeChange === void 0 || onCascadeChange([], event);
  });
  var handleTreeKeyDown = useEventCallback(function (event) {
    onMenuKeyDown(event, {
      del: handleClean,
      down: function down() {
        return focusFirstNode();
      }
    });
  });
  var onPickerKeydown = useToggleKeyDownEvent(_extends({
    toggle: !focusItemValue || !active,
    trigger: trigger,
    target: target,
    overlay: overlay,
    searchInput: searchInput,
    active: active,
    onExit: handleClean,
    onMenuKeyDown: handleTreeKeyDown
  }, rest));

  // transform the parent node value to the leaf node value
  var handleTransValue2Children = useEventCallback(function (nextSelectedNodes) {
    return nextSelectedNodes.map(function (node) {
      var currentNode = node.refKey ? flattenedNodes[node.refKey] : null;
      if (currentNode && currentNode[childrenKey] && currentNode[childrenKey].length) {
        var childNodes = currentNode[childrenKey].filter(function (child) {
          var childValue = child[valueKey];
          return !disabledItemValues.includes(childValue) && !uncheckableItemValues.includes(childValue);
        });
        return handleTransValue2Children(childNodes);
      }
      return node;
    }).flat();
  });
  var handleChangeCascade = useEventCallback(function (nextValue, event) {
    if (!cascade) {
      onCascadeChange === null || onCascadeChange === void 0 || onCascadeChange(nextValue, event);
    } else {
      var nextSelectedNodes = getSelectedItems(flattenedNodes, nextValue);
      var childrenNodes = handleTransValue2Children(nextSelectedNodes);
      var childrenValue = childrenNodes.map(function (node) {
        return node[valueKey];
      });
      onCascadeChange === null || onCascadeChange === void 0 || onCascadeChange(childrenValue, event);
    }
  });
  var handleChange = useEventCallback(function (nextValue, event) {
    setValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue, event);
    handleChangeCascade(nextValue, event);
  });
  var treeContext = useMemo(function () {
    return {
      register: register,
      props: {
        labelKey: labelKey,
        valueKey: valueKey,
        childrenKey: childrenKey,
        virtualized: virtualized,
        renderTreeIcon: renderTreeIcon,
        renderTreeNode: renderTreeNode
      }
    };
  }, [childrenKey, labelKey, valueKey, virtualized, register, renderTreeIcon, renderTreeNode]);
  var checkTreeView = /*#__PURE__*/React.createElement(TreeProvider, {
    value: treeContext
  }, /*#__PURE__*/React.createElement(CheckTreeView, {
    ref: treeView,
    disabledItemValues: disabledItemValues,
    expandItemValues: expandItemValues,
    uncheckableItemValues: uncheckableItemValues,
    cascade: cascade,
    data: treeData,
    height: treeHeight,
    showIndentLine: showIndentLine,
    listProps: listProps,
    listRef: list,
    locale: locale,
    searchBy: searchBy,
    searchable: searchable,
    searchKeyword: searchKeyword,
    searchInputRef: searchInput,
    onScroll: onScroll,
    onSelect: onSelect,
    onSelectItem: onSelectItem,
    onExpand: handleExpandTreeNode,
    onSearch: onSearch,
    onChange: handleChange,
    onFocusItem: setFocusItemValue,
    value: value,
    loadingNodeValues: loadingNodeValues,
    flattenedNodes: flattenedNodes
  }));
  var renderTreeView = function renderTreeView(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var classes = classNames(className, popupClassName, DEPRECATED_menuClassName, prefix('check-tree-menu'));
    var mergedMenuStyle = _extends({}, popupStyle, DEPRECATED_menuStyle, {
      left: left,
      top: top
    });
    return /*#__PURE__*/React.createElement(PickerPopup, {
      ref: mergeRefs(overlay, speakerRef),
      autoWidth: menuAutoWidth,
      className: classes,
      style: mergedMenuStyle,
      onKeyDown: onPickerKeydown,
      target: trigger
    }, renderTree ? renderTree(checkTreeView) : checkTreeView, renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  var hasValidValue = selectedNodes.length > 0 || value.length > 0 && _isFunction(renderValue);
  var selectedElement = placeholder;
  if (hasValidValue) {
    selectedElement = /*#__PURE__*/React.createElement(SelectedElement, {
      selectedItems: selectedNodes,
      countable: countable,
      valueKey: valueKey,
      labelKey: labelKey,
      childrenKey: childrenKey,
      prefix: prefix,
      cascade: cascade,
      locale: locale
    });
    if (_isFunction(renderValue)) {
      selectedElement = renderValue(value, selectedNodes, selectedElement);
      if (_isNil(selectedElement)) {
        hasValidValue = false;
      }
    }
  }
  var _usePickerClassName = usePickerClassName(_extends({}, props, {
      classPrefix: classPrefix,
      appearance: appearance,
      countable: countable,
      cleanable: cleanable,
      disabled: disabled,
      hasValue: hasValidValue,
      name: 'check-tree'
    })),
    classes = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  return /*#__PURE__*/React.createElement(PickerToggleTrigger, _extends({
    id: id,
    popupType: "tree",
    multiple: true,
    pickerProps: _pick(props, pickTriggerPropKeys),
    ref: trigger,
    placement: placement,
    speaker: renderTreeView
  }, triggerProps), /*#__PURE__*/React.createElement(Component, {
    className: classes,
    style: style,
    ref: root
  }, /*#__PURE__*/React.createElement(PickerToggle, _extends({}, _omit(rest, [].concat(omitTriggerPropKeys, usedClassNamePropKeys)), {
    ref: target,
    appearance: appearance,
    onKeyDown: onPickerKeydown,
    onClean: createChainedFunction(handleClean, onClean),
    cleanable: cleanable && !disabled,
    disabled: disabled,
    as: toggleAs,
    hasValue: hasValidValue,
    active: active,
    placement: placement,
    inputValue: value,
    focusItemValue: focusItemValue
  }), selectedElement || (locale === null || locale === void 0 ? void 0 : locale.placeholder))));
});
CheckTreePicker.displayName = 'CheckTreePicker';
export default CheckTreePicker;