import React, { useMemo } from 'react';
import { useEventCallback } from '@/internals/hooks';
import useTreeValue from './hooks/useTreeValue';
import CheckTreeView, { type CheckTreeViewProps } from './CheckTreeView';
import useFlattenTree from '../Tree/hooks/useFlattenTree';
import useTreeWithChildren from '../Tree/hooks/useTreeWithChildren';
import useExpandTree from '../Tree/hooks/useExpandTree';
import { TreeProvider } from '../Tree/TreeProvider';
import type { RsRefForwardingComponent } from '@/internals/types';
import type { TreeExtraProps } from '../Tree/types';

export type ValueType = (string | number)[];
export interface CheckTreeProps<T = ValueType> extends CheckTreeViewProps<T>, TreeExtraProps {
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
      data,
      defaultValue,
      defaultExpandAll = false,
      defaultExpandItemValues = [],
      uncheckableItemValues,
      expandItemValues: controlledExpandItemValues,
      childrenKey = 'children',
      labelKey = 'label',
      valueKey = 'value',
      virtualized,
      cascade = true,
      renderTreeIcon,
      renderTreeNode,
      getChildren,
      onExpand,
      onChange,
      ...rest
    } = props;

    const [value, setValue] = useTreeValue(controlledValue, {
      defaultValue,
      uncheckableItemValues
    });

    const itemDataKeys = { childrenKey, labelKey, valueKey };
    const { treeData, loadingNodeValues, appendChild } = useTreeWithChildren(data, itemDataKeys);

    const { expandItemValues, handleExpandTreeNode } = useExpandTree(data, {
      ...itemDataKeys,
      defaultExpandAll,
      defaultExpandItemValues,
      controlledExpandItemValues,
      onExpand,
      getChildren,
      appendChild
    });

    const flattenedNodes = useFlattenTree(treeData, {
      ...itemDataKeys,
      uncheckableItemValues,
      multiple: true,
      cascade,
      value
    });

    const handleChange = useEventCallback((nextValue: ValueType, event: React.SyntheticEvent) => {
      setValue(nextValue);
      onChange?.(nextValue, event);
    });

    const treeContext = useMemo(
      () => ({
        props: { labelKey, valueKey, childrenKey, virtualized, renderTreeIcon, renderTreeNode }
      }),
      [childrenKey, labelKey, valueKey, virtualized, renderTreeIcon, renderTreeNode]
    );

    return (
      <TreeProvider value={treeContext}>
        <CheckTreeView
          {...rest}
          ref={ref}
          value={value}
          cascade={cascade}
          data={treeData}
          virtualized={virtualized}
          loadingNodeValues={loadingNodeValues}
          flattenedNodes={flattenedNodes}
          uncheckableItemValues={uncheckableItemValues}
          expandItemValues={expandItemValues}
          onChange={handleChange}
          onExpand={handleExpandTreeNode}
        />
      </TreeProvider>
    );
  }
);

CheckTree.displayName = 'CheckTree';

export default CheckTree;
