import { useCallback } from 'react';
import isNil from 'lodash/isNil';
import cloneDeep from 'lodash/cloneDeep';
import { useEventCallback } from '@/internals/hooks';
import { useItemDataKeys } from '@/internals/Tree/TreeProvider';
import type { TreeNodeMap, TreeNode } from '@/internals/Tree/types';
import { isEveryChildChecked, getDisabledState } from '../utils';

interface Props {
  cascade?: boolean;
  flattenedNodes: TreeNodeMap;
  uncheckableItemValues: (string | number)[];
  disabledItemValues?: (string | number)[];
}
function useTreeCheckState(props: Props) {
  const { cascade, flattenedNodes, uncheckableItemValues, disabledItemValues = [] } = props;
  const { valueKey, childrenKey } = useItemDataKeys();

  const checkParentNode = useEventCallback(
    (nodes: TreeNodeMap, node: TreeNode, checked: boolean) => {
      const currentNode = node.refKey ? nodes[node.refKey] : null;
      if (cascade && currentNode) {
        if (!checked) {
          currentNode.check = checked;
          currentNode.checkAll = checked;
        } else {
          if (
            isEveryChildChecked(currentNode, { nodes, childrenKey, disabledItemValues, valueKey })
          ) {
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

  // Helper function to check if any descendant is disabled
  const hasDisabledDescendant = useEventCallback((nodes: TreeNodeMap, node: TreeNode): boolean => {
    if (!node[childrenKey] || !node[childrenKey].length) {
      return false;
    }

    return node[childrenKey].some((child: TreeNode) => {
      const isChildDisabled = getDisabledState(nodes, child, { disabledItemValues, valueKey });
      if (isChildDisabled) {
        return true;
      }
      // Recursively check descendants
      return hasDisabledDescendant(nodes, child);
    });
  });

  const checkChildNode = useEventCallback(
    (nodes: TreeNodeMap, node: TreeNode, isChecked: boolean) => {
      const currentNode = node.refKey ? nodes[node.refKey] : null;

      if (!currentNode) {
        return;
      }

      // Check if the current node is disabled
      const isDisabled = getDisabledState(nodes, node, { disabledItemValues, valueKey });

      // Skip checking disabled nodes
      if (isDisabled) {
        return;
      }

      currentNode.check = isChecked;

      if (!currentNode[childrenKey] || !currentNode[childrenKey].length || !cascade) {
        currentNode.checkAll = false;
      } else {
        // Check if any descendant (not just direct children) is disabled
        const hasDisabledDesc = hasDisabledDescendant(nodes, currentNode);

        // Only set checkAll to true if all descendants will be checked
        // If there are any disabled descendants, checkAll should be false
        currentNode.checkAll = isChecked && !hasDisabledDesc;

        currentNode[childrenKey].forEach((child: TreeNode) => {
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
            // If current node's checkAll is true, it should be represented by its parent
            // Don't add it individually
            if (currentNode.checkAll && parentNode.check) {
              continue;
            }

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
