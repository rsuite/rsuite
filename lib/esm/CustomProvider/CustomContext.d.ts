import React from 'react';
import type { FormatDateOptions } from '../internals/utils/date/types';
import type { ToastContainerInstance } from '../toaster/ToastContainer';
import type { ReactSuiteComponents } from './types';
import type { Locale } from '../locales';
export interface CustomValue<T = Locale> {
    /**
     * The prefix of the component CSS class
     */
    classPrefix?: string;
    /**
     * The locale object that contains the language and formatting rules for the date.
     */
    locale: T;
    /**
     * Right-to-left text direction.
     */
    rtl: boolean;
    /**
     * Return the formatted date string in the given format. The result may vary by locale.
     *
     * Example:
     *
     *  import format from 'date-fns/format';
     *  import eo from 'date-fns/locale/eo'
     *
     *  function formatDate(date, formatStr) {
     *    return format(date, formatStr, { locale: eo });
     *  }
     *
     */
    formatDate: (date: Date | number, format: string, options?: FormatDateOptions) => string;
    /**
     * Return the date parsed from string using the given format string.
     *
     * Example:
     *
     *  import parse from 'date-fns/parse';
     *  import eo from 'date-fns/locale/eo'
     *
     *  function parseDate(date, formatStr) {
     *    return parse(date, formatStr, new Date(), { locale: eo });
     *  }
     *
     */
    parseDate: (dateString: string, formatString: string, referenceDate?: Date | number, options?: FormatDateOptions) => Date;
    /**
     * A Map of toast containers
     */
    toasters?: React.MutableRefObject<Map<string, ToastContainerInstance>>;
    /**
     * If true, the ripple effect is disabled.
     * Affected components include: Button, Nav.Item, Pagination.
     */
    disableRipple?: boolean;
}
export interface CustomProviderProps<T = Locale> extends Partial<CustomValue<T>> {
    /**
     * Supported themes
     */
    theme?: 'light' | 'dark' | 'high-contrast';
    /**
     * The prefix of the icon CSS class
     */
    iconClassPrefix?: string;
    /**
     * Primary content
     */
    children?: React.ReactNode;
    /**
     * Sets a container for toast rendering
     */
    toastContainer?: HTMLElement | (() => HTMLElement | null) | null;
    csp?: {
        /**
         * Content Security Policy nonce
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce
         */
        nonce?: string;
    };
    /**
     * Disable inline styles
     * @default false
     */
    disableInlineStyles?: boolean;
    /**
     * components allows setting default props for specific components globally.
     * It accepts an object where each key represents a component name (e.g., 'Button', 'Input'),
     * and the corresponding value is an object containing the `defaultProps` object.
     * The `defaultProps` object defines the default props for that component.
     * These props will be automatically applied to the component unless overridden by specific props
     * passed in an individual component instance.
     *
     * @example
     * ```js
     * components={{
     *   Button: { defaultProps: { appearance: 'primary', size: 'lg' } },
     *   Input: { defaultProps: { placeholder: 'Enter text', size: 'lg' } }
     * }}
     * ```
     */
    components?: Partial<ReactSuiteComponents>;
}
export declare const CustomContext: React.Context<CustomProviderProps<{
    code?: string | undefined;
    common?: {
        loading: string;
        emptyMessage: string;
        remove: string;
        clear: string;
    } | undefined;
    Plaintext?: {
        unfilled: string;
        notSelected: string;
        notUploaded: string;
    } | undefined;
    Pagination?: {
        more: string;
        prev: string;
        next: string;
        first: string;
        last: string;
        limit: string;
        total: string;
        skip: string;
    } | undefined;
    DateTimeFormats?: {
        sunday: string;
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        ok: string;
        today: string;
        yesterday: string;
        now: string;
        hours: string;
        minutes: string;
        seconds: string;
        formattedMonthPattern: string;
        formattedDayPattern: string;
        shortDateFormat: string;
        shortTimeFormat: string;
        dateLocale: any;
    } | undefined;
    Calendar?: {
        sunday: string;
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        ok: string;
        today: string;
        yesterday: string;
        now: string;
        hours: string;
        minutes: string;
        seconds: string;
        formattedMonthPattern: string;
        formattedDayPattern: string;
        shortDateFormat: string;
        shortTimeFormat: string;
        dateLocale: any;
    } | undefined;
    DatePicker?: {
        sunday: string;
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        ok: string;
        today: string;
        yesterday: string;
        now: string;
        hours: string;
        minutes: string;
        seconds: string;
        formattedMonthPattern: string;
        formattedDayPattern: string;
        shortDateFormat: string;
        shortTimeFormat: string;
        dateLocale: any;
    } | undefined;
    DateRangePicker?: {
        last7Days: string;
        sunday: string;
        monday: string;
        tuesday: string;
        wednesday: string;
        thursday: string;
        friday: string;
        saturday: string;
        ok: string;
        today: string;
        yesterday: string;
        now: string;
        hours: string;
        minutes: string;
        seconds: string;
        formattedMonthPattern: string;
        formattedDayPattern: string;
        shortDateFormat: string;
        shortTimeFormat: string;
        dateLocale: any;
    } | undefined;
    Combobox?: {
        noResultsText: string;
        placeholder: string;
        searchPlaceholder: string;
        checkAll: string;
    } | undefined;
    InputPicker?: {
        newItem: string;
        createOption: string;
        noResultsText: string;
        placeholder: string;
        searchPlaceholder: string;
        checkAll: string;
    } | undefined;
    TagPicker?: {
        newItem: string;
        createOption: string;
        noResultsText: string;
        placeholder: string;
        searchPlaceholder: string;
        checkAll: string;
    } | undefined;
    Uploader?: {
        inited: string;
        progress: string;
        error: string;
        complete: string;
        emptyFile: string;
        upload: string;
        removeFile: string;
    } | undefined;
    CloseButton?: {
        closeLabel: string;
    } | undefined;
    Breadcrumb?: {
        expandText: string;
    } | undefined;
    Toggle?: {
        on: string;
        off: string;
    } | undefined;
}>>;
