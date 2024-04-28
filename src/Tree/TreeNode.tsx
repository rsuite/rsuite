import React, { forwardRef, useMemo } from 'react';
import hasClass from 'dom-lib/hasClass';
import ArrowDown from '@rsuite/icons/legacy/ArrowDown';
import Spinner from '@rsuite/icons/legacy/Spinner';
import { useClassNames, useEventCallback } from '../utils';
import { indentTreeNode } from '../Tree/utils';
import { stringifyReactNode } from '../internals/utils';
import { WithAsProps, RsRefForwardingComponent, ItemDataType } from '../@types/common';

/**
 * Props for the TreeNode component.
 */
export interface TreeNodeProps extends WithAsProps {
  /**
   * Whether the component should be rendered in right-to-left mode.
   */
  rtl?: boolean;
  /**
   * The layer of the node in the tree hierarchy.
   */
  layer: number;
  /**
   * The value of the node.
   */
  value?: ItemDataType['value'];
  /**
   * The label of the node.
   */
  label?: ItemDataType['label'];
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
  expand?: boolean;
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
   * Whether the node is being dragged over.
   */
  dragOver?: boolean;
  /**
   * Whether the node is being dragged over the top.
   */
  dragOverTop?: boolean;
  /**
   * Whether the node is being dragged over the bottom.
   */
  dragOverBottom?: boolean;
  /**
   * Whether the node has children.
   */
  hasChildren?: boolean;
  /**
   * The CSS class name for the component.
   */
  className?: string;
  /**
   * The prefix for the CSS class names of the component.
   */
  classPrefix?: string;
  /**
   * The inline style for the component.
   */
  style?: React.CSSProperties;
  /**
   * Callback function called when the node is expanded.
   */
  onExpand?: (nodeData: any) => void;
  /**
   * Callback function called when the node is selected.
   */
  onSelect?: (nodeData: any, event: React.SyntheticEvent) => void;
  /**
   * Function that renders the tree icon for the node.
   */
  renderTreeIcon?: (nodeData: any) => React.ReactNode;
  /**
   * Function that renders the content of the node.
   */
  renderTreeNode?: (nodeData: any) => React.ReactNode;
  /**
   * Callback function called when the drag operation starts.
   */
  onDragStart?: (data: any, event: React.DragEvent<any>) => void;
  /**
   * Callback function called when a dragged item enters the node.
   */
  onDragEnter?: (data: any, event: React.DragEvent<any>) => void;
  /**
   * Callback function called when a dragged item is over the node.
   */
  onDragOver?: (data: any, event: React.DragEvent<any>) => void;
  /**
   * Callback function called when a dragged item leaves the node.
   */
  onDragLeave?: (data: any, event: React.DragEvent<any>) => void;
  /**
   * Callback function called when the drag operation ends.
   */
  onDragEnd?: (data: any, event: React.DragEvent<any>) => void;
  /**
   * Callback function called when a dragged item is dropped on the node.
   */
  onDrop?: (data: any, event: React.DragEvent<any>) => void;
}

const TreeNode: RsRefForwardingComponent<'div', TreeNodeProps> = forwardRef<
  HTMLDivElement,
  TreeNodeProps
>((props, ref) => {
  const {
    as: Component = 'div',
    rtl,
    label,
    layer,
    style,
    active,
    loading,
    nodeData,
    className,
    classPrefix = 'tree-node',
    disabled,
    visible = true,
    draggable,
    expand,
    focus,
    hasChildren,
    dragging,
    dragOver,
    dragOverTop,
    dragOverBottom,
    onSelect,
    onDragStart,
    onDragOver,
    onDragEnter,
    onDragLeave,
    onDragEnd,
    onDrop,
    onExpand,
    renderTreeIcon,
    renderTreeNode,
    ...rest
  } = props;

  const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);
  const labelStr = useMemo(() => stringifyReactNode(label), [label]);

  const handleExpand = useEventCallback((event: React.SyntheticEvent) => {
    // stop propagation when using custom loading icon
    event?.nativeEvent?.stopImmediatePropagation?.();
    event.stopPropagation();
    onExpand?.(nodeData);
  });

  const handleSelect = useEventCallback((event: React.SyntheticEvent) => {
    if (disabled) {
      return;
    }

    if (event.target instanceof HTMLElement) {
      if (hasClass(event.target.parentNode as HTMLElement, prefix('expand-icon-wrapper'))) {
        return;
      }
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

  const renderIcon = () => {
    const classes = prefix('expand-icon', 'icon', { expanded: expand });

    let expandIcon = <ArrowDown className={classes} />;
    if (loading) {
      expandIcon = (
        <div className={prefix('loading-icon')}>
          <Spinner spin />
        </div>
      );
    }
    if (nodeData !== undefined && typeof renderTreeIcon === 'function') {
      const customIcon = renderTreeIcon(nodeData);
      expandIcon =
        customIcon !== null ? (
          <div className={prefix('custom-icon')}>{customIcon}</div>
        ) : (
          expandIcon
        );
    }

    return hasChildren ? (
      <div
        role="button"
        aria-label={(expand ? 'Collapse' : 'Expand') + ` ${labelStr}`}
        tabIndex={-1}
        data-ref={nodeData.refKey}
        className={prefix('expand-icon-wrapper')}
        onClick={handleExpand}
      >
        {expandIcon}
      </div>
    ) : null;
  };

  const renderLabel = () => {
    const contentClasses = prefix('label-content', {
      dragging,
      'drag-over': dragOver,
      'drag-over-top': dragOverTop,
      'drag-over-bottom': dragOverBottom
    });
    return (
      <span className={prefix('label')}>
        <span className={contentClasses}>{renderTreeNode ? renderTreeNode(nodeData) : label}</span>
      </span>
    );
  };

  const classes = merge(
    className,
    withClassPrefix({ disabled, active, 'text-muted': disabled, focus })
  );

  const styles = { ...style, ...indentTreeNode(rtl, layer - 1) };

  return visible ? (
    <Component
      role="treeitem"
      tabIndex={-1}
      {...rest}
      aria-expanded={expand}
      aria-label={labelStr}
      aria-level={layer}
      aria-disabled={disabled}
      aria-selected={active}
      title={labelStr}
      style={styles}
      className={classes}
      ref={ref}
      draggable={draggable}
      data-layer={layer}
      data-key={nodeData?.refKey || ''}
      onClick={handleSelect}
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
    >
      {renderIcon()}
      {renderLabel()}
    </Component>
  ) : null;
});

TreeNode.displayName = 'TreeNode';

export default TreeNode;
