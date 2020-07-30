import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { FormGroupContext } from '../FormGroup/FormGroup';
import { StandardProps } from '../@types/common';

export interface FormControlLabelProps
  extends StandardProps,
    React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Attribute of the html label tag, defaults to the controlId of the FormGroup */
  htmlFor?: string;
}

const FormControlLabel = React.forwardRef(
  (props: FormControlLabelProps, ref: React.Ref<HTMLLabelElement>) => {
    const {
      classPrefix = 'form-control-label',
      as: Component = 'label',
      htmlFor,
      className,
      ...rest
    } = props;

    const formGroupContext = useContext(FormGroupContext);
    const [withPrifix, merge] = useClassNames(classPrefix);
    const classes = merge(className, withPrifix());

    return (
      <Component
        {...rest}
        ref={ref}
        htmlFor={htmlFor || formGroupContext?.controlId}
        className={classes}
      />
    );
  }
);

FormControlLabel.displayName = 'FormControlLabel';
FormControlLabel.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  classPrefix: PropTypes.string
};

export default FormControlLabel;
