import React, { useMemo } from 'react';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { forwardRef } from '@/internals/utils';
import type { WithAsProps } from '@/internals/types';

export interface PlaceholderGridProps extends WithAsProps {
  /**
   * The number of rows.
   *
   * @default 5
   */
  rows?: number;

  /**
   * The height of the row.
   *
   * @default 10
   */
  rowHeight?: number;

  /**
   * @deprecated Use `rowSpacing` instead.
   */
  rowMargin?: number;

  /**
   * The spacing between rows.
   *
   * @default 20
   * @version 5.59.1
   */
  rowSpacing?: number;

  /**
   * The number of columns.
   * @default 5
   */
  columns?: number;

  /**
   * Placeholder status, display the loading state.
   */
  active?: boolean;
}

/**
 * The `Placeholder.Grid` component is used to display the loading state of the block.
 * @see https://rsuitejs.com/components/placeholder
 */
const PlaceholderGrid = forwardRef<'div', PlaceholderGridProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('PlaceholderGrid', props);
  const {
    as: Component = 'div',
    className,
    classPrefix = 'placeholder',
    rows = 5,
    columns = 5,
    rowHeight = 10,
    rowMargin = 20,
    rowSpacing = rowMargin,
    active,
    ...rest
  } = propsWithDefaults;

  const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);

  const classes = merge(className, withClassPrefix('grid', { active }));

  const items = useMemo(() => {
    const colItems: React.ReactElement[] = [];
    const rowClassName = prefix`row`;
    const columnClassName = prefix`grid-col`;

    for (let i = 0; i < columns; i++) {
      const rowItems: React.ReactElement[] = [];
      for (let j = 0; j < rows; j++) {
        rowItems.push(
          <div
            key={j}
            style={{ height: rowHeight, marginTop: j > 0 ? rowSpacing : undefined }}
            className={rowClassName}
          />
        );
      }
      colItems.push(
        <div key={i} className={columnClassName}>
          {rowItems}
        </div>
      );
    }

    return colItems;
  }, [columns, prefix, rowHeight, rowSpacing, rows]);

  return (
    <Component {...rest} ref={ref} className={classes}>
      {items}
    </Component>
  );
});

PlaceholderGrid.displayName = 'PlaceholderGrid';

export default PlaceholderGrid;
