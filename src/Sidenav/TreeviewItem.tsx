import React, { useCallback, useContext, useEffect } from 'react';
import TreeviewItemContext from './TreeviewItemContext';
import useUniqueId from '../utils/useUniqueId';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { createChainedFunction, useClassNames } from '../utils';
import useEnsuredRef from '../utils/useEnsuredRef';
import { SidenavContext } from './Sidenav';
import useCustom from '../utils/useCustom';
import AngleLeft from '@rsuite/icons/legacy/AngleLeft';
import AngleRight from '@rsuite/icons/legacy/AngleRight';
import PropTypes from 'prop-types';
import { IconProps } from '@rsuite/icons/lib/Icon';
import TreeviewItemGroup from './TreeviewItemGroup';
import TreeControlContext from './TreeControlContext';
import Ripple from '../Ripple';

export interface TreeviewItemProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLLIElement>, 'title' | 'onSelect'> {
  /** Active the current option */
  active?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** You can use a custom element for this component */
  as?: React.ElementType;

  /** Whether to display the divider */
  divider?: boolean;

  /** Disable the current option */
  disabled?: boolean;

  /** The value of the current option */
  eventKey?: T;

  /** Displays a custom panel */
  panel?: boolean;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** The submenu that this menuitem controls (if exists) */
  submenu?: React.ReactElement;

  /** Whether the submenu is expanded, used in Sidenav. */
  expanded?: boolean;

  /** Select the callback function for the current option  */
  onSelect?: (eventKey: T, event: React.SyntheticEvent<HTMLElement>) => void;

  title?: React.ReactNode;
}

const defaultProps: Partial<TreeviewItemProps> = {
  as: 'li',
  classPrefix: 'dropdown-item'
};

/**
 * Tree View Node
 * @see https://www.w3.org/TR/wai-aria-practices-1.2/#TreeView
 */
const TreeviewItem: RsRefForwardingComponent<'li', TreeviewItemProps> = React.forwardRef<
  HTMLLIElement,
  TreeviewItemProps
>((props, ref) => {
  const {
    as: Component,
    children,
    divider,
    panel,
    disabled,
    className,
    style,
    classPrefix,
    tabIndex,
    icon,
    title,
    eventKey,
    onClick,
    onSelect,
    ...rest
  } = props;

  const parentTreeitem = useContext(TreeviewItemContext);
  const treeControl = useContext(TreeControlContext);

  const { rtl } = useCustom('DropdownMenu');

  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
  const { openKeys = [], activeKey, onOpenChange, onSelect: onSidenavSelect } = useContext(
    SidenavContext
  );

  // WAI-ARIA treeitem
  const isRootNode = !parentTreeitem;
  const isParentNode = !!children;

  const treeitemRef = useEnsuredRef<HTMLLIElement>(ref);
  const treeitemId = useUniqueId('treeitem-');
  const treeitemExpanded =
    treeControl.expandedNodeIds.includes(rest.id ?? treeitemId) || openKeys.includes(eventKey);
  const treeitemSelected =
    treeControl.selectedNodeIds.includes(rest.id ?? treeitemId) ||
    (eventKey && activeKey === eventKey);
  const treeitemLevel = isRootNode ? 1 : parentTreeitem.level + 1;

  const treeitemAriaAttributes: React.HTMLAttributes<HTMLLIElement> = {
    role: 'treeitem',
    'aria-level': treeitemLevel,
    'aria-selected': treeitemSelected ? true : undefined, // `aria-selected` should not be present on non-selected nodes
    'aria-disabled': disabled
  };

  if (isParentNode) {
    treeitemAriaAttributes['aria-expanded'] = treeitemExpanded;
  }

  // Whether this treeitem is selected
  const active = false;

  const classes = merge(
    className,
    withClassPrefix({
      [`pull-${rtl ? 'left' : 'right'}`]: isParentNode,
      [treeitemExpanded ? 'expand' : 'collapse']: isParentNode,
      'with-icon': icon,
      open: treeitemExpanded,
      submenu: isParentNode,
      active,
      disabled,
      // Whether this treeitem has focus
      focus: treeControl.activeDescendantId === treeitemId
    })
  );

  const activate = useCallback(
    (event?: React.SyntheticEvent<HTMLLIElement>) => {
      onSelect?.(eventKey, event);

      if (isParentNode) {
        onOpenChange?.(eventKey, event);
      }
    },
    [eventKey, onSelect, isParentNode, onOpenChange]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (disabled) {
        return;
      }

      activate(event);
      onSidenavSelect?.(eventKey, event);
    },
    [disabled, activate, onSidenavSelect, eventKey]
  );

  const menuitemEventHandlers: React.LiHTMLAttributes<HTMLLIElement> = {
    onClick: createChainedFunction(handleClick, onClick)
  };

  const { registerNode, unregisterNode } = treeControl;

  useEffect(() => {
    const treeitem = treeitemRef.current;
    if (!divider && !panel) {
      registerNode(treeitem.id, parentTreeitem?.id, { eventKey });
    }

    return () => {
      unregisterNode(treeitem.id);
    };
  }, [treeitemRef, registerNode, unregisterNode, parentTreeitem?.id, eventKey, divider, panel]);

  if (divider) {
    return (
      <Component
        ref={treeitemRef}
        id={treeitemId}
        role="separator"
        style={style}
        className={merge(prefix('divider'), className)}
      />
    );
  }

  if (panel) {
    return (
      <Component
        ref={treeitemRef}
        id={treeitemId}
        role="none presentation"
        style={style}
        className={merge(prefix('panel'), className)}
      >
        {title}
      </Component>
    );
  }

  if (isParentNode) {
    const Icon = rtl ? AngleLeft : AngleRight;

    return (
      <TreeviewItemContext.Provider
        value={{
          id: rest.id ?? treeitemId,
          level: treeitemLevel
        }}
      >
        <Component
          ref={treeitemRef}
          id={treeitemId}
          {...rest}
          tabIndex={disabled ? -1 : tabIndex}
          style={style}
          className={classes}
          {...treeitemAriaAttributes}
          {...menuitemEventHandlers}
        >
          <div className={prefix`toggle`} tabIndex={-1}>
            {icon && React.cloneElement(icon, { className: prefix('menu-icon') })}
            {title}
            <Icon className={prefix`toggle-icon`} />
            <Ripple />
          </div>
          <TreeviewItemGroup expanded={treeitemExpanded}>{children}</TreeviewItemGroup>
        </Component>
      </TreeviewItemContext.Provider>
    );
  }

  return (
    <TreeviewItemContext.Provider
      value={{
        id: rest.id ?? treeitemId,
        level: treeitemLevel
      }}
    >
      <Component
        ref={treeitemRef}
        id={treeitemId}
        {...rest}
        tabIndex={disabled ? -1 : tabIndex}
        style={style}
        className={classes}
        {...treeitemAriaAttributes}
        {...menuitemEventHandlers}
      >
        {icon && React.cloneElement(icon, { className: prefix('menu-icon') })}
        {title}
        <Ripple />
      </Component>
    </TreeviewItemContext.Provider>
  );
});

TreeviewItem.displayName = 'Treeview.Item';
TreeviewItem.defaultProps = defaultProps;
TreeviewItem.propTypes = {
  as: PropTypes.elementType,
  divider: PropTypes.bool,
  panel: PropTypes.bool,
  expanded: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  submenu: PropTypes.element,
  onSelect: PropTypes.func,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  eventKey: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  tabIndex: PropTypes.number,
  title: PropTypes.node,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func
};

export default TreeviewItem;
