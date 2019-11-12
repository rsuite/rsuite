import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { reactToString } from 'rsuite-utils/lib/utils';
import { hasClass } from 'dom-lib';
import { TREE_NODE_PADDING, TREE_NODE_ROOT_PADDING } from '../constants';
import { defaultProps, prefix } from '../utils';

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
  hasChildren?: boolean;
  className?: string;
  classPrefix?: string;
  style?: React.CSSProperties;
  innerRef?: React.Ref<any>;
  onTreeToggle?: (nodeData: any, layer: number, event: React.SyntheticEvent<any>) => void;
  onSelect?: (nodeData: any, layer: number, event: React.SyntheticEvent<any>) => void;
  onRenderTreeIcon?: (nodeData: any) => React.ReactNode;
  onRenderTreeNode?: (nodeData: any) => React.ReactNode;
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
    hasChildren: PropTypes.bool,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    style: PropTypes.object,
    innerRef: PropTypes.func,
    onTreeToggle: PropTypes.func,
    onSelect: PropTypes.func,
    onRenderTreeIcon: PropTypes.func,
    onRenderTreeNode: PropTypes.func
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
    const { onTreeToggle, layer, nodeData } = this.props;

    // 异步加载数据自定义loading图标时，阻止原生冒泡，不触发 document.click
    event?.nativeEvent?.stopImmediatePropagation?.();
    onTreeToggle?.(nodeData, layer, event);
  };

  handleSelect = (event: React.SyntheticEvent<any>) => {
    const { onSelect, layer, disabled, nodeData } = this.props;

    if (disabled) {
      return;
    }

    if (event.target instanceof HTMLElement) {
      if (hasClass(event.target.parentNode, this.addPrefix('expand-icon-wrapper'))) {
        return;
      }
    }

    onSelect?.(nodeData, layer, event);
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
    const { nodeData, onRenderTreeNode, label, layer } = this.props;
    const key = nodeData ? nodeData.refKey : '';

    return (
      <span
        className={this.addPrefix('label')}
        title={this.getTitle()}
        data-layer={layer}
        data-key={key}
        role="button"
        tabIndex={-1}
        onClick={this.handleSelect}
      >
        {onRenderTreeNode ? onRenderTreeNode(nodeData) : label}
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
      innerRef
    } = this.props;
    const classes = classNames(className, classPrefix, {
      'text-muted': disabled,
      [this.addPrefix('disabled')]: disabled,
      [this.addPrefix('active')]: active
    });

    const padding = layer * TREE_NODE_PADDING + TREE_NODE_ROOT_PADDING;
    const styles = rtl ? { paddingRight: padding } : { paddingLeft: padding };

    return visible ? (
      <div style={{ ...style, ...styles }} className={classes} ref={innerRef}>
        {this.renderIcon()}
        {this.renderLabel()}
      </div>
    ) : null;
  }
}

export default defaultProps<TreeNodeProps>({
  classPrefix: 'tree-node'
})(TreeNode);
