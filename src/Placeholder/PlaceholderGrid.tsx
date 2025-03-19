import React, { useMemo } from 'react';
import Box, { BoxProps } from '@/internals/Box';
import { useStyles } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { forwardRef, getCssValue, mergeStyles } from '@/internals/utils';

export interface PlaceholderGridProps extends BoxProps {
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
    as,
    className,
    classPrefix = 'placeholder',
    rows = 5,
    columns = 5,
    rowHeight,
    rowSpacing,
    active,
    style,
    ...rest
  } = propsWithDefaults;

  const { merge, prefix, cssVar, withPrefix } = useStyles(classPrefix);

  const classes = merge(className, withPrefix('grid', { active }));
  const styles = mergeStyles(
    style,
    cssVar('row-height', rowHeight, getCssValue),
    cssVar('row-spacing', rowSpacing, getCssValue)
  );

  const items = useMemo(() => {
    const colItems: React.ReactElement[] = [];
    const rowClassName = prefix`row`;
    const columnClassName = prefix`grid-col`;

    for (let i = 0; i < columns; i++) {
      const rowItems: React.ReactElement[] = [];
      for (let j = 0; j < rows; j++) {
        rowItems.push(<div key={j} className={rowClassName} />);
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
    <Box as={as} ref={ref} className={classes} style={styles} {...rest}>
      {items}
    </Box>
  );
});

PlaceholderGrid.displayName = 'PlaceholderGrid';

export default PlaceholderGrid;
