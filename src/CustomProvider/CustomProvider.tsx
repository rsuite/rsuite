import React, { useRef, useMemo } from 'react';
import IconProvider from '@rsuite/icons/IconProvider';
import { usePortal, useIsomorphicLayoutEffect } from '@/internals/hooks';
import { getClassNamePrefix, prefix } from '@/internals/utils/prefix';
import { Locale } from '../locales';
import { addClass, removeClass, canUseDOM } from '../DOMHelper';
import ToastContainer, {
  ToastContainerInstance,
  toastPlacements,
  defaultToasterContainer
} from '../toaster/ToastContainer';
import type { FormatDateOptions } from '@/internals/utils/date/types';
import type { ReactSuiteComponents } from './types';

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
   *  import { format } from 'date-fns/format';
   *  import { eo } from 'date-fns/locale/eo'
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
   *  import { parse } from 'date-fns/parse';
   *  import { eo } from 'date-fns/locale/eo'
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

export const CustomContext = React.createContext<CustomProviderProps>({});
const themes = ['light', 'dark', 'high-contrast'];

/**
 * CustomProvider is used to provide global configuration, such as language, theme, etc.
 *
 * @see https://rsuitejs.com/components/custom-provider
 */
export default function CustomProvider(props: Omit<CustomProviderProps, 'toasters'>) {
  const {
    children,
    classPrefix = getClassNamePrefix(),
    components,
    iconClassPrefix = classPrefix,
    theme,
    toastContainer = defaultToasterContainer,
    disableRipple,
    csp,
    disableInlineStyles,
    ...rest
  } = props;
  const toasters = useRef(new Map<string, ToastContainerInstance>());
  const { Portal } = usePortal({ container: toastContainer, waitMount: true });

  const value = useMemo(
    () => ({ classPrefix, theme, toasters, disableRipple, components, toastContainer, ...rest }),
    [classPrefix, theme, disableRipple, components, toastContainer, rest]
  );

  const iconContext = useMemo(
    () => ({ classPrefix: iconClassPrefix, csp, disableInlineStyles }),
    [iconClassPrefix, csp, disableInlineStyles]
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
      <IconProvider value={iconContext}>
        {children}
        <Portal>
          <div className={`${classPrefix}toast-provider`}>
            {toastPlacements.map(placement => (
              <ToastContainer
                key={placement}
                placement={placement}
                ref={(ref: any) => {
                  toasters.current.set(placement, ref);
                }}
              />
            ))}
          </div>
        </Portal>
      </IconProvider>
    </CustomContext.Provider>
  );
}
