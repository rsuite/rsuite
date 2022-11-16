import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import List from '../List';

describe('List', () => {
  testStandardProps(<List />);

  it('Should render a List', () => {
    const domNode = getDOMNode(<List />);
    assert.include(domNode.className, 'rs-list');
  });

  it('Should be bordered', () => {
    const domNode = getDOMNode(<List bordered />);
    assert.include(domNode.className, 'rs-list-bordered');
  });

  it('Should have hover animation', () => {
    const domNode = getDOMNode(<List hover />);
    assert.include(domNode.className, 'rs-list-hover');
  });

  it('should be sortable', () => {
    const domNode = getDOMNode(<List sortable />);
    assert.include(domNode.className, 'rs-list-sortable');
  });

  it('Should render different size', () => {
    const domNode = getDOMNode(
      <List>
        <List.Item index={1} />
      </List>
    );
    const domNodeSmall = getDOMNode(
      <List size="sm">
        <List.Item index={1} />
      </List>
    );
    const domNodeMedium = getDOMNode(
      <List size="md">
        <List.Item index={1} />
      </List>
    );
    const domNodeLarge = getDOMNode(
      <List size="lg">
        <List.Item index={1} />
      </List>
    );
    assert.include((domNode.firstChild as HTMLElement).className, 'rs-list-item-md');
    assert.include((domNodeSmall.firstChild as HTMLElement).className, 'rs-list-item-sm');
    assert.include((domNodeMedium.firstChild as HTMLElement).className, 'rs-list-item-md');
    assert.include((domNodeLarge.firstChild as HTMLElement).className, 'rs-list-item-lg');
  });

  it('should call onSortStart', done => {
    const callback = () => done();
    const ref = React.createRef<HTMLDivElement>();
    render(
      <List ref={ref} sortable onSortStart={callback}>
        <List.Item index={1}>item1</List.Item>
        <List.Item index={2}>item2</List.Item>
      </List>
    );

    ReactTestUtils.Simulate.mouseDown((ref.current as HTMLDivElement).firstChild as HTMLElement);
  });

  it('should call onSortMove', done => {
    const callback = () => done();
    const mousemoveEvent = new Event('mousemove', { bubbles: true });
    const ref = React.createRef<HTMLDivElement>();
    render(
      <List
        sortable
        ref={ref}
        onSortStart={() => window.dispatchEvent(mousemoveEvent)}
        onSortMove={callback}
      >
        <List.Item index={1}>item1</List.Item>
        <List.Item index={2}>item2</List.Item>
      </List>
    );

    ReactTestUtils.Simulate.mouseDown((ref.current as HTMLDivElement).firstChild as HTMLElement);
  });

  it('should call onSortEnd & onSort', done => {
    let count = 0;
    const callback = () => ++count > 1 && done();
    const mouseupEvent = new Event('mouseup', { bubbles: true });
    const ref = React.createRef<HTMLDivElement>();
    render(
      <List
        sortable
        ref={ref}
        onSortStart={() => window.dispatchEvent(mouseupEvent)}
        onSortEnd={callback}
        onSort={callback}
      >
        <List.Item index={1}>item1</List.Item>
        <List.Item index={2}>item2</List.Item>
      </List>
    );

    ReactTestUtils.Simulate.mouseDown((ref.current as HTMLDivElement).firstChild as HTMLElement);
  });
});
