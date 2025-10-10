'use client';
import { shallowEqual } from "../../internals/utils/index.js";
// Active tree node selector
var SELECTED_TREEITEM_SELECTOR = '[role="treeitem"][aria-selected="true"]';

/**
 * Retrieves the focusable items from the filtered data based on the provided props.
 * Excludes nodes that are not visible or are disabled.
 */
export var getFocusableItems = function getFocusableItems(filteredData, props, isSearching) {
  var disabledItemValues = props.disabledItemValues,
    valueKey = props.valueKey,
    childrenKey = props.childrenKey,
    expandItemValues = props.expandItemValues;
  var items = [];
  var _loop = function loop(nodes) {
    nodes.forEach(function (node) {
      var disabled = disabledItemValues.some(function (disabledItem) {
        return shallowEqual(disabledItem, node[valueKey]);
      });
      if (!disabled && node.visible) {
        items.push(node);
      }
      // always expand when searching
      var expand = isSearching ? true : expandItemValues.includes(node[valueKey]);
      if (node[childrenKey] && expand) {
        _loop(node[childrenKey]);
      }
    });
  };
  _loop(filteredData);
  return items;
};

/**
 * Returns the index of the active item in the focusItems array.
 *
 */
var getActiveIndex = function getActiveIndex(focusItemValue, focusItems, valueKey) {
  var activeIndex = -1;
  focusItems.forEach(function (item, index) {
    if (shallowEqual(item[valueKey], focusItemValue)) {
      activeIndex = index;
    }
  });
  return activeIndex;
};

/**
 * Retrieves the active item from the flattened nodes based on the provided focus item value.
 */
export var getActiveItem = function getActiveItem(focusItemValue, flattenedNodes, valueKey) {
  var nodeData = null;
  var activeNode = Object.values(flattenedNodes).find(function (node) {
    return shallowEqual(node[valueKey], focusItemValue);
  });
  if (activeNode) {
    nodeData = activeNode;
  }
  return nodeData;
};

/**
 * Focuses on a specific tree node element.
 *
 */
export var focusTreeNode = function focusTreeNode(refKey, treeNodeRefs) {
  var _treeItem$focus;
  var treeItem = treeNodeRefs[refKey];
  treeItem === null || treeItem === void 0 || (_treeItem$focus = treeItem.focus) === null || _treeItem$focus === void 0 || _treeItem$focus.call(treeItem);
};
/**
 * Focuses on the next item in a tree.
 */
export var focusNextItem = function focusNextItem(props) {
  var focusItemValue = props.focusItemValue,
    focusableItems = props.focusableItems,
    treeNodesRefs = props.treeNodesRefs,
    valueKey = props.valueKey;
  var activeIndex = getActiveIndex(focusItemValue, focusableItems, valueKey);
  if (focusableItems.length === 0) {
    return;
  }
  var nextIndex = activeIndex === focusableItems.length - 1 ? 0 : activeIndex + 1;
  var value = focusableItems[nextIndex][valueKey];
  focusTreeNode(focusableItems[nextIndex].refKey, treeNodesRefs);
  return value;
};

/**
 * Focuses on the previous item in a tree.
 */
export var focusPreviousItem = function focusPreviousItem(props) {
  var focusItemValue = props.focusItemValue,
    focusableItems = props.focusableItems,
    treeNodesRefs = props.treeNodesRefs,
    valueKey = props.valueKey;
  var activeIndex = getActiveIndex(focusItemValue, focusableItems, valueKey);
  if (focusableItems.length === 0) {
    return;
  }
  var prevIndex = activeIndex === 0 ? focusableItems.length - 1 : activeIndex - 1;
  prevIndex = prevIndex >= 0 ? prevIndex : 0;
  var value = focusableItems[prevIndex][valueKey];
  focusTreeNode(focusableItems[prevIndex].refKey, treeNodesRefs);
  return value;
};

/**
 * Returns the index of the first visible node in the tree that matches the given value.
 */
var getScrollToIndex = function getScrollToIndex(nodes, value, valueKey) {
  return nodes.filter(function (n) {
    return n.visible;
  }).findIndex(function (item) {
    return item[valueKey] === value;
  });
};
/**
 * Scrolls the list to the active tree node.
 *
 * @param props - The props object containing the necessary parameters.
 */
export function scrollToActiveTreeNode(props) {
  var list = props.list,
    value = props.value,
    valueKey = props.valueKey,
    virtualized = props.virtualized,
    formattedNodes = props.formattedNodes;
  if (virtualized && value) {
    var _list$scrollToItem;
    var scrollIndex = getScrollToIndex(formattedNodes, value, valueKey);
    list === null || list === void 0 || (_list$scrollToItem = list.scrollToItem) === null || _list$scrollToItem === void 0 || _list$scrollToItem.call(list, scrollIndex);
  }
}
export var focusCurrentItem = function focusCurrentItem(props) {
  var _props$selector = props.selector,
    selector = _props$selector === void 0 ? SELECTED_TREEITEM_SELECTOR : _props$selector,
    container = props.container;
  var activeItem = container === null || container === void 0 ? void 0 : container.querySelector(selector);
  if (activeItem) {
    var _activeItem$focus, _activeItem$dataset;
    activeItem === null || activeItem === void 0 || (_activeItem$focus = activeItem.focus) === null || _activeItem$focus === void 0 || _activeItem$focus.call(activeItem);
    return (_activeItem$dataset = activeItem.dataset) === null || _activeItem$dataset === void 0 ? void 0 : _activeItem$dataset.key;
  }
};