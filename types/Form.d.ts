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

  /** Callback fired when data changing */
  onChange?: (formValue: object, event: React.SyntheticEvent<HTMLElement>) => void;

  /** Callback fired when error checking */
  onError?: (formError: object) => void;

  /** Callback fired when data cheking */
  onCheck?: (formError: object) => void;
}

declare class Form extends React.Component<FormProps, any> {
  /** Verify form data */
  check(callback?: (formError: object) => void): boolean;

  /** Check single field value */
  checkForField(fieldName: string, callback?: (checkResult: object) => void): boolean;

  /** Clean error message. */
  cleanErrors(callback?: () => void): void;

  cleanErrorForField(fieldName: string, callback?: () => void): void;

  resetErrors(formError: object, callback?: () => void): void;
}

export default Form;
