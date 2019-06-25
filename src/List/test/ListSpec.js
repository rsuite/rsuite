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
        <List.Item />
      </List>
    );
    const domNodeSmall = getDOMNode(
      <List size="sm">
        <List.Item />
      </List>
    );
    const domNodeMedium = getDOMNode(
      <List size="md">
        <List.Item />
      </List>
    );
    const domNodeLarge = getDOMNode(
      <List size="lg">
        <List.Item />
      </List>
    );
    assert.include(domNode.firstChild.className, 'rs-list-item-md');
    assert.include(domNodeSmall.firstChild.className, 'rs-list-item-sm');
    assert.include(domNodeMedium.firstChild.className, 'rs-list-item-md');
    assert.include(domNodeLarge.firstChild.className, 'rs-list-item-lg');
  });
});
