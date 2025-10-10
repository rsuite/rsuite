import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface FormHelpTextProps extends WithAsProps, React.HTMLAttributes<HTMLSpanElement> {
    /** Whether to show through the Tooltip component */
    tooltip?: boolean;
}
/**
 * The `<Form.HelpText>` component is used to display help information in the form.
 * @see https://rsuitejs.com/components/form/
 */
declare const FormHelpText: RsRefForwardingComponent<'span', FormHelpTextProps>;
export default FormHelpText;
