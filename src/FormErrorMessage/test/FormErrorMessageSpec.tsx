import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import FormErrorMessage from '../FormErrorMessage';

describe('FormErrorMessage', () => {
  testStandardProps(<FormErrorMessage show />);

  it('Should render nothing', () => {
    const { container } = render(<FormErrorMessage />);
    expect(container.firstChild).to.not.exist;
  });

  it('Should render a FormErrorMessage', () => {
    render(<FormErrorMessage show data-testid="error" />);

    expect(screen.getByTestId('error')).to.have.class('rs-form-error-message-wrapper');
    expect(screen.getByTestId('error')).to.contain('.rs-form-error-message');
  });

  it('Should be show', () => {
    render(<FormErrorMessage show data-testid="error" />);
    expect(screen.getByTestId('error')).to.contain('.rs-form-error-message-show');
  });

  it('Should hava a `bottomStart` for placement', () => {
    render(<FormErrorMessage show placement="bottomStart" data-testid="error" />);

    expect(screen.getByTestId('error')).to.have.class(
      'rs-form-error-message-placement-bottom-start'
    );
  });
});
