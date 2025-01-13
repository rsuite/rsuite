import React, { useMemo } from 'react';
import TreeNodeToggle from './TreeNodeToggle';
import { forwardRef, mergeRefs, stringifyReactNode } from '@/internals/utils';
import { useFocusVirtualListItem, useClassNames, useEventCallback } from '@/internals/hooks';
import { useTreeContextProps } from '@/internals/Tree/TreeProvider';
import { indentTreeNode } from './utils';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';
import type { TreeNode as TreeNodeData } from '@/internals/Tree/types';

export type DragStatus = 'drag-over' | 'drag-over-top' | 'drag-over-bottom';

interface TreeDragEventProps {
  /**
   * Callback function called when the drag operation starts.
   */
  onDragStart?: (nodeData: TreeNodeData, event: React.DragEvent<any>) => void;
  /**
   * Callback function called when a dragged item enters the node.
   */
  onDragEnter?: (nodeData: TreeNodeData, event: React.DragEvent<any>) => void;
  /**
   * Callback function called when a dragged item is over the node.
   */
  onDragOver?: (nodeData: TreeNodeData, event: React.DragEvent<any>) => void;
  /**
   * Callback function called when a dragged item leaves the node.
   */
  onDragLeave?: (nodeData: TreeNodeData, event: React.DragEvent<any>) => void;
  /**
   * Callback function called when the drag operation ends.
   */
  onDragEnd?: (nodeData: TreeNodeData, event: React.DragEvent<any>) => void;
  /**
   * Callback function called when a dragged item is dropped on the node.
   */
  onDrop?: (nodeData: TreeNodeData, event: React.DragEvent<any>) => void;
}

/**
 * Props for the TreeNode component.
 */
export interface TreeNodeProps extends WithAsProps, TreeDragEventProps {
  /**
   * The layer of the node in the tree hierarchy.
   */
  layer: number;
  /**
   * The value of the node.
   */
  value?: TreeNodeData['value'];
  /**
   * The label of the node.
   */
  label?: TreeNodeData['label'];
  /**
   * Whether the node should be focused.
   */
  focus?: boolean;
  /**
   * Whether the node is in a loading state.
   */
  loading?: boolean;
  /**
   * Whether the node is expanded.
   */
  expanded?: boolean;
  /**
   * Whether the node is active.
   */
  active?: boolean;
  /**
   * Whether the node is visible.
   */
  visible: boolean;
  /**
   * The data associated with the node.
   */
  nodeData: any;
  /**
   * Whether the node is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the node is draggable.
   */
  draggable?: boolean;
  /**
   * Whether the node is being dragged.
   */
  dragging?: boolean;

  /**
   * Drag status of the node.
   */
  dragStatus?: DragStatus;

  /**
   * Whether the node has children.
   */
  hasChildren?: boolean;

  /**
   * Callback function called when the node is expanded.
   */
  onExpand?: (nodeData: TreeNodeData, expanded?: boolean) => void;
  /**
   * Callback function called when the node is selected.
   */
  onSelect?: (nodeData: TreeNodeData, event: React.SyntheticEvent) => void;
}

const TreeNode = forwardRef<'div', TreeNodeProps>((props, ref) => {
  const {
    as: Component = 'div',
    label,
    layer,
    active,
    loading,
    nodeData,
    className,
    classPrefix = 'tree-node',
    disabled,
    visible = true,
    draggable,
    expanded,
    focus,
    style,
    hasChildren,
    dragging,
    dragStatus,
    onSelect,
    onDragStart,
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDragEnd,
    onDrop,
    onExpand,
    ...rest
  } = props;

  const { rtl } = useCustom();
  const { renderTreeNode, virtualized } = useTreeContextProps();
  const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);
  const labelStr = useMemo(() => stringifyReactNode(label), [label]);

  const handleExpand = useEventCallback((event: React.SyntheticEvent) => {
    // Stop propagation when using custom loading icon
    event?.nativeEvent?.stopImmediatePropagation?.();
    event.stopPropagation();
    onExpand?.(nodeData, expanded);
  });

  const handleSelect = useEventCallback((event: React.SyntheticEvent) => {
    if (disabled) {
      return;
    }

    onSelect?.(nodeData, event);
  });

  const handleDragStart = useEventCallback((event: React.DragEvent) => {
    onDragStart?.(nodeData, event);
  });

  const handleDragEnter = useEventCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onDragEnter?.(nodeData, event);
  });

  const handleDragOver = useEventCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onDragOver?.(nodeData, event);
  });

  const handleDragLeave = useEventCallback((event: React.DragEvent) => {
    event.stopPropagation();
    onDragLeave?.(nodeData, event);
  });

  const handleDragEnd = useEventCallback((event: React.DragEvent) => {
    event.stopPropagation();
    onDragEnd?.(nodeData, event);
  });

  const handleDrop = useEventCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onDrop?.(nodeData, event);
  });

  const classes = merge(
    className,
    withClassPrefix({ disabled, active, 'text-muted': disabled, focus })
  );

  const treeItemRef = useFocusVirtualListItem<HTMLDivElement>(focus);
  const styles = virtualized ? { ...style, ...indentTreeNode(rtl, layer - 1) } : style;

  return visible ? (
    <Component
      {...rest}
      ref={mergeRefs(treeItemRef, ref)}
      role="treeitem"
      tabIndex={-1}
      aria-expanded={expanded}
      aria-label={labelStr}
      aria-level={layer}
      aria-disabled={disabled}
      aria-selected={active}
      data-layer={layer}
      data-key={nodeData?.refKey || ''}
      title={labelStr}
      className={classes}
      style={styles}
      draggable={draggable}
      onClick={handleSelect}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
    >
      <TreeNodeToggle
        aria-label={(expanded ? 'Collapse' : 'Expand') + ` ${labelStr}`}
        data={nodeData}
        loading={loading}
        expanded={expanded}
        hasChildren={hasChildren}
        onClick={handleExpand}
      />
      <span className={prefix('label', dragStatus, { dragging })}>
        {renderTreeNode ? renderTreeNode(nodeData) : label}
      </span>
    </Component>
  ) : null;
});

TreeNode.displayName = 'TreeNode';

export default TreeNode;
