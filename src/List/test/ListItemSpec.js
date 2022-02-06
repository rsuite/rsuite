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
});
