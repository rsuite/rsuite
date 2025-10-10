'use client';
import React, { useCallback } from 'react';
import { isAllSiblingNodeUncheckable, getDisabledState, isNodeUncheckable } from "../utils.js";
import { useItemDataKeys } from "../../internals/Tree/TreeProvider.js";
import Highlight from "../../Highlight/index.js";
function useTreeNodeProps(props) {
  var _useItemDataKeys = useItemDataKeys(),
    valueKey = _useItemDataKeys.valueKey,
    labelKey = _useItemDataKeys.labelKey;
  var uncheckableItemValues = props.uncheckableItemValues,
    disabledItemValues = props.disabledItemValues,
    loadingNodeValues = props.loadingNodeValues,
    focusItemValue = props.focusItemValue,
    flattenedNodes = props.flattenedNodes,
    keyword = props.keyword;
  return useCallback(function (nodeData) {
    var visible = nodeData.visible,
      checkState = nodeData.checkState;
    var value = nodeData[valueKey];
    var nodeLabel = nodeData[labelKey];
    var allUncheckable = isAllSiblingNodeUncheckable(nodeData, flattenedNodes, uncheckableItemValues, valueKey);
    var label = keyword ? /*#__PURE__*/React.createElement(Highlight, {
      as: "span",
      query: keyword
    }, nodeLabel) : nodeLabel;
    var disabled = getDisabledState(flattenedNodes, nodeData, {
      disabledItemValues: disabledItemValues,
      valueKey: valueKey
    });
    var uncheckable = isNodeUncheckable(nodeData, {
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
export default useTreeNodeProps;