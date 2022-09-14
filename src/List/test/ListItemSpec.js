import React from 'react';
import { getDOMNode } from '@test/testUtils';
import { testStandardProps } from '@test/commonCases';
import List from '../List';
import ListItem from '../ListItem';
import { render } from '@testing-library/react';

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

  it('Should be different size', async () => {
    const screen = render(
      <List size="lg">
        <List.Item index={1} size="sm">
          Small
        </List.Item>
        <List.Item>Large</List.Item>
      </List>
    );

    const items = await screen.findAllByRole('listitem');
    assert.include(items[0].className, 'rs-list-item-sm');
    assert.include(items[1].className, 'rs-list-item-lg');
  });
});
