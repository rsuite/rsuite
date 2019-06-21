import * as React from 'react';
import { TreeBaseProps } from './TreeBase';

interface DataItem {
  value: any;
  label: React.ReactNode;
  children?: DataItem[];
}

interface TreeProps extends TreeBaseProps {
  /** Tree Data */
  data?: DataItem[];

  /** Selected value */
  value?: any;

  /** Whether using virtualized list */
  virtualized?: boolean;

  /** Tree data structure Label property name */
  labelKey?: string;

  /** ree data Structure Value property name */
  valueKey?: string;

  /** Tree data structure Children property name */
  childrenKey?: string;

  /** Default selected Value  */
  defaultValue?: any;

  /** Disabled items */
  disabledItemValues?: any[];
}
declare const Tree: React.ComponentType<TreeBaseProps>;

export default Tree;
