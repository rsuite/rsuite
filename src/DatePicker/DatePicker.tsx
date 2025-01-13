import React, { useMemo } from 'react';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import CalenderSimpleIcon from '@rsuite/icons/CalenderSimple';
import TimeIcon from '@rsuite/icons/Time';
import CalendarContainer from '../Calendar/CalendarContainer';
import Toolbar from './Toolbar';
import Stack from '../Stack';
import PredefinedRanges from './PredefinedRanges';
import DateInput from '../DateInput';
import InputGroup from '../InputGroup';
import useMonthView from './hooks/useMonthView';
import useFocus from './hooks/useFocus';
import useCustomizedInput from './hooks/useCustomizedInput';
import { useCalendarDate } from '../Calendar/hooks';
import { isEveryDateInMonth } from '../Calendar/utils';
import {
  forwardRef,
  mergeRefs,
  partitionHTMLProps,
  createChainedFunction
} from '@/internals/utils';
import { useClassNames, useControlled, useUniqueId, useEventCallback } from '@/internals/hooks';
import {
  isValid,
  copyTime,
  disableTime,
  DateMode,
  useDateMode,
  calendarOnlyProps,
  CalendarOnlyPropsType
} from '@/internals/utils/date';
import {
  PickerPopup,
  PickerLabel,
  PickerIndicator,
  PickerToggleTrigger,
  pickTriggerPropKeys,
  PositionChildProps,
  usePickerClassName,
  usePickerRef,
  onMenuKeyDown
} from '@/internals/Picker';
import { OverlayCloseCause } from '@/internals/Overlay/OverlayTrigger';
import { splitRanges, getRestProps } from './utils';
import { startOfToday } from '@/internals/utils/date';
import { useCustom } from '../CustomProvider';
import type { FormControlBaseProps, PickerBaseProps } from '@/internals/types';
import type { DateOptionPreset } from '@/internals/types';
import type { DatePickerLocale } from '../locales';
import type { DeprecatedProps } from './types';
import type { MonthDropdownProps } from '../Calendar/types';

export interface DatePickerProps
  extends PickerBaseProps<DatePickerLocale>,
    FormControlBaseProps<Date | null>,
    DeprecatedProps {
  /**
   * Custom caret component
   */
  caretAs?: React.ElementType | null;

  /**
   * Calendar panel default presentation date and time
   */
  calendarDefaultDate?: Date;

  /**
   * Whether disabled the component
   */
  disabled?: boolean;

  /**
   * Rendered as an input, the date can be entered via the keyboard
   */
  editable?: boolean;

  /**
   * Format date string
   */
  format?: string;

  /**
   * ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day
   *
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
   * Set the upper limit of the available year relative to the current selection date
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
   * One-click selection date
   */
  oneTap?: boolean;

  /**
   * Whether plaintext the component
   */
  plaintext?: boolean;

  /**
   * Whether read only the component
   */
  readOnly?: boolean;

  /**
   * Predefined date Ranges
   */
  ranges?: DateOptionPreset<Date>[];

  /**
   * Whether to show week numbers
   */
  showWeekNumbers?: boolean;

  /**
   * @deprecated Use `showMeridiem` instead
   */
  showMeridian?: boolean;

  /**
   * Meridiem format for 12-hour time
   */
  showMeridiem?: boolean;

  /**
   * The props for the Month Dropdown component.
   */
  monthDropdownProps?: MonthDropdownProps;

  /**
   * Whether a date on the calendar view should be disabled
   *
   * @returns date should be disabled (not selectable)
   */
  shouldDisableDate?: (date: Date) => boolean;

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
   * Called when the calendar panel date changes
   */
  onChangeCalendarDate?: (date: Date, event?: React.SyntheticEvent) => void;

  /**
   * Called when opening the month view
   */
  onToggleMonthDropdown?: (toggle: boolean) => void;

  /**
   * Called when opening the time view
   */
  onToggleTimeDropdown?: (toggle: boolean) => void;

  /**
   * Called when the option is selected
   */
  onSelect?: (date: Date, event?: React.SyntheticEvent) => void;

  /** Called after the prev month */
  onPrevMonth?: (date: Date) => void;

  /**
   * Called after the next month
   */
  onNextMonth?: (date: Date) => void;

  /**
   * Called after clicking the OK button
   */
  onOk?: (date: Date, event: React.SyntheticEvent) => void;

  /**
   * Called after clicking the shortcut button
   */
  onShortcutClick?: (range: DateOptionPreset<Date>, event: React.MouseEvent) => void;

  /**
   * Called when clean
   */
  onClean?: (event: React.MouseEvent) => void;

  /**
   * Custom rendering of the selected date.
   */
  renderValue?: (value: Date, format: string) => string;

  /**
   * Custom rendering calendar cell content.
   *
   * @version 5.54.0
   */
  renderCell?: (date: Date) => React.ReactNode;
}

