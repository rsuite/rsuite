// @flow

import * as React from 'react';
import classNames from 'classnames';
import { shallowEqual } from 'rsuite-utils/lib/utils';
import { hasClass } from 'dom-lib';

type DefaultEvent = SyntheticEvent<*>;

type Props = {
  layer: number,
  value?: any,
  label?: any,
  active?: boolean,
  visible: boolean,
  nodeData: Object,
  disabled?: boolean,
  hasChildren?: boolean,
  classPrefix: string,
  onTreeToggle?: (nodeData: Object, layer: number, event: DefaultEvent) => void,
  onSelect?: (nodeData: Object, layer: number, event: DefaultEvent) => void,
  onRenderTreeIcon?: (nodeData: Object) => React.Node,
  onRenderTreeNode?: (nodeData: Object) => React.Node
};

const INITIAL_PADDING = 12;
const PADDING = 16;

class TreeNode extends React.Component<Props> {
  static defaultProps = {
    visible: true
  };

  shouldComponentUpdate(nextProps: Props) {
    return !shallowEqual(this.props, nextProps);
  }
  /**
   * 展开收缩节点
   */
  handleTreeToggle = (event: DefaultEvent) => {
    const { onTreeToggle, layer, nodeData } = this.props;

    // 异步加载数据自定义loading图标时，阻止原生冒泡，不触发 document.click
    if (event.nativeEvent && event.nativeEvent.stopImmediatePropagation) {
      event.nativeEvent.stopImmediatePropagation && event.nativeEvent.stopImmediatePropagation();
    }

    onTreeToggle && onTreeToggle(nodeData, layer, event);
  };

  handleSelect = (event: DefaultEvent) => {
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
    const { classPrefix, onRenderTreeIcon, hasChildren, nodeData } = this.props;
    let expandIcon = <i className={`${classPrefix}-node-expand-icon icon`} />;
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
        tabIndex="-1"
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
        title={label}
        data-layer={layer}
        data-key={key}
        role="button"
        tabIndex="-1"
        onClick={this.handleSelect}
      >
        {newLabel}
      </span>
    );
  };

  render() {
    const { classPrefix, active, layer, disabled, visible } = this.props;

    const disabledClass = `${classPrefix}-node-disabled`;
    const activeClass = `${classPrefix}-node-active`;
    const classes = classNames(`${classPrefix}-node`, {
      'text-muted': disabled,
      [disabledClass]: disabled,
      [activeClass]: active
    });

    const styles = { paddingLeft: layer * PADDING + INITIAL_PADDING };

    return visible ? (
      <div style={styles} className={classes}>
        {this.renderIcon()}
        {this.renderLabel()}
      </div>
    ) : null;
  }
}

export default TreeNode;
