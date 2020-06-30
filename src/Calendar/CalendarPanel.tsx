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

interface State {
  value?: Date;
  showMonth?: boolean;
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
      showMonth: false
    };
  }

  handleToggleMonthDropdown = () => {
    this.setState({ showMonth: !this.state.showMonth });
  };

  buildNextValue = (nextValue: Date) => toLocalTimeZone(nextValue, this.props.timeZone);

  handleChangePageDate = (nextValue: Date) => {
    nextValue = this.buildNextValue(nextValue);
    this.setState({
      value: nextValue,
      showMonth: false
    });
    this.props.onChange?.(nextValue);
  };

  handleClickToday = () => {
    const nextValue = zonedDate(this.props.timeZone);
    this.setState({
      showMonth: false,
      value: nextValue
    });
    this.props.onChange?.(nextValue);
  };

  handleNextMonth = (nextValue: Date) => {
    nextValue = this.buildNextValue(nextValue);
    this.setState({
      value: nextValue
    });
    this.props.onChange?.(nextValue);
  };

  handlePrevMonth = (nextValue: Date) => {
    nextValue = this.buildNextValue(nextValue);
    this.setState({
      value: nextValue
    });
    this.props.onChange?.(nextValue);
  };

  handleSelect = (nextValue: Date) => {
    nextValue = this.buildNextValue(nextValue);
    this.setState({
      value: nextValue
    });
    this.props.onSelect?.(nextValue);
    this.props.onChange?.(nextValue);
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

  render() {
    const {
      locale,
      renderCell,
      compact,
      className,
      isoWeek,
      bordered,
      timeZone,
      ...rest
    } = this.props;

    const { showMonth, value } = this.state;
    const classes = classNames(this.addPrefix('panel'), className, {
      [this.addPrefix('bordered')]: bordered,
      [this.addPrefix('compact')]: compact
    });

    console.log(value);
    locale.timeZone = rest.timeZone;
    return (
      <IntlContext.Provider value={locale}>
        <Calendar
          className={classes}
          isoWeek={isoWeek}
          onSelect={this.handleSelect}
          format="yyyy-MM-dd"
          calendarState={showMonth ? 'DROP_MONTH' : null}
          pageDate={value}
          timeZone={timeZone}
          renderTitle={date => (
            <FormattedDate date={date} formatStr={locale.formattedMonthPattern || 'MMMM  yyyy'} />
          )}
          renderToolbar={this.renderToolbar}
          renderCell={renderCell}
          onMoveForward={this.handleNextMonth}
          onMoveBackward={this.handlePrevMonth}
          onToggleMonthDropdown={this.handleToggleMonthDropdown}
          onChangePageDate={this.handleChangePageDate}
          limitEndYear={1000}
          {...rest}
        />
      </IntlContext.Provider>
    );
  }
}

export default defaultProps<CalendarPanelProps>({
  classPrefix: 'calendar'
})(CalendarPanel);
