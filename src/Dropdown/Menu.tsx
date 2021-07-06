import React, { useCallback, useContext, useEffect, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import MenuContext, { MenuActionTypes, MenuContextProps, MoveFocusTo } from './MenuContext';
import { KEY_VALUES, placementPolyfill, useClassNames, useCustom } from '../utils';
import { TypeAttributes, WithAsProps } from '../@types/common';
import useEnsuredRef from '../utils/useEnsuredRef';
import useUniqueId from '../utils/useUniqueId';
import useMenu from './useMenu';
import DropdownToggle from './DropdownToggle';
import useFocus from '../utils/useFocus';
import kebabCase from 'lodash/kebabCase';
import isNil from 'lodash/isNil';
import useClickOutside from '../utils/useClickOutside';

export interface MenuProps extends WithAsProps {
  disabled?: boolean;

  menuButtonText?: React.ReactNode;
  renderMenuButton?: (
    props: MenuButtonProps
  ) => React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>;

  menuStyle?: React.CSSProperties;

  openMenuOn?: MenuButtonTrigger[];
  popupPlacement?: TypeAttributes.Placement8;
  onToggleMenu?: (open: boolean, event: React.SyntheticEvent) => void;

  imperativeHandleRef?: React.Ref<MenuHandle>;
}

export type MenuButtonTrigger = 'mouseover' | 'click' | 'contextmenu';

export interface MenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  open: boolean;
}

export interface MenuHandle {
  dispatch: MenuContextProps[1];
}

const defaultProps: Partial<MenuProps> = {
  as: 'div',
  classPrefix: 'dropdown',
  openMenuOn: ['click']
};

/**
 * If <Dropdown.Menu> is inside another <Dropdown.Menu>,
 * it renders a `menuitem` and a `menu`.
 * Otherwise it renders the `menu` alone.
 */
