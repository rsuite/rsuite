import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useClassNames } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';

export interface PlaceholderGridProps extends WithAsProps {
  /* number of rows */
  rows?: number;

  /* height of rows */
  rowHeight?: number;

  /* margin of rows */
  rowMargin?: number;

  /* number of columns */
  columns?: number;

  /** Placeholder status */
  active?: boolean;
}

const PlaceholderGrid: RsRefForwardingComponent<'div', PlaceholderGridProps> = React.forwardRef(
  (props: PlaceholderGridProps, ref) => {
    const {
      as: Component = 'div',
      className,
      classPrefix = 'placeholder',
      rows = 5,
      columns = 5,
      rowHeight = 10,
      rowMargin = 20,
      active,
      ...rest
    } = props;

    const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix('grid', { active }));
    const colItems: React.ReactElement[] = [];
    const firstRowItemWidth = Math.random() * 30 + 30;
    const itemWidth = firstRowItemWidth / 2;
    for (let i = 0; i < columns; i++) {
      const rowItems: React.ReactElement[] = [];
      for (let j = 0; j < rows; j++) {
        let widthPercent = Math.random() * 50 + 10; // when first column
        if (i > 0) {
          // when other columns
          widthPercent = j > 0 ? itemWidth : firstRowItemWidth;
        }
        rowItems.push(
          <p
            key={j}
            style={{
              width: `${widthPercent}%`,
              height: rowHeight,
              marginTop: j > 0 ? rowMargin : undefined
            }}
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
PlaceholderGrid.propTypes = {
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  rows: PropTypes.number,
  columns: PropTypes.number,
  rowHeight: PropTypes.number,
  rowMargin: PropTypes.number,
  active: PropTypes.bool
};

export default PlaceholderGrid;
