import React, { useEffect, useRef } from 'react';
import getPosition from 'dom-lib/getPosition';
import scrollTop from 'dom-lib/scrollTop';
import partial from 'lodash/partial';
import camelCase from 'lodash/camelCase';
import isNumber from 'lodash/isNumber';
import ScrollView from '@/internals/ScrollView';
import { useClassNames, useEventCallback } from '@/internals/hooks';
import {
  startOfToday,
  getHours,
  getMinutes,
  getSeconds,
  setHours,
  setMinutes,
  setSeconds,
  omitHideDisabledProps
} from '@/internals/utils/date';

import { useCalendar } from './hooks';
import { RsRefForwardingComponent, WithAsProps } from '@/internals/types';

export interface TimeDropdownProps extends WithAsProps {
  show?: boolean;
  showMeridiem?: boolean;
  disabledDate?: (date: Date) => boolean;
  disabledHours?: (hour: number, date: Date) => boolean;
  disabledMinutes?: (minute: number, date: Date) => boolean;
  disabledSeconds?: (second: number, date: Date) => boolean;
  hideHours?: (hour: number, date: Date) => boolean;
  hideMinutes?: (minute: number, date: Date) => boolean;
  hideSeconds?: (second: number, date: Date) => boolean;
}

interface ClockTime {
  hours?: number | null;
  minutes?: number | null;
  seconds?: number | null;
  meridiem?: 'AM' | 'PM' | null;
}

type TimeType = 'hours' | 'minutes' | 'seconds';

/**
 * Get the effective range of hours, minutes and seconds
 * @param meridiem
 */
function getTimeRanges(meridiem: boolean) {
  return {
    hours: { start: 0, end: meridiem ? 11 : 23 },
    minutes: { start: 0, end: 59 },
    seconds: { start: 0, end: 59 }
  };
}

/**
 * Convert the 24-hour clock to the 12-hour clock
 * @param hours
 */
function getMeridiemHours(hours: number): number {
  return hours >= 12 ? hours - 12 : hours;
}

const getClockTime = (props: { date?: Date; format?: string; showMeridiem: boolean }) => {
  const { format, date, showMeridiem } = props;
  const clockTime: ClockTime = {
    hours: null,
    minutes: null,
    seconds: null,
    meridiem: null
  };

  if (!format) {
    return clockTime;
  }

  // If date is provided, extract hours and meridiem
  if (/(H|h)/.test(format) && date) {
    const hours = getHours(date);

    clockTime.hours = showMeridiem ? getMeridiemHours(hours) : hours;
    clockTime.meridiem = hours >= 12 ? 'PM' : 'AM';
  }
  // Extract minutes if 'm' is present in format and date is provided
  if (/m/.test(format) && date) {
    clockTime.minutes = getMinutes(date);
  }
  // // Extract seconds if 's' is present in format and date is provided
  if (/s/.test(format) && date) {
    clockTime.seconds = getSeconds(date);
  }
  return clockTime;
};

const scrollTo = (time: ClockTime, row: HTMLDivElement) => {
  if (!row) {
    return;
  }

  Object.entries(time).forEach(([type, value]: [string, number]) => {
    const container = row.querySelector(`[data-type="${type}"]`);
    const node = container?.querySelector(`[data-key="${type}-${value}"]`);

    if (node && container) {
      const position = getPosition(node, container);

      if (position) {
        scrollTop(container, position.top);
      }
    }
  });
};

const formatTimePart = (number: number) => {
  return number < 10 ? `0${number}` : number;
};

interface ColumnProps {
  prefix: (name: string) => string;
  title: React.ReactNode;
  children: React.ReactNode;
}

const Column = (props: ColumnProps) => {
  const { prefix, title, children, ...rest } = props;
  return (
    <div className={prefix('column')}>
      <div className={prefix('column-title')}>{title}</div>
      <ScrollView customScrollbar as="ul" role="listbox" {...rest}>
        {children}
      </ScrollView>
    </div>
  );
};

