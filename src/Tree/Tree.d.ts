import * as React from 'react';
import { TreeBaseProps } from './TreeBase';

interface DataItem<T> {
  value: T;
  label: React.ReactNode;
  children?: DataItem<T>[];
}

export interface TreeProps<ValueType = any, DataType = DataItem<ValueType>> extends TreeBaseProps {
  /** Tree Data */
  data?: DataType[];

  /** Selected value */
  value?: ValueType;

  /** Whether using virtualized list */
  virtualized?: boolean;

  /** Tree data structure Label property name */
  labelKey?: keyof DataType;

  /** ree data Structure Value property name */
  valueKey?: keyof DataType;

  /** Tree data structure Children property name */
  childrenKey?: keyof DataType;

  /** Default selected Value  */
  defaultValue?: ValueType;

  /** Disabled items */
  disabledItemValues?: ValueType[];
}

declare const Tree: React.ComponentType<TreeBaseProps>;

export default Tree;
