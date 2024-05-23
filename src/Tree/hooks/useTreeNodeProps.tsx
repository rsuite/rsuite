import React, { useCallback } from 'react';
import { TREE_NODE_DROP_POSITION } from '@/internals/constants';
import { shallowEqual as equal } from '@/internals/utils';
import { useCombobox } from '@/internals/Picker/hooks';
import { useItemDataKeys } from '@/internals/Tree/TreeProvider';
import { DragStatus } from '../TreeNode';
import Highlight from '../../Highlight';

interface Props {
  value: any;
  disabledItemValues: any[];
  loadingNodeValues: any[];
  focusItemValue: any;
  keyword: string;
  dragNode: any;
  dragOverNodeKey: any;
  dropNodePosition: TREE_NODE_DROP_POSITION | -1 | null;
}

function useTreeNodeProps(props: Props) {
  const { valueKey, labelKey, childrenKey } = useItemDataKeys();
  const { id } = useCombobox();

  const {
    value,
    disabledItemValues,
    loadingNodeValues,
    focusItemValue,
    keyword,
    dragNode,
    dragOverNodeKey,
    dropNodePosition
  } = props;

  return useCallback(
    (nodeData: any, layer: number, index?: number) => {
      const { DRAG_OVER, DRAG_OVER_TOP, DRAG_OVER_BOTTOM } = TREE_NODE_DROP_POSITION;
      const { visible } = nodeData;

      const draggingNode = dragNode ?? {};
      const nodeValue = nodeData[valueKey];
      const nodeLabel = nodeData[labelKey];
      const children = nodeData[childrenKey];

      const label = keyword ? (
        <Highlight as="span" query={keyword}>
          {nodeLabel}
        </Highlight>
      ) : (
        nodeLabel
      );

      const dragging = equal(nodeValue, draggingNode[valueKey]);

      let dragStatus: DragStatus | undefined;

      if (equal(nodeValue, dragOverNodeKey)) {
        switch (dropNodePosition) {
          case DRAG_OVER:
            dragStatus = 'drag-over';
            break;
          case DRAG_OVER_TOP:
            dragStatus = 'drag-over-top';
            break;
          case DRAG_OVER_BOTTOM:
            dragStatus = 'drag-over-bottom';
            break;
        }
      }

      const disabled = disabledItemValues.some(disabledItem => equal(disabledItem, nodeValue));
      const loading = loadingNodeValues.some(item => equal(item, nodeValue));
      const active = equal(nodeValue, value);
      const focus = equal(nodeValue, focusItemValue);

      return {
        id: id ? `${id}-opt-${nodeValue}` : undefined,
        value: nodeValue,
        label,
        index,
        layer,
        loading,
        active,
        focus,
        visible,
        children,
        nodeData,
        disabled,
        dragging,
        dragStatus
      };
    },
    [
      childrenKey,
      disabledItemValues,
      dragNode,
      dragOverNodeKey,
      dropNodePosition,
      focusItemValue,
      id,
      keyword,
      labelKey,
      loadingNodeValues,
      value,
      valueKey
    ]
  );
}

export default useTreeNodeProps;
