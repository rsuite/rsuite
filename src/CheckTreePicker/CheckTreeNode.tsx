import React, { forwardRef } from 'react';
import ArrowDown from '@rsuite/icons/legacy/ArrowDown';
import Spinner from '@rsuite/icons/legacy/Spinner';
import DropdownMenuCheckItem from '../Picker/DropdownMenuCheckItem';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { getTreeNodeIndent } from '../utils/treeUtils';
import {
  useClassNames,
  useEventCallback,
  CHECK_STATE,
  CheckStateType,
  reactToString
} from '../utils';

export interface CheckTreeNodeProps extends WithAsProps {
  rtl?: boolean;
  label?: any;
  layer: number;
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
  onSelect?: (nodeData: any, event: React.SyntheticEvent) => void;
  renderTreeIcon?: (nodeData: any, expandIcon?: React.ReactNode) => React.ReactNode;
  renderTreeNode?: (nodeData: any) => React.ReactNode;
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
      classPrefix = 'check-tree-node',
      visible = true,
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
      value,
      onExpand,
      onSelect,
      renderTreeIcon,
      renderTreeNode,
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

    const handleExpand = useEventCallback((event: React.SyntheticEvent) => {
      // stop propagation when using custom loading icon
      event?.nativeEvent?.stopImmediatePropagation?.();
      onExpand?.(nodeData);
    });

    const handleSelect = useEventCallback((_value: any, event: React.SyntheticEvent) => {
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
    });

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

      if (typeof renderTreeIcon === 'function') {
        const customIcon = renderTreeIcon(nodeData);
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

    const classes = merge(
      className,
      withClassPrefix({
        disabled,
        'all-uncheckable': !!allUncheckable,
        'text-muted': disabled,
        focus
      })
    );

    const styles = { ...style, ...getTreeNodeIndent(rtl, layer - 1) };
    return visible ? (
      <Component {...rest} style={styles} className={classes} ref={ref}>
        {renderIcon()}
        <DropdownMenuCheckItem
          as="div"
          role="treeitem"
          aria-label={label}
          aria-expanded={expand}
          aria-selected={checkState === CHECK_STATE.CHECK}
          aria-disabled={disabled}
          aria-level={layer}
          active={checkState === CHECK_STATE.CHECK}
          indeterminate={checkState === CHECK_STATE.INDETERMINATE}
          focus={focus}
          checkable={!uncheckable}
          disabled={disabled}
          data-layer={layer}
          value={nodeData.refKey || value}
          className={prefix('label')}
          title={getTitle()}
          onSelect={handleSelect}
        >
          <span className={prefix('text-wrapper')}>
            {typeof renderTreeNode === 'function' ? renderTreeNode(nodeData) : label}
          </span>
        </DropdownMenuCheckItem>
      </Component>
    ) : null;
  }
);

CheckTreeNode.displayName = 'CheckTreeNode';

export default CheckTreeNode;
