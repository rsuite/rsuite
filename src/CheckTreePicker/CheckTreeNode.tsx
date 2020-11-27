import React, { forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import ArrowDown from '@rsuite/icons/legacy/ArrowDown';
import Spinner from '@rsuite/icons/legacy/Spinner';

import DropdownMenuCheckItem from '../Picker/DropdownMenuCheckItem';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import {
  useClassNames,
  CHECK_STATE,
  CheckStateType,
  TREE_NODE_PADDING,
  TREE_NODE_ROOT_PADDING,
  reactToString
} from '../utils';

export interface CheckTreeNodeProps extends WithAsProps {
  rtl?: boolean;
  label?: any;
  layer?: number;
  value?: any;
  focus?: boolean;
  style?: React.CSSProperties;
  expand?: boolean;
  loading?: boolean;
  visible?: boolean;
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

const CheckTreeNode: RsRefForwardingComponent<'div', CheckTreeNodeProps> = forwardRef<
  HTMLDivElement,
  CheckTreeNodeProps
>(
  (
    {
      as: Component = 'div',
      style,
      className,
      classPrefix,
      visible,
      layer,
      disabled,
      allUncheckable,
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
      onRenderTreeNode,
      ...rest
    },
    ref
  ) => {
    const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);

    const getTitle = () => {
      if (typeof label === 'string') {
        return label;
      } else if (React.isValidElement(label)) {
        const nodes = reactToString(label);
        return nodes.join('');
      }
    };

    const handleExpand = useCallback(
      (event: React.SyntheticEvent<any>) => {
        // stop propagation when using custom loading icon
        event?.nativeEvent?.stopImmediatePropagation?.();
        onExpand?.(nodeData);
      },
      [nodeData, onExpand]
    );

    const handleSelect = useCallback(
      (_value: any, event: React.SyntheticEvent<any>) => {
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
      },
      [disabled, checkState, uncheckable, nodeData, onSelect]
    );

    const renderIcon = () => {
      const expandIconClasses = prefix('expand-icon', 'icon', {
        expanded: expand
      });

      let expandIcon = <ArrowDown className={expandIconClasses} />;

      if (loading) {
        expandIcon = (
          <div className={prefix('loading-icon')}>
            <Spinner spin />
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

    const classes = merge(
      className,
      withClassPrefix({
        disabled,
        'all-uncheckable': !!allUncheckable,
        'text-muted': disabled,
        focus
      })
    );

    // layer start from 1
    const padding = (layer - 1) * TREE_NODE_PADDING + TREE_NODE_ROOT_PADDING;
    const styles = { ...style, [rtl ? 'paddingRight' : 'paddingLeft']: padding };
    return visible ? (
      <Component
        role="treeitem"
        aria-label={label}
        aria-expanded={expand}
        aria-selected={checkState === CHECK_STATE.CHECK}
        aria-disabled={disabled}
        aria-level={layer}
        {...rest}
        style={styles}
        className={classes}
        ref={ref}
      >
        {renderIcon()}
        {renderLabel()}
      </Component>
    ) : null;
  }
);

CheckTreeNode.displayName = 'CheckTreeNode';
CheckTreeNode.propTypes = {
  as: PropTypes.elementType,
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
