// @flow

import * as React from 'react';
import classNames from 'classnames';
import { prefix, getUnhandledProps, defaultProps } from '../utils';
import { setYear } from 'date-fns';
import { setMonth } from 'date-fns';
import composeFunctions from '../utils/composeFunctions';

type Props = {
  date?: Date,
  month?: number,
  year?: number,
  onSelect?: (date: Date, event: SyntheticEvent<*>) => void,
  className?: string,
  classPrefix?: string,
  active?: boolean,
  disabled?: boolean
};

class MonthDropdownItem extends React.PureComponent<Props> {
  static defaultProps = {
    month: 0
  };

  handleClick = (event: SyntheticEvent<*>) => {
    const { onSelect, month, year, date, disabled } = this.props;

    if (disabled) {
      return;
    }

    if (year && month && date) {
      const nextMonth = composeFunctions(d => setYear(d, year), d => setMonth(d, month - 1))(date);
      onSelect && onSelect(nextMonth, event);
    }
  };

  render() {
    const { className, classPrefix, month, active, disabled, ...rest } = this.props;

    const addPrefix = prefix(classPrefix);
    const unhandled = getUnhandledProps(MonthDropdownItem, rest);
    const classes = classNames(classPrefix, className, {
      [addPrefix('active')]: active,
      disabled
    });

    return (
      <div
        {...unhandled}
        className={classes}
        onClick={this.handleClick}
        key={month}
        role="button"
        tabIndex="-1"
      >
        <span className={addPrefix('content')}>{month}</span>
      </div>
    );
  }
}

const enhance = defaultProps({
  classPrefix: 'calendar-month-dropdown-cell'
});
export default enhance(MonthDropdownItem);
