import * as React from 'react';
import PropTypes from 'prop-types';
import { refType, useClassNames } from '../utils';
import reactToString from '../utils/reactToString';
import {
  CHECK_STATE,
  CheckStateType,
  TREE_NODE_PADDING,
  TREE_NODE_ROOT_PADDING
} from '../constants';
import DropdownMenuCheckItem from '../Picker/DropdownMenuCheckItem';
import Icon from '../Icon/Icon';

export interface CheckTreeNodeProps {
  rtl?: boolean;
  label?: any;
  layer?: number;
  value?: any;
  focus?: boolean;
  style?: React.CSSProperties;
  expand?: boolean;
  loading?: boolean;
  visible?: boolean;
  innerRef?: React.Ref<any>;
  nodeData?: any;
  disabled?: boolean;
  className?: string;
  checkState?: CheckStateType;
  classPrefix?: string;
  hasChildren?: boolean;
  uncheckable?: boolean;
  allUncheckable?: boolean;
  onExpand?: (nodeData: any) => void;
  onSelect?: (nodeData: any, event: React.SyntheticEvent<any>) => void;
  onRenderTreeIcon?: (nodeData: any, expandIcon?: React.ReactNode) => React.ReactNode;
  onRenderTreeNode?: (nodeData: any) => React.ReactNode;
}

const CheckTreeNode: React.FC<CheckTreeNodeProps> = ({
  style,
  className,
  classPrefix,
  visible,
  layer,
  disabled,
  allUncheckable,
  innerRef,
  rtl,
  loading,
  expand,
  hasChildren,
  nodeData,
  focus,
  label,
  uncheckable,
  checkState,
  onExpand,
  onSelect,
  onRenderTreeIcon,
  onRenderTreeNode
}) => {
  const { prefix, merge, rootPrefix } = useClassNames(classPrefix);

  const getTitle = () => {
    if (typeof label === 'string') {
      return label;
    } else if (React.isValidElement(label)) {
      const nodes = reactToString(label);
      return nodes.join('');
    }
  };

  const handleExpand = (event: React.SyntheticEvent<any>) => {
    // 异步加载数据自定义loading图标时，阻止原生冒泡，不触发 document.click
    event?.nativeEvent?.stopImmediatePropagation?.();
    onExpand?.(nodeData);
  };

  const handleSelect = (_value: any, event: React.SyntheticEvent<any>) => {
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

  const renderIcon = () => {
    const expandIconClasses = merge(prefix('expand-icon'), 'icon', {
      [prefix('expanded')]: expand
    });
    let expandIcon = <i className={expandIconClasses} />;

    if (loading) {
      expandIcon = (
        <div className={prefix('loading-icon')}>
          <Icon icon="spinner" spin style={{ verticalAlign: 'middle' }} />
        </div>
      );
    }

    if (typeof onRenderTreeIcon === 'function') {
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
    return (
      <DropdownMenuCheckItem
        as="div"
        active={checkState === CHECK_STATE.CHECK}
        indeterminate={checkState === CHECK_STATE.INDETERMINATE}
        focus={focus}
        checkable={!uncheckable}
        disabled={disabled}
        data-layer={layer}
        value={nodeData.refKey}
        className={prefix('label')}
        title={getTitle()}
        onSelect={handleSelect}
      >
        <span className={prefix('text-wrapper')}>
          {typeof onRenderTreeNode === 'function' ? onRenderTreeNode(nodeData) : label}
        </span>
      </DropdownMenuCheckItem>
    );
  };

  const classes = merge(className, rootPrefix(classPrefix), {
    'text-muted': disabled,
    [prefix('all-uncheckable')]: !!allUncheckable
  });
  const padding = layer * TREE_NODE_PADDING + TREE_NODE_ROOT_PADDING;
  const styles = {
    ...style,
    [rtl ? 'paddingRight' : 'paddingLeft']: padding
  };
  return visible ? (
    <div style={styles} className={classes} ref={innerRef}>
      {renderIcon()}
      {renderLabel()}
    </div>
  ) : null;
};

CheckTreeNode.propTypes = {
  rtl: PropTypes.bool,
  classPrefix: PropTypes.string,
  visible: PropTypes.bool,
  style: PropTypes.object,
  label: PropTypes.any,
  layer: PropTypes.number,
  loading: PropTypes.bool,
  value: PropTypes.any,
  focus: PropTypes.bool,
  expand: PropTypes.bool,
  nodeData: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  checkState: PropTypes.oneOf([CHECK_STATE.UNCHECK, CHECK_STATE.CHECK, CHECK_STATE.INDETERMINATE]),
  hasChildren: PropTypes.bool,
  uncheckable: PropTypes.bool,
  allUncheckable: PropTypes.bool,
  innerRef: refType,
  onExpand: PropTypes.func,
  onSelect: PropTypes.func,
  onRenderTreeIcon: PropTypes.func,
  onRenderTreeNode: PropTypes.func
};

CheckTreeNode.defaultProps = {
  visible: true,
  classPrefix: 'check-tree-node'
};

export default CheckTreeNode;
