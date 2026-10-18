import React from 'react';
import getHeight from 'dom-lib/getHeight';
import Table from '../Table';
import Column from '../Column';
import Cell from '../Cell';
import HeaderCell from '../HeaderCell';
import { render, waitFor, act, fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

describe('TreeTable', () => {
  it('Should be wordWrap when isTree', async () => {
    const data = [{ id: 1, country: 'South Georgia and the South Sandwich Islands' }];
    const ref = React.createRef<any>();

    render(
      <Table ref={ref} wordWrap isTree data={data} rowKey="id">
        <Column width={20}>
          <HeaderCell>Country</HeaderCell>
          <Cell dataKey="country" />
        </Column>
      </Table>
    );

    const table = ref.current.root;
    const cell = table.querySelectorAll('.rs-table-cell')[1];

    expect(cell).to.text('South Georgia and the South Sandwich Islands');

    await waitFor(() => {
      expect(getHeight(cell)).to.be.gt(46);
    });
  });

  it('Should render custom tree toggle', () => {
    const ref = React.createRef<any>();
    act(() => {
      render(
        <Table
          isTree
          ref={ref}
          expandedRowKeys={[1]}
          rowKey="id"
          renderTreeToggle={(_expandButton, rowData: any, expanded) => {
            if (expanded) {
              return <div className="toggle-open">{rowData.name}</div>;
            }
            return <div className="toggle-close">{rowData.name}</div>;
          }}
          data={[
            {
              id: 1,
              name: 'a',
              children: [
                {
                  id: 2,
                  name: 'b',
                  children: [
                    {
                      id: 3,
                      name: 'c'
                    }
                  ]
                }
              ]
            }
          ]}
        >
          <Column>
            <HeaderCell>a</HeaderCell>
            <Cell>a</Cell>
          </Column>
          <Column treeCol>
            <HeaderCell>b</HeaderCell>
            <Cell>b</Cell>
          </Column>
        </Table>
      );
    });

    const table = ref.current.root;
    const openRows = table.querySelectorAll('.toggle-open');

    expect(openRows).to.be.length(1);
    expect(openRows[0]).to.be.text('a');
    expect(table.querySelector('.toggle-close')).to.be.text('b');
  });

  it('Should be indented tree child nodes', () => {
    render(
      <Table
        isTree
        defaultExpandAllRows
        rowKey="id"
        data={[
          {
            id: 1,
            name: 'a',
            children: [
              {
                id: 2,
                name: 'b',
                children: [
                  {
                    id: 3,
                    name: 'c'
                  }
                ]
              }
            ]
          }
        ]}
      >
        <Column>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>
      </Table>
    );

    expect(screen.getAllByRole('gridcell')).to.be.length(3);

    screen.getAllByRole('gridcell').forEach((cell, index) => {
      const content = cell.querySelector('.rs-table-cell-content') as HTMLElement;
      expect(content.style.paddingLeft).to.equal(`${index * 30 + 10}px`);
    });
  });

  it('Should be wordWrap when node is expanded', async () => {
    const data = [
      {
        id: 1,
        country: 'Test',
        children: [{ id: 2, country: 'South Georgia and the South Sandwich Islands' }]
      }
    ];
    const ref = React.createRef<any>();

    render(
      <Table ref={ref} wordWrap isTree data={data} rowKey="id">
        <Column width={20}>
          <HeaderCell>Country</HeaderCell>
          <Cell dataKey="country" />
        </Column>
      </Table>
    );

    const table = ref.current.root;
    const button = table.querySelector('.rs-table-cell-expand-wrapper');

    expect(table.querySelectorAll('.rs-table-cell')[2]).to.be.not.exist;

    fireEvent.click(button);

    const cell = table.querySelectorAll('.rs-table-cell')[2];

    expect(cell).to.text('South Georgia and the South Sandwich Islands');

    await waitFor(() => {
      expect(getHeight(cell)).to.be.gt(46);
    });
  });

  it('Should render custom tree columns', () => {
    render(
      <Table
        isTree
        defaultExpandAllRows
        rowKey="id"
        data={[
          {
            id: 1,
            name: 'a',
            children: [
              {
                id: 2,
                name: 'b'
              }
            ]
          }
        ]}
      >
        <Column>
          <HeaderCell>a</HeaderCell>
          <Cell>a</Cell>
        </Column>
        <Column treeCol>
          <HeaderCell>b</HeaderCell>
          <Cell>b</Cell>
        </Column>
      </Table>
    );

    const expandWrapper = screen
      .getByRole('treegrid')
      .querySelector('.rs-table-cell-expand-wrapper') as HTMLElement;

    expect(expandWrapper.parentNode).to.be.text('b');
  });

  it('Should call `onExpandChange` callback', () => {
    const onExpandChangeSpy = vi.fn();
    render(
      <Table
        onExpandChange={onExpandChangeSpy}
        isTree
        rowKey="id"
        data={[
          {
            id: 1,
            name: 'a',
            hasChildren: true,
            children: [
              {
                id: 2,
                name: 'b'
              }
            ]
          }
        ]}
      >
        <Column>
          <HeaderCell>11</HeaderCell>
          <Cell dataKey="id" />
        </Column>
      </Table>
    );

    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(onExpandChangeSpy).toHaveBeenCalledOnce();
  });

  // https://github.com/rsuite/rsuite/issues/1257
  it('Should change data, after the isTree property is changed', () => {
    const data = [
      {
        rowKey: 'a',
        name: 'tets',
        num: 1999,
        children: [
          {
            name: 'test-1',
            num: 1000
          },
          {
            name: 'test-2',
            num: 999
          }
        ]
      }
    ];
    const App = React.forwardRef((_props, ref) => {
      const [tree, setTree] = React.useState(true);
      const tableRef = React.useRef<any>(null);
      React.useImperativeHandle(ref, () => ({
        get table() {
          return tableRef.current.root;
        },
        setTree
      }));
      return (
        <div>
          <Table
            ref={tableRef}
            isTree={tree}
            data={data}
            showHeader={false}
            rowKey="rowKey"
            defaultExpandAllRows
          >
            <Column>
              <HeaderCell>name</HeaderCell>
              <Cell dataKey="name" />
            </Column>
            <Column>
              <HeaderCell>num</HeaderCell>
              <Cell dataKey="num" />
            </Column>
          </Table>
        </div>
      );
    });
    App.displayName = 'App';
    const ref = React.createRef<any>();
    act(() => {
      render(<App ref={ref} />);
    });

    const table = ref.current.table;

    expect(table.querySelectorAll('.rs-table-row')).to.be.length(3);

    act(() => {
      ref.current.setTree(false);
    });

    expect(table.querySelectorAll('.rs-table-row')).to.be.length(1);
    expect(getHeight(table.querySelector('.rs-table-row'))).to.be.equal(46);
  });

  it('Should show a vertical scroll bar when the tree is expanded', () => {
    const data = [
      {
        name: '1',
        children: [
          { name: '1-1' },
          { name: '1-2' },
          { name: '1-3' },
          { name: '1-4' },
          { name: '1-5' },
          { name: '1-6' },
          { name: '1-7' },
          { name: '1-8' },
          { name: '1-9' }
        ]
      }
    ];

    const ref = React.createRef<any>();

    render(
      <Table ref={ref} isTree data={data} showHeader={false} rowKey="name" height={100}>
        <Column>
          <HeaderCell>name</HeaderCell>
          <Cell dataKey="name" />
        </Column>
      </Table>
    );

    const table = screen.getByRole('treegrid');
    const expand = table.querySelector('.rs-table-cell-expand-icon') as HTMLElement;

    // Before the Tree expands, it displays 1 row without vertical scroll bar.
    expect(table.querySelectorAll('.rs-table-row')).to.be.length(1);
    expect(table.querySelector('.rs-table-scrollbar-vertical')).to.be.not.exist;

    fireEvent.click(expand);

    // After the Tree is expanded, 10 rows are displayed and a vertical scroll bar is displayed at the same time.
    expect(table.querySelectorAll('.rs-table-row')).to.be.length(10);
    expect(table.querySelector('.rs-table-scrollbar-vertical')).to.be.exist;
  });
});
