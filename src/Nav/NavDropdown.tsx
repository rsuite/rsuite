import React, { useContext, useMemo, useReducer } from 'react';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import Menu, { MenuButtonTrigger } from '@/internals/Menu/Menu';
import kebabCase from 'lodash/kebabCase';
import NavContext from './NavContext';
import NavDropdownItem from './NavDropdownItem';
import NavDropdownMenu from './NavDropdownMenu';
import NavDropdownToggle, { NavDropdownToggleProps } from './NavDropdownToggle';
import { useClassNames } from '@/internals/hooks';
import { forwardRef, mergeRefs, placementPolyfill } from '@/internals/utils';
import { initialState, reducer } from '../Dropdown/DropdownState';
import type { PlacementCorners, WithAsProps } from '@/internals/types';

export type NavDropdownTrigger = 'click' | 'hover' | 'contextMenu';

export interface NavDropdownProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'onToggle' | 'title'> {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /** Set the icon */
  icon?: NavDropdownToggleProps['icon'];

  /** Triggering events */
  trigger?: NavDropdownTrigger | readonly NavDropdownTrigger[];

  /** The placement of Menu */
  placement?: PlacementCorners;

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
  noCaret?: NavDropdownToggleProps['noCaret'];

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
 * @private this component is not supposed to be used directly
 *          Instead it's rendered by a `<Nav.Menu>` call
 *
 * @example
 * <Nav>
 *   <Nav.Menu> -> This will render <NavDropdown> component
 *   </Nav.Menu>
 * </Nav>
 */
const NavDropdown = forwardRef<'div', NavDropdownProps, typeof Subcomponents>((props, ref) => {
  const nav = useContext(NavContext);

  if (!nav) {
    throw new Error('<Nav.Dropdown> must be rendered within a <Nav> component.');
  }

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
  } = props;

  const { merge, withClassPrefix } = useClassNames(classPrefix);

  const { withClassPrefix: withMenuClassPrefix, merge: mergeMenuClassName } =
    useClassNames('dropdown-menu');

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
      return [triggerMap[trigger as NavDropdownTrigger]];
    }

    return trigger.map(t => triggerMap[t]);
  }, [trigger]);

  const [{ items }] = useReducer(reducer, initialState);

  const hasSelectedItem = useMemo(() => {
    return items.some(item => item.props.selected);
  }, [items]);

  const renderMenuButton = (menuButtonProps, menuButtonRef) => (
    <NavDropdownToggle
      ref={menuButtonRef}
      as={toggleAs}
      className={toggleClassName}
      placement={placement}
      disabled={disabled}
      {...omit(menuButtonProps, ['open'])}
      {...omit(toggleProps, ['data-testid'])}
    >
      {title}
    </NavDropdownToggle>
  );

  return (
    <Menu
      renderMenuButton={renderMenuButton}
      openMenuOn={menuButtonTriggers}
      renderMenuPopup={({ open, ...popupProps }, popupRef) => {
        const menuClassName = mergeMenuClassName(className, withMenuClassPrefix());

        return (
          <ul
            ref={popupRef}
            className={menuClassName}
            style={menuStyle}
            hidden={!open}
            {...popupProps}
          >
            {children}
          </ul>
        );
      }}
      onToggleMenu={(open, event) => {
        onToggle?.(open, eventKey, event);
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
  );
}, Subcomponents);

NavDropdown.displayName = 'Nav.Dropdown';

export default NavDropdown;
