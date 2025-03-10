import React from 'react';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import type { WithAsProps } from '@/internals/types';

export interface MenuSeparatorProps extends WithAsProps, React.HTMLAttributes<HTMLElement> {
  /** You can use a custom element for this component */
  as?: React.ElementType;
}

/**
 * The `<Menu.Separator>` API
 *
 */
const MenuSeparator = forwardRef<'li', MenuSeparatorProps>(
  (props: MenuSeparatorProps, ref: React.Ref<any>) => {
    const {
      classPrefix = 'menu-item-divider',
      className,
      as: Component = 'li',
      ...restProps
    } = props;

    const { merge, withPrefix } = useStyles(classPrefix);

    return (
      <Component
        ref={ref}
        role="separator"
        className={merge(withPrefix(), className)}
        {...restProps}
      />
    );
  }
);

MenuSeparator.displayName = 'MenuSeparator';

export default MenuSeparator;
