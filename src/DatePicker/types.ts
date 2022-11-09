import { ReactNode } from 'react';

export type ToolbarValue = Date | [Date?, Date?];

export interface RangeType<T> {
  label: ReactNode;
  closeOverlay?: boolean;
  value: T | ((value: T) => T);
  placement?: 'bottom' | 'left';
}

export interface InnerRange<T> extends Omit<RangeType<T>, 'value'> {
  value: T;
}
