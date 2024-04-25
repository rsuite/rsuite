import { useCallback } from 'react';
import isNil from 'lodash/isNil';
import shallowEqual from '../../utils/shallowEqual';
import type { TreeNodeMap } from '../types';

interface UseSerializeListProps {
  valueKey: string;
  cascade?: boolean;
  uncheckableItemValues?: any;
}

interface UnserializeListProps {
  nodes: TreeNodeMap;
  key: string;
  value: any;
}

function useSerializeList({
  valueKey,
  uncheckableItemValues = [],
  cascade
}: UseSerializeListProps) {
  const serializeListOnlyParent = useCallback(
    (nodes: TreeNodeMap, key: string) => {
      const list: (string | number)[] = [];

      Object.keys(nodes).forEach((refKey: string) => {
        const currentNode = nodes[refKey];
        if (!isNil(currentNode.parent) && !isNil(currentNode.parent.refKey)) {
          const parentNode = nodes[currentNode.parent.refKey];
          if (currentNode[key]) {
            if (!parentNode?.checkAll) {
              list.push(nodes[refKey][valueKey]);
            } else if (parentNode?.uncheckable) {
              list.push(nodes[refKey][valueKey]);
            }
          }
        } else {
          if (currentNode[key]) {
            list.push(nodes[refKey][valueKey]);
          }
        }
      });
      return list;
    },
    [valueKey]
  );

  /**
   * using in CheckTreePicker, to unserializeList check property
   */
  const unserializeList = useCallback(
    ({ nodes, key, value = [] }: UnserializeListProps) => {
      // Reset values to false
      Object.keys(nodes).forEach((refKey: string) => {
        const node = nodes[refKey];
        if (cascade && !isNil(node.parent) && !isNil(node.parent.refKey)) {
          node[key] = nodes[node.parent.refKey][key];
        } else {
          node[key] = false;
        }
        value.forEach((value: any) => {
          if (
            shallowEqual(nodes[refKey][valueKey], value) &&
            !uncheckableItemValues.some(uncheckableValue => shallowEqual(value, uncheckableValue))
          ) {
            nodes[refKey][key] = true;
          }
        });
      });
    },
    [cascade, uncheckableItemValues, valueKey]
  );

  return {
    serializeListOnlyParent,
    unserializeList
  };
}

export default useSerializeList;
