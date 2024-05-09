import { useCallback } from 'react';
import { TREE_NODE_DROP_POSITION, shallowEqual as equal } from '../../utils';
import { highlightLabel } from '../../internals/utils';
import { useItemDataKeys } from '../TreeProvider';
import { DragStatus } from '../TreeNode';

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
      const { expand, visible } = nodeData;

      const draggingNode = dragNode ?? {};
      const nodeValue = nodeData[valueKey];
      const label = keyword
        ? highlightLabel(nodeData[labelKey], { searchKeyword: keyword })
        : nodeData[labelKey];

      const children = nodeData[childrenKey];
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
        value: nodeValue,
        label,
        index,
        layer,
        loading,
        expand,
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
      keyword,
      labelKey,
      loadingNodeValues,
      value,
      valueKey
    ]
  );
}

export default useTreeNodeProps;
