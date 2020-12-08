import React, { forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { hasClass } from 'dom-lib';
import ArrowDown from '@rsuite/icons/legacy/ArrowDown';
import Spinner from '@rsuite/icons/legacy/Spinner';

import reactToString from '../utils/reactToString';
import { useClassNames, TREE_NODE_PADDING, TREE_NODE_ROOT_PADDING } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface TreeNodeProps extends WithAsProps {
  rtl?: boolean;
  layer: number;
  value?: any;
  label?: any;
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
  onSelect?: (nodeData: any, event: React.SyntheticEvent<any>) => void;
  onRenderTreeIcon?: (nodeData: any) => React.ReactNode;
  onRenderTreeNode?: (nodeData: any) => React.ReactNode;
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
      classPrefix,
      disabled,
      visible,
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
      onRenderTreeIcon,
      onRenderTreeNode,
      ...rest
    },
    ref
  ) => {
    const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);

    const getTitle = useCallback(() => {
      if (typeof label === 'string') {
        return label;
      } else if (React.isValidElement(label)) {
        const nodes = reactToString(label);
        return nodes.join('');
      }
    }, [label]);

    const handleExpand = useCallback(
      (event: React.SyntheticEvent<any>) => {
        // stop propagation when using custom loading icon
        event?.nativeEvent?.stopImmediatePropagation?.();
        onExpand?.(nodeData);
      },
      [nodeData, onExpand]
    );

    const handleSelect = useCallback(
      (event: React.SyntheticEvent<any>) => {
        if (disabled) {
          return;
        }

        if (event.target instanceof HTMLElement) {
          if (hasClass(event.target.parentNode, prefix('expand-icon-wrapper'))) {
            return;
          }
        }

        onSelect?.(nodeData, event);
      },
      [nodeData, disabled, prefix, onSelect]
    );

    const handleDragStart = useCallback(
      (event: React.DragEvent) => {
        const dragNode = document.getElementById('drag-node');
        if (dragNode) {
          event.dataTransfer.setDragImage(dragNode, 0, 0);
        }
        onDragStart?.(nodeData, event);
      },
      [nodeData, onDragStart]
    );

    const handleDragEnter = useCallback(
      (event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        onDragEnter?.(nodeData, event);
      },
      [nodeData, onDragEnter]
    );

    const handleDragOver = useCallback(
      (event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        onDragOver?.(nodeData, event);
      },
      [nodeData, onDragOver]
    );

    const handleDragLeave = useCallback(
      (event: React.DragEvent) => {
        event.stopPropagation();
        onDragLeave?.(nodeData, event);
      },
      [nodeData, onDragLeave]
    );

    const handleDragEnd = useCallback(
      (event: React.DragEvent) => {
        event.stopPropagation();
        onDragEnd?.(nodeData, event);
      },
      [nodeData, onDragEnd]
    );

    const handleDrop = useCallback(
      (event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        onDrop?.(nodeData, event);
      },
      [nodeData, onDrop]
    );

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
      if (nodeData !== undefined && typeof onRenderTreeIcon === 'function') {
        const customIcon = onRenderTreeIcon(nodeData);
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
          title={getTitle()}
          data-layer={layer}
          data-key={nodeData?.refKey || ''}
          role="button"
          tabIndex={-1}
          onClick={handleSelect}
        >
          <span className={contentClasses}>
            {onRenderTreeNode ? onRenderTreeNode(nodeData) : label}
          </span>
        </span>
      );
    };

    const classes = merge(
      className,
      withClassPrefix({ disabled, active, 'text-muted': disabled, focus })
    );

    // layer start from 1
    const padding = (layer - 1) * TREE_NODE_PADDING + TREE_NODE_ROOT_PADDING;
    const styles = {
      ...style,
      [rtl ? 'paddingRight' : 'paddingLeft']: padding
    };

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
TreeNode.defaultProps = {
  visible: true,
  classPrefix: 'tree-node'
};
TreeNode.propTypes = {
  as: PropTypes.elementType,
  rtl: PropTypes.bool,
  focus: PropTypes.bool,
  layer: PropTypes.number,
  value: PropTypes.any,
  label: PropTypes.any,
  expand: PropTypes.bool,
  active: PropTypes.bool,
  loading: PropTypes.bool,
  visible: PropTypes.bool,
  nodeData: PropTypes.any,
  disabled: PropTypes.bool,
  draggable: PropTypes.bool,
  dragging: PropTypes.bool,
  dragOver: PropTypes.bool,
  dragOverTop: PropTypes.bool,
  dragOverBottom: PropTypes.bool,
  hasChildren: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  style: PropTypes.object,
  onExpand: PropTypes.func,
  onSelect: PropTypes.func,
  onRenderTreeIcon: PropTypes.func,
  onRenderTreeNode: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnter: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDrop: PropTypes.func
};

export default TreeNode;
