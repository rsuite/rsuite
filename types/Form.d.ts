import * as React from 'react';

import { StandardProps, PropTypes } from './index';

export interface FormProps extends StandardProps {
  /** Set the left and right columns of the layout of the elements within the form */
  layout?: 'horizontal' | 'vertical' | 'inline';

  /** The fluid property allows the Input 100% of the form to fill the container, valid only in vertical layouts. */
  fluid?: boolean;

  /** Current value of the input. Creates a controlled component */
  formValue?: object;

  /** Initial value */
  formDefaultValue?: object;

  /** Error message of form */
  formError?: object;

  /** Delayed processing when data check, unit: millisecond */
  checkDelay?: number;

  /** Trigger the type of form validation */
  checkTrigger?: PropTypes.CheckTrigger;

  /** SchemaModel object */
  model?: object;

  /** Make the form readonly */
  readOnly?: boolean;

  /** Render the form as plain text */
  plaintext?: boolean;

  /** Callback fired when data changing */
  onChange?: (formValue: object, event: React.SyntheticEvent<HTMLElement>) => void;

  /** Callback fired when error checking */
  onError?: (formError: object) => void;

  /** Callback fired when data cheking */
  onCheck?: (formError: object) => void;
}

declare const Form: React.ComponentType<FormProps>;

export default Form;
