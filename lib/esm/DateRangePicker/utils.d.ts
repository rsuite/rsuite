import { DateRange } from './types';
import type { Locale } from 'date-fns';
export declare function getSafeCalendarDate({ value, calendarKey, allowSameMonth }: {
    value: [] | [Date] | [Date, Date] | null;
    calendarKey?: 'start' | 'end';
    allowSameMonth?: boolean;
}): DateRange;
export declare const isSameRange: (source: DateRange | null, dest: DateRange | null, format: string) => boolean;
export declare const getMonthHoverRange: (date: Date) => DateRange;
export declare const getWeekHoverRange: (date: Date, options: {
    isoWeek: boolean;
    weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    locale?: Locale;
}) => DateRange;
