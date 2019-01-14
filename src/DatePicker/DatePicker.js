// @flow

import * as React from 'react';
import dayjs from 'dayjs';
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

type Range = {
  label: React.Node,
  closeOverlay?: boolean,
  value: dayjs.Dayjs | ((pageDate?: dayjs.Dayjs) => dayjs.Dayjs)
};

type Props = {
  appearance: 'default' | 'subtle',
  disabledDate?: (date?: dayjs.Dayjs) => boolean,
  disabledHours?: (hour: number, date: dayjs.Dayjs) => boolean,
  disabledMinutes?: (minute: number, date: dayjs.Dayjs) => boolean,
  disabledSeconds?: (second: number, date: dayjs.Dayjs) => boolean,
  hideHours?: (hour: number, date: dayjs.Dayjs) => boolean,
  hideMinutes?: (minute: number, date: dayjs.Dayjs) => boolean,
  hideSeconds?: (second: number, date: dayjs.Dayjs) => boolean,
  ranges?: Array<Range>,
  defaultValue?: dayjs.Dayjs,
  value?: dayjs.Dayjs,
  calendarDefaultDate?: dayjs.Dayjs,
  placeholder?: string,
  format: string,
  disabled?: boolean,
  locale?: Object,
  inline?: boolean,
  onChange?: (value: dayjs.Dayjs | null) => void,
  onChangeCalendarDate?: (date: dayjs.Dayjs, event?: SyntheticEvent<*>) => void,
  onToggleMonthDropdown?: (toggle: boolean) => void,
  onToggleTimeDropdown?: (toggle: boolean) => void,
  onSelect?: (date: dayjs.Dayjs, event?: SyntheticEvent<*>) => void,
  onPrevMonth?: (date: dayjs.Dayjs) => void,
  onNextMonth?: (date: dayjs.Dayjs) => void,
  onOk?: (date: dayjs.Dayjs, event: SyntheticEvent<*>) => void,
  onEnter?: Function,
  onEntering?: Function,
  onEntered?: Function,
  onExit?: Function,
  onExiting?: Function,
  onExited?: Function,
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
  style?: Object
};

type State = {
  value?: dayjs.Dayjs,
  calendarState?: 'DROP_MONTH' | 'DROP_TIME',
  pageDate: dayjs.Dayjs,
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
      pageDate: activeValue || calendarDefaultDate || dayjs() // display calendar date
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (typeof nextProps.value !== 'undefined') {
      const { value } = nextProps;

      if (value && !value.isSame(prevState.value, 'day')) {
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

  onMoveForword = (nextPageDate: dayjs.Dayjs) => {
    const { onNextMonth, onChangeCalendarDate } = this.props;
    this.setState({
      pageDate: nextPageDate
    });
    onNextMonth && onNextMonth(nextPageDate);
    onChangeCalendarDate && onChangeCalendarDate(nextPageDate);
  };

  onMoveBackward = (nextPageDate: dayjs.Dayjs) => {
    const { onPrevMonth, onChangeCalendarDate } = this.props;
    this.setState({
      pageDate: nextPageDate
    });
    onPrevMonth && onPrevMonth(nextPageDate);
    onChangeCalendarDate && onChangeCalendarDate(nextPageDate);
  };

  getValue = () => {
    const value = this.props.value || this.state.value;
    return value ? value.clone() : null;
  };

  getDateString() {
    const { placeholder, format } = this.props;
    const value = this.getValue();

    return value ? value.format(format) : placeholder || format;
  }

  calendar = null;

  handleChangePageDate = (nextPageDate: dayjs.Dayjs) => {
    this.setState({
      pageDate: nextPageDate,
      calendarState: undefined
    });
    this.handleAllSelect(nextPageDate);
  };

  handleChangePageTime = (nextPageTime: dayjs.Dayjs) => {
    this.setState({
      pageDate: nextPageTime
    });
    this.handleAllSelect(nextPageTime);
  };

  handleShortcutPageDate = (
    value: dayjs.Dayjs,
    closeOverlay?: boolean,
    event?: SyntheticEvent<*>
  ) => {
    this.updateValue(value, closeOverlay);
    this.handleAllSelect(value, event);
  };

  handleOK = (event: SyntheticEvent<*>) => {
    const { onOk } = this.props;
    this.updateValue();
    onOk && onOk(this.state.pageDate, event);
  };

  updateValue(nextPageDate?: dayjs.Dayjs | null, closeOverlay?: boolean = true) {
    const { pageDate } = this.state;
    const { onChange } = this.props;
    const value = this.getValue();
    const nextValue: any = !_.isUndefined(nextPageDate) ? nextPageDate : pageDate;

    this.setState({
      pageDate: nextValue || dayjs(),
      value: nextValue
    });

    if (nextValue !== value || !nextValue.isSame(value)) {
      onChange && onChange(nextValue ? nextValue.clone() : null);
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
      pageDate: value || calendarDefaultDate || dayjs()
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
    this.setState({ pageDate: dayjs() });
    this.updateValue(null);
  };
  handleAllSelect = (nextValue: dayjs.Dayjs, event?: SyntheticEvent<*>) => {
    const { onSelect, onChangeCalendarDate } = this.props;
    onSelect && onSelect(nextValue, event);
    onChangeCalendarDate && onChangeCalendarDate(nextValue, event);
  };
  handleSelect = (nextValue: dayjs.Dayjs) => {
    const { pageDate } = this.state;
    nextValue
      .set('hour', pageDate.hour())
      .set('minute', pageDate.minute())
      .set('second', pageDate.second());

    this.setState({
      pageDate: nextValue
    });

    this.handleAllSelect(nextValue);
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

  disabledToolbarHandle = (date?: dayjs.Dayjs): boolean => {
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
    const { placement, ranges, menuClassName } = this.props;
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
              onClean={this.handleClean}
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
