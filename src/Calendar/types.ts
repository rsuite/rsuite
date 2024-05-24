import React from 'react';
import { CalendarLocale } from '../locales';

export interface CalendarInnerContextValue {
  date: Date;
  dateRange?: Date[];
  format?: string;
  hoverRangeValue?: [Date, Date];
  inline?: boolean;
  isoWeek: boolean;
  weekStart: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  showWeekNumbers?: boolean;
  targetId?: string;
  disabledDate?: (date: Date, selectRangeValue?: Date[], type?: string) => boolean;
  inSameMonth?: (date: Date) => boolean;
  onChangeMonth?: (nextPageDate: Date, event: React.MouseEvent) => void;
  onChangeTime?: (nextPageTime: Date, event: React.MouseEvent) => void;
  onMouseMove?: (date: Date) => void;
  onSelect?: (date: Date, event: React.MouseEvent) => void;
  renderCell?: (date: Date) => React.ReactNode;
  renderCellOnPicker?: (date: Date) => React.ReactNode;
  cellClassName?: (date: Date) => string | undefined;
}

export interface CalendarContextValue extends CalendarInnerContextValue {
  locale: CalendarLocale;
  formatDate?: (
    date: Date | string | number,
    format?: string,
    options?: { locale?: any }
  ) => string;
}
