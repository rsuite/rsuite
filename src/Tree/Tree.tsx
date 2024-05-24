import React, { useMemo } from 'react';
import { RsRefForwardingComponent } from '@/internals/types';
import TreeView, { type TreeViewProps } from './TreeView';
import { useControlled, useEventCallback } from '@/internals/hooks';
import { TreeProvider } from '@/internals/Tree/TreeProvider';
import useFlattenTree from './hooks/useFlattenTree';
import useTreeWithChildren from './hooks/useTreeWithChildren';
import useExpandTree from './hooks/useExpandTree';
import type { TreeExtraProps } from './types';

export interface TreeProps<T = string | number | null> extends TreeViewProps<T>, TreeExtraProps {
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
      virtualized,
      scrollShadow,
      renderTreeIcon,
      renderTreeNode,
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

    const treeContext = useMemo(
      () => ({
        props: {
          childrenKey,
          labelKey,
          valueKey,
          virtualized,
          scrollShadow,
          renderTreeIcon,
          renderTreeNode
        }
      }),
      [childrenKey, labelKey, valueKey, scrollShadow, virtualized, renderTreeIcon, renderTreeNode]
    );

    return (
      <TreeProvider value={treeContext}>
        <TreeView
          ref={ref}
          {...rest}
          value={value}
          data={treeData}
          loadingNodeValues={loadingNodeValues}
          flattenedNodes={flattenedNodes}
          expandItemValues={expandItemValues}
          onChange={handleChange}
          onExpand={handleExpandTreeNode}
        />
      </TreeProvider>
    );
  }
);

Tree.displayName = 'Tree';

export default Tree;
