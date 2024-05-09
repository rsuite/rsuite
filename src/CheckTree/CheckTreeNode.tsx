import React, { forwardRef, useMemo } from 'react';
import ListCheckItem from '../internals/Picker/ListCheckItem';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { stringifyReactNode } from '../internals/utils';
import { indentTreeNode } from '../Tree/utils';
import { useClassNames, useEventCallback, useCustom, CHECK_STATE, CheckStateType } from '../utils';
import { useTreeCustomRenderer } from '../Tree/TreeProvider';
import TreeNodeToggle from '../Tree/TreeNodeToggle';

export interface CheckTreeNodeProps extends WithAsProps {
  /**
   * The label of the node.
   */
  label?: any;
  /**
   * The layer of the node in the tree hierarchy.
   */
  layer: number;
  /**
   * The value of the node.
   */
  value?: any;
  /**
   * Whether the node should be focused.
   */
  focus?: boolean;

  /**
   * Whether the node should be expanded.
   */
  expand?: boolean;
  /**
   * Whether the node is in a loading state.
   */
  loading?: boolean;
  /**
   * Whether the node is visible.
   */
  visible?: boolean;
  /**
   * Additional data associated with the node.
   */
  nodeData?: any;
  /**
   * Whether the node is disabled.
   */
  disabled?: boolean;

  /**
   * The check state of the node.
   */
  checkState?: CheckStateType;

  /**
   * Whether the node has children.
   */
  hasChildren?: boolean;
  /**
   * Whether the node is uncheckable.
   */
  uncheckable?: boolean;
  /**
   * Whether all nodes are uncheckable.
   */
  allUncheckable?: boolean;

  /**
   * Reference to the tree item.
   */
  treeItemRef?: React.Ref<any>;

  /**
   * Callback function called when the node is expanded.
   */
  onExpand?: (nodeData: any) => void;
  /**
   * Callback function called when the node is selected.
   */
  onSelect?: (nodeData: any, event: React.SyntheticEvent) => void;
}

const CheckTreeNode: RsRefForwardingComponent<'div', CheckTreeNodeProps> = forwardRef<
  HTMLDivElement,
  CheckTreeNodeProps
>((props, ref) => {
  const {
    as: Component = 'div',
    style,
    className,
    classPrefix = 'check-tree-node',
    visible = true,
    layer,
    disabled,
    allUncheckable,
    loading,
    expand,
    hasChildren,
    nodeData,
    focus,
    label,
    uncheckable,
    checkState,
    value,
    treeItemRef,
    onExpand,
    onSelect,
    ...rest
  } = props;

  const { rtl } = useCustom();
  const { renderTreeNode } = useTreeCustomRenderer();
  const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);
  const labelStr = useMemo(() => stringifyReactNode(label), [label]);

  const handleExpand = useEventCallback((event: React.SyntheticEvent) => {
    // stop propagation when using custom loading icon
    event?.nativeEvent?.stopImmediatePropagation?.();
    onExpand?.(nodeData);
  });

  const handleSelect = useEventCallback((_value: any, event: React.SyntheticEvent) => {
    if (disabled) {
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

  const classes = merge(
    className,
    withClassPrefix({
      disabled,
      'all-uncheckable': !!allUncheckable,
      'text-muted': disabled,
      focus
    })
  );

  const styles = { ...style, ...indentTreeNode(rtl, layer - 1) };

  return visible ? (
    <Component {...rest} style={styles} className={classes} ref={ref}>
      <TreeNodeToggle
        aria-label={(expand ? 'Collapse' : 'Expand') + ` ${labelStr}`}
        data={nodeData}
        expanded={expand}
        loading={loading}
        hasChildren={hasChildren}
        onClick={handleExpand}
      />
      <ListCheckItem
        as="div"
        role="treeitem"
        ref={treeItemRef}
        aria-label={labelStr}
        aria-expanded={expand}
        aria-checked={checkState === CHECK_STATE.CHECK}
        aria-selected={focus}
        aria-disabled={disabled}
        aria-level={layer}
        data-layer={layer}
        active={checkState === CHECK_STATE.CHECK}
        indeterminate={checkState === CHECK_STATE.INDETERMINATE}
        focus={focus}
        checkable={!uncheckable}
        disabled={disabled}
        value={nodeData.refKey || value}
        className={prefix('content')}
        title={labelStr}
        onSelect={handleSelect}
      >
        {typeof renderTreeNode === 'function' ? renderTreeNode(nodeData) : label}
      </ListCheckItem>
    </Component>
  ) : null;
});

CheckTreeNode.displayName = 'CheckTreeNode';

export default CheckTreeNode;
