import * as React from 'react';

import { FormControlPickerProps, ItemDataType } from '../@types/common';
import { ListProps } from 'react-virtualized/dist/commonjs/List';

export interface SelectProps<ValueType = any> {
  /** Set group condition key in data */
  groupBy?: string;

  /** Sort options */
  sort?: (isGroup: boolean) => (a: any, b: any) => number;

  /** Whether dispaly search input box */
  searchable?: boolean;

  /** Customizing the Rendering Menu list */
  renderMenu?: (menu: React.ReactNode) => React.ReactNode;

  /** Custom render menuItems */
  renderMenuItem?: (label: React.ReactNode, item: ItemDataType) => React.ReactNode;

  /** Custom render menu group */
  renderMenuGroup?: (title: React.ReactNode, item: ItemDataType) => React.ReactNode;

  /** Custom render selected items */
  renderValue?: (
    value: ValueType,
    item: ItemDataType | ItemDataType[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;

  /** Called when the option is selected */
  onSelect?: (value: any, item: ItemDataType, event: React.SyntheticEvent<any>) => void;

  /** Called after clicking the group title */
  onGroupTitleClick?: (event: React.SyntheticEvent<any>) => void;

  /** Called when searching */
  onSearch?: (searchKeyword: string, event: React.SyntheticEvent<any>) => void;

  /** Called when clean */
  onClean?: (event: React.SyntheticEvent<any>) => void;

  /** Whether using virtualized list */
  virtualized?: boolean;

  /**
   * List-related properties in `react-virtualized`
   * https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md#prop-types
   */
  listProps?: ListProps;

  /** Custom search rules. */
  searchBy?: (keyword: string, label: React.ReactNode, item: ItemDataType) => boolean;
}

export interface SelectPickerProps extends FormControlPickerProps<any>, SelectProps<any> {}

declare const SelectPicker: React.ComponentType<SelectPickerProps>;

export default SelectPicker;
