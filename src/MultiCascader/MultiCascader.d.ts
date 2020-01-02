import * as React from 'react';

import { FormControlPickerProps } from '../@types/common';

export interface MultiCascaderProps<ValueType = any> extends FormControlPickerProps {
  cascade?: boolean;

  /** A picker that can be counted */
  countable?: boolean;

  /** Sets the width of the menu */
  menuWidth?: number;

  /** Sets the height of the menu */
  menuHeight?: number | string;

  /** Set the option value for the check box not to be rendered */
  uncheckableItemValues?: ValueType[];

  /** Whether dispaly search input box */
  searchable?: boolean;

  /** Custom render menu */
  renderMenu?: (children: object[], menu: React.ReactNode, parentNode?: object) => React.ReactNode;

  /** Custom render menu items */
  renderMenuItem?: (itemLabel: React.ReactNode, item: object) => React.ReactNode;

  /** Custom render selected items */
  renderValue?: (
    value: ValueType[],
    selectedItems: any[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;

  /** Called when the option is selected */
  onSelect?: (
    value: ValueType,
    activePaths: any[],
    concat: (data: any, children: any) => any[],
    event: React.SyntheticEvent<HTMLElement>
  ) => void;

  /** Called when clean */
  onClean?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called when searching */
  onSearch?: (searchKeyword: string, event: React.SyntheticEvent<HTMLElement>) => void;

  /** The menu is displayed directly when the component is initialized */
  inline?: boolean;
}

declare const MultiCascader: React.ComponentType<MultiCascaderProps>;

export default MultiCascader;
