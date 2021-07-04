import React, { useContext, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import DropdownToggle from '../Dropdown/DropdownToggle';
import { useClassNames, placementPolyfill, PLACEMENT_8 } from '../utils';
import { SidenavContext } from './Sidenav';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import useUniqueId from '../utils/useUniqueId';
import deprecatePropType from '../utils/deprecatePropType';
import SafeAnchor from '../SafeAnchor';
import Ripple from '../Ripple';
import TreeviewItemGroup from './TreeviewItemGroup';
import TreeviewItemContext from './TreeviewItemContext';
import TreeControlContext from './TreeControlContext';
import useEnsuredRef from '../utils/useEnsuredRef';

export interface TreeviewRootItemProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'title'> {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** The option to activate the state, corresponding to the eventkey in the Dropdown.item */
  activeKey?: T;

  /** The placement of Menu */
  placement?: TypeAttributes.Placement8;

  /** Whether or not component is disabled */
  disabled?: boolean;

  /** The style of the menu */
  menuStyle?: React.CSSProperties;

  /** A css class to apply to the Toggle DOM node */
  toggleClassName?: string;

  /** The value of the current option */
  eventKey?: T;

  /** You can use a custom element type for this toggle component */
  toggleAs?: React.ElementType;

  /** No caret variation */
  noCaret?: boolean;

  /**
   * Open the menu and control it
   * @deprecated
   */
  open?: boolean;

  /** Custom title */
  renderTitle?: (children?: React.ReactNode) => React.ReactNode;

  /** The callback function that the menu closes */
  onClose?: () => void;

  /** Menu Pop-up callback function */
  onOpen?: () => void;

  /** Callback function for menu state switching */
  onToggle?: (open?: boolean) => void;

  /** Selected callback function */
  onSelect?: (eventKey: T, event: React.MouseEvent<HTMLElement>) => void;

  divider?: boolean;

  panel?: boolean;
}

const defaultProps: Partial<TreeviewRootItemProps> = {
  as: 'div',
  classPrefix: 'dropdown',
  placement: 'bottomStart',
  tabIndex: 0
};

/**
 * TODO Merge into <TreeviewItem>
 */
const TreeviewRootItem: RsRefForwardingComponent<'li', TreeviewRootItemProps> = React.forwardRef<
  HTMLLIElement,
  TreeviewRootItemProps
>((props: TreeviewRootItemProps, ref) => {
  const {
    as: Component,
    title,
    children,
    className,
    menuStyle,
    disabled,
    renderTitle,
    classPrefix,
    placement,
    toggleClassName,
    icon,
    eventKey,
    toggleAs,
    noCaret,
    style,
    onClick,
    onSelect: onSelectProp,
    onOpen,
    onClose,
    open,
    divider,
    panel,
    onToggle,
    ...rest
  } = props;

  const { openKeys = [], activeKey, onOpenChange, onSelect: onSelectFromSidenav } = useContext(
    SidenavContext
  );
  const treeControl = useContext(TreeControlContext);

  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);

  // treeitem ARIA attributes and properties/states
  const isParentNode = !!children;

  const treeitemRef = useEnsuredRef<HTMLLIElement>(ref);
  const treeitemId = useUniqueId('treeitem-');
  const treeitemExpanded =
    treeControl.expandedNodeIds.includes(rest.id ?? treeitemId) || openKeys.includes(eventKey);
  const treeitemSelected =
    treeControl.selectedNodeIds.includes(rest.id ?? treeitemId) ||
    (eventKey && activeKey === eventKey);
  const treeitemHasFocus = treeControl.activeDescendantId === treeitemId;

  // Only used in treeitem that has child treeitems
  const treeitemInnerRef = useRef<HTMLElement>();

  const handleToggle = useCallback(
    (isOpen?: boolean) => {
      const nextOpen = typeof isOpen === 'undefined' ? !open : isOpen;
      const fn = nextOpen ? onOpen : onClose;

      fn?.();
      onToggle?.(nextOpen);
    },
    [onClose, onOpen, onToggle, open]
  );

  const handleToggleChange = useCallback(
    (eventKey: any, event: React.SyntheticEvent<any>) => {
      onOpenChange?.(eventKey, event);
    },
    [onOpenChange]
  );

  const handleClickTreeitem = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (event.target !== treeitemRef.current && event.target !== treeitemInnerRef.current) {
        return;
      }
      if (disabled) {
        return;
      }
      if (isParentNode) {
        handleToggle();
        onOpenChange?.(eventKey, event);
      }

      onSelectFromSidenav?.(eventKey, event);
      onClick?.(event);
    },
    [
      treeitemRef,
      disabled,
      isParentNode,
      handleToggle,
      onSelectFromSidenav,
      onOpenChange,
      eventKey,
      onClick
    ]
  );

  // fixme onSelectProp and onSelectFromSidenav should be able to called both (if exists)
  const onSelect = onSelectProp ?? onSelectFromSidenav;

  const handleSelect = (eventKey: any, event: React.MouseEvent<HTMLElement>) => {
    onSelect?.(eventKey, event);
    handleToggle(false);
  };

  const classes = merge(
    className,
    withClassPrefix({
      [`placement-${kebabCase(placementPolyfill(placement))}`]: placement,
      [treeitemExpanded ? 'expand' : 'collapse']: true,
      disabled,
      open,
      'no-caret': noCaret,
      focus: treeitemHasFocus
    })
  );

  const treeitemAriaAttributes: React.HTMLAttributes<HTMLElement> = {
    role: 'treeitem',
    'aria-level': 1,
    'aria-selected': treeitemSelected ? true : undefined // `aria-selected` should not be present on non-selected nodes
  };

  const { registerNode, unregisterNode } = treeControl;

  useEffect(() => {
    const treeitem = treeitemRef.current;

    if (!divider && !panel) {
      registerNode(treeitem, null, { eventKey });
    }

    return () => {
      unregisterNode(treeitem.id);
    };
  }, [treeitemRef, registerNode, unregisterNode, eventKey, divider, panel]);

  if (!isParentNode) {
    const { active, ...extraAttributes } = rest as any;

    const classes = merge(
      className,
      withClassPrefix({ active, disabled, focus: treeitemHasFocus })
    );

    if (divider) {
      return (
        <li
          ref={treeitemRef}
          role="separator"
          style={style}
          className={merge(className, prefix('divider'))}
          {...extraAttributes}
        />
      );
    }

    if (panel) {
      return (
        <li
          ref={treeitemRef}
          role="none presentation"
          style={style}
          className={merge(className, prefix('panel'))}
          {...extraAttributes}
        >
          {title}
        </li>
      );
    }

    const item = (
      <Component
        ref={treeitemRef}
        id={treeitemId}
        aria-selected={active}
        data-event-key={eventKey}
        {...extraAttributes}
        tabIndex={-1}
        disabled={Component === SafeAnchor ? disabled : null}
        className={classes}
        onClick={handleClickTreeitem}
        style={style}
        {...treeitemAriaAttributes}
      >
        {icon}
        {title}
        <Ripple />
      </Component>
    );

    return (
      <TreeviewItemContext.Provider
        value={{
          id: rest.id ?? treeitemId,
          level: 1
        }}
      >
        {item}
      </TreeviewItemContext.Provider>
    );
  }

  treeitemAriaAttributes['aria-expanded'] = treeitemExpanded;
  return (
    <TreeviewItemContext.Provider
      value={{
        id: rest.id ?? treeitemId,
        level: 1
      }}
    >
      <Component
        ref={treeitemRef}
        id={treeitemId}
        style={style}
        className={classes}
        {...rest}
        tabIndex={-1}
        {...treeitemAriaAttributes}
        onClick={handleClickTreeitem}
        data-event-key={eventKey}
      >
        <DropdownToggle
          ref={treeitemInnerRef}
          role="button"
          tabIndex={-1}
          as={renderTitle ? 'span' : toggleAs}
          noCaret={noCaret}
          className={toggleClassName}
          renderTitle={renderTitle}
          icon={icon}
          placement={placement}
          inSidenav
          onClick={handleClickTreeitem}
        >
          {title}
        </DropdownToggle>
        <TreeviewItemGroup
          expanded={treeitemExpanded}
          style={menuStyle}
          onSelect={handleSelect as any}
          onToggle={handleToggleChange}
        >
          {children}
        </TreeviewItemGroup>
      </Component>
    </TreeviewItemContext.Provider>
  );
});

TreeviewRootItem.displayName = 'Treeview.Item';
TreeviewRootItem.defaultProps = defaultProps;
TreeviewRootItem.propTypes = {
  activeKey: PropTypes.any,
  classPrefix: PropTypes.string,
  placement: PropTypes.oneOf(PLACEMENT_8),
  title: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  menuStyle: PropTypes.object,
  className: PropTypes.string,
  toggleClassName: PropTypes.string,
  children: PropTypes.node,
  tabIndex: PropTypes.number,
  open: deprecatePropType(PropTypes.bool),
  eventKey: PropTypes.any,
  as: PropTypes.elementType,
  toggleAs: PropTypes.elementType,
  noCaret: PropTypes.bool,
  style: PropTypes.object,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onContextMenu: PropTypes.func,
  onClick: PropTypes.func,
  renderTitle: PropTypes.func
};

export default TreeviewRootItem;
