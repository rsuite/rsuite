import React from 'react';
import { testStandardProps } from '@test/utils';
import List from '../List';
import ListItem from '../ListItem';
import { render, screen } from '@testing-library/react';

describe('ListItem', () => {
  testStandardProps(<ListItem />, {
    sizes: ['lg', 'md', 'sm', 'xs']
  });

  it('Should render a ListItem', () => {
    const { container } = render(
      <List>
        <List.Item index={1} />
      </List>
    );

    expect(container.firstChild?.firstChild).to.have.class('rs-list-item');
  });

  it('Should be disabled', () => {
    const { container } = render(
      <List>
        <List.Item index={1} disabled>
          Disabled
        </List.Item>
      </List>
    );
    expect(container.firstChild?.firstChild).to.have.class('rs-list-item-disabled');
  });

  it('Should be different size', async () => {
    render(
      <List size="lg">
        <List.Item index={1} size="sm">
          Small
        </List.Item>
        <List.Item>Large</List.Item>
      </List>
    );

    const items = await screen.findAllByRole('listitem');
    expect(items[0]).to.have.class('rs-list-item-sm');
    expect(items[1]).to.have.class('rs-list-item-lg');
  });
});
