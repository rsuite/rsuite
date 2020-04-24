import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps, prefix, refType } from '../utils';
import reactToString from '../utils/reactToString';
import {
  CHECK_STATE,
  CheckStateType,
  TREE_NODE_PADDING,
  TREE_NODE_ROOT_PADDING
} from '../constants';

import DropdownMenuCheckItem from '../Picker/DropdownMenuCheckItem';

export interface TreeCheckNodeProps {
  classPrefix?: string;
  className?: string;
  visible?: boolean;
  rtl?: boolean;
  style?: React.CSSProperties;
  label?: any;
  layer?: number;
  value?: any;
  focus?: boolean;
  expand?: boolean;
  nodeData?: any;
  disabled?: boolean;
  checkState?: CheckStateType;
  hasChildren?: boolean;
  uncheckable?: boolean;
  allUncheckable?: boolean;
  innerRef?: React.Ref<any>;
  onTreeToggle?: (nodeData: any, layer: number, event: React.SyntheticEvent<any>) => void;
  onSelect?: (nodeData: any, event: React.SyntheticEvent<any>) => void;
  onRenderTreeIcon?: (nodeData: any, expandIcon?: React.ReactNode) => React.ReactNode;
  onRenderTreeNode?: (nodeData: any) => React.ReactNode;
}

class TreeCheckNode extends React.Component<TreeCheckNodeProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    visible: PropTypes.bool,
    style: PropTypes.object,
    label: PropTypes.any,
    layer: PropTypes.number,
    value: PropTypes.any,
    focus: PropTypes.bool,
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
    innerRef: refType,
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
    event?.nativeEvent?.stopImmediatePropagation?.();

    onTreeToggle?.(nodeData, layer, event);
  };

  handleSelect = (_value: any, event: React.SyntheticEvent<any>) => {
    const { onSelect, disabled, uncheckable, nodeData, checkState } = this.props;

    if (disabled || uncheckable) {
      return;
    }

    let isChecked = false;
    if (checkState === CHECK_STATE.UNCHECK || checkState === CHECK_STATE.INDETERMINATE) {
      isChecked = true;
    }

    if (checkState === CHECK_STATE.CHECK) {
      isChecked = false;
    }

    const nextNodeData = {
      ...nodeData,
      check: isChecked
    };
    onSelect?.(nextNodeData, event);
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderIcon = () => {
    const { expand, onRenderTreeIcon, hasChildren, nodeData } = this.props;
    const expandIconClasses = classNames(this.addPrefix('expand-icon'), 'icon', {
      [this.addPrefix('expanded')]: expand
    });
    let expandIcon = <i className={expandIconClasses} />;
    if (typeof onRenderTreeIcon === 'function') {
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
      focus,
      onRenderTreeNode,
      label,
      layer,
      disabled,
      uncheckable,
      checkState
    } = this.props;

    return (
      <DropdownMenuCheckItem
        componentClass="div"
        active={checkState === CHECK_STATE.CHECK}
        indeterminate={checkState === CHECK_STATE.INDETERMINATE}
        focus={focus}
        checkable={!uncheckable}
        disabled={disabled}
        data-layer={layer}
        data-key={nodeData.refKey}
        className={this.addPrefix('label')}
        title={this.getTitle()}
        onSelect={this.handleSelect}
      >
        <span className={this.addPrefix('text-wrapper')}>
          {typeof onRenderTreeNode === 'function' ? onRenderTreeNode(nodeData) : label}
        </span>
      </DropdownMenuCheckItem>
    );
  };

  render() {
    const {
      style,
      className,
      classPrefix,
      visible,
      layer,
      disabled,
      allUncheckable,
      innerRef,
      rtl
    } = this.props;

    const classes = classNames(className, classPrefix, {
      'text-muted': disabled,
      [this.addPrefix('all-uncheckable')]: !!allUncheckable
    });
    const padding = layer * TREE_NODE_PADDING + TREE_NODE_ROOT_PADDING;
    const styles = {
      ...style,
      [rtl ? 'paddingRight' : 'paddingLeft']: padding
    };
    return visible ? (
      <div style={styles} className={classes} ref={innerRef}>
        {this.renderIcon()}
        {this.renderLabel()}
      </div>
    ) : null;
  }
}

export default defaultProps<TreeCheckNodeProps>({
  classPrefix: 'check-tree-node'
})(TreeCheckNode);
