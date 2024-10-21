import React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '@/internals/hooks';
import { useFormGroup } from '../FormGroup';
import { WithAsProps, RsRefForwardingComponent } from '@/internals/types';
import { useCustom } from '../CustomProvider';

export interface FormControlLabelProps
  extends WithAsProps,
    React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Attribute of the html label tag, defaults to the controlId of the FormGroup */
  htmlFor?: string;
}

/**
 * The `<Form.ControlLabel>` component renders a label with required indicator, for form controls.
 * @see https://rsuitejs.com/components/form/
 */
const FormControlLabel: RsRefForwardingComponent<'label', FormControlLabelProps> = React.forwardRef(
  (props: FormControlLabelProps, ref) => {
    const { propsWithDefaults } = useCustom('FormControlLabel', props);
    const { labelId, controlId } = useFormGroup();
    const {
      as: Component = 'label',
      classPrefix = 'form-control-label',
      htmlFor = controlId,
      className,
      id = labelId,
      ...rest
    } = propsWithDefaults;

    const { withClassPrefix, merge } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());

    return <Component id={id} htmlFor={htmlFor} {...rest} ref={ref} className={classes} />;
  }
);

FormControlLabel.displayName = 'FormControlLabel';
FormControlLabel.propTypes = {
  className: PropTypes.string,
  htmlFor: PropTypes.string,
  classPrefix: PropTypes.string
};

export default FormControlLabel;
