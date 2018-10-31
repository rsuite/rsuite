import * as React from 'react';

import { FormControlPickerProps } from './index';

export interface SelectProps<ValueType = any> {
  /** Set group condition key in data */
  groupBy?: string;

  /** Whether dispaly search input box */
  searchable?: boolean;

  /** Customizing the Rendering Menu list */
  renderMenu?: (menu: React.ReactNode) => React.ReactNode;

  /** Custom render menuItems */
  renderMenuItem?: (label: React.ReactNode, item: object) => React.ReactNode;

  /** Custom render menu group */
  renderMenuGroup?: (title: React.ReactNode, item: object) => React.ReactNode;

  /** Custom render selected items */
  renderValue?: (value: ValueType, items: any[]) => React.ReactNode;

  /** Called when the option is selected */
  onSelect?: (value: any, item: object, event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called after clicking the group title */
  onGroupTitleClick?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called when searching */
  onSearch?: (searchKeyword: string, event: React.SyntheticEvent<HTMLElement>) => void;
}

declare const SelectPicker: React.ComponentType<FormControlPickerProps<any> & SelectProps<any>>;

export default SelectPicker;
