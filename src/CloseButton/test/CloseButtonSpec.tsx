import React from 'react';
import CloseButton from '../CloseButton';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('CloseButton', () => {
  testStandardProps(<CloseButton />);

  it('Should render a button', () => {
    render(<CloseButton />);

    expect(screen.getByRole('button', { name: 'Close' })).to.have.property('tagName', 'BUTTON');
    expect(screen.getByRole('button', { name: 'Close' })).to.have.class('rs-btn-close');
  });

  it('Should customize aria-label', () => {
    render(<CloseButton locale={{ closeLabel: 'Remove Item' }} />);

    expect(screen.getByRole('button', { name: 'Remove Item' })).to.exist;
  });
});
