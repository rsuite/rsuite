import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import compose from 'recompose/compose';
import _ from 'lodash';
import { polyfill } from 'react-lifecycles-compat';
import {
  format,
  getMinutes,
  getHours,
  isSameDay,
  getSeconds,
  setHours,
  setMinutes,
  setSeconds
} from 'date-fns';

import IntlProvider from '../IntlProvider';
import Calendar from '../Calendar/Calendar';
import Toolbar from './Toolbar';

import disabledTime, { calendarOnlyProps } from '../utils/disabledTime';
import { shouldOnlyTime } from '../utils/formatUtils';
import composeFunctions from '../utils/composeFunctions';
import {
  defaultProps,
  getUnhandledProps,
  prefix,
  createChainedFunction,
  withPickerMethods
} from '../utils';

import {
  PickerToggle,
  MenuWrapper,
  PickerToggleTrigger,
  getToggleWrapperClassName
} from '../Picker';

import { DatePickerProps } from './DatePicker.d';
import { PLACEMENT } from '../constants';

interface DatePickerState {
  value?: Date;
  calendarState?: 'DROP_MONTH' | 'DROP_TIME';
  pageDate: Date;
  active?: boolean;
}

class DatePicker extends React.Component<DatePickerProps, DatePickerState> {
  static propTypes = {
    appearance: PropTypes.oneOf(['default', 'subtle']),
    ranges: PropTypes.array,
    defaultValue: PropTypes.instanceOf(Date),
    value: PropTypes.instanceOf(Date),
    calendarDefaultDate: PropTypes.instanceOf(Date),
    placeholder: PropTypes.string,
    format: PropTypes.string,
    disabled: PropTypes.bool,
    locale: PropTypes.object,
    inline: PropTypes.bool,
    cleanable: PropTypes.bool,
    isoWeek: PropTypes.bool,
    limitEndYear: PropTypes.number,
    className: PropTypes.string,
    menuClassName: PropTypes.string,
    classPrefix: PropTypes.string,
    container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    containerPadding: PropTypes.number,
    block: PropTypes.bool,
    toggleComponentClass: PropTypes.elementType,
    open: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    placement: PropTypes.oneOf(PLACEMENT),
    style: PropTypes.object,
    oneTap: PropTypes.bool,
    preventOverflow: PropTypes.bool,
    showWeekNumbers: PropTypes.bool,
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
    onOk: PropTypes.func,
    onClean: PropTypes.func,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onHide: PropTypes.func,
    renderValue: PropTypes.func
  };
  static defaultProps = {
    appearance: 'default',
    placement: 'bottomStart',
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
    },
    cleanable: true
  };
  menuContainerRef: React.RefObject<any>;
  triggerRef: React.RefObject<any>;

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
      return renderValue ? renderValue(value, formatType) : format(value, formatType);
    }

    return placeholder || formatType;
  }

  calendar = null;

  handleChangePageDate = (nextPageDate: Date) => {
    this.setState({
      pageDate: nextPageDate,
      calendarState: undefined
    });
    this.handleAllSelect(nextPageDate);
  };

  handleChangePageTime = (nextPageTime: Date) => {
    this.setState({
      pageDate: nextPageTime
    });
    this.handleAllSelect(nextPageTime);
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
    if (this.triggerRef.current) {
      this.triggerRef.current.hide();
    }
  };

  handleOpenDropdown = () => {
    if (this.triggerRef.current) {
      this.triggerRef.current.show();
    }
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
    const { format, isoWeek, limitEndYear, disabledDate, showWeekNumbers } = this.props;
    const { calendarState, pageDate } = this.state;
    const calendarProps = _.pick(this.props, calendarOnlyProps);

    return (
      <Calendar
        {...calendarProps}
        showWeekNumbers={showWeekNumbers}
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
        <IntlProvider locale={locale}>
          <div className={classNames(classPrefix, this.addPrefix('date-inline'), className)}>
            {calendar}
          </div>
        </IntlProvider>
      );
    }

    const classes = getToggleWrapperClassName('date', this.addPrefix, this.props, hasValue, {
      [this.addPrefix('date-only-time')]: shouldOnlyTime(format)
    });

    return (
      <IntlProvider locale={locale}>
        <div className={classes} style={style}>
          <PickerToggleTrigger
            pickerProps={this.props}
            ref={this.triggerRef}
            onEntered={createChainedFunction(this.handleEntered, onEntered)}
            onExit={createChainedFunction(this.handleExit, onExited)}
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
      </IntlProvider>
    );
  }
}

polyfill(DatePicker);

const enhance = compose(
  defaultProps<DatePickerProps>({
    classPrefix: 'picker'
  }),
  withPickerMethods<DatePickerProps>()
);

export default enhance(DatePicker);
