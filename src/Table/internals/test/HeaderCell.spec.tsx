import React from 'react';
import HeaderCell from '../HeaderCell';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('HeaderCell', () => {
  it('Should output a header', () => {
    render(<HeaderCell>test</HeaderCell>);
    expect(screen.getByRole('columnheader').parentNode).to.have.class('rs-cell-header');
  });

  it('Should output default sort icon', () => {
    render(
      <HeaderCell sortable dataKey="name">
        test
      </HeaderCell>
    );
    expect(screen.getByRole('columnheader').querySelector('.rs-cell-header-icon-sort')).to.be.not
      .null;
  });

  it('Should output default sort desc icon', () => {
    render(
      <HeaderCell sortable sortColumn="name" sortType="desc" dataKey="name">
        test
      </HeaderCell>
    );

    expect(
      screen.getByRole('columnheader').querySelector('.rs-cell-header-icon-sort')
    ).to.have.attribute('data-sort', 'desc');
  });

  it('Should call `onSortColumn` callback', () => {
    const onSortColumn = vi.fn();

    render(
      <HeaderCell width={100} onSortColumn={onSortColumn} sortable dataKey="name">
        test
      </HeaderCell>
    );

    fireEvent.click(screen.getByRole('columnheader'));

    expect(onSortColumn).toHaveBeenCalledWith('name');
  });

  it('Should call `onColumnResizeStart` callback', () => {
    const onColumnResizeStart = vi.fn();

    const { container } = render(
      <HeaderCell onColumnResizeStart={onColumnResizeStart} resizable>
        test
      </HeaderCell>
    );

    fireEvent.mouseDown(container.querySelector('.rs-column-resize-spanner') as Element);

    expect(onColumnResizeStart).toHaveBeenCalledOnce();
  });

  it('Should render custom sort icons', () => {
    const renderSortIcon = sortType => {
      if (sortType === 'asc') {
        return 1;
      } else if (sortType === 'desc') {
        return 2;
      }
      return 3;
    };

    const { container, rerender } = render(
      <HeaderCell sortable dataKey="name" renderSortIcon={renderSortIcon}>
        test
      </HeaderCell>
    );

    expect(container.querySelector('.rs-cell-header-sort-wrapper')).to.have.text('3');

    rerender(
      <HeaderCell sortable dataKey="name" renderSortIcon={renderSortIcon} sortType="asc">
        test
      </HeaderCell>
    );
    expect(container.querySelector('.rs-cell-header-sort-wrapper')).to.have.text('3');

    rerender(
      <HeaderCell
        sortable
        dataKey="name"
        renderSortIcon={renderSortIcon}
        sortType="asc"
        sortColumn="name"
      >
        test
      </HeaderCell>
    );
    expect(container.querySelector('.rs-cell-header-sort-wrapper')).to.have.text('1');

    rerender(
      <HeaderCell
        sortable
        dataKey="name"
        renderSortIcon={renderSortIcon}
        sortType="desc"
        sortColumn="name"
      >
        test
      </HeaderCell>
    );

    expect(container.querySelector('.rs-cell-header-sort-wrapper')).to.have.text('2');
  });
});
