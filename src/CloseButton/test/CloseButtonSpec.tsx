import React from 'react';
import CloseButton from '../CloseButton';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/commonCases';

describe('CloseButton', () => {
  testStandardProps(<CloseButton />);

  it('Should render a button', () => {
    const title = 'Test';
    const { container } = render(<CloseButton>{title}</CloseButton>);

    expect(container.firstChild).to.have.class('rs-btn-close');
    expect(screen.getByRole('button', { name: 'Close' })).to.have.attr('title', 'Close');
  });
});
