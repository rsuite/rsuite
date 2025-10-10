'use client';
import { useState } from 'react';
import { useSet } from 'react-use-set';
import { useEventCallback, useIsMounted } from "../../internals/hooks/index.js";
import { shallowEqual } from "../../internals/utils/index.js";
/**
 * Hook for handling the state after the option is selected
 */
var useSelect = function useSelect(props) {
  var value = props.value,
    onSelect = props.onSelect,
    getChildren = props.getChildren,
    valueKey = props.valueKey,
    onChange = props.onChange,
    childrenKey = props.childrenKey,
    selectedItem = props.selectedItem,
    childrenMap = props.childrenMap;

  // The item that focus is on
  var _useState = useState(selectedItem),
    activeItem = _useState[0],
    setActiveItem = _useState[1];
  var isMounted = useIsMounted();
  var loadingItemsSet = useSet();
  var handleSelect = useEventCallback(function (node, event) {
    var _itemData$childrenKey;
    var itemData = node.itemData,
      isLeafNode = node.isLeafNode;
    setActiveItem(itemData);

    // Lazy load node's children
    if (typeof getChildren === 'function' && ((_itemData$childrenKey = itemData[childrenKey]) === null || _itemData$childrenKey === void 0 ? void 0 : _itemData$childrenKey.length) === 0 && !childrenMap.has(itemData)) {
      loadingItemsSet.add(itemData);
      var children = getChildren(itemData);
      if (children instanceof Promise) {
        children.then(function (data) {
          if (isMounted()) {
            loadingItemsSet.delete(itemData);
            childrenMap.set(itemData, data);
          }
        });
      } else {
        loadingItemsSet.delete(itemData);
        childrenMap.set(itemData, children);
      }
    }
    if (isLeafNode) {
      var nextValue = itemData[valueKey];
      if (!shallowEqual(value, nextValue)) {
        onChange === null || onChange === void 0 || onChange(nextValue, event);
      }
    }
    onSelect === null || onSelect === void 0 || onSelect(node, event);
  });
  return {
    loadingItemsSet: loadingItemsSet,
    activeItem: activeItem,
    setActiveItem: setActiveItem,
    handleSelect: handleSelect
  };
};
export default useSelect;