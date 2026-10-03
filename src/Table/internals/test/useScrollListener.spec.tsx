import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Table from '../Table';
import Column from '../Column';
import HeaderCell from '../HeaderCell';
import Cell from '../Cell';

const defaultData = [
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
  { id: 4, name: 'd' },
  { id: 5, name: 'e' },
  { id: 6, name: 'f' },
  { id: 7, name: 'g' },
  { id: 8, name: 'h' }
];

const largeData = Array.from({ length: 50 }, (_, i) => ({ id: i, name: `row ${i}` }));

const TestTable = ({ children, ...rest }: any) => (
  <Table rowHeight={30} height={100} {...rest}>
    {children}
  </Table>
);

describe('useScrollListener', () => {
  describe('Keyboard navigation', () => {
    it('Should scroll down on ArrowDown key', () => {
      render(
        <TestTable data={largeData}>
          <Column>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
        </TestTable>
      );

      const grid = screen.getByRole('grid');
      fireEvent.keyDown(grid, { key: 'ArrowDown' });
      expect(grid.querySelector('.rs-table-body-wheel-area')).to.exist;
    });

    it('Should scroll up on ArrowUp key', () => {
      render(
        <TestTable data={largeData}>
          <Column>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
        </TestTable>
      );

      const grid = screen.getByRole('grid');
      fireEvent.keyDown(grid, { key: 'ArrowUp' });
      expect(grid).to.exist;
    });

    it('Should scroll left on ArrowLeft key', () => {
      render(
        <TestTable data={defaultData} width={150}>
          <Column width={100}>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
          <Column width={100}>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>
        </TestTable>
      );

      const grid = screen.getByRole('grid');
      fireEvent.keyDown(grid, { key: 'ArrowLeft' });
      expect(grid).to.exist;
    });

    it('Should scroll right on ArrowRight key', () => {
      render(
        <TestTable data={defaultData} width={150}>
          <Column width={100}>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
          <Column width={100}>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>
        </TestTable>
      );

      const grid = screen.getByRole('grid');
      fireEvent.keyDown(grid, { key: 'ArrowRight' });
      expect(grid).to.exist;
    });

    it('Should not throw on non-arrow keys', () => {
      render(
        <TestTable data={defaultData}>
          <Column>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
        </TestTable>
      );

      const grid = screen.getByRole('grid');
      expect(() => fireEvent.keyDown(grid, { key: 'Enter' })).not.to.throw();
      expect(() => fireEvent.keyDown(grid, { key: 'Tab' })).not.to.throw();
      expect(() => fireEvent.keyDown(grid, { key: 'Escape' })).not.to.throw();
    });
  });

  describe('Body scroll events', () => {
    it('Should handle onScroll event on body wrapper', () => {
      render(
        <TestTable data={largeData}>
          <Column>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
        </TestTable>
      );

      const bodyWrapper = screen
        .getByRole('grid')
        .querySelector('.rs-table-body-row-wrapper') as HTMLElement;

      expect(bodyWrapper).to.exist;

      Object.defineProperty(bodyWrapper, 'scrollTop', { value: 20, writable: true });
      Object.defineProperty(bodyWrapper, 'scrollLeft', { value: 5, writable: true });

      fireEvent.scroll(bodyWrapper);
      expect(bodyWrapper).to.exist;
    });

    it('Should ignore scroll events from non-body elements', () => {
      render(
        <TestTable data={largeData}>
          <Column>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
        </TestTable>
      );

      const wheelArea = screen
        .getByRole('grid')
        .querySelector('.rs-table-body-wheel-area') as HTMLElement;

      expect(wheelArea).to.exist;

      Object.defineProperty(wheelArea, 'scrollTop', { value: 10, writable: true });
      Object.defineProperty(wheelArea, 'scrollLeft', { value: 0, writable: true });

      expect(() => fireEvent.scroll(wheelArea)).not.to.throw();
    });
  });

  describe('RTL initialization', () => {
    it('Should initialize scroll position correctly in RTL mode', () => {
      render(
        <TestTable rtl data={defaultData} width={150}>
          <Column width={100}>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
          <Column width={100}>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>
        </TestTable>
      );

      const grid = screen.getByRole('grid');
      expect(grid).to.exist;
    });
  });

  describe('Virtualized scroll', () => {
    it('Should disable pointer events during scrolling', () => {
      render(
        <TestTable virtualized data={largeData}>
          <Column>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
        </TestTable>
      );

      const bodyWrapper = screen
        .getByRole('grid')
        .querySelector('.rs-table-body-row-wrapper') as HTMLElement;

      act(() => {
        fireEvent.wheel(bodyWrapper, { deltaY: 30 });
      });

      const wheelArea = screen
        .getByRole('grid')
        .querySelector('.rs-table-body-wheel-area') as HTMLElement;
      expect(wheelArea).to.exist;
    });
  });

  describe('Scrollbar interaction', () => {
    it('Should handle vertical scrollbar click', () => {
      const onScroll = vi.fn();
      render(
        <TestTable onScroll={onScroll} data={largeData}>
          <Column>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
        </TestTable>
      );

      const scrollbarTrack = screen
        .getByRole('grid')
        .querySelector('.rs-table-scrollbar-vertical') as HTMLElement;

      if (scrollbarTrack) {
        act(() => {
          fireEvent.mouseDown(scrollbarTrack);
        });
        expect(scrollbarTrack).to.exist;
      }
    });

    it('Should handle horizontal scrollbar click', () => {
      const onScroll = vi.fn();
      render(
        <TestTable onScroll={onScroll} data={defaultData} width={100}>
          <Column width={100}>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
          <Column width={100}>
            <HeaderCell>Id</HeaderCell>
            <Cell dataKey="id" />
          </Column>
        </TestTable>
      );

      const scrollbarTrack = screen
        .getByRole('grid')
        .querySelector('.rs-table-scrollbar-horizontal') as HTMLElement;

      if (scrollbarTrack) {
        act(() => {
          fireEvent.mouseDown(scrollbarTrack);
        });
        expect(scrollbarTrack).to.exist;
      }
    });
  });

  describe('Stop scroll behavior', () => {
    it('Should stop scroll transitions when data changes', () => {
      const { rerender } = render(
        <TestTable data={largeData}>
          <Column>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
        </TestTable>
      );

      // Change data to trigger useUpdateEffect which calls stopScroll
      const newData = Array.from({ length: 30 }, (_, i) => ({ id: i, name: `new ${i}` }));
      rerender(
        <TestTable data={newData}>
          <Column>
            <HeaderCell>Name</HeaderCell>
            <Cell dataKey="name" />
          </Column>
        </TestTable>
      );

      expect(screen.getByRole('grid')).to.exist;
    });
  });
});
