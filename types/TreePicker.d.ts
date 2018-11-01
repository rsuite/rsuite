import * as React from 'react';
import { PropTypes, FormControlPickerProps } from './';
import { TreeBaseProps } from './TreeBase';

export interface TreePickerProps extends TreeBaseProps, FormControlPickerProps<any> {
  /** Whether dispaly search input box */
  searchable?: boolean;

  /** Whether inline display tree */
  inline?: boolean;

  /** Custom Render TreePicker Menu */
  renderMenu?: (menu: React.ReactNode) => React.ReactNode;

  /** Custom Render Placeholder */
  renderValue?: (activeNode: object, placeholder: React.ReactNode) => React.ReactNode;
}

declare const TreePicker: React.ComponentType<TreePickerProps>;

export default TreePicker;
