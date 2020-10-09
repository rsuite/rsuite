import React, { useCallback, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import { FormattedDate } from '../CustomProvider';
import Toolbar from './Toolbar';
import DatePicker from './DatePicker';
import { CalendarLocale } from '../Calendar';
import { getCalendarDate, toLocalValue, toZonedValue } from './utils';
import * as disabledDateUtils from './disabledDateUtils';
import {
  createChainedFunction,
  useCustom,
  useClassNames,
  useControlled,
  mergeRefs,
  DATERANGE_DISABLED_TARGET,
  DateUtils,
  TimeZone
} from '../utils';

import {
  MenuWrapper,
  PositionChildProps,
  usePickerClassName,
  OverlayTriggerInstance,
  usePublicMethods,
  pickerToggleTriggerProps,
  PickerToggle,
  PickerToggleTrigger,
  PickerComponent,
  pickerPropTypes
} from '../Picker';
import { PickerBaseProps, FormControlBaseProps } from '../@types/common';

export type ValueType = [Date?, Date?];

export type DisabledDateFunction = (
  /** Date used to determine if disabling is required. */
  date: Date,
  /** Date selected. */
  selectDate?: ValueType,
  /**
   Whether to choose to finish now.
   If `false`, only the start date is selected, waiting for the selection end date.
   */
  selectedDone?: boolean,
  // Call the target of the `disabledDate` function
  target?: DATERANGE_DISABLED_TARGET
) => boolean;

export interface DateRangeLocale extends CalendarLocale {
  last7Days?: string;
}

export interface RangeType {
  label: React.ReactNode;
  closeOverlay?: boolean;
  value: ValueType | ((value?: ValueType) => ValueType);
}

export interface DateRangePickerProps extends PickerBaseProps, FormControlBaseProps<ValueType> {
  /** Configure shortcut options */
  ranges?: RangeType[];

  /** Format date */
  format?: string;

  /** IANA time zone */
  timeZone?: string;

  /** The date range that will be selected when you click on the date */
  hoverRange?: 'week' | 'month' | ((date: Date) => ValueType);

  /** Whether to click once on selected date range，Can be used with hoverRange */
  oneTap?: boolean;

  /** ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day */
  isoWeek?: boolean;

  /** Set the lower limit of the available year relative to the current selection date */
  limitEndYear?: number;

  /** Whether to show week numbers */
  showWeekNumbers?: boolean;

  /** Show only one calendar select */
  showOneCalendar?: boolean;

  /** Set default date for calendar */
  defaultCalendarValue?: ValueType;

  /** Disabled date */
  disabledDate?: (
    date: Date,
    selectDate: ValueType,
    selectedDone: boolean,
    target: DATERANGE_DISABLED_TARGET
  ) => boolean;

  /** Called when the option is selected */
  onSelect?: (date: Date, event?: React.SyntheticEvent<HTMLElement>) => void;

  /** Called after clicking the OK button */
  onOk?: (date: ValueType, event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called when clean */
  onClean?: (event: React.MouseEvent) => void;

  /** Custom render value */
  renderValue?: (value: ValueType, format: string) => React.ReactNode;
}

export interface DateRangePicker extends PickerComponent<DateRangePickerProps> {
  /** Allow the maximum number of days specified, other dates are disabled */
  allowedMaxDays?: (days: number) => DisabledDateFunction;

  /** Only allowed days are specified, other dates are disabled */
  allowedDays?: (days: number) => DisabledDateFunction;

  /** Allow specified date range, other dates are disabled */
  allowedRange?: (startDate: string | Date, endDate: string | Date) => DisabledDateFunction;

  /** Disable dates after the specified date */
  before?: (beforeDate: string | Date) => DisabledDateFunction;

  /** Disable dates before the specified date */
  after?: (afterDate: string | Date) => DisabledDateFunction;

  /** Disable dates after today. */
  beforeToday?: () => DisabledDateFunction;

  /** Disable dates before today */
  afterToday?: () => DisabledDateFunction;

  /** Used to combine multiple conditions */
  combine?: (...args: any) => DisabledDateFunction;
}

const defaultProps: Partial<DateRangePickerProps> = {
  as: 'div',
  cleanable: true,
  placement: 'bottomStart',
  appearance: 'default',
  classPrefix: 'picker',
  limitEndYear: 1000,
  placeholder: '',
  format: 'yyyy-MM-dd',
  showOneCalendar: false
};

const DateRangePicker: DateRangePicker = React.forwardRef((props: DateRangePickerProps, ref) => {
  const {
    as: Component,
    classPrefix,
    className,
    defaultValue,
    defaultCalendarValue,
    value: valueProp,
    disabled,
    cleanable,
    locale: overrideLocale,
    toggleAs,
    style,
    menuClassName,
    ranges,
    isoWeek,
    limitEndYear,
    oneTap,
    showWeekNumbers,
    showOneCalendar,
    timeZone,
    hoverRange,
    placeholder,
    placement,
    format: formatStr,
    onSelect,
    disabledDate,
    renderValue,
    onEntered,
    onEnter,
    onExited,
    onClean,
    onChange,
    onOk,
    onOpen,
    onClose,
    ...rest
  } = props;

  const { locale } = useCustom<DateRangeLocale>('DateRangePicker', overrideLocale);
  const { merge, prefix } = useClassNames(classPrefix);

  const [active, setActive] = useState<boolean>(false);
  const triggerRef = useRef<OverlayTriggerInstance>();
  const rootRef = useRef<HTMLDivElement>();
  const toggleRef = useRef<HTMLButtonElement>();
  const menuRef = useRef<HTMLDivElement>();

  usePublicMethods(ref, { rootRef, triggerRef, menuRef, toggleRef });

  // Format the value according to the time zone.
  const formatValue = useCallback((v: ValueType) => toZonedValue(v, timeZone), [timeZone]);

  const [value, setValue] = useControlled<ValueType>(valueProp, defaultValue, formatValue);

  // Two clicks, the second click ends
  const [doneSelected, setDoneSelected] = useState(true);

  // Which interval should be highlighted at present, used to realize the selection of whole week, whole month
  const [hoverValue, setHoverValue] = useState<[Date?, Date?, Date?]>([]);

  // Display calendar date
  const [calendarDate, setCalendarDate] = useState<ValueType>(getCalendarDate({ value, timeZone }));

  /**
   * The currently selected date range.
   *
   * The time range is selected by two clicks. After the first click,
   * the cursor will store a temporary event date in the process until
   * the second click deletes the temporary event date to determine the end date of the date range.
   *
   * So here will store the date range through 3 dates, and the second date is the temporary event date.
   */
  const [selectValue, setSelectValue] = useState<[Date?, Date?, Date?]>(value);

  // The date of the current hover, used to reduce the calculation of `handleMouseMoveSelectValue`
  const [currentHoverDate, setCurrentHoverDate] = useState<Date>(null);

  const hasValue = value && value.length > 1;

  const [classes, usedClassNameProps] = usePickerClassName({
    ...props,
    name: 'daterange',
    hasValue
  });

  // hover range presets
  const getWeekHoverRange = useCallback(
    (date: Date): ValueType => {
      if (isoWeek) {
        // set to the first day of this week according to ISO 8601, 12:00 am
        return [DateUtils.startOfISOWeek(date), DateUtils.endOfISOWeek(date)];
      }

      return [DateUtils.startOfWeek(date), DateUtils.endOfWeek(date)];
    },
    [isoWeek]
  );
  const getMonthHoverRange = useCallback(
    (date: Date): ValueType => [DateUtils.startOfMonth(date), DateUtils.endOfMonth(date)],
    []
  );

  const getHoverRange = useCallback(
    (date: Date): [Date?, Date?, Date?] => {
      if (!hoverRange) {
        return [date, date];
      }

      let hoverRangeFunc = hoverRange;
      if (hoverRange === 'week') {
        hoverRangeFunc = getWeekHoverRange;
      }

      if (hoverRange === 'month') {
        hoverRangeFunc = getMonthHoverRange;
      }

      if (typeof hoverRangeFunc !== 'function') {
        return [];
      }

      const hoverValues: ValueType = toZonedValue(
        hoverRangeFunc(TimeZone.toLocalTimeZone(date, timeZone)),
        timeZone
      );
      const isHoverRangeValid = hoverValues instanceof Array && hoverValues.length === 2;
      if (!isHoverRangeValid) {
        return [];
      }
      if (DateUtils.isAfter(hoverValues[0], hoverValues[1])) {
        hoverValues.reverse();
      }
      return hoverValues;
    },
    [getMonthHoverRange, getWeekHoverRange, hoverRange, timeZone]
  );

  const renderDateRange = useCallback(
    (selectValue?: ValueType) => {
      const [startDate, endDate] = selectValue || value;

      if (startDate && endDate) {
        const displayValue: any = [startDate, endDate].sort(DateUtils.compareAsc);

        return renderValue ? (
          renderValue(toLocalValue(displayValue, timeZone), formatStr)
        ) : (
          <>
            <FormattedDate date={displayValue[0]} formatStr={formatStr} /> ~{' '}
            <FormattedDate date={displayValue[1]} formatStr={formatStr} />
          </>
        );
      }

      return placeholder || `${formatStr} ~ ${formatStr}`;
    },
    [formatStr, placeholder, renderValue, timeZone, value]
  );

  const disabledDateRange = useCallback(
    (
      date: Date,
      selectDate: ValueType,
      selectedDone: boolean,
      target: DATERANGE_DISABLED_TARGET
    ): boolean => {
      return disabledDate?.(
        TimeZone.toLocalTimeZone(date, timeZone),
        toLocalValue(selectDate, timeZone),
        selectedDone,
        target
      );
    },
    [disabledDate, timeZone]
  );

  const handleDisabledDate = useCallback(
    (date: Date, value: ValueType, type: DATERANGE_DISABLED_TARGET) => {
      return !!disabledDateRange(date, value, doneSelected, type);
    },
    [disabledDateRange, doneSelected]
  );

  const handleClose = useCallback(() => {
    triggerRef.current?.close();
  }, []);

  const updateValue = useCallback(
    (event: React.SyntheticEvent, nextSelectValue?: ValueType, closeOverlay = true) => {
      // `closeOverlay` default value is `true`
      if (closeOverlay !== false) {
        handleClose();
      }

      const nextValue = typeof nextSelectValue !== 'undefined' ? nextSelectValue : selectValue;

      setSelectValue(nextValue || []);
      setValue(nextValue);

      if (
        onChange &&
        (!DateUtils.isSameDay(nextValue[0], value[0]) ||
          !DateUtils.isSameDay(nextValue[1], value[1]))
      ) {
        onChange(toLocalValue(nextValue, timeZone), event);
      }
    },
    [handleClose, onChange, selectValue, setValue, timeZone, value]
  );

  const handleChangeSelectValue = useCallback(
    (date: Date, event: React.SyntheticEvent<any>) => {
      // https://reactjs.org/docs/events.html#event-pooling
      event.persist();

      let nextValue = [];
      let nextHoverValue = getHoverRange(date);

      onSelect?.(TimeZone.toLocalTimeZone(date, timeZone), event);

      // If it is in single-click mode, this directly uses the value of hoverValue.
      if (oneTap) {
        updateValue(event, nextHoverValue);
        setSelectValue(nextHoverValue);
        setHoverValue(nextHoverValue);
        return;
      }

      if (doneSelected) {
        if (nextHoverValue.length) {
          nextValue = [nextHoverValue[0], nextHoverValue[1], date];
          nextHoverValue = [nextHoverValue[0], nextHoverValue[1], date];
        } else {
          nextValue = [date, undefined, date];
        }
      } else {
        if (nextHoverValue.length) {
          nextValue = [selectValue[0], selectValue[1]];
        } else {
          nextValue = [selectValue[0], date];
        }

        if (DateUtils.isAfter(nextValue[0], nextValue[1])) {
          nextValue.reverse();
        }

        setCalendarDate(getCalendarDate({ value: nextValue as ValueType, timeZone }));
      }

      setDoneSelected(!doneSelected);
      setSelectValue(nextValue as ValueType);
      setHoverValue(nextHoverValue as ValueType);
    },
    [doneSelected, getHoverRange, onSelect, oneTap, selectValue, timeZone, updateValue]
  );

  const handleMouseMoveSelectValue = useCallback(
    (date: Date) => {
      if (currentHoverDate && DateUtils.isSameDay(date, currentHoverDate)) {
        return;
      }

      const nextHoverValue = getHoverRange(date);

      if (doneSelected && typeof hoverRange !== 'undefined') {
        setCurrentHoverDate(date);
        setHoverValue(nextHoverValue);
        return;
      } else if (doneSelected) {
        return;
      }

      let nextValue: Date[] = selectValue;

      if (!nextHoverValue.length) {
        nextValue[1] = date;
      } else if (hoverValue) {
        nextValue = [
          DateUtils.isBefore(nextHoverValue[0], hoverValue[0]) ? nextHoverValue[0] : hoverValue[0],
          DateUtils.isAfter(nextHoverValue[1], hoverValue[1]) ? nextHoverValue[1] : hoverValue[1],
          nextValue[2]
        ];
      }

      // If `nextValue[0]` is greater than `nextValue[1]` then reverse order
      if (DateUtils.isAfter(nextValue[0], nextValue[1])) {
        nextValue.reverse();
      }

      setCurrentHoverDate(date);
      setSelectValue(nextValue as ValueType);
    },
    [currentHoverDate, doneSelected, getHoverRange, hoverRange, hoverValue, selectValue]
  );

  const handleChangeCalendarDate = useCallback(
    (index: number, date: Date) => {
      setCalendarDate(index === 0 ? [date, calendarDate[1]] : [calendarDate[0], date]);
    },
    [calendarDate]
  );

  const disabledByBetween = useCallback(
    (start: Date, end: Date, type: DATERANGE_DISABLED_TARGET) => {
      const selectStartDate = selectValue[0];
      const selectEndDate = selectValue[1];
      const nextSelectValue: ValueType = [selectStartDate, selectEndDate];

      // If the date is between the start and the end
      // the button is disabled
      while (DateUtils.isBefore(start, end) || DateUtils.isSameDay(start, end)) {
        if (disabledDateRange(start, nextSelectValue, doneSelected, type)) {
          return true;
        }
        start = DateUtils.addDays(start, 1);
      }

      return false;
    },
    [disabledDateRange, doneSelected, selectValue]
  );

  const disabledOkButton = useCallback(() => {
    const [start, end] = selectValue;
    if (!start || !end || !doneSelected) {
      return true;
    }

    return disabledByBetween(start, end, DATERANGE_DISABLED_TARGET.TOOLBAR_BUTTON_OK);
  }, [disabledByBetween, doneSelected, selectValue]);

  const disabledShortcutButton = useCallback(
    (value: ValueType = []) => {
      const [start, end] = value;
      if (!start || !end) {
        return true;
      }

      return disabledByBetween(start, end, DATERANGE_DISABLED_TARGET.TOOLBAR_SHORTCUT);
    },
    [disabledByBetween]
  );

  /**
   * Toolbar operation callback function
   */
  const handleShortcutPageDate = useCallback(
    (value: ValueType, closeOverlay?: boolean, event?: React.SyntheticEvent) => {
      updateValue(event, value, closeOverlay);
    },
    [updateValue]
  );

  const handleOK = useCallback(
    (event: React.SyntheticEvent<any>) => {
      updateValue(event);
      onOk?.(toLocalValue(selectValue, timeZone), event);
    },
    [onOk, selectValue, timeZone, updateValue]
  );

  const handleEnter = useCallback(() => {
    let calendarDate: ValueType = [];

    if (value && value.length) {
      const [startDate, endData] = value;
      calendarDate = [
        startDate,
        DateUtils.isSameMonth(startDate, endData) ? DateUtils.addMonths(endData, 1) : endData
      ];
    } else {
      calendarDate = getCalendarDate({
        value: toZonedValue(defaultCalendarValue, timeZone),
        timeZone
      });
    }

    setSelectValue(value);
    setCalendarDate(calendarDate);
  }, [defaultCalendarValue, timeZone, value]);

  const handleEntered = useCallback(() => {
    onOpen?.();
    setActive(true);
  }, [onOpen]);

  const handleExited = useCallback(() => {
    setDoneSelected(true);
    setActive(false);
    onClose?.();
  }, [onClose]);

  const handleClean = useCallback(
    (event: React.MouseEvent) => {
      setCalendarDate(getCalendarDate({ timeZone }));
      updateValue(event, []);
    },
    [timeZone, updateValue]
  );

  const renderDropdownMenu = useCallback(
    (positionProps: PositionChildProps, speakerRef) => {
      const { left, top, className } = positionProps;
      const classes = prefix(className, menuClassName, 'daterange-menu');
      const panelClasses = prefix('daterange-panel', {
        'daterange-panel-show-one-calendar': showOneCalendar
      });
      const styles = { left, top };

      const pickerProps = {
        isoWeek,
        hoverValue,
        calendarDate,
        limitEndYear,
        showWeekNumbers,
        locale,
        showOneCalendar,
        timeZone,
        format: formatStr,
        value: selectValue as ValueType,
        disabledDate: handleDisabledDate,
        onSelect: handleChangeSelectValue,
        onMouseMove: handleMouseMoveSelectValue,
        onChangeCalendarDate: handleChangeCalendarDate
      };

      return (
        <MenuWrapper
          className={classes}
          style={styles}
          ref={mergeRefs(menuRef, speakerRef)}
          target={triggerRef}
        >
          <div className={panelClasses}>
            <div className={prefix('daterange-content')}>
              <div className={prefix('daterange-header')}>
                {renderDateRange(selectValue as ValueType)}
              </div>
              <div className={prefix(`daterange-calendar-${showOneCalendar ? 'single' : 'group'}`)}>
                <DatePicker index={0} {...pickerProps} />
                {!showOneCalendar && <DatePicker index={1} {...pickerProps} />}
              </div>
            </div>
            <Toolbar
              locale={locale}
              ranges={ranges}
              disabledOkButton={disabledOkButton}
              disabledShortcutButton={disabledShortcutButton}
              onShortcut={handleShortcutPageDate}
              onOk={handleOK}
              hideOkButton={oneTap}
              timeZone={timeZone}
            />
          </div>
        </MenuWrapper>
      );
    },
    [
      calendarDate,
      disabledOkButton,
      disabledShortcutButton,
      formatStr,
      handleChangeCalendarDate,
      handleChangeSelectValue,
      handleDisabledDate,
      handleMouseMoveSelectValue,
      handleOK,
      handleShortcutPageDate,
      hoverValue,
      isoWeek,
      limitEndYear,
      locale,
      menuClassName,
      oneTap,
      prefix,
      ranges,
      renderDateRange,
      selectValue,
      showOneCalendar,
      showWeekNumbers,
      timeZone
    ]
  );

  return (
    <PickerToggleTrigger
      pickerProps={pick(props, pickerToggleTriggerProps)}
      ref={triggerRef}
      placement={placement}
      onEnter={createChainedFunction(handleEnter, onEnter)}
      onEntered={createChainedFunction(handleEntered, onEntered)}
      onExited={createChainedFunction(handleExited, onExited)}
      speaker={renderDropdownMenu}
    >
      <Component ref={rootRef} className={merge(className, classes)} style={style}>
        <PickerToggle
          {...omit(rest, [
            ...pickerToggleTriggerProps,
            ...usedClassNameProps,
            ...DateUtils.calendarOnlyProps
          ])}
          as={toggleAs}
          ref={toggleRef}
          onClean={createChainedFunction(handleClean, onClean)}
          cleanable={cleanable && !disabled}
          hasValue={hasValue}
          active={active}
        >
          {renderDateRange()}
        </PickerToggle>
      </Component>
    </PickerToggleTrigger>
  );
});

DateRangePicker.after = disabledDateUtils.after;
DateRangePicker.afterToday = disabledDateUtils.afterToday;
DateRangePicker.allowedDays = disabledDateUtils.allowedDays;
DateRangePicker.allowedMaxDays = disabledDateUtils.allowedMaxDays;
DateRangePicker.allowedRange = disabledDateUtils.allowedRange;
DateRangePicker.before = disabledDateUtils.before;
DateRangePicker.beforeToday = disabledDateUtils.beforeToday;
DateRangePicker.combine = disabledDateUtils.combine;

DateRangePicker.displayName = 'DateRangePicker';
DateRangePicker.defaultProps = defaultProps;
DateRangePicker.propTypes = {
  ...pickerPropTypes,
  ranges: PropTypes.array,
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  defaultValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  defaultCalendarValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  hoverRange: PropTypes.oneOfType([PropTypes.oneOf(['week', 'month']), PropTypes.func]),
  format: PropTypes.string,
  timeZone: PropTypes.string,
  isoWeek: PropTypes.bool,
  oneTap: PropTypes.bool,
  limitEndYear: PropTypes.number,
  showWeekNumbers: PropTypes.bool,
  onChange: PropTypes.func,
  onOk: PropTypes.func,
  disabledDate: PropTypes.func,
  onSelect: PropTypes.func,
  showOneCalendar: PropTypes.bool
};

export default DateRangePicker;
