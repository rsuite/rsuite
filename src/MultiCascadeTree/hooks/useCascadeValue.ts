import { useState, useEffect, useCallback } from 'react';
import uniq from 'lodash/uniq';
import remove from 'lodash/remove';
import { MultiCascadeTreeProps, ItemKeys } from '../types';
import { useEventCallback } from '@/internals/hooks';
import { ItemDataType } from '@/internals/types';
import {
  MayHasParent,
  removeAllChildrenValue,
  getOtherItemValuesByUnselectChild,
  type ItemType
} from '../utils';

/**
 * Get all parents of a node
 * @param node
 */
const getParents = <T extends Record<string, unknown>>(node: MayHasParent<T>) => {
  let parents: MayHasParent<T>[] = [];

  if (!node.parent) {
    return parents;
  }

  parents.push(node.parent);
  parents = parents.concat(getParents(node.parent));

  return parents;
};

/**
 * A hook that converts the value into a cascading value
 * @param props
 * @param flattenData
 */
function useCascadeValue<T>(
  props: Partial<MultiCascadeTreeProps<T>> & ItemKeys,
  flattenData: ItemType<T>[]
) {
  const {
    valueKey,
    childrenKey,
    uncheckableItemValues,
    cascade,
    value: valueProp,
    onChange,
    onCheck
  } = props;

  /**
   * Get the values of all children
   */
  const getChildrenValue = useCallback(
    (item: ItemType<T>) => {
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
    (item: ItemType<T>, checked: boolean, value: T[]) => {
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

        const item: ItemType<T> | undefined = flattenData.find(v => v[valueKey] === value[i]);
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
        if (item?.parent && nextValue.some(v => v === item.parent?.[valueKey])) {
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

  const handleCheck = useEventCallback(
    (node: ItemDataType<T>, event: React.SyntheticEvent, checked: boolean) => {
      const nodeValue = node[valueKey];
      let nextValue: T[] = [];

      if (cascade) {
        nextValue = splitValue(node, checked, value).value;
      } else {
        nextValue = [...value];
        if (checked) {
          nextValue.push(nodeValue);
        } else {
          nextValue = nextValue.filter(n => n !== nodeValue);
        }
      }

      setValue(nextValue);
      onChange?.(nextValue, event);
      onCheck?.(nextValue, node, checked, event);
    }
  );

  return {
    value,
    setValue,
    splitValue,
    handleCheck
  };
}

export default useCascadeValue;
