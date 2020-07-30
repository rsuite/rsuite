import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
import IntlContext from '../IntlProvider/IntlContext';
import FormattedDate from '../IntlProvider/FormattedDate';
import Toolbar from './Toolbar';
import DatePicker from './DatePicker';
import { getCalendarDate, toLocalValue, toZonedValue } from './utils';
import { createChainedFunction, defaultProps, getUnhandledProps, prefix } from '../utils';

import {
  getToggleWrapperClassName,
  MenuWrapper,
  PickerToggle,
  PickerToggleTrigger
} from '../Picker';

import { DateRangePickerProps, ValueType } from './DateRangePicker.d';
import { DATERANGE_DISABLED_TARGET } from '../constants';
import { pickerDefaultProps, pickerPropTypes } from '../Picker/propTypes';
import { toLocalTimeZone } from '../utils/timeZone';

interface DateRangePickerState {
  value: ValueType;
  selectValue: [Date?, Date?, Date?];

  // Two clicks, the second click ends
  doneSelected: boolean;

  // display calendar date
  calendarDate: ValueType;

  // 当前应该高亮哪个区间，用于实现选择整周、整月
  hoverValue?: ValueType;

  // 当前 hover 的 date，用来减少 handleMouseMoveSelectValue 的计算
  currentHoverDate?: Date;

  active?: boolean;
}

