import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Calendar from './Calendar';
import Button from '../Button';
import IntlContext from '../IntlProvider/IntlContext';
import FormattedDate from '../IntlProvider/FormattedDate';
import { defaultProps, prefix } from '../utils';
import { CalendarPanelProps } from './CalendarPanel.d';

interface State {
  value?: Date;
  showMonth?: boolean;
}

class CalendarPanel extends React.PureComponent<CalendarPanelProps, State> {
  static propTypes = {
    value: PropTypes.instanceOf(Date),
    defaultValue: PropTypes.instanceOf(Date),
    isoWeek: PropTypes.bool,
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
    this.state = {
      value: props.defaultValue,
      showMonth: false
    };
  }

  getValue() {
    const { value } = this.props;
    if (typeof value === 'undefined') {
      return this.state.value;
    }
    return value;
  }

  handleToggleMonthDropdown = () => {
    this.setState({ showMonth: !this.state.showMonth });
  };

  handleChangePageDate = (nextValue: Date) => {
    this.setState({
      value: nextValue,
      showMonth: false
    });
    this.props.onChange?.(nextValue);
  };

  handleClickToday = () => {
    const nextValue = new Date();
    this.setState({
      showMonth: false,
      value: nextValue
    });
    this.props.onChange?.(nextValue);
  };

  handleNextMonth = (nextValue: Date) => {
    this.setState({
      value: nextValue
    });
    this.props.onChange?.(nextValue);
  };

  handlePrevMonth = (nextValue: Date) => {
    this.setState({
      value: nextValue
    });
    this.props.onChange?.(nextValue);
  };

  handleSelect = (nextValue: Date) => {
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
    const { locale, renderCell, compact, className, isoWeek, bordered, ...rest } = this.props;

    const { showMonth } = this.state;
    const value = this.getValue();
    const classes = classNames(this.addPrefix('panel'), className, {
      [this.addPrefix('bordered')]: bordered,
      [this.addPrefix('compact')]: compact
    });

    return (
      <IntlContext.Provider value={locale}>
        <Calendar
          className={classes}
          isoWeek={isoWeek}
          onSelect={this.handleSelect}
          format="YYYY-MM-DD"
          calendarState={showMonth ? 'DROP_MONTH' : null}
          pageDate={value}
          renderTitle={date => (
            <FormattedDate date={date} formatStr={locale.formattedMonthPattern || 'MMMM  YYYY'} />
          )}
          renderToolbar={this.renderToolbar}
          renderCell={renderCell}
          onMoveForword={this.handleNextMonth}
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
