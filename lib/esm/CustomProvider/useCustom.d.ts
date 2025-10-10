/// <reference types="react" />
import enGB from '../locales/en_GB';
import type { FormatDateOptions } from '../internals/utils/date/types';
import type { ReactSuiteComponents } from './types';
type LocaleKey = keyof typeof enGB;
/**
 * A hook to get custom configuration of `<CustomProvider>`
 * @param componentName - The name of the component
 * @param componentProps - The props of the component
 */
export declare function useCustom<P = any>(componentName?: keyof ReactSuiteComponents, componentProps?: P): {
    code: string | undefined;
    rtl: boolean;
    toasters: import("react").MutableRefObject<Map<string, import("../toaster/ToastContainer").ToastContainerInstance>> | undefined;
    disableRipple: boolean | undefined;
    classPrefix: string | undefined;
    propsWithDefaults: P;
    getLocale: (key: LocaleKey | LocaleKey[], overrideLocale?: Record<string, any>) => any;
    formatDate: (date: number | Date, formatStr: string, options?: FormatDateOptions) => string;
    parseDate: (dateString: string, formatString: string, referenceDate?: Date | number, options?: any) => Date;
};
export default useCustom;
