import { StandardProps } from '../@types/common';

export interface RowProps {
  node: object; // Index of row
  isScrolling: boolean; // The List is currently being scrolled
  isVisible: boolean; // This row is visible within the List (eg it is not an overscanned row)
  key?: any; // Unique key within array of rendered rows
  parent: any; // Reference to the parent List (instance)
  style?: React.CSSProperties; // Style object to be applied to row (to position it);
}

export interface TreeBaseProps extends StandardProps {
  /** Display inline */
  inline?: boolean;

  /** Expand all nodes(Controlled) */
  expandAll?: boolean;

  /** Expand all nodes By default */
  defaultExpandAll?: boolean;

  /** searchKeyword (Controlled) */
  searchKeyword?: string;

  /** Callback function for data change */
  onExpand?: (
    expandItemValues: any[],
    activeNode: any,
    concat: (data: any[], children: React.ReactNode) => any[]
  ) => void;

  /** Callback function after selecting tree node */
  onSelect?: (activeNode: any, value: any, event: React.SyntheticEvent<any>) => void;

  /** Custom Render tree Node */
  renderTreeNode?: (nodeData: any) => React.ReactNode;

  /** Custom Render icon */
  renderTreeIcon?: (nodeData: any) => React.ReactNode;

  /** callback fired when search */
  onSearch?: (searchKeyword: string, event: React.KeyboardEvent<HTMLInputElement>) => void;

  /** Called when clean */
  onClean?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /** Custom search rules. */
  searchBy?: (keyword: string, label: React.ReactNode, item: any) => boolean;
}
