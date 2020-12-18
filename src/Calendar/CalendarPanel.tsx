import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Calendar, { CalendarState } from './Calendar';
import { CalendarLocale } from '../locales';
import Button from '../Button';
import { FormattedDate } from '../CustomProvider';
import { composeFunctions, useClassNames, useCustom, TimeZone, DateUtils } from '../utils';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';

export interface CalendarPanelProps extends WithAsProps {
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

  /** Custom locale */
  locale?: CalendarLocale;

  /**  Callback fired before the value changed  */
  onChange?: (date: Date) => void;

  /** Callback fired before the date selected */
  onSelect?: (date: Date) => void;

  /** Custom render calendar cells  */
  renderCell?: (date: Date) => React.ReactNode;
}

const defaultProps: Partial<CalendarPanelProps> = {
  defaultValue: new Date(),
  classPrefix: 'calendar',
  as: Calendar
};

const CalendarPanel: RsRefForwardingComponent<
  typeof Calendar,
  CalendarPanelProps
> = React.forwardRef((props: CalendarPanelProps, ref) => {
  const {
    as: Component,
    bordered,
    className,
    classPrefix,
    compact,
    defaultValue,
    isoWeek,
    locale: overrideLocale,
    onChange,
    onSelect,
    renderCell,
    timeZone,
    value: valueProp,
    ...rest
  } = props;
  const [value, updateValue] = useState<Date>(
    TimeZone.toTimeZone(valueProp ?? defaultValue, timeZone)
  );
  const [pageDate, setPageDate] = useState(
    TimeZone.toTimeZone(valueProp ?? defaultValue ?? new Date(), timeZone)
  );
  const [showMonth, setShowMonth] = useState<boolean>(false);
  const { locale } = useCustom('Calendar', overrideLocale);
  const prevValueRef = useRef<Date>(value);
  const prevTimeZoneRef = useRef<string>(timeZone);
  const setValue = useCallback((nextValue: Date) => {
    updateValue(prevValue => {
      prevValueRef.current = prevValue;
      return nextValue;
    });
  }, []);

  useEffect(() => {
    const nextValue = TimeZone.toTimeZone(
      valueProp ?? TimeZone.toLocalTimeZone(prevValueRef.current, prevTimeZoneRef.current),
      timeZone
    );
    prevTimeZoneRef.current = timeZone;
    setValue(nextValue);
    setPageDate(nextValue ?? TimeZone.zonedDate(timeZone));
  }, [setValue, timeZone, valueProp]);

  const handleToggleMonthDropdown = useCallback(() => {
    setShowMonth(prevShowMonth => !prevShowMonth);
  }, []);

  const handleChange = useCallback(
    (nextValue: Date) => {
      setValue(nextValue);
      setPageDate(
        composeFunctions(
          (d: Date) => DateUtils.setHours(d, DateUtils.getHours(pageDate)),
          (d: Date) => DateUtils.setMinutes(d, DateUtils.getMinutes(pageDate)),
          (d: Date) => DateUtils.setSeconds(d, DateUtils.getSeconds(pageDate))
        )(nextValue)
      );

      onChange?.(TimeZone.toLocalTimeZone(nextValue, timeZone));
    },
    [onChange, pageDate, setValue, timeZone]
  );

  const handleChangePageDate = useCallback(
    (nextValue: Date) => {
      setShowMonth(false);
      handleChange(nextValue);
    },
    [handleChange]
  );

  const handleClickToday = useCallback(() => {
    const nextValue = TimeZone.zonedDate(timeZone);
    setShowMonth(false);
    handleChange(nextValue);
  }, [handleChange, timeZone]);

  const handleSelect = useCallback(
    (nextValue: Date) => {
      onSelect?.(TimeZone.toLocalTimeZone(nextValue, timeZone));
      handleChange(nextValue);
    },
    [handleChange, onSelect, timeZone]
  );

  const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);

  const renderToolbar = useCallback(
    () => (
      <Button className={prefix('btn-today')} size="sm" onClick={handleClickToday}>
        {locale.today || 'Today'}
      </Button>
    ),
    [handleClickToday, locale.today, prefix]
  );

  const customRenderCell = useCallback(
    (date: Date) => renderCell?.(TimeZone.toLocalTimeZone(date, timeZone)),
    [renderCell, timeZone]
  );

  const classes = merge(className, withClassPrefix('panel', { bordered, compact }));

  return (
    <Component
      {...rest}
      inline
      className={classes}
      ref={ref}
      isoWeek={isoWeek}
      format="yyyy-MM-dd"
      calendarState={showMonth ? CalendarState.DROP_MONTH : null}
      pageDate={pageDate}
      timeZone={timeZone}
      limitEndYear={1000}
      locale={locale}
      renderTitle={date => (
        <FormattedDate date={date} formatStr={locale.formattedMonthPattern || 'MMMM  yyyy'} />
      )}
      renderToolbar={renderToolbar}
      renderCell={customRenderCell}
      onMoveForward={handleChange}
      onMoveBackward={handleChange}
      onToggleMonthDropdown={handleToggleMonthDropdown}
      onChangePageDate={handleChangePageDate}
      onSelect={handleSelect}
    />
  );
});

CalendarPanel.displayName = 'CalendarPanel';
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
