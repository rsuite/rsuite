import React from 'react';

export type ValueType = [Date?, Date?];

export interface RangeType {
  label: React.ReactNode;
  closeOverlay?: boolean;
  value: ValueType | ((value?: ValueType) => ValueType);
}

export enum DATE_RANGE_DISABLED_TARGET {
  CALENDAR = 'CALENDAR',
  TOOLBAR_BUTTON_OK = 'TOOLBAR_BUTTON_OK',
  TOOLBAR_SHORTCUT = 'TOOLBAR_SHORTCUT'
}

export type DisabledDateFunction = (
  /** Date used to determine if disabling is required. */
  date: Date,
  /** Date selected. */
  selectDate?: ValueType,
  /**
   * Whether to choose to finish now.
   * If `false`, only the start date is selected, waiting for the selection end date.
   */
  selectedDone?: boolean,
  // Call the target of the `disabledDate` function
  target?: DATE_RANGE_DISABLED_TARGET
) => boolean;
