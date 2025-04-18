import React from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles, useCustom } from '@/internals/hooks';
import { forwardRef } from '@/internals/utils';
import { useFormGroup } from '../FormGroup';

export interface FormControlLabelProps
  extends BoxProps,
    React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Attribute of the html label tag, defaults to the controlId of the FormGroup */
  htmlFor?: string;
}

/**
 * The `<Form.ControlLabel>` component renders a label with required indicator, for form controls.
 * @see https://rsuitejs.com/components/form/
 */
const FormControlLabel = forwardRef<'label', FormControlLabelProps>(
  (props: FormControlLabelProps, ref) => {
    const { propsWithDefaults } = useCustom('FormControlLabel', props);
    const { labelId, controlId } = useFormGroup();
    const {
      as = 'label',
      classPrefix = 'form-control-label',
      htmlFor = controlId,
      className,
      id = labelId,
      ...rest
    } = propsWithDefaults;

    const { withPrefix, merge } = useStyles(classPrefix);
    const classes = merge(className, withPrefix());

    return <Box as={as} id={id} htmlFor={htmlFor} {...rest} ref={ref} className={classes} />;
  }
);

FormControlLabel.displayName = 'FormControlLabel';

export default FormControlLabel;
