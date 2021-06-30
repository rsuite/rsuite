import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import MenuContext from './MenuContext';
import { useClassNames, KEY_VALUES, useCustom } from '../utils';
import { IconProps } from '@rsuite/icons/lib/Icon';
import { StandardProps } from '../@types/common';
import useEnsuredRef from '../utils/useEnsuredRef';
import MenuControlContext from './MenuControlContext';
import useUniqueId from '../utils/useUniqueId';
import useMenuControl from './useMenuControl';
import deprecatePropType from '../utils/deprecatePropType';

export interface MenuProps<T = string> extends StandardProps {
  /**
   * The submenu expands from the left and defaults to the right
   * @deprecated
   */
  pullLeft?: boolean;

  /**
   *  Only used for setting the default expand state when it's a submenu.
   */
  eventKey?: T;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  open?: boolean;
  active?: boolean;
  activeKey?: T;
  trigger?: 'hover' | 'click';
  onSelect?: (eventKey: T, event: React.SyntheticEvent<Element>) => void;
  onToggle?: (eventKey: T, event: React.SyntheticEvent<Element>) => void;
}

const defaultProps: Partial<MenuProps> = {
  classPrefix: 'dropdown-menu'
};

/**
 * If <Dropdown.Menu> is inside another <Dropdown.Menu>,
 * it renders a `menuitem` and a `menu`.
 * Otherwise it renders the `menu` alone.
 */
const Menu = React.forwardRef(
  (props: MenuProps & Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'>, ref) => {
    const { children, className, classPrefix, activeKey, onSelect, onKeyDown, ...rest } = props;

    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
    const menuRef = useEnsuredRef<HTMLUListElement>(ref);
    const menuId = useUniqueId(prefix`-`);

    const parentMenu = useContext(MenuContext);
    const isSubmenu = !!parentMenu;
    const upperMenuControl = useContext(MenuControlContext);
    const menuControl = useMenuControl(menuRef, upperMenuControl);

    const { rtl } = useCustom('DropdownMenu');

    // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-13
    const menuAriaAttributes: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLUListElement>,
      HTMLUListElement
    > = {
      role: 'menu',
      'aria-activedescendant': menuControl.items[menuControl.activeItemIndex]?.element.id
    };

    /**
     * Keyboard interaction on menu
     * @see https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-12
     */
    const handleKeydown = useCallback(
      (e: React.KeyboardEvent<HTMLUListElement>) => {
        const activeItem = menuControl.items[menuControl.activeItemIndex]?.element;

        switch (e.key) {
          // Move focus to previous item
          case KEY_VALUES.UP:
            e.preventDefault();
            e.stopPropagation();
            menuControl.moveItemFocus(-1);
            break;
          // Move focus to next item
          case KEY_VALUES.DOWN:
            e.preventDefault();
            e.stopPropagation();
            menuControl.moveItemFocus(1);
            break;
          // When focus is in a menu and on a menuitem that has a submenu, opens the submenu and places focus on its first item.
          case KEY_VALUES.RIGHT:
            e.preventDefault();
            e.stopPropagation();
            if (!rtl) {
              if (activeItem.getAttribute('aria-haspopup') === 'menu') {
                activeItem.click();
              }
            } else if (isSubmenu) {
              menuControl.closeMenu();
            }
            break;
          // When focus is in a submenu of an item in a menu, closes the submenu and returns focus to the parent menuitem.
          case KEY_VALUES.LEFT:
            e.preventDefault();
            e.stopPropagation();
            if (!rtl) {
              if (isSubmenu) {
                menuControl.closeMenu();
              }
            } else if (activeItem.getAttribute('aria-haspopup') === 'menu') {
              activeItem.click();
            }
            break;
          // Move focus to the first item
          case KEY_VALUES.HOME:
            e.preventDefault();
            e.stopPropagation();
            menuControl.focusItemAt(0);
            break;
          // Move focus to the last item
          case KEY_VALUES.END:
            e.preventDefault();
            e.stopPropagation();
            menuControl.focusItemAt(-1);
            break;
          // - When focus is on a menuitem that has a submenu, opens the submenu and places focus on its first item.
          // - Otherwise, activates the item and closes the menu.
          case KEY_VALUES.ENTER:
          case KEY_VALUES.SPACE:
            if (activeItem) {
              e.preventDefault();
              e.stopPropagation();
              activeItem.click();
            }
            break;
          //  Close the menu that contains focus and return focus to the element or context,
          //  e.g., menu button or parent menuitem, from which the menu was opened.
          case KEY_VALUES.ESC:
            // No action here.
            // Handle this event in upper controlling context
            // See <Dropdown> and <MenuItem>
            break;
        }

        onKeyDown?.(e);
      },
      [onKeyDown, menuControl, isSubmenu, rtl]
    );

    const menuEventHandlers: React.HTMLAttributes<HTMLUListElement> = {
      onKeyDown: handleKeydown
    };

    const classes = merge(className, withClassPrefix());
    const menuElement = (
      <ul
        id={menuId}
        {...menuAriaAttributes}
        {...menuEventHandlers}
        {...rest}
        className={classes}
        ref={menuRef}
        tabIndex={0}
      >
        {children}
      </ul>
    );

    return (
      <MenuContext.Provider
        value={{
          activeKey,
          onSelect
        }}
      >
        <MenuControlContext.Provider value={menuControl}>{menuElement}</MenuControlContext.Provider>
      </MenuContext.Provider>
    );
  }
);

Menu.displayName = 'Menu';
Menu.defaultProps = defaultProps;
Menu.propTypes = {
  active: PropTypes.bool,
  activeKey: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.any,
  classPrefix: PropTypes.string,
  pullLeft: deprecatePropType(PropTypes.bool),
  open: PropTypes.bool,
  trigger: PropTypes.oneOf(['click', 'hover']),
  eventKey: PropTypes.any,
  onSelect: PropTypes.func,
  onToggle: PropTypes.func
};

export default Menu;
