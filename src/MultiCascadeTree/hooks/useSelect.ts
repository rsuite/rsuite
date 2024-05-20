import React, { useState } from 'react';
import { useEventCallback, useUpdateEffect, useIsMounted } from '@/internals/hooks';
import { type ItemDataType } from '@/internals/types';
import useFlattenData from './useFlattenData';
import useColumnData from './useColumnData';

export interface UseSelectProps<T> {
  data: ItemDataType<T>[];
  childrenKey: string;
  labelKey: string;
  valueKey: string;
  onSelect?: (
    node: ItemDataType<T>,
    cascadePaths: ItemDataType<T>[],
    event: React.SyntheticEvent
  ) => void;
  getChildren?: (node: ItemDataType<T>) => ItemDataType<T>[] | Promise<ItemDataType<T>[]>;
}

const useSelect = <T>(props: UseSelectProps<T>) => {
  const { data, childrenKey, labelKey, valueKey, onSelect, getChildren } = props;
  const itemKeys = { childrenKey, labelKey, valueKey };
  const { flattenData, addFlattenData } = useFlattenData<ItemDataType<T>>(data, itemKeys);

  // The columns displayed in the cascading panel.
  const { columnData, addColumn, setColumnData, removeColumnByIndex, enforceUpdateColumnData } =
    useColumnData(flattenData);

  useUpdateEffect(() => {
    enforceUpdateColumnData(data);
  }, [data]);

  const isMounted = useIsMounted();

  // The path after cascading data selection.
  const [selectedPaths, setSelectedPaths] = useState<ItemDataType<T>[]>();

  const handleSelect = useEventCallback(
    (node: ItemDataType<T>, cascadePaths: ItemDataType<T>[], event: React.SyntheticEvent) => {
      setSelectedPaths(cascadePaths);

      const columnIndex = cascadePaths.length;

      // Lazy load node's children
      if (typeof getChildren === 'function' && node[childrenKey]?.length === 0) {
        node.loading = true;

        const children = getChildren(node);
        if (children instanceof Promise) {
          children.then(data => {
            node.loading = false;
            node[childrenKey] = data;

            if (isMounted()) {
              addFlattenData(data, node);
              addColumn(data, columnIndex);
            }
          });
        } else {
          node.loading = false;
          node[childrenKey] = children;
          addFlattenData(children, node);
          addColumn(children, columnIndex);
        }
      } else if (node[childrenKey]?.length) {
        addColumn(node[childrenKey], columnIndex);
      } else {
        // Removes subsequent columns of the current column when the clicked node is a leaf node.
        removeColumnByIndex(columnIndex);
      }

      onSelect?.(node, cascadePaths, event);
    }
  );

  return {
    columnData,
    setColumnData,
    flattenData,
    selectedPaths,
    setSelectedPaths,
    handleSelect
  };
};

export default useSelect;
