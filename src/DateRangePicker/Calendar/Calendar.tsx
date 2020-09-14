import * as React from 'react';
import PropTypes from 'prop-types';
import { addMonths, isAfter, setDate } from '../../utils/dateUtils';
import CalendarCore, { CalendarProps as CalendarCoreProps } from '../../Calendar/Calendar';
import { RsRefForwardingComponent, WithAsProps } from '../../@types/common';

export interface CalendarProps
  extends WithAsProps,
    Omit<CalendarCoreProps, 'disabledDate' | 'onSelect' | 'onMouseMove'> {
  index: number;
  calendarDate: Date[];
  value?: Date[];
  hoverValue?: Date[];
  showOneCalendar?: boolean;
  disabledDate?: (date: Date, selectValue: Date[], type: string) => boolean;
  onSelect?: (date: Date) => void;
  onMouseMove?: (date: Date) => void;
}
const defaultProps: Partial<CalendarProps> = {
  calendarDate: [new Date(), addMonths(new Date(), 1)],
  index: 0,
  as: CalendarCore
};

const Calendar: RsRefForwardingComponent<'div', CalendarProps> = React.forwardRef(
  (props: CalendarProps, ref) => {
    const {
      as: Component,
      calendarDate,
      index,
      onMoveForward,
      onMoveBackward,
      showOneCalendar,
      value,
      disabledDate,
      ...rest
    } = props;

    const getPageDate = () => calendarDate[index];

    const handleMoveForward = () => {
      onMoveForward?.(addMonths(getPageDate(), 1));
    };

    const handleMoveBackward = () => {
      onMoveBackward?.(addMonths(getPageDate(), -1));
    };

    const disabledBackward = () => {
      const after = isAfter(setDate(calendarDate[1], 1), setDate(addMonths(calendarDate[0], 1), 1));

      if (index === 0) {
        return false;
      }

      if (!after) {
        return true;
      }

      return false;
    };

    const disabledForward = () => {
      if (showOneCalendar) return false;
      const after = isAfter(setDate(calendarDate[1], 1), setDate(addMonths(calendarDate[0], 1), 1));

      if (index === 1) {
        return false;
      }

      if (!after) {
        return true;
      }

      return false;
    };

    const disabledMonth = (date: Date) => {
      let after = true;

      if (disabledDate?.(date, value, 'MONTH')) {
        return true;
      }
      if (showOneCalendar) return false;

      if (index === 1) {
        after = isAfter(date, calendarDate[0]);

        return !after;
      }

      after = isAfter(calendarDate[1], date);

      return !after;
    };

    return (
      <Component
        {...rest}
        ref={ref}
        pageDate={getPageDate()}
        showMonth
        showDate
        showTime
        disabledBackward={disabledBackward()}
        disabledForward={disabledForward()}
        disabledDate={disabledMonth}
        onMoveForward={handleMoveForward}
        onMoveBackward={handleMoveBackward}
      />
    );
  }
);

Calendar.displayName = 'Calendar';
Calendar.propTypes = {
  ...CalendarCore.propTypes,
  calendarState: PropTypes.oneOf(['DROP_MONTH', 'DROP_TIME']),
  index: PropTypes.number,
  calendarDate: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  hoverValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  format: PropTypes.string,
  timeZone: PropTypes.string,
  isoWeek: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  limitEndYear: PropTypes.number,
  disabledDate: PropTypes.func,
  onMoveForward: PropTypes.func,
  onMoveBackward: PropTypes.func,
  onSelect: PropTypes.func,
  onMouseMove: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onChangePageDate: PropTypes.func,
  showOneCalendar: PropTypes.bool
};
Calendar.defaultProps = defaultProps;

export default Calendar;
