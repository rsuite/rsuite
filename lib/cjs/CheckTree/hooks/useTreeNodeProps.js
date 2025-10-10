'use client';
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../utils");
var _TreeProvider = require("../../internals/Tree/TreeProvider");
var _Highlight = _interopRequireDefault(require("../../Highlight"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function useTreeNodeProps(props) {
  var _useItemDataKeys = (0, _TreeProvider.useItemDataKeys)(),
    valueKey = _useItemDataKeys.valueKey,
    labelKey = _useItemDataKeys.labelKey;
  var uncheckableItemValues = props.uncheckableItemValues,
    disabledItemValues = props.disabledItemValues,
    loadingNodeValues = props.loadingNodeValues,
    focusItemValue = props.focusItemValue,
    flattenedNodes = props.flattenedNodes,
    keyword = props.keyword;
  return (0, _react.useCallback)(function (nodeData) {
    var visible = nodeData.visible,
      checkState = nodeData.checkState;
    var value = nodeData[valueKey];
    var nodeLabel = nodeData[labelKey];
    var allUncheckable = (0, _utils.isAllSiblingNodeUncheckable)(nodeData, flattenedNodes, uncheckableItemValues, valueKey);
    var label = keyword ? /*#__PURE__*/_react.default.createElement(_Highlight.default, {
      as: "span",
      query: keyword
    }, nodeLabel) : nodeLabel;
    var disabled = (0, _utils.getDisabledState)(flattenedNodes, nodeData, {
      disabledItemValues: disabledItemValues,
      valueKey: valueKey
    });
    var uncheckable = (0, _utils.isNodeUncheckable)(nodeData, {
      uncheckableItemValues: uncheckableItemValues,
      valueKey: valueKey
    });
    var loading = loadingNodeValues.some(function (item) {
      return item === nodeData[valueKey];
    });
    var focus = focusItemValue === value;
    return {
      value: value,
      label: label,
      visible: visible,
      loading: loading,
      disabled: disabled,
      nodeData: nodeData,
      checkState: checkState,
      uncheckable: uncheckable,
      allUncheckable: allUncheckable,
      focus: focus
    };
  }, [valueKey, flattenedNodes, uncheckableItemValues, keyword, labelKey, disabledItemValues, loadingNodeValues, focusItemValue]);
}
var _default = exports.default = useTreeNodeProps;