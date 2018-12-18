// @flow

import * as React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { IntlProvider } from 'rsuite-intl';
import _ from 'lodash';

import { defaultProps, getUnhandledProps, prefix, createChainedFunction } from '../utils';
import Toolbar from './Toolbar';
import DatePicker from './DatePicker';
import setTimingMargin from './setTimingMargin';
import equalMoment from './equalMoment';
import Type from './Type';
import {
  PickerToggle,
  MenuWrapper,
  PickerToggleTrigger,
  getToggleWrapperClassName
} from '../_picker';
import type { Placement } from '../utils/TypeDefinition';

type Range = {
  label: React.Node,
  closeOverlay?: boolean,
  value: Array<moment$Moment> | ((value?: Array<moment$Moment>) => Array<moment$Moment>)
};

type Props = {
  appearance: 'default' | 'subtle',
  disabledDate?: (
    date: moment$Moment,
    selectValue: Array<moment$Moment | null>,
    doneSelected: boolean,
    type: string
  ) => boolean,
  ranges?: Array<Range>,
  value?: Array<moment$Moment>,
  defaultValue?: Array<moment$Moment>,
  placeholder?: React.Node,
  format: string,
  disabled?: boolean,
  locale?: Object,
  onChange?: (value: Array<moment$Moment>) => void,
  onOk?: (value?: Array<moment$Moment>, event: SyntheticEvent<*>) => void,
  hoverRange?: 'week' | 'month' | Function,
  cleanable?: boolean,
  isoWeek?: boolean,

  /**
   * 单击模式，是否只点选一次就选好值
   * 用于选择单日，或配合 hoverRange 使用
   */
  oneTap?: boolean,
  limitStartYear?: number,
  limitEndYear?: number,
  className?: string,
  menuClassName?: string,
  classPrefix?: string,
  container?: HTMLElement | (() => HTMLElement),
  containerPadding?: number,
  block?: boolean,
  toggleComponentClass?: React.ElementType,
  style?: Object,
  open?: boolean,
  defaultOpen?: boolean,
  placement?: Placement,
  onSelect?: (date: moment$Moment) => void,
  onOpen?: () => void,
  onClose?: () => void,
  onHide?: () => void,
  onEnter?: Function,
  onEntering?: Function,
  onEntered?: Function,
  onExit?: Function,
  onExiting?: Function,
  onExited?: Function
};

function getCalendarDate(value: Array<moment$Moment> = []) {
  let calendarDate = [moment(), moment().add(1, 'month')];

  // Update calendarDate if the value is not null
  if (value[0] && value[1]) {
    let isSameMonth = value[0].clone().isSame(value[1], 'month');
    calendarDate = [value[0], isSameMonth ? value[1].clone().add(1, 'month') : value[1].clone()];
  }
  return calendarDate;
}

type State = {
  value: Array<moment$Moment>,
  selectValue: Array<moment$Moment | any>,

  // Two clicks, the second click ends
  doneSelected: boolean,

  // display calendar date
  calendarDate: Array<moment$Moment>,

  // 当前应该高亮哪个区间，用于实现选择整周、整月
  hoverValue?: Array<moment$Moment>,

  // 当前 hover 的 date，用来减少 handleMouseMoveSelectValue 的计算
  currentHoverDate?: moment$Moment | null,

  active?: boolean
};

class DateRangePicker extends React.Component<Props, State> {
  static defaultProps = {
    appearance: 'default',
    placement: 'bottomLeft',
    limitStartYear: 5,
    limitEndYear: 5,
    format: 'YYYY-MM-DD',
    placeholder: '',
    cleanable: true,
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

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { value } = nextProps;
    if (typeof value === 'undefined') {
      return null;
    }

    if (
      (value[0] && !value[0].isSame(prevState.value[0], 'day')) ||
      (value[1] && !value[1].isSame(prevState.value[1], 'day'))
    ) {
      return {
        value,
        selectValue: value,
        calendarDate: getCalendarDate(value)
      };
    }

    return null;
  }

  constructor(props: Props) {
    super(props);

    const { defaultValue, value } = props;
    const activeValue = value || defaultValue || [];
    const calendarDate = getCalendarDate(activeValue);

    this.state = {
      value: activeValue,
      selectValue: activeValue,
      doneSelected: true,
      calendarDate,
      hoverValue: [],
      currentHoverDate: null
    };
  }
  getValue = (): Array<moment$Moment> => {
    const { value } = this.props;

    if (typeof value !== 'undefined') {
      return value;
    }

    return this.state.value || [];
  };

