import React from 'react';
import upperFirst from 'lodash/upperFirst';
import { forwardRef } from '@/internals/utils';
import { getWeekKeys } from '@/internals/utils/date';
import { useClassNames } from '@/internals/hooks';
import { WithAsProps } from '@/internals/types';
import { useCalendar } from '../hooks';

export type GridHeaderRowProps = WithAsProps;

const GridHeaderRow = forwardRef<'div', GridHeaderRowProps>((props: GridHeaderRowProps, ref) => {
  const { as: Component = 'div', className, classPrefix = 'calendar-table', ...rest } = props;
  const { locale, showWeekNumbers, isoWeek, weekStart } = useCalendar();
  const { merge, prefix } = useClassNames(classPrefix);
  const classes = merge(className, prefix('row', 'header-row'));
  const weeks = getWeekKeys(isoWeek ? 1 : weekStart);

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
});

GridHeaderRow.displayName = 'CalendarGridHeaderRow';

export default GridHeaderRow;
