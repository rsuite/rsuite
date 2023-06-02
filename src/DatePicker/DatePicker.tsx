import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import delay from 'lodash/delay';
import omit from 'lodash/omit';
import IconCalendar from '@rsuite/icons/legacy/Calendar';
import IconClockO from '@rsuite/icons/legacy/ClockO';
import CalendarContainer from '../Calendar/CalendarContainer';
import useCalendarDate from '../Calendar/useCalendarDate';
import { isEveryDateInMonth } from '../Calendar/MonthDropdown';
import Toolbar, { RangeType } from './Toolbar';
import Stack from '../Stack';
import PredefinedRanges from './PredefinedRanges';
import { DatePickerLocale } from '../locales';
import {
  mergeRefs,
  useClassNames,
  useControlled,
  useCustom,
  useUniqueId,
  useEventCallback,
  partitionHTMLProps
} from '../utils';
import {
  shouldRenderMonth,
  shouldRenderDate,
  shouldRenderTime,
  shouldOnlyRenderTime,
  setHours,
  getHours,
  addMonths,
  addDays,
  isValid,
  disabledTime,
  copyTime,
  calendarOnlyProps,
  CalendarOnlyPropsType
} from '../utils/dateUtils';
import {
  PickerPopup,
  PickerLabel,
  PickerIndicator,
  PickerToggleTrigger,
  pickerPropTypes,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  PositionChildProps,
  usePickerClassName,
  usePickerRef,
  onMenuKeyDown
} from '../internals/Picker';
import { OverlayCloseCause } from '../internals/Overlay/OverlayTrigger';
import DateInput from '../DateInput';
import InputGroup from '../InputGroup';
import { FormControlBaseProps, PickerBaseProps, RsRefForwardingComponent } from '../@types/common';
import { deprecatePropTypeNew } from '../internals/propTypes';
import { getAriaLabel } from '../Calendar/utils';
import { splitRanges } from './utils';

export type { RangeType } from './Toolbar';

