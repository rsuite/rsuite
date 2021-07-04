import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { MenuContextProps, MoveFocusTo } from './MenuContext';
import { KEY_VALUES, useClassNames } from '../utils';
import { StandardProps } from '../@types/common';
import useEnsuredRef from '../utils/useEnsuredRef';
import useUniqueId from '../utils/useUniqueId';
import { isFocusEntering, isFocusLeaving } from '../utils/events';
import MenuContext, { MenuActionTypes } from './MenuContext';
import useMenu from './useMenu';

export interface VerticalMenubarProps<T = string> extends StandardProps {
  activeKey?: T;
  onSelect?: (eventKey: T, event: React.SyntheticEvent<Element>) => void;

  onActivateItem?: (event: React.SyntheticEvent<HTMLElement>) => void;
}

export interface MenuHandle {
  dispatch: MenuContextProps[1];
}

const defaultProps: Partial<VerticalMenubarProps> = {
  classPrefix: 'dropdown-menu'
};

const VerticalMenubar = React.forwardRef(
  (props: VerticalMenubarProps & Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'>, ref) => {
    const {
      children,
      className,
      classPrefix,
      activeKey,
      onSelect,
      onActivateItem,
      ...rest
    } = props;

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const menubarRef = useEnsuredRef<HTMLUListElement>(ref);
    const menubarId = useUniqueId('menubar-');

    /**
     * Keyboard interaction on menu
     * @see https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-12
     */
    const menubar = useMenu();
    const [{ items, activeItemIndex }, dispatch] = menubar;

    const activeItem = items[activeItemIndex]?.element;

    // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-13
    const menubarAriaAttributes: React.HTMLAttributes<HTMLUListElement> = {
      role: 'menubar',
      'aria-orientation': 'vertical',
      'aria-activedescendant': activeItem?.id ?? null
    };

    const onFocus = useCallback(
      (event: React.FocusEvent) => {
        // Focus moves inside Menubar
        if (isFocusEntering(event)) {
          if (activeItemIndex === null) {
            dispatch({ type: MenuActionTypes.MoveFocus, to: MoveFocusTo.First });
          }
        }
      },
      [activeItemIndex, dispatch]
    );

    const onBlur = useCallback(
      (event: React.FocusEvent) => {
        // Focus moves outside of Menubar
        if (isFocusLeaving(event)) {
          dispatch({ type: MenuActionTypes.MoveFocus, to: MoveFocusTo.None });
        }
      },
      [dispatch]
    );

    const onKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLUListElement>) => {
        const activeItem = items[activeItemIndex];
        switch (event.key) {
          case KEY_VALUES.DOWN:
            event.preventDefault();
            event.stopPropagation();
            dispatch({
              type: MenuActionTypes.MoveFocus,
              to: MoveFocusTo.Next
            });
            break;
          case KEY_VALUES.UP:
            event.preventDefault();
            event.stopPropagation();
            dispatch({
              type: MenuActionTypes.MoveFocus,
              to: MoveFocusTo.Prev
            });
            break;
          case KEY_VALUES.HOME:
            event.preventDefault();
            event.stopPropagation();
            dispatch({
              type: MenuActionTypes.MoveFocus,
              to: MoveFocusTo.First
            });
            break;
          case KEY_VALUES.END:
            event.preventDefault();
            event.stopPropagation();
            dispatch({
              type: MenuActionTypes.MoveFocus,
              to: MoveFocusTo.Last
            });
            break;
          case KEY_VALUES.ENTER:
          case KEY_VALUES.SPACE:
            if (activeItem) {
              event.preventDefault();
              event.stopPropagation();
              activeItem.element.click();
            }
            break;
        }
      },
      [items, activeItemIndex, dispatch]
    );

    // Only used for handling click events bubbling from children
    // Which indicates that a child menuitem is being activated
    const onClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (items.some(item => item.element === event.target)) {
          onActivateItem?.(event);
        }
      },
      [items, onActivateItem]
    );

    const menuEventHandlers: React.HTMLAttributes<HTMLUListElement> = {
      onFocus,
      onBlur,
      onKeyDown,
      onClick
    };

    const classes = merge(className, withClassPrefix());

    return (
      <MenuContext.Provider value={menubar}>
        <ul
          ref={menubarRef}
          id={menubarId}
          {...menuEventHandlers}
          {...menubarAriaAttributes}
          className={classes}
          tabIndex={0}
          {...rest}
        >
          {children}
        </ul>
      </MenuContext.Provider>
    );
  }
);

VerticalMenubar.displayName = 'Menubar';
VerticalMenubar.defaultProps = defaultProps;
VerticalMenubar.propTypes = {
  activeKey: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  classPrefix: PropTypes.string,
  onSelect: PropTypes.func
};

export default VerticalMenubar;
