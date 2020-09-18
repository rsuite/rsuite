import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import {
  addDays,
  addMonths,
  compareAsc,
  endOfISOWeek,
  endOfMonth,
  endOfWeek,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfISOWeek,
  startOfMonth,
  startOfWeek
} from '../utils/dateUtils';
import FormattedDate from '../IntlProvider/FormattedDate';
import Toolbar from '../DatePicker/Toolbar';
import Panel from './Panel';
import {
  getCalendarDate,
  isSameValueType,
  setTimingMargin,
  toLocalValue,
  toZonedValue
} from './utils';
import { createChainedFunction, useClassNames, useControlled, useCustom } from '../utils';
import { MenuWrapper, PickerToggle, PickerToggleTrigger, usePickerClassName } from '../Picker';
import { DATERANGE_DISABLED_TARGET } from '../constants';
import { pickerDefaultProps, pickerPropTypes } from '../Picker/propTypes';
import { toLocalTimeZone } from '../utils/timeZone';
import { FormControlBaseProps, PickerBaseProps, RsRefForwardingComponent } from '../@types/common';
import * as utils from './disabledDateUtils';
import { DisabledDateFunction, RangeType, ValueType } from './types';
import omitBy from 'lodash/omitBy';
import { OverlayTriggerInstance } from '../Overlay/OverlayTrigger';

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
  onClean?: (event: React.SyntheticEvent<HTMLElement>) => void;

  /** Custom render value */
  renderValue?: (value: ValueType, format: string) => React.ReactNode;
}

