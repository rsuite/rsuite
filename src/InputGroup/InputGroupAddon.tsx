import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { WithAsProps } from '../@types/common';

export interface InputGroupAddonProps extends WithAsProps, React.HTMLAttributes<HTMLSpanElement> {
  /** An Input group addon can show that it is disabled */
  disabled?: boolean;
}

const InputGroupAddon = React.forwardRef(
  (props: InputGroupAddonProps, ref: React.Ref<HTMLSpanElement>) => {
    const {
      as: Component = 'span',
      classPrefix = 'input-group-addon',
      className,
      disabled,
      ...rest
    } = props;

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ disabled }));

    return <Component {...rest} ref={ref} className={classes} />;
  }
);

InputGroupAddon.displayName = 'InputGroupAddon';
InputGroupAddon.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  disabled: PropTypes.bool
};

export default InputGroupAddon;
