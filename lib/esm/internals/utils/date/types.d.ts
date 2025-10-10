import type { Locale as DateFnsLocale } from 'date-fns';
import type { DateFns } from '../../types';
export declare enum TimeProp {
    DisabledHours = "disabledHours",
    DisabledMinutes = "disabledMinutes",
    DisabledSeconds = "disabledSeconds",
    ShouldDisableHour = "shouldDisableHour",
    ShouldDisableMinute = "shouldDisableMinute",
    ShouldDisableSecond = "shouldDisableSecond",
    HideHours = "hideHours",
    HideMinutes = "hideMinutes",
    HideSeconds = "hideSeconds"
}
export type CalendarOnlyPropsType = TimeProp;
export declare const calendarOnlyProps: readonly [TimeProp.DisabledHours, TimeProp.DisabledMinutes, TimeProp.DisabledSeconds, TimeProp.HideHours, TimeProp.HideMinutes, TimeProp.HideSeconds];
export interface FormatDateOptions {
    /**
     * The locale object that contains the language and formatting rules for the date.
     */
    locale?: DateFnsLocale;
    /**
     * Defines which day of the week should be considered the start of the week.
     *
     * The value should be an integer from 0 to 6, where:
     * - `0` represents Sunday,
     * - `1` represents Monday,
     * - `2` represents Tuesday,
     * - `3` represents Wednesday,
     * - `4` represents Thursday,
     * - `5` represents Friday,
     * - `6` represents Saturday.
     *
     * This option is important for functions that operate on weeks, such as calculating
     * the start or end of a week, determining which week a date falls in, or generating
     * calendar views. The default value varies depending on the locale, with Monday (`1`)
     * being the default in most regions following ISO 8601, while Sunday (`0`) is often
     * the default in regions like the United States.
     */
    weekStartsOn?: DateFns.Day;
    /**
     * `firstWeekContainsDate` is used to determine which week is considered the first week of the year.
     *
     * This option specifies the minimum day of January that must be included in the first week.
     *
     * The value can be set to:
     * - `1`: The first week of the year must include January 1st.
     * - `4`: The first week of the year must include January 4th, which is the default according to ISO 8601.
     *
     * The choice between `1` and `4` typically depends on the regional or business conventions for week numbering.
     *
     * Please note that this option only accepts `1` (Sunday) or `4` (Thursday), aligning with common international standards.
     *
     * For more detailed information, please refer to https://en.wikipedia.org/wiki/Week#Week_numbering.
     */
    firstWeekContainsDate?: DateFns.FirstWeekContainsDate;
    /**
     * If true, allows usage of the week-numbering year tokens `YY` and `YYYY`.
     * See: https://date-fns.org/docs/Unicode-Tokens
     **/
    useAdditionalWeekYearTokens?: boolean;
    /**
     * If true, allows usage of the day of year tokens `D` and `DD`.
     * See: https://date-fns.org/docs/Unicode-Tokens
     */
    useAdditionalDayOfYearTokens?: boolean;
}
