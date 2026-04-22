import React from 'react';
import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import ColumnGroup from '../ColumnGroup';
import HeaderCell from '../HeaderCell';

function cloneCell(Cell, props) {
  return React.cloneElement(Cell, props);
}

function mergeCells(cells) {
  const nextCells: React.ReactNode[] = [];

  for (let i = 0; i < cells.length; i += 1) {
    const {
      width,
      colSpan,
      groupCount,
      groupHeader,
      groupAlign,
      groupVerticalAlign,
      isHeaderCell,
      headerHeight,
      groupHeaderHeight
    } = cells[i].props;

    const groupChildren: React.ReactNode[] = [];

    // Add grouping to column headers.
    if (groupCount && isHeaderCell) {
      let nextWidth = width;
      let left = 0;
      for (let j = 0; j < groupCount; j += 1) {
        const nextCell = cells[i + j];
        const {
          width: nextCellWidth,
          sortable,
          children,
          dataKey,
          onSortColumn,
          sortColumn,
          sortType,
          align,
          verticalAlign,
          renderSortIcon
        } = nextCell.props;

        if (j !== 0) {
          nextWidth += nextCellWidth;
          left += cells[i + j - 1].props.width;
          cells[i + j] = cloneCell(nextCell, { removed: true });
        }

        groupChildren.push(
          <HeaderCell
            key={j}
            left={left}
            align={align}
            verticalAlign={verticalAlign}
            dataKey={dataKey}
            width={nextCellWidth}
            sortable={sortable}
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={onSortColumn}
            renderSortIcon={renderSortIcon}
          >
            {children}
          </HeaderCell>
        );
      }
      nextCells.push(
        cloneCell(cells[i], {
          width: nextWidth,
          children: (
            <ColumnGroup
              width={nextWidth}
              headerHeight={headerHeight}
              header={groupHeader}
              align={groupAlign}
              verticalAlign={groupVerticalAlign}
              groupHeaderHeight={groupHeaderHeight}
            >
              {groupChildren}
            </ColumnGroup>
          )
        })
      );
      continue;
    } else if (colSpan) {
      // If there is a colSpan attribute, go to its next Cell.
      // Determine whether the value is null or undefined, then merge this cell.

      let nextWidth = width;
      for (let j = 0; j < colSpan; j += 1) {
        const nextCell = cells[i + j];
        if (nextCell) {
          const {
            rowData,
            rowIndex,
            children,
            width: colSpanWidth,
            isHeaderCell,
            dataKey
          } = nextCell.props;

          const cellText = isFunction(children)
            ? children(rowData, rowIndex)
            : get(rowData, dataKey);

          if ((rowData && isNil(cellText)) || (isHeaderCell && isNil(children))) {
            nextWidth += colSpanWidth;
            cells[i + j] = cloneCell(nextCell, {
              removed: true
            });
          }
        }
      }

      nextCells.push(
        cloneCell(cells[i], {
          width: nextWidth,
          'aria-colspan': nextWidth > width ? colSpan : undefined
        })
      );
      continue;
    }
    nextCells.push(cells[i]);
  }
  return nextCells;
}

export default mergeCells;
