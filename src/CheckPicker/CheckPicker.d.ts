import * as React from 'react';

import { FormControlPickerProps, ItemDataType } from '../@types/common';
import { BaseSelectProps } from '../SelectPicker/SelectPicker.d';

export interface CheckPickerProps extends FormControlPickerProps<any[]>, BaseSelectProps {
  /** Top the selected option in the options */
  sticky?: boolean;

  /** A picker that can be counted */
  countable?: boolean;

  /** Custom render selected items */
  renderValue?: (
    value: any[],
    item: ItemDataType[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;
}

declare const CheckPicker: React.ComponentType<CheckPickerProps>;

export default CheckPicker;