interface DateRangePickerComponent extends RsRefForwardingComponent<'div', DateRangePickerProps> {
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

const defaultProps: Partial<DateRangePickerProps> = {
  ...pickerDefaultProps,
  as: 'div',
  classPrefix: 'picker',
  format: 'yyyy-MM-dd',
  limitEndYear: 1000,
  placeholder: '',
  showOneCalendar: false
};

const DateRangePicker: RsRefForwardingComponent<'div', DateRangePickerProps> = React.forwardRef(
  (props: DateRangePickerProps, ref) => {
    const {
      as: Component,
      disabled,
      cleanable,
      locale: overrideLocale,
      toggleAs,
      style,
      onEntered,
      onEnter,
      onExited,
      onClean,
      value: valueProp,
      timeZone,
      defaultValue,
      defaultCalendarValue,
      format,
      placeholder,
      renderValue,
      isoWeek,
      hoverRange,
      onChange,
      onOk,
      onSelect,
      oneTap,
      disabledDate: disabledDateProp,
      classPrefix,
      menuClassName,
      ranges,
      limitEndYear,
      showWeekNumbers,
      showOneCalendar,
      onOpen,
      onClose,
      ...rest
    } = props;
    const { merge, prefix } = useClassNames(classPrefix);
    const { locale } = useCustom('DateRangePicker', overrideLocale);
    const zonedValue: ValueType = useMemo(() => toZonedValue(valueProp, timeZone), [
      timeZone,
      valueProp
    ]);
    const [localZoneValue, setLocalZoneValue] = useControlled<ValueType>(valueProp, defaultValue);
    const zonedDefaultValue: ValueType = useMemo(() => toZonedValue(defaultValue || [], timeZone), [
      defaultValue,
      timeZone
    ]);
    const [value, updateValue] = useControlled(zonedValue, zonedDefaultValue);
    const setValue = useCallback(
      (nextValue: ValueType) => {
        if (!isSameValueType(value, nextValue)) {
          setLocalZoneValue(toLocalValue(nextValue, timeZone));
          updateValue(nextValue);
        }
      },
      [setLocalZoneValue, timeZone, updateValue, value]
    );
    const [selectValue, setSelectValue] = useControlled<ValueType>(zonedValue, zonedDefaultValue);
    const doneSelected = useRef(true);
    const [calendarDate, setCalendarDate] = useControlled(
      zonedValue
        ? getCalendarDate({
            value: zonedValue,
            timeZone
          })
        : undefined,
      getCalendarDate({
        value: toZonedValue(defaultCalendarValue, timeZone),
        timeZone
      })
    );
    const [hoverValue, setHoverValue] = useState<ValueType>([]);
    const [active, setActive] = useState(false);
    const rootRef = useRef<HTMLDivElement>();
    const menuRef = useRef<HTMLDivElement>();
    const toggleRef = useRef<HTMLButtonElement>();
    const triggerRef = useRef<OverlayTriggerInstance>();

    const handleCloseDropdown = useCallback(() => {
      triggerRef.current?.close?.();
    }, []);

    const handleOpenDropdown = useCallback(() => {
      triggerRef.current?.open?.();
    }, []);

    useImperativeHandle(ref, () => ({
      root: rootRef.current,
      get menu() {
        return menuRef.current;
      },
      get toggle() {
        return toggleRef.current;
      },
      open: handleOpenDropdown,
      close: handleCloseDropdown
    }));

    useEffect(() => {
      const nextValue = toZonedValue(localZoneValue, timeZone);

      setValue(nextValue);
      setCalendarDate(getCalendarDate({ value: nextValue, timeZone }));
    }, [timeZone, localZoneValue, setValue, setCalendarDate]);

    const getDateString = useCallback(
      (nextValue: ValueType = value) => {
        const startDate: Date = nextValue?.[0];
        const endDate: Date = nextValue?.[1];

        if (startDate && endDate) {
          const displayValue: any = [startDate, endDate].sort(compareAsc);

          return renderValue ? (
            renderValue(toLocalValue(displayValue, timeZone), format)
          ) : (
            <>
              <FormattedDate date={displayValue[0]} formatStr={format} /> ~{' '}
              <FormattedDate date={displayValue[1]} formatStr={format} />
            </>
          );
        }

        return placeholder || `${format} ~ ${format}`;
      },
      [format, placeholder, renderValue, timeZone, value]
    );

    // hover range presets
    const getWeekHoverRange = useCallback(
      (date: Date): ValueType => {
        if (isoWeek) {
          // set to the first day of this week according to ISO 8601, 12:00 am
          return [startOfISOWeek(date), endOfISOWeek(date)];
        }

        return [startOfWeek(date), endOfWeek(date)];
      },
      [isoWeek]
    );

    const getMonthHoverRange = useCallback(
      (date: Date): ValueType => [startOfMonth(date), endOfMonth(date)],
      []
    );

    const getHoverRange = useCallback(
      (date: Date): ValueType => {
        if (!hoverRange) {
          return [];
        }

        let hoverRangeFunc = hoverRange;
        if (hoverRange === 'week') {
          hoverRangeFunc = getWeekHoverRange;
        }

        if (hoverRangeFunc === 'month') {
          hoverRangeFunc = getMonthHoverRange;
        }

        if (typeof hoverRangeFunc !== 'function') {
          return [];
        }

        const hoverValues: ValueType = toZonedValue(
          hoverRangeFunc(toLocalTimeZone(date, timeZone)),
          timeZone
        );
        const isHoverRangeValid = hoverValues instanceof Array && hoverValues.length === 2;
        if (!isHoverRangeValid) {
          return [];
        }
        if (isAfter(hoverValues[0], hoverValues[1])) {
          hoverValues.reverse();
        }
        return hoverValues;
      },
      [getMonthHoverRange, getWeekHoverRange, hoverRange, timeZone]
    );

    const handleChangeCalendarDate = useCallback(
      (index: number, date: Date) => {
        const nextCalendarDate = Array.from(calendarDate);
        nextCalendarDate[index] = date;

        setCalendarDate(nextCalendarDate as ValueType);
      },
      [calendarDate, setCalendarDate]
    );

    const handleValueUpdate = useCallback(
      (event: React.SyntheticEvent<any>, nextSelectValue?: ValueType, closeOverlay = true) => {
        const nextValue = !isUndefined(nextSelectValue) ? nextSelectValue : selectValue;

        setSelectValue(nextValue || []);
        setValue(nextValue);

        if (
          onChange &&
          (!isSameDay(nextValue[0], value[0]) || !isSameDay(nextValue[1], value[1]))
        ) {
          onChange(toLocalValue(nextValue, timeZone), event);
        }

        // `closeOverlay` default value is `true`
        if (closeOverlay !== false) {
          handleCloseDropdown();
        }
      },
      [handleCloseDropdown, onChange, selectValue, setSelectValue, setValue, timeZone, value]
    );

    /**
     * Toolbar operation callback function
     */
    const handleShortcutPageDate = useCallback(
      (value: ValueType, closeOverlay?: boolean, event?: React.SyntheticEvent<any>) => {
        handleValueUpdate(event, value, closeOverlay);
      },
      [handleValueUpdate]
    );

    const handleOK = useCallback(
      (event: React.SyntheticEvent<any>) => {
        handleValueUpdate(event);
        onOk?.(toLocalValue(selectValue, timeZone), event);
      },
      [handleValueUpdate, onOk, selectValue, timeZone]
    );

    const handleChangeSelectValue = useCallback(
      (date: Date, event: React.SyntheticEvent<any>) => {
        let nextSelectValue: ValueType = getHoverRange(date);
        const isHoverRangeInvalid = !nextSelectValue.length;

        // no hover range valid
        if (isHoverRangeInvalid) {
          // first select
          if (doneSelected.current) {
            nextSelectValue = [date] as ValueType;
          } else {
            // last select
            const prevSelectValue = Array.from(selectValue) as ValueType;
            prevSelectValue[1] = date;
            nextSelectValue = prevSelectValue;
          }

          doneSelected.current = !doneSelected.current;
        }

        // in `oneTap` mode
        if (oneTap) {
          handleValueUpdate(
            event,
            isHoverRangeInvalid
              ? [setTimingMargin(date), setTimingMargin(date, 'right')]
              : nextSelectValue
          );
        }

        // If user have completed the selection, then sort
        if (nextSelectValue.length === 2 && isAfter(nextSelectValue[0], nextSelectValue[1])) {
          nextSelectValue.reverse();
        }

        setHoverValue(nextSelectValue);
        setSelectValue(nextSelectValue);
        onSelect?.(toLocalTimeZone(date, timeZone), event);
        event.persist();
      },
      [getHoverRange, handleValueUpdate, onSelect, oneTap, selectValue, setSelectValue, timeZone]
    );

    useEffect(() => {
      setCalendarDate(getCalendarDate({ value: selectValue, timeZone }));
    }, [selectValue, setCalendarDate, timeZone]);

    const handleMouseMoveSelectValue = useCallback(
      (date: Date) => {
        const hoverRange = getHoverRange(date);
        if (!doneSelected.current) {
          setHoverValue(prevHoverValue => {
            const nextHoverValue = Array.from(prevHoverValue) as ValueType;
            nextHoverValue[+!doneSelected.current] = date;
            return nextHoverValue;
          });
        } else if (hoverRange.length) {
          setHoverValue(hoverRange);
        }
      },
      [getHoverRange]
    );

    const handleClean = useCallback(
      event => {
        setCalendarDate(getCalendarDate({ timeZone }));
        handleValueUpdate(event, []);
      },
      [handleValueUpdate, setCalendarDate, timeZone]
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
          value: toZonedValue(defaultCalendarValue, timeZone),
          timeZone
        });
      }

