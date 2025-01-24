import React, { useEffect, useRef, useState, useMemo } from 'react';
import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import CalendarIcon from '@rsuite/icons/Calendar';
import TimeIcon from '@rsuite/icons/Time';
import Toolbar from '../DatePicker/Toolbar';
import PredefinedRanges from '../DatePicker/PredefinedRanges';
import Stack from '../Stack';
import DateRangeInput from '../DateRangeInput';
import InputGroup from '../InputGroup';
import Header from './Header';
import useDateDisabled from './hooks/useDateDisabled';
import useCustomizedInput from '../DatePicker/hooks/useCustomizedInput';
import Calendar from './Calendar';
import * as StaticMethods from './disabledDateUtils';
import { DateRangePickerProvider } from './DateRangePickerProvider';
import { getSafeCalendarDate, getMonthHoverRange, getWeekHoverRange, isSameRange } from './utils';
import { DATERANGE_DISABLED_TARGET as TARGET } from '@/internals/constants';
import { useClassNames, useControlled, useUniqueId, useEventCallback } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import {
  omitTriggerPropKeys,
  PickerPopup,
  PickerToggleTrigger,
  PickerIndicator,
  PickerLabel,
  pickTriggerPropKeys,
  PositionChildProps,
  usePickerClassName,
  usePickerRef,
  onMenuKeyDown
} from '@/internals/Picker';
import {
  forwardRef,
  createChainedFunction,
  mergeRefs,
  partitionHTMLProps,
  getStringLength
} from '@/internals/utils';
import {
  addMonths,
  addDays,
  copyTime,
  calendarOnlyProps,
  endOfDay,
  isValid,
  isBefore,
  isSameDay,
  isAfter,
  isSameMonth,
  reverseDateRangeOmitTime,
  startOfDay,
  DateMode,
  useDateMode
} from '@/internals/utils/date';
import type { DateOptionPreset } from '@/internals/types';
import type { DisabledDateFunction, DateRange, SelectedDatesState } from './types';
import type { FormControlBaseProps, PickerBaseProps } from '@/internals/types';
import type { DateRangePickerLocale } from '../locales';
import type { MonthDropdownProps } from '../Calendar/types';

