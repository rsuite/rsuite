import React from 'react';
import PropTypes from 'prop-types';
import { createContext, useClassNames } from '../utils';
import { StandardProps } from '../@types/common';

export interface FormGroupProps extends StandardProps, React.HTMLAttributes<HTMLDivElement> {
  /** Sets id for controlled component   */
  controlId?: string;
}

export const FormGroupContext = createContext(null);

const FormGroup = React.forwardRef((props: FormGroupProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    as: Component = 'div',
    classPrefix = 'form-group',
    controlId,
    className,
    ...rest
  } = props;

  const { withClassPrefix, merge } = useClassNames(classPrefix);
  const classes = merge(className, withClassPrefix());

  return (
    <FormGroupContext.Provider value={{ controlId }}>
      <Component {...rest} ref={ref} className={classes} role="group" />
    </FormGroupContext.Provider>
  );
});

FormGroup.displayName = 'FormGroup';
FormGroup.propTypes = {
  controlId: PropTypes.string,
  className: PropTypes.string,
  classPrefix: PropTypes.string
};

export default FormGroup;