  getDateString(value?: Array<moment$Moment>) {
    const { placeholder, format } = this.props;
    const nextValue = value || this.getValue();
    const startDate = _.get(nextValue, '0');
    const endDate = _.get(nextValue, '1');

    if (startDate && endDate) {
      const displayValue = [startDate, endDate].sort(
        (a, b) => (a ? a.unix() : 0) - (b ? b.unix() : 0)
      );
      return `${displayValue[0].format(format)} ~ ${displayValue[1].format(format)}`;
    }

    return placeholder || `${format} ~ ${format}`;
  }

  // hover range presets
  getWeekHoverRange = (date: moment$Moment) => {
    const { isoWeek } = this.props;

    if (isoWeek) {
      // set to the first day of this week according to ISO 8601, 12:00 am
      return [date.clone().startOf('isoWeek'), date.clone().endOf('isoWeek')];
    }

    return [date.clone().startOf('week'), date.clone().endOf('week')];
  };
  getMonthHoverRange = (date: moment$Moment) => [
    date.clone().startOf('month'),
    date.clone().endOf('month')
  ];

  getHoverRange(date: moment$Moment) {
    const { hoverRange } = this.props;
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

    const hoverValues = hoverRangeFunc(date.clone());
    const isHoverRangeValid = hoverValues instanceof Array && hoverValues.length === 2;
    if (!isHoverRangeValid) {
      return [];
    }
    if (hoverValues[0].isAfter(hoverValues[1])) {
      hoverValues.reverse();
    }
    return hoverValues;
  }

  handleChangeCalendarDate = (index: number, date: moment$Moment) => {
    const { calendarDate } = this.state;
    calendarDate[index] = date;

    this.setState({ calendarDate });
  };

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

  resetPageDate() {
    const selectValue = this.getValue();
    const calendarDate = getCalendarDate(selectValue);
    this.setState({
      selectValue,
      calendarDate
    });
  }

  /**
   * Toolbar operation callback function
   */
  handleShortcutPageDate = (value: Array<moment$Moment>, closeOverlay?: boolean) => {
    this.updateValue(value, closeOverlay);
  };

  updateValue(nextSelectValue?: Array<moment$Moment>, closeOverlay?: boolean = true) {
    const { value, selectValue } = this.state;
    const { onChange } = this.props;
    const nextValue: any = !_.isUndefined(nextSelectValue) ? nextSelectValue : selectValue;

    this.setState({
      selectValue: nextValue || [],
      value: nextValue
    });

    if (
      onChange &&
      (!equalMoment(nextValue[0], value[0]) || !equalMoment(nextValue[1], value[1]))
    ) {
      onChange(nextValue);
    }

    // `closeOverlay` default value is `true`
    if (closeOverlay !== false) {
      this.close();
    }
  }

  handleOK = (event: SyntheticEvent<*>) => {
    const { onOk } = this.props;
    this.updateValue();
    onOk && onOk(this.state.selectValue, event);
  };

  handleChangeSelectValue = (date: moment$Moment) => {
    const { selectValue, doneSelected } = this.state;
    const { onSelect } = this.props;
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

      if (nextValue[0].isAfter(nextValue[1])) {
        nextValue.reverse();
      }

      nextValue[0] = setTimingMargin(nextValue[0]);
      nextValue[1] = setTimingMargin(nextValue[1]);

      this.setState({
        calendarDate: getCalendarDate(nextValue)
      });
    }

    const nextState = {
      doneSelected: !doneSelected,
      selectValue: nextValue,
      hoverValue: nextHoverValue
    };

