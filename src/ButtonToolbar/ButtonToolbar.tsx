import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface ButtonToolbarProps extends WithAsProps {
  /**
   * The ARIA role describing the button toolbar. Generally the default
   * "toolbar" role is correct. An `aria-label` or `aria-labelledby`
   * prop is also recommended.
   */
  role?: string;
}

const ButtonToolbar: RsRefForwardingComponent<'div', ButtonToolbarProps> = React.forwardRef(
  (props: ButtonToolbarProps, ref) => {
    const {
      className,
      classPrefix = 'btn-toolbar',
      as: Component = 'div',
      role = 'toolbar',
      ...rest
    } = props;

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());
    return <Component {...rest} role={role} ref={ref} className={classes} />;
  }
);

ButtonToolbar.displayName = 'ButtonToolbar';
ButtonToolbar.propTypes = {
  as: PropTypes.elementType,
  classPrefix: PropTypes.string
};

export default ButtonToolbar;
