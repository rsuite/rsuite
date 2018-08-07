// @flow

import * as React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import _ from 'lodash';
import { IntlProvider } from 'rsuite-intl';
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';
import { MenuWrapper } from 'rsuite-utils/lib/Picker';
import { polyfill } from 'react-lifecycles-compat';

import PickerToggle from '../_picker/PickerToggle';
import getToggleWrapperClassName from '../_picker/getToggleWrapperClassName';
import Calendar from '../Calendar';
import Toolbar from './Toolbar';
import { defaultProps, getUnhandledProps, prefix, createChainedFunction } from '../utils';
import disabledTime, { calendarOnlyProps } from '../utils/disabledTime';
import { shouldOnlyTime } from '../utils/formatUtils';
import type { Placement } from '../utils/TypeDefinition';

type Range = {
  label: React.Node,
  closeOverlay?: boolean,
  value: moment$Moment | ((pageDate?: moment$Moment) => moment$Moment)
};

type Props = {
  appearance: 'default' | 'subtle',
  disabledDate?: (date?: moment$Moment) => boolean,
  disabledHours?: (hour: number, date: moment$Moment) => boolean,
  disabledMinutes?: (minute: number, date: moment$Moment) => boolean,
  disabledSeconds?: (second: number, date: moment$Moment) => boolean,
  hideHours?: (hour: number, date: moment$Moment) => boolean,
  hideMinutes?: (minute: number, date: moment$Moment) => boolean,
  hideSeconds?: (second: number, date: moment$Moment) => boolean,
  ranges?: Array<Range>,
  defaultValue?: moment$Moment,
  value?: moment$Moment,
  calendarDefaultDate?: moment$Moment,
  placeholder?: string,
  format: string,
  disabled?: boolean,
  locale?: Object,
  inline?: boolean,
  onChange?: (value: moment$Moment | null) => void,
  onChangeCalendarDate?: (date: moment$Moment, event?: SyntheticEvent<*>) => void,
  onToggleMonthDropdown?: (toggle: boolean) => void,
  onToggleTimeDropdown?: (toggle: boolean) => void,
  onSelect?: (date: moment$Moment, event?: SyntheticEvent<*>) => void,
  onPrevMonth?: (date: moment$Moment) => void,
  onNextMonth?: (date: moment$Moment) => void,
  onOk?: (date: moment$Moment, event: SyntheticEvent<*>) => void,
  onEnter?: Function,
  onEntering?: Function,
  onEntered?: Function,
  onExit?: Function,
  onExiting?: Function,
  onExited?: Function,
  cleanable?: boolean,
  isoWeek?: boolean,
  limitStartYear?: number,
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
  style?: Object
};

type State = {
  value?: moment$Moment,
  calendarState?: 'DROP_MONTH' | 'DROP_TIME',
  pageDate: moment$Moment
};

class DatePicker extends React.Component<Props, State> {
  static defaultProps = {
    appearance: 'default',
    placement: 'bottomLeft',
    limitStartYear: 5,
    limitEndYear: 5,
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
      pageDate: activeValue || calendarDefaultDate || moment() // display calendar date
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (typeof nextProps.value !== 'undefined') {
      const { value } = nextProps;

      if (!value.isSame(prevState.value, 'day')) {
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

  onMoveForword = (nextPageDate: moment$Moment) => {
    const { onNextMonth, onChangeCalendarDate } = this.props;
    this.setState({
      pageDate: nextPageDate
    });
    onNextMonth && onNextMonth(nextPageDate);
    onChangeCalendarDate && onChangeCalendarDate(nextPageDate);
  };

  onMoveBackward = (nextPageDate: moment$Moment) => {
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

    return value ? value.format(this.props.format) : placeholder || format;
  }

  calendar = null;

  handleChangePageDate = (nextPageDate: moment$Moment) => {
    this.setState({
      pageDate: nextPageDate,
      calendarState: undefined
    });
    this.handleAllSelect(nextPageDate);
  };

  handleChangePageTime = (nextPageTime: moment$Moment) => {
    this.setState({
      pageDate: nextPageTime
    });
    this.handleAllSelect(nextPageTime);
  };

  handleShortcutPageDate = (
    value: moment$Moment,
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

  updateValue(nextPageDate?: moment$Moment | null, closeOverlay?: boolean = true) {
    const { pageDate } = this.state;
    const { onChange } = this.props;
    const value = this.getValue();
    const nextValue: any = !_.isUndefined(nextPageDate) ? nextPageDate : pageDate;

    this.setState({
      pageDate: nextValue || moment(),
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
      pageDate: value || calendarDefaultDate || moment()
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
    this.setState({ pageDate: moment() });
    this.updateValue(null);
  };
  handleAllSelect = (nextValue: moment$Moment, event?: SyntheticEvent<*>) => {
    const { onSelect, onChangeCalendarDate } = this.props;
    onSelect && onSelect(nextValue, event);
    onChangeCalendarDate && onChangeCalendarDate(nextValue, event);
  };
  handleSelect = (nextValue: moment$Moment) => {
    const { pageDate } = this.state;
    nextValue
      .hours(pageDate.hours())
      .minutes(pageDate.minutes())
      .seconds(pageDate.seconds());

    this.setState({
      pageDate: nextValue
    });

    this.handleAllSelect(nextValue);
  };

  handleEntered = () => {
    const { onOpen } = this.props;
    onOpen && onOpen();
  };

  handleExited = () => {
    const { onClose } = this.props;
    onClose && onClose();
  };

  disabledToolbarHandle = (date?: moment$Moment): boolean => {
    const { disabledDate } = this.props;
    const allowDate = disabledDate ? disabledDate(date) : false;
    const allowTime = disabledTime(this.props, date);

    return allowDate || allowTime;
  };

  calendar = null;
  container = null;
  trigger = null;
  menuContainer = null;

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderCalendar() {
    const { format, isoWeek, limitStartYear, limitEndYear, disabledDate } = this.props;
    const { calendarState, pageDate } = this.state;
    const calendarProps = _.pick(this.props, calendarOnlyProps);

    return (
      <Calendar
        {...calendarProps}
        disabledDate={disabledDate}
        limitStartYear={limitStartYear}
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
        calendarRef={ref => {
          this.calendar = ref;
        }}
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
        <div
          ref={ref => {
            // for test
            this.menuContainer = ref;
          }}
        >
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
      ranges,
      cleanable,
      open,
      defaultOpen,
      placement,
      classPrefix,
      format,
      locale,
      toggleComponentClass,
      block,
      style,
      container,
      containerPadding,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      appearance,
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
        <div
          className={classes}
          style={style}
          ref={ref => {
            this.container = ref;
          }}
        >
          <OverlayTrigger
            ref={ref => {
              this.trigger = ref;
            }}
            open={open}
            defaultOpen={defaultOpen}
            disabled={disabled}
            trigger="click"
            placement={placement}
            onEnter={onEnter}
            onEntering={onEntering}
            onEntered={createChainedFunction(this.handleEntered, onEntered)}
            onExit={onExit}
            onExiting={onExiting}
            onExited={createChainedFunction(this.handleExited, onExited)}
            speaker={this.renderDropdownMenu(calendar)}
            container={container}
            containerPadding={containerPadding}
          >
            <PickerToggle
              {...unhandled}
              componentClass={toggleComponentClass}
              onClean={this.handleClean}
              cleanable={cleanable && !disabled}
              hasValue={hasValue}
            >
              {this.getDateString()}
            </PickerToggle>
          </OverlayTrigger>
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
