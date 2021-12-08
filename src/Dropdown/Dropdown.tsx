import React, { useCallback, useContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import DropdownMenu from './DropdownMenu';
import { mergeRefs, PLACEMENT_8, placementPolyfill, useClassNames } from '../utils';
import { SidenavContext } from '../Sidenav/Sidenav';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import deprecatePropType from '../utils/deprecatePropType';
import DropdownItem from './DropdownItem';
import DropdownContext, { DropdownContextProps } from './DropdownContext';
import Menu, { MenuButtonTrigger } from '../Menu/Menu';
import DropdownToggle from './DropdownToggle';
import MenuContext from '../Menu/MenuContext';
import MenuItem from '../Menu/MenuItem';
import kebabCase from 'lodash/kebabCase';
import { NavbarContext } from '../Navbar/Navbar';
import Disclosure from '../Disclosure/Disclosure';
import SidenavDropdown from '../Sidenav/SidenavDropdown';
import NavContext from '../Nav/NavContext';
import { initialState, reducer } from './DropdownState';

export type DropdownTrigger = 'click' | 'hover' | 'contextMenu';
export interface DropdownProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'title'> {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** The option to activate the state, corresponding to the eventkey in the Dropdown.item */
  activeKey?: T;

  /** Triggering events */
  trigger?: DropdownTrigger | DropdownTrigger[];

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

  /**
   * @deprecated
   */
  renderTitle?: (children: React.ReactNode) => React.ReactNode;

  /** Custom Toggle */
  renderToggle?: (props: WithAsProps, ref: React.Ref<any>) => any;

  /** The callback function that the menu closes */
  onClose?: () => void;

  /** Menu Pop-up callback function */
  onOpen?: () => void;

  /** Callback function for menu state switching */
  onToggle?: (open?: boolean) => void;

  /** Selected callback function */
  onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}

export interface DropdownComponent extends RsRefForwardingComponent<'div', DropdownProps> {
  Item: typeof DropdownItem;
  Menu: typeof DropdownMenu;
}

/**
 * The <Dropdown> API
 * When used inside <Sidenav>, renders a <TreeviewRootItem>;
 * Otherwise renders a <MenuRoot>
 */
const Dropdown: DropdownComponent = React.forwardRef<HTMLElement>((props: DropdownProps, ref) => {
  const { activeKey, onSelect: onSelectProp, ...rest } = props;

  const {
    as: Component = 'div',
    title,
    onClose,
    onOpen,
    onToggle,
    eventKey,
    trigger = 'click',
    placement = 'bottomStart',
    toggleAs,
    toggleClassName,
    classPrefix = 'dropdown',
    className,
    disabled,
    children,
    menuStyle,
    style,
    ...toggleProps
  } = rest;

  const { onSelect: onSelectFromNav } = useContext(NavContext);

  const emitSelect = useCallback(
    (eventKey: string | undefined, event: React.SyntheticEvent) => {
      onSelectProp?.(eventKey, event);

      // If <Dropdown> is inside <Nav>, also trigger `onSelect` on <Nav>
      onSelectFromNav?.(eventKey, event);
    },
    [onSelectProp, onSelectFromNav]
  );

  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);

  const { withClassPrefix: withMenuClassPrefix, merge: mergeMenuClassName } =
    useClassNames('dropdown-menu');

  const { withClassPrefix: withNavItemClassPrefix, merge: mergeNavItemClassNames } =
    useClassNames('nav-item');

  const menuButtonTriggers = useMemo<MenuButtonTrigger[] | undefined>(() => {
    if (!trigger) {
      return undefined;
    }

    const triggerMap: { [key: string]: MenuButtonTrigger } = {
      hover: 'mouseover',
      click: 'click',
      contextMenu: 'contextmenu'
    };

    if (!Array.isArray(trigger)) {
      return [triggerMap[trigger]];
    }

    return trigger.map(t => triggerMap[t]);
  }, [trigger]);

  const parentMenu = useContext(MenuContext);

  const sidenav = useContext(SidenavContext);
  const navbar = useContext(NavbarContext);

  const [{ items }, dispatch] = useReducer(reducer, initialState);

  const hasSelectedItem = useMemo(() => {
    return items.some(item => item.props.selected);
  }, [items]);

  const dropdownContextValue = useMemo<DropdownContextProps>(() => {
    return { activeKey, onSelect: emitSelect, hasSelectedItem, dispatch };
  }, [activeKey, emitSelect, hasSelectedItem, dispatch]);

  // Render a disclosure when inside expanded <Sidenav>
  if (sidenav?.expanded) {
    return (
      <DropdownContext.Provider value={dropdownContextValue}>
        <SidenavDropdown ref={ref} {...rest} />
      </DropdownContext.Provider>
    );
  }

  // Renders a disclosure when used inside <Navbar>
  if (navbar) {
    return (
      <DropdownContext.Provider value={dropdownContextValue}>
        <Disclosure hideOnClickOutside>
          {({ open }, containerRef: React.Ref<HTMLElement>) => {
            const classes = merge(
              className,
              withClassPrefix({
                [`placement-${kebabCase(placementPolyfill(placement))}`]: !!placement,
                disabled,
                open
                // focus: hasFocus
              })
            );
            return (
              <Component ref={mergeRefs(ref, containerRef)} className={classes} style={style}>
                <Disclosure.Button>
                  {(buttonProps, buttonRef) => (
                    <DropdownToggle
                      ref={buttonRef}
                      as={toggleAs}
                      className={toggleClassName}
                      placement={placement}
                      disabled={disabled}
                      {...omit(buttonProps, ['open'])}
                      {...toggleProps}
                    >
                      {title}
                    </DropdownToggle>
                  )}
                </Disclosure.Button>
                <Disclosure.Content>
                  {({ open }, elementRef) => {
                    const menuClassName = mergeMenuClassName(className, withMenuClassPrefix());
                    return (
                      <ul
                        ref={elementRef as any}
                        className={menuClassName}
                        style={menuStyle}
                        hidden={!open}
                      >
                        {children}
                      </ul>
                    );
                  }}
                </Disclosure.Content>
              </Component>
            );
          }}
        </Disclosure>
      </DropdownContext.Provider>
    );
  }

  let renderMenuButton = (menuButtonProps, menuButtonRef) => (
    <DropdownToggle
      ref={menuButtonRef}
      as={toggleAs}
      className={toggleClassName}
      placement={placement}
      disabled={disabled}
      {...omit(menuButtonProps, ['open'])}
      {...omit(toggleProps, ['data-testid'])}
    >
      {title}
    </DropdownToggle>
  );

  if (parentMenu) {
    renderMenuButton = (menuButtonProps, buttonRef) => (
      <MenuItem disabled={disabled}>
        {({ active, ...menuitemProps }, menuitemRef) => {
          return (
            <DropdownToggle
              ref={mergeRefs(buttonRef, menuitemRef)}
              as={toggleAs}
              className={mergeNavItemClassNames(
                toggleClassName,
                withNavItemClassPrefix({
                  focus: active
                })
              )}
              {...menuButtonProps}
              {...omit(menuitemProps, ['onClick'])}
              {...omit(toggleProps, 'data-testid')}
            >
              {title}
            </DropdownToggle>
          );
        }}
      </MenuItem>
    );
  }

  return (
    <DropdownContext.Provider value={dropdownContextValue}>
      <Menu
        menuButtonText={title}
        renderMenuButton={renderMenuButton}
        openMenuOn={menuButtonTriggers}
        renderMenuPopup={({ open, ...popupProps }, popupRef) => {
          const menuClassName = mergeMenuClassName(className, withMenuClassPrefix({}));
          // When inside a collapsed <Sidenav>, render a header in menu
          const showHeader = !!sidenav;

          return (
            <ul
              ref={popupRef}
              className={menuClassName}
              style={menuStyle}
              hidden={!open}
              {...popupProps}
            >
              {showHeader && <div className={prefix('header')}>{title}</div>}
              {children}
            </ul>
          );
        }}
        onToggleMenu={(open, event) => {
          onToggle?.(open);
          sidenav?.onOpenChange(eventKey, event);
          if (open) {
            onOpen?.();
          } else {
            onClose?.();
          }
        }}
      >
        {({ open, ...menuContainer }, menuContainerRef: React.Ref<HTMLElement>) => {
          const classes = merge(
            className,
            withClassPrefix({
              [`placement-${kebabCase(placementPolyfill(placement))}`]: !!placement,
              disabled,
              open,
              submenu: !!parentMenu,
              'selected-within': hasSelectedItem
            })
          );
          return (
            <Component
              ref={mergeRefs(ref, menuContainerRef)}
              className={classes}
              {...menuContainer}
              {...pick(toggleProps, ['data-testid'])}
              style={style}
            />
          );
        }}
      </Menu>
    </DropdownContext.Provider>
  );
}) as unknown as DropdownComponent;

Dropdown.Item = DropdownItem;
Dropdown.Menu = DropdownMenu;

Dropdown.displayName = 'Dropdown';
Dropdown.propTypes = {
  activeKey: PropTypes.any,
  classPrefix: PropTypes.string,
  trigger: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.oneOf(['click', 'hover', 'contextMenu'])
  ]),
  placement: PropTypes.oneOf(PLACEMENT_8),
  title: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  menuStyle: PropTypes.object,
  className: PropTypes.string,
  toggleClassName: PropTypes.string,
  children: PropTypes.node,
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
  renderToggle: PropTypes.func
};

export default Dropdown;
