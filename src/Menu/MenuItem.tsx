import React, { useCallback, useContext, cloneElement } from 'react';
import classNames from 'classnames';
import MenuItemBase from '@/internals/Menu/MenuItem';
import MenuContext from './MenuContext';
import isNil from 'lodash/isNil';
import Text from '../Text';
import { useStyles } from '@/internals/hooks';
import { forwardRef, mergeRefs, shallowEqual } from '@/internals/utils';
import { useRenderMenuItem } from '@/internals/Menu/useRenderMenuItem';
import type { IconProps } from '@rsuite/icons/Icon';
import type { HTMLPropsWithoutSelect } from '@/internals/types';
import type { BoxProps } from '@/internals/Box';

export interface MenuItemProps<T = any> extends BoxProps, HTMLPropsWithoutSelect {
  /** Active the current option */
  active?: boolean;

  /** Disable the current option */
  disabled?: boolean;

  /** The description of the current option */
  description?: React.ReactNode;

  /** The value of the current option */
  eventKey?: T;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /**
   * The menu item keyboard shortcut.
   */
  shortcut?: React.ReactNode;

  /**
   * Select the callback function for the current option
   */
  onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;
}

const MenuItem = forwardRef<'li', MenuItemProps>((props: MenuItemProps, ref: React.Ref<any>) => {
  const {
    as = 'li',
    active: activeProp,
    classPrefix = 'menu-item',
    className,
    description,
    shortcut,
    eventKey,
    icon,
    children,
    disabled,
    onSelect,
    ...rest
  } = props;

  const menu = useContext(MenuContext);
  const { merge, withPrefix, prefix } = useStyles(classPrefix);

  const handleSelectItem = useCallback(
    (event: React.SyntheticEvent) => {
      onSelect?.(eventKey, event);
      menu?.onSelect?.(eventKey, event);
    },
    [onSelect, eventKey, menu]
  );

  const selected = activeProp || (!isNil(eventKey) && shallowEqual(menu?.activeKey, eventKey));

  const renderMenuItem = useRenderMenuItem(as);

  return (
    <MenuItemBase selected={selected} disabled={disabled} onActivate={handleSelectItem}>
      {({ selected, active, ...menuitem }, menuitemRef) => {
        const classes = merge(
          className,
          withPrefix({
            active: selected,
            disabled,
            focus: active
          })
        );

        return renderMenuItem({
          ref: mergeRefs(ref, menuitemRef),
          className: classes,
          ...menuitem,
          ...rest,
          children: (
            <>
              {icon &&
                cloneElement(icon, {
                  className: classNames(prefix('menu-icon'), icon.props.className)
                })}
              <div className={prefix('content')}>
                <Text as="span">{children}</Text>
                <Text as="span" muted>
                  {description}
                </Text>
              </div>
              {shortcut && (
                <Text as="kbd" className={prefix('shortcut')} muted>
                  {shortcut}
                </Text>
              )}
            </>
          )
        });
      }}
    </MenuItemBase>
  );
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;