class DateRangePicker extends React.Component<DateRangePickerProps, DateRangePickerState> {
  static propTypes = {
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
  static defaultProps = {
    ...pickerDefaultProps,
    limitEndYear: 1000,
    placeholder: '',
    showOneCalendar: false,
    locale: {
      sunday: 'Su',
      monday: 'Mo',
      tuesday: 'Tu',
      wednesday: 'We',
      thursday: 'Th',
      friday: 'Fr',
      saturday: 'Sa',
      ok: 'OK',
      today: 'Today',
      yesterday: 'Yesterday',
      last7Days: 'Last 7 Days',
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds'
    }
  };
  menuContainerRef: React.RefObject<any>;
  triggerRef: React.RefObject<any>;

  static getDerivedStateFromProps(
    nextProps: DateRangePickerProps,
    prevState: DateRangePickerState
  ) {
    const { value, timeZone } = nextProps;

    if (typeof value === 'undefined') {
      return null;
    }

    if (
      (value[0] && !isSameDay(value[0], prevState.value[0])) ||
      (value[1] && !isSameDay(value[1], prevState.value[1]))
    ) {
      return {
        value,
        selectValue: value,
        calendarDate: getCalendarDate({ value, timeZone })
      };
    }

    return null;
  }

  constructor(props: DateRangePickerProps) {
    super(props);

    const { defaultValue, value, defaultCalendarValue, timeZone } = props;
    const activeValue: ValueType = toZonedValue(value || defaultValue || [], timeZone);
    const calendarDate: ValueType = getCalendarDate({
      value: toZonedValue(value || defaultCalendarValue, timeZone),
      timeZone
    });

    this.state = {
      value: activeValue,
      selectValue: activeValue,
      doneSelected: true,
      calendarDate,
      hoverValue: [],
      currentHoverDate: null
    };

    // for test
    this.menuContainerRef = React.createRef();
    this.triggerRef = React.createRef();
  }

  getValue = (): ValueType => {
    const { value, timeZone } = this.props;

    if (typeof value !== 'undefined') {
      return toZonedValue(value, timeZone);
    }

    return this.state.value || [];
  };

  getFormat = () => this.props.format ?? 'yyyy-MM-dd';

  getDateString(value?: ValueType) {
    const { placeholder, renderValue, timeZone } = this.props;
    const nextValue = value || this.getValue();
    const formatType = this.getFormat();
    const startDate: Date = nextValue?.[0];
    const endDate: Date = nextValue?.[1];

    if (startDate && endDate) {
      const displayValue: any = [startDate, endDate].sort(compareAsc);

      return renderValue ? (
        renderValue(toLocalValue(displayValue, timeZone), formatType)
      ) : (
        <>
          <FormattedDate date={displayValue[0]} formatStr={formatType} /> ~{' '}
          <FormattedDate date={displayValue[1]} formatStr={formatType} />
        </>
      );
    }

    return placeholder || `${formatType} ~ ${formatType}`;
  }

  // hover range presets
  getWeekHoverRange = (date: Date): ValueType => {
    const { isoWeek } = this.props;

    if (isoWeek) {
      // set to the first day of this week according to ISO 8601, 12:00 am
      return [startOfISOWeek(date), endOfISOWeek(date)];
    }

    return [startOfWeek(date), endOfWeek(date)];
  };
  getMonthHoverRange = (date: Date): ValueType => [startOfMonth(date), endOfMonth(date)];

  getHoverRange(date: Date) {
    const { hoverRange, timeZone } = this.props;
    if (!hoverRange) {
      return [];
    }

    let hoverRangeFunc = hoverRange;
    if (hoverRange === 'week') {
      hoverRangeFunc = this.getWeekHoverRange;
    }

    if (hoverRangeFunc === 'month') {
      hoverRangeFunc = this.getMonthHoverRange;
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
  }

  handleChangeCalendarDate = (index: number, date: Date) => {
    const { calendarDate } = this.state;
    calendarDate[index] = date;

    this.setState({ calendarDate });
  };

  handleCloseDropdown = () => {
    this.triggerRef.current?.hide?.();
  };

  handleOpenDropdown = () => {
    this.triggerRef.current?.show?.();
  };

  open = () => {
    this.handleOpenDropdown?.();
  };
  close = () => {
    this.handleCloseDropdown?.();
  };

  resetPageDate() {
    const selectValue = this.getValue();
    const calendarDate = getCalendarDate({ value: selectValue, timeZone: this.props.timeZone });
    this.setState({
      selectValue,
      calendarDate
    });
  }

  /**
   * Toolbar operation callback function
   */
  handleShortcutPageDate = (
    value: ValueType,
    closeOverlay?: boolean,
    event?: React.SyntheticEvent<any>
  ) => {
    this.updateValue(event, value, closeOverlay);
  };

  updateValue(event: React.SyntheticEvent<any>, nextSelectValue?: ValueType, closeOverlay = true) {
    const { value, selectValue } = this.state;
    const { onChange, timeZone } = this.props;
    const nextValue: any = !_.isUndefined(nextSelectValue) ? nextSelectValue : selectValue;

    this.setState({
      selectValue: nextValue || [],
      value: nextValue
    });

    if (onChange && (!isSameDay(nextValue[0], value[0]) || !isSameDay(nextValue[1], value[1]))) {
      onChange(toLocalValue(nextValue, timeZone), event);
    }

    // `closeOverlay` default value is `true`
    if (closeOverlay !== false) {
      this.handleCloseDropdown();
    }
  }

  handleOK = (event: React.SyntheticEvent<any>) => {
    this.updateValue(event);
    this.props.onOk?.(
      toLocalValue(this.state.selectValue as ValueType, this.props.timeZone),
      event
    );
  };

  handleChangeSelectValue = (date: Date, event: React.SyntheticEvent<any>) => {
    const { selectValue, doneSelected } = this.state;
    const { onSelect, oneTap, timeZone } = this.props;
    let nextValue = [];
    let nextHoverValue = this.getHoverRange(date);

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

      this.setState({
        calendarDate: getCalendarDate({ value: nextValue as ValueType, timeZone })
      });
    }

    const nextState = {
      doneSelected: !doneSelected,
      selectValue: nextValue as ValueType,
      hoverValue: nextHoverValue as ValueType
    };

    event.persist();

    this.setState(nextState, () => {
      // 如果是单击模式，并且是第一次点选，再触发一次点击
      if (oneTap && !this.state.doneSelected) {
        this.handleChangeSelectValue(date, event);
      }
      // 如果是单击模式，并且是第二次点选，更新值，并关闭面板
      if (oneTap && this.state.doneSelected) {
        this.updateValue(event);
      }

      onSelect?.(toLocalTimeZone(date, timeZone), event);
    });
  };

  handleMouseMoveSelectValue = (date: Date) => {
    const { doneSelected, selectValue, hoverValue, currentHoverDate } = this.state;
    const { hoverRange } = this.props;

    if (currentHoverDate && isSameDay(date, currentHoverDate)) {
      return;
    }

    const nextHoverValue = this.getHoverRange(date);

    if (doneSelected && !_.isUndefined(hoverRange)) {
      this.setState({
        currentHoverDate: date,
        hoverValue: nextHoverValue as ValueType
      });
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

    this.setState({
      currentHoverDate: date,
      selectValue: nextValue
    });
  };

  handleClean = event => {
    this.setState({ calendarDate: getCalendarDate({ timeZone: this.props.timeZone }) });
    this.updateValue(event, []);
  };

  handleEnter = () => {
    const { defaultCalendarValue, timeZone } = this.props;
    const value = this.getValue();

    let calendarDate;

    if (value && value.length) {
      const [startDate, endData] = value;
      calendarDate = [startDate, isSameMonth(startDate, endData) ? addMonths(endData, 1) : endData];
    } else {
      calendarDate = getCalendarDate({
        value: toZonedValue(defaultCalendarValue, timeZone),
        timeZone
      });
    }

    this.setState({
      selectValue: value,
      calendarDate,
      active: true
    });
  };

  handleEntered = () => {
    this.props.onOpen?.();
  };

  handleExit = () => {
    this.setState({
      active: false,
      doneSelected: true
    });

    this.props.onClose?.();
  };

  disabledDate = (
    date: Date,
    selectDate: ValueType,
    selectedDone: boolean,
    target: DATERANGE_DISABLED_TARGET
  ): boolean => {
    const { disabledDate, timeZone } = this.props;
    return disabledDate?.(
      toLocalTimeZone(date, timeZone),
      toLocalValue(selectDate, timeZone),
      selectedDone,
      target
    );
  };

  disabledByBetween(start: Date, end: Date, type: DATERANGE_DISABLED_TARGET) {
    const { selectValue, doneSelected } = this.state;
    const selectStartDate = selectValue[0];
    const selectEndDate = selectValue[1];
    const nextSelectValue: ValueType = [selectStartDate, selectEndDate];

    // If the date is between the start and the end
    // the button is disabled
    while (isBefore(start, end) || isSameDay(start, end)) {
      if (this.disabledDate(start, nextSelectValue, doneSelected, type)) {
        return true;
      }
      start = addDays(start, 1);
    }

    return false;
  }

  disabledOkButton = () => {
    const { selectValue, doneSelected } = this.state;

    if (!selectValue[0] || !selectValue[1] || !doneSelected) {
      return true;
    }

    return this.disabledByBetween(
      selectValue[0],
      selectValue[1],
      DATERANGE_DISABLED_TARGET.TOOLBAR_BUTTON_OK
    );
  };

  disabledShortcutButton = (value: ValueType = []) => {
    if (!value[0] || !value[1]) {
      return true;
    }

    return this.disabledByBetween(value[0], value[1], DATERANGE_DISABLED_TARGET.TOOLBAR_SHORTCUT);
  };

  handleDisabledDate = (date: Date, values: ValueType, type: DATERANGE_DISABLED_TARGET) => {
    const { doneSelected } = this.state;

    return !!this.disabledDate(date, values, doneSelected, type);
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderDropdownMenu() {
    const {
      menuClassName,
      ranges,
      isoWeek,
      limitEndYear,
      oneTap,
      showWeekNumbers,
      showOneCalendar,
      timeZone
    } = this.props;
    const { calendarDate, selectValue, hoverValue, doneSelected } = this.state;
    const classes = classNames(this.addPrefix('daterange-menu'), menuClassName);
    const panelClasses = classNames(this.addPrefix('daterange-panel'), {
      [this.addPrefix('daterange-panel-show-one-calendar')]: showOneCalendar
    });

    const pickerProps = {
      isoWeek,
      doneSelected,
      hoverValue,
      calendarDate,
      limitEndYear,
      showWeekNumbers,
      value: selectValue as ValueType,
      disabledDate: this.handleDisabledDate,
      onSelect: this.handleChangeSelectValue,
      onMouseMove: this.handleMouseMoveSelectValue,
      onChangeCalendarDate: this.handleChangeCalendarDate,
      showOneCalendar,
      timeZone
    };

    return (
      <MenuWrapper className={classes} ref={this.menuContainerRef}>
        <div className={panelClasses}>
          <div className={this.addPrefix('daterange-content')}>
            <div className={this.addPrefix('daterange-header')}>
              {this.getDateString(selectValue as ValueType)}
            </div>
            <div
              className={this.addPrefix(
                `daterange-calendar-${showOneCalendar ? 'single' : 'group'}`
              )}
            >
              <DatePicker index={0} {...pickerProps} />
              {!showOneCalendar && <DatePicker index={1} {...pickerProps} />}
            </div>
          </div>
          <Toolbar
            ranges={ranges}
            selectValue={selectValue as ValueType}
            disabledOkButton={this.disabledOkButton}
            disabledShortcutButton={this.disabledShortcutButton}
            onShortcut={this.handleShortcutPageDate}
            onOk={this.handleOK}
            hideOkButton={oneTap}
            timeZone={timeZone}
          />
        </div>
      </MenuWrapper>
    );
  }

  render() {
    const {
      disabled,
      cleanable,
      locale,
      toggleComponentClass,
      style,
      onEntered,
      onEnter,
      onExited,
      onClean,
      ...rest
    } = this.props;

    const value = this.getValue();
    const unhandled = getUnhandledProps(DateRangePicker, rest);
    const hasValue = value && value.length > 1;
    const classes = getToggleWrapperClassName('daterange', this.addPrefix, this.props, hasValue);

    return (
      <IntlContext.Provider value={locale}>
        <div className={classes} style={style}>
          <PickerToggleTrigger
            pickerProps={this.props}
            ref={this.triggerRef}
            onEnter={createChainedFunction(this.handleEnter, onEnter)}
            onEntered={createChainedFunction(this.handleEntered, onEntered)}
            onExited={createChainedFunction(this.handleExit, onExited)}
            speaker={this.renderDropdownMenu()}
          >
            <PickerToggle
              {...unhandled}
              componentClass={toggleComponentClass}
              onClean={createChainedFunction(this.handleClean, onClean)}
              cleanable={cleanable && !disabled}
              hasValue={hasValue}
              active={this.state.active}
            >
              {this.getDateString()}
            </PickerToggle>
          </PickerToggleTrigger>
        </div>
      </IntlContext.Provider>
    );
  }
}

export default defaultProps({
  classPrefix: 'picker'
})(DateRangePicker);
