import omitBy from 'lodash/omitBy';
import { TimeProp } from './types';

type CalendarOnlyPropsType = TimeProp;

/**
 * Omit the calendar-only props from an object.
 *
 * @param props - The object to omit props from.
 * @returns The object with calendar-only props omitted.
 */
export const omitHideDisabledProps = <T extends Record<string, any>>(
  props: T
): Partial<Omit<T, CalendarOnlyPropsType>> =>
  omitBy<T>(
    props,
    (_val, key) =>
      key.startsWith('disabled') || key.startsWith('hide') || key.startsWith('shouldDisable')
  );

export default omitHideDisabledProps;
