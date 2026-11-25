import { ReactNode } from 'react';

export interface DateOptionPreset<T> {
  /**
   * The display label for the date option.
   */
  label: ReactNode;

  /**
   * The value of the date option, which can be:
   * - A specific value of type `T`.
   * - A function that dynamically computes the value based on the provided current value.
   */
  value: T | ((currentValue?: T) => T);

  /**
   * Whether to close the overlay after selecting this option.
   * Defaults to `false` if not specified.
   */
  closeOverlay?: boolean;

  /**
   * The position of the preset option relative to the overlay.
   * Defaults to `bottom` if not specified.
   */
  placement?: 'bottom' | 'left';
}

export declare namespace DateFns {
  /**
   * FirstWeekContainsDate is used to determine which week is the first week of the year, based on what day the January, 1 is in that week.
   * The day in that week can only be 1 (Monday) or 4 (Thursday).
   * Please see https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system for more information.
   */
  type FirstWeekContainsDate = 1 | 4;

  /**
   * The day of the week type alias.
   * Unlike the date (the number of days since the beginning of the month), which begins with 1 and is dynamic (can go up to 28, 30, or 31), the day starts with 0 and static (always ends at 6).
   * Look at it as an index in an array where Sunday is the first element and Saturday is the last.
   */
  type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
