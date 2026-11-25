import React from 'react';
import ListItemGroup from '../ListItemGroup';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

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
