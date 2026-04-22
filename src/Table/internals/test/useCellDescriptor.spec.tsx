import React, { useEffect, useState, useMemo } from 'react';
import useCellDescriptor from '../hooks/useCellDescriptor';
import Column from '../Column';
import HeaderCell from '../HeaderCell';
import Cell from '../Cell';
import { render, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('useCellDescriptor', () => {
  let cellDescriptor;
  let setWidthOfFirstColumn;

  // test component that wraps useCellDescriptor and stores ref to
  // output vars in the `cellDescriptor` var declared above
  const TestComponent = () => {
    const [width, setWidth] = useState(100);
    setWidthOfFirstColumn = setWidth;

    const columns = useMemo(
      () => [
        <Column width={width} key="col1" resizable>
          <HeaderCell>Header 1</HeaderCell>
          <Cell dataKey="key1"></Cell>
        </Column>,
        <Column width={200} key="col2">
          <HeaderCell>Header 2</HeaderCell>
          <Cell dataKey="key2"></Cell>
        </Column>
      ],
      [width]
    );

    const descriptor = useCellDescriptor({
      children: columns,
      showHeader: true,
      headerHeight: 100,
      tableRef: {},
      tableWidth: {},
      scrollX: {},
      minScrollX: {},
      mouseAreaRef: {}
    } as any);

    useEffect(() => {
      cellDescriptor = descriptor;
    }, [descriptor]);

    return null;
  };

  it('Should output expected vars', () => {
    render(<TestComponent />);

    expect(cellDescriptor).to.contain.keys([
      'columns',
      'headerCells',
      'bodyCells',
      'allColumnsWidth',
      'hasCustomTreeCol'
    ]);
  });

  it('Should set widths on cells', () => {
    render(<TestComponent />);

    const { headerCells, bodyCells } = cellDescriptor;

    expect(headerCells[0].props.width).to.equal(100);
    expect(bodyCells[0].props.width).to.equal(100);
    expect(headerCells[1].props.width).to.equal(200);
    expect(bodyCells[1].props.width).to.equal(200);
  });

  it('Should update cell width on column resize', () => {
    render(<TestComponent />);

    const { headerCells } = cellDescriptor;
    const { onColumnResizeEnd } = headerCells[0].props;

    // (columnWidth: number, _cursorDelta: number, dataKey: any, index: number)
    act(() => onColumnResizeEnd(500, 5, 'key1', 0));

    expect(cellDescriptor.bodyCells[0].props.width).to.equal(500);
  });

  it('Should set proper cell width on column resize followed by column width change', () => {
    render(<TestComponent />);

    const { headerCells } = cellDescriptor;
    const { onColumnResizeEnd } = headerCells[0].props;

    // (columnWidth: number, _cursorDelta: number, dataKey: any, index: number)
    act(() => onColumnResizeEnd(500, 5, 'key1', 0));
    expect(cellDescriptor.bodyCells[0].props.width).to.equal(500);

    act(() => setWidthOfFirstColumn(420));
    expect(cellDescriptor.bodyCells[0].props.width).to.equal(420);
  });
});
