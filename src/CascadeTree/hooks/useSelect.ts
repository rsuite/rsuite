import { useState } from 'react';
import { useSet } from 'react-use-set';
import { useEventCallback, useIsMounted } from '@/internals/hooks';
import { shallowEqual } from '@/internals/utils';
import { type ItemDataType } from '@/internals/types';
import { type SelectNode } from '../types';

export interface UseSelectProps<T> {
  value?: T | null;
  valueKey: string;
  childrenKey: string;
  selectedItem?: ItemDataType<T>;
  childrenMap: any;
  onSelect?: (node: SelectNode<T>, event: React.SyntheticEvent) => void;
  onChange?: (value: T, event: React.SyntheticEvent) => void;
  getChildren?: (
    node: ItemDataType<T>
  ) => readonly ItemDataType<T>[] | Promise<readonly ItemDataType<T>[]>;
}

/**
 * Hook for handling the state after the option is selected
 */
const useSelect = <T>(props: UseSelectProps<T>) => {
  const {
    value,
    onSelect,
    getChildren,
    valueKey,
    onChange,
    childrenKey,
    selectedItem,
    childrenMap
  } = props;

  // The item that focus is on
  const [activeItem, setActiveItem] = useState<ItemDataType<T> | undefined>(selectedItem);
  const isMounted = useIsMounted();

  const loadingItemsSet = useSet();

  const handleSelect = useEventCallback((node: SelectNode<T>, event: React.MouseEvent) => {
    const { itemData, isLeafNode } = node;

    setActiveItem(itemData);

    // Lazy load node's children
    if (
      typeof getChildren === 'function' &&
      itemData[childrenKey]?.length === 0 &&
      !childrenMap.has(itemData)
    ) {
      loadingItemsSet.add(itemData);

      const children = getChildren(itemData);

      if (children instanceof Promise) {
        children.then((data: readonly ItemDataType<T>[]) => {
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
      const nextValue = itemData[valueKey];

      if (!shallowEqual(value, nextValue)) {
        onChange?.(nextValue, event);
      }
    }

    onSelect?.(node, event);
  });

  return {
    loadingItemsSet,
    activeItem,
    setActiveItem,
    handleSelect
  };
};

export default useSelect;
