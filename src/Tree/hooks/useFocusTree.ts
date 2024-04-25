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
}
/**
 * Custom hook that manages the focus behavior of a tree component.
 */
function useFocusTree(props: UseFocusTreeProps<TreeNode>) {
  const {
    filteredData,
    disabledItemValues,
    valueKey,
    childrenKey,
    expandItemValues,
    searchKeyword,
    treeNodeSelector,
    flattenedNodes,
    rtl,
    onExpand
  } = props;

  const { treeNodesRefs, saveTreeNodeRef } = useTreeNodeRefs();
  const [focusItemValue, setFocusItemValue] = useState(null);

  const handleFocusItem = useEventCallback((key: string) => {
    const focusableItems = getFocusableItems(
      filteredData,
      {
        disabledItemValues,
        valueKey,
        childrenKey,
        expandItemValues
      },
      isSearching(searchKeyword)
    );

    const focusProps = {
      focusItemValue,
      focusableItems,
      treeNodesRefs,
      selector: treeNodeSelector,
      valueKey,
      callback: nextFocusItemValue => {
        setFocusItemValue(nextFocusItemValue);
      }
    };
    if (key === KEY_VALUES.DOWN) {
      focusNextItem(focusProps);
      return;
    }
    if (key === KEY_VALUES.UP) {
      focusPreviousItem(focusProps);
    }
  });

  const handleLeftArrowEvent = useEventCallback(() => {
    if (isNil(focusItemValue)) return;
    const focusItem = getActiveItem(focusItemValue, flattenedNodes, valueKey);
    handleLeftArrow({
      focusItem,
      expand: expandItemValues.includes(focusItem?.[valueKey]),
      onExpand,
      childrenKey,
      onFocusItem: () => {
        setFocusItemValue(focusItem?.parent?.[valueKey]);
        focusTreeNode(focusItem?.parent?.refKey, treeNodesRefs, treeNodeSelector);
      }
    });
  });

  const handleRightArrowEvent = useEventCallback(() => {
    if (isNil(focusItemValue)) return;
    const focusItem = getActiveItem(focusItemValue, flattenedNodes, valueKey);

    handleRightArrow({
      focusItem,
      expand: expandItemValues.includes(focusItem?.[valueKey]),
      childrenKey,
      onExpand,
      onFocusItem: () => {
        handleFocusItem(KEY_VALUES.DOWN);
      }
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
    saveTreeNodeRef,
    setFocusItemValue,
    onTreeKeydown
  };
}

export default useFocusTree;
