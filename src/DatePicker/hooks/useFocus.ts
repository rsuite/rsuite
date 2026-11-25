import delay from 'lodash/delay';
import { RefObject } from 'react';
import { addMonths } from 'date-fns/addMonths';
import { addDays } from 'date-fns/addDays';
import { useEventCallback, useCustom } from '@/internals/hooks';
import { getAriaLabel } from '../../Calendar/utils';

interface UseFocusProps {
  target: RefObject<HTMLElement | null>;
  showMonth: boolean;
  id: string;
  locale: any;
}

function useFocus(props: UseFocusProps) {
  const { target, showMonth, id, locale: localeProp } = props;
  const { getLocale, formatDate } = useCustom();
  const { formattedMonthPattern, formattedDayPattern } = getLocale('DateTimeFormats', localeProp);

  /**
   * Get the corresponding container based on date selection and month selection
   */
  const getOverlayContainer = (month = showMonth) => {
    return month
      ? document.getElementById(`${id}-calendar-month-dropdown`)
      : document.getElementById(`${id}-calendar-table`);
  };

  /**
   * Check whether the date is focusable
   */
  const checkFocusable = (date: Date) => {
    const formatStr = showMonth ? formattedMonthPattern : formattedDayPattern;
    const ariaLabel = getAriaLabel(date, formatStr as string, formatDate);
    const container = getOverlayContainer();

    const dateElement = container?.querySelector(`[aria-label="${ariaLabel}"]`);

    if (dateElement?.getAttribute('aria-disabled') === 'true') {
      return false;
    }

    return true;
  };

  /**
   * Focus on the current tab stop in the calendar grid
   */
  const focusSelectedDate = (month = showMonth) => {
    delay(() => {
      const container = getOverlayContainer(month);

      const activeElement = container?.querySelector<HTMLElement>('[tabindex="0"]');

      activeElement?.focus();
    }, 1);
  };

  /**
   * Focus on the input element
   */
  const focusInput = useEventCallback(() => {
    delay(() => target.current?.focus(), 1);
  });

  const onKeyFocusEvent = useEventCallback(
    (event: React.KeyboardEvent, options: { date: Date; callback: (date: Date) => void }) => {
      const { date, callback } = options;
      const step = showMonth ? 6 : 7;
      const changeDateFunc = showMonth ? addMonths : addDays;
      let delta: number;

      switch (event.key) {
        case 'ArrowDown':
          delta = step;
          break;
        case 'ArrowUp':
          delta = -step;
          break;
        case 'ArrowRight':
          delta = 1;
          break;
        case 'ArrowLeft':
          delta = -1;
          break;
        default:
          return;
      }

      event.preventDefault();
      const nextDate = changeDateFunc(date, delta);

      if (checkFocusable(nextDate)) {
        callback(nextDate);
        focusSelectedDate();
      }
    }
  );

  return {
    focusInput,
    focusSelectedDate,
    onKeyFocusEvent
  };
}

export default useFocus;