    this.setState(nextState, () => {
      // 如果是单击模式，并且是第一次点选，再触发一次点击
      if (this.props.oneTap && !this.state.doneSelected) {
        this.handleChangeSelectValue(date);
      }
      onSelect && onSelect(date);
    });
  };

  handleMouseMoveSelectValue = (date: moment$Moment) => {
    const { doneSelected, selectValue, hoverValue, currentHoverDate } = this.state;
    const { hoverRange } = this.props;

    if (currentHoverDate && date.isSame(currentHoverDate, 'day')) {
      return;
    }

    let nextHoverValue = this.getHoverRange(date);

    if (doneSelected && !_.isUndefined(hoverRange)) {
      this.setState({
        currentHoverDate: date,
        hoverValue: nextHoverValue
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
        nextHoverValue[0].isBefore(hoverValue[0]) ? nextHoverValue[0] : hoverValue[0],
        nextHoverValue[1].isAfter(hoverValue[1]) ? nextHoverValue[1] : hoverValue[1],
        nextValue[2]
      ];
    }

    // If `nextValue[0]` is greater than `nextValue[1]` then reverse order
    if (nextValue[0].isAfter(nextValue[1])) {
      nextValue.reverse();
    }

    this.setState({
      currentHoverDate: date,
      selectValue: nextValue
    });
  };

  handleClean = () => {
    this.setState({ calendarDate: [moment(), moment().add(1, 'month')] });
    this.updateValue([]);
  };

  handleEntered = () => {
    const { onOpen } = this.props;
    onOpen && onOpen();
    this.setState({
      active: true
    });
  };

  handleExited = () => {
    const { onClose } = this.props;
    onClose && onClose();
    this.setState({
      active: false
    });
  };

  disabledByBetween(start: moment$Moment, end: moment$Moment, type: string) {
    const { disabledDate } = this.props;
    const { selectValue, doneSelected } = this.state;
    const date = start.clone();
    const selectStartDate = selectValue[0] ? selectValue[0].clone() : null;
    const selectEndDate = selectValue[1] ? selectValue[1].clone() : null;
    const nextSelectValue = [selectStartDate, selectEndDate];

    // If the date is between the start and the end
    // the button is disabled
    while (start.isBefore(end) || start.isSame(end, 'day')) {
      if (disabledDate && disabledDate(date, nextSelectValue, doneSelected, type)) {
        return true;
      }
      start.add(1, 'd');
    }

    return false;
  }

  disabledOkButton = () => {
    const { selectValue, doneSelected } = this.state;

    if (!selectValue[0] || !selectValue[1] || !doneSelected) {
      return true;
    }

    return this.disabledByBetween(
      selectValue[0].clone(),
      selectValue[1].clone(),
      Type.TOOLBAR_BUTTON_OK
    );
  };

  disabledShortcutButton = (value: Array<moment$Moment> = []) => {
    if (!value[0] || !value[1]) {
      return true;
    }
    return this.disabledByBetween(value[0].clone(), value[1].clone(), Type.TOOLBAR_SHORTCUT);
  };

  handleDisabledDate = (date: moment$Moment, values: Array<moment$Moment | null>, type: string) => {
    const { disabledDate } = this.props;
    const { doneSelected } = this.state;
    if (disabledDate) {
      return disabledDate(date, values, doneSelected, type);
    }
    return false;
  };
  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  trigger = null;
  menuContainer = null;
  container = null;

  bindTriggerRef = (ref: React.ElementRef<*>) => {
    this.trigger = ref;
  };

  bindContainerRef = (ref: React.ElementRef<*>) => {
    this.container = ref;
  };

  bindMenuContainerRef = (ref: React.ElementRef<*>) => {
    this.menuContainer = ref;
  };

  renderDropdownMenu() {
    const { placement, menuClassName, ranges, isoWeek, limitStartYear, limitEndYear } = this.props;
    const { calendarDate, selectValue, hoverValue, doneSelected } = this.state;

    const classes = classNames(
      this.addPrefix('daterange-menu'),
      this.addPrefix(`placement-${_.kebabCase(placement)}`),
      menuClassName
    );

    const pickerProps = {
      isoWeek,
      doneSelected,
      hoverValue,
      calendarDate,
      limitStartYear,
      limitEndYear,
      value: selectValue,
      disabledDate: this.handleDisabledDate,
      onSelect: this.handleChangeSelectValue,
      onMouseMove: this.handleMouseMoveSelectValue,
      onChangeCalendarDate: this.handleChangeCalendarDate
    };

    return (
      <MenuWrapper className={classes} ref={this.bindMenuContainerRef}>
        <div className={this.addPrefix('daterange-panel')}>
          <div className={this.addPrefix('daterange-content')}>
            <div className={this.addPrefix('daterange-header')}>
              {this.getDateString(selectValue)}
            </div>
            <div className={this.addPrefix('daterange-calendar-group')}>
              <DatePicker index={0} {...pickerProps} />
              <DatePicker index={1} {...pickerProps} />
            </div>
          </div>
          <Toolbar
            ranges={ranges}
            selectValue={selectValue}
            disabledOkButton={this.disabledOkButton}
            disabledShortcutButton={this.disabledShortcutButton}
            onShortcut={this.handleShortcutPageDate}
            onOk={this.handleOK}
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
      onExited,
      ...rest
    } = this.props;

    const value = this.getValue();
    const unhandled = getUnhandledProps(DateRangePicker, rest);
    const hasValue = value && value.length > 1;
    const classes = getToggleWrapperClassName('daterange', this.addPrefix, this.props, hasValue);

    return (
      <IntlProvider locale={locale}>
        <div className={classes} style={style} ref={this.bindContainerRef}>
          <PickerToggleTrigger
            pickerProps={this.props}
            innerRef={this.bindTriggerRef}
            onEntered={createChainedFunction(this.handleEntered, onEntered)}
            onExited={createChainedFunction(this.handleExited, onExited)}
            speaker={this.renderDropdownMenu()}
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

const enhance = defaultProps({
  classPrefix: 'picker'
});

export default enhance(DateRangePicker);
