import React, { useContext } from 'react';
import castArray from 'lodash/castArray';
import omit from 'lodash/omit';
import kebabCase from 'lodash/kebabCase';
import Disclosure, { DisclosureTrigger } from '@/internals/Disclosure/Disclosure';
import NavDropdownItem from '../Nav/NavDropdownItem';
import NavDropdownMenu from '../Nav/NavDropdownMenu';
import NavbarDropdownToggle from './NavbarDropdownToggle';
import { useClassNames } from '@/internals/hooks';
import { forwardRef, mergeRefs, placementPolyfill } from '@/internals/utils';
import { NavbarContext } from './NavbarContext';
import type { PlacementCorners, WithAsProps } from '@/internals/types';
import type { IconProps } from '@rsuite/icons/Icon';

export type NavbarDropdownTrigger = 'click' | 'hover' | 'contextMenu';
export interface NavbarDropdownProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'onToggle' | 'title'> {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** Triggering events */
  trigger?: NavbarDropdownTrigger | readonly NavbarDropdownTrigger[];

  /** The placement of Menu */
  placement?: PlacementCorners;

  /** Whether or not component is disabled */
  disabled?: boolean;

  /** The style of the menu */
  menuStyle?: React.CSSProperties;

  /** A css class to apply to the Toggle DOM node */
  toggleClassName?: string;

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
  onToggle?: (open: boolean, eventKey?: T | undefined, event?: React.SyntheticEvent) => void;
}

const Subcomponents = {
  Item: NavDropdownItem,
  Menu: NavDropdownMenu
};

/**
 * @private
 */
const NavbarDropdown = forwardRef<'div', NavbarDropdownProps, typeof Subcomponents>(
  (props, ref) => {
    const navbar = useContext(NavbarContext);

    if (!navbar) {
      throw new Error('<Navbar.Dropdown> should be used within a <Navbar> component.');
    }

    const {
      as: Component = 'div',
      title,
      onClose,
      onOpen,
      onToggle,
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
    } = props;

    const { merge, withClassPrefix } = useClassNames(classPrefix);

    const { withClassPrefix: withMenuClassPrefix, merge: mergeMenuClassName } =
      useClassNames('dropdown-menu');

    return (
      <Disclosure
        trigger={castArray(trigger) as DisclosureTrigger[]}
        hideOnClickOutside
        onToggle={open => {
          onToggle?.(open);
          if (open) {
            onOpen?.();
          } else {
            onClose?.();
          }
        }}
      >
        {({ open, ...props }, containerRef: React.Ref<HTMLElement>) => {
          const classes = merge(
            className,
            withClassPrefix({
              [`placement-${kebabCase(placementPolyfill(placement))}`]: !!placement,
              disabled,
              open
            })
          );
          return (
            <Component
              ref={mergeRefs(ref, containerRef)}
              className={classes}
              style={style}
              {...props}
            >
              <Disclosure.Button>
                {(buttonProps, buttonRef) => (
                  <NavbarDropdownToggle
                    ref={buttonRef}
                    as={toggleAs}
                    className={toggleClassName}
                    placement={placement}
                    disabled={disabled}
                    {...omit(buttonProps, ['open'])}
                    {...toggleProps}
                  >
                    {title}
                  </NavbarDropdownToggle>
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
    );
  },
  Subcomponents
);

NavbarDropdown.displayName = 'Navbar.Dropdown';

export default NavbarDropdown;
