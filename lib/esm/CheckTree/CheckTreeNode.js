'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "style", "className", "classPrefix", "visible", "layer", "disabled", "allUncheckable", "loading", "expanded", "hasChildren", "nodeData", "focus", "label", "uncheckable", "checkState", "value", "treeItemRef", "onExpand", "onSelect"];
import React, { forwardRef, useMemo } from 'react';
import ListCheckItem from "../internals/Picker/ListCheckItem.js";
import TreeNodeToggle from "../Tree/TreeNodeToggle.js";
import { useTreeContextProps } from "../internals/Tree/TreeProvider.js";
import { stringifyReactNode, mergeRefs } from "../internals/utils/index.js";
import { CHECK_STATE } from "../internals/constants/index.js";
import { indentTreeNode } from "../Tree/utils/index.js";
import { useClassNames, useEventCallback, useFocusVirtualListItem } from "../internals/hooks/index.js";
import { useCustom } from "../CustomProvider/index.js";
var CheckTreeNode = /*#__PURE__*/forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    style = props.style,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'check-tree-node' : _props$classPrefix,
    _props$visible = props.visible,
    visible = _props$visible === void 0 ? true : _props$visible,
    layer = props.layer,
    disabled = props.disabled,
    allUncheckable = props.allUncheckable,
    loading = props.loading,
    expanded = props.expanded,
    hasChildren = props.hasChildren,
    nodeData = props.nodeData,
    focus = props.focus,
    label = props.label,
    uncheckable = props.uncheckable,
    checkState = props.checkState,
    value = props.value,
    treeItemRef = props.treeItemRef,
    onExpand = props.onExpand,
    onSelect = props.onSelect,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useCustom = useCustom(),
    rtl = _useCustom.rtl;
  var _useTreeContextProps = useTreeContextProps(),
    renderTreeNode = _useTreeContextProps.renderTreeNode,
    virtualized = _useTreeContextProps.virtualized;
  var _useClassNames = useClassNames(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var labelStr = useMemo(function () {
    return stringifyReactNode(label);
  }, [label]);
  var handleExpand = useEventCallback(function (event) {
    var _event$nativeEvent, _event$nativeEvent$st;
    // stop propagation when using custom loading icon
    event === null || event === void 0 || (_event$nativeEvent = event.nativeEvent) === null || _event$nativeEvent === void 0 || (_event$nativeEvent$st = _event$nativeEvent.stopImmediatePropagation) === null || _event$nativeEvent$st === void 0 || _event$nativeEvent$st.call(_event$nativeEvent);
    onExpand === null || onExpand === void 0 || onExpand(nodeData, expanded);
  });
  var handleSelect = useEventCallback(function (_value, event) {
    var isChecked = false;
    if (checkState === CHECK_STATE.UNCHECK || checkState === CHECK_STATE.INDETERMINATE) {
      isChecked = true;
    }
    if (checkState === CHECK_STATE.CHECK) {
      isChecked = false;
    }
    var nextNodeData = _extends({}, nodeData, {
      check: isChecked
    });
    onSelect === null || onSelect === void 0 || onSelect(nextNodeData, event);
  });
  var classes = merge(className, withClassPrefix({
    disabled: disabled,
    'all-uncheckable': !!allUncheckable,
    'text-muted': disabled,
    focus: focus
  }));
  var styles = virtualized ? _extends({}, style, indentTreeNode(rtl, layer - 1)) : style;
  var itemRef = useFocusVirtualListItem(focus);
  return visible ? /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    style: styles,
    className: classes,
    ref: ref
  }), /*#__PURE__*/React.createElement(TreeNodeToggle, {
    "aria-label": (expanded ? 'Collapse' : 'Expand') + (" " + labelStr),
    data: nodeData,
    expanded: expanded,
    loading: loading,
    hasChildren: hasChildren,
    onClick: handleExpand
  }), /*#__PURE__*/React.createElement(ListCheckItem, {
    as: "div",
    role: "treeitem",
    ref: mergeRefs(itemRef, treeItemRef),
    "aria-label": labelStr,
    "aria-expanded": expanded,
    "aria-checked": checkState === CHECK_STATE.CHECK,
    "aria-selected": focus,
    "aria-disabled": disabled,
    "aria-level": layer,
    "data-layer": layer,
    active: checkState === CHECK_STATE.CHECK,
    indeterminate: checkState === CHECK_STATE.INDETERMINATE,
    focus: focus,
    checkable: !uncheckable,
    disabled: disabled,
    value: nodeData.refKey || value,
    className: prefix('content'),
    title: labelStr,
    onSelect: handleSelect
  }, typeof renderTreeNode === 'function' ? renderTreeNode(nodeData) : label)) : null;
});
CheckTreeNode.displayName = 'CheckTreeNode';
export default CheckTreeNode;