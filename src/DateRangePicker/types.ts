import React from 'react';
import { DATERANGE_DISABLED_TARGET } from '../utils/constants';

export type ValueType = [Date?, Date?];

export type DateRange = [Date, Date];

export interface RangeType<T = DateRange> {
  label: React.ReactNode;
  value: T | ((value?: T) => T);
  closeOverlay?: boolean;
  placement?: 'bottom' | 'left';
}

export type DisabledDateFunction = (
  /**
   * Date used to determine if disabling is required.
   */
  date: Date,

  /**
   * Date selected.
   */
  selectDate?: ValueType,

  /**
   * Whether to choose to finish now.
   * If `false`, only the start date is selected, waiting for the selection end date.
   */
  selectedDone?: boolean,

  /**
   * Call the target of the `shouldDisableDate` function.
   */
  target?: DATERANGE_DISABLED_TARGET
) => boolean;
