import React, { useCallback } from 'react';
import { isAllSiblingNodeUncheckable, getDisabledState, isNodeUncheckable } from '../utils';
import { useItemDataKeys } from '@/internals/Tree/TreeProvider';
import type { TreeNode } from '@/internals/Tree/types';
import Highlight from '../../Highlight';

interface Props {
  uncheckableItemValues: any[];
  disabledItemValues: any[];
  loadingNodeValues: any[];
  focusItemValue: any;
  flattenedNodes: any;
  keyword: string;
}

function useTreeNodeProps(props: Props) {
  const { valueKey, labelKey } = useItemDataKeys();
  const {
    uncheckableItemValues,
    disabledItemValues,
    loadingNodeValues,
    focusItemValue,
    flattenedNodes,
    keyword
  } = props;

  return useCallback(
    (nodeData: TreeNode) => {
      const { visible, checkState } = nodeData;
      const value = nodeData[valueKey];
      const nodeLabel = nodeData[labelKey];
      const allUncheckable = isAllSiblingNodeUncheckable(
        nodeData,
        flattenedNodes,
        uncheckableItemValues,
        valueKey
      );

      const label = keyword ? (
        <Highlight as="span" query={keyword}>
          {nodeLabel}
        </Highlight>
      ) : (
        nodeLabel
      );

      const disabled = getDisabledState(flattenedNodes, nodeData, { disabledItemValues, valueKey });
      const uncheckable = isNodeUncheckable(nodeData, { uncheckableItemValues, valueKey });
      const loading = loadingNodeValues.some(item => item === nodeData[valueKey]);
      const focus = focusItemValue === value;

      return {
        value,
        label,
        visible,
        loading,
        disabled,
        nodeData,
        checkState,
        uncheckable,
        allUncheckable,
        focus
      };
    },
    [
      valueKey,
      flattenedNodes,
      uncheckableItemValues,
      keyword,
      labelKey,
      disabledItemValues,
      loadingNodeValues,
      focusItemValue
    ]
  );
}

export default useTreeNodeProps;
