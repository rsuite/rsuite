import React from 'react';
import { testStandardProps } from '@test/utils';
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import IconButton from '../IconButton';
import { render, screen } from '@testing-library/react';

describe('IconButton', () => {
  testStandardProps(<IconButton />);

  it('Should output a button', () => {
    render(<IconButton />);
    const iconButton = screen.getByRole('button');

    expect(iconButton).to.have.class('rs-btn-icon');
    expect(iconButton.tagName).to.be.equal('BUTTON');
  });

  it('Should output an icon', async () => {
    render(<IconButton icon={<AddOutlineIcon />} />);
    const icon = await screen.findByRole('button');

    expect(icon).to.exist;
  });
});
