import React from 'react';
import List from '../List';
import { getDOMNode } from '@test/testUtils';

describe('List', () => {
  it('Should render a List', () => {
    const domNode = getDOMNode(<List />);
    assert.include(domNode.className, 'rs-list');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const domNode = getDOMNode(<List style={{ fontSize }} />);
    assert.equal(domNode.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const domNode = getDOMNode(<List classPrefix="custom-prefix" />);
    assert.ok(domNode.className.match(/\bcustom-prefix\b/));
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
    assert.include(domNode.firstChild.className, 'rs-list-item-md');
    assert.include(domNodeSmall.firstChild.className, 'rs-list-item-sm');
    assert.include(domNodeMedium.firstChild.className, 'rs-list-item-md');
    assert.include(domNodeLarge.firstChild.className, 'rs-list-item-lg');
  });

  it('should call onSortStart', done => {
    const callback = () => done();
    const domNode = getDOMNode(
      <List sortable onSortStart={callback}>
        <List.Item index={1}>item1</List.Item>
        <List.Item index={2}>item2</List.Item>
      </List>
    );
    const event = new Event('mousedown', { bubbles: true });
    domNode.firstChild.dispatchEvent(event);
  });

  it('should call onSortMove', done => {
    const callback = () => done();
    const mousedownEvent = new Event('mousedown', { bubbles: true });
    const mousemoveEvent = new Event('mousemove', { bubbles: true });
    const domNode = getDOMNode(
      <List sortable onSortStart={() => window.dispatchEvent(mousemoveEvent)} onSortMove={callback}>
        <List.Item index={1}>item1</List.Item>
        <List.Item index={2}>item2</List.Item>
      </List>
    );
    domNode.firstChild.dispatchEvent(mousedownEvent);
  });

  it('should call onSortEnd & onSort', done => {
    let count = 0;
    const callback = () => ++count > 1 && done();
    const mousedownEvent = new Event('mousedown', { bubbles: true });
    const mouseupEvent = new Event('mouseup', { bubbles: true });
    const domNode = getDOMNode(
      <List
        sortable
        onSortStart={() => window.dispatchEvent(mouseupEvent)}
        onSortEnd={callback}
        onSort={callback}
      >
        <List.Item index={1}>item1</List.Item>
        <List.Item index={2}>item2</List.Item>
      </List>
    );
    domNode.firstChild.dispatchEvent(mousedownEvent);
  });
});
