import IconCalendar from '@rsuite/icons/legacy/Calendar';
import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import partial from 'lodash/partial';
import pick from 'lodash/pick';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormControlBaseProps, PickerBaseProps } from '../@types/common';
import { FormattedDate } from '../CustomProvider';
import Toolbar from '../DatePicker/Toolbar';
import { DateRangePickerLocale } from '../locales';
import {
  omitTriggerPropKeys,
  OverlayTriggerInstance,
  PickerComponent,
  PickerOverlay,
  pickerPropTypes,
  PickerToggle,
  PickerToggleTrigger,
  pickTriggerPropKeys,
  PositionChildProps,
  usePickerClassName,
  usePublicMethods,
  useToggleKeyDownEvent
} from '../Picker';
import {
  createChainedFunction,
  DATERANGE_DISABLED_TARGET,
  DateUtils,
  mergeRefs,
  useClassNames,
  useControlled,
  useCustom
} from '../utils';
import { addMonths, compareAsc, isSameMonth } from '../utils/dateUtils';
import Calendar from './Calendar';
import * as disabledDateUtils from './disabledDateUtils';
import { DisabledDateFunction, RangeType, DateRange } from './types';
import {
  getCalendarDate,
  getMonthHoverRange,
  getWeekHoverRange,
  isSameRange,
  setTimingMargin
} from './utils';

type InputState = 'Typing' | 'Error' | 'Initial';

type SelectedDatesState = [] | [Date] | [Date, Date];