/**
 * A date picker allows users to select a date from a calendar.
 *
 * @see https://rsuitejs.com/components/date-picker
 */
const DatePicker = forwardRef<'div', DatePickerProps>((props: DatePickerProps, ref) => {
  const { propsWithDefaults } = useCustom('DatePicker', props);
  const {
    as: Component = 'div',
    className,
    classPrefix = 'picker',
    calendarDefaultDate,
    cleanable = true,
    caretAs: caretAsProp,
    editable = true,
    defaultValue,
    disabled,
    readOnly: readOnly,
    plaintext,
    format,
    id: idProp,
    isoWeek,
    weekStart = 0,
    limitEndYear = 1000,
    limitStartYear,
    locale,
    loading,
    label,
    menuClassName,
    menuStyle,
    appearance = 'default',
    placement = 'bottomStart',
    oneTap,
    placeholder = '',
    ranges,
    value: valueProp,
    showMeridian: DEPRECATED_showMeridian,
    showMeridiem = DEPRECATED_showMeridian,
    showWeekNumbers,
    style,
    size,
    monthDropdownProps,
    shouldDisableDate,
    shouldDisableHour,
    shouldDisableMinute,
    shouldDisableSecond,
    onChange,
    onChangeCalendarDate,
    onClean,
    onEnter,
    onExit,
    onNextMonth,
    onOk,
    onPrevMonth,
    onSelect,
    onToggleMonthDropdown,
    onToggleTimeDropdown,
    onShortcutClick,
    renderCell,
    renderValue,
    disabledDate: DEPRECATED_disabledDate,
    disabledHours: DEPRECATED_disabledHours,
    disabledMinutes: DEPRECATED_disabledMinutes,
    disabledSeconds: DEPRECATED_disabledSeconds,
    ...restProps
  } = propsWithDefaults;

  const id = useUniqueId('rs-', idProp);
  const { trigger, root, target, overlay } = usePickerRef(ref);
  const formatStr = format || locale?.shortDateFormat || 'yyyy-MM-dd';
  const { merge, prefix } = useClassNames(classPrefix);
  const [value, setValue] = useControlled(valueProp, defaultValue);
  const { calendarDate, setCalendarDate, resetCalendarDate } = useCalendarDate(
    value,
    calendarDefaultDate
  );

  const { setMonthView, monthView, toggleMonthView } = useMonthView({ onToggleMonthDropdown });
  const { mode } = useDateMode(formatStr);

  // Show only the calendar month panel. formatStr = 'yyyy-MM'
  const showMonth = mode === DateMode.Month || monthView;

  const { focusInput, focusSelectedDate, onKeyFocusEvent } = useFocus({
    target,
    showMonth,
    id,
    locale
  });

  /**
   * Check whether the date is disabled.
   */
  const isDateDisabled = (date: Date): boolean => {
    if (typeof shouldDisableDate === 'function') {
      return shouldDisableDate(date);
    }

    if (typeof DEPRECATED_disabledDate === 'function') {
      return DEPRECATED_disabledDate(date);
    }

    return false;
  };

  /**
   * Check whether the time is within the time range of the shortcut option in the toolbar.
   */
  const isDatetimeDisabled = (date: Date): boolean => {
    return isDateDisabled?.(date) || disableTime(props, date);
  };

  /**
   * Check whether the month is disabled.
   * If any day in the month is disabled, the entire month is disabled
   */
  const isMonthDisabled = (date: Date): boolean => {
    return isEveryDateInMonth(date.getFullYear(), date.getMonth(), isDateDisabled);
  };

  /**
   * Whether "OK" button is disabled
   *
   * - If format is date, disable ok button if selected date is disabled
   * - If format is month, disable ok button if all dates in the month of selected date are disabled
   */
  const isOkButtonDisabled = (selectedDate: Date): boolean => {
    if (mode === DateMode.Month) {
      return isMonthDisabled(selectedDate);
    }

    return isDatetimeDisabled(selectedDate);
  };

  const isErrorValue = (value?: Date | null) => {
    if (!isValid(value)) {
      return true;
    } else if (value && isDateDisabled(value)) {
      return true;
    }

    return false;
  };

  /**
   * Switch to the callback triggered after the next month.
   */
  const handleMoveForward = useEventCallback((nextPageDate: Date) => {
    setCalendarDate(nextPageDate);

    onNextMonth?.(nextPageDate);
    onChangeCalendarDate?.(nextPageDate);
  });

  /**
   * Switch to the callback triggered after the previous month.
   */
  const handleMoveBackward = useEventCallback((nextPageDate: Date) => {
    setCalendarDate(nextPageDate);

    onPrevMonth?.(nextPageDate);
    onChangeCalendarDate?.(nextPageDate);
  });

  /**
   * The callback triggered when the date changes.
   */
  const handleDateChange = useEventCallback((nextValue: Date, event?: React.SyntheticEvent) => {
    onSelect?.(nextValue, event);
    onChangeCalendarDate?.(nextValue, event);
  });

  /**
   *  A callback triggered when the time on the calendar changes.
   */
  const handleChangeTime = useEventCallback((nextPageTime: Date) => {
    setCalendarDate(nextPageTime);
    handleDateChange(nextPageTime);
  });

  /**
   * Close the calendar panel.
   */
  const handleClose = useEventCallback(() => {
    trigger.current?.close?.();
  });

  const updateValue = (event: React.SyntheticEvent, date?: Date | null, closeOverlay = true) => {
    const nextValue = typeof date !== 'undefined' ? date : calendarDate;

    setCalendarDate(nextValue || startOfToday());
    setValue(nextValue);

    if (nextValue !== value) {
      onChange?.(nextValue, event);
    }

    // `closeOverlay` default value is `true`
    if (closeOverlay !== false) {
      handleClose();
    }
  };

  /**
   * The callback triggered after the date in the shortcut area is clicked.
   */
  const handleShortcutPageDate = useEventCallback(
    (range: DateOptionPreset<Date>, closeOverlay: boolean, event: React.MouseEvent) => {
      const value = range.value as Date;

      updateValue(event, value, closeOverlay);
      handleDateChange(value, event);
      onShortcutClick?.(range, event);
    }
  );

  /**
   * The callback triggered after clicking the OK button.
   */
  const handleOK = useEventCallback((event: React.SyntheticEvent) => {
    updateValue(event);
    onOk?.(calendarDate, event);
    focusInput();
  });

  /**
   * Callback after clicking the clear button.
   */

  const handleClean = useEventCallback((event: React.MouseEvent) => {
    event?.stopPropagation();

    updateValue(event, null);
    resetCalendarDate(null);
    onClean?.(event);
  });

  const handlePickerPopupKeyDown = useEventCallback((event: React.KeyboardEvent) => {
    onKeyFocusEvent(event, { date: calendarDate, callback: setCalendarDate });

    if (event.key === 'Enter') {
      handleOK(event);
    }
  });

  const handleClick = useEventCallback(() => {
    if (editable) {
      return;
    }

    focusSelectedDate();
  });

  /**
   * Callback after the date is selected.
   */
  const handleCalendarSelect = useEventCallback(
    (date: Date, event: React.SyntheticEvent, updatableValue = true) => {
      const nextValue = copyTime({ from: calendarDate, to: date });

      setCalendarDate(nextValue);
      handleDateChange(nextValue);

      if (oneTap && updatableValue) {
        updateValue(event, nextValue);
        focusInput();
      }
    }
  );

  /**
   *  A callback triggered when the date on the calendar changes.
   */
  const handleChangeMonth = useEventCallback((nextPageDate: Date, event: React.MouseEvent) => {
    setCalendarDate(nextPageDate);
    handleDateChange(nextPageDate);
    focusSelectedDate();

    if (oneTap && mode === DateMode.Month) {
      updateValue(event, nextPageDate);
      focusInput();
    }
  });

  /**
   * Callback after the input box value is changed.
   */
  const handleInputChange = useEventCallback((value, event) => {
    if (!isErrorValue(value)) {
      handleCalendarSelect(value, event);
    }

    updateValue(event, value, false);
  });

  const handleInputKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    onMenuKeyDown(event, {
      esc: handleClose,
      enter: () => {
        const { open } = trigger.current?.getState() || {};
        if (open) {
          if (isValid(calendarDate) && !isDateDisabled(calendarDate)) {
            updateValue(event);
            focusInput();
          }
        } else {
          trigger.current?.open();
        }
      }
    });
  });

  const calendarProps = mapValues(
    pick<DatePickerProps, CalendarOnlyPropsType>(props, calendarOnlyProps),
    func => (next: number, date: Date) => func?.(next, date) ?? false
  );

  const { sideRanges, bottomRanges } = splitRanges(ranges);

  const renderCalendarOverlay = (positionProps: PositionChildProps, speakerRef) => {
    const { left, top, className } = positionProps;
    const classes = merge(menuClassName, className, prefix('popup-date'));
    const styles = { ...menuStyle, left, top };

    return (
      <PickerPopup
        role="dialog"
        aria-labelledby={label ? `${id}-label` : undefined}
        tabIndex={-1}
        className={classes}
        ref={mergeRefs(overlay, speakerRef)}
        style={styles}
        target={trigger}
        onKeyDown={handlePickerPopupKeyDown}
      >
        <Stack alignItems="flex-start">
          {sideRanges.length > 0 && (
            <PredefinedRanges
              direction="column"
              spacing={0}
              className={prefix('date-predefined')}
              ranges={sideRanges}
              calendarDate={calendarDate}
              locale={locale}
              disableShortcut={isDatetimeDisabled}
              onShortcutClick={handleShortcutPageDate}
            />
          )}

          <Stack.Item>
            <CalendarContainer
              {...calendarProps}
              targetId={id}
              locale={locale}
              showWeekNumbers={showWeekNumbers}
              showMeridiem={showMeridiem}
              disabledDate={isDateDisabled}
              disabledHours={shouldDisableHour ?? DEPRECATED_disabledHours}
              disabledMinutes={shouldDisableMinute ?? DEPRECATED_disabledMinutes}
              disabledSeconds={shouldDisableSecond ?? DEPRECATED_disabledSeconds}
              limitEndYear={limitEndYear}
              limitStartYear={limitStartYear}
              format={formatStr}
              isoWeek={isoWeek}
              weekStart={weekStart}
              calendarDate={calendarDate}
              monthDropdownProps={monthDropdownProps}
              renderCellOnPicker={renderCell}
              onMoveForward={handleMoveForward}
              onMoveBackward={handleMoveBackward}
              onSelect={handleCalendarSelect}
              onToggleMonthDropdown={toggleMonthView}
              onToggleTimeDropdown={onToggleTimeDropdown}
              onChangeMonth={handleChangeMonth}
              onChangeTime={handleChangeTime}
            />
            <Toolbar
              locale={locale}
              ranges={bottomRanges}
              calendarDate={calendarDate}
              disableOkBtn={isOkButtonDisabled}
              disableShortcut={isDatetimeDisabled}
              onShortcutClick={handleShortcutPageDate}
              onOk={handleOK}
              hideOkBtn={oneTap}
            />
          </Stack.Item>
        </Stack>
      </PickerPopup>
    );
  };

  const hasValue = isValid(value);
  const [classes, usedClassNamePropKeys] = usePickerClassName({
    ...props,
    classPrefix,
    name: 'date',
    appearance,
    hasValue,
    cleanable
  });

  const caretAs: React.ElementType | null = useMemo(() => {
    if (caretAsProp === null) {
      return null;
    }
    return caretAsProp || (mode === DateMode.Time ? TimeIcon : CalenderSimpleIcon);
  }, [caretAsProp, mode]) as React.ElementType | null;

  const handleTriggerClose = useEventCallback(cause => {
    // Unless overlay is closing on user clicking "OK" button,
    // reset the selected date on calendar panel
    if (cause !== OverlayCloseCause.ImperativeHandle) {
      resetCalendarDate();
    }

    setMonthView(false);

    props.onClose?.();
  });

  const showCleanButton = cleanable && hasValue && !readOnly;
  const [ariaProps, rest] = partitionHTMLProps(restProps, { htmlProps: [], includeAria: true });
  const invalidValue = value && isErrorValue(value);

  const customizedProps = { value, formatStr, renderValue, readOnly, editable, loading };
  const { customValue, inputReadOnly, Input, events } = useCustomizedInput(customizedProps);

  return (
    <PickerToggleTrigger
      trigger="active"
      pickerProps={pick(props, pickTriggerPropKeys)}
      ref={trigger}
      placement={placement}
      onClose={handleTriggerClose}
      onEnter={createChainedFunction(events.onActive, onEnter)}
      onExit={createChainedFunction(events.onInactive, onExit)}
      speaker={renderCalendarOverlay}
    >
      <Component
        className={merge(className, classes, { [prefix('error')]: invalidValue })}
        style={style}
        ref={root}
      >
        {plaintext ? (
          <DateInput value={value} format={formatStr} plaintext={plaintext} />
        ) : (
          <InputGroup
            {...getRestProps(rest, usedClassNamePropKeys)}
            inside
            size={size}
            disabled={disabled}
            className={prefix`input-group`}
            onClick={handleClick}
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
              format={formatStr}
              placeholder={placeholder ? placeholder : formatStr}
              disabled={disabled}
              readOnly={inputReadOnly}
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
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;
