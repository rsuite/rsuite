import React from 'react';
import List from '../List';
import { getDOMNode } from '@test/testUtils';

describe('ListItem', () => {
  it('Should render a ListItem', () => {
    const domNode = getDOMNode(
      <List>
        <List.Item index={1} />
      </List>
    );
    assert.include(domNode.firstChild.className, 'rs-list-item');
  });

  it('Should be disabled', () => {
    const domNode = getDOMNode(
      <List>
        <List.Item index={1} disabled>
          Disabled
        </List.Item>
      </List>
    );
    assert.include(domNode.firstChild.className, 'rs-list-item-disabled');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const domNode = getDOMNode(
      <List>
        <List.Item index={1} style={{ fontSize }} />
      </List>
    );
    assert.equal(domNode.firstChild.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const domNode = getDOMNode(
      <List>
        <List.Item index={1} classPrefix="custom-prefix" />
      </List>
    );
    assert.ok(domNode.firstChild.className.match(/\bcustom-prefix\b/));
  });
});
