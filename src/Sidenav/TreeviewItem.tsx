import React, { useCallback, useContext, useEffect, useRef } from 'react';
import TreeviewItemContext from './TreeviewItemContext';
import useUniqueId from '../utils/useUniqueId';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { createChainedFunction, isOneOf, useClassNames } from '../utils';
import useEnsuredRef from '../utils/useEnsuredRef';
import MenuControlContext from '../Dropdown/MenuControlContext';
import useMenuControl from '../Dropdown/useMenuControl';
import { SidenavContext } from './Sidenav';
import useCustom from '../utils/useCustom';
import AngleLeft from '@rsuite/icons/legacy/AngleLeft';
import AngleRight from '@rsuite/icons/legacy/AngleRight';
import PropTypes from 'prop-types';
import deprecatePropType from '../utils/deprecatePropType';
import { IconProps } from '@rsuite/icons/lib/Icon';
import TreeviewItemGroup from './TreeviewItemGroup';
import TreeControlContext from './TreeControlContext';

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

  /**
   * The sub-level menu appears from the right side by default, and when `pullLeft` is set, it appears from the left.
   * @deprecated Submenus are now pointing the same direction.
   */
  pullLeft?: boolean;

  /** Triggering event for submenu expansion. */
  trigger?: 'hover' | 'click';

  /**
   * Whether the submenu is opened.
   * @deprecated
   * @internal
   */
  open?: boolean;

  /** Whether the submenu is expanded, used in Sidenav. */
  expanded?: boolean;

  /** Select the callback function for the current option  */
  onSelect?: (eventKey: T, event: React.SyntheticEvent<HTMLElement>) => void;

  title?: React.ReactNode;
}

const defaultProps: Partial<TreeviewItemProps> = {
  as: 'li',
  classPrefix: 'dropdown-item',
  trigger: 'hover'
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
    trigger,
    eventKey,
    onClick,
    onMouseOver,
    onMouseOut,
    onSelect,
    ...rest
  } = props;

  const submenu = !!children;

  const parentTreeitem = useContext(TreeviewItemContext);
  const treeControl = useContext(TreeControlContext);

  const isRootNode = !parentTreeitem;
  const isParentNode = !!children;
  const level = isRootNode ? 1 : parentTreeitem.level + 1;

  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);

  const treeitemRef = useEnsuredRef<HTMLLIElement>(ref);
  const treeitemId = useUniqueId('treeitem');
  const submenuRef = useRef<HTMLUListElement>();

  const menuControl = useContext(MenuControlContext);
  const submenuControl = useMenuControl(submenuRef);

  const { sidenav, expanded: sidenavExpanded, openKeys, onOpenChange, onSelect: onSidenavSelect } =
    useContext(SidenavContext) || {};
  const treeitemExpanded = openKeys?.includes(eventKey) ?? false;

  // Whether this treeitem is selected
  const active = false;

  const { rtl } = useCustom('DropdownMenu');

  const classes = merge(
    className,
    withClassPrefix({
      [`pull-${rtl ? 'left' : 'right'}`]: submenu,
      [treeitemExpanded ? 'expand' : 'collapse']: submenu && sidenav,
      'with-icon': icon,
      open: treeitemExpanded,
      submenu,
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
    [disabled, treeitemExpanded, submenu, activate, onSidenavSelect, eventKey]
  );

  const handleMouseOver = useCallback(() => {
    if (submenu) {
      submenuControl.openMenu();
    }
  }, [submenu, submenuControl.openMenu]);

  const handleMouseOut = useCallback(() => {
    if (submenu) {
      submenuControl.closeMenu();
    }
  }, [submenu, submenuControl.closeMenu]);

  const menuitemEventHandlers: React.LiHTMLAttributes<HTMLLIElement> = {
    onClick: createChainedFunction(handleClick, onClick)
  };

  if (isOneOf('hover', trigger) && submenu && !sidenavExpanded) {
    menuitemEventHandlers.onMouseOver = createChainedFunction(handleMouseOver, onMouseOver);
    menuitemEventHandlers.onMouseOut = createChainedFunction(handleMouseOut, onMouseOut);
  }

  useEffect(() => {
    // Don't register separator items and panels
    // They aren't keyboard navigable
    if (!divider && !panel) {
      menuControl?.registerItem(treeitemRef.current, { disabled });
    }
    return () => {
      menuControl?.unregisterItem(treeitemId);
    };
  }, [treeitemId, disabled, divider, panel]);

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
        {props.title}
      </Component>
    );
  }

  const treeitemAriaAttributes: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  > = {
    role: 'treeitem',
    'aria-level': level,
    'aria-disabled': disabled
  };

  if (children) {
    const Icon = rtl ? AngleLeft : AngleRight;

    treeitemAriaAttributes['aria-expanded'] = treeitemExpanded;

    return (
      <TreeviewItemContext.Provider
        value={{
          level
        }}
      >
        <Component
          ref={treeitemRef as any}
          id={treeitemId}
          {...rest}
          tabIndex={disabled ? -1 : tabIndex}
          style={style}
          className={classes}
          {...(treeitemAriaAttributes as any)}
          {...(menuitemEventHandlers as any)}
        >
          <div className={prefix`toggle`} tabIndex={-1}>
            {icon && React.cloneElement(icon, { className: prefix('menu-icon') })}
            <span>{props.title}</span>
            <Icon className={prefix`toggle-icon`} />
          </div>
          <TreeviewItemGroup expanded={treeitemExpanded} collapsible>
            {children}
          </TreeviewItemGroup>
        </Component>
      </TreeviewItemContext.Provider>
    );
  }

  return (
    <TreeviewItemContext.Provider
      value={{
        level
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
        {props.title}
      </Component>
    </TreeviewItemContext.Provider>
  );
});

TreeviewItem.displayName = 'TreeviewItem';
TreeviewItem.defaultProps = defaultProps;
TreeviewItem.propTypes = {
  as: PropTypes.elementType,
  divider: PropTypes.bool,
  panel: PropTypes.bool,
  trigger: PropTypes.oneOfType([PropTypes.array, PropTypes.oneOf(['click', 'hover'])]),
  open: deprecatePropType(PropTypes.bool),
  expanded: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  pullLeft: deprecatePropType(PropTypes.bool),
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
