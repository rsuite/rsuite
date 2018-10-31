import * as React from 'react';

import { FormControlPickerProps } from './index';

export interface CheckTreePickerProps extends FormControlPickerProps<any[]> {
  /** The height of Dropdown */
  height?: number;

  /** Tree node cascade */
  cascade: boolean;

  /** Expand all nodes, controlled */
  expandAll?: boolean;

  /** Initially expand all nodes */
  defaultExpandAll?: boolean;

  /** Set children key in data */
  childrenKey?: string;

  /** Initial search keyword */
  searchKeyword?: string;

  /** Whether dispaly search input box */
  searchable?: boolean;

  /** Customizing the Rendering Menu list */
  renderMenu?: (menu: React.ReactNode) => React.ReactNode;

  /** Custom render tree node */
  renderTreeNode?: (nodeData: object) => React.Node;

  /** Custom render icon of tree node */
  renderTreeIcon?: (nodeData: object) => React.Node;

  /** Custom render selected items */
  renderValue?: (values: any[], checkItems: any[], placeholder: string | React.Node) => React.Node;

  /** Called after the node is expanded */
  onExpand?: (activeNode: any, labyer: number) => void;

  /** Called when scrolling */
  onScroll?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called when the option is selected */
  onSelect?: (activeNode: any, layer: number, values: any) => void;

  /** Called when searching */
  onSearch?: (searchKeyword: string, event: React.SyntheticEvent<HTMLElement>) => void;
}

declare const CheckTreePicker: React.ComponentType<CheckTreePickerProps>;

export default CheckTreePicker;
