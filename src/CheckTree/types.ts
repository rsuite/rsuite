import { CheckStateType } from '../utils/constants';

export interface TreeNode {
  uncheckable?: boolean;
  refKey?: string;
  check?: boolean;
  parent?: TreeNode;
  checkAll?: boolean;
  visible?: boolean;
  expand?: boolean;
  layer?: number;
  label?: string | React.ReactNode;
  value?: string | number;
  groupBy?: string;
  children?: TreeNode[];
  hasChildren?: boolean;
  checkState?: CheckStateType;
}

export interface TreeNodeMap {
  [key: string]: TreeNode;
}
