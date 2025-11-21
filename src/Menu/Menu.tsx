import React, { useMemo } from 'react';
import Menubar from '@/internals/Menu/Menubar';
import MenuContext from './MenuContext';
import MenuItem from './MenuItem';
import MenuSeparator from './MenuSeparator';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles } from '@/internals/hooks';
import { mergeRefs, forwardRef } from '@/internals/utils';
import type { HTMLPropsWithoutSelect } from '@/internals/types';

export interface MenuProps<T = string | number>
  extends BoxProps,
    HTMLPropsWithoutSelect<HTMLUListElement> {
  /** Set the active key for the menu */
  activeKey?: T;

  /** Callback function triggered when an item is selected */
  onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}

const Subcomponents = {
  Item: MenuItem,
  Separator: MenuSeparator
};

/**
 * The `<Menu>` component is used to create a menu.
 *
 * @see https://rsuitejs.com/components/menu
 */
const Menu = forwardRef<'ul', MenuProps, typeof Subcomponents>((props, ref) => {
  const {
    as = 'ul',
    activeKey,
    classPrefix = 'menu',
    className,
    children,
    onSelect,
    ...rest
  } = props;

  const { merge, withPrefix } = useStyles(classPrefix);
  const contextValue = useMemo(() => ({ activeKey, onSelect }), [activeKey, onSelect]);
  const classes = merge(className, withPrefix());

  return (
    <MenuContext.Provider value={contextValue}>
      <Menubar vertical>
        {(menubar, menubarRef: React.Ref<HTMLElement>) => (
          <Box
            as={as}
            {...menubar}
            {...rest}
            ref={mergeRefs(menubarRef, ref)}
            className={classes}
            role="menu"
          >
            {children}
          </Box>
        )}
      </Menubar>
    </MenuContext.Provider>
  );
}, Subcomponents);

Menu.displayName = 'Menu';

export default Menu;
