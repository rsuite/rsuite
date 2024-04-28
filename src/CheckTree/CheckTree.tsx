import React from 'react';
import { useEventCallback } from '../utils';
import useTreeValue from './hooks/useTreeValue';
import CheckTreeView, { type CheckTreeViewProps } from './CheckTreeView';
import useFlattenTree from '../Tree/hooks/useFlattenTree';
import useTreeWithChildren from '../Tree/hooks/useTreeWithChildren';
import type { RsRefForwardingComponent } from '../@types/common';

export type ValueType = (string | number)[];
export interface CheckTreeProps<T = ValueType> extends CheckTreeViewProps<T> {
  /**
   * Default selected Value
   */
  defaultValue?: T;
}

/**
 * The `CheckTree` component is used for selecting multiple options which are organized in a tree structure.
 * @see https://rsuitejs.com/components/check-tree
 */
const CheckTree: RsRefForwardingComponent<'div', CheckTreeProps> = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const {
      value: controlledValue,
      defaultValue,
      uncheckableItemValues,
      childrenKey = 'children',
      labelKey = 'label',
      valueKey = 'value',
      cascade = true,
      data,
      onChange,
      ...rest
    } = props;

    const [value, setValue] = useTreeValue(controlledValue, {
      defaultValue,
      uncheckableItemValues
    });

    const itemDataKeys = { childrenKey, labelKey, valueKey };
    const { treeData, loadingNodeValues, appendChild } = useTreeWithChildren(data, itemDataKeys);

    const flattenedNodes = useFlattenTree(treeData, {
      ...itemDataKeys,
      cascade,
      uncheckableItemValues
    });

    const handleChange = useEventCallback((nextValue: ValueType, event: React.SyntheticEvent) => {
      setValue(nextValue);
      onChange?.(nextValue, event);
    });

    return (
      <CheckTreeView
        {...rest}
        ref={ref}
        value={value}
        cascade={cascade}
        childrenKey={childrenKey}
        labelKey={labelKey}
        valueKey={valueKey}
        data={treeData}
        loadingNodeValues={loadingNodeValues}
        appendChild={appendChild}
        flattenedNodes={flattenedNodes}
        uncheckableItemValues={uncheckableItemValues}
        onChange={handleChange}
      />
    );
  }
);

CheckTree.displayName = 'CheckTree';

export default CheckTree;
