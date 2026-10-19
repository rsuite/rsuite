import React from 'react';
import Table from '../Table';
import CustomProvider from '../../CustomProvider';
import zhCN from '../../locales/zh_CN';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import type { TableInstance } from '../index';

describe('Table', () => {
  it('Should custom empty message', () => {
    render(<Table locale={{ emptyMessage: 'No data' }} />);
    expect(screen.getByText('No data')).to.exist;
  });

  it('Should custom loading message', () => {
    render(<Table locale={{ loading: 'Loading...' }} loading />);
    expect(screen.getByText('Loading...')).to.exist;
  });

  describe('CustomProvider', () => {
    it('Should apply provider defaults and RTL with its common locale', () => {
      render(
        <CustomProvider
          rtl
          locale={zhCN}
          components={{
            Table: { defaultProps: { width: 300, height: 200, className: 'provider-table' } }
          }}
        >
          <Table data={[]}>
            <Table.Column width={100}>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.Cell dataKey="name" />
            </Table.Column>
          </Table>
        </CustomProvider>
      );

      expect(screen.getByRole('grid')).to.have.class('provider-table');
      expect(screen.getByRole('grid')).to.have.style('width', '300px');
      expect(screen.getByRole('grid')).to.have.style('height', '200px');
      expect(screen.getByText('数据为空')).to.exist;
      expect(screen.getByRole('columnheader')).to.have.style('right', '0px');
    });

    it('Should let instance props override provider table defaults', () => {
      render(
        <CustomProvider
          locale={zhCN}
          components={{
            Table: {
              defaultProps: { width: 300, height: 200, className: 'provider-table', loading: true }
            }
          }}
        >
          <Table
            height={150}
            className="instance-table"
            loading={false}
            loadAnimation={false}
            locale={{ emptyMessage: 'Instance empty' }}
          />
        </CustomProvider>
      );

      const table = screen.getByRole('grid');
      expect(table).to.have.class('instance-table');
      expect(table).not.to.have.class('provider-table');
      expect(table).to.have.style('width', '300px');
      expect(table).to.have.style('height', '150px');
      expect(screen.getByText('Instance empty')).to.exist;
      expect(screen.queryByText('加载中...')).not.to.exist;
    });

    it('Should forward refs and row and sort callbacks with instance precedence', () => {
      const data = [{ id: 1, name: 'Ada' }];
      const ref = React.createRef<TableInstance<(typeof data)[number], string>>();
      const defaultOnRowClick = vi.fn();
      const defaultOnSortColumn = vi.fn();
      const onRowClick = vi.fn();
      const onSortColumn = vi.fn();

      render(
        <CustomProvider
          components={{
            Table: {
              defaultProps: {
                data,
                onRowClick: defaultOnRowClick,
                onSortColumn: defaultOnSortColumn
              }
            }
          }}
        >
          <Table
            ref={ref}
            sortColumn="name"
            sortType="asc"
            onRowClick={onRowClick}
            onSortColumn={onSortColumn}
          >
            <Table.Column width={100} sortable>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.Cell dataKey="name" />
            </Table.Column>
          </Table>
        </CustomProvider>
      );

      expect(ref.current?.root).to.equal(screen.getByRole('grid'));
      expect(ref.current?.body).to.equal(
        screen.getByRole('gridcell').closest('.rs-table-body-wheel-area')
      );
      expect(ref.current?.scrollTop).to.be.a('function');
      expect(ref.current?.scrollLeft).to.be.a('function');
      expect(screen.getByRole('columnheader')).to.have.attr('aria-sort', 'ascending');

      fireEvent.click(screen.getByText('Ada'));
      fireEvent.click(screen.getByText('Name'));

      expect(onRowClick).toHaveBeenCalledExactlyOnceWith(
        data[0],
        expect.objectContaining({ type: 'click' })
      );
      expect(onSortColumn).toHaveBeenCalledExactlyOnceWith('name', 'desc');
      expect(defaultOnRowClick).not.toHaveBeenCalled();
      expect(defaultOnSortColumn).not.toHaveBeenCalled();
    });

    it('Should render empty message in CustomProvider', () => {
      render(
        <CustomProvider locale={zhCN}>
          <Table />
        </CustomProvider>
      );

      expect(screen.getByText('数据为空')).to.exist;
    });

    it('Should render loading message in CustomProvider', () => {
      render(
        <CustomProvider locale={zhCN}>
          <Table loading />
        </CustomProvider>
      );

      expect(screen.getByText('加载中...')).to.exist;
    });

    it('Should override empty message in CustomProvider', () => {
      render(
        <CustomProvider locale={zhCN}>
          <Table locale={{ emptyMessage: 'No data' }} />
        </CustomProvider>
      );

      expect(screen.getByText('No data')).to.exist;
    });

    it('Should override loading message in CustomProvider', () => {
      render(
        <CustomProvider locale={zhCN}>
          <Table locale={{ loading: 'Loading...' }} loading />
        </CustomProvider>
      );

      expect(screen.getByText('Loading...')).to.exist;
    });
  });
});
