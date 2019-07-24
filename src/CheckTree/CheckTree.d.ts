import * as React from 'react';

import { FormControlPickerProps } from '../@types/common';
import { TreeBaseProps } from '../Tree/TreeBase';

export interface CheckTreeProps extends TreeBaseProps, FormControlPickerProps {
  /** The height of Dropdown */
  height?: number;

  /** Tree node cascade */
  cascade?: boolean;

  /** Whether using virtualized list */
  virtualized?: boolean;
}

declare const CheckTree: React.ComponentType<CheckTreeProps>;

export default CheckTree;
