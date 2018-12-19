import * as React from 'react';

import { FormControlPickerProps } from './index';
import { TreeBaseProps } from './TreeBase';

export interface CheckTreePickerProps extends TreeBaseProps, FormControlPickerProps<any[]> {
  /** The height of Dropdown */
  height?: number;

  /** Tree node cascade */
  cascade?: boolean;

  /** A picker that can be counted */
  countable?: boolean;

  /** Whether dispaly search input box */
  searchable?: boolean;

  /** Set the option value for the check box not to be rendered */
  uncheckableItemValues?: any[];

  /** Customizing the Rendering Menu list */
  renderMenu?: (menu: React.ReactNode) => React.ReactNode;

  /** Custom render selected items */
  renderValue?: (
    value: any[],
    selectedItems: any[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;

  /** Called when scrolling */
  onScroll?: (event: React.SyntheticEvent<HTMLElement>) => void;
}

declare const CheckTreePicker: React.ComponentType<CheckTreePickerProps>;

export default CheckTreePicker;
