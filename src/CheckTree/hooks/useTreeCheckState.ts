import { useCallback } from 'react';
import isNil from 'lodash/isNil';
import cloneDeep from 'lodash/cloneDeep';
import { useEventCallback } from '@/internals/hooks';
import { useItemDataKeys } from '@/internals/Tree/TreeProvider';
import type { TreeNodeMap, TreeNode } from '@/internals/Tree/types';
import { isEveryChildChecked } from '../utils';

interface Props {
  cascade?: boolean;
  flattenedNodes: TreeNodeMap;
  uncheckableItemValues: (string | number)[];
}
function useTreeCheckState(props: Props) {
  const { cascade, flattenedNodes, uncheckableItemValues } = props;
  const { valueKey, childrenKey } = useItemDataKeys();

  const checkParentNode = useEventCallback(
    (nodes: TreeNodeMap, node: TreeNode, checked: boolean) => {
      const currentNode = node.refKey ? nodes[node.refKey] : null;
      if (cascade && currentNode) {
        if (!checked) {
          currentNode.check = checked;
          currentNode.checkAll = checked;
        } else {
          if (isEveryChildChecked(currentNode, { nodes, childrenKey })) {
            currentNode.check = true;
            currentNode.checkAll = true;
          } else {
            currentNode.check = false;
            currentNode.checkAll = false;
          }
        }
        if (currentNode.parent) {
          checkParentNode(nodes, currentNode.parent, checked);
        }
      }
    }
  );

  const checkChildNode = useEventCallback(
    (nodes: TreeNodeMap, node: TreeNode, isChecked: boolean) => {
      const currentNode = node.refKey ? nodes[node.refKey] : null;

      if (!currentNode) {
        return;
      }

      currentNode.check = isChecked;

      if (!currentNode[childrenKey] || !currentNode[childrenKey].length || !cascade) {
        currentNode.checkAll = false;
      } else {
        currentNode.checkAll = isChecked;
        currentNode[childrenKey].forEach(child => {
          checkChildNode(nodes, child, isChecked);
        });
      }
    }
  );

  const getCheckedValuesByParent = useCallback(
    (nodes: TreeNodeMap) => {
      const values: (string | number)[] = [];

      for (const key in nodes) {
        const currentNode = nodes[key];
        if (!isNil(currentNode.parent) && !isNil(currentNode.parent.refKey)) {
          const parentNode = nodes[currentNode.parent.refKey];
          if (currentNode.check) {
            if (!parentNode?.checkAll) {
              values.push(currentNode[valueKey]);
            } else if (parentNode?.uncheckable) {
              values.push(currentNode[valueKey]);
            }
          }
        } else if (currentNode.check) {
          values.push(currentNode[valueKey]);
        }
      }

      return values;
    },
    [valueKey]
  );

  const getCheckedValues = useEventCallback((node: TreeNode, isChecked: boolean) => {
    const nodes = cloneDeep(flattenedNodes);

    checkChildNode(nodes, node, isChecked);

    if (node.parent) {
      checkParentNode(nodes, node.parent, isChecked);
    }

    const values = getCheckedValuesByParent(nodes);

    return values.filter(v => !uncheckableItemValues.includes(v));
  });

  return {
    getCheckedValues
  };
}

export default useTreeCheckState;
