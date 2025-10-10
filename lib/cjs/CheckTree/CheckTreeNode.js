'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _react = _interopRequireWildcard(require("react"));
var _ListCheckItem = _interopRequireDefault(require("../internals/Picker/ListCheckItem"));
var _TreeNodeToggle = _interopRequireDefault(require("../Tree/TreeNodeToggle"));
var _TreeProvider = require("../internals/Tree/TreeProvider");
var _utils = require("../internals/utils");
var _constants = require("../internals/constants");
var _utils2 = require("../Tree/utils");
var _hooks = require("../internals/hooks");
var _CustomProvider = require("../CustomProvider");
var _excluded = ["as", "style", "className", "classPrefix", "visible", "layer", "disabled", "allUncheckable", "loading", "expanded", "hasChildren", "nodeData", "focus", "label", "uncheckable", "checkState", "value", "treeItemRef", "onExpand", "onSelect"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var CheckTreeNode = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
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
    // stop propagation when using custom loading icon
    event === null || event === void 0 || (_event$nativeEvent = event.nativeEvent) === null || _event$nativeEvent === void 0 || (_event$nativeEvent$st = _event$nativeEvent.stopImmediatePropagation) === null || _event$nativeEvent$st === void 0 || _event$nativeEvent$st.call(_event$nativeEvent);
    onExpand === null || onExpand === void 0 || onExpand(nodeData, expanded);
  });
  var handleSelect = (0, _hooks.useEventCallback)(function (_value, event) {
    var isChecked = false;
    if (checkState === _constants.CHECK_STATE.UNCHECK || checkState === _constants.CHECK_STATE.INDETERMINATE) {
      isChecked = true;
    }
    if (checkState === _constants.CHECK_STATE.CHECK) {
      isChecked = false;
    }
    var nextNodeData = (0, _extends2.default)({}, nodeData, {
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
  var styles = virtualized ? (0, _extends2.default)({}, style, (0, _utils2.indentTreeNode)(rtl, layer - 1)) : style;
  var itemRef = (0, _hooks.useFocusVirtualListItem)(focus);
  return visible ? /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, rest, {
    style: styles,
    className: classes,
    ref: ref
  }), /*#__PURE__*/_react.default.createElement(_TreeNodeToggle.default, {
    "aria-label": (expanded ? 'Collapse' : 'Expand') + (" " + labelStr),
    data: nodeData,
    expanded: expanded,
    loading: loading,
    hasChildren: hasChildren,
    onClick: handleExpand
  }), /*#__PURE__*/_react.default.createElement(_ListCheckItem.default, {
    as: "div",
    role: "treeitem",
    ref: (0, _utils.mergeRefs)(itemRef, treeItemRef),
    "aria-label": labelStr,
    "aria-expanded": expanded,
    "aria-checked": checkState === _constants.CHECK_STATE.CHECK,
    "aria-selected": focus,
    "aria-disabled": disabled,
    "aria-level": layer,
    "data-layer": layer,
    active: checkState === _constants.CHECK_STATE.CHECK,
    indeterminate: checkState === _constants.CHECK_STATE.INDETERMINATE,
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
var _default = exports.default = CheckTreeNode;