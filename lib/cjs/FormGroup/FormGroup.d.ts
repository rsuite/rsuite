import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface FormGroupProps extends WithAsProps {
    /**
     * Sets id on `<Form.Control>` and `htmlFor` on `<Form.ControlLabel>`.
     * And generate ʻaria-labelledby` and ʻaria-describedby` for `<Form.Control>`.
     */
    controlId?: string;
}
export declare const useFormGroup: (controlId?: string) => {
    /**
     * The `id` of the `<Form.Control>` component.
     */
    controlId: string;
    /**
     * The `id` of the `<Form.HelpText>` component.
     */
    helpTextId: string;
    /**
     * The `id` of the `<Form.ControlLabel>` component.
     */
    labelId: string;
    /**
     * The `id` of the `<Form.ErrorMessage>` component.
     */
    errorMessageId: string;
};
/**
 * The `<Form.Group>` component is the easiest way to add some structure to forms.
 * @see https://rsuitejs.com/components/form/
 */
declare const FormGroup: RsRefForwardingComponent<'div', FormGroupProps>;
export default FormGroup;
