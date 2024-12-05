import React from 'react';
import sinon from 'sinon';
import { render, waitFor, screen, cleanup, fireEvent } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import List from '../List';

describe('List', () => {
  afterEach(cleanup);

  testStandardProps(<List />);

  it('Should render a List', () => {
    render(<List />);
    expect(screen.getByRole('list')).to.have.class('rs-list');
  });

  it('Should be bordered', () => {
    render(<List bordered />);
    expect(screen.getByRole('list')).to.have.class('rs-list-bordered');
  });

  it('Should have divider', () => {
    const { rerender } = render(<List />);

    expect(screen.getByRole('list')).to.have.class('rs-list-divider');

    rerender(<List divider={false} />);

    expect(screen.getByRole('list')).not.to.have.class('rs-list-divider');
  });

  it('Should have hover animation', () => {
    render(<List hover />);
    expect(screen.getByRole('list')).to.have.class('rs-list-hover');
  });

  it('Should be sortable', () => {
    render(<List sortable />);
    expect(screen.getByRole('list')).to.have.class('rs-list-sortable');
  });

  it('Should render different size', () => {
    render(
      <>
        <List>
          <List.Item index={1} />
        </List>

        <List size="sm">
          <List.Item index={1} />
        </List>

        <List size="md">
          <List.Item index={1} />
        </List>

        <List size="lg">
          <List.Item index={1} />
        </List>

        <List size="xs">
          <List.Item index={1} />
        </List>
      </>
    );

    expect(screen.queryAllByRole('listitem')[0]).to.have.class('rs-list-item-md');
    expect(screen.queryAllByRole('listitem')[1]).to.have.class('rs-list-item-sm');
    expect(screen.queryAllByRole('listitem')[2]).to.have.class('rs-list-item-md');
    expect(screen.queryAllByRole('listitem')[3]).to.have.class('rs-list-item-lg');
    expect(screen.queryAllByRole('listitem')[4]).to.have.class('rs-list-item-xs');
  });

  it('Should call onSortStart', async () => {
    const onSortStart = sinon.spy();

    render(
      <List sortable onSortStart={onSortStart}>
        <List.Item index={1}>item1</List.Item>
        <List.Item index={2}>item2</List.Item>
      </List>
    );
    fireEvent.mouseDown(screen.getAllByRole('listitem')[0]);

    await waitFor(() => {
      expect(onSortStart).to.have.been.calledOnce;
    });

    // FIXME-Doma
    // This test case didn't cleanup the nodes it creates
  });

  it('Should call onSortMove', async () => {
    const onSortMove = sinon.spy();
    const mousemoveEvent = new Event('mousemove', { bubbles: true });
    const ref = React.createRef<HTMLDivElement>();
    render(
      <List
        sortable
        ref={ref}
        onSortStart={() => window.dispatchEvent(mousemoveEvent)}
        onSortMove={onSortMove}
      >
        <List.Item index={1}>item1</List.Item>
        <List.Item index={2}>item2</List.Item>
      </List>
    );

    fireEvent.mouseDown((ref.current as HTMLDivElement).firstChild as HTMLElement);

    await waitFor(() => {
      expect(onSortMove).to.have.been.calledOnce;
    });
    // FIXME-Doma
    // This test case didn't cleanup the nodes it creates
  });

  it('Should call onSortEnd & onSort', async () => {
    const onSort = sinon.spy();
    const onSortEnd = sinon.spy();
    const mouseupEvent = new Event('mouseup', { bubbles: true });
    const ref = React.createRef<HTMLDivElement>();
    render(
      <List
        sortable
        ref={ref}
        onSortStart={() => window.dispatchEvent(mouseupEvent)}
        onSortEnd={onSortEnd}
        onSort={onSort}
      >
        <List.Item index={1}>item1</List.Item>
        <List.Item index={2}>item2</List.Item>
      </List>
    );

    fireEvent.mouseDown((ref.current as HTMLDivElement).firstChild as HTMLElement);

    await waitFor(() => {
      expect(onSort).to.have.been.calledOnce;
    });
    await waitFor(() => {
      expect(onSortEnd).to.have.been.calledOnce;
    });
  });
});
