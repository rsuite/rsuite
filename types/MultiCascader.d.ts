import * as React from 'react';

import { FormControlPickerProps } from './index';

export interface MultiCascaderProps extends FormControlPickerProps<any[]> {
  cascade?: boolean;

  /** A picker that can be counted */
  countable?: boolean;

  /** Sets the width of the menu */
  menuWidth?: number;

  /** Sets the height of the menu */
  menuHeight?: number;

  /** Set the option value for the check box not to be rendered */
  uncheckableItemValues?: any[];

  /** Custom render menu */
  renderMenu?: (children: object[], menu: React.ReactNode, parentNode?: object) => React.ReactNode;

  /** Custom render menu items */
  renderMenuItem?: (itemLabel: React.ReactNode, item: object) => React.ReactNode;

  /** Custom render selected items */
  renderValue?: (
    value: any[],
    selectedItems: any[],
    selectedElement: React.ReactNode
  ) => React.ReactNode;

  /** Called when the option is selected */
  onSelect?: (value: any, activePaths: any[], event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called when clean */
  onClean?: (event: React.SyntheticEvent<HTMLElement>) => void;
}

declare const MultiCascader: React.ComponentType<MultiCascaderProps>;

export default MultiCascader;
