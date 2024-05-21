import React from 'react';
import upperFirst from 'lodash/upperFirst';
import { getWeekKeys } from '@/internals/utils/date';
import { useClassNames } from '@/internals/hooks';
import { RsRefForwardingComponent, WithAsProps } from '@/internals/types';
import { useCalendarContext } from './CalendarContext';

export type TableHeaderRowProps = WithAsProps;

const TableHeaderRow: RsRefForwardingComponent<'div', TableHeaderRowProps> = React.forwardRef(
  (props: TableHeaderRowProps, ref) => {
    const { as: Component = 'div', className, classPrefix = 'calendar-table', ...rest } = props;
    const { locale, showWeekNumbers, isoWeek } = useCalendarContext();
    const { merge, prefix } = useClassNames(classPrefix);
    const classes = merge(className, prefix('row', 'header-row'));
    const weeks = getWeekKeys(isoWeek ? 1 : 0);

    return (
      <Component role="row" {...rest} ref={ref} className={classes}>
        {showWeekNumbers && <div className={prefix('header-cell')} role="columnheader" />}
        {weeks.map(key => (
          <div
            key={key}
            className={prefix('header-cell')}
            role="columnheader"
            aria-label={upperFirst(key)}
          >
            <span className={prefix('header-cell-content')}>{locale?.[key]}</span>
          </div>
        ))}
      </Component>
    );
  }
);

TableHeaderRow.displayName = 'CalendarTableHeaderRow';

export default TableHeaderRow;
