// @flow

import * as React from 'react';
import classNames from 'classnames';
import { IntlProvider } from 'rsuite-intl';
import _ from 'lodash';

import { defaultProps, getUnhandledProps, prefix, createChainedFunction } from '../utils';
import Toolbar from './Toolbar';
import DatePicker from './DatePicker';
import setTimingMargin from './setTimingMargin';
import Type from './Type';
import {
  PickerToggle,
  MenuWrapper,
  PickerToggleTrigger,
  getToggleWrapperClassName
} from '../_picker';
import type { Placement } from '../utils/TypeDefinition';
import {
  format,
  addDays,
  isBefore,
  isAfter,
  isSameDay,
  isSameMonth,
  addMonths,
  startOfISOWeek,
  endOfISOWeek,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  compareAsc
} from 'date-fns';

type Range = {
  label: React.Node,
  closeOverlay?: boolean,
  value: Array<Date> | ((value?: Array<Date>) => Array<Date>)
};

type Props = {
  appearance: 'default' | 'subtle',
  disabledDate?: (
    date: Date,
    selectValue: Array<Date | null>,
    doneSelected: boolean,
    type: string
  ) => boolean,
  ranges?: Array<Range>,
  value?: Array<Date>,
  defaultValue?: Array<Date>,
  placeholder?: React.Node,
  format: string,
  disabled?: boolean,
  locale?: Object,
  onChange?: (value: Array<Date>) => void,
  onOk?: (value?: Array<Date>, event: SyntheticEvent<*>) => void,
  hoverRange?: 'week' | 'month' | Function,
  cleanable?: boolean,
  isoWeek?: boolean,

  /**
   * 单击模式，是否只点选一次就选好值
   * 用于选择单日，或配合 hoverRange 使用
   */
  oneTap?: boolean,
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
  onSelect?: (date: Date) => void,
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

function getCalendarDate(value: Array<Date> = []) {
  let calendarDate = [new Date(), addMonths(new Date(), 1)];

  // Update calendarDate if the value is not null
  if (value[0] && value[1]) {
    let sameMonth = isSameMonth(value[0], value[1]);
    calendarDate = [value[0], sameMonth ? addMonths(value[1], 1) : value[1]];
  }
  return calendarDate;
}

type State = {
  value: Array<Date>,
  selectValue: Array<Date | any>,

  // Two clicks, the second click ends
  doneSelected: boolean,

  // display calendar date
  calendarDate: Array<Date>,

  // 当前应该高亮哪个区间，用于实现选择整周、整月
  hoverValue?: Array<Date>,

  // 当前 hover 的 date，用来减少 handleMouseMoveSelectValue 的计算
  currentHoverDate?: Date | null,

  active?: boolean
};

class DateRangePicker extends React.Component<Props, State> {
  static defaultProps = {
    appearance: 'default',
    placement: 'bottomLeft',
    limitEndYear: 1000,
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
      (value[0] && !isSameDay(value[0], prevState.value[0])) ||
      (value[1] && !isSameDay(value[1], prevState.value[1]))
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
  getValue = (): Array<Date> => {
    const { value } = this.props;

    if (typeof value !== 'undefined') {
      return value;
    }

    return this.state.value || [];
  };

  getDateString(value?: Array<Date>) {
    const { placeholder, format: formatType } = this.props;
    const nextValue = value || this.getValue();
    const startDate = _.get(nextValue, '0');
    const endDate = _.get(nextValue, '1');

    if (startDate && endDate) {
      const displayValue = [startDate, endDate].sort(compareAsc);
      return `${format(displayValue[0], formatType)} ~ ${format(displayValue[1], formatType)}`;
    }

    return placeholder || `${formatType} ~ ${formatType}`;
  }

  // hover range presets
  getWeekHoverRange = (date: Date) => {
    const { isoWeek } = this.props;

    if (isoWeek) {
      // set to the first day of this week according to ISO 8601, 12:00 am
      return [startOfISOWeek(date), endOfISOWeek(date)];
    }

    return [startOfWeek(date), endOfWeek(date)];
  };
  getMonthHoverRange = (date: Date) => [startOfMonth(date), endOfMonth(date)];

  getHoverRange(date: Date) {
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

    const hoverValues = hoverRangeFunc(date);
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
  handleShortcutPageDate = (value: Array<Date>, closeOverlay?: boolean) => {
    this.updateValue(value, closeOverlay);
  };

  updateValue(nextSelectValue?: Array<Date>, closeOverlay?: boolean = true) {
    const { value, selectValue } = this.state;
    const { onChange } = this.props;
    const nextValue: any = !_.isUndefined(nextSelectValue) ? nextSelectValue : selectValue;

    this.setState({
      selectValue: nextValue || [],
      value: nextValue
    });

    if (onChange && (!isSameDay(nextValue[0], value[0]) || !isSameDay(nextValue[1], value[1]))) {
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

  handleChangeSelectValue = (date: Date) => {
    const { selectValue, doneSelected } = this.state;
    const { onSelect, oneTap } = this.props;
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
      if (oneTap && !this.state.doneSelected) {
        this.handleChangeSelectValue(date);
      }

      // 如果是单击模式，并且是第二次点选，更新值，并关闭面板
      if (oneTap && this.state.doneSelected) {
        this.updateValue();
      }

      onSelect && onSelect(date);
    });
  };

  handleMouseMoveSelectValue = (date: Date) => {
    const { doneSelected, selectValue, hoverValue, currentHoverDate } = this.state;
    const { hoverRange } = this.props;

    if (currentHoverDate && isSameDay(date, currentHoverDate)) {
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

  handleClean = () => {
    this.setState({ calendarDate: [new Date(), addMonths(new Date(), 1)] });
    this.updateValue([]);
  };

  handleEnter = () => {
    const value = this.getValue();

    let calendarDate;

    if (value && value.length) {
      const [startDate, endData] = value;
      calendarDate = [startDate, isSameMonth(startDate, endData) ? addMonths(endData, 1) : endData];
    } else {
      calendarDate = [new Date(), addMonths(new Date(), 1)];
    }

    this.setState({
      selectValue: value,
      calendarDate,
      active: true
    });
  };

  handleEntered = () => {
    const { onOpen } = this.props;
    onOpen && onOpen();
  };

  handleExit = () => {
    const { onClose } = this.props;

    this.setState({
      active: false,
      doneSelected: true
    });

    onClose && onClose();
  };

  disabledByBetween(start: Date, end: Date, type: string) {
    const { disabledDate } = this.props;
    const { selectValue, doneSelected } = this.state;
    const date = new Date(start);
    const selectStartDate = selectValue[0];
    const selectEndDate = selectValue[1];
    const nextSelectValue = [selectStartDate, selectEndDate];

    // If the date is between the start and the end
    // the button is disabled
    while (isBefore(start, end) || isSameDay(start, end)) {
      if (disabledDate && disabledDate(date, nextSelectValue, doneSelected, type)) {
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

    return this.disabledByBetween(selectValue[0], selectValue[1], Type.TOOLBAR_BUTTON_OK);
  };

  disabledShortcutButton = (value: Array<Date> = []) => {
    if (!value[0] || !value[1]) {
      return true;
    }
    return this.disabledByBetween(value[0], value[1], Type.TOOLBAR_SHORTCUT);
  };

  handleDisabledDate = (date: Date, values: Array<Date | null>, type: string) => {
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
    const { placement, menuClassName, ranges, isoWeek, limitEndYear, oneTap } = this.props;
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
            hideOkButton={oneTap}
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
            onEnter={createChainedFunction(this.handleEnter, onEnter)}
            onEntered={createChainedFunction(this.handleEntered, onEntered)}
            onExit={createChainedFunction(this.handleExit, onExited)}
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
