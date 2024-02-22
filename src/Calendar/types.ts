import React from 'react';
import { CalendarLocale } from '../locales';

export interface CalendarInnerContextValue {
  date: Date;
  dateRange?: Date[];
  disabledDate?: (date: Date, selectRangeValue?: Date[], type?: string) => boolean;
  format?: string;
  hoverRangeValue?: [Date, Date];
  inSameMonth?: (date: Date) => boolean;
  isoWeek: boolean;
  onChangeMonth?: (nextPageDate: Date, event: React.MouseEvent) => void;
  onChangeTime?: (nextPageTime: Date, event: React.MouseEvent) => void;
  onMouseMove?: (date: Date) => void;
  onSelect?: (date: Date, event: React.MouseEvent) => void;
  renderCell?: (date: Date) => React.ReactNode;
  renderCellOnPicker?: (date: Date) => React.ReactNode;
  cellClassName?: (date: Date) => string | undefined;
  showWeekNumbers?: boolean;
  inline?: boolean;
  targetId?: string;
}

export interface CalendarContextValue extends CalendarInnerContextValue {
  locale: CalendarLocale;
  formatDate?: (
    date: Date | string | number,
    format?: string,
    options?: {
      locale?: any;
    }
  ) => string;
}
