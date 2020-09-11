import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
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
import Toolbar from './Toolbar';
import DatePicker from './DatePicker';
import { getCalendarDate, toLocalValue, toZonedValue } from './utils';
import { createChainedFunction, useClassNames, useControlled, useCustom } from '../utils';
import { MenuWrapper, PickerToggle, PickerToggleTrigger, usePickerClassName } from '../Picker';
import { DATERANGE_DISABLED_TARGET } from '../constants';
import { pickerDefaultProps, pickerPropTypes } from '../Picker/propTypes';
import { toLocalTimeZone } from '../utils/timeZone';
import { FormControlBaseProps, PickerBaseProps, RsRefForwardingComponent } from '../@types/common';
import * as utils from './disabledDateUtils';
import { DisabledDateFunction, RangeType, ValueType } from './types';
import omitBy from 'lodash/omitBy';

// interface DateRangePickerState {
//   value: ValueType;
//   selectValue: [Date?, Date?, Date?];
//
//   // Two clicks, the second click ends
//   doneSelected: boolean;
//
//   // display calendar date
//   calendarDate: ValueType;
//
//   // 当前应该高亮哪个区间，用于实现选择整周、整月
//   hoverValue?: ValueType;
//
//   // 当前 hover 的 date，用来减少 handleMouseMoveSelectValue 的计算
//   currentHoverDate?: Date;
//
//   active?: boolean;
// }

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
  limitEndYear: 1000,
  placeholder: '',
  showOneCalendar: false,
  classPrefix: 'picker',
  as: 'div',
  format: 'yyyy-MM-dd'
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
    const zonedValue: ValueType = toZonedValue(valueProp || [], timeZone);
    const [localZoneValue, setLocalZoneValue] = useControlled(valueProp || [], defaultValue);
    const zonedDefaultValue: ValueType = toZonedValue(defaultValue || [], timeZone);
    const [value, updateValue] = useControlled(zonedValue, zonedDefaultValue);
    const setValue = useCallback(
      (nextValue: ValueType) => {
        if (value?.valueOf() !== nextValue?.valueOf()) {
          setLocalZoneValue(toLocalValue(nextValue, timeZone));
          updateValue(nextValue);
        }
      },
      [setLocalZoneValue, timeZone, updateValue, value]
    );
    const [selectValue, setSelectValue] = useControlled<[Date?, Date?, Date?]>(
      zonedValue,
      zonedDefaultValue
    );
    const [doneSelected, setDoneSelected] = useState(true);
    const [calendarDate, setCalendarDate] = useControlled(
      getCalendarDate({
        value: zonedValue,
        timeZone
      }),
      getCalendarDate({
        value: toZonedValue(defaultCalendarValue, timeZone),
        timeZone
      })
    );
    const [hoverValue, setHoverValue] = useState([]);
    const [currentHoverDate, setCurrentHoverDate] = useState(null);
    const [active, setActive] = useState(false);
    const rootRef = useRef<HTMLDivElement>();
    const menuRef = useRef<HTMLDivElement>();
    const toggleRef = useRef<HTMLButtonElement>();
    const triggerRef = useRef<{ show?: () => void; hide?: () => void }>();

    const handleCloseDropdown = useCallback(() => {
      triggerRef.current?.hide?.();
    }, []);

    const handleOpenDropdown = useCallback(() => {
      triggerRef.current?.show?.();
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
      const nextLocalZoneValue = valueProp ?? localZoneValue;
      const nextValue = toZonedValue(nextLocalZoneValue, timeZone);

      setValue(nextValue);
      setCalendarDate(getCalendarDate({ value: nextValue, timeZone }));
    }, [timeZone, valueProp, localZoneValue, setValue, setCalendarDate]);

    const getDateString = (nextValue: ValueType = value) => {
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
    };

    // hover range presets
    const getWeekHoverRange = (date: Date): ValueType => {
      if (isoWeek) {
        // set to the first day of this week according to ISO 8601, 12:00 am
        return [startOfISOWeek(date), endOfISOWeek(date)];
      }

      return [startOfWeek(date), endOfWeek(date)];
    };

    const getMonthHoverRange = (date: Date): ValueType => [startOfMonth(date), endOfMonth(date)];

    const getHoverRange = (date: Date) => {
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
    };

    const handleChangeCalendarDate = (index: number, date: Date) => {
      const nextCalendarDate = Array.from(calendarDate);
      nextCalendarDate[index] = date;

      setCalendarDate(nextCalendarDate);
    };

    /**
     * Toolbar operation callback function
     */
    const handleShortcutPageDate = (
      value: ValueType,
      closeOverlay?: boolean,
      event?: React.SyntheticEvent<any>
    ) => {
      handleValueUpdate(event, value, closeOverlay);
    };

    const handleValueUpdate = (
      event: React.SyntheticEvent<any>,
      nextSelectValue?: ValueType,
      closeOverlay = true
    ) => {
      const nextValue: any = !_.isUndefined(nextSelectValue) ? nextSelectValue : selectValue;

      setSelectValue(nextValue || []);
      setValue(nextValue);

      if (onChange && (!isSameDay(nextValue[0], value[0]) || !isSameDay(nextValue[1], value[1]))) {
        onChange(toLocalValue(nextValue, timeZone), event);
      }

      // `closeOverlay` default value is `true`
      if (closeOverlay !== false) {
        handleCloseDropdown();
      }
    };

    const handleOK = (event: React.SyntheticEvent<any>) => {
      handleValueUpdate(event);
      onOk?.(toLocalValue(selectValue as ValueType, timeZone), event);
    };

    const handleChangeSelectValue = (date: Date, event: React.SyntheticEvent<any>) => {
      let nextValue = [];
      let nextHoverValue = getHoverRange(date);

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

        if (isAfter(nextValue[0], nextValue[1])) {
          nextValue.reverse();
        }

        setCalendarDate(getCalendarDate({ value: nextValue, timeZone }));
      }

      event.persist();

      const nextDoneSelect = !doneSelected;
      // 如果是单击模式，并且是第一次点选，再触发一次点击
      if (oneTap && doneSelected) {
        handleChangeSelectValue(date, event);
      }
      // 如果是单击模式，并且是第二次点选，更新值，并关闭面板
      if (oneTap && !doneSelected) {
        handleValueUpdate(event);
      }

      onSelect?.(toLocalTimeZone(date, timeZone), event);
      setDoneSelected(nextDoneSelect);
      setSelectValue(nextValue as ValueType);
      setHoverValue(nextHoverValue);
    };

    const handleMouseMoveSelectValue = (date: Date) => {
      if (currentHoverDate && isSameDay(date, currentHoverDate)) {
        return;
      }

      const nextHoverValue = getHoverRange(date);

      if (doneSelected && !_.isUndefined(hoverRange)) {
        setCurrentHoverDate(date);
        setHoverValue(nextHoverValue);
        return;
      } else if (doneSelected) {
        return;
      }

      let nextValue = selectValue;

      if (!nextHoverValue.length) {
        nextValue[1] = date;
      } else if (hoverValue) {
        nextValue = [
          isBefore(nextHoverValue[0], hoverValue[0]) ? nextHoverValue[0] : hoverValue[0],
          isAfter(nextHoverValue[1], hoverValue[1]) ? nextHoverValue[1] : hoverValue[1],
          nextValue[2]
        ];
      }

      // If `nextValue[0]` is greater than `nextValue[1]` then reverse order
      if (isAfter(nextValue[0], nextValue[1])) {
        nextValue.reverse();
      }

      setCurrentHoverDate(date);
      setSelectValue(nextValue);
    };

    const handleClean = event => {
      setCalendarDate(getCalendarDate({ timeZone }));
      handleValueUpdate(event, []);
    };

    const handleEnter = () => {
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
    };

    const handleEntered = () => {
      onOpen?.();
    };

    const handleExit = () => {
      setActive(false);
      setDoneSelected(true);

      onClose?.();
    };

    const disabledDate = (
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
    };

    const disabledByBetween = (start: Date, end: Date, type: DATERANGE_DISABLED_TARGET) => {
      const selectStartDate = selectValue[0];
      const selectEndDate = selectValue[1];
      const nextSelectValue: ValueType = [selectStartDate, selectEndDate];

      // If the date is between the start and the end
      // the button is disabled
      while (isBefore(start, end) || isSameDay(start, end)) {
        if (disabledDate(start, nextSelectValue, doneSelected, type)) {
          return true;
        }
        start = addDays(start, 1);
      }

      return false;
    };

    const disabledOkButton = () => {
      if (!selectValue[0] || !selectValue[1] || !doneSelected) {
        return true;
      }

      return disabledByBetween(
        selectValue[0],
        selectValue[1],
        DATERANGE_DISABLED_TARGET.TOOLBAR_BUTTON_OK
      );
    };

    const disabledShortcutButton = (value: ValueType = []) => {
      if (!value[0] || !value[1]) {
        return true;
      }

      return disabledByBetween(value[0], value[1], DATERANGE_DISABLED_TARGET.TOOLBAR_SHORTCUT);
    };

    const handleDisabledDate = (date: Date, values: ValueType, type: DATERANGE_DISABLED_TARGET) => {
      return !!disabledDate(date, values, doneSelected, type);
    };

    const renderDropdownMenu = () => {
      const classes = merge(menuClassName, prefix('daterange-menu'));
      const panelClasses = merge(prefix('daterange-panel'), {
        [prefix('daterange-panel-show-one-calendar')]: showOneCalendar
      });

      const pickerProps = {
        isoWeek,
        doneSelected,
        hoverValue,
        calendarDate,
        limitEndYear,
        showWeekNumbers,
        value: selectValue as ValueType,
        disabledDate: handleDisabledDate,
        onSelect: handleChangeSelectValue,
        onMouseMove: handleMouseMoveSelectValue,
        onChangeCalendarDate: handleChangeCalendarDate,
        showOneCalendar,
        timeZone,
        locale
      };

      return (
        <MenuWrapper className={classes} ref={menuRef}>
          <div className={panelClasses}>
            <div className={prefix('daterange-content')}>
              <div className={prefix('daterange-header')}>
                {getDateString(selectValue as ValueType)}
              </div>
              <div className={prefix(`daterange-calendar-${showOneCalendar ? 'single' : 'group'}`)}>
                <DatePicker index={0} {...pickerProps} />
                {!showOneCalendar && <DatePicker index={1} {...pickerProps} />}
              </div>
            </div>
            <Toolbar
              ranges={ranges}
              selectValue={selectValue as ValueType}
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
    };

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
