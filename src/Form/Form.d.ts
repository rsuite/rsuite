import * as React from 'react';

import { StandardProps, TypeAttributes } from '../@types/common';
import { Schema } from '../Schema/Schema.d';

export interface FormProps<T = Record<string, any>, E = { [P in keyof T]?: T[P] }>
  extends StandardProps {
  /** Set the left and right columns of the layout of the elements within the form */
  layout?: 'horizontal' | 'vertical' | 'inline';

  /** The fluid property allows the Input 100% of the form to fill the container, valid only in vertical layouts. */
  fluid?: boolean;

  /** Current value of the input. Creates a controlled component */
  formValue?: T;

  /** Initial value */
  formDefaultValue?: T;

  /** Error message of form */
  formError?: E;

  /** Delayed processing when data check, unit: millisecond */
  checkDelay?: number;

  /** Trigger the type of form validation */
  checkTrigger?: TypeAttributes.CheckTrigger;

  /** SchemaModel object */
  model?: Schema;

  /** Make the form readonly */
  readOnly?: boolean;

  /** Render the form as plain text */
  plaintext?: boolean;

  /** Callback fired when data changing */
  onChange?: (formValue: T, event: React.SyntheticEvent<HTMLElement>) => void;

  /** Callback fired when error checking */
  onError?: (formError: E) => void;

  /** Callback fired when data cheking */
  onCheck?: (formError: E) => void;
}

declare const Form: React.ComponentType<FormProps>;

export default Form;
