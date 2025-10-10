import { DATERANGE_DISABLED_TARGET } from '../internals/constants';
import type { RangeType as DatePickerRangeType } from '../DatePicker/types';
export type ValueType = [Date?, Date?] | null;
export type DateRange = [Date, Date];
export type RangeType<T = DateRange> = DatePickerRangeType<T>;
export type DisabledDateFunction = (
/**
 * Date used to determine if disabling is required.
 */
date: Date, 
/**
 * Date selected.
 */
selectDate?: ValueType, 
/**
 * Whether to choose to finish now.
 * If `false`, only the start date is selected, waiting for the selection end date.
 */
selectedDone?: boolean, 
/**
 * Call the target of the `shouldDisableDate` function.
 */
target?: DATERANGE_DISABLED_TARGET) => boolean;
export type SelectedDatesState = [] | [Date] | [Date, Date];
