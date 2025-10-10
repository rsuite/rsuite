'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "appearance", "classPrefix", "cleanable", "childrenKey", "data", "disabled", "defaultValue", "defaultExpandAll", "disabledItemValues", "defaultExpandItemValues", "expandItemValues", "id", "locale", "labelKey", "placeholder", "placement", "style", "searchKeyword", "searchable", "showIndentLine", "menuClassName", "menuStyle", "popupClassName", "popupStyle", "popupAutoWidth", "treeHeight", "menuAutoWidth", "valueKey", "virtualized", "value", "listProps", "toggleAs", "searchBy", "getChildren", "onClean", "onSearch", "onSelect", "onSelectItem", "onChange", "onExpand", "onEnter", "onExit", "onEntered", "renderValue", "renderMenu", "renderTree", "renderTreeIcon", "renderTreeNode", "renderExtraFooter"];
import React, { useMemo } from 'react';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import isNil from 'lodash/isNil';
import isFunction from 'lodash/isFunction';
import useTreeWithChildren from "../Tree/hooks/useTreeWithChildren.js";
import useFlattenTree from "../Tree/hooks/useFlattenTree.js";
import useFocusState from "./hooks/useFocusState.js";
import useExpandTree from "../Tree/hooks/useExpandTree.js";
import TreeView from "../Tree/TreeView.js";
import { useClassNames, useControlled, useEventCallback } from "../internals/hooks/index.js";
import { createChainedFunction, mergeRefs } from "../internals/utils/index.js";
import { getActiveItem, getTreeActiveNode } from "../Tree/utils/index.js";
import { PickerToggle, PickerPopup, PickerToggleTrigger, usePickerClassName, usePickerRef, onMenuKeyDown, pickTriggerPropKeys, omitTriggerPropKeys, useToggleKeyDownEvent } from "../internals/Picker/index.js";
import { TreeProvider, useTreeImperativeHandle } from "../internals/Tree/TreeProvider.js";
import { useCustom } from "../CustomProvider/index.js";
/**
 * The `TreePicker` component is used for selecting single options which are organized in a tree structure.
 *
 * @see https://rsuitejs.com/components/tree-picker/
 */
