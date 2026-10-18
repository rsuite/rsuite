import React, { useCallback } from 'react';
import omit from 'lodash/omit';
import isNil from 'lodash/isNil';
import get from 'lodash/get';
import { LAYER_WIDTH, ROW_HEADER_HEIGHT, ROW_HEIGHT } from './constants';
import { convertToFlex } from './utils';
import { useClassNames, useTable } from './hooks';
import { ArrowRight } from './icons/ArrowRight';
import { columnHandledProps } from './Column';
import type { StandardProps, RowDataType, RowKeyType } from './types';

export interface CellProps<Row extends RowDataType> extends StandardProps {
  /** Data binding key, but also a sort of key */
  dataKey?: string;

  /** Row Number */
  rowIndex?: number;

  /** Row Data */
  rowData?: Row;
}

export interface InnerCellProps<Row extends RowDataType, Key extends RowKeyType>
  extends Omit<CellProps<Row>, 'children'> {
  align?: React.CSSProperties['justifyContent'];
  verticalAlign?: React.CSSProperties['alignItems'] | 'top' | 'middle' | 'bottom';
  isHeaderCell?: boolean;
  width?: number;
  height?: number | ((rowData: Row) => number);
  left?: number;
  headerHeight?: number;
  style?: React.CSSProperties;
  fullText?: boolean;
  firstColumn?: boolean;
  lastColumn?: boolean;
  hasChildren?: boolean;
  children?: React.ReactNode | ((rowData: Row, rowIndex?: number) => React.ReactNode);
  rowKey?: Key;
  rowSpan?: number;
  depth?: number;
  wordWrap?: boolean | 'break-all' | 'break-word' | 'keep-all';
  removed?: boolean;
  treeCol?: boolean;
  expanded?: boolean;
  predefinedStyle?: React.CSSProperties;
  onTreeToggle?: (rowKey?: Key, rowIndex?: number, rowData?: Row, event?: React.MouseEvent) => void;
  renderTreeToggle?: (
    expandButton: React.ReactNode,
    rowData?: Row,
    expanded?: boolean
  ) => React.ReactNode;
  renderCell?: (contentChildren: any) => React.ReactNode;
}

const groupKeys = [
  'groupCount',
  'groupHeader',
  'groupHeaderHeight',
  'groupAlign',
  'groupVerticalAlign',
  'renderSortIcon'
];

const Cell = React.forwardRef(
  <Row extends RowDataType, Key extends RowKeyType>(
    props: InnerCellProps<Row, Key>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const {
      classPrefix = 'cell',
      width = 0,
      left = 0,
      headerHeight = ROW_HEADER_HEIGHT,
      depth = 0,
      height = ROW_HEIGHT,
      style,
      className,
      fullText,
      firstColumn,
      lastColumn,
      isHeaderCell,
      align,
      children,
      rowData,
      dataKey,
      rowIndex,
      removed,
      rowKey,
      rowSpan,
      wordWrap,
      verticalAlign,
      expanded,
      treeCol,
      hasChildren,
      predefinedStyle,
      renderCell,
      renderTreeToggle,
      onClick,
      onTreeToggle,
      ...rest
    } = props;

    const { rtl, hasCustomTreeCol, isTree } = useTable();

    const isTreeCol = treeCol || (!hasCustomTreeCol && firstColumn && isTree);
    const cellHeight =
      typeof height === 'function' ? (rowData ? height(rowData) : ROW_HEIGHT) : height;

    if (isTreeCol && !isHeaderCell && !rowData) {
      throw new Error('[Table.Cell]: `rowData` is required for tree column');
    }

    const handleTreeToggle = useCallback(
      (event: React.MouseEvent) => {
        onTreeToggle?.(rowKey, rowIndex, rowData, event);
      },
      [onTreeToggle, rowData, rowIndex, rowKey]
    );

    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
    const classes = merge(
      className,
      withClassPrefix({
        expanded: expanded && isTreeCol,
        first: firstColumn,
        last: lastColumn,
        rowspan: rowSpan && !isHeaderCell,
        'full-text': fullText
      })
    );

    const nextHeight = isHeaderCell ? headerHeight : cellHeight;
    const styles = {
      ...predefinedStyle,
      [fullText ? 'minWidth' : 'width']: width,
      height: nextHeight,
      zIndex: depth,
      [rtl ? 'right' : 'left']: left
    };

    const paddingKey = rtl ? 'paddingRight' : 'paddingLeft';
    const contentStyles: React.CSSProperties = {
      ...convertToFlex({ align, verticalAlign }),
      ...style,
      width: fullText ? width - 1 : width,
      height: nextHeight,
      [paddingKey]: isTreeCol ? depth * LAYER_WIDTH + 10 : style?.[paddingKey] || style?.padding
    };

    if (wordWrap) {
      contentStyles.wordBreak = typeof wordWrap === 'boolean' ? 'break-all' : wordWrap;
      contentStyles.overflowWrap = wordWrap === 'break-word' ? wordWrap : undefined;
    }

    let cellContent: React.ReactNode = null;

    if (typeof children === 'function') {
      if (!rowData) {
        cellContent = null;
      } else {
        cellContent = children(rowData, rowIndex);
      }
    } else if (isNil(children)) {
      if (rowData && dataKey) {
        cellContent = get(rowData, dataKey);
      }
    } else {
      cellContent = children;
    }

    const renderTreeNodeExpandIcon = () => {
      const expandButton = (
        <ArrowRight className={prefix('expand-icon')} data-expanded={expanded} />
      );

      if (isTreeCol && hasChildren) {
        return (
          <span
            role="button"
            tabIndex={-1}
            className={prefix('expand-wrapper')}
            onClick={handleTreeToggle}
          >
            {renderTreeToggle ? renderTreeToggle(expandButton, rowData, expanded) : expandButton}
          </span>
        );
      }

      return null;
    };

    const content = wordWrap ? (
      <div className={prefix('wrap')}>
        {renderTreeNodeExpandIcon()}
        {renderCell ? renderCell(cellContent) : cellContent}
      </div>
    ) : (
      <>
        {renderTreeNodeExpandIcon()}
        {renderCell ? renderCell(cellContent) : cellContent}
      </>
    );

    if (removed) {
      return null;
    }

    return (
      <div
        ref={ref}
        role={isHeaderCell ? 'columnheader' : 'gridcell'}
        {...omit(rest, [...groupKeys, ...columnHandledProps])}
        onClick={onClick}
        className={classes}
        style={styles}
      >
        <div className={prefix('content')} style={contentStyles}>
          {content}
        </div>
      </div>
    );
  }
);

Cell.displayName = 'Table.Cell';

export default Cell as <Row extends RowDataType, Key extends RowKeyType>(
  props: InnerCellProps<Row, Key> & React.RefAttributes<HTMLDivElement>
) => React.ReactElement;
