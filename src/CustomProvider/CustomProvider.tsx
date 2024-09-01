import React from 'react';
import { usePortal, useIsomorphicLayoutEffect } from '@/internals/hooks';
import { getClassNamePrefix, prefix } from '@/internals/utils/prefix';
import { Locale } from '../locales';
import { addClass, removeClass, canUseDOM } from '../DOMHelper';
import ToastContainer, { ToastContainerInstance, toastPlacements } from '../toaster/ToastContainer';
import type { Locale as DateFnsLocale } from 'date-fns';
import type { DateFns } from '@/internals/types';

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

export interface CustomValue<T = Locale> {
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
  parseDate: (
    dateString: string,
    formatString: string,
    referenceDate?: Date | number,
    options?: FormatDateOptions
  ) => Date;

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
  /** Supported themes */
  theme?: 'light' | 'dark' | 'high-contrast';

  /** The prefix of the component CSS class */
  classPrefix?: string;

  /** Primary content */
  children?: React.ReactNode;

  /** Sets a container for toast rendering */
  toastContainer?: HTMLElement | (() => HTMLElement | null) | null;
}

const CustomContext = React.createContext<CustomProviderProps>({});
const themes = ['light', 'dark', 'high-contrast'];

/**
 * CustomProvider is used to provide global configuration, such as language, theme, etc.
 *
 * @see https://rsuitejs.com/components/custom-provider
 */
const CustomProvider = (props: Omit<CustomProviderProps, 'toasters'>) => {
  const {
    children,
    classPrefix = getClassNamePrefix(),
    theme,
    toastContainer: container,
    disableRipple,
    ...rest
  } = props;
  const toasters = React.useRef(new Map<string, ToastContainerInstance>());
  const { Portal } = usePortal({ container, waitMount: true });

  const value = React.useMemo(
    () => ({ classPrefix, theme, toasters, disableRipple, ...rest }),
    [classPrefix, theme, disableRipple, rest]
  );

  useIsomorphicLayoutEffect(() => {
    if (canUseDOM && theme) {
      addClass(document.body, prefix(classPrefix, `theme-${theme}`));

      // Remove the className that will cause style conflicts
      themes.forEach(t => {
        if (t !== theme) {
          removeClass(document.body, prefix(classPrefix, `theme-${t}`));
        }
      });
    }
  }, [classPrefix, theme]);

  return (
    <CustomContext.Provider value={value}>
      {children}
      <Portal>
        <div className="rs-toast-provider">
          {toastPlacements.map(placement => (
            <ToastContainer
              key={placement}
              placement={placement}
              ref={ref => {
                toasters.current.set(placement, ref);
              }}
            />
          ))}
        </div>
      </Portal>
    </CustomContext.Provider>
  );
};

export { CustomContext };

export default CustomProvider;
