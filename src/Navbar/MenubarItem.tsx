import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import Ripple from '../Ripple';
import SafeAnchor from '../SafeAnchor';
import { useClassNames } from '../utils';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import MenubarContext, { MenubarActionTypes } from './MenubarContext';
import useEnsuredRef from '../utils/useEnsuredRef';
import useUniqueId from '../utils/useUniqueId';

export interface MenubarItemProps extends WithAsProps, React.HTMLAttributes<HTMLElement> {
  /** Activation status */
  selected?: boolean;

  /** Disabled status */
  disabled?: boolean;

  /** Select the callback function that the event triggers. */
  onActivate?: (event: React.SyntheticEvent) => void;
}

const defaultProps: Partial<MenubarItemProps> = {
  classPrefix: 'nav-item',
  as: SafeAnchor
};

const MenubarItem: RsRefForwardingComponent<'li', MenubarItemProps> = React.forwardRef(
  (props: MenubarItemProps, ref: React.Ref<HTMLLIElement>) => {
    const {
      as: Component,
      selected,
      disabled,
      className,
      classPrefix,
      style,
      children,
      onClick,
      onActivate,
      ...rest
    } = props;

    const [{ items, activeItemIndex }, dispatch] = useContext(MenubarContext);
    const menuitemRef = useEnsuredRef<HTMLLIElement>(ref);
    const menuitemId = useUniqueId('menuitem-');
    const menuitemActive =
      !isNil(activeItemIndex) && items[activeItemIndex].element === menuitemRef.current;

    const { withClassPrefix, merge } = useClassNames(classPrefix);

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (!disabled) {
          onActivate?.(event);
          onClick?.(event);
        }
      },
      [disabled, onActivate, onClick]
    );

    useEffect(() => {
      const menuitem = menuitemRef.current;
      dispatch({ type: MenubarActionTypes.RegisterItem, element: menuitem, props: { disabled } });

      return () => {
        dispatch({ type: MenubarActionTypes.UnregisterItem, id: menuitem.id });
      };
    }, [menuitemRef, dispatch, disabled]);

    const ariaAttributes: React.HTMLAttributes<HTMLElement> = {
      role: 'menuitem',
      'aria-disabled': disabled,
      'aria-selected': selected
    };

    const classes = merge(
      className,
      withClassPrefix({ focus: menuitemActive, active: selected, disabled })
    );

    return (
      <Component
        ref={menuitemRef}
        id={menuitemId}
        tabIndex={-1}
        disabled={Component === SafeAnchor ? disabled : null}
        className={classes}
        onClick={handleClick}
        style={style}
        {...ariaAttributes}
        {...rest}
      >
        {children}
        <Ripple />
      </Component>
    );
  }
);

MenubarItem.defaultProps = defaultProps;
MenubarItem.displayName = 'Menubar.Item';
MenubarItem.propTypes = {
  as: PropTypes.elementType,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  onActivate: PropTypes.func,
  children: PropTypes.node
};

export default MenubarItem;
