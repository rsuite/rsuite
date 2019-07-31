import * as React from 'react';

import { FormControlPickerProps } from '../@types/common';
import { SelectProps } from '../SelectPicker/SelectPicker.d';

export interface TagPickerProps extends FormControlPickerProps, SelectProps<any[]> {
  /** Option to cache value when searching asynchronously */
  cacheData?: any[];

  /** Settings can create new options */
  creatable?: boolean;
}

declare const TagPicker: React.ComponentType<TagPickerProps>;

export default TagPicker;
