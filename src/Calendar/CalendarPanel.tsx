import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Calendar from './Calendar';
import Button from '../Button';
import FormattedDate from '../IntlProvider/FormattedDate';
import { prefix, useCustom } from '../utils';
import { toLocalTimeZone, toTimeZone, zonedDate } from '../utils/timeZone';
import composeFunctions from '../utils/composeFunctions';
import {
  getHours,
  getMinutes,
  getSeconds,
  setHours,
  setMinutes,
  setSeconds
} from '../utils/dateUtils';
import { StandardProps } from '../@types/common';

export interface CalendarPanelProps extends Omit<StandardProps, 'as'> {
  /** Controlled value */
  value?: Date;

  /** Default value  */
  defaultValue?: Date;

  /** ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day  */
  isoWeek?: boolean;

  /** IANA time zone */
  timeZone?: string;

  /** Display a compact calendar   */
  compact?: boolean;

  /** Show border   */
  bordered?: boolean;

  /**  Callback fired before the value changed  */
  onChange?: (date: Date) => void;

  /** Callback fired before the date selected */
  onSelect?: (date: Date) => void;

  /** Custom render calendar cells  */
  renderCell?: (date: Date) => React.ReactNode;

  locale?: Record<string, any>;
}

const defaultProps: Partial<CalendarPanelProps> = {
  defaultValue: new Date(),
  classPrefix: 'calendar'
};

const CalendarPanel = React.forwardRef<HTMLDivElement, CalendarPanelProps>((props, ref) => {
  const {
    defaultValue,
    value: propsValue,
    timeZone,
    onChange,
    onSelect,
    locale: propsLocale,
    classPrefix,
    compact,
    className,
    isoWeek,
    bordered,
    ...rest
  } = props;
  const [value, setValue] = useState<Date>(toTimeZone(propsValue ?? defaultValue, timeZone));
  const [pageDate, setPageDate] = useState(
    toTimeZone(propsValue ?? defaultValue ?? new Date(), timeZone)
  );
  const [showMonth, setShowMonth] = useState<boolean>(false);
  const { locale } = useCustom('Calendar', propsLocale) || {};

  useEffect(() => {
    const nextValue = toTimeZone(propsValue ?? toLocalTimeZone(value, timeZone), timeZone);
    setValue(nextValue);
    setPageDate(nextValue ?? zonedDate(timeZone));
  }, [value, timeZone, propsValue]);

  const handleToggleMonthDropdown = () => {
    setShowMonth(prevShowMonth => !prevShowMonth);
  };

  const handleChange = (nextValue: Date) => {
    setValue(nextValue);
    setPageDate(
      composeFunctions(
        (d: Date) => setHours(d, getHours(pageDate)),
        (d: Date) => setMinutes(d, getMinutes(pageDate)),
        (d: Date) => setSeconds(d, getSeconds(pageDate))
      )(nextValue)
    );

    onChange?.(toLocalTimeZone(nextValue, timeZone));
  };

  const handleChangePageDate = (nextValue: Date) => {
    setShowMonth(false);
    handleChange(nextValue);
  };

  const handleClickToday = () => {
    const nextValue = zonedDate(timeZone);
    setShowMonth(false);
    handleChange(nextValue);
  };

  const handleNextMonth = (nextValue: Date) => {
    handleChange(nextValue);
  };

  const handlePrevMonth = (nextValue: Date) => {
    handleChange(nextValue);
  };

  const handleSelect = (nextValue: Date) => {
    onSelect?.(toLocalTimeZone(nextValue, timeZone));
    handleChange(nextValue);
  };

  const addPrefix = (name: string): string => prefix(classPrefix)(name);

  const renderToolbar = () => {
    return (
      <Button className={addPrefix('btn-today')} onClick={handleClickToday}>
        {locale.today || 'Today'}
      </Button>
    );
  };

  const renderCell = (date: Date) => props.renderCell?.(toLocalTimeZone(date, timeZone));
  const classes = classNames(addPrefix('panel'), className, {
    [addPrefix('bordered')]: bordered,
    [addPrefix('compact')]: compact
  });

  return (
    <Calendar
      className={classes}
      ref={ref}
      isoWeek={isoWeek}
      format="yyyy-MM-dd"
      calendarState={showMonth ? 'DROP_MONTH' : null}
      pageDate={pageDate}
      timeZone={timeZone}
      renderTitle={date => (
        <FormattedDate date={date} formatStr={locale.formattedMonthPattern || 'MMMM  yyyy'} />
      )}
      renderToolbar={renderToolbar}
      onMoveForward={handleNextMonth}
      onMoveBackward={handlePrevMonth}
      onToggleMonthDropdown={handleToggleMonthDropdown}
      onChangePageDate={handleChangePageDate}
      limitEndYear={1000}
      {...rest}
      onSelect={handleSelect}
      renderCell={renderCell}
    />
  );
});

CalendarPanel.propTypes = {
  value: PropTypes.instanceOf(Date),
  defaultValue: PropTypes.instanceOf(Date),
  isoWeek: PropTypes.bool,
  timeZone: PropTypes.string,
  compact: PropTypes.bool,
  bordered: PropTypes.bool,
  locale: PropTypes.object,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  renderCell: PropTypes.func
};
CalendarPanel.defaultProps = defaultProps;

export default CalendarPanel;
