import * as React from 'react';

import { StandardProps } from './index';

export interface FormGroupProps extends StandardProps {
  /** Sets id for controlled component   */
  controlId?: string;
}

declare const FormGroup: React.ComponentType<FormGroupProps>;

export default FormGroup;
