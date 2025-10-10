import { TimeProp } from './types';
type CalendarOnlyPropsType = TimeProp;
/**
 * Omit the calendar-only props from an object.
 *
 * @param props - The object to omit props from.
 * @returns The object with calendar-only props omitted.
 */
export declare const omitHideDisabledProps: <T extends Record<string, any>>(props: T) => Partial<Omit<T, TimeProp>>;
export default omitHideDisabledProps;
