'use client';
import isNil from 'lodash/isNil';
import { useCallback, useEffect, useRef, useState } from 'react';
import { KEY_VALUES } from "../../internals/constants/index.js";
import { useEventCallback } from "../../internals/hooks/index.js";
import { onMenuKeyDown } from "../../internals/Picker/index.js";
import { useItemDataKeys, useRegisterTreeMethods } from "../../internals/Tree/TreeProvider.js";
import { isSearching, focusNextItem, getFocusableItems, getActiveItem, focusPreviousItem, focusCurrentItem, focusTreeNode, handleLeftArrow, handleRightArrow } from "../utils/index.js";
import { useCustom } from "../../CustomProvider/index.js";
import useTreeNodeRefs from "./useTreeNodeRefs.js";
/**
 * Custom hook that manages the focus behavior of a tree component.
 */
function useFocusTree(props) {
  var filteredData = props.filteredData,
    searchKeyword = props.searchKeyword,
    flattenedNodes = props.flattenedNodes,
    expandItemValues = props.expandItemValues,
    disabledItemValues = props.disabledItemValues,
    onExpand = props.onExpand,
    onFocused = props.onFocused;
  var _useCustom = useCustom(),
    rtl = _useCustom.rtl;
  var _useItemDataKeys = useItemDataKeys(),
    valueKey = _useItemDataKeys.valueKey,
    childrenKey = _useItemDataKeys.childrenKey;
  var _useTreeNodeRefs = useTreeNodeRefs(),
    treeNodesRefs = _useTreeNodeRefs.treeNodesRefs,
    saveTreeNodeRef = _useTreeNodeRefs.saveTreeNodeRef;
  var treeViewRef = useRef(null);
  var _useState = useState(null),
    focusItemValue = _useState[0],
    setFocusItemValue = _useState[1];
  var register = useRegisterTreeMethods();
  var flattenedNodesRef = useRef(flattenedNodes);
  var getFocusProps = function getFocusProps(value) {
    var options = {
      disabledItemValues: disabledItemValues,
      valueKey: valueKey,
      childrenKey: childrenKey,
      expandItemValues: expandItemValues
    };
    var focusableItems = getFocusableItems(filteredData, options, isSearching(searchKeyword));
    return {
      focusItemValue: value || focusItemValue,
      valueKey: valueKey,
      focusableItems: focusableItems,
      treeNodesRefs: treeNodesRefs
    };
  };
  var handleFocusItem = useEventCallback(function (key) {
    var focusProps = getFocusProps();
    var focusedValue = null;
    if (key === KEY_VALUES.DOWN) {
      focusedValue = focusNextItem(focusProps);
    } else if (key === KEY_VALUES.UP) {
      focusedValue = focusPreviousItem(focusProps);
    }
    if (focusedValue) {
      setFocusItemValue(focusedValue);
      onFocused === null || onFocused === void 0 || onFocused(focusedValue);
    }
  });
  var handleLeftArrowEvent = useEventCallback(function () {
    if (isNil(focusItemValue)) {
      return;
    }
    var focusItem = getActiveItem(focusItemValue, flattenedNodes, valueKey);
    var expand = expandItemValues.includes(focusItem === null || focusItem === void 0 ? void 0 : focusItem[valueKey]);
    var onFocusItem = function onFocusItem() {
      var _focusItem$parent, _focusItem$parent2;
      var focusedValue = focusItem === null || focusItem === void 0 || (_focusItem$parent = focusItem.parent) === null || _focusItem$parent === void 0 ? void 0 : _focusItem$parent[valueKey];
      setFocusItemValue(focusedValue);
      onFocused === null || onFocused === void 0 || onFocused(focusedValue);
      focusTreeNode(focusItem === null || focusItem === void 0 || (_focusItem$parent2 = focusItem.parent) === null || _focusItem$parent2 === void 0 ? void 0 : _focusItem$parent2.refKey, treeNodesRefs);
    };
    handleLeftArrow({
      focusItem: focusItem,
      expand: expand,
      onExpand: onExpand,
      childrenKey: childrenKey,
      onFocusItem: onFocusItem
    });
  });
  var handleRightArrowEvent = useEventCallback(function () {
    if (isNil(focusItemValue)) {
      return;
    }
    var focusItem = getActiveItem(focusItemValue, flattenedNodes, valueKey);
    var expand = expandItemValues.includes(focusItem === null || focusItem === void 0 ? void 0 : focusItem[valueKey]);
    var onFocusItem = function onFocusItem() {
      return handleFocusItem(KEY_VALUES.DOWN);
    };
    handleRightArrow({
      focusItem: focusItem,
      expand: expand,
      childrenKey: childrenKey,
      onExpand: onExpand,
      onFocusItem: onFocusItem
    });
  });
  var onTreeKeydown = useEventCallback(function (event) {
    onMenuKeyDown(event, {
      down: function down() {
        return handleFocusItem(KEY_VALUES.DOWN);
      },
      up: function up() {
        return handleFocusItem(KEY_VALUES.UP);
      },
      left: rtl ? handleRightArrowEvent : handleLeftArrowEvent,
      right: rtl ? handleLeftArrowEvent : handleRightArrowEvent
    });
  });
  var focusTreeFirstNode = useEventCallback(function () {
    handleFocusItem(KEY_VALUES.DOWN);
  });
  var focusTreeActiveNode = useCallback(function () {
    var refKey = focusCurrentItem({
      container: treeViewRef.current
    });
    if (refKey) {
      var _flattenedNodesRef$cu;
      var node = (_flattenedNodesRef$cu = flattenedNodesRef.current) === null || _flattenedNodesRef$cu === void 0 ? void 0 : _flattenedNodesRef$cu[refKey];
      if (node) {
        setFocusItemValue(node[valueKey]);
        onFocused === null || onFocused === void 0 || onFocused(node[valueKey]);
      }
    }
  }, [onFocused, valueKey]);
  useEffect(function () {
    var unregister = register === null || register === void 0 ? void 0 : register({
      focusTreeFirstNode: focusTreeFirstNode,
      focusTreeActiveNode: focusTreeActiveNode
    });
    return function () {
      unregister === null || unregister === void 0 || unregister();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    flattenedNodesRef.current = flattenedNodes;
  }, [flattenedNodes]);
  return {
    treeViewRef: treeViewRef,
    focusTreeFirstNode: focusTreeFirstNode,
    focusItemValue: focusItemValue,
    treeNodesRefs: treeNodesRefs,
    saveTreeNodeRef: saveTreeNodeRef,
    setFocusItemValue: setFocusItemValue,
    onTreeKeydown: onTreeKeydown
  };
}
export default useFocusTree;