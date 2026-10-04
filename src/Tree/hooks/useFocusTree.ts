import isNil from 'lodash/isNil';
import { useRef, useState } from 'react';
import { KEY_VALUES } from '@/internals/constants';
import { useEventCallback, useCustom, useIsomorphicLayoutEffect } from '@/internals/hooks';
import { shallowEqual } from '@/internals/utils';
import { onMenuKeyDown } from '@/internals/Picker';
import { useItemDataKeys, useRegisterTreeMethods } from '@/internals/Tree/TreeProvider';
import {
  isSearching,
  focusNextItem,
  getFocusableItems,
  getActiveItem,
  focusPreviousItem,
  focusFirstItem,
  focusLastItem,
  focusTreeNode,
  formatNodeRefKey,
  handleLeftArrow,
  handleRightArrow
} from '../utils';
import useTreeNodeRefs from './useTreeNodeRefs';
import type { TreeNode } from '@/internals/Tree/types';

interface UseFocusTreeProps<T extends TreeNode> {
  dataReady?: boolean;
  filteredData: T[];
  disabledItemValues: any[];
  expandItemValues: any[];
  searchKeyword: string;
  flattenedNodes: any;
  onExpand?: (nodeData: T, expanded: boolean) => void;
  onFocused?: (value: TreeNode['value']) => void;
  focusNode?: (node: TreeNode, isValid?: () => boolean) => void;
}

interface SelectedFocusRequest {
  value: string | number;
  isValid?: () => boolean;
  source: Element | null;
  ownerDocument: Document;
  scheduled?: boolean;
}
/**
 * Custom hook that manages the focus behavior of a tree component.
 */
function useFocusTree(props: UseFocusTreeProps<TreeNode>) {
  const {
    dataReady = true,
    filteredData,
    searchKeyword,
    flattenedNodes,
    expandItemValues,
    disabledItemValues,
    onExpand,
    onFocused,
    focusNode
  } = props;
  const { rtl } = useCustom();
  const { valueKey, childrenKey } = useItemDataKeys();
  const { treeNodesRefs, saveTreeNodeRef } = useTreeNodeRefs();
  const treeViewRef = useRef<HTMLDivElement>(null);
  const [focusItemValue, setFocusItemValue] = useState<TreeNode['value'] | null>(null);
  const [selectedFocusRequest, setSelectedFocusRequest] = useState<SelectedFocusRequest | null>(
    null
  );
  const selectedFocusRequestRef = useRef<SelectedFocusRequest | null>(null);
  const register = useRegisterTreeMethods();

  const getFocusProps = (value?: string | number) => {
    const options = { disabledItemValues, valueKey, childrenKey, expandItemValues };
    const focusableItems = getFocusableItems(filteredData, options, isSearching(searchKeyword));
    return {
      focusItemValue: value ?? focusItemValue,
      valueKey,
      focusableItems,
      treeNodesRefs,
      focusNode
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

    if (!isNil(focusedValue)) {
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
      if (focusItem?.parent) {
        if (focusNode) focusNode(focusItem.parent);
        else focusTreeNode(focusItem.parent.refKey, treeNodesRefs);
      }
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

  const handleHomeKey = useEventCallback(() => {
    const focusProps = getFocusProps();
    const focusedValue = focusFirstItem(focusProps);

    if (!isNil(focusedValue)) {
      setFocusItemValue(focusedValue);
      onFocused?.(focusedValue);
    }
  });

  const handleEndKey = useEventCallback(() => {
    const focusProps = getFocusProps();
    const focusedValue = focusLastItem(focusProps);

    if (!isNil(focusedValue)) {
      setFocusItemValue(focusedValue);
      onFocused?.(focusedValue);
    }
  });

  const onTreeKeydown = useEventCallback((event: React.KeyboardEvent<any>) => {
    onMenuKeyDown(event, {
      down: () => handleFocusItem(KEY_VALUES.DOWN),
      up: () => handleFocusItem(KEY_VALUES.UP),
      left: rtl ? handleRightArrowEvent : handleLeftArrowEvent,
      right: rtl ? handleLeftArrowEvent : handleRightArrowEvent,
      home: handleHomeKey,
      end: handleEndKey
    });
  });

  const focusTreeFirstNode = useEventCallback(() => {
    handleFocusItem(KEY_VALUES.DOWN);
  });

  const focusTreeActiveNode = useEventCallback(
    (value?: string | number | null, isValid?: () => boolean) => {
      if (isNil(value)) {
        selectedFocusRequestRef.current = null;
        setSelectedFocusRequest(null);
        setFocusItemValue(null);
        onFocused?.(undefined);
        return;
      }
      const ownerDocument = treeViewRef.current?.ownerDocument;
      if (!ownerDocument) return;
      const request = {
        value,
        isValid,
        ownerDocument,
        source: ownerDocument.activeElement
      };
      selectedFocusRequestRef.current = request;
      setSelectedFocusRequest(request);
    }
  );

  const restoreSelectedFocus = useEventCallback((request: SelectedFocusRequest) => {
    if (selectedFocusRequestRef.current !== request) return;
    const { source, ownerDocument } = request;
    if (
      request.isValid?.() === false ||
      treeViewRef.current?.ownerDocument !== ownerDocument ||
      (ownerDocument.activeElement !== source &&
        (source?.isConnected || ownerDocument.activeElement !== ownerDocument.body))
    ) {
      selectedFocusRequestRef.current = null;
      setSelectedFocusRequest(null);
      return;
    }
    if (!dataReady) return;

    const { focusableItems } = getFocusProps(request.value);
    const node = focusableItems.find(node => shallowEqual(node[valueKey], request.value));
    // The owner and search data can commit before passive tree formatting finishes.
    if (
      node &&
      (node.refKey !== formatNodeRefKey(node[valueKey]) ||
        !shallowEqual(flattenedNodes[node.refKey]?.[valueKey], request.value))
    )
      return;

    selectedFocusRequestRef.current = null;
    setSelectedFocusRequest(null);

    setFocusItemValue(node?.[valueKey] ?? null);
    onFocused?.(node?.[valueKey]);
    if (!node) return;

    if (focusNode) focusNode(node, request.isValid);
    else if (node.refKey) focusTreeNode(node.refKey, treeNodesRefs);
  });

  useIsomorphicLayoutEffect(() => {
    const request = selectedFocusRequest;
    if (!request || request.scheduled) return;
    request.scheduled = true;
    // Opening callbacks and ancestor exit lifecycles must finish before restoring focus.
    Promise.resolve().then(() => {
      request.scheduled = false;
      restoreSelectedFocus(request);
    });
  });

  useIsomorphicLayoutEffect(() => {
    const unregister = register?.({ focusTreeFirstNode, focusTreeActiveNode });

    return () => {
      selectedFocusRequestRef.current = null;
      unregister?.();
    };
  }, []);

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
