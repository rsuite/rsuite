import * as React from 'react';

export interface FormGroupProps {
  /** Additional classes */
  className?: string;

  /** The prefix of the component CSS class */
  classPrefix: string;

  /** Sets id for controlled component   */
  controlId?: string;
}

declare const FormGroup: React.ComponentType<FormGroupProps>;

export default FormGroup;
