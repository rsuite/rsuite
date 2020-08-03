import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps, getUnhandledProps, prefix } from '../utils';
import { setMonth, setYear } from '../utils/dateUtils';
import composeFunctions from '../utils/composeFunctions';

export interface MonthDropdownItemProps {
  date?: Date;
  month?: number;
  year?: number;
  timeZone?: string;
  onSelect?: (date: Date, event: React.MouseEvent) => void;
  className?: string;
  classPrefix?: string;
  active?: boolean;
  disabled?: boolean;
}

class MonthDropdownItem extends React.PureComponent<MonthDropdownItemProps> {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    month: PropTypes.number,
    year: PropTypes.number,
    timeZone: PropTypes.string,
    onSelect: PropTypes.func,
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool
  };
  static defaultProps = {
    month: 0
  };

  handleClick = (event: React.MouseEvent) => {
    const { onSelect, month, year, date, disabled } = this.props;

    if (disabled) {
      return;
    }

    if (year && month && date) {
      const nextMonth = composeFunctions(
        d => setYear(d, year),
        d => setMonth(d, month - 1)
      )(date);
      onSelect?.(nextMonth, event);
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

const enhance = defaultProps<MonthDropdownItemProps>({
  classPrefix: 'calendar-month-dropdown-cell'
});
export default enhance(MonthDropdownItem);
