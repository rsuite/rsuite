import React, { useEffect, useRef, useState, useMemo } from 'react';
import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import partial from 'lodash/partial';
import pick from 'lodash/pick';
import PropTypes from 'prop-types';
import IconCalendar from '@rsuite/icons/legacy/Calendar';
import IconClockO from '@rsuite/icons/legacy/ClockO';
import { FormControlBaseProps, PickerBaseProps } from '../@types/common';
import Toolbar from '../DatePicker/Toolbar';
import PredefinedRanges from '../DatePicker/PredefinedRanges';
import Stack from '../Stack';
import { DateRangePickerLocale } from '../locales';
import {
  omitTriggerPropKeys,
  PickerComponent,
  PickerPopup,
  pickerPropTypes,
  PickerToggleTrigger,
  PickerIndicator,
  PickerLabel,
  pickTriggerPropKeys,
  PositionChildProps,
  usePickerClassName,
  usePickerRef,
  onMenuKeyDown
} from '../internals/Picker';
import {
  createChainedFunction,
  DATERANGE_DISABLED_TARGET as TARGET,
  mergeRefs,
  useClassNames,
  useControlled,
  useCustom,
  useUniqueId,
  useEventCallback,
  partitionHTMLProps,
  getStringLength
} from '../utils';
import {
  addMonths,
  isValid,
  isBefore,
  isSameDay,
  addDays,
  startOfDay,
  endOfDay,
  shouldRenderTime,
  isAfter,
  copyTime,
  isSameMonth,
  shouldRenderMonth,
  shouldRenderDate,
  reverseDateRangeOmitTime,
  getReversedTimeMeridian,
  calendarOnlyProps,
  shouldOnlyRenderTime
} from '../utils/dateUtils';
import Calendar from './Calendar';
import { DisabledDateFunction, RangeType, DateRange } from './types';
import { getSafeCalendarDate, getMonthHoverRange, getWeekHoverRange, isSameRange } from './utils';
import { deprecatePropTypeNew, oneOf } from '../internals/propTypes';
import DateRangePickerContext from './DateRangePickerContext';
import DateRangeInput from '../DateRangeInput';
import InputGroup from '../InputGroup';
import Header from './Header';

type SelectedDatesState = [] | [Date] | [Date, Date];

export interface DateRangePickerProps
  extends PickerBaseProps<DateRangePickerLocale>,
    FormControlBaseProps<DateRange | null> {
  /** Custom caret component */
  caretAs?: React.ElementType | null;
  /** Predefined date ranges */
  ranges?: RangeType[];

  /**
   * Format of the date displayed in the input box
   *
   * @default 'yyyy-MM-dd'
   */
  format?: string;

  /**
   * Rendered as an input, the date can be entered via the keyboard.
   *
   * @default true
   */
  editable?: boolean;

  /** The date range that will be selected when you click on the date */
  hoverRange?: 'week' | 'month' | ((date: Date) => DateRange);

  /** Whether to click once on selected date range，Can be used with hoverRange */
  oneTap?: boolean;

  /**
   * ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day
   *
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   */
  isoWeek?: boolean;

  /** A label displayed at the beginning of toggle button */
  label?: React.ReactNode;

  /**
   * Set the upper limit of the available year relative to the current selection date.
   *
   * @default 1000
   */
  limitEndYear?: number;

  /** Set the lower limit of the available year relative to the current selection date */
  limitStartYear?: number;

  /** Whether to display a loading state indicator */
  loading?: boolean;

  /** Whether to show week numbers */
  showWeekNumbers?: boolean;

  /** Show only one calendar select */
  showOneCalendar?: boolean;

  /** Meridian format */
  showMeridian?: boolean;

  /**
   * Whether to display the formatted date range at the header of the calendar
   * @default true
   * @version 5.52.0
   */
  showHeader?: boolean;

  /** Set default date for calendar */
  defaultCalendarValue?: DateRange;

  /** The character that separates two dates */
  character?: string;

  /**
   * Disabled date
   *
   * @deprecated Use {@link shouldDisableDate} instead
   */
  disabledDate?: DisabledDateFunction;

  /**
   * Whether a date cell is disabled
   */
  shouldDisableDate?: DisabledDateFunction;

  /** Called when the option is selected */
  onSelect?: (date: Date, event?: React.SyntheticEvent) => void;

  /** Called after clicking the OK button */
  onOk?: (date: DateRange, event: React.SyntheticEvent) => void;

  /** Called after clicking the shortcut button */
  onShortcutClick?: (range: RangeType, event: React.MouseEvent) => void;

  /** Called when clean */
  onClean?: (event: React.MouseEvent) => void;

  /**
   * Custom render value
   * @deprecated
   */
  renderValue?: (value: DateRange, format: string) => React.ReactNode;

  /** Custom render for calendar title */
  renderTitle?: (date: Date) => React.ReactNode;
}

