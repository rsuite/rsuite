'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _TreeNodeToggle = _interopRequireDefault(require("./TreeNodeToggle"));
var _utils = require("../internals/utils");
var _hooks = require("../internals/hooks");
var _TreeProvider = require("../internals/Tree/TreeProvider");
var _utils2 = require("./utils");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "label", "layer", "active", "loading", "nodeData", "className", "classPrefix", "disabled", "visible", "draggable", "expanded", "focus", "style", "hasChildren", "dragging", "dragStatus", "onSelect", "onDragStart", "onDragOver", "onDragEnter", "onDragLeave", "onDragEnd", "onDrop", "onExpand"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Props for the TreeNode component.
 */

var TreeNode = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
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
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  var _useCustom = (0, _CustomProvider.useCustom)(),
    rtl = _useCustom.rtl;
  var _useTreeContextProps = (0, _TreeProvider.useTreeContextProps)(),
    renderTreeNode = _useTreeContextProps.renderTreeNode,
    virtualized = _useTreeContextProps.virtualized;
  var _useClassNames = (0, _hooks.useClassNames)(classPrefix),
    prefix = _useClassNames.prefix,
    merge = _useClassNames.merge,
    withClassPrefix = _useClassNames.withClassPrefix;
  var labelStr = (0, _react.useMemo)(function () {
    return (0, _utils.stringifyReactNode)(label);
  }, [label]);
  var handleExpand = (0, _hooks.useEventCallback)(function (event) {
    var _event$nativeEvent, _event$nativeEvent$st;
    // Stop propagation when using custom loading icon
    event === null || event === void 0 || (_event$nativeEvent = event.nativeEvent) === null || _event$nativeEvent === void 0 || (_event$nativeEvent$st = _event$nativeEvent.stopImmediatePropagation) === null || _event$nativeEvent$st === void 0 || _event$nativeEvent$st.call(_event$nativeEvent);
    event.stopPropagation();
    onExpand === null || onExpand === void 0 || onExpand(nodeData, expanded);
  });
  var handleSelect = (0, _hooks.useEventCallback)(function (event) {
    if (disabled) {
      return;
    }
    onSelect === null || onSelect === void 0 || onSelect(nodeData, event);
  });
  var handleDragStart = (0, _hooks.useEventCallback)(function (event) {
    onDragStart === null || onDragStart === void 0 || onDragStart(nodeData, event);
  });
  var handleDragEnter = (0, _hooks.useEventCallback)(function (event) {
    event.preventDefault();
    event.stopPropagation();
    onDragEnter === null || onDragEnter === void 0 || onDragEnter(nodeData, event);
  });
  var handleDragOver = (0, _hooks.useEventCallback)(function (event) {
    event.preventDefault();
    event.stopPropagation();
    onDragOver === null || onDragOver === void 0 || onDragOver(nodeData, event);
  });
  var handleDragLeave = (0, _hooks.useEventCallback)(function (event) {
    event.stopPropagation();
    onDragLeave === null || onDragLeave === void 0 || onDragLeave(nodeData, event);
  });
  var handleDragEnd = (0, _hooks.useEventCallback)(function (event) {
    event.stopPropagation();
    onDragEnd === null || onDragEnd === void 0 || onDragEnd(nodeData, event);
  });
  var handleDrop = (0, _hooks.useEventCallback)(function (event) {
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
  var treeItemRef = (0, _hooks.useFocusVirtualListItem)(focus);
  var styles = virtualized ? (0, _extends2.default)({}, style, (0, _utils2.indentTreeNode)(rtl, layer - 1)) : style;
  return visible ? /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    ref: (0, _utils.mergeRefs)(treeItemRef, ref),
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
  }), /*#__PURE__*/_react.default.createElement(_TreeNodeToggle.default, {
    "aria-label": (expanded ? 'Collapse' : 'Expand') + (" " + labelStr),
    data: nodeData,
    loading: loading,
    expanded: expanded,
    hasChildren: hasChildren,
    onClick: handleExpand
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: prefix('label', dragStatus, {
      dragging: dragging
    })
  }, renderTreeNode ? renderTreeNode(nodeData) : label)) : null;
});
TreeNode.displayName = 'TreeNode';
var _default = exports.default = TreeNode;