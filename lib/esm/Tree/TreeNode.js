'use client';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["as", "label", "layer", "active", "loading", "nodeData", "className", "classPrefix", "disabled", "visible", "draggable", "expanded", "focus", "style", "hasChildren", "dragging", "dragStatus", "onSelect", "onDragStart", "onDragOver", "onDragEnter", "onDragLeave", "onDragEnd", "onDrop", "onExpand"];
import React, { forwardRef, useMemo } from 'react';
import TreeNodeToggle from "./TreeNodeToggle.js";
import { mergeRefs, stringifyReactNode } from "../internals/utils/index.js";
import { useFocusVirtualListItem, useClassNames, useEventCallback } from "../internals/hooks/index.js";
import { useTreeContextProps } from "../internals/Tree/TreeProvider.js";
import { indentTreeNode } from "./utils/index.js";
import { useCustom } from "../CustomProvider/index.js";

/**
 * Props for the TreeNode component.
 */

var TreeNode = /*#__PURE__*/forwardRef(function (props, ref) {
  var _props$as = props.as,
    Component = _props$as === void 0 ? 'div' : _props$as,
    label = props.label,
    layer = props.layer,
    active = props.active,
    loading = props.loading,
    nodeData = props.nodeData,
    className = props.className,
    _props$classPrefix = props.classPrefix,
    classPrefix = _props$classPrefix === void 0 ? 'tree-node' : _props$classPrefix,
    disabled = props.disabled,
    _props$visible = props.visible,
    visible = _props$visible === void 0 ? true : _props$visible,
    draggable = props.draggable,
    expanded = props.expanded,
    focus = props.focus,
    style = props.style,
    hasChildren = props.hasChildren,
    dragging = props.dragging,
    dragStatus = props.dragStatus,
    onSelect = props.onSelect,
    onDragStart = props.onDragStart,
    onDragOver = props.onDragOver,
    onDragEnter = props.onDragEnter,
    onDragLeave = props.onDragLeave,
    onDragEnd = props.onDragEnd,
    onDrop = props.onDrop,
    onExpand = props.onExpand,
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
    // Stop propagation when using custom loading icon
    event === null || event === void 0 || (_event$nativeEvent = event.nativeEvent) === null || _event$nativeEvent === void 0 || (_event$nativeEvent$st = _event$nativeEvent.stopImmediatePropagation) === null || _event$nativeEvent$st === void 0 || _event$nativeEvent$st.call(_event$nativeEvent);
    event.stopPropagation();
    onExpand === null || onExpand === void 0 || onExpand(nodeData, expanded);
  });
  var handleSelect = useEventCallback(function (event) {
    if (disabled) {
      return;
    }
    onSelect === null || onSelect === void 0 || onSelect(nodeData, event);
  });
  var handleDragStart = useEventCallback(function (event) {
    onDragStart === null || onDragStart === void 0 || onDragStart(nodeData, event);
  });
  var handleDragEnter = useEventCallback(function (event) {
    event.preventDefault();
    event.stopPropagation();
    onDragEnter === null || onDragEnter === void 0 || onDragEnter(nodeData, event);
  });
  var handleDragOver = useEventCallback(function (event) {
    event.preventDefault();
    event.stopPropagation();
    onDragOver === null || onDragOver === void 0 || onDragOver(nodeData, event);
  });
  var handleDragLeave = useEventCallback(function (event) {
    event.stopPropagation();
    onDragLeave === null || onDragLeave === void 0 || onDragLeave(nodeData, event);
  });
  var handleDragEnd = useEventCallback(function (event) {
    event.stopPropagation();
    onDragEnd === null || onDragEnd === void 0 || onDragEnd(nodeData, event);
  });
  var handleDrop = useEventCallback(function (event) {
    event.preventDefault();
    event.stopPropagation();
    onDrop === null || onDrop === void 0 || onDrop(nodeData, event);
  });
  var classes = merge(className, withClassPrefix({
    disabled: disabled,
    active: active,
    'text-muted': disabled,
    focus: focus
  }));
  var treeItemRef = useFocusVirtualListItem(focus);
  var styles = virtualized ? _extends({}, style, indentTreeNode(rtl, layer - 1)) : style;
  return visible ? /*#__PURE__*/React.createElement(Component, _extends({}, rest, {
    ref: mergeRefs(treeItemRef, ref),
    role: "treeitem",
    tabIndex: -1,
    "aria-expanded": expanded,
    "aria-label": labelStr,
    "aria-level": layer,
    "aria-disabled": disabled,
    "aria-selected": active,
    "data-layer": layer,
    "data-key": (nodeData === null || nodeData === void 0 ? void 0 : nodeData.refKey) || '',
    title: labelStr,
    className: classes,
    style: styles,
    draggable: draggable,
    onClick: handleSelect,
    onDragStart: handleDragStart,
    onDragEnter: handleDragEnter,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDragEnd: handleDragEnd,
    onDrop: handleDrop
  }), /*#__PURE__*/React.createElement(TreeNodeToggle, {
    "aria-label": (expanded ? 'Collapse' : 'Expand') + (" " + labelStr),
    data: nodeData,
    loading: loading,
    expanded: expanded,
    hasChildren: hasChildren,
    onClick: handleExpand
  }), /*#__PURE__*/React.createElement("span", {
    className: prefix('label', dragStatus, {
      dragging: dragging
    })
  }, renderTreeNode ? renderTreeNode(nodeData) : label)) : null;
});
TreeNode.displayName = 'TreeNode';
export default TreeNode;