'use client';
import React, { useCallback } from 'react';
import { TREE_NODE_DROP_POSITION } from "../../internals/constants/index.js";
import { shallowEqual as equal } from "../../internals/utils/index.js";
import { useCombobox } from "../../internals/Picker/hooks/index.js";
import { useItemDataKeys } from "../../internals/Tree/TreeProvider.js";
import Highlight from "../../Highlight/index.js";
function useTreeNodeProps(props) {
  var _useItemDataKeys = useItemDataKeys(),
    valueKey = _useItemDataKeys.valueKey,
    labelKey = _useItemDataKeys.labelKey,
    childrenKey = _useItemDataKeys.childrenKey;
  var _useCombobox = useCombobox(),
    id = _useCombobox.id;
  var value = props.value,
    disabledItemValues = props.disabledItemValues,
    loadingNodeValues = props.loadingNodeValues,
    focusItemValue = props.focusItemValue,
    keyword = props.keyword,
    dragNode = props.dragNode,
    dragOverNodeKey = props.dragOverNodeKey,
    dropNodePosition = props.dropNodePosition;
  return useCallback(function (nodeData, layer, index) {
    var DRAG_OVER = TREE_NODE_DROP_POSITION.DRAG_OVER,
      DRAG_OVER_TOP = TREE_NODE_DROP_POSITION.DRAG_OVER_TOP,
      DRAG_OVER_BOTTOM = TREE_NODE_DROP_POSITION.DRAG_OVER_BOTTOM;
    var visible = nodeData.visible;
    var draggingNode = dragNode !== null && dragNode !== void 0 ? dragNode : {};
    var nodeValue = nodeData[valueKey];
    var nodeLabel = nodeData[labelKey];
    var children = nodeData[childrenKey];
    var label = keyword ? /*#__PURE__*/React.createElement(Highlight, {
      as: "span",
      query: keyword
    }, nodeLabel) : nodeLabel;
    var dragging = equal(nodeValue, draggingNode[valueKey]);
    var dragStatus;
    if (equal(nodeValue, dragOverNodeKey)) {
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
      return equal(disabledItem, nodeValue);
    });
    var loading = loadingNodeValues.some(function (item) {
      return equal(item, nodeValue);
    });
    var active = equal(nodeValue, value);
    var focus = equal(nodeValue, focusItemValue);
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
export default useTreeNodeProps;