import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { hasClass } from 'dom-lib';
import { prefix, reactToString } from 'rsuite-utils/lib/utils';
import { CHECK_STATE } from '../constants';

export type CheckState = CHECK_STATE.UNCHECK | CHECK_STATE.CHECK | CHECK_STATE.INDETERMINATE;
export interface TreeCheckNodeProps {
  classPrefix?: string;
  visible?: boolean;
  style?: React.CSSProperties;
  label?: any;
  layer?: number;
  value?: any;
  active?: boolean;
  expand?: boolean;
  nodeData?: any;
  disabled?: boolean;
  checkState?: CheckState;
  hasChildren?: boolean;
  uncheckable?: boolean;
  allUncheckable?: boolean;
  onTreeToggle?: (nodeData: any, layer: number, event: React.SyntheticEvent<any>) => void;
  onSelect?: (nodeData: any, event: React.SyntheticEvent<any>) => void;
  onRenderTreeIcon?: (nodeData: any, expandIcon?: React.ReactNode) => React.ReactNode;
  onRenderTreeNode?: (nodeData: any) => React.ReactNode;
}

const INITIAL_PADDING = 12;
const PADDING = 16;

class TreeCheckNode extends React.Component<TreeCheckNodeProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    visible: PropTypes.bool,
    style: PropTypes.object,
    label: PropTypes.any,
    layer: PropTypes.number,
    value: PropTypes.any,
    active: PropTypes.bool,
    expand: PropTypes.bool,
    nodeData: PropTypes.object,
    disabled: PropTypes.bool,
    checkState: PropTypes.oneOf([
      CHECK_STATE.UNCHECK,
      CHECK_STATE.CHECK,
      CHECK_STATE.INDETERMINATE
    ]),
    hasChildren: PropTypes.bool,
    uncheckable: PropTypes.bool,
    allUncheckable: PropTypes.bool,
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

  handleTreeToggle = (event: React.MouseEvent<HTMLDivElement>) => {
    const { onTreeToggle, layer, nodeData } = this.props;

    // 异步加载数据自定义loading图标时，阻止原生冒泡，不触发 document.click
    if (event.nativeEvent && event.nativeEvent.stopImmediatePropagation) {
      event.nativeEvent.stopImmediatePropagation();
    }

    onTreeToggle && onTreeToggle(nodeData, layer, event);
  };

  handleSelect = (event: React.SyntheticEvent<any>) => {
    const { classPrefix, onSelect, disabled, uncheckable, nodeData, checkState } = this.props;

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
    onSelect && onSelect(nodeData, event);
  };

  renderIcon = () => {
    const { expand, onRenderTreeIcon, hasChildren, nodeData, classPrefix } = this.props;
    const expandIconClasses = classNames(`${classPrefix}-node-expand-icon icon`, {
      [`${classPrefix}-node-expanded`]: expand
    });
    let expandIcon = <i className={expandIconClasses} />;
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
        tabIndex={-1}
        className={addPrefix('checknode-label')}
        title={this.getTitle()}
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
    const {
      style,
      classPrefix,
      visible,
      active,
      layer,
      disabled,
      checkState,
      allUncheckable
    } = this.props;

    const addPrefix = prefix(`${classPrefix}-node`);
    const classes = classNames(`${classPrefix}-node`, {
      'text-muted': disabled,
      [addPrefix('indeterminate')]: checkState === CHECK_STATE.INDETERMINATE,
      [addPrefix('checked')]: checkState === CHECK_STATE.CHECK,
      [addPrefix('disabled')]: disabled,
      [addPrefix('active')]: active,
      [addPrefix('all-uncheckable')]: !!allUncheckable
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

export default TreeCheckNode;
