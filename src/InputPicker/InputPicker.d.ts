import * as React from 'react';

import { FormControlPickerProps } from '../@types/common';
import { SelectProps } from '../SelectPicker/SelectPicker.d';

export interface InputPickerProps extends FormControlPickerProps<any>, SelectProps<any> {
  /** Settings can create new options */
  creatable?: boolean;
}

declare const InputPicker: React.ComponentType<InputPickerProps>;

export default InputPicker;
