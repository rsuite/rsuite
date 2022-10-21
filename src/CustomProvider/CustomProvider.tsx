import React, { useEffect } from 'react';
import { getClassNamePrefix, prefix } from '../utils/prefix';
import { Locale } from '../locales';
import { addClass, removeClass, canUseDOM } from '../DOMHelper';
import ToastContainer, { ToastContainerInstance, toastPlacements } from '../toaster/ToastContainer';
import { usePortal } from '../utils';

export interface CustomValue<T = Locale> {
  /** Language configuration */
  locale: T;

  /** Support right-to-left */
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
   * */
  formatDate: (date: Date | number, format: string) => string;

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
   * */
  parseDate: (dateString: string, formatString: string) => Date;

  /**
   * A Map of toast containers
   */
  toasters?: React.MutableRefObject<Map<string, ToastContainerInstance>>;
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

const CustomProvider = (props: Omit<CustomProviderProps, 'toasters'>) => {
  const {
    children,
    classPrefix = getClassNamePrefix(),
    theme,
    toastContainer: container,
    ...rest
  } = props;
  const toasters = React.useRef(new Map<string, ToastContainerInstance>());
  const { Portal } = usePortal({ container, waitMount: true });

  const value = React.useMemo(
    () => ({ classPrefix, theme, toasters, ...rest }),
    [classPrefix, theme, rest]
  );

  useEffect(() => {
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
