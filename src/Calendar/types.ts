import React from 'react';

export interface CalendarLocale {
  sunday?: string;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  ok?: string;
  today?: string;
  yesterday?: string;
  hours?: string;
  minutes?: string;
  seconds?: string;
  /**
   * Format of the string is based on Unicode Technical Standard #35:
   * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
   **/
  formattedMonthPattern?: string;
  formattedDayPattern?: string;
}

export interface CalendarInnerContextValue {
  date: Date;
  format?: string;
  disabledDate?: (date: Date) => boolean;
  timeZone?: string;
  showWeekNumbers?: boolean;
  isoWeek?: boolean;
  onSelect?: (date: Date, event: React.MouseEvent<HTMLDivElement>) => void;
  renderCell?: (date: Date) => React.ReactNode;
  onChangePageDate?: (nextPageDate: Date, event: React.MouseEvent) => void;
  onChangePageTime?: (nextPageTime: Date, event: React.MouseEvent) => void;
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
