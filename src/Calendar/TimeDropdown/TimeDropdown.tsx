import React, { useEffect, useRef } from 'react';
import partial from 'lodash/partial';
import camelCase from 'lodash/camelCase';
import isNumber from 'lodash/isNumber';
import TimeColumn from './TimeColumn';
import type { TimeOption } from './useTimeKeyboard';
import { forwardRef } from '@/internals/utils';
import { useStyles, useEventCallback } from '@/internals/hooks';
import { getHours, omitHideDisabledProps } from '@/internals/utils/date';
import { useCalendar } from '../hooks';
import { WithAsProps } from '@/internals/types';
import { getTimeLimits, getClockTime, scrollToTime, formatWithLeadingZero } from './utils';
import type { PlainDate, PlainTime } from '@/internals/utils/date/types';

export interface TimeDropdownProps extends WithAsProps {
  show?: boolean;
  showMeridiem?: boolean;
  disabledHours?: (hour: number, date: PlainDate) => boolean;
  disabledMinutes?: (minute: number, date: PlainDate) => boolean;
  disabledSeconds?: (second: number, date: PlainDate) => boolean;
  hideHours?: (hour: number, date: PlainDate) => boolean;
  hideMinutes?: (minute: number, date: PlainDate) => boolean;
  hideSeconds?: (second: number, date: PlainDate) => boolean;
}

type TimeType = 'hours' | 'minutes' | 'seconds';

const TimeDropdown = forwardRef<'div', TimeDropdownProps>((props: TimeDropdownProps, ref) => {
  const {
    as: Component = 'div',
    className,
    classPrefix = 'calendar-time-dropdown',
    show,
    showMeridiem = false,
    ...rest
  } = props;

  const { locale, format, date, onChangeTime, targetId } = useCalendar();
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const time = getClockTime({ format, date, showMeridiem });
    // The currently selected time scrolls to the visible range.
    if (show && rowRef.current) {
      scrollToTime(time, rowRef.current);
    }
  }, [date, format, show, showMeridiem]);

  const time = getClockTime({ format, date, showMeridiem });

  const handleClick = useEventCallback((type: TimeType, d: number, event: React.SyntheticEvent) => {
    const nextTime = {
      hour: (time.hours ?? 0) + (showMeridiem && time.meridiem === 'PM' ? 12 : 0),
      minute: time.minutes ?? 0,
      second: time.seconds ?? 0
    } satisfies PlainTime;

    switch (type) {
      case 'hours':
        nextTime.hour = showMeridiem && time.meridiem === 'PM' ? d + 12 : d;
        break;
      case 'minutes':
        nextTime.minute = d;
        break;
      case 'seconds':
        nextTime.second = d;
        break;
    }

    onChangeTime?.(nextTime, event);
  });

  const handleClickMeridiem = useEventCallback(
    (meridiem: 'AM' | 'PM', event: React.SyntheticEvent) => {
      const nextTime = {
        hour: (time.hours ?? 0) + (showMeridiem && time.meridiem === 'PM' ? 12 : 0),
        minute: time.minutes ?? 0,
        second: time.seconds ?? 0
      } satisfies PlainTime;

      if (meridiem === 'AM' && nextTime.hour >= 12) {
        nextTime.hour -= 12;
      } else if (meridiem === 'PM' && nextTime.hour < 12) {
        nextTime.hour += 12;
      }

      onChangeTime?.(nextTime, event);
    }
  );

  const { prefix, rootPrefix, merge } = useStyles(classPrefix);

  const plainDate =
    typeof date !== 'undefined'
      ? {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      : undefined;

  const renderColumn = (type: TimeType, value?: number | null) => {
    if (!isNumber(value)) {
      return null;
    }
    const { start, end } = getTimeLimits(showMeridiem)[type];
    const items: TimeOption<number>[] = [];
    const hideFunc = props[camelCase(`hide_${type}`)];
    const disabledFunc = props[camelCase(`disabled_${type}`)];

    for (let i = start; i <= end; i += 1) {
      if (!hideFunc?.(i, plainDate)) {
        const disabled = disabledFunc?.(i, plainDate);
        items.push({
          value: i,
          label: showMeridiem && type === 'hours' && i === 0 ? '12' : formatWithLeadingZero(i),
          ariaLabel: `${i} ${type}`,
          selected: value === i,
          disabled
        });
      }
    }

    return (
      <TimeColumn
        prefix={prefix}
        title={locale?.[type]}
        type={type}
        aria-label={`Select ${type}`}
        options={items}
        onSelect={partial(handleClick, type)}
      />
    );
  };

  const renderMeridiemColumn = () => {
    const columns = ['AM', 'PM'] as const;
    const ampm = date && (getHours(date) >= 12 ? 'PM' : 'AM');
    return (
      <TimeColumn
        prefix={prefix}
        title="AM/PM"
        type="meridiem"
        aria-label="Select meridiem"
        options={columns.map(value => ({
          value,
          label: value,
          ariaLabel: value,
          selected: ampm === value
        }))}
        onSelect={handleClickMeridiem}
      />
    );
  };

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
});

TimeDropdown.displayName = 'TimeDropdown';

export default TimeDropdown;
