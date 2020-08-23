import * as React from 'react';
import { HTMLAttributes, Ref, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getPosition, scrollTop } from 'dom-lib';
import omitBy from 'lodash/omitBy';
import partial from 'lodash/partial';
import camelCase from 'lodash/camelCase';
import isNumber from 'lodash/isNumber';

import { useClassNames } from '../utils';
import {
  getHours,
  getMinutes,
  getSeconds,
  setHours,
  setMinutes,
  setSeconds
} from '../utils/dateUtils';
import scrollTopAnimation from '../utils/scrollTopAnimation';
import { zonedDate } from '../utils/timeZone';
import { useCalendarContext } from './CalendarContext';
import { CalendarInnerContextValue } from './types';

export interface TimeDropdownProps extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
  className?: string;
  classPrefix?: string;
  showMeridian?: boolean;
  disabledDate?: (date: Date) => boolean;
  disabledHours?: (hour: number, date: Date) => boolean;
  disabledMinutes?: (minute: number, date: Date) => boolean;
  disabledSeconds?: (second: number, date: Date) => boolean;
  hideHours?: (hour: number, date: Date) => boolean;
  hideMinutes?: (minute: number, date: Date) => boolean;
  hideSeconds?: (second: number, date: Date) => boolean;
}

const defaultProps = {
  show: false,
  classPrefix: 'calendar-time-dropdown'
};

type TimeType = 'hours' | 'minutes' | 'seconds';

type UListRefs = Record<TimeType, HTMLUListElement>;

function getRanges(meridian) {
  return {
    hours: { start: 0, end: meridian ? 11 : 23 },
    minutes: { start: 0, end: 59 },
    seconds: { start: 0, end: 59 }
  };
}

export function getMeridianHours(hours: number): number {
  return hours >= 12 ? hours - 12 : hours;
}

interface Time {
  hours?: number;
  minutes?: number;
  seconds?: number;
}
const getTime = (props: Partial<TimeDropdownProps> & Partial<CalendarInnerContextValue>): Time => {
  const { format, timeZone, date, showMeridian } = props;
  const time = date || zonedDate(timeZone);
  const nextTime = {} as Time;

  if (!format) {
    return nextTime;
  }

  if (/(H|h)/.test(format)) {
    const hours = getHours(time);
    nextTime.hours = showMeridian ? getMeridianHours(hours) : hours;
  }
  if (/m/.test(format)) {
    nextTime.minutes = getMinutes(time);
  }
  if (/s/.test(format)) {
    nextTime.seconds = getSeconds(time);
  }
  return nextTime;
};

const scrollTo = (time: Time, ulRefs: UListRefs) => {
  Object.entries(time).forEach((item: [string, number]) => {
    const container: Element = ulRefs[item[0]];
    const node = container?.querySelector(`[data-key="${item[0]}-${item[1]}"]`);
    if (node && container) {
      const { top } = getPosition(node, container);
      scrollTopAnimation(ulRefs[item[0]], top, scrollTop(ulRefs[item[0]]) !== 0);
    }
  });
};

const TimeDropdown = React.forwardRef((props: TimeDropdownProps, ref: Ref<HTMLDivElement>) => {
  const { className, classPrefix, show, showMeridian, ...rest } = props;
  const { locale, format, timeZone, date, onChangePageTime: onSelect } = useCalendarContext();
  const ulRefs = useRef<UListRefs>({} as UListRefs);

  const updatePosition = useCallback(() => {
    const time = getTime({
      format,
      timeZone,
      date,
      showMeridian
    });
    show && scrollTo(time, ulRefs.current);
  }, [show, format, timeZone, date, showMeridian]);

  const handleClick = (type: TimeType, d: number, event: React.MouseEvent) => {
    let nextDate = date || new Date();

    switch (type) {
      case 'hours':
        nextDate = setHours(date, d);
        break;
      case 'minutes':
        nextDate = setMinutes(date, d);
        break;
      case 'seconds':
        nextDate = setSeconds(date, d);
        break;
    }

    onSelect?.(nextDate, event);
  };

  const { prefix, rootPrefix, merge } = useClassNames(classPrefix);

  const renderColumn = (type: TimeType, active: any) => {
    if (!isNumber(active)) {
      return null;
    }
    const { start, end } = getRanges(showMeridian)[type];
    const items = [];
    const hideFunc = props[camelCase(`hide_${type}`)];
    const disabledFunc = props[camelCase(`disabled_${type}`)];

    for (let i = start; i <= end; i += 1) {
      if (!hideFunc?.(i, date)) {
        const disabled = disabledFunc?.(i, date);
        const itemClasses = merge(prefix('cell'), {
          [prefix('cell-active')]: active === i,
          [prefix('cell-disabled')]: disabled
        });

        items.push(
          <li key={i} role="menuitem">
            <a
              role="button"
              className={itemClasses}
              tabIndex={-1}
              data-key={`${type}-${i}`}
              onClick={!disabled ? partial(handleClick, type, i) : null}
            >
              {showMeridian && type === 'hours' && i === 0 ? '12' : i}
            </a>
          </li>
        );
      }
    }

    return (
      <div className={prefix('column')} role="listitem">
        <div className={prefix('column-title')}>{locale?.[type]}</div>
        <ul
          ref={ref => {
            ulRefs.current[type] = ref;
          }}
          role="menu"
        >
          {items}
        </ul>
      </div>
    );
  };

  const time = getTime({ format, timeZone, date, showMeridian });
  const classes = merge(rootPrefix(classPrefix), className);

  useEffect(() => {
    updatePosition();
  }, [updatePosition]);

  return (
    <div
      {...omitBy(rest, (_val, key) => key.startsWith('disabled') || key.startsWith('hide'))}
      ref={ref}
      className={classes}
      role="list"
    >
      <div className={prefix('content')}>
        <div className={prefix('row')}>
          {renderColumn('hours', time.hours)}
          {renderColumn('minutes', time.minutes)}
          {renderColumn('seconds', time.seconds)}
        </div>
      </div>
    </div>
  );
});

TimeDropdown.displayName = 'TimeDropdown';
TimeDropdown.propTypes = {
  show: PropTypes.bool,
  showMeridian: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  disabledDate: PropTypes.func,
  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  disabledSeconds: PropTypes.func,
  hideHours: PropTypes.func,
  hideMinutes: PropTypes.func,
  hideSeconds: PropTypes.func
};
TimeDropdown.defaultProps = defaultProps;

export default TimeDropdown;
