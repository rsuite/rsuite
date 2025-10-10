import React, { FormHTMLAttributes } from 'react';
import { Schema } from 'schema-typed';
import FormControl from '../FormControl';
import FormControlLabel from '../FormControlLabel';
import FormErrorMessage from '../FormErrorMessage';
import FormGroup from '../FormGroup';
import FormHelpText from '../FormHelpText';
import { WithAsProps, TypeAttributes, RsRefForwardingComponent } from '../internals/types';
import { FormInstance } from './hooks/useFormRef';
export interface FormProps<V = Record<string, any>, M = any, E = {
    [P in keyof V]?: M;
}> extends WithAsProps, Omit<FormHTMLAttributes<HTMLFormElement>, 'onChange' | 'onSubmit' | 'onError' | 'onReset'> {
    /**
     * Set the left and right columns of the layout of the elements within the form。
     *
     * @default 'vertical'
     */
    layout?: 'horizontal' | 'vertical' | 'inline';
    /**
     * The fluid property allows the Input 100% of the form to fill the container, valid only in vertical layouts.
     */
    fluid?: boolean;
    /**
     * Current value of the input. Creates a controlled component
     */
    formValue?: V | null;
    /**
     * Initial value
     */
    formDefaultValue?: V | null;
    /**
     * Error message of form
     */
    formError?: E | null;
    /**
     * Trigger the type of form validation.
     *
     * @default 'change'
     */
    checkTrigger?: TypeAttributes.CheckTrigger;
    /**
     * SchemaModel object
     *
     * @see https://github.com/rsuite/schema-typed
     */
    model?: Schema;
    /**
     * Make the form readonly
     */
    readOnly?: boolean;
    /**
     * Render the form as plain text
     */
    plaintext?: boolean;
    /**
     * Disable the form
     */
    disabled?: boolean;
    /**
     * The error message comes from context
     */
    errorFromContext?: boolean;
    /**
     * The form data is nested.
     * You may now nest fields with "dot syntax" (e.g. address.city).
     *
     * @default false
     * @version v5.51.0
     * @example
     * ```jsx
     * <Form formValue={{ address: { city: 'Shanghai' } }} nestedField>
     *  <FormControl name="address.city" />
     * </Form>
     * ```
     */
    nestedField?: boolean;
    /**
     * Callback fired when data changing
     */
    onChange?: (formValue: V, event?: React.SyntheticEvent) => void;
    /**
     * Callback fired when error checking
     */
    onError?: (formError: E) => void;
    /**
     * Callback fired when data cheking
     */
    onCheck?: (formError: E) => void;
    /**
     * Callback fired when form submit，only when the form data is validated will trigger
     */
    onSubmit?: (formValue: V | null, event?: React.FormEvent<HTMLFormElement>) => void;
    /**
     * Callback fired when form reset
     */
    onReset?: (formValue: V | null, event?: React.FormEvent<HTMLFormElement>) => void;
}
export interface FormComponent extends RsRefForwardingComponent<'form', FormProps & {
    ref?: React.Ref<FormInstance>;
}> {
    Control: typeof FormControl;
    ControlLabel: typeof FormControlLabel;
    ErrorMessage: typeof FormErrorMessage;
    Group: typeof FormGroup;
    HelpText: typeof FormHelpText;
}
/**
 * The `Form` component is a form interface for collecting and validating user input.
 * @see https://rsuitejs.com/components/form
 */
declare const Form: FormComponent;
export default Form;
