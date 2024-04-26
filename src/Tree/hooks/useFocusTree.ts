import { useState } from 'react';
import isNil from 'lodash/isNil';
import { KEY_VALUES } from '../../utils/constants';
import { useEventCallback } from '../../utils';
import { onMenuKeyDown } from '../../internals/Picker';

import {
  isSearching,
  focusNextItem,
  getFocusableItems,
  getActiveItem,
  focusPreviousItem,
  focusTreeNode,
  handleLeftArrow,
  handleRightArrow
} from '../utils';
import useTreeNodeRefs from './useTreeNodeRefs';
import type { TreeNode } from '../types';

interface UseFocusTreeProps<T extends TreeNode> {
  rtl: boolean;
  filteredData: T[];
  disabledItemValues: any[];
  valueKey: string;
  childrenKey: string;
  expandItemValues: any[];
  searchKeyword: string;
  treeNodeSelector: string;
  flattenedNodes: any;
  onExpand: (nodeData: T) => void;
  onFocused?: (value: TreeNode['value']) => void;
}
/**
 * Custom hook that manages the focus behavior of a tree component.
 */
function useFocusTree(props: UseFocusTreeProps<TreeNode>) {
  const {
    rtl,
    valueKey,
    childrenKey,
    filteredData,
    searchKeyword,
    flattenedNodes,
    treeNodeSelector,
    expandItemValues,
    disabledItemValues,
    onExpand,
    onFocused
  } = props;

  const { treeNodesRefs, saveTreeNodeRef } = useTreeNodeRefs();
  const [focusItemValue, setFocusItemValue] = useState<TreeNode['value'] | null>(null);

  const handleFocusItem = useEventCallback((key: string) => {
    const options = { disabledItemValues, valueKey, childrenKey, expandItemValues };
    const focusableItems = getFocusableItems(filteredData, options, isSearching(searchKeyword));
    const focusProps = {
      valueKey,
      focusItemValue,
      focusableItems,
      treeNodesRefs,
      selector: treeNodeSelector
    };

    let focusedValue: TreeNode['value'] | null = null;

    if (key === KEY_VALUES.DOWN) {
      focusedValue = focusNextItem(focusProps);
    } else if (key === KEY_VALUES.UP) {
      focusedValue = focusPreviousItem(focusProps);
    }

    if (focusedValue) {
      setFocusItemValue(focusedValue);
      onFocused?.(focusedValue);
    }
  });

  const handleLeftArrowEvent = useEventCallback(() => {
    if (isNil(focusItemValue)) {
      return;
    }

    const focusItem = getActiveItem(focusItemValue, flattenedNodes, valueKey);
    const expand = expandItemValues.includes(focusItem?.[valueKey]);
    const onFocusItem = () => {
      const focusedValue = focusItem?.parent?.[valueKey];
      setFocusItemValue(focusedValue);
      onFocused?.(focusedValue);
      focusTreeNode(focusItem?.parent?.refKey, treeNodesRefs, treeNodeSelector);
    };

    handleLeftArrow({
      focusItem,
      expand,
      onExpand,
      childrenKey,
      onFocusItem
    });
  });

  const handleRightArrowEvent = useEventCallback(() => {
    if (isNil(focusItemValue)) {
      return;
    }

    const focusItem = getActiveItem(focusItemValue, flattenedNodes, valueKey);
    const expand = expandItemValues.includes(focusItem?.[valueKey]);
    const onFocusItem = () => handleFocusItem(KEY_VALUES.DOWN);

    handleRightArrow({
      focusItem,
      expand,
      childrenKey,
      onExpand,
      onFocusItem
    });
  });

  const onTreeKeydown = useEventCallback((event: React.KeyboardEvent<any>) => {
    onMenuKeyDown(event, {
      down: () => handleFocusItem(KEY_VALUES.DOWN),
      up: () => handleFocusItem(KEY_VALUES.UP),
      left: rtl ? handleRightArrowEvent : handleLeftArrowEvent,
      right: rtl ? handleLeftArrowEvent : handleRightArrowEvent
    });
  });

  return {
    focusItemValue,
    treeNodesRefs,
    saveTreeNodeRef,
    setFocusItemValue,
    onTreeKeydown
  };
}

export default useFocusTree;
