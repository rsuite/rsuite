import { useState, useMemo } from 'react';
import slice from 'lodash/slice';
import { shallowEqual } from '../utils';
import { CascaderProps } from './Cascader';
import { ItemDataType } from '../@types/common';

function getColumnsAndPaths(data, value, options) {
  const { childrenKey, valueKey } = options;
  const columns: ItemDataType[][] = [];
  const paths = [];
  const findNode = items => {
    for (let i = 0; i < items.length; i += 1) {
      const children = items[i][childrenKey];

      if (shallowEqual(items[i][valueKey], value)) {
        return { items, active: items[i] };
      } else if (children) {
        const node = findNode(children);

        if (node) {
          columns.push(children.map(item => ({ ...item, parent: items[i] })));
          paths.push(node.active);

          return { items, active: items[i] };
        }
      }
    }
    return null;
  };
  const selectedNode = findNode(data);

  columns.push(data);

  if (selectedNode) {
    paths.push(selectedNode.active);
  }

  columns.reverse();
  paths.reverse();

  return { columns, paths };
}

export function usePaths(props: CascaderProps) {
  const { data, valueKey, childrenKey, value } = props;

  const { columns, paths } = useMemo(
    () => getColumnsAndPaths(data, value, { valueKey, childrenKey }),
    [data, value, valueKey, childrenKey]
  );

  // The columns displayed in the cascading panel.
  const [columnData, setColumnData] = useState(columns);

  // The path after cascading data selection.
  const [selectedPaths, setSelectedPaths] = useState<ItemDataType[]>(paths);

  // The path corresponding to the selected value.
  const [valueToPaths, setValueToPaths] = useState<ItemDataType[]>(paths);

  /**
   * Add a list of options to the cascading panel. Used for lazy loading options.
   * @param column
   * @param index The index of the current column.
   */
  function addColumn(column: ItemDataType[], index: number) {
    setColumnData([...slice(columnData, 0, index), column]);
  }

  function enforceUpdate(nextValue) {
    const { columns, paths } = getColumnsAndPaths(data, nextValue, { valueKey, childrenKey });

    setColumnData(columns);
    setSelectedPaths(paths);
  }

  return {
    enforceUpdate,
    columnData,
    valueToPaths,
    selectedPaths,
    setValueToPaths,
    setColumnData,
    setSelectedPaths,
    addColumn
  };
}
