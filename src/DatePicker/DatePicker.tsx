import React, { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import { Calendar, CalendarLocale, CalendarState } from '../Calendar';
import Toolbar, { RangeType } from './Toolbar';

import {
  composeFunctions,
  createChainedFunction,
  DateUtils,
  mergeRefs,
  TimeZone,
  useClassNames,
  useControlled,
  useCustom
} from '../utils';

import {
  MenuWrapper,
  OverlayTriggerInstance,
  pickerDefaultProps,
  pickerPropTypes,
  PickerToggle,
  PickerToggleTrigger,
  pickTriggerPropKeys,
  omitTriggerPropKeys,
  PositionChildProps,
  usePickerClassName,
  usePublicMethods,
  useToggleKeyDownEvent
} from '../Picker';

import {
  FormControlBaseProps,
  PickerBaseProps,
  RsRefForwardingComponent,
  TimeZoneName
} from '../@types/common';

import { useCalendarState } from './utils';

export type { RangeType } from './Toolbar';

export interface DatePickerProps
  extends PickerBaseProps<CalendarLocale>,
    FormControlBaseProps<Date> {
  /** Configure shortcut options */
  ranges?: RangeType[];

  /** Calendar panel default presentation date and time */
  calendarDefaultDate?: Date;

  /** Format date */
  format?: string;

  /** IANA Time zone */
  timeZone?: TimeZoneName;

  /** Display date panel when component initial */
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
  onChangeCalendarDate?: (date: Date, event?: React.SyntheticEvent<HTMLElement>) => void;

  /** Called when opening the month view */
  onToggleMonthDropdown?: (toggle: boolean) => void;

  /** Called when opening the time view */
  onToggleTimeDropdown?: (toggle: boolean) => void;

  /** Called when the option is selected */
  onSelect?: (date: Date, event?: React.SyntheticEvent<HTMLElement>) => void;

  /** Called after the prev month */
  onPrevMonth?: (date: Date) => void;

  /** Called after the next month */
  onNextMonth?: (date: Date) => void;

  /** Called after clicking the OK button */
  onOk?: (date: Date, event: React.SyntheticEvent<HTMLElement>) => void;

  /** Called when clean */
  onClean?: (event: React.MouseEvent) => void;

  /** Custom render value */
  renderValue?: (value: Date, format: string) => React.ReactNode;
}

const defaultProps: Partial<DatePickerProps> = {
  ...pickerDefaultProps,
  as: 'div',
  classPrefix: 'picker',
  format: 'yyyy-MM-dd',
  limitEndYear: 1000,
  placeholder: ''
};

const DatePicker: RsRefForwardingComponent<'div', DatePickerProps> = React.forwardRef(
  (props: DatePickerProps, ref) => {
    const {
      as: Component,
      className,
      classPrefix,
      calendarDefaultDate,
      cleanable,
      defaultValue,
      disabled,
      format: formatStr,
      inline,
      isoWeek,
      limitEndYear,
      locale: overrideLocale,
      menuClassName,
      placement,
      oneTap,
      placeholder,
      ranges,
      value: valueProp,
      showMeridian,
      showWeekNumbers,
      style,
      timeZone,
      toggleAs,
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

    const { locale, formatDate } = useCustom<CalendarLocale>('DatePicker', overrideLocale);
    const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);

    // Format the value according to the time zone.
    const formatValue = useCallback(v => TimeZone.toTimeZone(v, timeZone), [timeZone]);

    const [value, setValue] = useControlled<Date>(valueProp, defaultValue, formatValue);

    const [pageDate, setPageDate] = useState(
      TimeZone.toTimeZone(value ?? calendarDefaultDate ?? new Date(), timeZone)
    );

    const { calendarState, reset, openMonth, openTime } = useCalendarState();
    const [active, setActive] = useState<boolean>(false);
    const triggerRef = useRef<OverlayTriggerInstance>();
    const rootRef = useRef<HTMLDivElement>();
    const toggleRef = useRef<HTMLButtonElement>();
    const menuRef = useRef<HTMLDivElement>();

    usePublicMethods(ref, { rootRef, triggerRef, menuRef, toggleRef });

    const getLocalPageDate = useCallback(
      (date = pageDate) => TimeZone.toLocalTimeZone(date, timeZone),
      [pageDate, timeZone]
    );

    /**
     * Switch to the callback triggered after the next month.
     */
    const handleMoveForward = useCallback(
      (nextPageDate: Date) => {
        setPageDate(nextPageDate);

        nextPageDate = getLocalPageDate(nextPageDate);
        onNextMonth?.(nextPageDate);
        onChangeCalendarDate?.(nextPageDate);
      },
      [getLocalPageDate, onChangeCalendarDate, onNextMonth]
    );

    /**
     * Switch to the callback triggered after the previous month.
     */
    const handleMoveBackward = useCallback(
      (nextPageDate: Date) => {
        setPageDate(nextPageDate);

        nextPageDate = getLocalPageDate(nextPageDate);
        onPrevMonth?.(nextPageDate);
        onChangeCalendarDate?.(nextPageDate);
      },
      [getLocalPageDate, onChangeCalendarDate, onPrevMonth]
    );

    /**
     * The callback triggered when the date changes.
     */
    const handleDateChange = useCallback(
      (nextValue: Date, event?: React.SyntheticEvent<any>) => {
        nextValue = TimeZone.toLocalTimeZone(nextValue, timeZone);
        onSelect?.(nextValue, event);
        onChangeCalendarDate?.(nextValue, event);
      },
      [onChangeCalendarDate, onSelect, timeZone]
    );

    /**
     *  A callback triggered when the date on the calendar changes.
     */
    const handleChangePageDate = useCallback(
      (nextPageDate: Date) => {
        setPageDate(nextPageDate);
        reset();
        handleDateChange(nextPageDate);
      },
      [handleDateChange, reset]
    );

    /**
     *  A callback triggered when the time on the calendar changes.
     */
    const handleChangePageTime = useCallback(
      (nextPageTime: Date) => {
        setPageDate(nextPageTime);
        handleDateChange(nextPageTime);
      },
      [handleDateChange]
    );

    const handleClose = useCallback(() => {
      triggerRef.current?.close?.();
    }, []);

    /**
     * The callback triggered when PM/AM is switched.
     */
    const handleToggleMeridian = useCallback(() => {
      const hours = DateUtils.getHours(pageDate);
      const nextHours = hours >= 12 ? hours - 12 : hours + 12;
      const nextDate = DateUtils.setHours(pageDate, nextHours);
      setPageDate(nextDate);
    }, [pageDate]);

    const updateValue = useCallback(
      (event: React.SyntheticEvent<any>, nextPageDate?: Date | null, closeOverlay = true) => {
        const nextValue: Date = typeof nextPageDate !== 'undefined' ? nextPageDate : pageDate;

        setPageDate(nextValue || new Date());
        setValue(nextValue);

        if (nextValue !== value || !DateUtils.isSameDay(nextValue, value)) {
          onChange?.(getLocalPageDate(nextValue), event);
        }

        // `closeOverlay` default value is `true`
        if (closeOverlay !== false) {
          handleClose();
        }
      },
      [getLocalPageDate, handleClose, onChange, pageDate, setValue, value]
    );

    /**
     * The callback triggered after the date in the shortcut area is clicked.
     */
    const handleShortcutPageDate = useCallback(
      (value: Date, closeOverlay?: boolean, event?: React.SyntheticEvent<any>) => {
        updateValue(event, value, closeOverlay);
        handleDateChange(value, event);
      },
      [handleDateChange, updateValue]
    );

    const handleOK = useCallback(
      (event: React.SyntheticEvent<any>) => {
        updateValue(event);
        onOk?.(getLocalPageDate(), event);
      },
      [getLocalPageDate, updateValue, onOk]
    );

    const handleMonthDropdown = useCallback(() => {
      if (calendarState === CalendarState.DROP_MONTH) {
        reset();
      } else {
        openMonth();
      }

      onToggleMonthDropdown?.(calendarState !== CalendarState.DROP_MONTH);
    }, [calendarState, onToggleMonthDropdown, openMonth, reset]);

    const handleTimeDropdown = useCallback(() => {
      if (calendarState === CalendarState.DROP_TIME) {
        reset();
      } else {
        openTime();
      }

      onToggleTimeDropdown?.(calendarState !== CalendarState.DROP_TIME);
    }, [calendarState, onToggleTimeDropdown, openTime, reset]);

    const handleClean = useCallback(
      (event: React.SyntheticEvent) => {
        setPageDate(TimeZone.toTimeZone(new Date(), timeZone));
        updateValue(event, null);
      },
      [updateValue, timeZone]
    );

    const onPickerKeyDown = useToggleKeyDownEvent({
      triggerRef,
      toggleRef,
      active,
      onExit: handleClean,
      ...rest
    });

    const handleSelect = useCallback(
      (nextValue: Date, event: React.SyntheticEvent) => {
        setPageDate(
          composeFunctions(
            (d: Date) => DateUtils.setHours(d, DateUtils.getHours(pageDate)),
            (d: Date) => DateUtils.setMinutes(d, DateUtils.getMinutes(pageDate)),
            (d: Date) => DateUtils.setSeconds(d, DateUtils.getSeconds(pageDate))
          )(nextValue)
        );

        handleDateChange(nextValue);
        oneTap && updateValue(event, nextValue);
      },
      [handleDateChange, updateValue, oneTap, pageDate]
    );

    const handleEntered = useCallback(() => {
      onOpen?.();
      setActive(true);
    }, [onOpen]);

    const handleExited = useCallback(() => {
      onClose?.();
      reset();
      setActive(false);
    }, [onClose, reset]);

    const disabledDate = useCallback(
      (date?: Date) => disabledDateProp?.(TimeZone.toLocalTimeZone(date, timeZone)),
      [disabledDateProp, timeZone]
    );

    // Check whether the time is within the time range of the shortcut option in the toolbar.
    const disabledToolbarHandle = useCallback(
      (date?: Date): boolean => {
        const localTimeZoneDate = TimeZone.toLocalTimeZone(date, timeZone);
        const allowDate = disabledDateProp?.(localTimeZoneDate) ?? false;
        const allowTime = DateUtils.disabledTime(props, localTimeZoneDate);

        return allowDate || allowTime;
      },
      [disabledDateProp, props, timeZone]
    );

    const calendarProps = useMemo(
      () =>
        mapValues(
          pick<DatePickerProps, DateUtils.CalendarOnlyPropsType>(
            props,
            DateUtils.calendarOnlyProps
          ),
          disabledOrHiddenTimeFunc => (next: number, date: Date): boolean =>
            disabledOrHiddenTimeFunc(next, TimeZone.toLocalTimeZone(date, timeZone))
        ),
      [props, timeZone]
    );

    const calendar = (
      <Calendar
        {...calendarProps}
        locale={locale}
        showWeekNumbers={showWeekNumbers}
        showMeridian={showMeridian}
        disabledDate={disabledDate}
        limitEndYear={limitEndYear}
        format={formatStr}
        timeZone={timeZone}
        isoWeek={isoWeek}
        calendarState={calendarState}
        pageDate={pageDate}
        onMoveForward={handleMoveForward}
        onMoveBackward={handleMoveBackward}
        onSelect={handleSelect}
        onToggleMonthDropdown={handleMonthDropdown}
        onToggleTimeDropdown={handleTimeDropdown}
        onChangePageDate={handleChangePageDate}
        onChangePageTime={handleChangePageTime}
        onToggleMeridian={handleToggleMeridian}
      />
    );

    const renderDropdownMenu = (positionProps: PositionChildProps, speakerRef) => {
      const { left, top, className } = positionProps;
      const classes = merge(menuClassName, className, prefix('date-menu'));
      const styles = { left, top };
      return (
        <MenuWrapper
          className={classes}
          ref={mergeRefs(menuRef, speakerRef)}
          style={styles}
          target={triggerRef}
        >
          {calendar}
          <Toolbar
            locale={locale}
            timeZone={timeZone}
            ranges={ranges}
            pageDate={pageDate}
            disabledOkBtn={disabledToolbarHandle}
            disabledShortcut={disabledToolbarHandle}
            onShortcut={handleShortcutPageDate}
            onOk={handleOK}
            hideOkBtn={oneTap}
          />
        </MenuWrapper>
      );
    };

    const hasValue = !!value;

    const [classes, usedClassNamePropKeys] = usePickerClassName({ ...props, name: 'date', hasValue });

    const renderDate = useCallback(() => {
      if (!value) {
        return placeholder || formatStr;
      }

      return renderValue?.(value, formatStr) ?? formatDate(value, formatStr);
    }, [formatStr, formatDate, placeholder, renderValue, value]);

    if (inline) {
      return (
        <Component ref={rootRef} className={merge(className, withClassPrefix('date-inline'))}>
          {calendar}
        </Component>
      );
    }

    return (
      <PickerToggleTrigger
        pickerProps={pick(props, pickTriggerPropKeys)}
        ref={triggerRef}
        placement={placement}
        onEntered={createChainedFunction(handleEntered, onEntered)}
        onExited={createChainedFunction(handleExited, onExited)}
        speaker={renderDropdownMenu}
      >
        <Component
          className={merge(
            className,
            classes,
            prefix({ 'date-only-time': DateUtils.shouldOnlyTime(formatStr) })
          )}
          style={style}
          ref={rootRef}
        >
          <PickerToggle
            {...omit(rest, [
              ...omitTriggerPropKeys,
              ...usedClassNamePropKeys,
              ...DateUtils.calendarOnlyProps
            ])}
            as={toggleAs}
            ref={toggleRef}
            onKeyDown={onPickerKeyDown}
            onClean={createChainedFunction(handleClean, onClean)}
            cleanable={cleanable && !disabled}
            hasValue={hasValue}
            active={active}
          >
            {renderDate()}
          </PickerToggle>
        </Component>
      </PickerToggleTrigger>
    );
  }
);

DatePicker.displayName = 'DatePicker';
DatePicker.defaultProps = defaultProps;
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
  inline: PropTypes.bool,
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
  timeZone: PropTypes.string,
  value: PropTypes.instanceOf(Date)
};

export default DatePicker;
