import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import reactToString from '../utils/reactToString';
import { hasClass } from 'dom-lib';
import { TREE_NODE_PADDING, TREE_NODE_ROOT_PADDING } from '../constants';
import { defaultProps, prefix, refType } from '../utils';

export interface TreeNodeProps {
  rtl?: boolean;
  layer: number;
  value?: any;
  label?: any;
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
  innerRef?: React.Ref<any>;
  onTreeToggle?: (nodeData: any) => void;
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

class TreeNode extends React.Component<TreeNodeProps> {
  static propTypes = {
    layer: PropTypes.number,
    value: PropTypes.any,
    label: PropTypes.any,
    expand: PropTypes.bool,
    active: PropTypes.bool,
    visible: PropTypes.bool,
    nodeData: PropTypes.any,
    disabled: PropTypes.bool,
    draggable: PropTypes.bool,
    dragOver: PropTypes.bool,
    hasChildren: PropTypes.bool,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    style: PropTypes.object,
    innerRef: refType,
    onTreeToggle: PropTypes.func,
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
  static defaultProps = {
    visible: true
  };

  getTitle() {
    const { label } = this.props;
    if (typeof label === 'string') {
      return label;
    } else if (React.isValidElement(label)) {
      const nodes = reactToString(label);
      return nodes.join('');
    }
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  handleTreeToggle = (event: React.SyntheticEvent<any>) => {
    const { onTreeToggle, nodeData } = this.props;

    // 异步加载数据自定义loading图标时，阻止原生冒泡，不触发 document.click
    event?.nativeEvent?.stopImmediatePropagation?.();
    onTreeToggle?.(nodeData);
  };

  handleSelect = (event: React.SyntheticEvent<any>) => {
    const { onSelect, disabled, nodeData } = this.props;

    if (disabled) {
      return;
    }

    if (event.target instanceof HTMLElement) {
      if (hasClass(event.target.parentNode, this.addPrefix('expand-icon-wrapper'))) {
        return;
      }
    }

    onSelect?.(nodeData, event);
  };

  handleDragStart = (event: React.DragEvent) => {
    const { nodeData, onDragStart } = this.props;
    const dragNode = document.getElementById('drag-node');
    if (dragNode) {
      event.dataTransfer.setDragImage(dragNode, 0, 0);
    }
    onDragStart?.(nodeData, event);
  };

  handleDragEnter = (event: React.DragEvent) => {
    const { nodeData, onDragEnter } = this.props;
    event.preventDefault();
    event.stopPropagation();
    onDragEnter?.(nodeData, event);
  };

  handleDragOver = (event: React.DragEvent) => {
    const { nodeData, onDragOver } = this.props;
    event.preventDefault();
    event.stopPropagation();
    onDragOver?.(nodeData, event);
  };

  handleDragLeave = (event: React.DragEvent) => {
    const { nodeData, onDragLeave } = this.props;
    event.stopPropagation();
    onDragLeave?.(nodeData, event);
  };

  handleDragEnd = (event: React.DragEvent) => {
    const { nodeData, onDragEnd } = this.props;
    event.stopPropagation();
    onDragEnd?.(nodeData, event);
  };

  handleDrop = (event: React.DragEvent) => {
    const { nodeData, onDrop } = this.props;
    event.preventDefault();
    event.stopPropagation();
    onDrop?.(nodeData, event);
  };

  renderIcon = () => {
    const { expand, onRenderTreeIcon, hasChildren, nodeData } = this.props;
    const classes = classNames(this.addPrefix('expand-icon'), {
      [this.addPrefix('expanded')]: !!expand
    });

    let expandIcon = <i className={classes} />;
    if (nodeData !== undefined && typeof onRenderTreeIcon === 'function') {
      const customIcon = onRenderTreeIcon(nodeData);
      expandIcon =
        customIcon !== null ? (
          <div className={this.addPrefix('custom-icon')}>{customIcon}</div>
        ) : (
          expandIcon
        );
    }

    return hasChildren ? (
      <div
        role="button"
        tabIndex={-1}
        data-ref={nodeData.refKey}
        className={this.addPrefix('expand-icon-wrapper')}
        onClick={this.handleTreeToggle}
      >
        {expandIcon}
      </div>
    ) : null;
  };

  renderLabel = () => {
    const {
      nodeData,
      onRenderTreeNode,
      label,
      layer,
      dragging,
      dragOver,
      dragOverTop,
      dragOverBottom
    } = this.props;
    const contentClasses = classNames(this.addPrefix('label-content'), {
      [this.addPrefix('dragging')]: dragging,
      [this.addPrefix('drag-over')]: dragOver,
      [this.addPrefix('drag-over-top')]: dragOverTop,
      [this.addPrefix('drag-over-bottom')]: dragOverBottom
    });
    return (
      <span
        className={this.addPrefix('label')}
        title={this.getTitle()}
        data-layer={layer}
        data-key={nodeData?.refKey || ''}
        role="button"
        tabIndex={-1}
        onClick={this.handleSelect}
      >
        <span className={contentClasses}>
          {onRenderTreeNode ? onRenderTreeNode(nodeData) : label}
        </span>
      </span>
    );
  };

  render() {
    const {
      rtl,
      style,
      className,
      classPrefix,
      active,
      layer,
      disabled,
      visible,
      innerRef,
      draggable
    } = this.props;
    const classes = classNames(className, classPrefix, {
      'text-muted': disabled,
      [this.addPrefix('disabled')]: disabled,
      [this.addPrefix('active')]: active
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
        onDragStart={this.handleDragStart}
        onDragEnter={this.handleDragEnter}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDragEnd={this.handleDragEnd}
        onDrop={this.handleDrop}
      >
        {this.renderIcon()}
        {this.renderLabel()}
      </div>
    ) : null;
  }
}

export default defaultProps<TreeNodeProps>({
  classPrefix: 'tree-node'
})(TreeNode);
