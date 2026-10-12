import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import mergeCells from '../utils/mergeCells';
import Cell from '../Cell';
import HeaderCell from '../HeaderCell';

describe('mergeCells', () => {
  function makeCell(props: Record<string, any> = {}) {
    return React.cloneElement(<Cell dataKey="x" />, { width: 100, left: 0, ...props });
  }

  function makeHeaderCell(props: Record<string, any> = {}) {
    return React.cloneElement(<HeaderCell>header</HeaderCell>, {
      width: 100,
      left: 0,
      isHeaderCell: true,
      ...props
    });
  }

  it('Should return cells unchanged when no colSpan or groupCount', () => {
    const cells = [makeCell(), makeCell(), makeCell()];
    const result = mergeCells(cells);
    expect(result).to.have.length(3);
  });

  it('Should merge cells by colSpan when adjacent cell value is null', () => {
    const data = { a: null, b: 'hello' };
    // colSpan=2: base cell is NOT scanned (j starts from 1).
    // Only j=1 (adjacent cell) adds its width if nil.
    // Width: initial 80 + j=1 delta 80 = 160
    const cells = [
      makeCell({ colSpan: 2, width: 80, rowData: data, dataKey: 'a' }),
      makeCell({ width: 80, rowData: data, dataKey: 'a' }),
      makeCell({ width: 80, rowData: data, dataKey: 'b' })
    ];

    const result = mergeCells(cells) as React.ReactElement<any>[];

    // The adjacent cell should be removed (marked removed=true)
    expect(result[1].props.removed).to.equal(true);
    // First cell accumulates: initial 80 + j=1 delta 80 = 160
    expect(result[0].props.width).to.equal(160);
    // aria-colspan should be set since cells were merged
    expect(result[0].props['aria-colspan']).to.equal(2);
  });

  it('Should not merge cells when value is not null', () => {
    const data = { a: 'value' };
    const cells = [
      makeCell({ colSpan: 2, width: 80, rowData: data, dataKey: 'a' }),
      makeCell({ width: 80, rowData: data, dataKey: 'a' })
    ];

    const result = mergeCells(cells) as React.ReactElement<any>[];

    // No merging because 'a' has a value — width stays as initial=80
    expect(result[0].props.width).to.equal(80);
    expect(result[1].props.removed).to.not.equal(true);
  });

  it('Should merge header cells using colSpan when children is null', () => {
    const cells = [
      makeHeaderCell({ colSpan: 2, width: 80, children: null }),
      makeHeaderCell({ width: 80, children: null })
    ];

    const result = mergeCells(cells) as React.ReactElement<any>[];

    // Base cell is preserved (not scanned). initial 80 + j=1 adds 80 = 160
    expect(result[0].props.width).to.equal(160);
    expect(result[1].props.removed).to.equal(true);
    expect(result[0].props['aria-colspan']).to.equal(2);
  });

  it('Should not merge header cells when children is provided', () => {
    const cells = [
      makeHeaderCell({ colSpan: 2, width: 80, children: 'Header' }),
      makeHeaderCell({ width: 80, children: 'Header2' })
    ];

    const result = mergeCells(cells) as React.ReactElement<any>[];

    expect(result[0].props.width).to.equal(80);
  });

  it('Should not remove base cell when adjacent cell has content', () => {
    // When the base cell has nil content but adjacent cell has content,
    // the base cell should still be preserved (not removed).
    const data = { a: null, b: 'hello' };
    const cells = [
      makeCell({ colSpan: 2, width: 80, rowData: data, dataKey: 'a' }),
      makeCell({ width: 80, rowData: data, dataKey: 'b' })
    ];

    const result = mergeCells(cells) as React.ReactElement<any>[];

    // Base cell should NOT be removed
    expect(result[0].props.removed).not.to.equal(true);
    // Adjacent cell should NOT be removed (it has content)
    expect(result[1].props.removed).not.to.equal(true);
    // Width unchanged since adjacent cell was not merged
    expect(result[0].props.width).to.equal(80);
  });

  it('Should set aria-colspan to actual merged count, not original colSpan', () => {
    // colSpan=3 but only 1 adjacent cell (j=1) has nil data.
    // j=2 has content, so it is NOT merged.
    // aria-colspan should be mergedCount + 1 = 2, not colSpan=3.
    const data = { a: null, b: 'hello' };
    const cells = [
      makeCell({ colSpan: 3, width: 80, rowData: data, dataKey: 'a' }),
      makeCell({ width: 80, rowData: data, dataKey: 'a' }),
      makeCell({ width: 80, rowData: data, dataKey: 'b' })
    ];

    const result = mergeCells(cells) as React.ReactElement<any>[];

    // Only j=1 was merged (nil), j=2 has content so stays
    expect(result[0].props.width).to.equal(160);
    // aria-colspan should reflect actual span (1 base + 1 merged = 2)
    expect(result[0].props['aria-colspan']).to.equal(2);
    // j=2 cell should NOT be removed (it has content)
    expect(result[2].props.removed).not.to.equal(true);
  });

  it('Should handle groupCount and wrap in ColumnGroup for header', () => {
    // groupCount=2: j=0 keeps nextWidth, j=1 adds nextCellWidth and marks cells[1] as removed
    const cells = [
      makeHeaderCell({
        groupCount: 2,
        groupHeader: 'Group',
        groupAlign: 'center',
        groupVerticalAlign: 'middle',
        groupHeaderHeight: 20,
        width: 100,
        children: <span>col1</span>,
        dataKey: 'col1',
        sortable: false
      }),
      makeHeaderCell({
        width: 120,
        children: <span>col2</span>,
        dataKey: 'col2',
        sortable: false
      })
    ];

    const result = mergeCells(cells) as React.ReactElement<any>[];

    // The group cell is added, but cells[1] (removed=true) is also pushed by the outer loop.
    expect(result).to.have.length(2);
    // Width of group cell should be 100 + 120 = 220
    expect(result[0].props.width).to.equal(220);
    // Second cell should be marked removed
    expect(result[1].props.removed).to.equal(true);
    // Children of cells[0] should contain a ColumnGroup header
    const { container } = render(<>{result[0]}</>);
    expect(container.querySelector('.rs-column-group-header')).to.exist;
  });
});
