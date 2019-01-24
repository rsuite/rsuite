import * as React from 'react';
import { PropTypes, FormControlPickerProps } from './';
import { TreeBaseProps } from './TreeBase';

export interface TreePickerProps extends TreeBaseProps, FormControlPickerProps<any> {
  /** Whether dispaly search input box */
  searchable?: boolean;

  /** Whether inline display tree */
  inline?: boolean;

  /** Whether using virtualized list */
  virtualized?: boolean;

  /** Custom Render TreePicker Menu */
  renderMenu?: (menu: React.ReactNode) => React.ReactNode;

  /** Custom Render Placeholder */
  renderValue?: (value: any, item: object, selectedElement: React.ReactNode) => React.ReactNode;
}

declare const TreePicker: React.ComponentType<TreePickerProps>;

export default TreePicker;
