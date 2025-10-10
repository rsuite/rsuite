import { TimeProp } from './types';
interface CalendarProps {
    [TimeProp.DisabledHours]?: (hours: number, date: Date) => boolean;
    [TimeProp.DisabledMinutes]?: (minutes: number, date: Date) => boolean;
    [TimeProp.DisabledSeconds]?: (seconds: number, date: Date) => boolean;
    [TimeProp.HideHours]?: (hours: number, date: Date) => boolean;
    [TimeProp.HideMinutes]?: (minutes: number, date: Date) => boolean;
    [TimeProp.HideSeconds]?: (seconds: number, date: Date) => boolean;
}
/**
 * Verify that the time is valid.
 *
 * @param props - The calendar props.
 * @param date - The date to check.
 * @returns Whether the time is disabled.
 */
export declare function disableTime(props: CalendarProps, date: Date): boolean;
export default disableTime;
