import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { polyfill } from 'react-lifecycles-compat';
import {
  getMinutes,
  getHours,
  isSameDay,
  getSeconds,
  setHours,
  setMinutes,
  setSeconds
} from 'date-fns';

import IntlContext from '../IntlProvider/IntlContext';
import FormattedDate from '../IntlProvider/FormattedDate';
import Calendar from '../Calendar/Calendar';
import Toolbar from './Toolbar';

import { disabledTime, calendarOnlyProps } from '../utils/timeUtils';
import { shouldOnlyTime } from '../utils/formatUtils';
import composeFunctions from '../utils/composeFunctions';
import { defaultProps, getUnhandledProps, prefix, createChainedFunction } from '../utils';

import {
  PickerToggle,
  MenuWrapper,
  PickerToggleTrigger,
  getToggleWrapperClassName
} from '../Picker';

import { DatePickerProps } from './DatePicker.d';
import { pickerPropTypes, pickerDefaultProps } from '../Picker/propTypes';

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
    format: 'YYYY-MM-DD',
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

    const { defaultValue, value, calendarDefaultDate } = props;
    const activeValue = value || defaultValue;

    this.state = {
      value: activeValue,
      pageDate: activeValue || calendarDefaultDate || new Date() // display calendar date
    };

    this.triggerRef = React.createRef();

    // for test
    this.menuContainerRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps: DatePickerProps, prevState: DatePickerState) {
    if (typeof nextProps.value !== 'undefined') {
      const { value } = nextProps;

      if (value && !isSameDay(value, prevState.value)) {
        return {
          value,
          pageDate: value
        };
      }

      return {
        value
      };
    }

    return null;
  }

  onMoveForword = (nextPageDate: Date) => {
    this.setState({
      pageDate: nextPageDate
    });
    this.props.onNextMonth?.(nextPageDate);
    this.props.onChangeCalendarDate?.(nextPageDate);
  };

  onMoveBackward = (nextPageDate: Date) => {
    this.setState({
      pageDate: nextPageDate
    });
    this.props.onPrevMonth?.(nextPageDate);
    this.props.onChangeCalendarDate?.(nextPageDate);
  };

  getValue = () => {
    return this.props.value || this.state.value;
  };

  getDateString() {
    const { placeholder, format: formatType, renderValue } = this.props;
    const value = this.getValue();

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
    this.props.onOk?.(this.state.pageDate, event);
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
      this.props.onChange?.(nextValue, event);
    }

    // `closeOverlay` default value is `true`
    if (closeOverlay !== false) {
      this.handleCloseDropdown();
    }
  }

  resetPageDate() {
    const { calendarDefaultDate } = this.props;
    const value = this.getValue();
    this.setState({
      pageDate: value || calendarDefaultDate || new Date()
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
    this.setState({ pageDate: new Date() });
    this.updateValue(event, null);
  };
  handleAllSelect = (nextValue: Date, event?: React.SyntheticEvent<any>) => {
    this.props.onSelect?.(nextValue, event);
    this.props.onChangeCalendarDate?.(nextValue, event);
  };

  handleSelect = (nextValue: Date, event: React.SyntheticEvent<any>) => {
    const { oneTap } = this.props;
    const { pageDate } = this.state;

    this.setState({
      pageDate: composeFunctions(
        d => setHours(d, getHours(pageDate)),
        d => setMinutes(d, getMinutes(pageDate)),
        d => setSeconds(d, getSeconds(pageDate))
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

  disabledToolbarHandle = (date?: Date): boolean => {
    const { disabledDate } = this.props;
    const allowDate = disabledDate ? disabledDate(date) : false;
    const allowTime = disabledTime(this.props, date);

    return allowDate || allowTime;
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderCalendar() {
    const {
      format,
      isoWeek,
      limitEndYear,
      disabledDate,
      showWeekNumbers,
      showMeridian
    } = this.props;
    const { calendarState, pageDate } = this.state;
    const calendarProps = _.pick(this.props, calendarOnlyProps);

    return (
      <Calendar
        {...calendarProps}
        showWeekNumbers={showWeekNumbers}
        showMeridian={showMeridian}
        disabledDate={disabledDate}
        limitEndYear={limitEndYear}
        format={format}
        isoWeek={isoWeek}
        calendarState={calendarState}
        pageDate={pageDate}
        onMoveForword={this.onMoveForword}
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
      format,
      locale,
      toggleComponentClass,
      style,
      onEntered,
      onExited,
      onClean,
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
      [this.addPrefix('date-only-time')]: shouldOnlyTime(format)
    });

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
              aria-disabled={disabled}
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
