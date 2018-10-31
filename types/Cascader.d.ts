import * as React from 'react';

import { FormControlPickerProps } from './index';

export interface CascaderProps extends FormControlPickerProps<any> {
  /** Sets the width of the menu */
  menuWidth?: number;

  /** Sets the height of the menu */
  menuHeight?: number;

  /** Custom render menu */
  renderMenu?: (itemLabel: React.ReactNode, item: object) => React.ReactNode;

  /** Custom render menu items */
  renderMenuItem?: (itemLabel: React.ReactNode, item: object) => React.ReactNode;

  /** Custom render selected items */
  renderValue?: (activePaths?: any[]) => React.ReactNode;

  /** Called when the option is selected */
  onSelect?: (value: any, activePaths: any[], event: React.SyntheticEvent<HTMLElement>) => void;
}

declare const Cascader: React.ComponentType<CascaderProps>;

export default Cascader;
