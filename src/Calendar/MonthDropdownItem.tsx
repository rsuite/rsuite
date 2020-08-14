import React, { HTMLAttributes, Ref, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { setMonth, setYear } from '../utils/dateUtils';
import composeFunctions from '../utils/composeFunctions';
import { useCalendarContext } from './CalendarContext';

export interface MonthDropdownItemProps extends HTMLAttributes<HTMLDivElement> {
  month?: number;
  year?: number;
  className?: string;
  classPrefix?: string;
  active?: boolean;
  disabled?: boolean;
}

const defaultProps = {
  classPrefix: 'calendar-month-dropdown-cell',
  month: 0
};

const MonthDropdownItem = React.forwardRef(
  (props: MonthDropdownItemProps, ref: Ref<HTMLDivElement>) => {
    const { className, classPrefix, month, active, disabled, year, ...rest } = props;
    const { date, onChangePageDate: onSelect } = useCalendarContext();

    const handleClick = useCallback(
      (event: React.MouseEvent) => {
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
      },
      [date, disabled, month, onSelect, year]
    );

    const { prefix, merge, rootPrefix } = useClassNames(classPrefix);

    const classes = merge(rootPrefix(classPrefix), className, {
      [prefix('active')]: active,
      disabled
    });

    return (
      <div
        {...rest}
        ref={ref}
        className={classes}
        onClick={handleClick}
        key={month}
        role="button"
        tabIndex={-1}
      >
        <span className={prefix('content')}>{month}</span>
      </div>
    );
  }
);
MonthDropdownItem.displayName = 'MonthDropdownItem';
MonthDropdownItem.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool
};
MonthDropdownItem.defaultProps = defaultProps;

export default MonthDropdownItem;
