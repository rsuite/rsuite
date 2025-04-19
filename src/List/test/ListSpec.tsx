import React from 'react';
import sinon from 'sinon';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import List from '../List';

describe('List', () => {
  afterEach(() => {
    cleanup();
    // 确保在每个测试后恢复 document.body.style.overflow
    document.body.style.overflow = '';
  });

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

  // Simulating DOM events requires special handling in tests
  it('Should call onSortStart when mouse is pressed', () => {
    const onSortStart = sinon.spy();

    // Use setTimeout to simulate pressDelay
    const clock = sinon.useFakeTimers();

    render(
      <List sortable pressDelay={0} onSortStart={onSortStart}>
        <List.Item index={1}>item1</List.Item>
        <List.Item index={2}>item2</List.Item>
      </List>
    );

    // Trigger mousedown event
    fireEvent.mouseDown(screen.getAllByRole('listitem')[0]);

    // Advance time to trigger callback after pressDelay
    clock.tick(10);

    // Verify callback was called synchronously after the clock tick
    expect(onSortStart).to.have.been.called;

    clock.restore();
  });

  it('Should call onSortMove when mouse is moved after sort starts', () => {
    const onSortMove = sinon.spy();
    const mousemoveEvent = new Event('mousemove', { bubbles: true });

    // Use setTimeout to simulate pressDelay
    const clock = sinon.useFakeTimers();

    const ref = React.createRef<HTMLDivElement>();
    render(
      <List
        sortable
        pressDelay={0}
        ref={ref}
        onSortStart={() => window.dispatchEvent(mousemoveEvent)}
        onSortMove={onSortMove}
      >
        <List.Item index={1}>item1</List.Item>
        <List.Item index={2}>item2</List.Item>
      </List>
    );

    // Verify ref.current is set (this should be synchronous in the test environment)
    expect(ref.current).to.not.be.null;

    // Trigger mousedown event
    fireEvent.mouseDown((ref.current as HTMLDivElement).firstChild as HTMLElement);

    // Advance time to trigger callback after pressDelay
    clock.tick(10);

    // Verify callback was called synchronously after the clock tick
    expect(onSortMove).to.have.been.called;

    clock.restore();
  });

  it('Should call onSortEnd and onSort when sorting is completed', () => {
    const onSort = sinon.spy();
    const onSortEnd = sinon.spy();

    // Create a mouseup event, but don't trigger it immediately
    const mouseupEvent = new Event('mouseup', { bubbles: true });

    // Use setTimeout to simulate pressDelay
    const clock = sinon.useFakeTimers();

    // Use sinon to mock onSortStart behavior
    const onSortStart = sinon.spy(() => {
      // When onSortStart is called, trigger the mouseup event
      setTimeout(() => {
        window.dispatchEvent(mouseupEvent);
      }, 0);
    });

    const ref = React.createRef<HTMLDivElement>();
    render(
      <List
        sortable
        pressDelay={0}
        ref={ref}
        onSortStart={onSortStart}
        onSortEnd={onSortEnd}
        onSort={onSort}
      >
        <List.Item index={1}>item1</List.Item>
        <List.Item index={2}>item2</List.Item>
      </List>
    );

    // Verify ref.current is set (this should be synchronous in the test environment)
    expect(ref.current).to.not.be.null;

    // Trigger mousedown event
    fireEvent.mouseDown((ref.current as HTMLDivElement).firstChild as HTMLElement);

    // Advance time to trigger callback after pressDelay
    clock.tick(10);

    // Confirm onSortStart was called
    expect(onSortStart).to.have.been.called;

    // Advance time to trigger mouseup event in setTimeout
    clock.tick(10);

    // Advance time to wait for async callbacks to complete
    clock.tick(500);

    // Verify callbacks were called
    expect(onSortEnd).to.have.been.called;
    expect(onSort).to.have.been.called;

    clock.restore();
  });

  // Note: Due to limitations in the test environment, we cannot fully test touch events
  // Touch event functionality needs to be manually tested on real devices
});
