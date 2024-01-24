import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import castArray from 'lodash/castArray';
import omit from 'lodash/omit';
import { mergeRefs, PLACEMENT_8, placementPolyfill, useClassNames } from '../utils';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import { deprecatePropType, oneOf } from '../internals/propTypes';
import kebabCase from 'lodash/kebabCase';
import { NavbarContext } from '.';
import Disclosure, { DisclosureTrigger } from '../internals/Disclosure/Disclosure';
import Button from '../Button';
import NavDropdownItem from '../Nav/NavDropdownItem';
import NavDropdownMenu from '../Nav/NavDropdownMenu';
import NavbarDropdownToggle from './NavbarDropdownToggle';

export type NavbarDropdownTrigger = 'click' | 'hover' | 'contextMenu';
export interface NavbarDropdownProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'title'> {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** Triggering events */
  trigger?: NavbarDropdownTrigger | readonly NavbarDropdownTrigger[];

  /** The placement of Menu */
  placement?: TypeAttributes.Placement8;

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

export interface NavbarDropdownComponent
  extends RsRefForwardingComponent<'div', NavbarDropdownProps> {
  // Infer toggleAs props
  <ToggleAs extends React.ElementType = typeof Button>(
    props: NavbarDropdownProps & {
      ref?: React.Ref<any>;
      toggleAs?: ToggleAs;
    } & React.ComponentProps<ToggleAs>,
    context: any
  ): JSX.Element | null;

  Item: typeof NavDropdownItem;
  Menu: typeof NavDropdownMenu;
}

/**
 * @private
 */
const NavbarDropdown: NavbarDropdownComponent = React.forwardRef<HTMLElement>(
  (props: NavbarDropdownProps, ref) => {
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
  }
) as unknown as NavbarDropdownComponent;

NavbarDropdown.Item = NavDropdownItem;
NavbarDropdown.Menu = NavDropdownMenu;

NavbarDropdown.displayName = 'Navbar.Dropdown';
NavbarDropdown.propTypes = {
  classPrefix: PropTypes.string,
  trigger: PropTypes.oneOfType([PropTypes.array, oneOf(['click', 'hover', 'contextMenu'])]),
  placement: oneOf(PLACEMENT_8),
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
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onContextMenu: PropTypes.func,
  onClick: PropTypes.func,
  renderToggle: PropTypes.func
};

export default NavbarDropdown;
