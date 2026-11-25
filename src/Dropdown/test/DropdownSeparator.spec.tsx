import React from 'react';
import Dropdown from '../Dropdown';
import DropdownSeparator from '../DropdownSeparator';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('<Dropdown.Separator>', () => {
  it('[Deprecated] Should render a divider', () => {
    render(
      <Dropdown>
        <DropdownSeparator data-testid="separator" />
      </Dropdown>
    );

    expect(screen.getByTestId('separator')).to.have.class('rs-dropdown-item-divider');
    expect(screen.getByTestId('separator')).to.have.attribute('role', 'separator');
  });
});
