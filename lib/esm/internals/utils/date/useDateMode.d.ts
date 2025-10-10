export declare enum DateMode {
    Date = "date",
    Month = "month",
    Time = "time",
    DateTime = "datetime"
}
/**
 * Custom hook to determine the date mode and check format parts.
 *
 * @param format - The format string.
 * @returns An object containing the resolved DateMode and a `has` method to check format parts.
 */
export declare const useDateMode: (format: string) => {
    mode: DateMode;
    has: (part: 'year' | 'month' | 'day' | 'time') => boolean;
};
