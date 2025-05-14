import React from 'react';
import FormErrorMessage from '../FormErrorMessage';
import { describe, expect, it } from 'vitest';
import { kebabPlace } from '@/internals/utils';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('FormErrorMessage', () => {
  testStandardProps(<FormErrorMessage show />);

  it('Should not render when show is false', () => {
    const { container } = render(<FormErrorMessage />);
    expect(container.firstChild).to.not.exist;
  });

  it('Should render the error message when show is true', () => {
    render(<FormErrorMessage show data-testid="error" />);

    expect(screen.getByTestId('error')).to.have.class('rs-form-error-message-wrapper');
    expect(screen.getByTestId('error')).to.contain('.rs-form-error-message');
  });

  it('Should be visible when show prop is true', () => {
    render(<FormErrorMessage show data-testid="error" />);
    expect(screen.getByTestId('error')).to.contain('.rs-form-error-message-show');
  });

  describe('Placement', () => {
    const placements = [
      'static',
      'bottomStart',
      'bottomEnd',
      'topStart',
      'topEnd',
      'leftStart',
      'leftEnd',
      'rightStart',
      'rightEnd'
    ];

    placements.forEach(placement => {
      it(`Should render with ${placement} placement`, () => {
        render(<FormErrorMessage show placement={placement as any} data-testid="error" />);
        expect(screen.getByTestId('error')).to.have.attr('data-placement', kebabPlace(placement));
      });
    });
  });
});
