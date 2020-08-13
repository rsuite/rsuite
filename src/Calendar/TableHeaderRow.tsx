import * as React from 'react';
import PropTypes from 'prop-types';
import { useClassNames } from '../utils';
import { useCalendarContext } from './CalendarContext';

export interface TableHeaderRowProps {
  isoWeek?: boolean;
  className?: string;
  classPrefix?: string;
  showWeekNumbers?: boolean;
}

const defaultProps = {
  classPrefix: 'calendar-table'
};

const weekKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const TableHeaderRow = React.forwardRef<HTMLDivElement, TableHeaderRowProps>((props, ref) => {
  const { className, classPrefix, isoWeek, showWeekNumbers, ...rest } = props;
  const { locale } = useCalendarContext();
  const { merge, prefix } = useClassNames(classPrefix);
  const classes = merge(prefix('row'), prefix('header-row'), className);
  let items = weekKeys;

  if (isoWeek) {
    items = weekKeys.filter(v => v !== 'sunday');
    items.push('sunday');
  }

  return (
    <div {...rest} ref={ref} className={classes}>
      {showWeekNumbers && <div className={prefix('cell')} />}
      {items.map(key => (
        <div key={key} className={prefix('cell')}>
          <span className={prefix('cell-content')}>{locale?.[key]}</span>
        </div>
      ))}
    </div>
  );
});

TableHeaderRow.displayName = 'TableHeaderRow';
TableHeaderRow.propTypes = {
  isoWeek: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  showWeekNumbers: PropTypes.bool
};
TableHeaderRow.defaultProps = defaultProps;

export default TableHeaderRow;
