import React from 'react';
import GridRow from './GridRow';
import GridHeaderRow from './GridHeaderRow';
import { forwardRef } from '@/internals/utils';
import { useStyles } from '@/internals/hooks';
import { WithAsProps } from '@/internals/types';
import type { PlainDate } from '@/internals/utils/date';
import { useCalendar } from '../hooks';

export interface GridProps extends WithAsProps {
  rows: readonly PlainDate[];
}

const Grid = forwardRef<'div', GridProps>((props: GridProps, ref) => {
  const {
    as: Component = 'div',
    className,
    classPrefix = 'calendar-table',
    rows = [],
    ...rest
  } = props;
  const { merge, withPrefix } = useStyles(classPrefix);
  const classes = merge(className, withPrefix());
  const { targetId } = useCalendar();

  return (
    <Component
      role="grid"
      tabIndex={-1}
      id={targetId ? `${targetId}-${classPrefix}` : undefined}
      {...rest}
      ref={ref}
      className={classes}
    >
      <GridHeaderRow />
      {rows.map((rowStartingDate, index) => (
        <GridRow key={index} startingDate={rowStartingDate} rowIndex={index + 1} />
      ))}
    </Component>
  );
});

Grid.displayName = 'CalendarGrid';

export default Grid;
