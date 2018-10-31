import * as React from 'react';
import { PropTypes, FormControlPickerProps } from './';
import { TreeBaseProps } from './TreeBase';

export interface TreePickerProps extends TreeBaseProps, FormControlPickerProps<any> {
  /** Whether inline display tree */
  inline?: boolean;
}

declare const TreePicker: React.ComponentType<TreePickerProps>;

export default TreePicker;
