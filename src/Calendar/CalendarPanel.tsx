import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Calendar from './Calendar';
import Button from '../Button';
import IntlContext from '../IntlProvider/IntlContext';
import FormattedDate from '../IntlProvider/FormattedDate';
import { defaultProps, prefix } from '../utils';
import { CalendarPanelProps } from './CalendarPanel.d';
import { toLocalTimeZone, toTimeZone, zonedDate } from '../utils/timeZone';
import composeFunctions from '../utils/composeFunctions';
import {
  getHours,
  getMinutes,
  getSeconds,
  setHours,
  setMinutes,
  setSeconds
} from '../utils/dateUtils';

interface State {
  value?: Date;
  showMonth?: boolean;
  pageDate: Date;
}

class CalendarPanel extends React.PureComponent<CalendarPanelProps, State> {
  static propTypes = {
    value: PropTypes.instanceOf(Date),
    defaultValue: PropTypes.instanceOf(Date),
    isoWeek: PropTypes.bool,
    timeZone: PropTypes.string,
    compact: PropTypes.bool,
    bordered: PropTypes.bool,
    locale: PropTypes.object,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    renderCell: PropTypes.func
  };
  static defaultProps = {
    defaultValue: new Date(),
    locale: {}
  };

  constructor(props: CalendarPanelProps) {
    super(props);
    const { defaultValue, value, timeZone } = props;
    this.state = {
      value: toTimeZone(value ?? defaultValue, timeZone),
      pageDate: toTimeZone(value ?? defaultValue ?? new Date(), timeZone),
      showMonth: false
    };
  }

  componentDidUpdate(prevProps: Readonly<CalendarPanelProps>, prevState: Readonly<State>) {
    const { timeZone, value } = this.props;
    if (prevProps.timeZone !== timeZone) {
      const nextValue = toTimeZone(
        value ?? toLocalTimeZone(prevState.value, prevProps.timeZone),
        timeZone
      );
      this.setState({
        value: nextValue,
        pageDate: nextValue
      });
    }
  }

  handleToggleMonthDropdown = () => {
    this.setState({ showMonth: !this.state.showMonth });
  };

  handleChange = (nextValue: Date) => {
    this.props.onChange?.(toLocalTimeZone(nextValue, this.props.timeZone));
  };

  handleChangePageDate = (nextValue: Date) => {
    this.setState({
      value: nextValue,
      showMonth: false
    });
    this.handleChange(nextValue);
  };

  handleClickToday = () => {
    const nextValue = zonedDate(this.props.timeZone);
    this.setState({
      showMonth: false,
      value: nextValue
    });
    this.handleChange(nextValue);
  };

  handleNextMonth = (nextValue: Date) => {
    this.setState({
      value: nextValue
    });
    this.handleChange(nextValue);
  };

  handlePrevMonth = (nextValue: Date) => {
    this.setState({
      value: nextValue
    });
    this.handleChange(nextValue);
  };

  handleSelect = (nextValue: Date) => {
    const { onSelect, timeZone } = this.props;
    const { pageDate } = this.state;

    this.setState({
      value: nextValue,
      pageDate: composeFunctions(
        (d: Date) => setHours(d, getHours(pageDate)),
        (d: Date) => setMinutes(d, getMinutes(pageDate)),
        (d: Date) => setSeconds(d, getSeconds(pageDate))
      )(nextValue)
    });

    onSelect?.(toLocalTimeZone(nextValue, timeZone));
    this.handleChange(nextValue);
  };

  addPrefix = (name: string): string => prefix(this.props.classPrefix)(name);

  renderToolbar = () => {
    const { locale } = this.props;
    return (
      <Button className={this.addPrefix('btn-today')} onClick={this.handleClickToday}>
        {locale.today || 'Today'}
      </Button>
    );
  };

  renderCell = (date: Date) => this.props.renderCell?.(toLocalTimeZone(date, this.props.timeZone));

  render() {
    const { locale, compact, className, isoWeek, bordered, timeZone, ...rest } = this.props;

    const { showMonth, pageDate } = this.state;
    const classes = classNames(this.addPrefix('panel'), className, {
      [this.addPrefix('bordered')]: bordered,
      [this.addPrefix('compact')]: compact
    });

    locale.timeZone = timeZone;
    return (
      <IntlContext.Provider value={locale}>
        <Calendar
          className={classes}
          isoWeek={isoWeek}
          format="yyyy-MM-dd"
          calendarState={showMonth ? 'DROP_MONTH' : null}
          pageDate={pageDate}
          timeZone={timeZone}
          renderTitle={date => (
            <FormattedDate date={date} formatStr={locale.formattedMonthPattern || 'MMMM  yyyy'} />
          )}
          renderToolbar={this.renderToolbar}
          onMoveForward={this.handleNextMonth}
          onMoveBackward={this.handlePrevMonth}
          onToggleMonthDropdown={this.handleToggleMonthDropdown}
          onChangePageDate={this.handleChangePageDate}
          limitEndYear={1000}
          {...rest}
          onSelect={this.handleSelect}
          renderCell={this.renderCell}
        />
      </IntlContext.Provider>
    );
  }
}

export default defaultProps<CalendarPanelProps>({
  classPrefix: 'calendar'
})(CalendarPanel);
