import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps } from '../@types/common';
import ArrowDown from '@rsuite/icons/legacy/ArrowDown';

export interface DropdownMenuGroupProps extends WithAsProps, React.HTMLAttributes<HTMLDivElement> {}

const defaultProps: Partial<DropdownMenuGroupProps> = {
  as: 'div',
  classPrefix: 'dropdown-menu-group'
};

const DropdownMenuGroup = React.forwardRef(
  (props: DropdownMenuGroupProps, ref: React.Ref<HTMLDivElement>) => {
    const { as: Component, classPrefix, children, className, ...rest } = props;
    const { withClassPrefix, prefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    return (
      <Component role="group" {...rest} ref={ref} className={classes}>
        <div className={prefix`title`} tabIndex={-1}>
          <span>{children}</span>
          <ArrowDown aria-hidden className={prefix`caret`} />
        </div>
      </Component>
    );
  }
);

DropdownMenuGroup.displayName = 'DropdownMenuGroup';
DropdownMenuGroup.defaultProps = defaultProps;
DropdownMenuGroup.propTypes = {
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node
};

export default DropdownMenuGroup;
