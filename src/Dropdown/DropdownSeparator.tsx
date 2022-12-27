import React from 'react';
import PropTypes from 'prop-types';

import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { useClassNames } from '../utils';

export interface DropdownSeparatorProps extends WithAsProps, React.HTMLAttributes<HTMLElement> {
  /** You can use a custom element for this component */
  as?: React.ElementType;
}

/**
 * The <Dropdown.Separator> API
 *
 * Renders a non-focusable and non-interactive `separator`
 * Per ARIA APG https://www.w3.org/WAI/ARIA/apg/patterns/menu/
 */
const DropdownSeparator: RsRefForwardingComponent<'li', DropdownSeparatorProps> = React.forwardRef(
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
DropdownSeparator.propTypes = {
  as: PropTypes.elementType
};

export default DropdownSeparator;
