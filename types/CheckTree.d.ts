import * as React from 'react';

import { FormControlPickerProps } from './index';
import { TreeBaseProps } from './TreeBase';

export interface CheckTreeProps extends TreeBaseProps, FormControlPickerProps<any[]> {
  /** The height of Dropdown */
  height?: number;

  /** Tree node cascade */
  cascade: boolean;
}

declare const CheckTree: React.ComponentType<CheckTreeProps>;

export default CheckTree;
