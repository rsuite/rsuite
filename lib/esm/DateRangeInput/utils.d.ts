import { type Locale } from 'date-fns';
export declare enum DateType {
    Start = "Start",
    End = "End"
}
interface SelectedStateOptions {
    /**
     * The input element
     */
    input: HTMLInputElement;
    /**
     * The direction of the arrow key, left or right
     */
    direction?: 'left' | 'right';
    /**
     * Format of the string is based on Unicode Technical Standard.
     * @see https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
     */
    formatStr: string;
    /**
     * The format string of the range, which is used to calculate the selection range.
     */
    rangeFormatStr: string;
    /**
     * The locale object, date-fns locale object
     */
    localize: Locale['localize'];
    /**
     * The selected month, used to calculate the offset of the character selection range
     */
    selectedMonth: number | null;
    /**
     * The offset of the value, which is used to calculate the month.
     * This value will be changed when pressing the up and down arrow keys.
     */
    valueOffset?: number | null;
    /**
     * The date is rendered in string format according to format
     */
    dateString: string;
    /**
     * The character that separates two dates
     *
     * Only for `DateRangeInput`
     **/
    character: string;
    /**
     * The date type, start or end
     *
     * Only for `DateRangeInput`
     */
    dateType: DateType;
}
export declare function getInputSelectedState(options: SelectedStateOptions): {
    selectionStart: number;
    selectionEnd: number;
    selectedPattern: string;
};
export declare function getDateType(dateString: string, character: string, cursorIndex: number): DateType;
export declare function isSwitchDateType(dateString: string, character: string, cursorIndex: number, direction: 'right' | 'left'): boolean;
export {};
