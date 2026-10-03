import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import isNil from 'lodash/isNil';
import ColumnResizeHandler, { FixedType } from './ColumnResizeHandler';
import Cell, { InnerCellProps } from './Cell';
import { Sort } from './icons/Sort';
import { SortDown } from './icons/SortDown';
import { useUpdateEffect, useClassNames } from './hooks';
import type { RowDataType, RowKeyType } from './types';

export interface HeaderCellProps<Row extends RowDataType, Key extends RowKeyType>
  extends Omit<InnerCellProps<Row, Key>, 'onResize'> {
  index?: number;
  minWidth?: number;
  sortColumn?: string;
  sortType?: 'desc' | 'asc';
  sortable?: boolean;
  resizable?: boolean;
  groupHeader?: boolean;
  flexGrow?: number;
  fixed?: boolean | 'left' | 'right';
  children: React.ReactNode;
  onResize?: (columnWidth?: number, dataKey?: string) => void;
  onSortColumn?: (dataKey?: string) => void;
  onColumnResizeStart?: (columnWidth?: number, left?: number, fixed?: boolean) => void;
  onColumnResizeMove?: (columnWidth?: number, columnLeft?: number, columnFixed?: FixedType) => void;
  onColumnResizeEnd?: (
    columnWidth?: number,
    cursorDelta?: number,
    dataKey?: any,
    index?: number
  ) => void;
  renderSortIcon?: (sortType?: 'desc' | 'asc') => React.ReactNode;
}

const HeaderCell = React.forwardRef(
  <Row extends RowDataType, Key extends RowKeyType>(
    props: HeaderCellProps<Row, Key>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const {
      className,
      classPrefix = 'cell-header',
      width,
      dataKey,
      headerHeight,
      children,
      left,
      sortable,
      sortColumn,
      sortType,
      groupHeader,
      resizable,
      fixed,
      minWidth,
      index,
      flexGrow,
      align,
      verticalAlign,
      onColumnResizeEnd,
      onResize,
      onColumnResizeStart,
      onColumnResizeMove,
      onSortColumn,
      renderSortIcon,
      ...rest
    } = props;

    const [columnWidth, setColumnWidth] = useState(isNil(flexGrow) ? width : 0);

    useUpdateEffect(() => {
      setColumnWidth(isNil(flexGrow) ? width : 0);
    }, [flexGrow, width]);

    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix({ sortable }));

    let ariaSort;

    if (sortColumn === dataKey) {
      ariaSort = 'other';
      if (sortType === 'asc') {
        ariaSort = 'ascending';
      } else if (sortType === 'desc') {
        ariaSort = 'descending';
      }
    }

    const handleClick = useCallback(() => {
      if (sortable) {
        onSortColumn?.(dataKey);
      }
    }, [dataKey, onSortColumn, sortable]);

    const handleColumnResizeStart = useCallback(() => {
      onColumnResizeStart?.(columnWidth, left, !!fixed);
    }, [columnWidth, fixed, left, onColumnResizeStart]);

    const handleColumnResizeEnd = useCallback(
      (nextColumnWidth?: number, cursorDelta?: number) => {
        setColumnWidth(nextColumnWidth);
        onColumnResizeEnd?.(nextColumnWidth, cursorDelta, dataKey, index);
        onResize?.(nextColumnWidth, dataKey);
      },
      [dataKey, index, onColumnResizeEnd, onResize]
    );

    const renderSortColumn = () => {
      if (sortable && !groupHeader) {
        const SortIcon = sortColumn === dataKey && sortType ? SortDown : Sort;
        const iconClasses = classNames(prefix('icon-sort'));

        const sortIcon = renderSortIcon ? (
          renderSortIcon(sortColumn === dataKey ? sortType : undefined)
        ) : (
          <SortIcon className={iconClasses} data-sort={sortType} />
        );

        return <span className={prefix('sort-wrapper')}>{sortIcon}</span>;
      }
      return null;
    };

    return (
      <div ref={ref} className={classes}>
        <Cell
          aria-sort={ariaSort}
          {...rest}
          width={width}
          dataKey={dataKey}
          left={left}
          headerHeight={headerHeight}
          isHeaderCell={true}
          align={!groupHeader ? align : undefined}
          verticalAlign={!groupHeader ? verticalAlign : undefined}
          onClick={!groupHeader ? handleClick : undefined}
        >
          {children}
          {renderSortColumn()}
        </Cell>

        {resizable ? (
          <ColumnResizeHandler
            defaultColumnWidth={columnWidth}
            key={columnWidth}
            columnLeft={left}
            columnFixed={fixed}
            height={headerHeight ? headerHeight - 1 : undefined}
            minWidth={minWidth}
            onColumnResizeMove={onColumnResizeMove}
            onColumnResizeStart={handleColumnResizeStart}
            onColumnResizeEnd={handleColumnResizeEnd}
          />
        ) : null}
      </div>
    );
  }
);

HeaderCell.displayName = 'HeaderCell';

export default HeaderCell as <Row extends RowDataType, Key extends RowKeyType>(
  props: HeaderCellProps<Row, Key> & React.RefAttributes<HTMLDivElement>
) => React.ReactElement;
