import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';

export interface MenuSeparatorProps extends BoxProps, React.HTMLAttributes<HTMLElement> {
  /** You can use a custom element for this component */
  as?: React.ElementType;
}

/**
 * The `<Menu.Separator>` API
 *
 */
const MenuSeparator = forwardRef<'li', MenuSeparatorProps>(
  (props: MenuSeparatorProps, ref: React.Ref<any>) => {
    const { as = 'li', classPrefix = 'menu-item-divider', className, ...rest } = props;

    const { merge, withPrefix } = useStyles(classPrefix);

    return (
      <Box
        as={as}
        ref={ref}
        role="separator"
        className={merge(withPrefix(), className)}
        {...rest}
      />
    );
  }
);

MenuSeparator.displayName = 'MenuSeparator';

export default MenuSeparator;
