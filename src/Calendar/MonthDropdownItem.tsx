import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getUnhandledProps, prefix } from '../utils';
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

const defaultProps = {
  classPrefix: 'calendar-month-dropdown-cell',
  month: 0
};

const MonthDropdownItem = React.forwardRef<HTMLDivElement, MonthDropdownItemProps>((props, ref) => {
  const { className, classPrefix, month, active, disabled, onSelect, year, date, ...rest } = props;

  const handleClick = (event: React.MouseEvent) => {
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

  const addPrefix = prefix(classPrefix);
  const unhandled = getUnhandledProps(MonthDropdownItem, rest);
  const classes = classNames(classPrefix, className, {
    [addPrefix('active')]: active,
    disabled
  });

  return (
    <div
      {...unhandled}
      ref={ref}
      className={classes}
      onClick={handleClick}
      key={month}
      role="button"
      tabIndex="-1"
    >
      <span className={addPrefix('content')}>{month}</span>
    </div>
  );
});
MonthDropdownItem.displayName = 'MonthDropdownItem';
MonthDropdownItem.propTypes = {
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
MonthDropdownItem.defaultProps = defaultProps;

export default MonthDropdownItem;
