import React, { useRef, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import {
  createChainedFunction,
  isOneOf,
  useClassNames,
  placementPolyfill,
  PLACEMENT_8,
  useRootClose,
  KEY_VALUES
} from '../utils';
import { SidenavContext, SidenavContextType } from '../Sidenav/Sidenav';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import useUniqueId from '../utils/useUniqueId';
import DropdownContext from './DropdownContext';
import MenuControlContext from './MenuControlContext';
import useMenuControl from './useMenuControl';
import deprecatePropType from '../utils/deprecatePropType';
import DropdownItem from './DropdownItem';
import { NavbarContext } from '../Navbar/Navbar';

export type DropdownTrigger = 'click' | 'hover' | 'contextMenu';
export interface MenuRootProps<T = any>
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
}

export interface DropdownComponent extends RsRefForwardingComponent<'div', MenuRootProps> {
  Item: typeof DropdownItem;
  Menu: typeof DropdownMenu;
}

const defaultProps: Partial<MenuRootProps> = {
  as: 'div',
  classPrefix: 'dropdown',
  placement: 'bottomStart',
  trigger: 'click',
  tabIndex: 0
};

const MenuRoot: DropdownComponent = (React.forwardRef((props: MenuRootProps, ref) => {
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
    activeKey: activeKeyProp,
    toggleClassName,
    trigger,
    icon,
    eventKey,
    toggleAs,
    noCaret,
    style,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onContextMenu,
    onSelect: onSelectProp,
    onOpen,
    onClose,
    onToggle,
    ...rest
  } = props;

  const {
    onOpenChange,
    sidenav,
    expanded: sidenavExpanded,
    activeKey: activeKeyFromSidenav,
    onSelect: onSelectFromSidenav
  } = useContext<SidenavContextType>(SidenavContext) || {};

  const activeKey = activeKeyProp ?? activeKeyFromSidenav;

  const navbar = useContext(NavbarContext);

  const overlayTarget = useRef<HTMLUListElement>();
  const triggerTarget = useRef<HTMLButtonElement>();
  const menuControl = useMenuControl(overlayTarget);

  const open = menuControl.open;
  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);

  const buttonId = useUniqueId(prefix`button-`);
  const menuId = useUniqueId(prefix`menu-`);

  const handleToggle = useCallback(
    (isOpen?: boolean) => {
      const nextOpen = typeof isOpen === 'undefined' ? !open : isOpen;
      const fn = nextOpen ? onOpen : onClose;

      fn?.();
      onToggle?.(nextOpen);
      if (nextOpen) {
        menuControl.openMenu();
      } else {
        menuControl.closeMenu();
      }
    },
    [onClose, onOpen, onToggle, open, menuControl]
  );

  const handleOpenChange = useCallback(
    (event: React.MouseEvent) => {
      onOpenChange?.(eventKey, event);
    },
    [eventKey, onOpenChange]
  );

  const handleToggleChange = useCallback(
    (eventKey: any, event: React.SyntheticEvent<any>) => {
      onOpenChange?.(eventKey, event);
    },
    [onOpenChange]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      if (disabled) {
        return;
      }
      handleToggle();
    },
    [disabled, handleToggle]
  );

  const handleMouseEnter = useCallback(() => {
    if (!disabled) {
      handleToggle(true);
    }
  }, [disabled, handleToggle]);

  const handleMouseLeave = useCallback(() => {
    if (!disabled) {
      handleToggle(false);
    }
  }, [disabled, handleToggle]);

  const onSelect = onSelectProp ?? onSelectFromSidenav;

  const handleSelect = (eventKey: any, event: React.MouseEvent<HTMLElement>) => {
    onSelect?.(eventKey, event);
    handleToggle(false);
  };

  useRootClose(() => handleToggle(), {
    triggerTarget,
    overlayTarget,
    disabled: !open,
    // Don't use global Escape listener
    // Menu implements its own
    listenEscape: false
  });

  const dropdownProps = {
    onMouseEnter,
    onMouseLeave
  };

  /**
   * Keyboard interaction on menu button
   * @see https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-13
   */
  const handleButtonKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      switch (e.key) {
        // Open the menu
        case KEY_VALUES.ENTER:
        case KEY_VALUES.SPACE:
          e.preventDefault();
          e.stopPropagation();
          if (!open) {
            handleToggle(true);
            menuControl.focusItemAt(0);
          } else {
            handleToggle(false);
          }
          break;
        // Open the menu (if closed) and move focus to first item
        // This is mostly useful after opening the menu with click
        case KEY_VALUES.DOWN:
          e.preventDefault();
          e.stopPropagation();
          if (!open) {
            handleToggle(true);
          }
          menuControl.focusItemAt(0);
          break;
      }
    },
    [open, handleToggle, menuControl]
  );

  const buttonEventHandlers = {
    onClick: createChainedFunction(handleOpenChange, onClick),
    onContextMenu,
    onKeyDown: handleButtonKeydown
  };

  /**
   * Bind event of trigger,
   * not used in  in the expanded state of '<Sidenav>'
   */
  if (isOneOf('click', trigger)) {
    buttonEventHandlers.onClick = createChainedFunction(handleClick, buttonEventHandlers.onClick);
  }

  if (isOneOf('contextMenu', trigger)) {
    buttonEventHandlers.onContextMenu = createChainedFunction(handleClick, onContextMenu);
  }

  if (isOneOf('hover', trigger)) {
    dropdownProps.onMouseEnter = createChainedFunction(handleMouseEnter, onMouseEnter);
    dropdownProps.onMouseLeave = createChainedFunction(handleMouseLeave, onMouseLeave);
  }

  // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-14
  const buttonAriaAttributes = {
    role: 'button',
    'aria-haspopup': 'menu',
    'aria-expanded': open || undefined, // it's recommend to remove aria-expanded when menu is hidden
    'aria-controls': menuId
  };

  if (navbar) {
    buttonAriaAttributes.role = 'menuitem';
  }

  const toggleElement = (
    <DropdownToggle
      {...rest}
      {...buttonEventHandlers}
      id={buttonId}
      {...buttonAriaAttributes}
      ref={triggerTarget}
      as={renderTitle ? 'span' : toggleAs}
      noCaret={noCaret}
      className={toggleClassName}
      renderTitle={renderTitle}
      icon={icon}
      placement={placement}
      inSidenav={sidenav}
    >
      {title}
    </DropdownToggle>
  );

  /**
   * Keyboard interaction on menu
   * @see https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-12
   */
  const handleMenuKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLUListElement>) => {
      switch (e.key) {
        // Close the menu
        case KEY_VALUES.ESC:
          e.preventDefault();
          e.stopPropagation();
          handleToggle(false);
          requestAnimationFrame(() => {
            // Move focus back to button
            triggerTarget.current.focus();
          });
          break;
        default:
          break;
      }
    },
    [handleToggle]
  );

  const menuEventHandlers: React.HTMLAttributes<HTMLUListElement> = {
    onKeyDown: handleMenuKeydown
  };

  const menuAriaAttributes: React.HTMLAttributes<HTMLElement> = {
    'aria-labelledby': buttonId
  };

  // Show header when inside a collapsed <Sidenav>
  const showHeader = sidenav && !sidenavExpanded;

  const menuElement = (
    <DropdownMenu
      style={menuStyle}
      onSelect={handleSelect as any}
      onToggle={handleToggleChange}
      activeKey={activeKey}
      ref={overlayTarget}
      hidden={!open}
      {...{ id: menuId, ...menuAriaAttributes }}
      {...menuEventHandlers}
    >
      {showHeader && <li className={prefix('header')}>{title}</li>}
      {children}
    </DropdownMenu>
  );

  const classes = merge(
    className,
    withClassPrefix({
      [`placement-${kebabCase(placementPolyfill(placement))}`]: placement,
      disabled,
      open,
      'no-caret': noCaret
    })
  );

  const rootAriaAttributes: React.HTMLAttributes<HTMLElement> = {};

  if (navbar) {
    rootAriaAttributes.role = 'none presentation';
  }

  return (
    <DropdownContext.Provider
      value={{
        activeKey
      }}
    >
      <Component
        {...dropdownProps}
        ref={ref}
        style={style}
        className={classes}
        {...rootAriaAttributes}
      >
        {toggleElement}
        <MenuControlContext.Provider value={menuControl}>{menuElement}</MenuControlContext.Provider>
      </Component>
    </DropdownContext.Provider>
  );
}) as unknown) as DropdownComponent;

MenuRoot.Item = DropdownItem;
MenuRoot.Menu = DropdownMenu;

MenuRoot.displayName = 'Dropdown';
MenuRoot.defaultProps = defaultProps;
MenuRoot.propTypes = {
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

export default MenuRoot;
