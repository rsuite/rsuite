// @flow

import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { IntlProvider } from 'rsuite-intl';
import { polyfill } from 'react-lifecycles-compat';

import Calendar from '../Calendar';
import Toolbar from './Toolbar';
import { defaultProps, getUnhandledProps, prefix, createChainedFunction } from '../utils';
import disabledTime, { calendarOnlyProps } from '../utils/disabledTime';
import {
  PickerToggle,
  MenuWrapper,
  PickerToggleTrigger,
  getToggleWrapperClassName
} from '../_picker';
import { shouldOnlyTime } from '../utils/formatUtils';
import type { Placement } from '../utils/TypeDefinition';
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
import composeFunctions from '../utils/composeFunctions';

type Range = {
  label: React.Node,
  closeOverlay?: boolean,
  value: Date | ((pageDate?: Date) => Date)
};

type Props = {
  appearance: 'default' | 'subtle',
  disabledDate?: (date?: Date) => boolean,
  disabledHours?: (hour: number, date: Date) => boolean,
  disabledMinutes?: (minute: number, date: Date) => boolean,
  disabledSeconds?: (second: number, date: Date) => boolean,
  hideHours?: (hour: number, date: Date) => boolean,
  hideMinutes?: (minute: number, date: Date) => boolean,
  hideSeconds?: (second: number, date: Date) => boolean,
  ranges?: Array<Range>,
  defaultValue?: Date,
  value?: Date,
  calendarDefaultDate?: Date,
  placeholder?: string,
  format: string,
  disabled?: boolean,
  locale?: Object,
  inline?: boolean,
  onChange?: (value: Date | null) => void,
  onChangeCalendarDate?: (date: Date, event?: SyntheticEvent<*>) => void,
  onToggleMonthDropdown?: (toggle: boolean) => void,
  onToggleTimeDropdown?: (toggle: boolean) => void,
  onSelect?: (date: Date, event?: SyntheticEvent<*>) => void,
  onPrevMonth?: (date: Date) => void,
  onNextMonth?: (date: Date) => void,
  onOk?: (date: Date, event: SyntheticEvent<*>) => void,
  onClean?: (event: SyntheticEvent<*>) => void,
  onEnter?: () => void,
  onEntering?: () => void,
  onEntered?: () => void,
  onExit?: () => void,
  onExiting?: () => void,
  onExited?: () => void,
  cleanable?: boolean,
  isoWeek?: boolean,
  limitEndYear?: number,
  className?: string,
  menuClassName?: string,
  classPrefix?: string,
  container?: HTMLElement | (() => HTMLElement),
  containerPadding?: number,
  block?: boolean,
  toggleComponentClass?: React.ElementType,
  open?: boolean,
  defaultOpen?: boolean,
  placement?: Placement,
  onOpen?: () => void,
  onClose?: () => void,
  onHide?: () => void,
  style?: Object,
  // 一键选值
  oneTap?: boolean,
  renderValue?: (value: Date, format: string) => React.Node
};

type State = {
  value?: Date,
  calendarState?: 'DROP_MONTH' | 'DROP_TIME',
  pageDate: Date,
  active?: boolean
};