export interface DateRangePickerProps
  extends PickerBaseProps,
    FormControlBaseProps<DateRange | null> {
  /** Configure shortcut options */
  ranges?: RangeType[];

  /** Format date */
  format?: string;

  /** The date range that will be selected when you click on the date */
  hoverRange?: 'week' | 'month' | ((date: Date) => DateRange);

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

  /** Meridian format */
  showMeridian?: boolean;

  /** Set default date for calendar */
  defaultCalendarValue?: DateRange;

  /** The character that separates two dates */
  character?: string;

  /** Disabled date */
  disabledDate?: DisabledDateFunction;

  /** Called when the option is selected */
  onSelect?: (date: Date, event?: React.SyntheticEvent) => void;

  /** Called after clicking the OK button */
  onOk?: (date: DateRange, event: React.SyntheticEvent) => void;

  /** Called when clean */
  onClean?: (event: React.MouseEvent) => void;

  /** Custom render value */
  renderValue?: (value: DateRange, format: string) => React.ReactNode;
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

const DateRangePicker: DateRangePicker = React.forwardRef((props: DateRangePickerProps, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'picker',
    className,
    appearance = 'default',
    cleanable = true,
    character = ' ~ ',
    defaultCalendarValue,
    defaultValue,
    disabled,
    disabledDate: disabledDateProp,
    format: formatStr = 'yyyy-MM-dd',
    hoverRange,
    isoWeek = false,
    limitEndYear = 1000,
    locale: overrideLocale,
    menuClassName,
    menuStyle,
    oneTap,
    placeholder = '',
    placement = 'bottomStart',
    ranges,
    renderValue,
    showOneCalendar = false,
    showWeekNumbers,
    showMeridian,
    style,
    toggleAs,
    value: valueProp,
    onChange,
    onClean,
    onClose,
    onEnter,
    onEntered,
    onExited,
    onOk,
    onOpen,
    onSelect,
    ...rest
  } = props;
  const { merge, prefix } = useClassNames(classPrefix);
  const { locale, formatDate, parseDate } = useCustom<DateRangePickerLocale>(
    'DateRangePicker',
    overrideLocale
  );
  const rangeFormatStr = `${formatStr}${character}${formatStr}`;

  const [value, setValue] = useControlled(valueProp, defaultValue ?? null);

  /**
   * Whether to complete the selection.
   * Everytime selection will change this value. If the value is false, it means that the selection has not been completed.
   *
   * In `oneTap` mode, select action will not change this value, its value should be true always.
   */
  const hasDoneSelect = useRef(true);

  /**
   * The currently selected date range.
   *
   * The time range is selected by two clicks. After the first click,
   * the cursor will store a temporary event date in the process until
   * the second click to determine the end date of the date range.
   *
   */
  const [selectedDates, setSelectedDates] = useState<SelectedDatesState>(
    valueProp ?? defaultValue ?? []
  );

  // The date of the current hover, used to reduce the calculation of `handleMouseMove`
  const [hoverDateRange, setHoverDateRange] = useState<DateRange | null>(null);

  // The displayed calendar panel is rendered based on this value.
  const [calendarDate, setCalendarDate] = useState<DateRange>(
    getCalendarDate({ value: valueProp ?? defaultCalendarValue ?? null })
  );

  const [inputState, setInputState] = useState<InputState>();

  /**
   * When hoverRange is set, `selectValue` will be updated during the hover process,
   * which will cause the `selectValue` to be updated after the first click,
   * so declare a Ref to temporarily store the `selectValue` of the first click.
   */
  const selectRangeValueRef = useRef<DateRange | null>(null);

  /**
   * Call this function to update the calendar panel rendering benchmark value.
   * If params `value` is not passed, it defaults to [new Date(), addMonth(new Date(), 1)].
   */
  const updateCalendarDate = useCallback((value: SelectedDatesState | null) => {
    setCalendarDate(getCalendarDate({ value }));
  }, []);

  // if valueProp changed then update selectValue/hoverValue
  useEffect(() => {
    setSelectedDates(valueProp ?? []);
    setHoverDateRange(valueProp ?? null);
  }, [valueProp]);

  const [isPickerToggleActive, setPickerToggleActive] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<OverlayTriggerInstance>(null);

  const handleCloseDropdown = useCallback(() => {
    triggerRef.current?.close?.();
  }, []);

  usePublicMethods(ref, {
    triggerRef,
    overlayRef,
    targetRef,
    rootRef
  });

  const getDisplayString = useCallback(
    (nextValue: Date[] | null, isPlaintext?: boolean) => {
      const startDate: Date | null = nextValue?.[0] ?? null;
      const endDate: Date | null = nextValue?.[1] ?? null;

      if (startDate && endDate) {
        const displayValue: any = [startDate, endDate].sort(compareAsc);

        if (isPlaintext) {
          return (
            formatDate(displayValue[0], formatStr) +
            character +
            formatDate(displayValue[1], formatStr)
          );
        }

        return renderValue ? (
          renderValue(displayValue, formatStr)
        ) : (
          <>
            <FormattedDate date={displayValue[0]} formatStr={formatStr} />
            {character}
            <FormattedDate date={displayValue[1]} formatStr={formatStr} />
          </>
        );
      }

      return isPlaintext ? '' : placeholder || rangeFormatStr;
    },
    [character, formatDate, formatStr, placeholder, rangeFormatStr, renderValue, value]
  );

  /**
   * preset hover range
   */
  const getHoverRangeValue = useCallback(
    (date: Date): DateRange | null => {
      function getHoverRangeFunc(): ((date: Date) => DateRange) | undefined {
        if (hoverRange === 'week') {
          return partial(getWeekHoverRange, isoWeek);
        } else if (hoverRange === 'month') {
          return getMonthHoverRange;
        }
        return hoverRange;
      }

      const hoverRangeFunc = getHoverRangeFunc();

      if (isNil(hoverRangeFunc)) {
        return null;
      }

      const hoverValues: DateRange = hoverRangeFunc(date);
      const isHoverRangeValid = hoverValues instanceof Array && hoverValues.length === 2;
      if (!isHoverRangeValid) {
        return null;
      }
      if (DateUtils.isAfter(hoverValues[0], hoverValues[1])) {
        hoverValues.reverse();
      }
      return hoverValues;
    },
    [hoverRange, isoWeek]
  );

  const handleValueUpdate = useCallback(
    (event: React.SyntheticEvent, nextValue: DateRange | null, closeOverlay = true) => {
      // If nextValue is null, it means that the user is erasing the selected dates.
      setSelectedDates(nextValue ?? []);

      if (!isSameRange(nextValue, value, formatStr)) {
        setValue(nextValue);
        onChange?.(nextValue, event);
      }

      // `closeOverlay` default value is `true`
      if (closeOverlay !== false) {
        handleCloseDropdown();
      }
    },
    [formatStr, handleCloseDropdown, onChange, selectedDates, setValue, value]
  );

  /**
   * Select the date range. If oneTap is not set, you need to click twice to select the start time and end time.
   * The MouseMove event is called between the first click and the second click to update the selection state.
   */
  const handleMouseMove = useCallback(
    (date: Date) => {
      const nextHoverDateRange = getHoverRangeValue(date);

      // If hasDoneSelect is false,
      // it means there's already one selected date
      // and waiting for user to select the second date to complete the selection.
      if (!hasDoneSelect.current) {
        // If `hoverRange` is set, you need to change the value of hoverDateRange according to the rules
        if (!isNil(nextHoverDateRange)) {
          let nextSelectedDates: DateRange = [
            selectRangeValueRef.current![0],
            nextHoverDateRange[1]
          ];

          if (DateUtils.isBefore(nextHoverDateRange[0], selectRangeValueRef.current![0])) {
            nextSelectedDates = [nextHoverDateRange[0], selectRangeValueRef.current![1]];
          }
          setSelectedDates(nextSelectedDates);
        } else {
          setHoverDateRange(prevHoverValue =>
            isNil(prevHoverValue) ? null : [prevHoverValue[0], date]
          );
        }

        // Before the first click, if nextHoverDateRange has a value, hoverDateRange needs to be updated
      } else if (!isNil(nextHoverDateRange)) {
        setHoverDateRange(nextHoverDateRange);
      }
    },
    [getHoverRangeValue, hoverRange]
  );

  /**
   * Callback for selecting a date cell in the calendar grid
   */
  const handleSelectDate = useCallback(
    (date: Date, event: React.SyntheticEvent) => {
      let nextSelectDates: SelectedDatesState = hoverDateRange ?? [];
      const hoverRangeValue = getHoverRangeValue(date);
      const noHoverRangeValid = isNil(hoverRangeValue);

      // in `oneTap` mode
      if (hasDoneSelect.current && oneTap) {
        handleValueUpdate(
          event,
          noHoverRangeValid
            ? [setTimingMargin(date), setTimingMargin(date, 'right')]
            : hoverRangeValue
        );
        hasDoneSelect.current = false;
        return;
      }

      // no preset hover range can use
      if (noHoverRangeValid) {
        // start select
        if (hasDoneSelect.current) {
          nextSelectDates = [date];
        } else {
          // finish select
          nextSelectDates[1] = date;
        }
      } else {
        if (!hasDoneSelect.current) {
          nextSelectDates = selectedDates;
          selectRangeValueRef.current = null;
        } else {
          nextSelectDates = hoverRangeValue;
          selectRangeValueRef.current = hoverRangeValue;
        }
      }

      // If user have completed the selection, then sort
      if (
        nextSelectDates.length === 2 &&
        DateUtils.isAfter(nextSelectDates[0], nextSelectDates[1])
      ) {
        nextSelectDates.reverse();
      }

      setHoverDateRange(
        nextSelectDates.length === 2 ? nextSelectDates : [nextSelectDates[0]!, nextSelectDates[0]!]
      );
      setSelectedDates(nextSelectDates);
      updateCalendarDate(nextSelectDates);
      onSelect?.(date, event);
      hasDoneSelect.current = !hasDoneSelect.current;
    },
    [
      getHoverRangeValue,
      handleValueUpdate,
      hoverDateRange,
      onSelect,
      oneTap,
      selectedDates,
      updateCalendarDate
    ]
  );

  /**
   * If `selectValue` changed, there will be the following effects.
   * 1. Check if the selection is completed.
   * 2. if the selection is completed, set the temporary `hoverValue` empty.
   */
  useEffect(() => {
    const selectValueLength = selectedDates.length;
    const doneSelected = selectValueLength === 0 || selectValueLength === 2;

    doneSelected && setHoverDateRange(null);
  }, [selectedDates]);

  const handleChangeCalendarDate = useCallback(
    (index: number, date: Date) => {
      const nextCalendarDate = Array.from(calendarDate);
      nextCalendarDate[index] = date;
      updateCalendarDate(nextCalendarDate as DateRange);
    },
    [calendarDate, updateCalendarDate]
  );

  const handleChangeCalendarTime = useCallback(
    (index: number, date: Date) => {
      setSelectedDates(prev => {
        const next: SelectedDatesState = [...prev];
        const clonedDate = new Date(date.valueOf());

        // if next[index] is not empty, only update the time after aligning the year, month and day
        if (next[index]) {
          clonedDate.setFullYear(
            next[index].getFullYear(),
            next[index].getMonth(),
            next[index].getDate()
          );
        }

        next[index] = clonedDate;

        return next;
      });
      handleChangeCalendarDate(index, date);
    },
    [handleChangeCalendarDate]
  );

  /**
   * The callback triggered when PM/AM is switched.
   */
  const handleToggleMeridian = useCallback(
    (index: number) => {
      const next = Array.from(calendarDate) as DateRange;

      const clonedDate = new Date(next[index].valueOf());
      const hours = DateUtils.getHours(clonedDate);
      const nextHours = hours >= 12 ? hours - 12 : hours + 12;

      next[index] = DateUtils.setHours(clonedDate, nextHours);

      setCalendarDate(next);

      // If the value already exists, update the value again.
      if (selectedDates.length === 2) {
        setSelectedDates(next);
      }
    },
    [calendarDate, selectedDates]
  );

  /**
   * Toolbar operation callback function
   */
  const handleShortcutPageDate = useCallback(
    (value: DateRange, closeOverlay = false, event: React.SyntheticEvent) => {
      handleValueUpdate(event, value, closeOverlay);
    },
    [handleValueUpdate]
  );

  const handleOK = useCallback(
    (event: React.SyntheticEvent) => {
      handleValueUpdate(event, selectedDates as DateRange);
      onOk?.(selectedDates as DateRange, event);
    },
    [handleValueUpdate, onOk, selectedDates]
  );

  const handleClean = useCallback(
    (event: React.MouseEvent) => {
      updateCalendarDate(null);
      handleValueUpdate(event, null);
    },
    [handleValueUpdate, updateCalendarDate]
  );

  /**
   * Callback after the input box value is changed.
   */
  const handleInputChange = useCallback(
    (value: string) => {
      setInputState('Typing');

      const rangeValue = value.split(character);

      // isMatch('01/11/2020', 'MM/dd/yyyy') ==> true
      // isMatch('2020-11-01', 'MM/dd/yyyy') ==> false
      if (
        !DateUtils.isMatch(rangeValue[0], formatStr, { locale: locale.dateLocale }) ||
        !DateUtils.isMatch(rangeValue[1], formatStr, { locale: locale.dateLocale })
      ) {
        setInputState('Error');
        return;
      }

      const startDate = parseDate(rangeValue[0], formatStr);
      const endDate = parseDate(rangeValue[1], formatStr);
      const selectValue: DateRange = [startDate, endDate];

      if (!DateUtils.isValid(startDate) || !DateUtils.isValid(endDate)) {
        setInputState('Error');
        return;
      }

      if (isDateDisabled(startDate, selectValue, true, DATERANGE_DISABLED_TARGET.CALENDAR)) {
        setInputState('Error');
        return;
      }

      setHoverDateRange(selectValue);
      setSelectedDates(selectValue);
      updateCalendarDate(selectValue);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [character, rangeFormatStr, updateCalendarDate]
  );

  /**
   * The callback after the enter key is triggered on the input
   */
  const handleInputPressEnd = useCallback(
    event => {
      if (inputState === 'Typing') {
        handleValueUpdate(event, selectedDates.length === 2 ? selectedDates : null);
      }
      setInputState('Initial');
    },
    [handleValueUpdate, selectedDates, inputState]
  );

  const handleEnter = useCallback(() => {
    let nextCalendarDate;

    if (value && value.length) {
      const [startDate, endData] = value;
      nextCalendarDate = [
        startDate,
        isSameMonth(startDate, endData) ? addMonths(endData, 1) : endData
      ];
    } else {
      nextCalendarDate = getCalendarDate({
        value: defaultCalendarValue ?? null
      });
    }

    setSelectedDates(value ?? []);
    updateCalendarDate(nextCalendarDate);
  }, [defaultCalendarValue, updateCalendarDate, setSelectedDates, value]);

  const handleEntered = useCallback(() => {
    onOpen?.();
    setPickerToggleActive(true);
  }, [onOpen]);

  const handleExited = useCallback(() => {
    setPickerToggleActive(false);
    hasDoneSelect.current = true;

    onClose?.();
  }, [onClose]);

  const isDateDisabled = useCallback(
    (
      date: Date,
      selectDate: SelectedDatesState,
      selectedDone: boolean,
      target: DATERANGE_DISABLED_TARGET
    ): boolean => {
      return disabledDateProp?.(date, selectDate, selectedDone, target) ?? false;
    },
    [disabledDateProp]
  );

  const disabledByBetween = useCallback(
    (start: Date, end: Date, type: DATERANGE_DISABLED_TARGET) => {
      // If the date is between the start and the end
      // the button is disabled
      while (DateUtils.isBefore(start, end) || DateUtils.isSameDay(start, end)) {
        if (isDateDisabled(start, selectedDates, hasDoneSelect.current, type)) {
          return true;
        }
        start = DateUtils.addDays(start, 1);
      }

      return false;
    },
    [isDateDisabled, selectedDates]
  );

  const disabledOkButton = useCallback(() => {
    const [start, end] = selectedDates;
    if (!start || !end || !hasDoneSelect.current) {
      return true;
    }

    return disabledByBetween(start, end, DATERANGE_DISABLED_TARGET.TOOLBAR_BUTTON_OK);
  }, [disabledByBetween, selectedDates]);

  const disabledShortcutButton = useCallback(
    (value: SelectedDatesState = []) => {
      const [start, end] = value;

      if (!start || !end) {
        return true;
      }

      return disabledByBetween(start, end, DATERANGE_DISABLED_TARGET.TOOLBAR_SHORTCUT);
    },
    [disabledByBetween]
  );

  const handleDisabledDate = useCallback(
    (date: Date, values: SelectedDatesState, type: DATERANGE_DISABLED_TARGET) => {
      return isDateDisabled(date, values, hasDoneSelect.current, type);
    },
    [isDateDisabled]
  );

  const onPickerKeyDown = useToggleKeyDownEvent({
    triggerRef,
    targetRef,
    active: isPickerToggleActive,
    onExit: handleClean,
    ...rest
  });

  const renderDropdownMenu = (positionProps: PositionChildProps, speakerRef) => {
    const { left, top, className } = positionProps;
    const classes = merge(className, menuClassName, prefix('daterange-menu'));
    const panelClasses = prefix('daterange-panel', {
      'daterange-panel-show-one-calendar': showOneCalendar
    });
    const styles = { ...menuStyle, left, top };

    const panelProps = {
      calendarDate,
      disabledDate: handleDisabledDate,
      format: formatStr,
      hoverRangeValue: hoverDateRange ?? undefined,
      isoWeek,
      limitEndYear,
      locale,
      showOneCalendar,
      showWeekNumbers,
      value: selectedDates,
      showMeridian,
      onChangeCalendarDate: handleChangeCalendarDate,
      onChangeCalendarTime: handleChangeCalendarTime,
      onMouseMove: handleMouseMove,
      onSelect: handleSelectDate,
      onToggleMeridian: handleToggleMeridian
    };

    return (
      <PickerOverlay
        className={classes}
        ref={mergeRefs(overlayRef, speakerRef)}
        target={triggerRef}
        style={styles}
      >
        <div className={panelClasses}>
          <div className={prefix('daterange-content')}>
            <div className={prefix('daterange-header')}>{getDisplayString(selectedDates)}</div>
            <div className={prefix(`daterange-calendar-${showOneCalendar ? 'single' : 'group'}`)}>
              <Calendar index={0} {...panelProps} />
              {!showOneCalendar && <Calendar index={1} {...panelProps} />}
            </div>
          </div>
          <Toolbar<SelectedDatesState, DateRange>
            locale={locale}
            calendarDate={selectedDates}
            disabledOkBtn={disabledOkButton}
            disabledShortcut={disabledShortcutButton}
            hideOkBtn={oneTap}
            onOk={handleOK}
            onClickShortcut={handleShortcutPageDate}
            ranges={ranges}
          />
        </div>
      </PickerOverlay>
    );
  };

  const hasValue = !isNil(value) && value.length > 1;
  const [classes, usedClassNamePropKeys] = usePickerClassName({
    ...props,
    classPrefix,
    name: 'daterange',
    appearance,
    hasValue,
    cleanable
  });

  return (
    <PickerToggleTrigger
      pickerProps={pick(props, pickTriggerPropKeys)}
      ref={triggerRef}
      placement={placement}
      onEnter={createChainedFunction(handleEnter, onEnter)}
      onEntered={createChainedFunction(handleEntered, onEntered)}
      onExited={createChainedFunction(handleExited, onExited)}
      speaker={renderDropdownMenu}
    >
      <Component
        ref={rootRef}
        className={merge(className, classes, {
          [prefix('error')]: inputState === 'Error'
        })}
        style={style}
      >
        <PickerToggle
          {...omit(rest, [
            ...omitTriggerPropKeys,
            ...usedClassNamePropKeys,
            ...DateUtils.calendarOnlyProps
          ])}
          as={toggleAs}
          ref={targetRef}
          appearance={appearance}
          input
          inputMask={DateUtils.getDateMask(rangeFormatStr)}
          inputValue={value ? (getDisplayString(value, true) as string) : ''}
          inputPlaceholder={
            typeof placeholder === 'string' && placeholder ? placeholder : rangeFormatStr
          }
          onInputChange={handleInputChange}
          onInputBlur={handleInputPressEnd}
          onInputPressEnter={handleInputPressEnd}
          onKeyDown={onPickerKeyDown}
          onClean={createChainedFunction(handleClean, onClean)}
          cleanable={cleanable && !disabled}
          hasValue={hasValue}
          active={isPickerToggleActive}
          placement={placement}
          caretAs={IconCalendar}
          disabled={disabled}
        >
          {getDisplayString(value)}
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
DateRangePicker.propTypes = {
  ...pickerPropTypes,
  ranges: PropTypes.array,
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  defaultValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  defaultCalendarValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  hoverRange: PropTypes.oneOfType([PropTypes.oneOf(['week', 'month']), PropTypes.func]),
  format: PropTypes.string,
  isoWeek: PropTypes.bool,
  oneTap: PropTypes.bool,
  limitEndYear: PropTypes.number,
  onChange: PropTypes.func,
  onOk: PropTypes.func,
  disabledDate: PropTypes.func,
  onSelect: PropTypes.func,
  showWeekNumbers: PropTypes.bool,
  showMeridian: PropTypes.bool,
  showOneCalendar: PropTypes.bool
};

export default DateRangePicker;
