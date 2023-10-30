import { useState, useEffect, useCallback } from 'react';
import uniq from 'lodash/uniq';
import remove from 'lodash/remove';
import slice from 'lodash/slice';
import { MultiCascaderProps, ValueType } from './MultiCascader';
import { ItemDataType } from '../@types/common';
import { UNSAFE_flattenTree } from '../utils/treeUtils';
import { attachParent } from '../utils/attachParent';

export interface ItemType extends ItemDataType {
  parent?: ItemType;
}

interface ItemKeys {
  valueKey: string;
  labelKey: string;
  childrenKey: string;
}

type MayHasParent<T extends Record<string, unknown>> = T & {
  parent?: MayHasParent<T>;
};

/**
 * Get all parents of a node
 * @param node
 */
export const getParents = <T extends Record<string, unknown>>(node: MayHasParent<T>) => {
  let parents: MayHasParent<T>[] = [];

  if (!node.parent) {
    return parents;
  }

  parents.push(node.parent);
  parents = parents.concat(getParents(node.parent));

  return parents;
};

/**
 * Check if any child nodes are selected.
 * @param node
 * @param value
 * @param itemKeys
 */
export const isSomeChildChecked = <T extends Record<string, unknown>>(
  node: T,
  value: ValueType,
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
  value: ValueType,
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

/**
 * A hook to flatten tree structure data
 * @param data
 */
export function useFlattenData<T>(data: T[], itemKeys: ItemKeys) {
  const { childrenKey } = itemKeys;
  const [flattenData, setFlattenData] = useState<T[]>(
    UNSAFE_flattenTree(data, itemKeys.childrenKey)
  );

  const addFlattenData = useCallback(
    (children: T[], parent: T) => {
      const nodes = children.map(child => {
        return attachParent(child, parent);
      });

      parent[childrenKey] = nodes;

      setFlattenData([...flattenData, ...nodes]);
    },
    [childrenKey, flattenData]
  );

  useEffect(() => {
    setFlattenData(UNSAFE_flattenTree(data, itemKeys.childrenKey));
  }, [data, itemKeys.childrenKey]);

  return { addFlattenData, flattenData };
}

/**
 * A hook for column data
 * @param flattenData
 */
export function useColumnData<T extends MayHasParent<Record<string, unknown>>>(flattenData: T[]) {
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

/**
 * A hook that converts the value into a cascading value
 * @param props
 * @param flattenData
 */
export function useCascadeValue<T>(
  props: Partial<MultiCascaderProps<T[]>> & ItemKeys,
  flattenData: ItemType[]
) {
  const { valueKey, childrenKey, uncheckableItemValues, cascade, value: valueProp } = props;

  /**
   * Get the values of all children
   */
  const getChildrenValue = useCallback(
    (item: ItemType) => {
      let values: T[] = [];

      if (!item[childrenKey]) {
        return values;
      }

      item[childrenKey].forEach(n => {
        if (uncheckableItemValues && !uncheckableItemValues.some(v => v === n[valueKey])) {
          values.push(n[valueKey]);
        }
        values = values.concat(getChildrenValue(n));
      });

      return values;
    },
    [childrenKey, uncheckableItemValues, valueKey]
  );

  const splitValue = useCallback(
    (item: ItemType, checked: boolean, value: T[]) => {
      const itemValue = item[valueKey];
      const childrenValue = getChildrenValue(item);
      const parents = getParents(item);

      let nextValue = [...value];
      let removedValue: T[] = [];

      if (checked) {
        nextValue.push(itemValue);

        // Delete all values under the current node
        removedValue = removedValue.concat(
          removeAllChildrenValue(nextValue, item, { valueKey, childrenKey }) || []
        );

        // Traverse all ancestor nodes of the current node
        // Then determine whether all the child nodes of these nodes are selected, and then they themselves must be selected
        for (let i = 0; i < parents.length; i++) {
          // Whether the parent node can be selected
          const isCheckableParent = !uncheckableItemValues?.some(v => v === parents[i][valueKey]);

          if (isCheckableParent) {
            const isCheckAll = parents[i][childrenKey]
              // Filter out options that are marked as not selectable
              .filter(n => !uncheckableItemValues?.some(v => v === n[valueKey]))
              // Check if all nodes are selected
              .every(n => nextValue.some(v => v === n[valueKey]));

            if (isCheckAll) {
              // Add parent node value
              nextValue.push(parents[i][valueKey]);

              // Delete all values under the parent node
              removedValue = removedValue.concat(
                removeAllChildrenValue(nextValue, parents[i], { valueKey, childrenKey }) || []
              );
            }
          }
        }
      } else {
        const tempValue = childrenValue.concat(parents.map(item => item[valueKey]));

        nextValue = nextValue.concat(
          getOtherItemValuesByUnselectChild(item, nextValue, { valueKey, childrenKey })
        );

        // Delete related child and parent nodes
        removedValue = remove(nextValue, v => {
          // Delete yourself
          if (v === itemValue) {
            return true;
          }
          return tempValue.some(n => n === v);
        });
      }

      const uniqValue: T[] = uniq(nextValue);
      const uniqRemovedValue: T[] = uniq(removedValue);

      return {
        value: uniqValue,
        removedValue: uniqRemovedValue
      };
    },
    [valueKey, childrenKey, uncheckableItemValues, getChildrenValue]
  );

  const transformValue = useCallback(
    (value: T[] = []) => {
      if (!cascade) {
        return value;
      }

      let tempRemovedValue: T[] = [];
      let nextValue: T[] = [];

      for (let i = 0; i < value.length; i++) {
        // If the value in the current value is already in the deleted list, it will not be processed
        if (tempRemovedValue.some(v => v === value[i])) {
          continue;
        }

        const item: ItemType | undefined = flattenData.find(v => v[valueKey] === value[i]);
        if (!item) {
          continue;
        }
        const sv = splitValue(item, true, value);
        tempRemovedValue = uniq(tempRemovedValue.concat(sv.removedValue));

        // Get all relevant values
        nextValue = uniq(nextValue.concat(sv.value));
      }

      // Finally traverse all nextValue, and delete if its parent node is also nextValue
      return nextValue.filter(v => {
        const item = flattenData.find(n => n[valueKey] === v);
        if (item?.parent && nextValue.some(v => v === item.parent && item.parent[valueKey])) {
          return false;
        }
        return true;
      });
    },
    [cascade, flattenData, splitValue, valueKey]
  );

  const [value, setValue] = useState<T[]>(transformValue(valueProp) || []);

  useEffect(() => {
    // Update value when valueProp is updated.
    setValue(transformValue(valueProp) || []);
  }, [transformValue, valueProp]);

  return {
    value,
    setValue,
    splitValue
  };
}
