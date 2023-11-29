import React from 'react';
import CheckButton from '../CheckButton';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/commonCases';

describe('CheckButton', () => {
  testStandardProps(<CheckButton />);

  it('Should render a button', () => {
    const title = 'Test';
    const { container } = render(<CheckButton>{title}</CheckButton>);

    expect(container.firstChild).to.have.class('rs-btn-close');
    expect(screen.getByRole('button', { name: 'Check' })).to.have.attr('title', 'Check');
  });
});
