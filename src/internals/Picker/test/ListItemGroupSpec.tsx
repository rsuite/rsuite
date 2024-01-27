import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import ListItemGroup from '../ListItemGroup';

describe('picker - ListItemGroup', () => {
  testStandardProps(<ListItemGroup />);

  it('Should output a `menu-item-group`', () => {
    render(<ListItemGroup>title</ListItemGroup>);

    expect(screen.getByRole('group')).to.have.class('rs-dropdown-menu-group');
  });

  it('Should have a title', () => {
    render(
      <ListItemGroup>
        <div>title</div>
      </ListItemGroup>
    );

    expect(screen.getByText('title')).to.exist;
  });
});
