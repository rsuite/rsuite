import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { StandardProps } from '../@types/common';

export interface InputGroupAddonProps extends StandardProps {
  /** An Input group addon can show that it is disabled */
  disabled?: boolean;
}

const InputGroupAddon = React.forwardRef(
  (props: InputGroupAddonProps, ref: React.Ref<HTMLSpanElement>) => {
    const { classPrefix = 'input-group-addon', className, disabled, ...rest } = props;

    const [withPrifix, merge] = useClassNames(classPrefix);
    const classes = merge(className, withPrifix({ disabled }));

    return <span {...rest} ref={ref} className={classes} />;
  }
);

InputGroupAddon.displayName = 'InputGroupAddon';
InputGroupAddon.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  disabled: PropTypes.bool
};

export default InputGroupAddon;