const TimeDropdown: RsRefForwardingComponent<'div', TimeDropdownProps> = React.forwardRef(
  (props: TimeDropdownProps, ref) => {
    const {
      as: Component = 'div',
      className,
      classPrefix = 'calendar-time-dropdown',
      show,
      showMeridiem = false,
      ...rest
    } = props;

    const { locale, format, date, onChangeTime: onSelect, targetId } = useCalendar();
    const rowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const time = getClockTime({ format, date, showMeridiem });
      // The currently selected time scrolls to the visible range.
      if (show && rowRef.current) {
        scrollTo(time, rowRef.current);
      }
    }, [date, format, show, showMeridiem]);

    const handleClick = useEventCallback((type: TimeType, d: number, event: React.MouseEvent) => {
      let nextDate = date || startOfToday();

      switch (type) {
        case 'hours':
          nextDate = setHours(nextDate, showMeridiem && getHours(nextDate) >= 12 ? d + 12 : d);
          break;
        case 'minutes':
          nextDate = setMinutes(nextDate, d);
          break;
        case 'seconds':
          nextDate = setSeconds(nextDate, d);
          break;
      }

      onSelect?.(nextDate, event);
    });

    const handleClickMeridiem = useEventCallback(
      (meridiem: 'AM' | 'PM', event: React.MouseEvent) => {
        const tempDate = date || startOfToday();
        const hours = getHours(tempDate);
        const isAM = hours < 12;

        const adjustHours = (meridiem: 'AM' | 'PM', hours: number): number => {
          if (meridiem === 'AM') {
            return isAM ? hours : hours - 12;
          }
          return isAM ? hours + 12 : hours;
        };

        const nextHours = adjustHours(meridiem, hours);
        const nextDate = setHours(tempDate, nextHours);

        onSelect?.(nextDate, event);
      }
    );

    const { prefix, rootPrefix, merge } = useClassNames(classPrefix);

    const renderColumn = (type: TimeType, active: any) => {
      if (!isNumber(active)) {
        return null;
      }
      const { start, end } = getTimeRanges(showMeridiem)[type];
      const items: React.ReactElement[] = [];
      const hideFunc = props[camelCase(`hide_${type}`)];
      const disabledFunc = props[camelCase(`disabled_${type}`)];

      for (let i = start; i <= end; i += 1) {
        if (!hideFunc?.(i, date)) {
          const disabled = disabledFunc?.(i, date);
          const itemClasses = prefix('cell', {
            'cell-active': active === i,
            'cell-disabled': disabled
          });

          items.push(
            <li
              key={i}
              role="option"
              tabIndex={-1}
              aria-label={`${i} ${type}`}
              aria-selected={active === i}
              aria-disabled={disabled}
              data-key={`${type}-${i}`}
              onClick={!disabled ? partial(handleClick, type, i) : undefined}
            >
              <span className={itemClasses}>
                {showMeridiem && type === 'hours' && i === 0 ? 12 : formatTimePart(i)}
              </span>
            </li>
          );
        }
      }

      return (
        <Column
          prefix={prefix}
          title={locale?.[type]}
          data-type={type}
          aria-label={`Select ${type}`}
        >
          {items}
        </Column>
      );
    };

    const renderMeridiemColumn = () => {
      const columns = ['AM', 'PM'];
      return (
        <Column prefix={prefix} title={'AM/PM'} data-type="meridiem" aria-label="Select meridiem">
          {columns.map((meridiem, index) => {
            const ampm = date && (getHours(date) >= 12 ? 'PM' : 'AM');
            const itemClasses = prefix('cell', {
              'cell-active': ampm === meridiem
            });

            return (
              <li
                key={index}
                role="option"
                tabIndex={-1}
                aria-label={meridiem}
                aria-selected={ampm === meridiem}
                data-key={`meridiem-${meridiem}`}
                onClick={partial(handleClickMeridiem, meridiem)}
              >
                <span className={itemClasses}>{meridiem}</span>
              </li>
            );
          })}
        </Column>
      );
    };

    const time = getClockTime({ format, date, showMeridiem });
    const classes = merge(className, rootPrefix(classPrefix), { show });

    return (
      <Component
        role="group"
        tabIndex={-1}
        id={targetId ? `${targetId}-${classPrefix}` : undefined}
        {...omitHideDisabledProps<TimeDropdownProps>(rest)}
        ref={ref}
        className={classes}
      >
        <div className={prefix('content')}>
          <div className={prefix('row')} ref={rowRef}>
            {renderColumn('hours', time.hours)}
            {renderColumn('minutes', time.minutes)}
            {renderColumn('seconds', time.seconds)}
            {showMeridiem && renderMeridiemColumn()}
          </div>
        </div>
      </Component>
    );
  }
);

TimeDropdown.displayName = 'TimeDropdown';

export default TimeDropdown;
