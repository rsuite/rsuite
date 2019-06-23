import * as React from 'react';

import { FormControlPickerProps } from './index';
import { SelectProps } from './SelectPicker';

export interface TagPickerProps extends FormControlPickerProps<any[]>, SelectProps<any[]> {
  /** Option to cache value when searching asynchronously */
  cacheData?: any[];

  /** Settings can create new options */
  creatable?: boolean;
}

declare const TagPicker: React.ComponentType<TagPickerProps>;

export default TagPicker;
