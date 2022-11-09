import React, { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import IconCalendar from '@rsuite/icons/legacy/Calendar';
import IconClockO from '@rsuite/icons/legacy/ClockO';
import CalendarContainer from '../Calendar/CalendarContainer';
import useCalendarDate from '../Calendar/useCalendarDate';
import Toolbar, { RangeType } from './Toolbar';
import Stack from '../Stack';
import PredefinedRanges from './PredefinedRanges';
import { DatePickerLocale } from '../locales';
import {
  composeFunctions,
  createChainedFunction,
  DateUtils,
  mergeRefs,
  useClassNames,
  useControlled,
  useCustom
} from '../utils';

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
  PickerToggleProps
} from '../Picker';

import { FormControlBaseProps, PickerBaseProps, RsRefForwardingComponent } from '../@types/common';
import { OverlayCloseCause } from '../Overlay/OverlayTrigger';

export type { RangeType } from './Toolbar';

export interface DatePickerProps
  extends PickerBaseProps<DatePickerLocale>,
    FormControlBaseProps<Date | null>,
    Pick<PickerToggleProps, 'caretAs' | 'readOnly' | 'plaintext'> {
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

  /** Set the lower limit of the available year relative to the current selection date */
  limitEndYear?: number;

  /** Whether to show week numbers */
  showWeekNumbers?: boolean;

  /** Meridian format */
  showMeridian?: boolean;

  /** one tap to select */
  oneTap?: boolean;

  /** Disabled date */
  disabledDate?: (date?: Date) => boolean;

  /** Disabled hours */
  disabledHours?: (hour: number, date: Date) => boolean;

  /** Disabled minutes */
  disabledMinutes?: (minute: number, date: Date) => boolean;

  /** Disabled seconds */
  disabledSeconds?: (second: number, date: Date) => boolean;

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
      disabledDate: disabledDateProp,
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
      ...rest
    } = props;

    const { locale, formatDate, parseDate } = useCustom<DatePickerLocale>(
      'DatePicker',
      overrideLocale
    );
    const { merge, prefix } = useClassNames(classPrefix);

    const [value, setValue] = useControlled(valueProp, defaultValue);
    const { calendarDate, setCalendarDate, resetCalendarDate } = useCalendarDate(
      valueProp,
      calendarDefaultDate
    );
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
      const hours = DateUtils.getHours(calendarDate);
      const nextHours = hours >= 12 ? hours - 12 : hours + 12;
      const nextDate = DateUtils.setHours(calendarDate, nextHours);
      setCalendarDate(nextDate);
    }, [calendarDate, setCalendarDate]);

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
      (value: Date, closeOverlay: boolean, event: React.SyntheticEvent) => {
        updateValue(event, value, closeOverlay);
        handleDateChange(value, event);
      },
      [handleDateChange, updateValue]
    );

    /**
     * The callback triggered after clicking the OK button.
     */
    const handleOK = useCallback(
      (event: React.SyntheticEvent) => {
        updateValue(event);
        onOk?.(calendarDate, event);
      },
      [updateValue, onOk, calendarDate]
    );

    /**
     * Callback after clicking the clear button.
     */
    const handleClean = useCallback(
      (event: React.SyntheticEvent) => {
        updateValue(event, null);
        resetCalendarDate();
      },
      [resetCalendarDate, updateValue]
    );

    /**
     * Handle keyboard events.
     */
    const onPickerKeyDown = useToggleKeyDownEvent({
      triggerRef,
      targetRef,
      active,
      onExit: handleClean,
      ...rest
    });

    /**
     * Callback after the date is selected.
     */
    const handleSelect = useCallback(
      (nextValue: Date, event: React.SyntheticEvent, updatableValue = true) => {
        setCalendarDate(
          // Determine whether the current value contains time, if not, use calendarDate.
          DateUtils.shouldRenderTime(formatStr)
            ? nextValue
            : composeFunctions(
                (d: Date) => DateUtils.setHours(d, DateUtils.getHours(calendarDate)),
                (d: Date) => DateUtils.setMinutes(d, DateUtils.getMinutes(calendarDate)),
                (d: Date) => DateUtils.setSeconds(d, DateUtils.getSeconds(calendarDate))
              )(nextValue)
        );

        handleDateChange(nextValue);
        if (oneTap && updatableValue) {
          updateValue(event, nextValue);
        }
      },
      [formatStr, handleDateChange, oneTap, calendarDate, setCalendarDate, updateValue]
    );

    /**
     *  A callback triggered when the date on the calendar changes.
     */
    const handleChangeMonth = useCallback(
      (nextPageDate: Date, event: React.MouseEvent) => {
        setCalendarDate(nextPageDate);
        handleDateChange(nextPageDate);

        // Show only the calendar month panel. formatStr = 'yyyy-MM'
        const onlyShowMonth =
          DateUtils.shouldRenderMonth(formatStr) && !DateUtils.shouldRenderDate(formatStr);

        if (oneTap && onlyShowMonth) {
          updateValue(event, nextPageDate);
        }
      },
      [formatStr, handleDateChange, oneTap, setCalendarDate, updateValue]
    );

    const disabledDate = useCallback(
      (date: Date): boolean => disabledDateProp?.(date) ?? false,
      [disabledDateProp]
    );

    /**
     * Callback after the input box value is changed.
     */
    const handleInputChange = useCallback(
      (value, event) => {
        setInputState('Typing');

        // isMatch('01/11/2020', 'MM/dd/yyyy') ==> true
        // isMatch('2020-11-01', 'MM/dd/yyyy') ==> false
        if (!DateUtils.isMatch(value, formatStr, { locale: locale.dateLocale })) {
          setInputState('Error');

          return;
        }

        let date = parseDate(value, formatStr);

        // If only the time is included in the characters, it will default to today.
        if (DateUtils.shouldOnlyRenderTime(formatStr)) {
          date = new Date(`${DateUtils.format(new Date(), 'yyyy-MM-dd')} ${value}`);
        }

        if (!DateUtils.isValid(date)) {
          setInputState('Error');
          return;
        }

        if (disabledDate(date)) {
          setInputState('Error');
          return;
        }

        handleSelect(date, event, false);
      },
      [formatStr, locale, parseDate, disabledDate, handleSelect]
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
        const allowDate = disabledDateProp?.(date) ?? false;
        const allowTime = DateUtils.disabledTime(props, date);

        return allowDate || allowTime;
      },
      [disabledDateProp, props]
    );

    const calendarProps = useMemo(
      () =>
        mapValues(
          pick<DatePickerProps, DateUtils.CalendarOnlyPropsType>(
            props,
            DateUtils.calendarOnlyProps
          ),
          disabledOrHiddenTimeFunc =>
            (next: number, date: Date): boolean =>
              disabledOrHiddenTimeFunc?.(next, date) ?? false
        ),
      [props]
    );

    const inSameMonth = useCallback(
      (date: Date) => DateUtils.isSameMonth(date, calendarDate),
      [calendarDate]
    );

    const calendar = (
      <CalendarContainer
        {...calendarProps}
        locale={locale}
        showWeekNumbers={showWeekNumbers}
        showMeridian={showMeridian}
        disabledDate={disabledDate}
        limitEndYear={limitEndYear}
        format={formatStr}
        isoWeek={isoWeek}
        inSameMonth={inSameMonth}
        calendarDate={calendarDate}
        onMoveForward={handleMoveForward}
        onMoveBackward={handleMoveBackward}
        onSelect={handleSelect}
        onToggleMonthDropdown={onToggleMonthDropdown}
        onToggleTimeDropdown={onToggleTimeDropdown}
        onChangeMonth={handleChangeMonth}
        onChangeTime={handleChangeTime}
        onToggleMeridian={handleToggleMeridian}
      />
    );

    const sideRanges = ranges?.filter(range => range?.placement === 'left') || [];
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
                onClickShortcut={handleShortcutPageDate}
              />
            )}

            <>
              {calendar}
              <Toolbar
                locale={locale}
                ranges={bottomRanges}
                calendarDate={calendarDate}
                disabledOkBtn={disabledToolbarHandle}
                disabledShortcut={disabledToolbarHandle}
                onClickShortcut={handleShortcutPageDate}
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
      () => caretAsProp || (DateUtils.shouldOnlyRenderTime(formatStr) ? IconClockO : IconCalendar),
      [caretAsProp, formatStr]
    );

    return (
      <PickerToggleTrigger
        trigger="active"
        pickerProps={pick(props, pickTriggerPropKeys)}
        ref={triggerRef}
        placement={placement}
        onClose={cause => {
          // Unless overlay is closing on user clicking "OK" button,
          // reset the selected date on calendar panel
          if (cause !== OverlayCloseCause.ImperativeHandle) {
            resetCalendarDate();
          }
        }}
        onEntered={createChainedFunction(handleEntered, onEntered)}
        onExited={createChainedFunction(handleExited, onExited)}
        speaker={renderDropdownMenu}
      >
        <Component className={merge(className, classes)} style={style} ref={rootRef}>
          <PickerToggle
            {...omit(rest, [
              ...omitTriggerPropKeys,
              ...usedClassNamePropKeys,
              ...DateUtils.calendarOnlyProps
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
            inputMask={DateUtils.getDateMask(formatStr)}
            onInputChange={handleInputChange}
            onInputBlur={handleInputPressEnd}
            onInputPressEnter={handleInputPressEnd}
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
  disabledDate: PropTypes.func,
  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  disabledSeconds: PropTypes.func,
  format: PropTypes.string,
  hideHours: PropTypes.func,
  hideMinutes: PropTypes.func,
  hideSeconds: PropTypes.func,
  isoWeek: PropTypes.bool,
  limitEndYear: PropTypes.number,
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
