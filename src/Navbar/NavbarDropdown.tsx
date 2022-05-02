import React, { useCallback, useContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { mergeRefs, PLACEMENT_8, placementPolyfill, useClassNames } from '../utils';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import deprecatePropType from '../utils/deprecatePropType';
import DropdownContext, { DropdownContextProps } from '../Dropdown/DropdownContext';
import DropdownToggle from '../Dropdown/DropdownToggle';
import { initialState, reducer } from '../Dropdown/DropdownState';
import kebabCase from 'lodash/kebabCase';
import { NavbarContext } from '.';
import Disclosure from '../Disclosure/Disclosure';
import Button from '../Button';
import NavContext, { NavContextProps } from '../Nav/NavContext';
import NavDropdownItem from '../Nav/NavDropdownItem';
import NavDropdownMenu from '../Nav/NavDropdownMenu';

export type NavbarDropdownTrigger = 'click' | 'hover' | 'contextMenu';
export interface NavbarDropdownProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'title'> {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** The option to activate the state, corresponding to the eventkey in the Dropdown.item */
  activeKey?: T;

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

  /** Selected callback function */
  onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
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
    const { activeKey, onSelect: onSelectProp, ...rest } = props;

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
    } = rest;

    const navbar = useContext(NavbarContext);

    if (!navbar) {
      throw new Error('<Navbar.Dropdown> should be used within a <Navbar> component.');
    }

    const { onSelect: onSelectFromNav } = useContext(NavContext) as NavContextProps;

    const emitSelect = useCallback(
      (eventKey: string | undefined, event: React.SyntheticEvent) => {
        onSelectProp?.(eventKey, event);
        onSelectFromNav?.(eventKey, event);
      },
      [onSelectProp, onSelectFromNav]
    );

    const { merge, withClassPrefix } = useClassNames(classPrefix);

    const { withClassPrefix: withMenuClassPrefix, merge: mergeMenuClassName } =
      useClassNames('dropdown-menu');

    const [{ items }, dispatch] = useReducer(reducer, initialState);

    const hasSelectedItem = useMemo(() => {
      return items.some(item => item.props.selected);
    }, [items]);

    const dropdownContextValue = useMemo<DropdownContextProps>(() => {
      return { activeKey, onSelect: emitSelect, hasSelectedItem, dispatch };
    }, [activeKey, emitSelect, hasSelectedItem, dispatch]);

    return (
      <DropdownContext.Provider value={dropdownContextValue}>
        <Disclosure
          trigger={trigger as any}
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
) as unknown as NavbarDropdownComponent;

NavbarDropdown.Item = NavDropdownItem;
NavbarDropdown.Menu = NavDropdownMenu;

NavbarDropdown.displayName = 'Navbar.Dropdown';
NavbarDropdown.propTypes = {
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

export default NavbarDropdown;