export interface DatePickerProps
  extends PickerBaseProps<DatePickerLocale>,
    FormControlBaseProps<Date | null> {
  /** Custom caret component */
  caretAs?: React.ElementType | null;

  /** Calendar panel default presentation date and time */
  calendarDefaultDate?: Date;

  /** Whether disabled the component */
  disabled?: boolean;

  /** Rendered as an input, the date can be entered via the keyboard */
  editable?: boolean;

  /** Format date */
  format?: string;

  /**
   * Display date panel when component initial
   *
   * @deprecated use <Calendar> instead
   **/
  inline?: boolean;

  /**
   * ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day
   *
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   */
  isoWeek?: boolean;

  /** A label displayed at the beginning of toggle button */
  label?: React.ReactNode;

  /** Set the upper limit of the available year relative to the current selection date */
  limitEndYear?: number;

  /** Set the lower limit of the available year relative to the current selection date */
  limitStartYear?: number;

  /** Whether to display a loading state indicator */
  loading?: boolean;

  /** one tap to select */
  oneTap?: boolean;

  /** Whether plaintext the component */
  plaintext?: boolean;

  /** Whether read only the component */
  readOnly?: boolean;

  /** Predefined date Ranges */
  ranges?: RangeType<Date>[];

  /** Whether to show week numbers */
  showWeekNumbers?: boolean;

  /** Meridian format */
  showMeridian?: boolean;

  /**
   * Whether to disable a date on the calendar view
   *
   * @returns date should be disabled (not selectable)
   * @deprecated Use {@link shouldDisableDate} instead
   */
  disabledDate?: (date?: Date) => boolean;

  /**
   * Disabled hours
   *
   * @deprecated Use {@link shouldDisableHour} instead
   */
  disabledHours?: (hour: number, date: Date) => boolean;

  /**
   * Disabled minutes
   *
   * @deprecated Use {@link shouldDisableMinute} instead
   */
  disabledMinutes?: (minute: number, date: Date) => boolean;

  /**
   * Disabled seconds
   *
   * @deprecated Use {@link shouldDisableSecond} instead
   */
  disabledSeconds?: (second: number, date: Date) => boolean;

  /**
   * Whether a date on the calendar view should be disabled
   *
   * @returns date should be disabled (not selectable)
   */
  shouldDisableDate?: (date: Date) => boolean;

  /**
   * Disabled hours
   */
  shouldDisableHour?: (hour: number, date: Date) => boolean;

  /**
   * Disabled minutes
   */
  shouldDisableMinute?: (minute: number, date: Date) => boolean;

  /**
   * Disabled seconds
   */
  shouldDisableSecond?: (second: number, date: Date) => boolean;

  /** Hidden hours */
  hideHours?: (hour: number, date: Date) => boolean;

  /** Hidden minutes */
  hideMinutes?: (minute: number, date: Date) => boolean;

  /** Hidden seconds */
  hideSeconds?: (second: number, date: Date) => boolean;

  /** Called when the calendar panel date changes */
  onChangeCalendarDate?: (date: Date, event?: React.SyntheticEvent) => void;

  /** Called when opening the month view */
  onToggleMonthDropdown?: (toggle: boolean) => void;

  /** Called when opening the time view */
  onToggleTimeDropdown?: (toggle: boolean) => void;

  /** Called when the option is selected */
  onSelect?: (date: Date, event?: React.SyntheticEvent) => void;

  /** Called after the prev month */
  onPrevMonth?: (date: Date) => void;

  /** Called after the next month */
  onNextMonth?: (date: Date) => void;

  /** Called after clicking the OK button */
  onOk?: (date: Date, event: React.SyntheticEvent) => void;

  /** Called after clicking the shortcut button */
  onShortcutClick?: (range: RangeType<Date>, event: React.MouseEvent) => void;

  /** Called when clean */
  onClean?: (event: React.MouseEvent) => void;

  /**
   * @deprecated
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
const DatePicker: RsRefForwardingComponent<'div', DatePickerProps> = React.forwardRef(
  (props: DatePickerProps, ref) => {
    const {
      as: Component = 'div',
      className,
      classPrefix = 'picker',
      calendarDefaultDate,
      cleanable = true,
      editable = true,
      defaultValue,
      disabled,
      readOnly,
      plaintext,
      // todo Not consistent with locale.formatDayPattern
      format: formatStr = 'yyyy-MM-dd',
      id: idProp,
      isoWeek,
      limitEndYear = 1000,
      limitStartYear,
      locale: overrideLocale,
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
      showMeridian,
      showWeekNumbers,
      style,
      size,
      caretAs: caretAsProp,
      disabledDate: DEPRECATED_disabledDate,
      disabledHours: DEPRECATED_disabledHours,
      disabledMinutes: DEPRECATED_disabledMinutes,
      disabledSeconds: DEPRECATED_disabledSeconds,
      shouldDisableDate,
      shouldDisableHour,
      shouldDisableMinute,
      shouldDisableSecond,
      onChange,
      onChangeCalendarDate,
      onClean,
      onEntered,
      onExited,
      onNextMonth,
      onOk,
      onPrevMonth,
      onSelect,
      onToggleMonthDropdown,
      onToggleTimeDropdown,
      onShortcutClick,
      renderCell,
      ...restProps
    } = props;

    const id = useUniqueId('rs-', idProp);
    const { trigger, root, target, overlay } = usePickerRef(ref);
    const { locale, formatDate } = useCustom<DatePickerLocale>('DatePicker', overrideLocale);
    const { merge, prefix } = useClassNames(classPrefix);
    const [value, setValue] = useControlled(valueProp, defaultValue);
    const { calendarDate, setCalendarDate, resetCalendarDate } = useCalendarDate(
      value,
      calendarDefaultDate
    );

    const [showMonthDropdown, setShowMonthDropdown] = useState<boolean>(false);

    // Show only the calendar month panel. formatStr = 'yyyy-MM'
    const onlyShowMonth = shouldRenderMonth(formatStr) && !shouldRenderDate(formatStr);
    const showMonth = onlyShowMonth || showMonthDropdown;

    const isDateDisabled = (date: Date): boolean => {
      if (typeof shouldDisableDate === 'function') {
        return shouldDisableDate(date);
      }

      if (typeof DEPRECATED_disabledDate === 'function') {
        return DEPRECATED_disabledDate(date);
      }

      return false;
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

    const handleClose = useEventCallback(() => {
      trigger.current?.close?.();
    });

    /**
     * The callback triggered when PM/AM is switched.
     */
    const handleToggleMeridian = useEventCallback(() => {
      const hours = getHours(calendarDate);
      const nextHours = hours >= 12 ? hours - 12 : hours + 12;
      const nextDate = setHours(calendarDate, nextHours);

      handleChangeTime(nextDate);
    });

    const updateValue = (
      event: React.SyntheticEvent,
      nextPageDate?: Date | null,
      closeOverlay = true
    ) => {
      const nextValue: Date | null =
        typeof nextPageDate !== 'undefined' ? nextPageDate : calendarDate;

      setCalendarDate(nextValue || new Date());
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
      (range: RangeType<Date>, closeOverlay: boolean, event: React.MouseEvent) => {
        const value = range.value as Date;

        updateValue(event, value, closeOverlay);
        handleDateChange(value, event);
        onShortcutClick?.(range, event);
      }
    );

    /**
     * Get the corresponding container based on date selection and month selection
     */
    const getOverlayContainer = () => {
      return showMonth
        ? document.getElementById(`${id}-calendar-month-dropdown`)
        : document.getElementById(`${id}-calendar-table`);
    };

    /**
     * Check whether the date is focusable
     */
    const checkFocusable = (date: Date) => {
      const formatStr = showMonth ? locale.formattedMonthPattern : locale.formattedDayPattern;
      const ariaLabel = getAriaLabel(date, formatStr as string, formatDate);
      const container = getOverlayContainer();

      const dateElement = container?.querySelector(`[aria-label="${ariaLabel}"]`);

      if (dateElement?.getAttribute('aria-disabled') === 'true') {
        return false;
      }

      return true;
    };

    /**
     * Focus on the currently selected date element
     */
    const focusSelectedDate = () => {
      delay(() => {
        const container = getOverlayContainer();

        const selectedElement = container?.querySelector('[aria-selected="true"]') as HTMLElement;

        selectedElement?.focus();
      }, 1);
    };

    /**
     * Focus on the input element
     */
    const focusTargetInput = useEventCallback(() => {
      delay(() => target.current?.focus(), 1);
    });

    /**
     * The callback triggered after clicking the OK button.
     */
    const handleOK = useEventCallback((event: React.SyntheticEvent) => {
      updateValue(event);
      onOk?.(calendarDate, event);
      focusTargetInput();
    });

    /**
     * Callback after clicking the clear button.
     */

    const handleClean = useEventCallback((event: React.MouseEvent) => {
      updateValue(event, null);
      resetCalendarDate(null);
      onClean?.(event);
      event.stopPropagation();
    });

    const handlePickerPopupKeyDown = useEventCallback((event: React.KeyboardEvent) => {
      let delta = 0;

      const step = showMonth ? 6 : 7;
      const changeDateFunc = showMonth ? addMonths : addDays;

      onMenuKeyDown(event, {
        down: () => {
          delta = step;
        },
        up: () => {
          delta = -step;
        },
        right: () => {
          delta = 1;
        },
        left: () => {
          delta = -1;
        },
        enter: () => {
          handleOK(event);
        }
      });

      const nextDate = changeDateFunc(calendarDate, delta);

      if (checkFocusable(nextDate)) {
        setCalendarDate(nextDate);
        focusSelectedDate();
      }
    });

    /**
     * The callback triggered after the month selection box is opened or closed.
     */
    const handleToggleMonthDropdown = useEventCallback((toggle: boolean) => {
      onToggleMonthDropdown?.(toggle);
      setShowMonthDropdown(toggle);
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
    const handleSelect = useEventCallback(
      (nextValue: Date, event: React.SyntheticEvent, updatableValue = true) => {
        setCalendarDate(
          // Determine whether the current value contains time, if not, use calendarDate.
          shouldRenderTime(formatStr) ? nextValue : copyTime({ from: calendarDate, to: nextValue })
        );

        handleDateChange(nextValue);
        if (oneTap && updatableValue) {
          updateValue(event, nextValue);
          focusTargetInput();
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

      if (oneTap && onlyShowMonth) {
        updateValue(event, nextPageDate);
        focusTargetInput();
      }
    });

    /**
     * Callback after the input box value is changed.
     */
    const handleInputChange = useEventCallback((value, event) => {
      if (!isErrorValue(value)) {
        handleSelect(value, event);
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
              focusTargetInput();
            }
          } else {
            trigger.current?.open();
          }
        }
      });
    });

    // Check whether the time is within the time range of the shortcut option in the toolbar.
    const disabledToolbarHandle = (date: Date): boolean => {
      const allowDate = DEPRECATED_disabledDate?.(date) ?? false;
      const allowTime = disabledTime(props, date);

      return allowDate || allowTime;
    };

    /**
     * Whether "OK" button is disabled
     *
     * - If format is date, disable ok button if selected date is disabled
     * - If format is month, disable ok button if all dates in the month of selected date are disabled
     */
    const isOKButtonDisabled = (selectedDate: Date): boolean => {
      if (shouldRenderMonth(formatStr) && !shouldRenderDate(formatStr)) {
        return isEveryDateInMonth(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          disabledToolbarHandle
        );
      }

      return disabledToolbarHandle(selectedDate);
    };

    const calendarProps = useMemo(
      () =>
        mapValues(
          pick<DatePickerProps, CalendarOnlyPropsType>(props, calendarOnlyProps),
          disabledOrHiddenTimeFunc =>
            (next: number, date: Date): boolean =>
              disabledOrHiddenTimeFunc?.(next, date) ?? false
        ),
      [props]
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
                disabledShortcut={disabledToolbarHandle}
                onShortcutClick={handleShortcutPageDate}
              />
            )}

            <Stack.Item>
              <CalendarContainer
                {...calendarProps}
                targetId={id}
                locale={locale}
                showWeekNumbers={showWeekNumbers}
                showMeridian={showMeridian}
                disabledDate={isDateDisabled}
                disabledHours={shouldDisableHour ?? DEPRECATED_disabledHours}
                disabledMinutes={shouldDisableMinute ?? DEPRECATED_disabledMinutes}
                disabledSeconds={shouldDisableSecond ?? DEPRECATED_disabledSeconds}
                limitEndYear={limitEndYear}
                limitStartYear={limitStartYear}
                format={formatStr}
                isoWeek={isoWeek}
                calendarDate={calendarDate}
                renderCellOnPicker={renderCell}
                onMoveForward={handleMoveForward}
                onMoveBackward={handleMoveBackward}
                onSelect={handleSelect}
                onToggleMonthDropdown={handleToggleMonthDropdown}
                onToggleTimeDropdown={onToggleTimeDropdown}
                onChangeMonth={handleChangeMonth}
                onChangeTime={handleChangeTime}
                onToggleMeridian={handleToggleMeridian}
              />
              <Toolbar
                locale={locale}
                ranges={bottomRanges}
                calendarDate={calendarDate}
                disabledOkBtn={isOKButtonDisabled}
                disabledShortcut={disabledToolbarHandle}
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
      return caretAsProp || (shouldOnlyRenderTime(formatStr) ? IconClockO : IconCalendar);
    }, [caretAsProp, formatStr]) as React.ElementType | null;

    const handleTriggerClose = useEventCallback(cause => {
      // Unless overlay is closing on user clicking "OK" button,
      // reset the selected date on calendar panel
      if (cause !== OverlayCloseCause.ImperativeHandle) {
        resetCalendarDate();
      }

      setShowMonthDropdown(false);
    });

    const showCleanButton = cleanable && hasValue && !readOnly;
    const [ariaProps, rest] = partitionHTMLProps(restProps, { htmlProps: [], includeAria: true });
    const invalidValue = value && isErrorValue(value);

    return (
      <PickerToggleTrigger
        trigger="active"
        pickerProps={pick(props, pickTriggerPropKeys)}
        ref={trigger}
        placement={placement}
        onClose={handleTriggerClose}
        onEntered={onEntered}
        onExited={onExited}
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
              {...omit(rest, [
                ...omitTriggerPropKeys,
                ...usedClassNamePropKeys,
                ...calendarOnlyProps
              ])}
              inside
              size={size}
              onClick={handleClick}
            >
              <PickerLabel className={prefix`label`} id={`${id}-label`}>
                {label}
              </PickerLabel>
              <DateInput
                aria-haspopup="dialog"
                aria-invalid={invalidValue}
                aria-labelledby={label ? `${id}-label` : undefined}
                {...(ariaProps as any)}
                ref={target}
                id={id}
                value={value}
                format={formatStr}
                placeholder={placeholder ? placeholder : formatStr}
                disabled={disabled}
                onChange={handleInputChange}
                readOnly={readOnly || !editable || loading}
                plaintext={plaintext}
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
  }
);

