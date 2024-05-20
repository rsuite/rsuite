import remove from 'lodash/remove';
import { ItemDataType } from '@/internals/types';
export interface ItemType<T = any> extends ItemDataType<T> {
  parent?: ItemType<T>;
}

interface ItemKeys {
  valueKey: string;
  labelKey: string;
  childrenKey: string;
}

export type MayHasParent<T extends Record<string, unknown>> = T & {
  parent?: MayHasParent<T>;
};

/**
 * get all ancestor nodes of given node
 * @param {*} node
 */
export function getNodeParents(node: any, parentKey = 'parent', valueKey?: string) {
  const parents: any[] = [];
  const traverse = (node: any) => {
    if (node?.[parentKey]) {
      traverse(node[parentKey]);

      if (valueKey) {
        parents.push(node[parentKey][valueKey]);
      } else {
        parents.push(node[parentKey]);
      }
    }
  };

  traverse(node);

  return parents;
}

/**
 * Check if any child nodes are selected.
 * @param node
 * @param value
 * @param itemKeys
 */
export const isSomeChildChecked = <T extends Record<string, unknown>>(
  node: T,
  value: T[],
  itemKeys: Omit<ItemKeys, 'labelKey'>
) => {
  const { childrenKey, valueKey } = itemKeys;
  if (!node[childrenKey] || !value) {
    return false;
  }

  return (node[childrenKey] as T[]).some(child => {
    if (value.some(n => n === child[valueKey])) {
      return true;
    }
    if ((child[childrenKey] as T[] | undefined)?.length) {
      return isSomeChildChecked(child, value, itemKeys);
    }
    return false;
  });
};

/**
 * Check if the parent is selected.
 * @param node
 * @param value
 * @param itemKeys
 */
export const isSomeParentChecked = <T extends Record<string, unknown>>(
  node: MayHasParent<T>,
  value: T[],
  itemKeys: Pick<ItemKeys, 'valueKey'>
) => {
  const { valueKey } = itemKeys;
  if (!value) {
    return false;
  }

  if (value.some(n => n === node[valueKey])) {
    return true;
  }

  if (node.parent) {
    return isSomeParentChecked(node.parent, value, itemKeys);
  }

  return false;
};

export const getOtherItemValuesByUnselectChild = <T>(
  itemNode: ItemType,
  value: any,
  itemKeys: Omit<ItemKeys, 'labelKey'>
): T[] => {
  const { valueKey, childrenKey } = itemKeys;
  const parentValues: T[] = [];
  const itemValues: T[] = [];

  // Find the parent node of the current node by value
  function findParent(item) {
    parentValues.push(item[valueKey]);
    if (value.some(v => v === item[valueKey])) {
      return item;
    }
    if (item.parent) {
      const p = findParent(item.parent);
      if (p) {
        return p;
      }
    }
    return null;
  }

  // Get child nodes through parent node
  function pushChildValue(item) {
    if (!item[childrenKey]) {
      return;
    }
    item[childrenKey].forEach(n => {
      // Determine whether it is a direct parent
      if (parentValues.some(v => v === n[valueKey]) && n[childrenKey]) {
        pushChildValue(n);
      } else if (n[valueKey] !== itemNode[valueKey]) {
        itemValues.push(n[valueKey]);
      }
    });
  }

  const parent = findParent(itemNode);

  if (!parent) {
    return [];
  }

  pushChildValue(parent);

  return itemValues;
};

/**
 * Remove the values of all children.
 */
export const removeAllChildrenValue = <T>(
  value: T[],
  item: ItemType,
  itemKeys: Omit<ItemKeys, 'labelKey'>
): T[] | undefined => {
  const { valueKey, childrenKey } = itemKeys;
  let removedValue: T[] = [];
  if (!item[childrenKey]) {
    return;
  }

  item[childrenKey].forEach(n => {
    removedValue = removedValue.concat(remove(value, v => v === n[valueKey]));
    if (n[childrenKey]) {
      removeAllChildrenValue(value, n, itemKeys);
    }
  });
  return removedValue;
};
