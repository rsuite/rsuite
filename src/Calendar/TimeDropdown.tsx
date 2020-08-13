import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { getPosition, scrollTop } from 'dom-lib';
import _ from 'lodash';
import { getUnhandledProps, useClassNames, useCustom } from '../utils';
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
import { CalendarLocaleTypes } from './types';

export interface TimeDropdownProps {
  date?: Date;
  show: boolean;
  format?: string;
  timeZone?: string;
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
  onSelect?: (nextDate: Date, event: React.MouseEvent) => void;
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
const getTime = (props: Partial<TimeDropdownProps>): Time => {
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
    const node = container.querySelector(`[data-key="${item[0]}-${item[1]}"]`);
    if (node && container) {
      const { top } = getPosition(node, container);
      scrollTopAnimation(ulRefs[item[0]], top, scrollTop(ulRefs[item[0]]) !== 0);
    }
  });
};

const TimeDropdown = React.forwardRef<HTMLDivElement, TimeDropdownProps>((props, ref) => {
  const {
    className,
    classPrefix,
    onSelect,
    show,
    format,
    timeZone,
    date,
    showMeridian,
    ...rest
  } = props;
  const { locale } = useCustom<CalendarLocaleTypes>('Calendar');
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
    if (!_.isNumber(active)) {
      return null;
    }
    const { start, end } = getRanges(showMeridian)[type];
    const items = [];
    const hideFunc = props[_.camelCase(`hide_${type}`)];
    const disabledFunc = props[_.camelCase(`disabled_${type}`)];

    for (let i = start; i <= end; i += 1) {
      if (!hideFunc?.(i, date)) {
        const disabled = disabledFunc?.(i, date);
        const itemClasses = merge(prefix('cell'), {
          [prefix('cell-active')]: active === i,
          [prefix('cell-disabled')]: disabled
        });

        items.push(
          <li key={i}>
            <a
              role="menu"
              className={itemClasses}
              tabIndex={-1}
              data-key={`${type}-${i}`}
              onClick={!disabled ? _.partial(handleClick, type, i) : null}
            >
              {showMeridian && type === 'hours' && i === 0 ? '12' : i}
            </a>
          </li>
        );
      }
    }

    return (
      <div className={prefix('column')}>
        <div className={prefix('column-title')}>{locale?.[type]}</div>
        <ul
          ref={ref => {
            ulRefs.current[type] = ref;
          }}
        >
          {items}
        </ul>
      </div>
    );
  };

  const time = getTime(props);
  const classes = merge(rootPrefix(classPrefix), className);
  const unhandled = getUnhandledProps(TimeDropdown, rest);

  useEffect(() => {
    updatePosition();
  }, [updatePosition]);

  return (
    <div {...unhandled} ref={ref} className={classes}>
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
  date: PropTypes.instanceOf(Date),
  show: PropTypes.bool,
  showMeridian: PropTypes.bool,
  format: PropTypes.string,
  timeZone: PropTypes.string,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  disabledDate: PropTypes.func,
  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  disabledSeconds: PropTypes.func,
  hideHours: PropTypes.func,
  hideMinutes: PropTypes.func,
  hideSeconds: PropTypes.func,
  onSelect: PropTypes.func
};
TimeDropdown.defaultProps = defaultProps;

export default TimeDropdown;
