import React from 'react';
import GridRow from './GridRow';
import GridHeaderRow from './GridHeaderRow';
import { useClassNames } from '@/internals/hooks';
import { RsRefForwardingComponent, WithAsProps } from '@/internals/types';
import { useCalendar } from '../hooks';

export interface GridProps extends WithAsProps {
  rows: any[];
}

const Grid: RsRefForwardingComponent<'div', GridProps> = React.forwardRef(
  (props: GridProps, ref) => {
    const {
      as: Component = 'div',
      className,
      classPrefix = 'calendar-table',
      rows = [],
      ...rest
    } = props;
    const { merge, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix());
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
        {rows.map((week, index) => (
          <GridRow key={index} weekendDate={week} rowIndex={index + 1} />
        ))}
      </Component>
    );
  }
);

Grid.displayName = 'CalendarGrid';

export default Grid;
