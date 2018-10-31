import * as React from 'react';

import { FormControlPickerProps } from './index';
import { SelectProps } from './SelectPicker';

export interface InputPickerProps extends FormControlPickerProps<any>, SelectProps<any> {
  /** Settings can create new options */
  creatable?: boolean;
}

declare const InputPicker: React.ComponentType<InputPickerProps>;

export default InputPicker;
