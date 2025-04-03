import React, { useMemo } from 'react';
import useTreeValue from './hooks/useTreeValue';
import CheckTreeView, { type CheckTreeViewProps } from './CheckTreeView';
import useFlattenTree from '../Tree/hooks/useFlattenTree';
import useTreeWithChildren from '../Tree/hooks/useTreeWithChildren';
import useExpandTree from '../Tree/hooks/useExpandTree';
import { forwardRef } from '@/internals/utils';
import { useEventCallback } from '@/internals/hooks';
import { TreeProvider } from '@/internals/Tree/TreeProvider';
import { useCustom } from '../CustomProvider';
import type { TreeExtraProps } from '../Tree/types';

export type ValueType = (string | number)[];
export interface CheckTreeProps<T = ValueType> extends CheckTreeViewProps<T>, TreeExtraProps {
  /**
   * Default selected Value
   */
  defaultValue?: T;

  /**
   * The shadow of the content when scrolling
   */
  scrollShadow?: boolean;
}

/**
 * The `CheckTree` component is used for selecting multiple options which are organized in a tree structure.
 * @see https://rsuitejs.com/components/check-tree
 */
const CheckTree = forwardRef<'div', CheckTreeProps>((props, ref: React.Ref<HTMLDivElement>) => {
  const { propsWithDefaults } = useCustom('CheckTree', props);
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
    scrollShadow,
    renderTreeIcon,
    renderTreeNode,
    getChildren,
    onExpand,
    onChange,
    ...rest
  } = propsWithDefaults;

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
      props: {
        labelKey,
        valueKey,
        childrenKey,
        virtualized,
        scrollShadow,
        renderTreeIcon,
        renderTreeNode
      }
    }),
    [childrenKey, labelKey, valueKey, virtualized, scrollShadow, renderTreeIcon, renderTreeNode]
  );

  return (
    <TreeProvider value={treeContext}>
      <CheckTreeView
        {...rest}
        ref={ref}
        value={value}
        cascade={cascade}
        data={treeData}
        loadingNodeValues={loadingNodeValues}
        flattenedNodes={flattenedNodes}
        uncheckableItemValues={uncheckableItemValues}
        expandItemValues={expandItemValues}
        onChange={handleChange}
        onExpand={handleExpandTreeNode}
      />
    </TreeProvider>
  );
});

CheckTree.displayName = 'CheckTree';

export default CheckTree;
