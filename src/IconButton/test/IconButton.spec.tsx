import React from 'react';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import IconButton from '../IconButton';
import { describe, expect, it } from 'vitest';
import { testStandardProps } from '@test/cases';
import { render, screen } from '@testing-library/react';

describe('IconButton', () => {
  testStandardProps(<IconButton />, {
    sizes: ['lg', 'md', 'sm', 'xs']
  });

  it('Should output a button', () => {
    render(<IconButton />);
    const iconButton = screen.getByRole('button');

    expect(iconButton).to.have.class('rs-btn-icon');
    expect(iconButton).to.have.tagName('button');
  });

  it('Should output an icon', async () => {
    render(<IconButton icon={<AddOutlineIcon data-testid="icon" />} />);
    const icon = await screen.findByTestId('icon');

    expect(icon).to.exist;
  });
});
