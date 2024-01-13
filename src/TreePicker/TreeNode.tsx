import React, { forwardRef } from 'react';
import hasClass from 'dom-lib/hasClass';
import ArrowDown from '@rsuite/icons/legacy/ArrowDown';
import Spinner from '@rsuite/icons/legacy/Spinner';
import { useClassNames, useEventCallback } from '../utils';
import { getTreeNodeIndent, stringifyTreeNodeLabel } from '../utils/treeUtils';
import { WithAsProps, RsRefForwardingComponent, ItemDataType } from '../@types/common';

export interface TreeNodeProps extends WithAsProps {
  rtl?: boolean;
  layer: number;
  value?: ItemDataType['value'];
  label?: ItemDataType['label'];
  focus?: boolean;
  loading?: boolean;
  expand?: boolean;
  active?: boolean;
  visible: boolean;
  nodeData: any;
  disabled?: boolean;
  draggable?: boolean;
  dragging?: boolean;
  dragOver?: boolean;
  dragOverTop?: boolean;
  dragOverBottom?: boolean;
  hasChildren?: boolean;
  className?: string;
  classPrefix?: string;
  style?: React.CSSProperties;
  onExpand?: (nodeData: any) => void;
  onSelect?: (nodeData: any, event: React.SyntheticEvent) => void;
  renderTreeIcon?: (nodeData: any) => React.ReactNode;
  renderTreeNode?: (nodeData: any) => React.ReactNode;
  onDragStart?: (data: any, event: React.DragEvent<any>) => void;
  onDragEnter?: (data: any, event: React.DragEvent<any>) => void;
  onDragOver?: (data: any, event: React.DragEvent<any>) => void;
  onDragLeave?: (data: any, event: React.DragEvent<any>) => void;
  onDragEnd?: (data: any, event: React.DragEvent<any>) => void;
  onDrop?: (data: any, event: React.DragEvent<any>) => void;
}

const TreeNode: RsRefForwardingComponent<'div', TreeNodeProps> = forwardRef<
  HTMLDivElement,
  TreeNodeProps
>(
  (
    {
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
    },
    ref
  ) => {
    const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);

    const handleExpand = useEventCallback((event: React.SyntheticEvent) => {
      // stop propagation when using custom loading icon
      event?.nativeEvent?.stopImmediatePropagation?.();
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
      const classes = prefix('expand-icon', 'icon', {
        expanded: expand
      });

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
        <span
          className={prefix('label')}
          title={stringifyTreeNodeLabel(label)}
          data-layer={layer}
          data-key={nodeData?.refKey || ''}
          role="button"
          tabIndex={-1}
          onClick={handleSelect}
        >
          <span className={contentClasses}>
            {renderTreeNode ? renderTreeNode(nodeData) : label}
          </span>
        </span>
      );
    };

    const classes = merge(
      className,
      withClassPrefix({ disabled, active, 'text-muted': disabled, focus })
    );

    const styles = { ...style, ...getTreeNodeIndent(rtl, layer - 1) };

    return visible ? (
      <Component
        role="treeitem"
        {...rest}
        aria-expanded={expand}
        aria-label={label}
        aria-level={layer}
        aria-disabled={disabled}
        aria-selected={active}
        style={styles}
        className={classes}
        ref={ref}
        draggable={draggable}
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
  }
);

TreeNode.displayName = 'TreePickerNode';

export default TreeNode;
