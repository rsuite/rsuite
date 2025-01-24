import omit from 'lodash/omit';
import { omitTriggerPropKeys } from '@/internals/Picker';
import { ToolbarProps } from './Toolbar';
import {
  subDays,
  startOfDay,
  endOfDay,
  calendarOnlyProps,
  startOfToday
} from '@/internals/utils/date';
import type { DateOptionPreset } from '@/internals/types';
import type { InnerRange } from './types';
import type { DateRange } from '../DateRangePicker/types';

export function getDefaultRanges<T extends Date | DateRange>(value: T): InnerRange<T>[] {
  const today = startOfToday();

  /**
   * If it is an array type, it returns the default shortcut key suitable for DateRangePicker Toolbar,
   * otherwise it returns the default shortcut key suitable for DatePicker Toolbar
   */
  if (value instanceof Array) {
    return [
      { label: 'today', value: [startOfDay(today), endOfDay(today)] },
      {
        label: 'yesterday',
        value: [startOfDay(subDays(today, 1)), endOfDay(subDays(today, 1))]
      },
      { label: 'last7Days', value: [startOfDay(subDays(today, 6)), endOfDay(today)] }
    ] as InnerRange<T>[];
  }

  return [
    { label: 'today', value: today },
    { label: 'yesterday', value: subDays(today, 1) }
  ] as InnerRange<T>[];
}

const generateRangesIterator =
  <T extends Date | DateRange>({ calendarDate }: Pick<ToolbarProps<T>, 'calendarDate'>) =>
  ({ value, ...rest }: DateOptionPreset<T>): InnerRange<T> => ({
    value: typeof value === 'function' ? value(calendarDate) : value,
    ...rest
  });

/**
 * get Toolbar ranges from Toolbar props
 * @param ranges
 * @param calendarDate
 */
export const getRanges = <T extends Date | DateRange>({
  ranges,
  calendarDate
}: Pick<ToolbarProps<T>, 'ranges' | 'calendarDate'>): InnerRange<T>[] => {
  return typeof ranges === 'undefined'
    ? getDefaultRanges(calendarDate)
    : ranges.map(generateRangesIterator({ calendarDate }));
};

export function splitRanges(ranges?: DateOptionPreset<Date>[]) {
  // The shortcut option on the left side of the calendar panel
  const sideRanges = ranges?.filter(range => range?.placement === 'left') || [];

  // The shortcut option on the bottom of the calendar panel
  const bottomRanges =
    ranges?.filter(range => range?.placement === 'bottom' || range?.placement === undefined) || [];

  return {
    sideRanges,
    bottomRanges
  };
}

export const getRestProps = (props: any, omitProps: string[] = []) => {
  return omit(props, [...omitTriggerPropKeys, ...calendarOnlyProps, ...omitProps]);
};
