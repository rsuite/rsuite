import * as React from 'react';

import { FormControlPickerProps } from '../@types/common';
import { TreeBaseProps } from '../Tree/TreeBase';

export interface CheckTreePickerProps extends TreeBaseProps, FormControlPickerProps<any[]> {
  /** The height of Dropdown */
  height?: number;

  /** Tree node cascade */
  cascade?: boolean;

  /** A picker that can be counted */
  countable?: boolean;

  /** Whether dispaly search input box */
  searchable?: boolean;

  /** Whether using virtualized list */
  virtualized?: boolean;

  /** Set the option value for the check box not to be rendered */
  uncheckableItemValues?: any[];

  /** Set the option value for the expand node */
  defaultExpandItemValues?: any[];

  /** Set the option value for the expand node with controlled*/
  expandItemValues?: any[];

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
