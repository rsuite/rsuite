import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { FormGroupContext } from '../FormGroup/FormGroup';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface FormControlLabelProps
  extends WithAsProps,
    React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Attribute of the html label tag, defaults to the controlId of the FormGroup */
  htmlFor?: string;
}

const FormControlLabel: RsRefForwardingComponent<'label', FormControlLabelProps> = React.forwardRef(
  (props: FormControlLabelProps, ref) => {
    const {
      as: Component = 'label',
      classPrefix = 'form-control-label',
      htmlFor,
      className,
      ...rest
    } = props;

    const { controlId } = useContext(FormGroupContext);
    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    return (
      <Component
        id={controlId ? `${controlId}-control-label` : null}
        htmlFor={htmlFor || controlId}
        {...rest}
        ref={ref}
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
