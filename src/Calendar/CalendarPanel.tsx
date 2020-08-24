import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from './Calendar';
import Button from '../Button';
import FormattedDate from '../IntlProvider/FormattedDate';
import { useClassNames, useCustom } from '../utils';
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
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { CalendarLocale } from './types';

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

  /**  Callback fired before the value changed  */
  onChange?: (date: Date) => void;

  /** Callback fired before the date selected */
  onSelect?: (date: Date) => void;

  /** Custom render calendar cells  */
  renderCell?: (date: Date) => React.ReactNode;

  locale?: CalendarLocale;
}

const defaultProps: Partial<CalendarPanelProps> = {
  defaultValue: new Date(),
  classPrefix: 'calendar',
  as: Calendar
};

const CalendarPanel: RsRefForwardingComponent<'div', CalendarPanelProps> = React.forwardRef(
  (props: CalendarPanelProps, ref) => {
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
      value: propsValue,
      ...rest
    } = props;
    const [value, updateValue] = useState<Date>(toTimeZone(propsValue ?? defaultValue, timeZone));
    const [pageDate, setPageDate] = useState(
      toTimeZone(propsValue ?? defaultValue ?? new Date(), timeZone)
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
      const nextValue = toTimeZone(
        propsValue ?? toLocalTimeZone(prevValueRef.current, prevTimeZoneRef.current),
        timeZone
      );
      prevTimeZoneRef.current = timeZone;
      setValue(nextValue);
      setPageDate(nextValue ?? zonedDate(timeZone));
    }, [setValue, timeZone, propsValue]);

    const handleToggleMonthDropdown = useCallback(() => {
      setShowMonth(prevShowMonth => !prevShowMonth);
    }, []);

    const handleChange = useCallback(
      (nextValue: Date) => {
        setValue(nextValue);
        setPageDate(
          composeFunctions(
            (d: Date) => setHours(d, getHours(pageDate)),
            (d: Date) => setMinutes(d, getMinutes(pageDate)),
            (d: Date) => setSeconds(d, getSeconds(pageDate))
          )(nextValue)
        );

        onChange?.(toLocalTimeZone(nextValue, timeZone));
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
      const nextValue = zonedDate(timeZone);
      setShowMonth(false);
      handleChange(nextValue);
    }, [handleChange, timeZone]);

    const handleSelect = useCallback(
      (nextValue: Date) => {
        onSelect?.(toLocalTimeZone(nextValue, timeZone));
        handleChange(nextValue);
      },
      [handleChange, onSelect, timeZone]
    );

    const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);

    const renderToolbar = useCallback(
      () => (
        <Button className={prefix('btn-today')} onClick={handleClickToday}>
          {locale.today || 'Today'}
        </Button>
      ),
      [handleClickToday, locale.today, prefix]
    );

    const customRenderCell = useCallback(
      (date: Date) => renderCell?.(toLocalTimeZone(date, timeZone)),
      [renderCell, timeZone]
    );

    const classes = merge(
      className,
      prefix('panel'),
      withClassPrefix({
        bordered,
        compact
      })
    );

    return (
      <Component
        {...rest}
        className={classes}
        ref={ref}
        isoWeek={isoWeek}
        format="yyyy-MM-dd"
        calendarState={showMonth ? 'DROP_MONTH' : null}
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
  }
);

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
