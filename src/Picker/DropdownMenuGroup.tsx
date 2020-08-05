import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { StandardProps } from '../@types/common';

export type DropdownMenuGroupProps = StandardProps & React.HTMLAttributes<HTMLDivElement>;

const DropdownMenuGroup = React.forwardRef(
  (props: DropdownMenuGroupProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      as: Component = 'div',
      classPrefix = 'dropdown-menu-group',
      children,
      className,
      ...rest
    } = props;
    const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    return (
      <Component role="listitem" {...rest} ref={ref} className={classes}>
        <div className={prefix`title`} tabIndex={-1}>
          <span>{children}</span>
          <span aria-hidden="true" className={prefix`caret`} />
        </div>
      </Component>
    );
  }
);

DropdownMenuGroup.displayName = 'DropdownMenuGroup';
DropdownMenuGroup.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};

export default DropdownMenuGroup;
