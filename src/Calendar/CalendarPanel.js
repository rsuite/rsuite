// @flow

import * as React from 'react';
import { IntlProvider } from 'rsuite-intl';
import { format } from 'date-fns';
import Calendar from './Calendar';
import classNames from 'classnames';
import Button from '../Button';
import { defaultProps, prefix } from '../utils';

type Props = {
  value?: Date,
  defaultValue?: Date,
  isoWeek?: boolean,
  compact?: boolean,
  bordered?: boolean,
  locale: any,
  className?: string,
  classPrefix?: string,
  onChange?: (date: Date) => void,
  onSelect?: (date: Date) => void,
  renderCell?: (date: Date) => React.Node
};

type State = {
  value?: Date,
  showMonth?: boolean
};

class CalendarPanel extends React.PureComponent<Props, State> {
  static defaultProps = {
    defaultValue: new Date(),
    locale: {}
  };

  constructor(props: Props) {
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
    const { onChange } = this.props;
    this.setState({
      value: nextValue,
      showMonth: false
    });
    onChange && onChange(nextValue);
  };

  handleClickToday = () => {
    const { onChange } = this.props;
    const nextValue = new Date();
    this.setState({
      showMonth: false,
      value: nextValue
    });
    onChange && onChange(nextValue);
  };

  handleNextMonth = (nextValue: Date) => {
    const { onChange } = this.props;
    this.setState({
      value: nextValue
    });
    onChange && onChange(nextValue);
  };

  handlePrevMonth = (nextValue: Date) => {
    const { onChange } = this.props;
    this.setState({
      value: nextValue
    });
    onChange && onChange(nextValue);
  };

  handleSelect = (nextValue: Date) => {
    const { onSelect, onChange } = this.props;
    this.setState({
      value: nextValue
    });

    onSelect && onSelect(nextValue);
    onChange && onChange(nextValue);
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

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
      <IntlProvider locale={locale}>
        <Calendar
          className={classes}
          isoWeek={isoWeek}
          onSelect={this.handleSelect}
          format="YYYY-MM-DD"
          calendarState={showMonth ? 'DROP_MONTH' : null}
          pageDate={value}
          renderTitle={date => format(date, locale.titleFormat || 'MMMM  YYYY')}
          renderToolbar={this.renderToolbar}
          renderCell={renderCell}
          onMoveForword={this.handleNextMonth}
          onMoveBackward={this.handlePrevMonth}
          onToggleMonthDropdown={this.handleToggleMonthDropdown}
          onChangePageDate={this.handleChangePageDate}
          {...rest}
        />
      </IntlProvider>
    );
  }
}

const enhance = defaultProps({
  classPrefix: 'calendar'
});

export default enhance(CalendarPanel);
