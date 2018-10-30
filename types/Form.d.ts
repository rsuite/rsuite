import * as React from 'react';

export interface FormProps {
  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Additional classes */
  className?: string;

  /** Set the left and right columns of the layout of the elements within the form */
  layout?: 'horizontal' | 'vertical' | 'inline';

  /** The fluid property allows the Input 100% of the form to fill the container, valid only in vertical layouts. */
  fluid?: boolean;

  /** Current value of the input. Creates a controlled component */
  formValue?: Object;

  /** Initial value */
  formDefaultValue?: Object;

  /** Error message of form */
  formError?: Object;

  /** Delayed processing when data check, unit: millisecond */
  checkDelay?: number;

  /** Trigger the type of form validation */
  checkTrigger?: 'change' | 'blur' | 'none';

  /** SchemaModel Object */
  model?: Object;

  /** Callback fired when data changing */
  onChange?: (formValue: Object, event: React.SyntheticEvent<HTMLElement>) => void;

  /** Callback fired when error checking */
  onError?: (formError: Object) => void;

  /** Callback fired when data cheking */
  onCheck?: (formError: Object) => void;
}

declare const Form: React.ComponentType<FormProps>;

export default Form;
