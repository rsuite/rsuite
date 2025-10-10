import type { Locale } from 'date-fns';
interface DateInputState {
    formatStr: string;
    locale: Locale;
    date?: Date | null;
    isControlledDate?: boolean;
}
export declare function useDateInputState({ formatStr, locale, date, isControlledDate }: DateInputState): {
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
    setDateOffset: (pattern: string, offset: number, callback?: ((newDate: Date | null) => void) | undefined) => void;
    setDateField: (pattern: string, value: number | null, callback?: ((newDate: Date | null) => void) | undefined) => void;
    setNewDate: (value: Date | null) => void;
    getDateField: (pattern: string) => {
        name: any;
        value: any;
    };
    toDateString: () => string;
    isEmptyValue: (type?: string | undefined, value?: number | null | undefined) => boolean | undefined;
};
export default useDateInputState;
