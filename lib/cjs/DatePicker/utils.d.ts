/// <reference types="lodash" />
import PropTypes from 'prop-types';
import { ToolbarProps } from './Toolbar';
import { InnerRange, RangeType } from './types';
import { DateRange } from '../DateRangePicker/types';
export declare function getDefaultRanges<T extends Date | DateRange>(value: T): InnerRange<T>[];
/**
 * get Toolbar ranges from Toolbar props
 * @param ranges
 * @param calendarDate
 */
export declare const getRanges: <T extends Date | DateRange>({ ranges, calendarDate }: Pick<ToolbarProps<T, T>, "calendarDate" | "ranges">) => InnerRange<T>[];
export declare function splitRanges(ranges?: RangeType<Date>[]): {
    sideRanges: RangeType<Date>[];
    bottomRanges: RangeType<Date>[];
};
export declare const deprecatedPropTypes: {
    disabledDate: PropTypes.Requireable<(...args: any[]) => any>;
    disabledHours: PropTypes.Requireable<(...args: any[]) => any>;
    disabledMinutes: PropTypes.Requireable<(...args: any[]) => any>;
    disabledSeconds: PropTypes.Requireable<(...args: any[]) => any>;
};
export declare const getRestProps: (props: any, omitProps?: string[]) => import("lodash").Omit<any, string>;
