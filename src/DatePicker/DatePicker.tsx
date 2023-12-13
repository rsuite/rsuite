import React, { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import delay from 'lodash/delay';
import debounce from 'lodash/debounce';
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
  composeFunctions,
  createChainedFunction,
  mergeRefs,
  useClassNames,
  useControlled,
  useCustom
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
  setMinutes,
  getMinutes,
  setSeconds,
  getSeconds,
  isValid,
  format,
  getDateMask,
  disabledTime,
  isMatch,
  calendarOnlyProps,
  CalendarOnlyPropsType
} from '../utils/dateUtils';
import {
  PickerOverlay,
  OverlayTriggerHandle,
  pickerPropTypes,
  PickerToggle,
  PickerToggleTrigger,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  PositionChildProps,
  usePickerClassName,
  usePublicMethods,
  useToggleKeyDownEvent,
  PickerToggleProps,
  onMenuKeyDown
} from '../Picker';

import { FormControlBaseProps, PickerBaseProps, RsRefForwardingComponent } from '../@types/common';
import { OverlayCloseCause } from '../Overlay/OverlayTrigger';
import { deprecatePropTypeNew } from '../utils/deprecatePropType';
import { getAriaLabel } from '../Calendar/utils';

export type { RangeType } from './Toolbar';

export interface DatePickerProps
  extends PickerBaseProps<DatePickerLocale>,
    FormControlBaseProps<Date | null>,
    Pick<PickerToggleProps, 'caretAs' | 'readOnly' | 'plaintext' | 'loading'> {
  /** Predefined date Ranges */
  ranges?: RangeType<Date>[];

  /** Calendar panel default presentation date and time */
  calendarDefaultDate?: Date;

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

  /** ISO 8601 standard, each calendar week begins on Monday and Sunday on the seventh day */
  isoWeek?: boolean;

  /** Set the upper limit of the available year relative to the current selection date */
  limitEndYear?: number;

  /** Set the lower limit of the available year relative to the current selection date */
  limitStartYear?: number;

  /** Whether to show week numbers */
  showWeekNumbers?: boolean;

  /** Meridian format */
  showMeridian?: boolean;

  /** one tap to select */
  oneTap?: boolean;

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

  /** Custom render value */
  renderValue?: (value: Date, format: string) => string;
}

