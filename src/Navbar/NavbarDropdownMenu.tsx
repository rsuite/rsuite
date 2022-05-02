import React, { useContext, useMemo } from 'react';
import omit from 'lodash/omit';
import { mergeRefs, useClassNames } from '../utils';
import PropTypes from 'prop-types';
import { StandardProps } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import AngleLeft from '@rsuite/icons/legacy/AngleLeft';
import AngleRight from '@rsuite/icons/legacy/AngleRight';
import useCustom from '../utils/useCustom';
import DropdownContext from '../Dropdown/DropdownContext';
import { NavbarContext } from '.';
import Menubar from '../Menu/Menubar';
import Disclosure from '../Disclosure';
import NavContext from '../Nav/NavContext';

export interface NavbarDropdownMenuProps<T = any> extends StandardProps {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /** The submenu expands from the left and defaults to the right */
  pullLeft?: boolean;

  /**
   *  Only used for setting the default expand state when it's a submenu.
   */
  eventKey?: T;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  open?: boolean;
  collapsible?: boolean;
  expanded?: boolean;
  active?: boolean;
  disabled?: boolean;
  activeKey?: T;
  onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
  onToggle?: (open: boolean, eventKey?: T | undefined, event?: React.SyntheticEvent) => void;
}

/**
 * @private
 */
const NavbarDropdownMenu = React.forwardRef<
  HTMLElement,
  NavbarDropdownMenuProps & Omit<React.HTMLAttributes<HTMLUListElement>, 'title' | 'onSelect'>
>((props, ref) => {
  const {
    onToggle,
    eventKey,
    title,
    activeKey,
    onSelect,
    classPrefix = 'dropdown-menu',
    children,
    ...rest
  } = props;

  const nav = useContext(NavContext);

  if (!nav) {
    throw new Error('<Nav.Dropdown.Menu> should be used within a <Nav> component.');
  }

  const dropdown = useContext(DropdownContext);
  const withinNavbar = Boolean(useContext(NavbarContext));
  const { rtl } = useCustom('DropdownMenu');

  const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);

  const { withClassPrefix: withMenuClassPrefix, merge: mergeMenuClassName } =
    useClassNames('dropdown-menu');

  const {
    merge: mergeItemClassNames,
    withClassPrefix: withItemClassPrefix,
    prefix: prefixItemClassName
  } = useClassNames('dropdown-item');

  const contextValue = useMemo(() => ({ activeKey, onSelect }), [activeKey, onSelect]);

  // <Dropdown.Menu> is used outside of <Dropdown>
  // renders a vertical `menubar`
  if (!dropdown) {
    const classes = merge(props.className, withClassPrefix());

    return (
      <DropdownContext.Provider value={contextValue}>
        <Menubar vertical>
          {(menubar, menubarRef: React.Ref<HTMLElement>) => (
            <ul ref={mergeRefs(menubarRef, ref)} className={classes} {...menubar} {...rest}>
              {children}
            </ul>
          )}
        </Menubar>
      </DropdownContext.Provider>
    );
  }

  // Parent menu exists. This is a submenu.
  // Should render a `menuitem` that controls this submenu.
  const { icon, className, disabled, ...menuProps } = omit(rest, ['trigger']);

  const Icon = rtl ? AngleLeft : AngleRight;

  // Renders a disclosure when used within <Navbar>
  if (!withinNavbar) {
    throw new Error('<Navbar.Dropdown.Menu> should be used within a <Navbar> component.');
  }

  return (
    <Disclosure
      hideOnClickOutside
      trigger={['click', 'mouseover']}
      onToggle={(open, event) => onToggle?.(open, undefined, event)}
    >
      {({ open, ...props }, containerRef: React.Ref<HTMLElement>) => {
        const classes = mergeItemClassNames(
          className,
          withItemClassPrefix({
            disabled,
            open,
            submenu: true
          })
        );
        return (
          <li ref={mergeRefs(ref, containerRef)} className={classes} {...props}>
            <Disclosure.Button>
              {({ open, ...buttonProps }, buttonRef: React.Ref<HTMLElement>) => {
                const classes = mergeItemClassNames(
                  className,
                  prefixItemClassName`toggle`,
                  withItemClassPrefix({
                    'with-icon': icon,
                    open,
                    disabled
                  })
                );

                return (
                  <div
                    ref={mergeRefs(buttonRef, buttonRef as any)}
                    className={classes}
                    data-event-key={eventKey}
                    data-event-key-type={typeof eventKey}
                    {...buttonProps}
                  >
                    {icon && React.cloneElement(icon, { className: prefix('menu-icon') })}
                    {title}
                    <Icon className={prefix`toggle-icon`} />
                  </div>
                );
              }}
            </Disclosure.Button>
            <Disclosure.Content>
              {({ open }, elementRef) => {
                const menuClassName = mergeMenuClassName(className, withMenuClassPrefix());

                return (
                  <ul
                    ref={elementRef as any}
                    className={menuClassName}
                    hidden={!open}
                    {...menuProps}
                  >
                    {children}
                  </ul>
                );
              }}
            </Disclosure.Content>
          </li>
        );
      }}
    </Disclosure>
  );
});

NavbarDropdownMenu.displayName = 'Nav.Dropdown.Menu';
NavbarDropdownMenu.propTypes = {
  active: PropTypes.bool,
  activeKey: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.any,
  classPrefix: PropTypes.string,
  pullLeft: PropTypes.bool,
  title: PropTypes.node,
  open: PropTypes.bool,
  eventKey: PropTypes.any,
  expanded: PropTypes.bool,
  collapsible: PropTypes.bool,
  onSelect: PropTypes.func,
  onToggle: PropTypes.func
};

export default NavbarDropdownMenu;