var TreePicker = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _useCustom = useCustom('TreePicker', props),
    propsWithDefaults = _useCustom.propsWithDefaults;
  var _propsWithDefaults$as = propsWithDefaults.as,
    Component = _propsWithDefaults$as === void 0 ? 'div' : _propsWithDefaults$as,
    _propsWithDefaults$ap = propsWithDefaults.appearance,
    appearance = _propsWithDefaults$ap === void 0 ? 'default' : _propsWithDefaults$ap,
    _propsWithDefaults$cl = propsWithDefaults.classPrefix,
    classPrefix = _propsWithDefaults$cl === void 0 ? 'picker' : _propsWithDefaults$cl,
    _propsWithDefaults$cl2 = propsWithDefaults.cleanable,
    cleanable = _propsWithDefaults$cl2 === void 0 ? true : _propsWithDefaults$cl2,
    _propsWithDefaults$ch = propsWithDefaults.childrenKey,
    childrenKey = _propsWithDefaults$ch === void 0 ? 'children' : _propsWithDefaults$ch,
    _propsWithDefaults$da = propsWithDefaults.data,
    data = _propsWithDefaults$da === void 0 ? [] : _propsWithDefaults$da,
    disabled = propsWithDefaults.disabled,
    defaultValue = propsWithDefaults.defaultValue,
    _propsWithDefaults$de = propsWithDefaults.defaultExpandAll,
    defaultExpandAll = _propsWithDefaults$de === void 0 ? false : _propsWithDefaults$de,
    _propsWithDefaults$di = propsWithDefaults.disabledItemValues,
    disabledItemValues = _propsWithDefaults$di === void 0 ? [] : _propsWithDefaults$di,
    _propsWithDefaults$de2 = propsWithDefaults.defaultExpandItemValues,
    defaultExpandItemValues = _propsWithDefaults$de2 === void 0 ? [] : _propsWithDefaults$de2,
    controlledExpandItemValues = propsWithDefaults.expandItemValues,
    id = propsWithDefaults.id,
    locale = propsWithDefaults.locale,
    _propsWithDefaults$la = propsWithDefaults.labelKey,
    labelKey = _propsWithDefaults$la === void 0 ? 'label' : _propsWithDefaults$la,
    placeholder = propsWithDefaults.placeholder,
    _propsWithDefaults$pl = propsWithDefaults.placement,
    placement = _propsWithDefaults$pl === void 0 ? 'bottomStart' : _propsWithDefaults$pl,
    style = propsWithDefaults.style,
    searchKeyword = propsWithDefaults.searchKeyword,
    _propsWithDefaults$se = propsWithDefaults.searchable,
    searchable = _propsWithDefaults$se === void 0 ? true : _propsWithDefaults$se,
    showIndentLine = propsWithDefaults.showIndentLine,
    DEPRECATED_menuClassName = propsWithDefaults.menuClassName,
    DEPRECATED_menuStyle = propsWithDefaults.menuStyle,
    popupClassName = propsWithDefaults.popupClassName,
    popupStyle = propsWithDefaults.popupStyle,
    _propsWithDefaults$po = propsWithDefaults.popupAutoWidth,
    popupAutoWidth = _propsWithDefaults$po === void 0 ? true : _propsWithDefaults$po,
    _propsWithDefaults$tr = propsWithDefaults.treeHeight,
    treeHeight = _propsWithDefaults$tr === void 0 ? 320 : _propsWithDefaults$tr,
    _propsWithDefaults$me = propsWithDefaults.menuAutoWidth,
    menuAutoWidth = _propsWithDefaults$me === void 0 ? popupAutoWidth : _propsWithDefaults$me,
    _propsWithDefaults$va = propsWithDefaults.valueKey,
    valueKey = _propsWithDefaults$va === void 0 ? 'value' : _propsWithDefaults$va,
    _propsWithDefaults$vi = propsWithDefaults.virtualized,
    virtualized = _propsWithDefaults$vi === void 0 ? false : _propsWithDefaults$vi,
    controlledValue = propsWithDefaults.value,
    listProps = propsWithDefaults.listProps,
    toggleAs = propsWithDefaults.toggleAs,
    searchBy = propsWithDefaults.searchBy,
    getChildren = propsWithDefaults.getChildren,
    onClean = propsWithDefaults.onClean,
    onSearch = propsWithDefaults.onSearch,
    onSelect = propsWithDefaults.onSelect,
    onSelectItem = propsWithDefaults.onSelectItem,
    onChange = propsWithDefaults.onChange,
    onExpand = propsWithDefaults.onExpand,
    onEnter = propsWithDefaults.onEnter,
    onExit = propsWithDefaults.onExit,
    onEntered = propsWithDefaults.onEntered,
    renderValue = propsWithDefaults.renderValue,
    DEPRECATED_renderMenu = propsWithDefaults.renderMenu,
    _propsWithDefaults$re = propsWithDefaults.renderTree,
    renderTree = _propsWithDefaults$re === void 0 ? DEPRECATED_renderMenu : _propsWithDefaults$re,
    renderTreeIcon = propsWithDefaults.renderTreeIcon,
    renderTreeNode = propsWithDefaults.renderTreeNode,
    renderExtraFooter = propsWithDefaults.renderExtraFooter,
    rest = _objectWithoutPropertiesLoose(propsWithDefaults, _excluded);
  var _usePickerRef = usePickerRef(ref),
    trigger = _usePickerRef.trigger,
    root = _usePickerRef.root,
    target = _usePickerRef.target,
    overlay = _usePickerRef.overlay,
    list = _usePickerRef.list,
    searchInput = _usePickerRef.searchInput,
    treeView = _usePickerRef.treeView;
  var _useControlled = useControlled(controlledValue, defaultValue),
    value = _useControlled[0],
    setValue = _useControlled[1];
  var itemDataKeys = {
    childrenKey: childrenKey,
    labelKey: labelKey,
    valueKey: valueKey
  };
  var _useTreeWithChildren = useTreeWithChildren(data, itemDataKeys),
    treeData = _useTreeWithChildren.treeData,
    loadingNodeValues = _useTreeWithChildren.loadingNodeValues,
    appendChild = _useTreeWithChildren.appendChild;
  var flattenedNodes = useFlattenTree(treeData, _extends({}, itemDataKeys));
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
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge;
  var activeNode = getTreeActiveNode(flattenedNodes, value, valueKey);
  var _useTreeImperativeHan = useTreeImperativeHandle(),
    register = _useTreeImperativeHan.register,
    focusFirstNode = _useTreeImperativeHan.focusFirstNode,
    focusActiveNode = _useTreeImperativeHan.focusActiveNode;
  var _useFocusState = useFocusState({
      focusActiveNode: focusActiveNode,
      target: target,
      value: value,
      onEnter: onEnter,
      onExit: onExit,
      onEntered: onEntered
    }),
    active = _useFocusState.active,
    focusItemValue = _useFocusState.focusItemValue,
    setFocusItemValue = _useFocusState.setFocusItemValue,
    triggerProps = _useFocusState.triggerProps;
  var handleSelect = useEventCallback(function (treeNode, value, event) {
    var _target$current, _trigger$current, _trigger$current$clos;
    setFocusItemValue(value);
    onSelect === null || onSelect === void 0 || onSelect(treeNode, value, event);
    (_target$current = target.current) === null || _target$current === void 0 || _target$current.focus();
    (_trigger$current = trigger.current) === null || _trigger$current === void 0 || (_trigger$current$clos = _trigger$current.close) === null || _trigger$current$clos === void 0 || _trigger$current$clos.call(_trigger$current);
  });
  var handleClean = useEventCallback(function (event) {
    var target = event.target;
    // exclude searchbox
    if (target.matches('input[role="searchbox"]') || disabled || !cleanable) {
      return;
    }
    setValue(null);
    onChange === null || onChange === void 0 || onChange(null, event);
  });
  var handleTreePressEnter = useEventCallback(function (event) {
    if (isNil(focusItemValue)) {
      return;
    }
    var activeItem = getActiveItem(focusItemValue, flattenedNodes, valueKey);
    handleSelect(activeItem, event);
  });
  var handleTreeKeyDown = useEventCallback(function (event) {
    onMenuKeyDown(event, {
      del: handleClean,
      down: function down() {
        return focusFirstNode();
      },
      enter: handleTreePressEnter
    });
  });
  var onPickerKeydown = useToggleKeyDownEvent(_extends({
    toggle: !activeNode || !active,
    trigger: trigger,
    target: target,
    overlay: overlay,
    searchInput: searchInput,
    active: active,
    onExit: handleClean,
    onMenuKeyDown: handleTreeKeyDown
  }, rest));
  var handleChange = useEventCallback(function (nextValue, event) {
    setValue(nextValue);
    onChange === null || onChange === void 0 || onChange(nextValue, event);
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
  var tree = /*#__PURE__*/React.createElement(TreeProvider, {
    value: treeContext
  }, /*#__PURE__*/React.createElement(TreeView, {
    ref: treeView,
    value: value,
    data: treeData,
    disabledItemValues: disabledItemValues,
    expandItemValues: expandItemValues,
    showIndentLine: showIndentLine,
    searchable: searchable,
    searchKeyword: searchKeyword,
    searchBy: searchBy,
    searchInputRef: searchInput,
    loadingNodeValues: loadingNodeValues,
    flattenedNodes: flattenedNodes,
    listProps: listProps,
    listRef: list,
    locale: locale,
    height: treeHeight,
    onExpand: handleExpandTreeNode,
    onSearch: onSearch,
    onChange: handleChange,
    onSelect: handleSelect,
    onSelectItem: onSelectItem,
    onFocusItem: setFocusItemValue
  }));
  var renderTreeView = function renderTreeView(positionProps, speakerRef) {
    var left = positionProps.left,
      top = positionProps.top,
      className = positionProps.className;
    var classes = merge(className, DEPRECATED_menuClassName, popupClassName, prefix('tree-menu'));
    var mergedMenuStyle = _extends({}, DEPRECATED_menuStyle, popupStyle, {
      left: left,
      top: top
    });
    return /*#__PURE__*/React.createElement(PickerPopup, {
      autoWidth: menuAutoWidth,
      className: classes,
      style: mergedMenuStyle,
      ref: mergeRefs(overlay, speakerRef),
      onKeyDown: onPickerKeydown,
      target: trigger
    }, renderTree ? renderTree(tree) : tree, renderExtraFooter === null || renderExtraFooter === void 0 ? void 0 : renderExtraFooter());
  };

  /**
   * 1.Have a value and the value is valid.
   * 2.Regardless of whether the value is valid, as long as renderValue is set, it is judged to have a value.
   */
  var hasValidValue = !isNil(activeNode) || !isNil(value) && isFunction(renderValue);
  var selectedElement = placeholder;
  if (hasValidValue) {
    var node = activeNode !== null && activeNode !== void 0 ? activeNode : {};
    selectedElement = node[labelKey];
    if (isFunction(renderValue) && value) {
      selectedElement = renderValue(value, node, selectedElement);
      if (isNil(selectedElement)) {
        hasValidValue = false;
      }
    }
  }
  var _usePickerClassName = usePickerClassName(_extends({}, props, {
      classPrefix: classPrefix,
      appearance: appearance,
      hasValue: hasValidValue,
      name: 'tree',
      cleanable: cleanable
    })),
    classes = _usePickerClassName[0],
    usedClassNamePropKeys = _usePickerClassName[1];
  return /*#__PURE__*/React.createElement(PickerToggleTrigger, _extends({
    id: id,
    popupType: "tree",
    pickerProps: pick(props, pickTriggerPropKeys),
    ref: trigger,
    placement: placement,
    speaker: renderTreeView
  }, triggerProps), /*#__PURE__*/React.createElement(Component, {
    className: classes,
    style: style,
    ref: root
  }, /*#__PURE__*/React.createElement(PickerToggle, _extends({}, omit(rest, [].concat(omitTriggerPropKeys, usedClassNamePropKeys, ['cascade'])), {
    ref: target,
    appearance: appearance,
    onKeyDown: onPickerKeydown,
    onClean: createChainedFunction(handleClean, onClean),
    cleanable: cleanable && !disabled,
    as: toggleAs,
    disabled: disabled,
    hasValue: hasValidValue,
    active: active,
    placement: placement,
    inputValue: value,
    focusItemValue: focusItemValue
  }), selectedElement || (locale === null || locale === void 0 ? void 0 : locale.placeholder))));
});
TreePicker.displayName = 'TreePicker';
export default TreePicker;