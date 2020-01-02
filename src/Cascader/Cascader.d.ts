import * as React from 'react';

import { FormControlPickerProps } from '../@types/common';

export interface CascaderProps extends FormControlPickerProps<any> {
  /** Sets the width of the menu */
  menuWidth?: number;

  /** Sets the height of the menu */
  menuHeight?: number | string;

  /** Custom render menu */
  renderMenu?: (children: object[], menu: React.ReactNode, parentNode?: object) => React.ReactNode;

  /** Custom render menu items */
  renderMenuItem?: (itemLabel: React.ReactNode, item: object) => React.ReactNode;

  /** Custom render selected items */
  renderValue?: (
    value: any,
    activePaths: any[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;

  /** Called when the option is selected */
  onSelect?: (
    value: any,
    activePaths: any[],
    concat: (data: any, children: any) => any[],
    event: React.SyntheticEvent<HTMLElement>
  ) => void;

  /** Called when clean */
  onClean?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called when searching */
  onSearch?: (searchKeyword: string, event: React.SyntheticEvent<HTMLElement>) => void;

  /** Whether dispaly search input box */
  searchable?: boolean;

  /** The menu is displayed directly when the component is initialized */
  inline?: boolean;

  /** When true, make the parent node selectable */
  parentSelectable?: boolean;
}

declare const Cascader: React.ComponentType<CascaderProps>;

export default Cascader;
