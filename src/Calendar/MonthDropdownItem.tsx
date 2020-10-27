import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { composeFunctions, useClassNames } from '../utils';
import { setMonth, setYear } from '../utils/dateUtils';
import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
import { useCalendarContext } from './CalendarContext';

export interface MonthDropdownItemProps extends WithAsProps {
  month?: number;
  year?: number;
  active?: boolean;
  disabled?: boolean;
}

const defaultProps: Partial<MonthDropdownItemProps> = {
  as: 'div',
  classPrefix: 'calendar-month-dropdown-cell',
  month: 0
};

const MonthDropdownItem: RsRefForwardingComponent<'div', MonthDropdownItemProps> = React.forwardRef(
  (props: MonthDropdownItemProps, ref) => {
    const { as: Component, className, classPrefix, active, disabled, month, year, ...rest } = props;
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

    const { prefix, merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ active }), { disabled });

    return (
      <Component
        {...rest}
        ref={ref}
        className={classes}
        onClick={handleClick}
        key={month}
        tabIndex={-1}
      >
        <span className={prefix('content')}>{month}</span>
      </Component>
    );
  }
);
MonthDropdownItem.displayName = 'MonthDropdownItem';
MonthDropdownItem.defaultProps = defaultProps;
MonthDropdownItem.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool
};

export default MonthDropdownItem;
