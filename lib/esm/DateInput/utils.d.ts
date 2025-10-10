/// <reference types="react" />
import { type Locale } from 'date-fns';
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
     * Format of the string is based on Unicode Technical Standard: https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
     */
    formatStr: string;
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
}
export declare function getPatternGroups(format: string, pattern: string): string;
interface SelectIndexGapOptions {
    pattern: string;
    formatStr: string;
    valueOffset: number | null;
    selectedMonth: number | null;
    localize: Locale['localize'];
}
export declare function getSelectIndexGap(options: SelectIndexGapOptions): number;
interface DatePatternOptions {
    selectionIndex: number;
    positionOffset?: number;
    formatStr: string;
    dateString: string;
    valueOffset: number | null;
    selectedMonth: number | null;
    localize: Locale['localize'];
}
export declare function getDatePattern(options: DatePatternOptions): string;
export declare function isCursorAfterMonth(cursorIndex: number, formatStr: string): boolean;
export declare function getInputSelectedState(options: SelectedStateOptions): {
    selectionStart: number;
    selectionEnd: number;
    selectedPattern: string;
};
export declare function validateDateTime(type: string, value: number): boolean;
export declare function modifyDate(date: Date, type: string, value: number): Date;
export declare function useInputSelection(input: React.RefObject<any>): (selectionStart: number, selectionEnd: number) => void;
export {};
