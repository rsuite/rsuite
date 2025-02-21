import React from 'react';
import { forwardRef } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import type { WithAsProps } from '@/internals/types';

export interface DropdownSeparatorProps extends WithAsProps, React.HTMLAttributes<HTMLElement> {
  /** You can use a custom element for this component */
  as?: React.ElementType;
}

/**
 * The `<Dropdown.Separator>` API
 *
 * Renders a non-focusable and non-interactive `separator`
 * Per ARIA APG https://www.w3.org/WAI/ARIA/apg/patterns/menu/
 */
const DropdownSeparator = forwardRef<'li', DropdownSeparatorProps>(
  (props: DropdownSeparatorProps, ref: React.Ref<any>) => {
    const {
      classPrefix = 'dropdown-item-divider',
      className,
      as: Component = 'li',
      ...restProps
    } = props;

    const { merge, withClassPrefix } = useClassNames(classPrefix);

    return (
      <Component
        ref={ref}
        role="separator"
        className={merge(withClassPrefix(), className)}
        {...restProps}
      />
    );
  }
);

DropdownSeparator.displayName = 'Dropdown.Separator';

export default DropdownSeparator;