export interface DateRangePickerComponent extends PickerComponent<DateRangePickerProps> {
  /** Allow the maximum number of days specified, other dates are disabled */
  allowedMaxDays: (days: number) => DisabledDateFunction;

  /** Only allowed days are specified, other dates are disabled */
  allowedDays: (days: number) => DisabledDateFunction;

  /** Allow specified date range, other dates are disabled */
  allowedRange: (startDate: string | Date, endDate: string | Date) => DisabledDateFunction;

  /** Disable dates after the specified date */
  before: (beforeDate: string | Date) => DisabledDateFunction;

  /** Disable dates before the specified date */
  after: (afterDate: string | Date) => DisabledDateFunction;

  /** Disable dates after today. */
  beforeToday: () => DisabledDateFunction;

  /** Disable dates before today */
  afterToday: () => DisabledDateFunction;

  /** Used to combine multiple conditions */
  combine: (...args: any) => DisabledDateFunction;
}

/**
 * A date range picker allows you to select a date range from a calendar.
 *
 * @see https://rsuitejs.com/components/date-range-picker
 */
const DateRangePicker = React.forwardRef((props: DateRangePickerProps, ref) => {
  const {
    as: Component = 'div',
    classPrefix = 'picker',
    className,
    appearance = 'default',
    editable = true,
    cleanable = true,
    character = ' ~ ',
    defaultCalendarValue,
    defaultValue,
    plaintext,
    disabled,
    disabledDate: DEPRECATED_disabledDateProp,
    shouldDisableDate,
    format: formatStr = 'yyyy-MM-dd',
    hoverRange,
    id: idProp,
    isoWeek = false,
    limitEndYear = 1000,
    limitStartYear,
    locale: overrideLocale,
    loading,
    label,
    menuClassName,
    menuStyle,
    oneTap,
    placeholder = '',
    placement = 'bottomStart',
    ranges,
    readOnly,
    showOneCalendar = false,
    showWeekNumbers,
    showMeridian,
    showHeader = true,
    style,
    size,
    caretAs: caretAsProp,
    value: valueProp,
    onChange,
    onClean,
    onEnter,
    onEntered,
    onExited,
    onOk,
    onSelect,
    onShortcutClick,
    renderTitle,
    ...restProps
  } = props;

  const id = useUniqueId('rs-', idProp);
  const { trigger, root, target, overlay } = usePickerRef(ref);
  const { merge, prefix } = useClassNames(classPrefix);
  const { locale, formatDate } = useCustom<DateRangePickerLocale>(
    'DateRangePicker',
    overrideLocale
  );
  const rangeFormatStr = `${formatStr}${character}${formatStr}`;

  const [value, setValue] = useControlled(valueProp, defaultValue ?? null);

  // Show only the calendar month panel. formatStr = 'yyyy-MM'
  const onlyShowMonth = shouldRenderMonth(formatStr) && !shouldRenderDate(formatStr);

  /**
   * Whether to complete the selection.
   * Everytime selection will change this value. If the value is false, it means that the selection has not been completed.
   *
   * In `oneTap` mode, select action will not change this value, its value should be true always.
   */
  const [isSelectedIdle, setSelectedIdle] = useState(true);

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
    getSafeCalendarDate({ value: value ?? defaultCalendarValue ?? null })
  );

  /**
   * When hoverRange is set, `selectValue` will be updated during the hover process,
   * which will cause the `selectValue` to be updated after the first click,
   * so declare a Ref to temporarily store the `selectValue` of the first click.
   */
  const selectRangeValueRef = useRef<DateRange | null>(null);

  const [activeCalendarKey, setActiveCalendarKey] = useState<'start' | 'end'>();

  /**
   * Get the time on the calendar.
   */
  const getCalendarDatetime = (calendarKey: 'start' | 'end') => {
    const index = calendarKey === 'start' ? 0 : 1;

    return calendarDate?.[index] || defaultCalendarValue?.[index];
  };

  /**
   * Call this function to update the calendar panel rendering benchmark value.
   * If params `value` is not passed, it defaults to [new Date(), addMonth(new Date(), 1)].
   */
  const setCalendarDateRange = ({
    dateRange,
    calendarKey,
    eventName
  }: {
    dateRange: SelectedDatesState | null;
    calendarKey?: 'start' | 'end';
    eventName?: 'changeTime' | 'changeDate' | 'changeMonth' | 'shortcutSelection';
  }) => {
    let nextValue = dateRange;

    // The time should remain the same when the dates in the date range are changed.
    if (
      shouldRenderTime(formatStr) &&
      dateRange?.length &&
      eventName !== 'changeTime' &&
      eventName !== 'shortcutSelection'
    ) {
      const startDate = copyTime({ from: getCalendarDatetime('start'), to: dateRange[0] });
      const endDate = copyTime({
        from: getCalendarDatetime('end'),
        to: dateRange.length === 1 ? addMonths(startDate, 1) : dateRange[1]
      });

      nextValue = [startDate, endDate];
    } else if (dateRange === null && typeof defaultCalendarValue !== 'undefined') {
      // Make the calendar render the value of defaultCalendarValue after clearing the value.
      nextValue = defaultCalendarValue;
    }

    const nextCalendarDate = getSafeCalendarDate({
      value: nextValue,
      calendarKey,
      allowAameMonth: onlyShowMonth
    });

    setCalendarDate(nextCalendarDate);

    if (onlyShowMonth && eventName === 'changeMonth') {
      setSelectedDates(nextCalendarDate);
    }
  };

  // if valueProp changed then update selectValue/hoverValue
  useEffect(() => {
    setSelectedDates(valueProp ?? []);
    setHoverDateRange(valueProp ?? null);
  }, [valueProp]);

  const getInputHtmlSize = () => {
    const padding = 4;
    let strings = rangeFormatStr;
    if (value) {
      const [startDate, endDate] = value;

      strings = `${formatDate(startDate, formatStr)}${character}${formatDate(endDate, formatStr)}`;
    }

    return getStringLength(strings) + padding;
  };

  /**
   * preset hover range
   */
  const getHoverRangeValue = (date: Date): DateRange | null => {
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

    let hoverValues: DateRange = hoverRangeFunc(date);
    const isHoverRangeValid = hoverValues instanceof Array && hoverValues.length === 2;
    if (!isHoverRangeValid) {
      return null;
    }
    if (isAfter(hoverValues[0], hoverValues[1])) {
      hoverValues = reverseDateRangeOmitTime(hoverValues);
    }
    return hoverValues;
  };

  const setDateRange = (
    event: React.SyntheticEvent,
    nextValue: DateRange | null,
    closeOverlay = true
  ) => {
    // If nextValue is null, it means that the user is erasing the selected dates.
    setSelectedDates(nextValue ?? []);
    setValue(nextValue);

    if (!isSameRange(nextValue, value, formatStr)) {
      onChange?.(nextValue, event);
    }

    // `closeOverlay` default value is `true`
    if (closeOverlay !== false) {
      handleClose();
    }
  };

  /**
   * Select the date range. If oneTap is not set, you need to click twice to select the start time and end time.
   * The MouseMove event is called between the first click and the second click to update the selection state.
   */
  const onMouseMove = useEventCallback((date: Date) => {
    const nextHoverDateRange = getHoverRangeValue(date);

    // If hasDoneSelect is false,
    // it means there's already one selected date
    // and waiting for user to select the second date to complete the selection.
    if (!isSelectedIdle) {
      // If `hoverRange` is set, you need to change the value of hoverDateRange according to the rules
      if (!isNil(nextHoverDateRange) && !isNil(selectRangeValueRef.current)) {
        let nextSelectedDates: DateRange = [selectRangeValueRef.current[0], nextHoverDateRange[1]];

        if (isBefore(nextHoverDateRange[0], selectRangeValueRef.current[0])) {
          nextSelectedDates = [nextHoverDateRange[0], selectRangeValueRef.current[1]];
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
  });

  /**
   * Callback for selecting a date cell in the calendar grid
   */
  const handleSelectDate = useEventCallback(
    (index: number, date: Date, event: React.SyntheticEvent) => {
      const calendarKey = index === 0 ? 'start' : 'end';

      let nextSelectDates: SelectedDatesState = hoverDateRange ?? [];
      const hoverRangeValue = getHoverRangeValue(date);
      const noHoverRangeValid = isNil(hoverRangeValue);

      // in `oneTap` mode
      if (oneTap) {
        setDateRange(
          event,
          noHoverRangeValid ? [startOfDay(date), endOfDay(date)] : hoverRangeValue
        );
        onSelect?.(date, event);
        return;
      }

      // no preset hover range can use
      if (noHoverRangeValid) {
        // start select
        if (isSelectedIdle) {
          nextSelectDates = [date];
        } else {
          // finish select
          nextSelectDates[1] = date;
        }
      } else {
        if (!isSelectedIdle) {
          nextSelectDates = selectedDates;
          selectRangeValueRef.current = null;
        } else {
          nextSelectDates = hoverRangeValue;
          selectRangeValueRef.current = hoverRangeValue;
        }
      }

      if (nextSelectDates.length === 2) {
        // If user have completed the selection, then sort the selected dates.
        if (isAfter(nextSelectDates[0], nextSelectDates[1])) {
          nextSelectDates = reverseDateRangeOmitTime(nextSelectDates);
        }

        if (shouldRenderTime(formatStr)) {
          nextSelectDates = [
            copyTime({ from: getCalendarDatetime('start'), to: nextSelectDates[0] }),
            copyTime({ from: getCalendarDatetime('end'), to: nextSelectDates[1] })
          ];
        }

        setHoverDateRange(nextSelectDates);
      } else {
        setHoverDateRange([nextSelectDates[0] as Date, nextSelectDates[0] as Date]);
      }

      setSelectedDates(nextSelectDates);
      setCalendarDateRange({ dateRange: nextSelectDates, calendarKey, eventName: 'changeDate' });
      onSelect?.(date, event);
      setSelectedIdle(!isSelectedIdle);
    }
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

  const onChangeCalendarMonth = useEventCallback((index: number, date: Date) => {
    const calendarKey = index === 0 ? 'start' : 'end';
    const nextCalendarDate = Array.from(calendarDate) as DateRange;
    nextCalendarDate[index] = date;

    setCalendarDateRange({
      dateRange: nextCalendarDate,
      calendarKey,
      eventName: 'changeMonth'
    });
  });

  const onChangeCalendarTime = useEventCallback((index: number, date: Date) => {
    const calendarKey = index === 0 ? 'start' : 'end';
    const nextCalendarDate = Array.from(calendarDate);
    nextCalendarDate[index] = date;

    setCalendarDateRange({
      dateRange: nextCalendarDate as DateRange,
      calendarKey,
      eventName: 'changeTime'
    });

    setSelectedDates(prev => {
      const next: SelectedDatesState = [...prev];

      // if next[index] is not empty, only update the time after aligning the year, month and day
      next[index] = next[index]
        ? copyTime({ from: date, to: next[index] })
        : new Date(date.valueOf());

      return next;
    });
  });

  /**
   * The callback triggered when PM/AM is switched.
   */
  const onToggleMeridian = useEventCallback((index: number) => {
    const nextCalendarDate = Array.from(calendarDate) as DateRange;
    nextCalendarDate[index] = getReversedTimeMeridian(nextCalendarDate[index]);

    setCalendarDate(nextCalendarDate);

    // If the value already exists, update the value again.
    if (selectedDates.length === 2) {
      const nextSelectedDates = Array.from(selectedDates) as SelectedDatesState;
      nextSelectedDates[index] = getReversedTimeMeridian(nextSelectedDates[index]);

      setSelectedDates(nextSelectedDates);
    }
  });

  const handleEnter = useEventCallback(() => {
    let nextCalendarDate;

    if (value && value.length) {
      const [startDate, endData] = value;
      nextCalendarDate = [
        startDate,
        isSameMonth(startDate, endData) ? addMonths(endData, 1) : endData
      ];
    } else {
      // Reset the date on the calendar to the default date
      nextCalendarDate = getSafeCalendarDate({ value: defaultCalendarValue ?? null });
    }

    setSelectedDates(value ?? []);
    setCalendarDateRange({ dateRange: nextCalendarDate });
  });

  /**
   * Toolbar operation callback function
   */
  const handleShortcutPageDate = useEventCallback(
    (range: RangeType, closeOverlay = false, event: React.MouseEvent) => {
      const value = range.value as DateRange;

      setCalendarDateRange({ dateRange: value, eventName: 'shortcutSelection' });

      if (closeOverlay) {
        setDateRange(event, value, closeOverlay);
      } else {
        setSelectedDates(value ?? []);
      }

      onShortcutClick?.(range, event);

      // End unfinished selections.
      setSelectedIdle(true);
    }
  );

  const handleOK = useEventCallback((event: React.SyntheticEvent) => {
    setDateRange(event, selectedDates as DateRange);
    onOk?.(selectedDates as DateRange, event);
  });

  const handleClean = useEventCallback((event: React.MouseEvent) => {
    setCalendarDateRange({ dateRange: null });
    setDateRange(event, null);
    onClean?.(event);
    event.stopPropagation();
  });

  /**
   * Callback after the input box value is changed.
   */
  const handleInputChange = useEventCallback((value: [Date, Date] | null, event) => {
    if (!value) {
      return;
    }

    const [startDate, endDate] = value;
    const selectValue: DateRange = [startDate, endDate];

    setHoverDateRange(selectValue);
    setSelectedDates(selectValue);
    setCalendarDateRange({ dateRange: selectValue });
    setDateRange(event, selectValue);
  });

  const isDateDisabled = (
    date: Date,
    options: {
      selectDate?: SelectedDatesState;
      selectedDone?: boolean;
      target?: TARGET;
    }
  ): boolean => {
    const { selectDate, selectedDone, target } = options;
    if (typeof shouldDisableDate === 'function') {
      return shouldDisableDate(date, selectDate, selectedDone, target);
    }
    if (typeof DEPRECATED_disabledDateProp === 'function') {
      return DEPRECATED_disabledDateProp(date, selectDate, selectedDone, target);
    }
    return false;
  };

  const disableByBetween = (start: Date, end: Date, type: TARGET) => {
    // If the date is between the start and the end
    // the button is disabled
    while (isBefore(start, end) || isSameDay(start, end)) {
      if (
        isDateDisabled(start, {
          selectDate: selectedDates,
          selectedDone: isSelectedIdle,
          target: type
        })
      ) {
        return true;
      }
      start = addDays(start, 1);
    }

    return false;
  };

  const disableOkButton = () => {
    const [start, end] = selectedDates;
    if (!start || !end || !isSelectedIdle) {
      return true;
    }

    return disableByBetween(start, end, TARGET.TOOLBAR_BUTTON_OK);
  };

  const disableShortcut = (value: SelectedDatesState = []) => {
    const [start, end] = value;

    if (!start || !end) {
      return true;
    }

    return disableByBetween(start, end, TARGET.TOOLBAR_SHORTCUT);
  };

  const handleClose = useEventCallback(() => {
    trigger.current?.close?.();
  });

  const handleInputKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    onMenuKeyDown(event, {
      esc: handleClose,
      enter: () => {
        const { open } = trigger.current?.getState() || {};
        if (!open) {
          trigger.current?.open();
        }
      }
    });
  });

  const renderCalendarOverlay = (positionProps: PositionChildProps, speakerRef) => {
    const { left, top, className } = positionProps;
    const classes = merge(className, menuClassName, prefix('popup-daterange'));
    const panelClasses = prefix('daterange-panel', {
      'daterange-panel-show-one-calendar': showOneCalendar
    });

    /**
     * Set a min-width (528px) when there are two calendars
     * @see https://github.com/rsuite/rsuite/issues/3522
     */
    const panelStyles: React.CSSProperties = { minWidth: showOneCalendar ? 'auto' : 528 };
    const styles = { ...menuStyle, left, top };
    const disabledDate = (date: Date, values: SelectedDatesState, type: TARGET) =>
      isDateDisabled(date, { selectDate: values, selectedDone: isSelectedIdle, target: type });

    const calendarProps = {
      locale,
      isoWeek,
      limitEndYear,
      showMeridian,
      calendarDate,
      limitStartYear,
      showWeekNumbers,
      format: formatStr,
      value: selectedDates,
      hoverRangeValue: hoverDateRange ?? undefined,
      onSelect: handleSelectDate,
      onChangeCalendarMonth,
      onChangeCalendarTime,
      onToggleMeridian,
      onMouseMove,
      disabledDate,
      renderTitle
    };

    const getCalendars = () => {
      if (showOneCalendar) {
        return <Calendar index={activeCalendarKey === 'end' ? 1 : 0} {...calendarProps} />;
      }

      return (
        <>
          <Calendar index={0} {...calendarProps} />
          <Calendar index={1} {...calendarProps} />
        </>
      );
    };

    const sideRanges = ranges?.filter(range => range?.placement === 'left') || [];
    const bottomRanges = ranges?.filter(
      range => range?.placement === 'bottom' || range?.placement === undefined
    );

    return (
      <PickerPopup
        role="dialog"
        aria-labelledby={label ? `${id}-label` : undefined}
        tabIndex={-1}
        className={classes}
        ref={mergeRefs(overlay, speakerRef)}
        target={trigger}
        style={styles}
      >
        <div className={panelClasses} style={panelStyles}>
          <Stack alignItems="flex-start">
            {sideRanges.length > 0 && (
              <PredefinedRanges
                direction="column"
                spacing={0}
                className={prefix('daterange-predefined')}
                ranges={sideRanges}
                calendarDate={calendarDate}
                locale={locale}
                disableShortcut={disableShortcut}
                onShortcutClick={handleShortcutPageDate}
                data-testid="daterange-predefined-side"
              />
            )}

            <Stack.Item>
              <div className={prefix('daterange-content')}>
                {showHeader && (
                  <Header
                    value={isSelectedIdle ? selectedDates : hoverDateRange}
                    formatStr={formatStr}
                    character={character}
                    clickable={showOneCalendar}
                    activeKey={activeCalendarKey}
                    onSelect={setActiveCalendarKey}
                  />
                )}

                <div
                  className={prefix(`daterange-calendar-${showOneCalendar ? 'single' : 'group'}`)}
                >
                  <DateRangePickerContext.Provider value={{ isSelectedIdle }}>
                    {getCalendars()}
                  </DateRangePickerContext.Provider>
                </div>
              </div>
              <Toolbar<SelectedDatesState, DateRange>
                locale={locale}
                calendarDate={selectedDates}
                disableOkBtn={disableOkButton}
                disableShortcut={disableShortcut}
                hideOkBtn={oneTap}
                onOk={handleOK}
                onShortcutClick={handleShortcutPageDate}
                ranges={bottomRanges}
              />
            </Stack.Item>
          </Stack>
        </div>
      </PickerPopup>
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

  const caretAs: React.ElementType | null = useMemo(() => {
    if (caretAsProp === null) {
      return null;
    }
    return caretAsProp || (shouldOnlyRenderTime(formatStr) ? IconClockO : IconCalendar);
  }, [caretAsProp, formatStr]) as React.ElementType | null;

  const isErrorValue = (value?: [Date, Date] | [] | null) => {
    if (!value) {
      return false;
    }

    // If the value is an empty array, it is not an error value.
    if (Array.isArray(value) && value.length === 0) {
      return false;
    }

    const [startDate, endDate] = value;

    if (!isValid(startDate) || !isValid(endDate)) {
      return true;
    }

    if (isBefore(endDate, startDate)) {
      return true;
    }

    const disabledOptions = {
      selectDate: value,
      selectedDone: isSelectedIdle,
      target: TARGET.INPUT
    };

    if (isDateDisabled(startDate, disabledOptions) || isDateDisabled(endDate, disabledOptions)) {
      return true;
    }

    return false;
  };

  const [ariaProps, rest] = partitionHTMLProps(restProps, { htmlProps: [], includeAria: true });
  const showCleanButton = cleanable && hasValue && !readOnly;
  const invalidValue = value && isErrorValue(value);

  return (
    <PickerToggleTrigger
      trigger="active"
      ref={trigger}
      pickerProps={pick(props, pickTriggerPropKeys)}
      placement={placement}
      onEnter={createChainedFunction(handleEnter, onEnter)}
      onEntered={onEntered}
      onExited={onExited}
      speaker={renderCalendarOverlay}
    >
      <Component
        ref={root}
        className={merge(className, classes, { [prefix('error')]: invalidValue })}
        style={style}
      >
        {plaintext ? (
          <DateRangeInput value={value} format={formatStr} plaintext={plaintext} />
        ) : (
          <InputGroup
            {...omit(rest, [
              ...omitTriggerPropKeys,
              ...usedClassNamePropKeys,
              ...calendarOnlyProps
            ])}
            inside
            size={size}
          >
            <PickerLabel className={prefix`label`} id={`${id}-label`}>
              {label}
            </PickerLabel>
            <DateRangeInput
              aria-haspopup="dialog"
              aria-invalid={invalidValue}
              aria-labelledby={label ? `${id}-label` : undefined}
              {...(ariaProps as any)}
              ref={target}
              id={id}
              value={value}
              character={character}
              format={formatStr}
              placeholder={placeholder ? placeholder : rangeFormatStr}
              disabled={disabled}
              onChange={handleInputChange}
              readOnly={readOnly || !editable || loading}
              plaintext={plaintext}
              onKeyDown={handleInputKeyDown}
              htmlSize={getInputHtmlSize()}
            />
            <PickerIndicator
              loading={loading}
              caretAs={caretAs}
              onClose={handleClean}
              showCleanButton={showCleanButton}
            />
          </InputGroup>
        )}
      </Component>
    </PickerToggleTrigger>
  );
}) as unknown as DateRangePickerComponent;

DateRangePicker.displayName = 'DateRangePicker';
DateRangePicker.propTypes = {
  ...pickerPropTypes,
  ranges: PropTypes.array,
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  defaultValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  defaultCalendarValue: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  hoverRange: PropTypes.oneOfType([oneOf(['week', 'month']), PropTypes.func]),
  format: PropTypes.string,
  isoWeek: PropTypes.bool,
  oneTap: PropTypes.bool,
  limitEndYear: PropTypes.number,
  limitStartYear: PropTypes.number,
  onChange: PropTypes.func,
  onOk: PropTypes.func,
  disabledDate: deprecatePropTypeNew(PropTypes.func, 'Use "shouldDisableDate" property instead.'),
  shouldDisableDate: PropTypes.func,
  onSelect: PropTypes.func,
  showWeekNumbers: PropTypes.bool,
  showMeridian: PropTypes.bool,
  showOneCalendar: PropTypes.bool
};

export default DateRangePicker;