      setSelectValue(value);
      setCalendarDate(nextCalendarDate);
      setActive(true);
    }, [defaultCalendarValue, setCalendarDate, setSelectValue, timeZone, value]);

    const handleEntered = useCallback(() => {
      onOpen?.();
    }, [onOpen]);

    const handleExit = useCallback(() => {
      setActive(false);
      doneSelected.current = true;

      onClose?.();
    }, [onClose]);

    const disabledDate = useCallback(
      (
        date: Date,
        selectDate: ValueType,
        selectedDone: boolean,
        target: DATERANGE_DISABLED_TARGET
      ): boolean => {
        return disabledDateProp?.(
          toLocalTimeZone(date, timeZone),
          toLocalValue(selectDate, timeZone),
          selectedDone,
          target
        );
      },
      [disabledDateProp, timeZone]
    );

    const disabledByBetween = useCallback(
      (start: Date, end: Date, type: DATERANGE_DISABLED_TARGET) => {
        const [selectStartDate, selectEndDate] = selectValue;
        const nextSelectValue: ValueType = [selectStartDate, selectEndDate];

        // If the date is between the start and the end
        // the button is disabled
        while (isBefore(start, end) || isSameDay(start, end)) {
          if (disabledDate(start, nextSelectValue, doneSelected.current, type)) {
            return true;
          }
          start = addDays(start, 1);
        }

        return false;
      },
      [disabledDate, selectValue]
    );

    const disabledOkButton = useCallback(() => {
      if (!selectValue[0] || !selectValue[1] || !doneSelected.current) {
        return true;
      }

      return disabledByBetween(
        selectValue[0],
        selectValue[1],
        DATERANGE_DISABLED_TARGET.TOOLBAR_BUTTON_OK
      );
    }, [disabledByBetween, selectValue]);

    const disabledShortcutButton = useCallback(
      (value: ValueType = []) => {
        if (!value[0] || !value[1]) {
          return true;
        }

        return disabledByBetween(value[0], value[1], DATERANGE_DISABLED_TARGET.TOOLBAR_SHORTCUT);
      },
      [disabledByBetween]
    );

    const handleDisabledDate = useCallback(
      (date: Date, values: ValueType, type: DATERANGE_DISABLED_TARGET) => {
        return !!disabledDate(date, values, doneSelected.current, type);
      },
      [disabledDate]
    );

    const renderDropdownMenu = useCallback(() => {
      const classes = merge(menuClassName, prefix('daterange-menu'));
      const panelClasses = merge(prefix('daterange-panel'), {
        [prefix('daterange-panel-show-one-calendar')]: showOneCalendar
      });

      const panelProps = {
        calendarDate,
        disabledDate: handleDisabledDate,
        format,
        hoverRangeValue: hoverValue,
        isoWeek,
        limitEndYear,
        locale,
        onChangeCalendarDate: handleChangeCalendarDate,
        onMouseMove: handleMouseMoveSelectValue,
        onSelect: handleChangeSelectValue,
        showOneCalendar,
        showWeekNumbers,
        timeZone,
        value: selectValue
      };

      return (
        <MenuWrapper className={classes} ref={menuRef} target={triggerRef}>
          <div className={panelClasses}>
            <div className={prefix('daterange-content')}>
              <div className={prefix('daterange-header')}>{getDateString(selectValue)}</div>
              <div className={prefix(`daterange-calendar-${showOneCalendar ? 'single' : 'group'}`)}>
                <Panel index={0} {...panelProps} />
                {!showOneCalendar && <Panel index={1} {...panelProps} />}
              </div>
            </div>
            <Toolbar
              pageDate={selectValue}
              disabledOkBtn={disabledOkButton}
              disabledShortcut={disabledShortcutButton}
              hideOkBtn={oneTap}
              onOk={handleOK}
              onShortcut={handleShortcutPageDate}
              ranges={ranges}
              timeZone={timeZone}
            />
          </div>
        </MenuWrapper>
      );
    }, [
      calendarDate,
      disabledOkButton,
      disabledShortcutButton,
      format,
      getDateString,
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
      merge,
      oneTap,
      prefix,
      ranges,
      selectValue,
      showOneCalendar,
      showWeekNumbers,
      timeZone
    ]);

    const hasValue = value && value.length > 1;
    const [classes, usedClassNames] = usePickerClassName({ ...props, name: 'daterange', hasValue });

    return (
      <PickerToggleTrigger
        pickerProps={props}
        ref={triggerRef}
        onEnter={createChainedFunction(handleEnter, onEnter)}
        onEntered={createChainedFunction(handleEntered, onEntered)}
        onExited={createChainedFunction(handleExit, onExited)}
        speaker={renderDropdownMenu()}
      >
        <Component ref={rootRef} className={classes} style={style}>
          <PickerToggle
            {...omitBy(
              rest,
              (_value, key) =>
                key.startsWith('hide') || key.startsWith('disabled') || usedClassNames.includes(key)
            )}
            as={toggleAs}
            onClean={createChainedFunction<(event: React.MouseEvent<any>) => void>(
              handleClean,
              onClean
            )}
            cleanable={cleanable && !disabled}
            hasValue={hasValue}
            active={active}
            ref={toggleRef}
          >
            {getDateString()}
          </PickerToggle>
        </Component>
      </PickerToggleTrigger>
    );
  }
);

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

Object.keys(utils).forEach(key => {
  if (key !== '__esModule') {
    DateRangePicker[key] = utils[key];
  }
});
export default DateRangePicker as DateRangePickerComponent;
