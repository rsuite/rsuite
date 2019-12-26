import * as React from 'react';
import { StandardProps } from '../@types/common';

export interface CalendarPanelProps extends StandardProps {
  /** Controlled value */
  value?: Date;

  /** Default value  */
  defaultValue?: Date;

  /** ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day  */
  isoWeek?: boolean;

  /** Display a compact calendar   */
  compact?: boolean;

  /** Show border   */
  bordered?: boolean;

  /**  Callback fired before the value changed  */
  onChange?: (date: Date) => void;

  /** Callback fired before the date selected */
  onSelect?: (date: Date) => void;

  /** Custom render calendar cells  */
  renderCell?: (date: Date) => React.ReactNode;
}

declare const CalendarPanel: React.ComponentType<CalendarPanelProps>;

export default CalendarPanel;