const Menu = React.forwardRef(
  (props: MenuProps & Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'>, ref) => {
    const {
      as: Component,
      disabled,
      imperativeHandleRef,
      children,
      className,
      classPrefix,
      openMenuOn,
      onKeyDown,
      menuButtonText,
      renderMenuButton,
      menuStyle,
      popupPlacement,
      onToggleMenu,
      style,
      ...rest
    } = props;

    const { withClassPrefix: withMenuClassPrefix, merge: mergeMenuClassName } = useClassNames(
      'dropdown-menu'
    );

    const buttonElementRef = useRef<HTMLButtonElement>();
    const menuElementRef = useEnsuredRef<HTMLUListElement>(ref);

    const parentMenu = useContext(MenuContext);
    const isSubmenu = !!parentMenu;
    const [parentMenuState, parentDispatch] = parentMenu ?? [];

    const menu = useMenu();
    const [menuState, dispatch] = menu;

    const open = menuState.open;

    useImperativeHandle(
      imperativeHandleRef,
      () => ({
        dispatch
      }),
      [dispatch]
    );

    const { rtl } = useCustom('DropdownMenu');

    const activeItem = menuState.items[menuState.activeItemIndex]?.element;

    const menuFocus = useFocus(menuElementRef);

    const openMenu = useCallback(
      (event: React.SyntheticEvent) => {
        dispatch({
          type: MenuActionTypes.OpenMenu
        });

        if (!event.isTrusted) {
          dispatch({
            type: MenuActionTypes.MoveFocus,
            to: MoveFocusTo.First
          });
        }
        onToggleMenu?.(true, event);

        menuFocus.grab();
      },
      [dispatch, onToggleMenu, menuFocus]
    );

    const closeMenu = useCallback(
      (event: React.SyntheticEvent) => {
        dispatch({
          type: MenuActionTypes.CloseMenu
        });
        dispatch({
          type: MenuActionTypes.MoveFocus,
          to: MoveFocusTo.None
        });
        onToggleMenu?.(false, event);

        menuFocus.release({ preventScroll: true });
      },
      [dispatch, onToggleMenu, menuFocus]
    );

    const toggleMenu = useCallback(
      (event: React.SyntheticEvent) => {
        if (!open) {
          openMenu(event);
        } else {
          closeMenu(event);
        }
      },
      [open, openMenu, closeMenu]
    );

    useClickOutside({
      enabled: open,
      isOutside: event => {
        return (
          !buttonElementRef.current.contains(event.target as HTMLElement) &&
          !menuElementRef.current.contains(event.target as HTMLElement)
        );
      },
      // fixme if clicking on a focusable element, don't move focus to menu button
      handle: event => closeMenu(event as any)
    });

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
              openMenu(e);
              dispatch({
                type: MenuActionTypes.MoveFocus,
                to: MoveFocusTo.First
              });
            } else {
              closeMenu(e);
            }
            break;
          // Open the menu (if closed) and move focus to first item
          // This is mostly useful after opening the menu with click
          case KEY_VALUES.DOWN:
            e.preventDefault();
            e.stopPropagation();
            if (!open) {
              openMenu(e);
            }
            dispatch({
              type: MenuActionTypes.MoveFocus,
              to: MoveFocusTo.First
            });
            break;
        }
      },
      [open, openMenu, closeMenu, dispatch]
    );

    const handleButtonClick = useCallback(
      (event: React.MouseEvent) => {
        if (disabled) {
          return;
        }
        toggleMenu(event);
      },
      [disabled, toggleMenu]
    );

    const buttonEventHandlers: React.ButtonHTMLAttributes<HTMLButtonElement> = {
      onKeyDown: handleButtonKeydown
    };

    /**
     * Bind event of trigger,
     * not used in  in the expanded state of '<Sidenav>'
     */
    if (openMenuOn?.includes('click')) {
      buttonEventHandlers.onClick = handleButtonClick;
    }

    if (openMenuOn?.includes('contextmenu')) {
      buttonEventHandlers.onContextMenu = handleButtonClick;
    }

    const buttonId = useUniqueId('menubutton-');
    const menuId = useUniqueId('menu-');

    // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-14
    const buttonAriaAttributes: React.ButtonHTMLAttributes<HTMLButtonElement> = {
      role: 'button',
      'aria-haspopup': 'menu' as const,
      'aria-expanded': open || undefined, // it's recommend to remove aria-expanded when menu is hidden
      'aria-controls': menuId
    };

    if (parentMenu) {
      buttonAriaAttributes.role = 'menuitem';
    }

    // Register menu button as item of parent menu
    useEffect(() => {
      if (isSubmenu) {
        const menuitem = buttonElementRef.current;

        parentDispatch({
          type: MenuActionTypes.RegisterItem,
          element: menuitem as any,
          props: { disabled }
        });

        return () => {
          parentDispatch({
            type: MenuActionTypes.UnregisterItem,
            id: menuitem.id
          });
        };
      }
    }, [isSubmenu, parentDispatch, disabled]);

    const buttonProps: MenuButtonProps = {
      id: buttonId,
      ...buttonAriaAttributes,
      ...buttonEventHandlers,

      // render props
      open
    };

    if (parentMenu) {
      buttonProps.tabIndex = -1;
    }

    if (parentMenuState?.role !== 'menu') {
      Object.assign(buttonProps, rest);
    }

    const customMenuButton = renderMenuButton?.({
      ...buttonProps
    } as any);

    const buttonElement = customMenuButton ? (
      React.cloneElement(customMenuButton, {
        ref: buttonElementRef
      } as any)
    ) : (
      <DropdownToggle ref={buttonElementRef} {...buttonProps}>
        {menuButtonText}
      </DropdownToggle>
    );

    /**
     * Keyboard interaction on menu
     * @see https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-12
     */
    const handleKeydown = useCallback(
      (e: React.KeyboardEvent<HTMLUListElement>) => {
        switch (e.key) {
          // Move focus to previous item
          case KEY_VALUES.UP:
            e.preventDefault();
            e.stopPropagation();
            dispatch({
              type: MenuActionTypes.MoveFocus,
              to: MoveFocusTo.Prev
            });
            break;
          // Move focus to next item
          case KEY_VALUES.DOWN:
            e.preventDefault();
            e.stopPropagation();
            dispatch({
              type: MenuActionTypes.MoveFocus,
              to: MoveFocusTo.Next
            });
            break;
          // When focus is in a menu and on a menuitem that has a submenu, opens the submenu and places focus on its first item.
          case KEY_VALUES.RIGHT:
            e.preventDefault();
            e.stopPropagation();
            if (!rtl) {
              if (activeItem?.getAttribute('aria-haspopup') === 'menu') {
                activeItem.click();
              }
            } else if (isSubmenu) {
              // todo move closing call to upper container
              dispatch({
                type: MenuActionTypes.CloseMenu
              });
            }
            break;
          // When focus is in a submenu of an item in a menu, closes the submenu and returns focus to the parent menuitem.
          case KEY_VALUES.LEFT:
            e.preventDefault();
            e.stopPropagation();
            if (!rtl) {
              if (isSubmenu) {
                // todo move closing call to upper container
                dispatch({
                  type: MenuActionTypes.CloseMenu
                });
              }
            } else if (activeItem?.getAttribute('aria-haspopup') === 'menu') {
              activeItem.click();
            }
            break;
          // Move focus to the first item
          case KEY_VALUES.HOME:
            e.preventDefault();
            e.stopPropagation();
            dispatch({
              type: MenuActionTypes.MoveFocus,
              to: MoveFocusTo.First
            });
            break;
          // Move focus to the last item
          case KEY_VALUES.END:
            e.preventDefault();
            e.stopPropagation();
            dispatch({
              type: MenuActionTypes.MoveFocus,
              to: MoveFocusTo.Last
            });
            break;
          // - When focus is on a menuitem that has a submenu, opens the submenu and places focus on its first item.
          // - Otherwise, activates the item and closes the menu.
          case KEY_VALUES.ENTER:
          case KEY_VALUES.SPACE:
            if (activeItem) {
              e.preventDefault();
              e.stopPropagation();
              activeItem.click();
              if (!activeItem.getAttribute('aria-haspopup')) {
                closeMenu(e);
              }
            }
            break;
          //  Close the menu that contains focus and return focus to the element or context,
          //  e.g., menu button or parent menuitem, from which the menu was opened.
          case KEY_VALUES.ESC:
            closeMenu(e);
            break;
        }

        onKeyDown?.(e);
      },
      [onKeyDown, dispatch, activeItem, isSubmenu, rtl, menuFocus, closeMenu]
    );

    // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-13
    const menuAriaAttributes: React.HTMLAttributes<HTMLUListElement> = {
      role: 'menu',
      'aria-activedescendant': activeItem?.id
    };

    const menuEventHandlers: React.HTMLAttributes<HTMLUListElement> = {
      onKeyDown: handleKeydown
    };

    const menuProps: React.HTMLAttributes<HTMLUListElement> = {
      id: menuId,
      ...menuAriaAttributes,
      ...menuEventHandlers
    };

    if (parentMenuState?.role === 'menu') {
      Object.assign(menuProps, rest);
    }

    const menuClassName = mergeMenuClassName(className, withMenuClassPrefix());
    const menuElement = (
      <ul
        ref={menuElementRef}
        {...menuProps}
        className={menuClassName}
        tabIndex={0}
        hidden={!open}
        style={menuStyle}
      >
        {children}
      </ul>
    );

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent) => {
        if (!disabled) {
          openMenu(e);
        }
      },
      [disabled, openMenu]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent) => {
        if (!disabled) {
          closeMenu(e);
        }
      },
      [disabled, closeMenu]
    );

    const rootAriaAttributes: React.HTMLAttributes<HTMLDivElement> = {};

    if (parentMenu) {
      rootAriaAttributes.role = 'none presentation';
    }

    const rootEventHandlers: React.HTMLAttributes<HTMLDivElement> = {};

    if (openMenuOn?.includes('mouseover')) {
      rootEventHandlers.onMouseEnter = handleMouseEnter;
      rootEventHandlers.onMouseLeave = handleMouseLeave;
    }

    const [menubarState] = parentMenu ?? [];
    const hasFocus = !menubarState
      ? false
      : !isNil(menubarState.activeItemIndex) &&
        menubarState.items[menubarState.activeItemIndex].element ===
          (buttonElementRef.current as any);

    const { merge, withClassPrefix } = useClassNames(classPrefix);

    const classes = merge(
      className,
      withClassPrefix({
        [`placement-${kebabCase(placementPolyfill(popupPlacement))}`]: !!popupPlacement,
        disabled,
        open,
        submenu: !!parentMenu,
        focus: hasFocus
      })
    );

    return (
      <Component
        ref={ref}
        className={classes}
        {...rootAriaAttributes}
        {...rootEventHandlers}
        style={style}
      >
        {buttonElement}
        <MenuContext.Provider value={menu}>{menuElement}</MenuContext.Provider>
      </Component>
    );
  }
);

Menu.displayName = 'Menu';
Menu.defaultProps = defaultProps;
Menu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string
};

export default Menu;
