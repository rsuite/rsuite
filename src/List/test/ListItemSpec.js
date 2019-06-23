import React from 'react';
import List from '../src/List';
import { getDOMNode } from './testUtils';

describe('ListItem', () => {
  it('Should render a ListItem', () => {
    const domNode = getDOMNode(
      <List>
        <List.Item />
      </List>
    );
    assert.include(domNode.firstChild.className, 'rs-list-item');
  });

  it('Should be disabled', () => {
    const domNode = getDOMNode(
      <List>
        <List.Item disabled>Disabled</List.Item>
      </List>
    );
    assert.include(domNode.firstChild.className, 'rs-list-item-disabled');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const domNode = getDOMNode(
      <List>
        <List.Item style={{ fontSize }} />
      </List>
    );
    assert.equal(domNode.firstChild.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const domNode = getDOMNode(
      <List>
        <List.Item classPrefix="custom-prefix" />
      </List>
    );
    assert.ok(domNode.firstChild.className.match(/\bcustom-prefix\b/));
  });
});