class DatePicker extends React.Component<Props, State> {
  static defaultProps = {
    appearance: 'default',
    placement: 'bottomLeft',
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

  constructor(props: Props) {
    super(props);

    const { defaultValue, value, calendarDefaultDate } = props;
    const activeValue = value || defaultValue;

    this.state = {
      value: activeValue,
      pageDate: activeValue || calendarDefaultDate || new Date() // display calendar date
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
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
    const { onNextMonth, onChangeCalendarDate } = this.props;
    this.setState({
      pageDate: nextPageDate
    });
    onNextMonth && onNextMonth(nextPageDate);
    onChangeCalendarDate && onChangeCalendarDate(nextPageDate);
  };

  onMoveBackward = (nextPageDate: Date) => {
    const { onPrevMonth, onChangeCalendarDate } = this.props;
    this.setState({
      pageDate: nextPageDate
    });
    onPrevMonth && onPrevMonth(nextPageDate);
    onChangeCalendarDate && onChangeCalendarDate(nextPageDate);
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

  handleShortcutPageDate = (value: Date, closeOverlay?: boolean, event?: SyntheticEvent<*>) => {
    this.updateValue(value, closeOverlay);
    this.handleAllSelect(value, event);
  };

  handleOK = (event: SyntheticEvent<*>) => {
    const { onOk } = this.props;
    this.updateValue();
    onOk && onOk(this.state.pageDate, event);
  };

  updateValue(nextPageDate?: Date | null, closeOverlay?: boolean = true) {
    const { pageDate } = this.state;
    const { onChange } = this.props;
    const value = this.getValue();
    const nextValue: any = !_.isUndefined(nextPageDate) ? nextPageDate : pageDate;

    this.setState({
      pageDate: nextValue || new Date(),
      value: nextValue
    });

    if (nextValue !== value || !isSameDay(nextValue, value)) {
      onChange && onChange(nextValue);
    }

    // `closeOverlay` default value is `true`
    if (closeOverlay !== false) {
      this.close();
    }
  }

  resetPageDate() {
    const { calendarDefaultDate } = this.props;
    const value = this.getValue();
    this.setState({
      pageDate: value || calendarDefaultDate || new Date()
    });
  }

  open() {
    if (this.trigger) {
      this.trigger.show();
    }
  }

  close() {
    if (this.trigger) {
      this.trigger.hide();
    }
  }

  showMonthDropdown() {
    this.setState({ calendarState: 'DROP_MONTH' });
  }

  hideMonthDropdown() {
    this.setState({ calendarState: undefined });
  }

  showTimeDropdown() {
    this.setState({ calendarState: 'DROP_TIME' });
  }

  hideTimeDropdown() {
    this.setState({ calendarState: undefined });
  }

  toggleMonthDropdown = () => {
    const { calendarState } = this.state;
    const { onToggleMonthDropdown } = this.props;
    let toggle;

    if (calendarState === 'DROP_MONTH') {
      this.hideMonthDropdown();
      toggle = false;
    } else {
      this.showMonthDropdown();
      toggle = true;
    }
    onToggleMonthDropdown && onToggleMonthDropdown(toggle);
  };

  toggleTimeDropdown = () => {
    const { calendarState } = this.state;
    const { onToggleTimeDropdown } = this.props;
    let toggle;
    if (calendarState === 'DROP_TIME') {
      this.hideTimeDropdown();
      toggle = false;
    } else {
      this.showTimeDropdown();
      toggle = true;
    }

    onToggleTimeDropdown && onToggleTimeDropdown(toggle);
  };

  handleClean = () => {
    this.setState({ pageDate: new Date() });
    this.updateValue(null);
  };
  handleAllSelect = (nextValue: Date, event?: SyntheticEvent<*>) => {
    const { onSelect, onChangeCalendarDate } = this.props;
    onSelect && onSelect(nextValue, event);
    onChangeCalendarDate && onChangeCalendarDate(nextValue, event);
  };

  handleSelect = (nextValue: Date) => {
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
      this.updateValue(nextValue);
    }
  };

  handleEntered = () => {
    const { onOpen } = this.props;
    onOpen && onOpen();

    this.setState({
      active: true
    });
  };

  handleExit = () => {
    const { onClose } = this.props;
    onClose && onClose();

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

  calendar = null;
  container = null;
  trigger = null;
  menuContainer = null;

  bindTriggerRef = (ref: React.ElementRef<*>) => {
    this.trigger = ref;
  };

  bindContainerRef = (ref: React.ElementRef<*>) => {
    this.container = ref;
  };

  bindMenuContainerRef = (ref: React.ElementRef<*>) => {
    this.menuContainer = ref;
  };

  bindCalendarRef = (ref: React.ElementRef<*>) => {
    this.calendar = ref;
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderCalendar() {
    const { format, isoWeek, limitEndYear, disabledDate } = this.props;
    const { calendarState, pageDate } = this.state;
    const calendarProps = _.pick(this.props, calendarOnlyProps);

    return (
      <Calendar
        {...calendarProps}
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
        calendarRef={this.bindCalendarRef}
      />
    );
  }
  renderDropdownMenu(calendar: React.Node) {
    const { placement, ranges, menuClassName, oneTap } = this.props;
    const { pageDate } = this.state;
    const classes = classNames(
      this.addPrefix('date-menu'),
      this.addPrefix(`placement-${_.kebabCase(placement)}`),
      menuClassName
    );

    return (
      <MenuWrapper className={classes}>
        <div ref={this.bindMenuContainerRef}>
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
        <div className={classes} style={style} ref={this.bindContainerRef}>
          <PickerToggleTrigger
            pickerProps={this.props}
            innerRef={this.bindTriggerRef}
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

const enhance = defaultProps({
  classPrefix: 'picker'
});

export default enhance(DatePicker);
