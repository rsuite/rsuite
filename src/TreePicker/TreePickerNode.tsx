import * as React from 'react';
import classNames from 'classnames';
import { reactToString } from 'rsuite-utils/lib/utils';
import { hasClass } from 'dom-lib';

export interface TreePickerProps {
  style?: React.CSSProperties;
  layer: number;
  value?: any;
  label?: any;
  expand?: boolean;
  active?: boolean;
  visible: boolean;
  nodeData: any;
  disabled?: boolean;
  hasChildren?: boolean;
  classPrefix: string;
  onTreeToggle?: (nodeData: Object, layer: number, event: React.SyntheticEvent<any>) => void;
  onSelect?: (nodeData: Object, layer: number, event: React.SyntheticEvent<any>) => void;
  onRenderTreeIcon?: (nodeData: Object) => React.ReactNode;
  onRenderTreeNode?: (nodeData: Object) => React.ReactNode;
}

const INITIAL_PADDING = 12;
const PADDING = 16;

class TreeNode extends React.Component<TreePickerProps> {
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

  /**
   * 展开收缩节点
   */
  handleTreeToggle = (event: React.SyntheticEvent<any>) => {
    const { onTreeToggle, layer, nodeData } = this.props;

    // 异步加载数据自定义loading图标时，阻止原生冒泡，不触发 document.click
    if (event.nativeEvent && event.nativeEvent.stopImmediatePropagation) {
      event.nativeEvent.stopImmediatePropagation && event.nativeEvent.stopImmediatePropagation();
    }

    onTreeToggle && onTreeToggle(nodeData, layer, event);
  };

  handleSelect = (event: React.SyntheticEvent<any>) => {
    const { classPrefix, onSelect, layer, disabled, nodeData } = this.props;

    if (disabled) {
      return;
    }

    if (event.target instanceof HTMLElement) {
      if (hasClass(event.target.parentNode, `${classPrefix}-node-expand-icon-wrapper`)) {
        return;
      }
    }

    onSelect && onSelect(nodeData, layer, event);
  };

  renderIcon = () => {
    const { classPrefix, expand, onRenderTreeIcon, hasChildren, nodeData } = this.props;
    const expandIconClasses = classNames(`${classPrefix}-node-expand-icon icon`, {
      [`${classPrefix}-node-expanded`]: !!expand
    });
    let expandIcon = <i className={expandIconClasses} />;
    if (nodeData !== undefined && typeof onRenderTreeIcon === 'function') {
      const customIcon = onRenderTreeIcon(nodeData);
      expandIcon =
        customIcon !== null ? (
          <div className={`${classPrefix}-custom-icon`}>{customIcon}</div>
        ) : (
          expandIcon
        );
    }

    return hasChildren ? (
      <div
        role="button"
        tabIndex={-1}
        data-ref={nodeData.refKey}
        className={`${classPrefix}-node-expand-icon-wrapper`}
        onClick={this.handleTreeToggle}
      >
        {expandIcon}
      </div>
    ) : null;
  };

  renderLabel = () => {
    const { nodeData, onRenderTreeNode, label, classPrefix, layer } = this.props;
    let newLabel = label;
    newLabel = typeof onRenderTreeNode === 'function' ? onRenderTreeNode(nodeData) : label;
    const key = nodeData ? nodeData.refKey : '';
    return (
      <span
        className={`${classPrefix}-node-label`}
        title={this.getTitle()}
        data-layer={layer}
        data-key={key}
        role="button"
        tabIndex={-1}
        onClick={this.handleSelect}
      >
        {newLabel}
      </span>
    );
  };

  render() {
    const { style, classPrefix, active, layer, disabled, visible } = this.props;

    const disabledClass = `${classPrefix}-node-disabled`;
    const activeClass = `${classPrefix}-node-active`;
    const classes = classNames(`${classPrefix}-node`, {
      'text-muted': disabled,
      [disabledClass]: disabled,
      [activeClass]: active
    });

    const styles = { paddingLeft: layer * PADDING + INITIAL_PADDING };

    return visible ? (
      <div style={{ ...style, ...styles }} className={classes}>
        {this.renderIcon()}
        {this.renderLabel()}
      </div>
    ) : null;
  }
}

export default TreeNode;
