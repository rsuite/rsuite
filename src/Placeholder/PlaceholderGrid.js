// @flow

import * as React from 'react';
import { defaultProps, getUnhandledProps, prefix } from '../utils';
import classNames from 'classnames';

type Props = {
  className?: string,
  classPrefix?: string,
  rows: number,
  columns: number,
  rowHeight?: number,
  rowMargin?: number,
  active?: boolean
};

class PlaceholderGrid extends React.Component<Props> {
  static defaultProps = {
    rows: 5,
    columns: 5,
    rowHeight: 10,
    rowMargin: 20
  };

  render() {
    const {
      className,
      classPrefix,
      rows,
      columns,
      rowHeight,
      rowMargin,
      active,
      ...rest
    } = this.props;
    const addPrefix = prefix(classPrefix);
    const unhandled = getUnhandledProps(PlaceholderGrid, rest);
    const classes = classNames(classPrefix, addPrefix('grid'), className);
    const colArr = [];
    const firstRowItemWidth = Math.random() * 30 + 30;
    const ItemWidth = firstRowItemWidth / 2;
    for (let i = 0; i < columns; i++) {
      const rowArr = [];
      for (let j = 0; j < rows; j++) {
        let widthPercent = Math.random() * 50 + 10; // when first column
        if (i > 0) {
          // when other columns
          widthPercent = j > 0 ? ItemWidth : firstRowItemWidth;
        }
        rowArr.push(
          <div
            key={j}
            className={classNames(addPrefix('grid-item-placeholder'), {
              [addPrefix('active')]: active
            })}
            style={{
              width: `${widthPercent}%`,
              height: rowHeight,
              marginTop: j > 0 ? rowMargin : null
            }}
          />
        );
      }
      colArr.push(
        <div key={i} className={classNames(addPrefix('grid-col-placeholder'))}>
          {rowArr}
        </div>
      );
    }
    return (
      <div className={classes} {...unhandled}>
        {colArr}
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'placeholder'
})(PlaceholderGrid);
