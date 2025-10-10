import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface FormControlLabelProps extends WithAsProps, React.LabelHTMLAttributes<HTMLLabelElement> {
    /** Attribute of the html label tag, defaults to the controlId of the FormGroup */
    htmlFor?: string;
}
/**
 * The `<Form.ControlLabel>` component renders a label with required indicator, for form controls.
 * @see https://rsuitejs.com/components/form/
 */
declare const FormControlLabel: RsRefForwardingComponent<'label', FormControlLabelProps>;
export default FormControlLabel;
