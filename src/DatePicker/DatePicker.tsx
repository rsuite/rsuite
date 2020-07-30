import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { polyfill } from 'react-lifecycles-compat';
import IntlContext from '../IntlProvider/IntlContext';
import FormattedDate from '../IntlProvider/FormattedDate';
import Calendar from '../Calendar/Calendar';
import Toolbar from './Toolbar';
import { shouldOnlyTime } from '../utils/formatUtils';
import composeFunctions from '../utils/composeFunctions';
import { createChainedFunction, defaultProps, getUnhandledProps, prefix } from '../utils';
import {
  getToggleWrapperClassName,
  MenuWrapper,
  PickerToggle,
  PickerToggleTrigger
} from '../Picker';
import {
  calendarOnlyProps,
  CalendarOnlyPropsType,
  disabledTime,
  getHours,
  getMinutes,
  getSeconds,
  isSameDay,
  setHours,
  setMinutes,
  setSeconds
} from '../utils/dateUtils';
import { DatePickerProps } from './DatePicker.d';
import { pickerDefaultProps, pickerPropTypes } from '../Picker/propTypes';
import { toLocalTimeZone, toTimeZone } from '../utils/timeZone';

interface DatePickerState {
  value?: Date;
  calendarState?: 'DROP_MONTH' | 'DROP_TIME';
  pageDate: Date;
  active?: boolean;
}

