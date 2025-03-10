import isNil from 'lodash/isNil';
import { useCallback, useEffect, useRef, useState } from 'react';
import { KEY_VALUES } from '@/internals/constants';
import { useEventCallback } from '@/internals/hooks';
import { onMenuKeyDown } from '@/internals/Picker';
import { useItemDataKeys, useRegisterTreeMethods } from '@/internals/Tree/TreeProvider';
import {
  isSearching,
  focusNextItem,
  getFocusableItems,
  getActiveItem,
  focusPreviousItem,
  focusCurrentItem,
  focusTreeNode,
  handleLeftArrow,
  handleRightArrow
} from '../utils';
import { useCustom } from '../../CustomProvider';
import useTreeNodeRefs from './useTreeNodeRefs';
import type { TreeNode } from '@/internals/Tree/types';

interface UseFocusTreeProps<T extends TreeNode> {
  filteredData: T[];
  disabledItemValues: any[];
  expandItemValues: any[];
  searchKeyword: string;
  flattenedNodes: any;
  onExpand?: (nodeData: T, expanded: boolean) => void;
  onFocused?: (value: TreeNode['value']) => void;
}
/**
 * Custom hook that manages the focus behavior of a tree component.
 */
function useFocusTree(props: UseFocusTreeProps<TreeNode>) {
  const {
    filteredData,
    searchKeyword,
    flattenedNodes,
    expandItemValues,
    disabledItemValues,
    onExpand,
    onFocused
  } = props;
  const { rtl } = useCustom();
  const { valueKey, childrenKey } = useItemDataKeys();
  const { treeNodesRefs, saveTreeNodeRef } = useTreeNodeRefs();
  const treeViewRef = useRef<HTMLDivElement>(null);
  const [focusItemValue, setFocusItemValue] = useState<TreeNode['value'] | null>(null);
  const register = useRegisterTreeMethods();
  const flattenedNodesRef = useRef(flattenedNodes);

  const getFocusProps = (value?: string | number) => {
    const options = { disabledItemValues, valueKey, childrenKey, expandItemValues };
    const focusableItems = getFocusableItems(filteredData, options, isSearching(searchKeyword));
    return {
      focusItemValue: value || focusItemValue,
      valueKey,
      focusableItems,
      treeNodesRefs
    };
  };

  const handleFocusItem = useEventCallback((key: string) => {
    const focusProps = getFocusProps();

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
      focusTreeNode(focusItem?.parent?.refKey, treeNodesRefs);
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

  const focusTreeFirstNode = useEventCallback(() => {
    handleFocusItem(KEY_VALUES.DOWN);
  });

  const focusTreeActiveNode = useCallback(() => {
    const refKey = focusCurrentItem({ container: treeViewRef.current });

    if (refKey) {
      const node = flattenedNodesRef.current?.[refKey];
      if (node) {
        setFocusItemValue(node[valueKey]);
        onFocused?.(node[valueKey]);
      }
    }
  }, [onFocused, valueKey]);

  useEffect(() => {
    const unregister = register?.({ focusTreeFirstNode, focusTreeActiveNode });

    return () => {
      unregister?.();
    };
  }, []);

  useEffect(() => {
    flattenedNodesRef.current = flattenedNodes;
  }, [flattenedNodes]);

  return {
    treeViewRef,
    focusTreeFirstNode,
    focusItemValue,
    treeNodesRefs,
    saveTreeNodeRef,
    setFocusItemValue,
    onTreeKeydown
  };
}

export default useFocusTree;