export interface DateRangePickerProps
  extends PickerBaseProps<DateRangePickerLocale>,
    FormControlBaseProps<DateRange | null> {
  /**
   * Custom caret component
   */
  caretAs?: React.ElementType | null;

  /**
   * Predefined date ranges
   */
  ranges?: DateOptionPreset<DateRange>[];

  /**
   * Format of the date displayed in the input box
   */
  format?: string;

  /**
   * Rendered as an input, the date can be entered via the keyboard.
   * @default true
   */
  editable?: boolean;

  /**
   * The date range that will be selected when you click on the date
   */
  hoverRange?: 'week' | 'month' | ((date: Date) => DateRange);

  /**
   * Whether to click once on selected date range，Can be used with hoverRange
   */
  oneTap?: boolean;

  /**
   * ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   */
  isoWeek?: boolean;

  /**
   * The index of the first day of the week (0 - Sunday)
   * If `isoWeek` is `true`, the value of `weekStart` is ignored.
   *
   * @default 0
   */
  weekStart?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * A label displayed at the beginning of toggle button
   */
  label?: React.ReactNode;

  /**
   * Set the upper limit of the available year relative to the current selection date.
   *
   * @default 1000
   */
  limitEndYear?: number;

  /**
   * Set the lower limit of the available year relative to the current selection date
   */
  limitStartYear?: number;

  /**
   * Whether to display a loading state indicator
   */
  loading?: boolean;

  /**
   *  to show week numbers
   */
  showWeekNumbers?: boolean;

  /**
   * Show only one calendar select
   */
  showOneCalendar?: boolean;

  /**
   * @deprecated Use `showMeridiem` instead
   */
  showMeridian?: boolean;

  /**
   * Meridiem format for 12-hour time
   */
  showMeridiem?: boolean;

  /**
   * Whether to display the formatted date range at the header of the calendar
   * @default true
   * @version 5.52.0
   */
  showHeader?: boolean;

  /**
   * Set default date for calendar
   */
  defaultCalendarValue?: DateRange;

  /**
   * The character that separates two dates
   * @default ' ~ '
   */
  character?: string;

  /**
   * The props for the Month Dropdown component.
   */
  monthDropdownProps?: MonthDropdownProps;

  /**
   * If the user selects a date on the right calendar first, it will automatically switch to the left calendar.
   * Always keep the date on the left calendar as the start date.
   * @default false
   * @version 5.69.0
   */
  calendarSnapping?: boolean;

  /**
   * Hide specific hour options
   */
  hideHours?: (hour: number, date: Date) => boolean;

  /**
   * Hide specific minute options
   */
  hideMinutes?: (minute: number, date: Date) => boolean;

  /**
   * Hide specific second options
   */
  hideSeconds?: (second: number, date: Date) => boolean;

  /**
   * Disabled date
   * @deprecated Use {@link shouldDisableDate} instead
   */
  disabledDate?: DisabledDateFunction;

  /**
   * Whether a date cell is disabled
   */
  shouldDisableDate?: DisabledDateFunction;

  /**
   * Disabled hours on the time view
   */
  shouldDisableHour?: (hour: number, date: Date) => boolean;

  /**
   * Disabled minutes on the time view
   */
  shouldDisableMinute?: (minute: number, date: Date) => boolean;

  /**
   * Disabled seconds on the time view
   */
  shouldDisableSecond?: (second: number, date: Date) => boolean;

  /**
   * Called when the option is selected
   */
  onSelect?: (date: Date, event?: React.SyntheticEvent) => void;

  /**
   * Called after clicking the OK button
   */
  onOk?: (date: DateRange, event: React.SyntheticEvent) => void;

  /**
   * Called after clicking the shortcut button
   */
  onShortcutClick?: (range: DateOptionPreset<DateRange>, event: React.MouseEvent) => void;

  /**
   * Called when the value is cleared
   */
  onClean?: (event: React.MouseEvent) => void;

  /**
   * Custom rendering of the selected date range.
   */
  renderValue?: (value: DateRange, format: string) => string;

  /**
   * Custom render for calendar title
   */
  renderTitle?: (date: Date) => React.ReactNode;

  /**
   * Custom rendering calendar cell content.
   *
   * @version 5.77.0
   */
  renderCell?: (date: Date) => React.ReactNode;
}

/**
 * A date range picker allows you to select a date range from a calendar.
 *
 * @see https://rsuitejs.com/components/date-range-picker
 */
