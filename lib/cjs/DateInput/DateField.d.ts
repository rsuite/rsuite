/// <reference types="react" />
import type { Locale } from 'date-fns';
export declare const patternMap: {
    y: string;
    M: string;
    d: string;
    H: string;
    h: string;
    m: string;
    s: string;
    a: string;
};
export declare class DateField extends Object {
    format: string;
    patternArray: {
        pattern: string;
        key: string;
    }[];
    year: number | null;
    month: number | null;
    day: number | null;
    hour: number | null;
    minute: number | null;
    second: number | null;
    constructor(format: string, value?: Date | null);
}
interface Action {
    type: string;
    value: any;
}
export declare const useDateField: (format: string, localize: Locale['localize'], date?: Date | null) => {
    dateField: {
        year: any;
        format: string;
        patternArray: {
            pattern: string;
            key: string;
        }[];
        month: number | null;
        day: number | null;
        hour: number | null;
        minute: number | null;
        second: number | null;
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
        should: Chai.Assertion;
    } | {
        month: any;
        format: string;
        patternArray: {
            pattern: string;
            key: string;
        }[];
        year: number | null;
        day: number | null;
        hour: number | null;
        minute: number | null;
        second: number | null;
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
        should: Chai.Assertion;
    } | {
        day: any;
        format: string;
        patternArray: {
            pattern: string;
            key: string;
        }[];
        year: number | null;
        month: number | null;
        hour: number | null;
        minute: number | null;
        second: number | null;
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
        should: Chai.Assertion;
    } | {
        hour: any;
        format: string;
        patternArray: {
            pattern: string;
            key: string;
        }[];
        year: number | null;
        month: number | null;
        day: number | null;
        minute: number | null;
        second: number | null;
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
        should: Chai.Assertion;
    } | {
        minute: any;
        format: string;
        patternArray: {
            pattern: string;
            key: string;
        }[];
        year: number | null;
        month: number | null;
        day: number | null;
        hour: number | null;
        second: number | null;
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
        should: Chai.Assertion;
    } | {
        second: any;
        format: string;
        patternArray: {
            pattern: string;
            key: string;
        }[];
        year: number | null;
        month: number | null;
        day: number | null;
        hour: number | null;
        minute: number | null;
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
        should: Chai.Assertion;
    };
    dispatch: import("react").Dispatch<Action>;
    toDate: (type?: string, value?: number | null) => Date | null;
    toDateString: () => string;
    isEmptyValue: (type?: string, value?: number | null) => boolean | undefined;
};
export {};
