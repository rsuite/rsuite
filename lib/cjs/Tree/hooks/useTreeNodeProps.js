'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _constants = require("../../internals/constants");
var _utils = require("../../internals/utils");
var _hooks = require("../../internals/Picker/hooks");
var _TreeProvider = require("../../internals/Tree/TreeProvider");
var _Highlight = _interopRequireDefault(require("../../Highlight"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function useTreeNodeProps(props) {
  var _useItemDataKeys = (0, _TreeProvider.useItemDataKeys)(),
    valueKey = _useItemDataKeys.valueKey,
    labelKey = _useItemDataKeys.labelKey,
    childrenKey = _useItemDataKeys.childrenKey;
  var _useCombobox = (0, _hooks.useCombobox)(),
    id = _useCombobox.id;
  var value = props.value,
    disabledItemValues = props.disabledItemValues,
    loadingNodeValues = props.loadingNodeValues,
    focusItemValue = props.focusItemValue,
    keyword = props.keyword,
    dragNode = props.dragNode,
    dragOverNodeKey = props.dragOverNodeKey,
    dropNodePosition = props.dropNodePosition;
  return (0, _react.useCallback)(function (nodeData, layer, index) {
    var DRAG_OVER = _constants.TREE_NODE_DROP_POSITION.DRAG_OVER,
      DRAG_OVER_TOP = _constants.TREE_NODE_DROP_POSITION.DRAG_OVER_TOP,
      DRAG_OVER_BOTTOM = _constants.TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM;
    var visible = nodeData.visible;
    var draggingNode = dragNode !== null && dragNode !== void 0 ? dragNode : {};
    var nodeValue = nodeData[valueKey];
    var nodeLabel = nodeData[labelKey];
    var children = nodeData[childrenKey];
    var label = keyword ? /*#__PURE__*/_react.default.createElement(_Highlight.default, {
      as: "span",
      query: keyword
    }, nodeLabel) : nodeLabel;
    var dragging = (0, _utils.shallowEqual)(nodeValue, draggingNode[valueKey]);
    var dragStatus;
    if ((0, _utils.shallowEqual)(nodeValue, dragOverNodeKey)) {
      switch (dropNodePosition) {
        case DRAG_OVER:
          dragStatus = 'drag-over';
          break;
        case DRAG_OVER_TOP:
          dragStatus = 'drag-over-top';
          break;
        case DRAG_OVER_BOTTOM:
          dragStatus = 'drag-over-bottom';
          break;
      }
    }
    var disabled = disabledItemValues.some(function (disabledItem) {
      return (0, _utils.shallowEqual)(disabledItem, nodeValue);
    });
    var loading = loadingNodeValues.some(function (item) {
      return (0, _utils.shallowEqual)(item, nodeValue);
    });
    var active = (0, _utils.shallowEqual)(nodeValue, value);
    var focus = (0, _utils.shallowEqual)(nodeValue, focusItemValue);
    return {
      id: id ? id + "-opt-" + nodeValue : undefined,
      value: nodeValue,
      label: label,
      index: index,
      layer: layer,
      loading: loading,
      active: active,
      focus: focus,
      visible: visible,
      children: children,
      nodeData: nodeData,
      disabled: disabled,
      dragging: dragging,
      dragStatus: dragStatus
    };
  }, [childrenKey, disabledItemValues, dragNode, dragOverNodeKey, dropNodePosition, focusItemValue, id, keyword, labelKey, loadingNodeValues, value, valueKey]);
}
var _default = exports.default = useTreeNodeProps;