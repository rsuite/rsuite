import { RefObject } from 'react';
import delay from 'lodash/delay';
import { addMonths } from 'date-fns/addMonths';
import { addDays } from 'date-fns/addDays';
import { useEventCallback } from '@/internals/hooks';
import { useCustom } from '../../CustomProvider';
import { getAriaLabel } from '../../Calendar/utils';
import { onMenuKeyDown } from '@/internals/Picker/utils';

interface UseFocusProps {
  target: RefObject<HTMLElement>;
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
  const getOverlayContainer = () => {
    return showMonth
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
   * Focus on the currently selected date element
   */
  const focusSelectedDate = () => {
    delay(() => {
      const container = getOverlayContainer();

      const selectedElement = container?.querySelector('[aria-selected="true"]') as HTMLElement;

      selectedElement?.focus();
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
      let delta = 0;

      const step = showMonth ? 6 : 7;
      const changeDateFunc = showMonth ? addMonths : addDays;

      onMenuKeyDown(event, {
        down: () => {
          delta = step;
        },
        up: () => {
          delta = -step;
        },
        right: () => {
          delta = 1;
        },
        left: () => {
          delta = -1;
        }
      });

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
