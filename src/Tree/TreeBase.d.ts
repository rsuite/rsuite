import { StandardProps } from '../@types/common';

export interface TreeBaseProps extends StandardProps {
  /** Expand all nodes By default */
  defaultExpandAll?: boolean;

  /** Expand all nodes */
  expandAll?: boolean;

  /** searchKeyword (Controlled) */
  searchKeyword?: string;

  /** Callback function for data change */
  onExpand?: (activeNode: any, labyer: number, concat: (data, children) => any[]) => void;

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
}
