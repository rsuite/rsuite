// @flow
import * as React from 'react';
import classNames from 'classnames';
import { hasClass } from 'dom-lib';
import { prefix, shallowEqual } from 'rsuite-utils/lib/utils';
import { CHECK_STATE } from '../utils/constants';

type CheckState = CHECK_STATE.UNCHECK | CHECK_STATE.INDETERMINATE | CHECK_STATE.CHECK;
type DefaultEvent = SyntheticEvent<*>;

type Props = {
  classPrefix: string,
  visible?: boolean,
  label?: any,
  value?: any,
  nodeData: Object,
  active?: boolean,
  checkState?: CheckState,
  hasChildren?: boolean,
  disabled?: boolean,
  uncheckable: boolean,
  layer: number,
  onTreeToggle?: (nodeData: Object, layer: number, event: DefaultEvent) => void,
  onSelect?: (nodeData: Object, layer: number, event: DefaultEvent) => void,
  onRenderTreeIcon?: (nodeData: Object, expandIcon: React.Node) => React.Node,
  onRenderTreeNode?: (nodeData: Object) => React.Node
};

const INITIAL_PADDING = 12;
const PADDING = 16;

class TreeCheckNode extends React.Component<Props> {
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
      event.nativeEvent.stopImmediatePropagation();
    }

    onTreeToggle && onTreeToggle(nodeData, layer, event);
  };

  handleSelect = (event: DefaultEvent) => {
    const {
      classPrefix,
      onTreeToggle,
      onSelect,
      hasChildren,
      layer,
      disabled,
      uncheckable,
      nodeData,
      checkState
    } = this.props;

    if (disabled || uncheckable) {
      return;
    }

    // 如果点击的是展开 icon 就 return
    if (event.target instanceof HTMLElement) {
      if (hasClass(event.target.parentNode, `${classPrefix}-node-expand-icon-wrapper`)) {
        return;
      }
    }

    let isChecked = false;
    if (checkState === CHECK_STATE.UNCHECK || checkState === CHECK_STATE.INDETERMINATE) {
      isChecked = true;
    }

    if (checkState === CHECK_STATE.CHECK) {
      isChecked = false;
    }
    nodeData.check = isChecked;
    onSelect && onSelect(nodeData, layer, event);
  };

  renderIcon = () => {
    const { onRenderTreeIcon, hasChildren, nodeData, classPrefix } = this.props;
    let expandIcon = <i className={`${classPrefix}-node-expand-icon icon`} />;
    if (typeof onRenderTreeIcon === 'function') {
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
    const {
      classPrefix,
      nodeData,
      onRenderTreeNode,
      label,
      layer,
      disabled,
      uncheckable
    } = this.props;
    const addPrefix = prefix(classPrefix);
    const input = (
      <span className={addPrefix('input-wrapper')}>
        <input
          className={addPrefix('input')}
          type="checkbox"
          disabled={disabled}
          onChange={this.handleSelect}
        />
        <span className={addPrefix('inner')} />
      </span>
    );
    let custom = typeof onRenderTreeNode === 'function' ? onRenderTreeNode(nodeData) : label;
    return (
      <span
        role="button"
        tabIndex="-1"
        className={addPrefix('checknode-label')}
        title={label}
        data-layer={layer}
        data-key={nodeData.refKey}
        onClick={this.handleSelect}
      >
        {!uncheckable ? input : null}
        {custom}
      </span>
    );
  };

  render() {
    const { classPrefix, visible, active, layer, disabled, uncheckable, checkState } = this.props;

    const addPrefix = prefix(`${classPrefix}-node`);
    const classes = classNames(`${classPrefix}-node`, {
      'text-muted': disabled,
      [addPrefix('indeterminate')]: checkState === CHECK_STATE.INDETERMINATE,
      [addPrefix('checked')]: checkState === CHECK_STATE.CHECK,
      [addPrefix('disabled')]: disabled,
      [addPrefix('active')]: active
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

export default TreeCheckNode;