const DateRangePicker = forwardRef<'div', DateRangePickerProps, typeof StaticMethods>(
  (props, ref) => {
    const { formatDate, propsWithDefaults } = useCustom('DateRangePicker', props);
    const {
      as: Component = 'div',
      classPrefix = 'picker',
      className,
      appearance = 'default',
      editable = true,
      cleanable = true,
      character = ' ~ ',
      calendarSnapping,
      defaultCalendarValue,
      defaultValue,
      plaintext,
      disabled,
      disabledDate: DEPRECATED_disabledDate,
      shouldDisableDate,
      shouldDisableHour,
      shouldDisableMinute,
      shouldDisableSecond,
      format,
      hoverRange,
      id: idProp,
      isoWeek = false,
      weekStart = 0,
      limitEndYear = 1000,
      limitStartYear,
      locale,
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
      showMeridian: DEPRECATED_showMeridian,
      showMeridiem = DEPRECATED_showMeridian,
      showHeader = true,
      style,
      size,
      caretAs: caretAsProp,
      value: valueProp,
      monthDropdownProps,
      hideHours,
      hideMinutes,
      hideSeconds,
      onChange,
      onClean,
      onEnter,
      onExit,
      onOk,
      onSelect,
      onShortcutClick,
      renderTitle,
      renderValue,
      renderCell,
      ...restProps
    } = propsWithDefaults;

    const id = useUniqueId('rs-', idProp);
    const { trigger, root, target, overlay } = usePickerRef(ref);
    const { merge, prefix } = useClassNames(classPrefix);

    const formatStr = format || locale?.shortDateFormat || 'yyyy-MM-dd';

    const rangeFormatStr = `${formatStr}${character}${formatStr}`;

    const [value, setValue] = useControlled(valueProp, defaultValue ?? null);

    const { mode, has } = useDateMode(formatStr);

    // Show only the calendar month panel. formatStr = 'yyyy-MM'
    const onlyShowMonth = mode === DateMode.Month;

    // Only show the time panel. formatStr = 'HH:mm:ss'
    const onlyShowTime = mode === DateMode.Time;

    // Allows two calendar panels to display the same month.
    const allowSameMonth = onlyShowMonth || showOneCalendar || onlyShowTime;

    // Default gap between two calendars, if `showOneCalendar` is set, the gap is 0
    const calendarGap = allowSameMonth ? 0 : 1;

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
    const [hoverDateRange, setHoverDateRange] = useState<DateRange | null>(value);

    // The displayed calendar panel is rendered based on this value.
    const [calendarDateRange, setCalendarDateRangeValue] = useState<DateRange>(
      getSafeCalendarDate({ value: value ?? defaultCalendarValue ?? null, allowSameMonth })
    );

    /**
     * When hoverRange is set, `selectValue` will be updated during the hover process,
     * which will cause the `selectValue` to be updated after the first click,
     * so declare a Ref to temporarily store the `selectValue` of the first click.
     */
    const selectRangeValueRef = useRef<DateRange | null>(null);

    /**
     *
     * The key of the currently active calendar panel.
     * Used to switch when only one calendar panel is displayed.
     */
    const [activeCalendarKey, setActiveCalendarKey] = useState<'start' | 'end'>();

    /**
     * Get the time on the calendar.
     */
    const getCalendarDatetime = (calendarKey: 'start' | 'end') => {
      const index = calendarKey === 'start' ? 0 : 1;

      return calendarDateRange?.[index] || defaultCalendarValue?.[index];
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
        has('time') &&
        dateRange?.length &&
        (eventName === 'changeDate' || eventName === 'changeMonth')
      ) {
        const startDate = copyTime({ from: getCalendarDatetime('start'), to: dateRange[0] });
        const endDate = copyTime({
          from: getCalendarDatetime('end'),
          to: dateRange.length === 1 ? addMonths(startDate, calendarGap) : dateRange[1]
        });

        nextValue = [startDate, endDate];
      } else if (dateRange === null && typeof defaultCalendarValue !== 'undefined') {
        // Make the calendar render the value of defaultCalendarValue after clearing the value.
        nextValue = defaultCalendarValue;
      }

      const nextCalendarDate = getSafeCalendarDate({
        value: nextValue,
        calendarKey,
        allowSameMonth
      });

      setCalendarDateRangeValue(nextCalendarDate);

      if (onlyShowMonth && eventName === 'changeMonth') {
        setSelectedDates(nextCalendarDate);
      }
    };

    useEffect(() => {
      // If value changes, update the selected and hover date values on the calendar panel.
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
          return (date: Date) =>
            getWeekHoverRange(date, { isoWeek, weekStart, locale: locale?.dateLocale });
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
          let nextSelectedDates: DateRange = [
            selectRangeValueRef.current[0],
            nextHoverDateRange[1]
          ];

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

          if (has('time')) {
            nextSelectDates = [
              copyTime({ from: getCalendarDatetime('start'), to: nextSelectDates[0] }),
              copyTime({ from: getCalendarDatetime('end'), to: nextSelectDates[1] })
            ];
          }

          setHoverDateRange(nextSelectDates);
        } else {
          setHoverDateRange([nextSelectDates[0] as Date, nextSelectDates[0] as Date]);
        }

        if (isSelectedIdle) {
          setActiveCalendarKey('end');
        } else {
          setActiveCalendarKey('start');
        }

        setSelectedDates(nextSelectDates);

        if (!isSameMonth(calendarDateRange[index], date) || calendarSnapping) {
          setCalendarDateRange({
            dateRange: nextSelectDates,
            calendarKey,
            eventName: 'changeDate'
          });
        }

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
      const nextCalendarDate = Array.from(calendarDateRange) as DateRange;
      nextCalendarDate[index] = date;

      setCalendarDateRange({
        dateRange: nextCalendarDate,
        calendarKey,
        eventName: 'changeMonth'
      });
    });

    const onChangeCalendarTime = useEventCallback((index: number, date: Date) => {
      const calendarKey = index === 0 ? 'start' : 'end';
      const nextCalendarDate = Array.from(calendarDateRange);
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

    const handleEnter = useEventCallback(() => {
      let nextCalendarDate;

      if (value && value.length) {
        const [startDate, endData] = value;
        nextCalendarDate = [
          startDate,
          isSameMonth(startDate, endData) ? addMonths(endData, calendarGap) : endData
        ];
      } else {
        // Reset the date on the calendar to the default date
        nextCalendarDate = getSafeCalendarDate({
          value: defaultCalendarValue ?? null,
          allowSameMonth
        });
      }

      setSelectedDates(value ?? []);
      setCalendarDateRange({ dateRange: nextCalendarDate });
    });

    const handleExit = useEventCallback(() => {
      setSelectedIdle(true);
    });

    /**
     * Toolbar operation callback function
     */
    const handleShortcutPageDate = useEventCallback(
      (range: DateOptionPreset<DateRange>, closeOverlay = false, event: React.MouseEvent) => {
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

    const calculateDateRange = () => {
      const [start = calendarDateRange[0], end = calendarDateRange[1]] = selectedDates;

      if (onlyShowTime) {
        return [start, end] as DateRange;
      }

      return selectedDates as DateRange;
    };

    const handleClickOK = useEventCallback((event: React.SyntheticEvent) => {
      const nextValue = calculateDateRange();

      setDateRange(event, nextValue);
      onOk?.(nextValue, event);
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
      setDateRange(event, selectValue, false);
    });

    /**
     * Check if the date is disabled
     */
    const isDateDisabled = useDateDisabled({ shouldDisableDate, DEPRECATED_disabledDate });

    /**
     * Check if a date range is disabled
     */
    const isRangeDisabled = (start: Date, end: Date, target: TARGET) => {
      if (isDateDisabled) {
        // If the date is between the start and the end the button is disabled
        while (isBefore(start, end) || isSameDay(start, end)) {
          if (
            isDateDisabled(start, {
              selectDate: selectedDates,
              selectedDone: isSelectedIdle,
              target
            })
          ) {
            return true;
          }
          start = addDays(start, 1);
        }
      }

      return false;
    };

    /**
     * Determine if the OK button should be disabled
     */
    const shouldDisableOkButton = (): boolean => {
      const [startDate, endDate] = calculateDateRange();

      // Check if start or end dates are missing
      if (!startDate || !endDate) {
        return true;
      }

      // Additional condition if only showing time
      if (!onlyShowTime && !isSelectedIdle) {
        return true;
      }

      // Check if there is any error in the selected date range
      if (isErrorValue([startDate, endDate])) {
        return true;
      }

      return false;
    };

    /**
     * Check if a shortcut is disabled based on the selected date range
     */
    const shouldDisableShortcut = (selectedDates: SelectedDatesState = []): boolean => {
      const [startDate, endDate] = selectedDates;

      // Disable if either start or end date is missing
      if (!startDate || !endDate) {
        return true;
      }

      // Check if the date range is disabled for the shortcut
      return isRangeDisabled(startDate, endDate, TARGET.TOOLBAR_SHORTCUT);
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

    const disableCalendarDate = isDateDisabled
      ? (date: Date, values: SelectedDatesState, type: TARGET) => {
          return isDateDisabled(date, {
            selectDate: values,
            selectedDone: isSelectedIdle,
            target: type
          });
        }
      : undefined;

    const renderCalendarOverlay = (positionProps: PositionChildProps, speakerRef) => {
      const { left, top, className } = positionProps;
      const classes = merge(className, menuClassName, prefix('popup-daterange'));
      const panelClasses = prefix('daterange-panel', {
        'daterange-panel-show-one-calendar': showOneCalendar,
        'daterange-panel-only-time': onlyShowTime
      });

      /**
       * Set a min-width (528px) when there are two calendars
       * @see https://github.com/rsuite/rsuite/issues/3522
       */
      const panelStyles: React.CSSProperties = {
        minWidth: showOneCalendar || onlyShowTime ? 'auto' : 528
      };
      const styles = { ...menuStyle, left, top };

      const calendarProps = {
        locale,
        isoWeek,
        weekStart,
        limitEndYear,
        showMeridiem,
        calendarDateRange,
        limitStartYear,
        showWeekNumbers,
        format: formatStr,
        value: selectedDates,
        monthDropdownProps,
        hoverRangeValue: hoverDateRange ?? undefined,
        hideHours,
        hideMinutes,
        hideSeconds,
        disabledHours: shouldDisableHour,
        disabledMinutes: shouldDisableMinute,
        disabledSeconds: shouldDisableSecond,
        disabledDate: disableCalendarDate,
        onSelect: handleSelectDate,
        onChangeCalendarMonth,
        onChangeCalendarTime,
        onMouseMove,
        renderTitle,
        renderCellOnPicker: renderCell
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
                  calendarDate={calendarDateRange}
                  locale={locale}
                  disableShortcut={shouldDisableShortcut}
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
                    <DateRangePickerProvider value={{ isSelectedIdle }}>
                      {getCalendars()}
                    </DateRangePickerProvider>
                  </div>
                </div>
                <Toolbar<SelectedDatesState, DateRange>
                  locale={locale}
                  calendarDate={selectedDates}
                  disableOkBtn={shouldDisableOkButton}
                  disableShortcut={shouldDisableShortcut}
                  hideOkBtn={oneTap}
                  onOk={handleClickOK}
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
      return caretAsProp || (onlyShowTime ? TimeIcon : CalendarIcon);
    }, [caretAsProp, onlyShowTime]) as React.ElementType | null;

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

      if (
        isDateDisabled?.(startDate, disabledOptions) ||
        isDateDisabled?.(endDate, disabledOptions)
      ) {
        return true;
      }

      return false;
    };

    const [ariaProps, rest] = partitionHTMLProps(restProps, { htmlProps: [], includeAria: true });
    const showCleanButton = cleanable && hasValue && !readOnly;
    const invalidValue = value && isErrorValue(value);

    const { customValue, inputReadOnly, Input, events } = useCustomizedInput({
      mode: 'dateRange',
      value,
      formatStr,
      renderValue,
      readOnly,
      editable,
      loading
    });

    return (
      <PickerToggleTrigger
        trigger="active"
        ref={trigger}
        pickerProps={pick(props, pickTriggerPropKeys)}
        placement={placement}
        onEnter={createChainedFunction(events.onActive, handleEnter, onEnter)}
        onExit={createChainedFunction(events.onInactive, handleExit, onExit)}
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
              className={prefix`input-group`}
              disabled={disabled}
              size={size}
            >
              <PickerLabel className={prefix`label`} id={`${id}-label`}>
                {label}
              </PickerLabel>
              <Input
                aria-haspopup="dialog"
                aria-invalid={invalidValue}
                aria-labelledby={label ? `${id}-label` : undefined}
                {...(ariaProps as any)}
                ref={target}
                id={id}
                value={customValue || value}
                character={character}
                format={formatStr}
                placeholder={placeholder ? placeholder : rangeFormatStr}
                disabled={disabled}
                readOnly={inputReadOnly}
                htmlSize={getInputHtmlSize()}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
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
  },
  StaticMethods
);

DateRangePicker.displayName = 'DateRangePicker';

export default DateRangePicker;
