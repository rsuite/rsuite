import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import List from '../List';
import ListItem from '../ListItem';

describe('ListItem', () => {
  testStandardProps(<ListItem />);

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

  it('Should be different size', () => {
    const domNode = getDOMNode(
      <List size="lg">
        <List.Item index={1} size="sm">
          Small
        </List.Item>
        <List.Item>Large</List.Item>
      </List>
    );
    assert.include(domNode.firstChild.className, 'rs-list-item-sm');
    assert.include(domNode.lastChild.className, 'rs-list-item-lg');
  });
});
