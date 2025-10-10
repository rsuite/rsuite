import { DisabledDateFunction } from './types';
/**
 Allow the maximum number of days specified, other dates are disabled.
 */
export declare function allowedMaxDays(days: number): DisabledDateFunction;
/**
 * Only allowed days are specified, other dates are disabled.
 */
export declare function allowedDays(days: number): DisabledDateFunction;
/**
 Allow specified date range, other dates are disabled.
 */
export declare function allowedRange(startDate: string | Date, endDate: string | Date): DisabledDateFunction;
/**
 Disable dates after the specified date.
 */
export declare function before(beforeDate?: string | Date): DisabledDateFunction;
/**
 Disable dates before the specified date.
 */
export declare function after(afterDate?: string | Date): DisabledDateFunction;
/**
 Disable dates after today.
 */
export declare function beforeToday(): DisabledDateFunction;
/**
 Disable dates before today.
 */
export declare function afterToday(): DisabledDateFunction;
/**
 Used to combine multiple conditions.
 */
export declare function combine(...args: any): DisabledDateFunction;
