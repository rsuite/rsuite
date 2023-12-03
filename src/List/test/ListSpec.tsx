import React from 'react';
import { render, waitFor, screen, cleanup } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import { testStandardProps } from '@test/commonCases';
import List from '../List';
import Sinon from 'sinon';

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

  it('Should have hover animation', () => {
    render(<List hover />);
    expect(screen.getByRole('list')).to.have.class('rs-list-hover');
  });

  it('should be sortable', () => {
    render(<List sortable />);
    expect(screen.getByRole('list')).to.have.class('rs-list-sortable');
  });

  it('Should render different size', () => {
    render(
      <>
        <List data-testid="list">
          <List.Item index={1} />
        </List>

        <List data-testid="list-sm" size="sm">
          <List.Item index={1} />
        </List>

        <List data-testid="list-md" size="md">
          <List.Item index={1} />
        </List>

        <List data-testid="list-lg" size="lg">
          <List.Item index={1} />
        </List>
      </>
    );

    expect(screen.getByTestId('list').firstChild).to.have.class('rs-list-item-md');
    expect(screen.getByTestId('list-sm').firstChild).to.have.class('rs-list-item-sm');
    expect(screen.getByTestId('list-md').firstChild).to.have.class('rs-list-item-md');
    expect(screen.getByTestId('list-lg').firstChild).to.have.class('rs-list-item-lg');
  });

  it('should call onSortStart', async () => {
    const onSortStart = Sinon.spy();
    const ref = React.createRef<HTMLDivElement>();
    render(
      <List ref={ref} sortable onSortStart={onSortStart}>
        <List.Item index={1}>item1</List.Item>
        <List.Item index={2}>item2</List.Item>
      </List>
    );

    ReactTestUtils.Simulate.mouseDown((ref.current as HTMLDivElement).firstChild as HTMLElement);

    await waitFor(() => {
      expect(onSortStart).to.have.been.calledOnce;
    });

    // FIXME-Doma
    // This test case didn't cleanup the nodes it creates
  });

  it('should call onSortMove', async () => {
    const onSortMove = Sinon.spy();
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

    ReactTestUtils.Simulate.mouseDown((ref.current as HTMLDivElement).firstChild as HTMLElement);
    await waitFor(() => {
      expect(onSortMove).to.have.been.calledOnce;
    });
    // FIXME-Doma
    // This test case didn't cleanup the nodes it creates
  });

  it('should call onSortEnd & onSort', async () => {
    const onSort = Sinon.spy();
    const onSortEnd = Sinon.spy();
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

    ReactTestUtils.Simulate.mouseDown((ref.current as HTMLDivElement).firstChild as HTMLElement);
    await waitFor(() => {
      expect(onSort).to.have.been.calledOnce;
    });
    await waitFor(() => {
      expect(onSortEnd).to.have.been.calledOnce;
    });
  });
});
