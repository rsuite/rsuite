import { useCallback } from 'react';
import { isAllSiblingNodeUncheckable, getDisabledState, isNodeUncheckable } from '../utils';
import { highlightLabel } from '../../internals/utils';
import { useItemDataKeys } from '../../Tree/TreeProvider';
import type { TreeNode } from '../../Tree/types';

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
      const { expand, visible, checkState } = nodeData;
      const value = nodeData[valueKey];
      const allUncheckable = isAllSiblingNodeUncheckable(
        nodeData,
        flattenedNodes,
        uncheckableItemValues,
        valueKey
      );

      const label = keyword
        ? highlightLabel(nodeData[labelKey], { searchKeyword: keyword })
        : nodeData[labelKey];

      const disabled = getDisabledState(flattenedNodes, nodeData, { disabledItemValues, valueKey });
      const uncheckable = isNodeUncheckable(nodeData, { uncheckableItemValues, valueKey });
      const loading = loadingNodeValues.some(item => item === nodeData[valueKey]);
      const focus = focusItemValue === value;

      return {
        value,
        label,
        expand,
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