DatePicker.displayName = 'DatePicker';
DatePicker.propTypes = {
  ...pickerPropTypes,
  calendarDefaultDate: PropTypes.instanceOf(Date),
  defaultValue: PropTypes.instanceOf(Date),
  disabledDate: deprecatePropTypeNew(PropTypes.func, 'Use "shouldDisableDate" property instead.'),
  disabledHours: deprecatePropTypeNew(PropTypes.func, 'Use "shouldDisableHour" property instead.'),
  disabledMinutes: deprecatePropTypeNew(
    PropTypes.func,
    'Use "shouldDisableMinute" property instead.'
  ),
  disabledSeconds: deprecatePropTypeNew(
    PropTypes.func,
    'Use "shouldDisableSecond" property instead.'
  ),
  shouldDisableDate: PropTypes.func,
  shouldDisableHour: PropTypes.func,
  shouldDisableMinute: PropTypes.func,
  shouldDisableSecond: PropTypes.func,
  format: PropTypes.string,
  hideHours: PropTypes.func,
  hideMinutes: PropTypes.func,
  hideSeconds: PropTypes.func,
  isoWeek: PropTypes.bool,
  limitEndYear: PropTypes.number,
  limitStartYear: PropTypes.number,
  onChange: PropTypes.func,
  onChangeCalendarDate: PropTypes.func,
  onNextMonth: PropTypes.func,
  onOk: PropTypes.func,
  onPrevMonth: PropTypes.func,
  onSelect: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onToggleTimeDropdown: PropTypes.func,
  oneTap: PropTypes.bool,
  ranges: PropTypes.array,
  showMeridian: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  value: PropTypes.instanceOf(Date)
};

export default DatePicker;
