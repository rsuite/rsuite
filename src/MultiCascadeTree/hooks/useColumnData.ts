import { useState } from 'react';
import slice from 'lodash/slice';
import { UNSAFE_flattenTree } from '../../Tree/utils';

type MayHasParent<T extends Record<string, unknown>> = T & {
  parent?: MayHasParent<T>;
};

/**
 * A hook for column data
 * @param flattenData
 */
function useColumnData<T extends MayHasParent<Record<string, unknown>>>(flattenData: T[]) {
  // The columns displayed in the cascading panel.
  const [columnData, setColumnData] = useState<(readonly T[])[]>([
    flattenData.filter(item => !item.parent)
  ]);

  /**
   * Add a list of options to the cascading panel. Used for lazy loading options.
   * @param column
   * @param index The index of the current column.
   */
  function addColumn(column: T[], index: number) {
    setColumnData([...slice(columnData, 0, index), column]);
  }

  /**
   * Remove subsequent columns of the specified column
   * @param index
   */
  function removeColumnByIndex(index: number) {
    setColumnData([...slice(columnData, 0, index)]);
  }

  function enforceUpdateColumnData(nextData: T[]) {
    const nextFlattenData = UNSAFE_flattenTree(nextData);
    setColumnData([nextFlattenData.filter(item => !item.parent)]);
  }

  return {
    columnData,
    addColumn,
    removeColumnByIndex,
    setColumnData,
    enforceUpdateColumnData
  };
}

export default useColumnData;
