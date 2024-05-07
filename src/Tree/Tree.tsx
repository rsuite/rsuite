import React from 'react';
import { RsRefForwardingComponent } from '../@types/common';
import TreeView, { type TreeViewProps } from './TreeView';
import { useControlled, useEventCallback } from '../utils';
import useFlattenTree from './hooks/useFlattenTree';
import useTreeWithChildren from './hooks/useTreeWithChildren';
import useExpandTree from './hooks/useExpandTree';
import type { TreeExtraProps } from './types';

export interface TreeProps<T = string | number | null> extends TreeViewProps<T>, TreeExtraProps {
  /** Default selected Value  */
  defaultValue?: T;
}

/**
 * The `Tree` component is used to display hierarchical data.
 *
 * @see https://rsuitejs.com/components/tree
 */
const Tree: RsRefForwardingComponent<'div', TreeProps> = React.forwardRef(
  (props: TreeProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      value: controlledValue,
      defaultValue,
      childrenKey = 'children',
      labelKey = 'label',
      valueKey = 'value',
      data,
      defaultExpandAll = false,
      defaultExpandItemValues = [],
      expandItemValues: controlledExpandItemValues,
      getChildren,
      onChange,
      onExpand,
      ...rest
    } = props;

    const [value, setValue] = useControlled(controlledValue, defaultValue);
    const itemDataKeys = { childrenKey, labelKey, valueKey };

    const { treeData, loadingNodeValues, appendChild } = useTreeWithChildren(data, itemDataKeys);
    const flattenedNodes = useFlattenTree(treeData, {
      ...itemDataKeys
    });

    const { expandItemValues, handleExpandTreeNode } = useExpandTree(data, {
      ...itemDataKeys,
      defaultExpandAll,
      defaultExpandItemValues,
      controlledExpandItemValues,
      onExpand,
      getChildren,
      appendChild
    });

    const handleChange = useEventCallback(
      (nextValue: string | number, event: React.SyntheticEvent) => {
        setValue(nextValue);
        onChange?.(nextValue, event);
      }
    );

    return (
      <TreeView
        ref={ref}
        {...rest}
        value={value}
        childrenKey={childrenKey}
        labelKey={labelKey}
        valueKey={valueKey}
        data={treeData}
        loadingNodeValues={loadingNodeValues}
        flattenedNodes={flattenedNodes}
        expandItemValues={expandItemValues}
        onChange={handleChange}
        onExpand={handleExpandTreeNode}
      />
    );
  }
);

Tree.displayName = 'Tree';

export default Tree;
