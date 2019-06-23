import * as React from 'react';

import { StandardProps, TypeAttributes } from '../@types/common';
import { Schema } from '../Schema/Schema.d';

export interface FormProps extends StandardProps {
  /** Set the left and right columns of the layout of the elements within the form */
  layout?: 'horizontal' | 'vertical' | 'inline';

  /** The fluid property allows the Input 100% of the form to fill the container, valid only in vertical layouts. */
  fluid?: boolean;

  /** Current value of the input. Creates a controlled component */
  formValue?: any;

  /** Initial value */
  formDefaultValue?: any;

  /** Error message of form */
  formError?: any;

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
  onChange?: (formValue: any, event: React.SyntheticEvent<HTMLElement>) => void;

  /** Callback fired when error checking */
  onError?: (formError: any) => void;

  /** Callback fired when data cheking */
  onCheck?: (formError: any) => void;
}

declare const Form: React.ComponentType<FormProps>;

export default Form;
