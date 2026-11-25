import React from 'react';
import List from '../List';
import ListItem from '../ListItem';
import { describe, expect, it } from 'vitest';
import { testStandardProps } from '@test/cases';
import { render, screen } from '@testing-library/react';

describe('ListItem', () => {
  testStandardProps(<ListItem />, {
    sizes: ['lg', 'md', 'sm', 'xs']
  });

  it('Should render a ListItem', () => {
    render(
      <List>
        <List.Item index={1} />
      </List>
    );

    expect(screen.getByRole('listitem')).to.have.class('rs-list-item');
  });

  it('Should be disabled', () => {
    render(
      <List>
        <List.Item index={1} disabled>
          Disabled
        </List.Item>
      </List>
    );
    expect(screen.getByRole('listitem')).to.have.attr('data-disabled', 'true');
  });

  it('Should be bordered', () => {
    render(
      <List bordered>
        <List.Item index={1}>Bordered</List.Item>
      </List>
    );
    expect(screen.getByRole('listitem')).to.have.attr('data-bordered', 'true');
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
    expect(items[0]).to.have.attr('data-size', 'sm');
    expect(items[1]).to.have.attr('data-size', 'lg');
  });
});
