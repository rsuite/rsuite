import { useState } from 'react';
import useUpdateEffect from './useUpdateEffect';
import flattenData from '../utils/flattenData';
import findAllParents from '../utils/findAllParents';
import shouldShowRowByExpanded from '../utils/shouldShowRowByExpanded';
import { EXPANDED_KEY, TREE_DEPTH } from '../constants';
import type { RowKeyType, RowDataType } from '../types';
/**
 * Filter those expanded nodes.
 * @param data
 * @param expandedRowKeys
 * @param rowKey
 * @returns
 */
const filterTreeData = <Row extends RowDataType, Key>(
  data: readonly Row[],
  expandedRowKeys: readonly Key[],
  rowKey?: RowKeyType
) => {
  return flattenData(data).filter(rowData => {
    if (rowKey) {
      const parents = findAllParents(rowData, rowKey);
      const expanded = shouldShowRowByExpanded(expandedRowKeys, parents);

      // FIXME This function is supposed to be pure.
      //       Don't mutate rowData in-place!
      (rowData as Record<string, unknown>)[EXPANDED_KEY] = expanded;
      (rowData as Record<string, unknown>)[TREE_DEPTH] = parents.length;

      return expanded;
    }
  });
};

interface UseTableDataProps<Row extends RowDataType, Key extends RowKeyType> {
  data: readonly Row[];
  isTree?: boolean;
  expandedRowKeys: readonly Key[];
  rowKey?: RowKeyType;
}

function useTableData<Row extends RowDataType, Key extends RowKeyType>(
  props: UseTableDataProps<Row, Key>
) {
  const { data, isTree, expandedRowKeys, rowKey } = props;
  const [tableData, setData] = useState(() => {
    return isTree ? filterTreeData(data, expandedRowKeys, rowKey) : data;
  });

  useUpdateEffect(() => {
    setData(isTree ? filterTreeData(data, expandedRowKeys, rowKey) : data);
  }, [data, expandedRowKeys, rowKey, isTree]);

  return tableData;
}

export default useTableData;