class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
  static propTypes = {
    ...pickerPropTypes,
    ranges: PropTypes.array,
    defaultValue: PropTypes.instanceOf(Date),
    value: PropTypes.instanceOf(Date),
    calendarDefaultDate: PropTypes.instanceOf(Date),
    format: PropTypes.string,
    timeZone: PropTypes.string,
    inline: PropTypes.bool,
    isoWeek: PropTypes.bool,
    limitEndYear: PropTypes.number,
    oneTap: PropTypes.bool,
    showWeekNumbers: PropTypes.bool,
    showMeridian: PropTypes.bool,
    disabledDate: PropTypes.func,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    hideHours: PropTypes.func,
    hideMinutes: PropTypes.func,
    hideSeconds: PropTypes.func,
    onChange: PropTypes.func,
    onChangeCalendarDate: PropTypes.func,
    onToggleMonthDropdown: PropTypes.func,
    onToggleTimeDropdown: PropTypes.func,
    onSelect: PropTypes.func,
    onPrevMonth: PropTypes.func,
    onNextMonth: PropTypes.func,
    onOk: PropTypes.func
  };
  static defaultProps = {
    ...pickerDefaultProps,
    limitEndYear: 1000,
    placeholder: '',
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
      hours: 'Hours',
      minutes: 'Minutes',
      seconds: 'Seconds'
    }
  };
  menuContainerRef: React.RefObject<any>;
  triggerRef: React.RefObject<any>;
  calendar = null;

  constructor(props: DatePickerProps) {
    super(props);

    const { defaultValue, value, calendarDefaultDate, timeZone } = props;
    const activeValue = value || defaultValue;

    this.state = {
      value: toTimeZone(activeValue, timeZone),
      pageDate: toTimeZone(activeValue || calendarDefaultDate || new Date(), timeZone) // display calendar date
    };

    this.triggerRef = React.createRef();

    // for test
    this.menuContainerRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps: DatePickerProps, prevState: DatePickerState) {
    const { value, timeZone } = nextProps;
    if (typeof value !== 'undefined') {
      const nextState = {
        value
      };

      if (!isSameDay(value, prevState.value)) {
        _.set(nextState, 'pageDate', toTimeZone(value, timeZone));
      }

      return nextState;
    }

    return null;
  }

  getLocalPageDate = (pageDate = this.state.pageDate) =>
    toLocalTimeZone(pageDate, this.props.timeZone);

  onMoveForward = (nextPageDate: Date) => {
    this.setState({
      pageDate: nextPageDate
    });
    const { onNextMonth, onChangeCalendarDate } = this.props;

    nextPageDate = this.getLocalPageDate(nextPageDate);
    onNextMonth?.(nextPageDate);
    onChangeCalendarDate?.(nextPageDate);
  };

  onMoveBackward = (nextPageDate: Date) => {
    this.setState({
      pageDate: nextPageDate
    });
    const { onPrevMonth, onChangeCalendarDate } = this.props;

    nextPageDate = this.getLocalPageDate(nextPageDate);
    onPrevMonth?.(nextPageDate);
    onChangeCalendarDate?.(nextPageDate);
  };

  getValue = () => {
    return this.props.value || this.state.value;
  };

  getFormat = () => this.props.format ?? 'yyyy-MM-dd';

  getDateString() {
    const { placeholder, renderValue } = this.props;
    const value = this.getValue();
    const formatType = this.getFormat();

    if (value) {
      return renderValue ? (
        renderValue(value, formatType)
      ) : (
        <FormattedDate date={value} formatStr={formatType} />
      );
    }

    return placeholder || formatType;
  }

  handleChangePageDate = (nextPageDate: Date) => {
    this.setState({
      pageDate: nextPageDate,
      calendarState: undefined
    });
    this.handleAllSelect(nextPageDate);
  };

  handleChangePageTime = (nextPageTime: Date) => {
    this.setState({ pageDate: nextPageTime });
    this.handleAllSelect(nextPageTime);
  };
  handleToggleMeridian = () => {
    const { pageDate } = this.state;
    const hours = getHours(pageDate);
    const nextHours = hours >= 12 ? hours - 12 : hours + 12;
    const nextDate = setHours(pageDate, nextHours);
    this.setState({ pageDate: nextDate });
  };

  handleShortcutPageDate = (
    value: Date,
    closeOverlay?: boolean,
    event?: React.SyntheticEvent<any>
  ) => {
    this.updateValue(event, value, closeOverlay);
    this.handleAllSelect(value, event);
  };

  handleOK = (event: React.SyntheticEvent<any>) => {
    this.updateValue(event);
    this.props.onOk?.(this.getLocalPageDate(), event);
  };

  updateValue(event: React.SyntheticEvent<any>, nextPageDate?: Date | null, closeOverlay = true) {
    const { pageDate } = this.state;
    const value = this.getValue();
    const nextValue: Date = !_.isUndefined(nextPageDate) ? nextPageDate : pageDate;

    this.setState({
      pageDate: nextValue || new Date(),
      value: nextValue
    });

    if (nextValue !== value || !isSameDay(nextValue, value)) {
      this.props.onChange?.(this.getLocalPageDate(nextValue), event);
    }

    // `closeOverlay` default value is `true`
    if (closeOverlay !== false) {
      this.handleCloseDropdown();
    }
  }

  resetPageDate() {
    const { calendarDefaultDate, timeZone } = this.props;
    const value = this.getValue();
    this.setState({
      pageDate: toTimeZone(value || calendarDefaultDate || new Date(), timeZone)
    });
  }

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

  showMonthDropdown() {
    this.setState({ calendarState: 'DROP_MONTH' });
  }

  hideDropdown() {
    this.setState({ calendarState: undefined });
  }

  showTimeDropdown() {
    this.setState({ calendarState: 'DROP_TIME' });
  }

  toggleMonthDropdown = () => {
    const { calendarState } = this.state;
    let toggle;

    if (calendarState === 'DROP_MONTH') {
      this.hideDropdown();
      toggle = false;
    } else {
      this.showMonthDropdown();
      toggle = true;
    }
    this.props.onToggleMonthDropdown?.(toggle);
  };

  toggleTimeDropdown = () => {
    const { calendarState } = this.state;
    let toggle;
    if (calendarState === 'DROP_TIME') {
      this.hideDropdown();
      toggle = false;
    } else {
      this.showTimeDropdown();
      toggle = true;
    }

    this.props.onToggleTimeDropdown?.(toggle);
  };

  handleClean = (event: React.SyntheticEvent<any>) => {
    this.setState({ pageDate: toTimeZone(new Date(), this.props.timeZone) });
    this.updateValue(event, null);
  };

  handleAllSelect = (nextValue: Date, event?: React.SyntheticEvent<any>) => {
    const { onSelect, onChangeCalendarDate, timeZone } = this.props;

    nextValue = toLocalTimeZone(nextValue, timeZone);
    onSelect?.(nextValue, event);
    onChangeCalendarDate?.(nextValue, event);
  };

  handleSelect = (nextValue: Date, event: React.SyntheticEvent<any>) => {
    const { oneTap } = this.props;
    const { pageDate } = this.state;

    this.setState({
      pageDate: composeFunctions(
        (d: Date) => setHours(d, getHours(pageDate)),
        (d: Date) => setMinutes(d, getMinutes(pageDate)),
        (d: Date) => setSeconds(d, getSeconds(pageDate))
      )(nextValue)
    });

    this.handleAllSelect(nextValue);
    if (oneTap) {
      this.updateValue(event, nextValue);
    }
  };

  handleEntered = () => {
    this.props.onOpen?.();
    this.setState({
      active: true
    });
  };

  handleExit = () => {
    this.props.onClose?.();
    this.setState({
      calendarState: undefined,
      active: false
    });
  };

  disabledDate = (date?: Date) =>
    this.props.disabledDate?.(toLocalTimeZone(date, this.props.timeZone));

  disabledToolbarHandle = (date?: Date): boolean => {
    const { disabledDate, timeZone } = this.props;
    const allowDate = disabledDate ? this.disabledDate(date) : false;
    const allowTime = disabledTime(this.props, toLocalTimeZone(date, timeZone));

    return allowDate || allowTime;
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderCalendar() {
    const { isoWeek, limitEndYear, showWeekNumbers, showMeridian, timeZone } = this.props;
    const { calendarState, pageDate } = this.state;
    const calendarProps = _.mapValues(
      _.pick<DatePickerProps, CalendarOnlyPropsType>(this.props, calendarOnlyProps),
      disabledOrHiddenTimeFunc => (next: number, date: Date): boolean =>
        disabledOrHiddenTimeFunc(next, toLocalTimeZone(date, timeZone))
    );
    return (
      <Calendar
        {...calendarProps}
        showWeekNumbers={showWeekNumbers}
        showMeridian={showMeridian}
        disabledDate={this.disabledDate}
        limitEndYear={limitEndYear}
        format={this.getFormat()}
        timeZone={timeZone}
        isoWeek={isoWeek}
        calendarState={calendarState}
        pageDate={pageDate}
        onMoveForward={this.onMoveForward}
        onMoveBackward={this.onMoveBackward}
        onSelect={this.handleSelect}
        onToggleMonthDropdown={this.toggleMonthDropdown}
        onToggleTimeDropdown={this.toggleTimeDropdown}
        onChangePageDate={this.handleChangePageDate}
        onChangePageTime={this.handleChangePageTime}
        onToggleMeridian={this.handleToggleMeridian}
      />
    );
  }

  renderDropdownMenu(calendar: React.ReactNode) {
    const { ranges, menuClassName, oneTap } = this.props;
    const { pageDate } = this.state;
    const classes = classNames(this.addPrefix('date-menu'), menuClassName);

    return (
      <MenuWrapper className={classes}>
        <div ref={this.menuContainerRef}>
          {calendar}
          <Toolbar
            ranges={ranges}
            pageDate={pageDate}
            disabledHandle={this.disabledToolbarHandle}
            onShortcut={this.handleShortcutPageDate}
            onOk={this.handleOK}
            hideOkButton={oneTap}
          />
        </div>
      </MenuWrapper>
    );
  }

  render() {
    const {
      inline,
      className,
      disabled,
      cleanable,
      classPrefix,
      locale,
      toggleComponentClass,
      style,
      onEntered,
      onExited,
      onClean,
      timeZone,
      ...rest
    } = this.props;

    const value = this.getValue();
    const unhandled = getUnhandledProps(DatePicker, rest);
    const hasValue = !!value;
    const calendar = this.renderCalendar();

    if (inline) {
      return (
        <IntlContext.Provider value={locale}>
          <div className={classNames(classPrefix, this.addPrefix('date-inline'), className)}>
            {calendar}
          </div>
        </IntlContext.Provider>
      );
    }

    const classes = getToggleWrapperClassName('date', this.addPrefix, this.props, hasValue, {
      [this.addPrefix('date-only-time')]: shouldOnlyTime(this.getFormat())
    });

    locale.timeZone = timeZone;
    return (
      <IntlContext.Provider value={locale}>
        <div className={classes} style={style}>
          <PickerToggleTrigger
            pickerProps={this.props}
            ref={this.triggerRef}
            onEntered={createChainedFunction(this.handleEntered, onEntered)}
            onExited={createChainedFunction(this.handleExit, onExited)}
            speaker={this.renderDropdownMenu(calendar)}
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

polyfill(DatePicker);

export default defaultProps({
  classPrefix: 'picker'
})(DatePicker);
