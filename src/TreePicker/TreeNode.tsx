import React from 'react';
import PropTypes from 'prop-types';
import reactToString from '../utils/reactToString';
import { hasClass } from 'dom-lib';
import { TREE_NODE_PADDING, TREE_NODE_ROOT_PADDING } from '../constants';
import { refType, useClassNames } from '../utils';
import Icon from '../Icon/Icon';

export interface TreeNodeProps {
  rtl?: boolean;
  layer: number;
  value?: any;
  label?: any;
  loading?: boolean;
  expand?: boolean;
  active?: boolean;
  visible: boolean;
  nodeData: any;
  disabled?: boolean;
  innerRef?: React.Ref<any>;
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

const TreeNode: React.FC<TreeNodeProps> = ({
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
  innerRef,
  draggable,
  expand,
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
  onRenderTreeNode
}) => {
  const getTitle = () => {
    if (typeof label === 'string') {
      return label;
    } else if (React.isValidElement(label)) {
      const nodes = reactToString(label);
      return nodes.join('');
    }
  };

  const { prefix, merge, rootPrefix } = useClassNames(classPrefix);

  const handleExpand = (event: React.SyntheticEvent<any>) => {
    // 异步加载数据自定义loading图标时，阻止原生冒泡，不触发 document.click
    event?.nativeEvent?.stopImmediatePropagation?.();
    onExpand?.(nodeData);
  };

  const handleSelect = (event: React.SyntheticEvent<any>) => {
    if (disabled) {
      return;
    }

    if (event.target instanceof HTMLElement) {
      if (hasClass(event.target.parentNode, prefix('expand-icon-wrapper'))) {
        return;
      }
    }

    onSelect?.(nodeData, event);
  };

  const handleDragStart = (event: React.DragEvent) => {
    const dragNode = document.getElementById('drag-node');
    if (dragNode) {
      event.dataTransfer.setDragImage(dragNode, 0, 0);
    }
    onDragStart?.(nodeData, event);
  };

  const handleDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onDragEnter?.(nodeData, event);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onDragOver?.(nodeData, event);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.stopPropagation();
    onDragLeave?.(nodeData, event);
  };

  const handleDragEnd = (event: React.DragEvent) => {
    event.stopPropagation();
    onDragEnd?.(nodeData, event);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onDrop?.(nodeData, event);
  };

  const renderIcon = () => {
    const classes = merge(prefix('expand-icon'), {
      [prefix('expanded')]: !!expand
    });

    let expandIcon = <i className={classes} />;
    if (loading) {
      expandIcon = (
        <div className={prefix('loading-icon')}>
          <Icon icon="spinner" spin style={{ verticalAlign: 'middle' }} />
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
    const contentClasses = merge(prefix('label-content'), {
      [prefix('dragging')]: dragging,
      [prefix('drag-over')]: dragOver,
      [prefix('drag-over-top')]: dragOverTop,
      [prefix('drag-over-bottom')]: dragOverBottom
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

  const classes = merge(className, rootPrefix(classPrefix), {
    'text-muted': disabled,
    [prefix('disabled')]: disabled,
    [prefix('active')]: active
  });
  const padding = layer * TREE_NODE_PADDING + TREE_NODE_ROOT_PADDING;
  const styles = {
    ...style,
    [rtl ? 'paddingRight' : 'paddingLeft']: padding
  };

  return visible ? (
    <div
      style={styles}
      className={classes}
      ref={innerRef}
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
    </div>
  ) : null;
};

TreeNode.displayName = 'TreePickerNode';
TreeNode.defaultProps = {
  visible: true,
  classPrefix: 'tree-node'
};
TreeNode.propTypes = {
  rtl: PropTypes.bool,
  layer: PropTypes.number,
  value: PropTypes.any,
  label: PropTypes.any,
  expand: PropTypes.bool,
  active: PropTypes.bool,
  loading: PropTypes.bool,
  visible: PropTypes.bool,
  nodeData: PropTypes.any,
  disabled: PropTypes.bool,
  innerRef: refType,
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
