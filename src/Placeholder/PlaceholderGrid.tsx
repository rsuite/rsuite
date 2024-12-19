import React from 'react';
import classNames from 'classnames';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps, RsRefForwardingComponent } from '@/internals/types';

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
const PlaceholderGrid: RsRefForwardingComponent<'div', PlaceholderGridProps> = React.forwardRef(
  (props: PlaceholderGridProps, ref) => {
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
    const colItems: React.ReactElement[] = [];

    for (let i = 0; i < columns; i++) {
      const rowItems: React.ReactElement[] = [];
      for (let j = 0; j < rows; j++) {
        rowItems.push(
          <div
            key={j}
            style={{ height: rowHeight, marginTop: j > 0 ? rowSpacing : undefined }}
            className={prefix`row`}
          />
        );
      }
      colItems.push(
        <div key={i} className={classNames(prefix('grid-col'))}>
          {rowItems}
        </div>
      );
    }
    return (
      <Component {...rest} ref={ref} className={classes}>
        {colItems}
      </Component>
    );
  }
);

PlaceholderGrid.displayName = 'PlaceholderGrid';

export default PlaceholderGrid;
