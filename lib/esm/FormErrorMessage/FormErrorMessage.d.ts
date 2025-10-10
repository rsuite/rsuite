import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface FormErrorMessageProps extends WithAsProps {
    /** Show error messages */
    show?: boolean;
    /** The placement of error messages */
    placement?: TypeAttributes.Placement8;
}
/**
 * The `<Form.ErrorMessage>` component is used to display error messages in the form.
 * @see https://rsuitejs.com/components/form/
 */
declare const FormErrorMessage: RsRefForwardingComponent<'div', FormErrorMessageProps>;
export default FormErrorMessage;
