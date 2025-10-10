import React from 'react';
import type { CheckType } from 'schema-typed';
import Input from '../Input';
import { TypeAttributes, FormControlBaseProps, WithAsProps } from '../internals/types';
/**
 * Props that FormControl passes to its accepter
 */
export type FormControlAccepterProps<ValueType = any> = FormControlBaseProps<ValueType>;
export interface FormControlProps<P = any, ValueType = any> extends WithAsProps, Omit<React.HTMLAttributes<HTMLFormElement>, 'value' | 'onChange'> {
    /** Proxied components */
    accepter?: React.ElementType<P & FormControlBaseProps<ValueType>>;
    /**
     * The name of form-control, support nested path. such as `address.city`.
     * The path will be used to get and set form values.
     *
     * @example
     * ```js
     * <Form formValue={{ address: { city: 'Shanghai' } }}>
     *   <FormControl name="address.city" />
     * </Form>
     * ```
     **/
    name: string;
    /** Value */
    value?: ValueType;
    /** Callback fired when data changing */
    onChange?(value: ValueType, event: React.SyntheticEvent): void;
    /** The data validation trigger type, and it wiill overrides the setting on <Form> */
    checkTrigger?: TypeAttributes.CheckTrigger;
    /** Show error messages */
    errorMessage?: React.ReactNode;
    /** The placement of error messages */
    errorPlacement?: TypeAttributes.Placement8;
    /** Make the control readonly */
    readOnly?: boolean;
    /** Render the control as plain text */
    plaintext?: boolean;
    /** Disable the form control. */
    disabled?: boolean;
    /** Asynchronous check value */
    checkAsync?: boolean;
    /** Remove field value and error message when component is unmounted  */
    shouldResetWithUnmount?: boolean;
    /** Validation rule */
    rule?: CheckType<unknown, any>;
}
interface FormControlComponent extends React.FC<FormControlProps> {
    <Accepter extends React.ElementType = typeof Input>(props: FormControlProps & {
        accepter?: Accepter;
    } & React.ComponentPropsWithRef<Accepter>): React.ReactElement | null;
}
/**
 * The `<Form.Control>` component is used to wrap the components that need to be validated.
 * @see https://rsuitejs.com/components/form/
 */
declare const FormControl: FormControlComponent;
export default FormControl;