type InputState = 'Typing' | 'Error' | 'Initial';

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
      // todo Not consistent with locale.formatDayPattern
      format: formatStr = 'yyyy-MM-dd',
      isoWeek,
      limitEndYear = 1000,
      limitStartYear,
      locale: overrideLocale,
      menuClassName,
      appearance = 'default',
      placement = 'bottomStart',
      oneTap,
      placeholder = '',
      ranges,
      value: valueProp,
      showMeridian,
      showWeekNumbers,
      style,
      toggleAs,
      caretAs: caretAsProp,
      disabledDate: DEPRECATED_disabledDate,
      disabledHours: DEPRECATED_disabledHours,
      disabledMinutes: DEPRECATED_disabledMinutes,
      disabledSeconds: DEPRECATED_disabledSeconds,
      shouldDisableDate,
      shouldDisableHour,
      shouldDisableMinute,
      shouldDisableSecond,
      renderValue,
      onChange,
      onChangeCalendarDate,
      onClean,
      onClose,
      onEntered,
      onExited,
      onNextMonth,
      onOk,
      onOpen,
      onPrevMonth,
      onSelect,
      onToggleMonthDropdown,
      onToggleTimeDropdown,
      onShortcutClick,
      ...rest
    } = props;

    const { locale, formatDate, parseDate } = useCustom<DatePickerLocale>(
      'DatePicker',
      overrideLocale
    );
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

    const [inputState, setInputState] = useState<InputState>();

    const [active, setActive] = useState<boolean>(false);
    const triggerRef = useRef<OverlayTriggerHandle>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLButtonElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    usePublicMethods(ref, { rootRef, triggerRef, overlayRef, targetRef });

    /**
     * Switch to the callback triggered after the next month.
     */
    const handleMoveForward = useCallback(
      (nextPageDate: Date) => {
        setCalendarDate(nextPageDate);

        onNextMonth?.(nextPageDate);
        onChangeCalendarDate?.(nextPageDate);
      },
      [onChangeCalendarDate, onNextMonth, setCalendarDate]
    );

    /**
     * Switch to the callback triggered after the previous month.
     */
    const handleMoveBackward = useCallback(
      (nextPageDate: Date) => {
        setCalendarDate(nextPageDate);

        onPrevMonth?.(nextPageDate);
        onChangeCalendarDate?.(nextPageDate);
      },
      [onChangeCalendarDate, onPrevMonth, setCalendarDate]
    );

    /**
     * The callback triggered when the date changes.
     */
    const handleDateChange = useCallback(
      (nextValue: Date, event?: React.SyntheticEvent) => {
        onSelect?.(nextValue, event);
        onChangeCalendarDate?.(nextValue, event);
      },
      [onChangeCalendarDate, onSelect]
    );

    /**
     *  A callback triggered when the time on the calendar changes.
     */
    const handleChangeTime = useCallback(
      (nextPageTime: Date) => {
        setCalendarDate(nextPageTime);
        handleDateChange(nextPageTime);
      },
      [handleDateChange, setCalendarDate]
    );

    const handleClose = useCallback(() => {
      triggerRef.current?.close?.();
    }, []);

    /**
     * The callback triggered when PM/AM is switched.
     */
    const handleToggleMeridian = useCallback(() => {
      const hours = getHours(calendarDate);
      const nextHours = hours >= 12 ? hours - 12 : hours + 12;
      const nextDate = setHours(calendarDate, nextHours);

      handleChangeTime(nextDate);
    }, [calendarDate, handleChangeTime]);

    const updateValue = useCallback(
      (event: React.SyntheticEvent, nextPageDate?: Date | null, closeOverlay = true) => {
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
      },
      [handleClose, onChange, calendarDate, setCalendarDate, setValue, value]
    );

    /**
     * The callback triggered after the date in the shortcut area is clicked.
     */
    const handleShortcutPageDate = useCallback(
      (range: RangeType<Date>, closeOverlay: boolean, event: React.MouseEvent) => {
        const value = range.value as Date;

        updateValue(event, value, closeOverlay);
        handleDateChange(value, event);
        onShortcutClick?.(range, event);
      },
      [handleDateChange, onShortcutClick, updateValue]
    );

    /**
     * Get the corresponding container based on date selection and month selection
     */
    const getOverlayContainer = useCallback(() => {
      return overlayRef.current?.querySelector(
        showMonth ? '[role="menu"]' : '[role="grid"]'
      ) as HTMLElement;
    }, [showMonth]);

    /**
     * Check whether the date is focusable
     */
    const checkFocusable = useCallback(
      (date: Date) => {
        const formatStr = showMonth ? locale.formattedMonthPattern : locale.formattedDayPattern;
        const ariaLabel = getAriaLabel(date, formatStr as string, formatDate);
        const container = getOverlayContainer();

        const dateElement = container.querySelector(`[aria-label="${ariaLabel}"]`);

        if (dateElement?.hasAttribute('aria-disabled')) {
          return false;
        }

        return true;
      },
      [formatDate, getOverlayContainer, locale, showMonth]
    );

    /**
     * Focus on the currently selected date element
     */
    const focusSelectedDate = useCallback(() => {
      delay(() => {
        const container = getOverlayContainer();

        const selectedElement = container?.querySelector('[aria-selected="true"]') as HTMLElement;
        selectedElement?.focus();
      }, 1);
    }, [getOverlayContainer]);

    /**
     * Focus on the input element
     */
    const focusTargetButton = useCallback(() => {
      delay(() => {
        targetRef.current?.querySelector('input')?.focus();
      }, 100);
    }, []);

    /**
     * The callback triggered after clicking the OK button.
     */
    const handleOK = useCallback(
      (event: React.SyntheticEvent) => {
        updateValue(event);
        onOk?.(calendarDate, event);
        focusTargetButton();
      },
      [updateValue, onOk, calendarDate, focusTargetButton]
    );

    /**
     * Callback after clicking the clear button.
     */
    const handleClean = useCallback(
      (event: React.SyntheticEvent) => {
        updateValue(event, null);
        resetCalendarDate(null);
      },
      [resetCalendarDate, updateValue]
    );

    const handlePickerToggleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        const tagName = (event.target as HTMLElement)?.tagName;

        if (tagName === 'INPUT') {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            focusSelectedDate();
          } else if (event.key === 'Enter') {
            triggerRef.current?.open?.();
          }
        }
      },
      [focusSelectedDate]
    );

    const handlePickerOverlayKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
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
      },
      [showMonth, calendarDate, checkFocusable, handleOK, setCalendarDate, focusSelectedDate]
    );

    /**
     * The callback triggered after the month selection box is opened or closed.
     */
    const handleToggleMonthDropdown = useCallback(
      (toggle: boolean) => {
        onToggleMonthDropdown?.(toggle);
        setShowMonthDropdown(toggle);
      },
      [onToggleMonthDropdown]
    );

    /**
     * Handle keyboard events.
     */
    const onPickerKeyDown = useToggleKeyDownEvent({
      triggerRef,
      targetRef,
      overlayRef,
      active,
      onExit: handleClean,
      onKeyDown: handlePickerToggleKeyDown,
      ...rest
    });

    /**
     * Callback after the date is selected.
     */
    const handleSelect = useCallback(
      (nextValue: Date, event: React.SyntheticEvent, updatableValue = true) => {
        setCalendarDate(
          // Determine whether the current value contains time, if not, use calendarDate.
          shouldRenderTime(formatStr)
            ? nextValue
            : composeFunctions(
                (d: Date) => setHours(d, getHours(calendarDate)),
                (d: Date) => setMinutes(d, getMinutes(calendarDate)),
                (d: Date) => setSeconds(d, getSeconds(calendarDate))
              )(nextValue)
        );

        handleDateChange(nextValue);
        if (oneTap && updatableValue) {
          updateValue(event, nextValue);
        }
      },
      [setCalendarDate, formatStr, handleDateChange, oneTap, calendarDate, updateValue]
    );

    /**
     *  A callback triggered when the date on the calendar changes.
     */
    const handleChangeMonth = useCallback(
      (nextPageDate: Date, event: React.MouseEvent) => {
        setCalendarDate(nextPageDate);
        handleDateChange(nextPageDate);
        focusSelectedDate();

        if (oneTap && onlyShowMonth) {
          updateValue(event, nextPageDate);
        }
      },
      [focusSelectedDate, handleDateChange, oneTap, onlyShowMonth, setCalendarDate, updateValue]
    );

    const isDateDisabled = useCallback(
      (date: Date): boolean => {
        if (typeof shouldDisableDate === 'function') {
          return shouldDisableDate(date);
        }

        if (typeof DEPRECATED_disabledDate === 'function') {
          return DEPRECATED_disabledDate(date);
        }

        return false;
      },
      [DEPRECATED_disabledDate, shouldDisableDate]
    );

    /**
     * Callback after the input box value is changed.
     */
    const handleInputChange = useCallback(
      (value, event) => {
        setInputState('Typing');

        // isMatch('01/11/2020', 'MM/dd/yyyy') ==> true
        // isMatch('2020-11-01', 'MM/dd/yyyy') ==> false
        if (!isMatch(value, formatStr, { locale: locale.dateLocale })) {
          setInputState('Error');

          return;
        }

        let date = parseDate(value, formatStr);

        // If only the time is included in the characters, it will default to today.
        if (shouldOnlyRenderTime(formatStr)) {
          date = new Date(`${format(new Date(), 'yyyy-MM-dd')} ${value}`);
        }

        if (!isValid(date)) {
          setInputState('Error');
          return;
        }

        if (isDateDisabled(date)) {
          setInputState('Error');
          return;
        }

        handleSelect(date, event, false);
      },
      [formatStr, locale, parseDate, isDateDisabled, handleSelect]
    );

    /**
     * The callback after the enter key is triggered on the input
     */
    const handleInputPressEnd = useCallback(
      event => {
        if (inputState === 'Typing') {
          updateValue(event, calendarDate);
        }
        setInputState('Initial');
      },
      [inputState, calendarDate, updateValue]
    );

    const handleInputBackspace = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;

        // When the input box is empty, the date is cleared.
        if (value === '') {
          handleClean(event);
        }
      },
      [handleClean]
    );

    const handleEntered = useCallback(() => {
      onOpen?.();
      setActive(true);
    }, [onOpen]);

    const handleExited = useCallback(() => {
      onClose?.();
      setActive(false);
    }, [onClose]);

    // Check whether the time is within the time range of the shortcut option in the toolbar.
    const disabledToolbarHandle = useCallback(
      (date: Date): boolean => {
        const allowDate = DEPRECATED_disabledDate?.(date) ?? false;
        const allowTime = disabledTime(props, date);

        return allowDate || allowTime;
      },
      [DEPRECATED_disabledDate, props]
    );

    /**
     * Whether "OK" button is disabled
     *
     * - If format is date, disable ok button if selected date is disabled
     * - If format is month, disable ok button if all dates in the month of selected date are disabled
     */
    const isOKButtonDisabled = useCallback(
      (selectedDate: Date): boolean => {
        if (shouldRenderMonth(formatStr) && !shouldRenderDate(formatStr)) {
          return isEveryDateInMonth(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            disabledToolbarHandle
          );
        }

        return disabledToolbarHandle(selectedDate);
      },
      [disabledToolbarHandle, formatStr]
    );

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

    const calendar = (
      <CalendarContainer
        {...calendarProps}
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
        onMoveForward={handleMoveForward}
        onMoveBackward={handleMoveBackward}
        onSelect={handleSelect}
        onToggleMonthDropdown={handleToggleMonthDropdown}
        onToggleTimeDropdown={onToggleTimeDropdown}
        onChangeMonth={handleChangeMonth}
        onChangeTime={handleChangeTime}
        onToggleMeridian={handleToggleMeridian}
      />
    );

    // The shortcut option on the left side of the calendar panel
    const sideRanges = ranges?.filter(range => range?.placement === 'left') || [];

    // The shortcut option on the bottom of the calendar panel
    const bottomRanges =
      ranges?.filter(range => range?.placement === 'bottom' || range?.placement === undefined) ||
      [];

    const renderDropdownMenu = (positionProps: PositionChildProps, speakerRef) => {
      const { left, top, className } = positionProps;
      const classes = merge(menuClassName, className, prefix('date-menu'));
      const styles = { left, top };
      return (
        <PickerOverlay
          role="dialog"
          className={classes}
          ref={mergeRefs(overlayRef, speakerRef)}
          style={styles}
          target={triggerRef}
          onKeyDown={handlePickerOverlayKeyDown}
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

            <>
              {calendar}
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
            </>
          </Stack>
        </PickerOverlay>
      );
    };

    const hasValue = !!value;

    const [classes, usedClassNamePropKeys] = usePickerClassName({
      ...props,
      classPrefix,
      name: 'date',
      appearance,
      hasValue,
      cleanable
    });

    const renderDate = useCallback(() => {
      if (!value) {
        return placeholder || formatStr;
      }

      return renderValue?.(value, formatStr) ?? formatDate(value, formatStr);
    }, [formatStr, formatDate, placeholder, renderValue, value]);

    const caretAs = useMemo(
      () => caretAsProp || (shouldOnlyRenderTime(formatStr) ? IconClockO : IconCalendar),
      [caretAsProp, formatStr]
    );

    const handleTriggerClose = useCallback(
      cause => {
        // Unless overlay is closing on user clicking "OK" button,
        // reset the selected date on calendar panel
        if (cause !== OverlayCloseCause.ImperativeHandle) {
          resetCalendarDate();
        }

        setShowMonthDropdown(false);
      },
      [resetCalendarDate]
    );

    return (
      <PickerToggleTrigger
        trigger="active"
        pickerProps={pick(props, pickTriggerPropKeys)}
        ref={triggerRef}
        placement={placement}
        onClose={handleTriggerClose}
        onEntered={createChainedFunction(handleEntered, onEntered)}
        onExited={createChainedFunction(handleExited, onExited)}
        speaker={renderDropdownMenu}
      >
        <Component className={merge(className, classes)} style={style} ref={rootRef}>
          <PickerToggle
            {...omit(rest, [
              ...omitTriggerPropKeys,
              ...usedClassNamePropKeys,
              ...calendarOnlyProps
            ])}
            className={prefix({ error: inputState === 'Error' })}
            as={toggleAs}
            ref={targetRef}
            appearance={appearance}
            editable={editable}
            inputValue={value ? formatDate(value, formatStr) : ''}
            inputPlaceholder={
              typeof placeholder === 'string' && placeholder ? placeholder : formatStr
            }
            inputMask={getDateMask(formatStr)}
            onInputChange={handleInputChange}
            onInputBlur={handleInputPressEnd}
            onInputPressEnter={handleInputPressEnd}
            onInputBackspace={debounce(handleInputBackspace, 10)}
            onKeyDown={onPickerKeyDown}
            onClean={createChainedFunction(handleClean, onClean)}
            cleanable={cleanable && !disabled}
            hasValue={hasValue}
            active={active}
            placement={placement}
            disabled={disabled}
            caretAs={caretAs}
            aria-haspopup="dialog"
          >
            {renderDate()}
          </PickerToggle>
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
  panelContainerRef: PropTypes.any,
  ranges: PropTypes.array,
  showMeridian: PropTypes.bool,
  showWeekNumbers: PropTypes.bool,
  value: PropTypes.instanceOf(Date)
};

export default DatePicker;
