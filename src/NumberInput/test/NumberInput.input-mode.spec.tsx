import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NumberInput from '..';
import CustomProvider from '../../CustomProvider';

describe('NumberInput inputMode', () => {
  it.each(['none', 'text', 'tel', 'url', 'email', 'numeric', 'decimal', 'search'] as const)(
    'forwards the explicit %s mode to the input',
    inputMode => {
      render(<NumberInput inputMode={inputMode} />);
      expect(screen.getByRole('textbox')).to.have.attribute('inputmode', inputMode);
    }
  );

  it('defaults to numeric mode', () => {
    render(<NumberInput />);
    expect(screen.getByRole('textbox')).to.have.attribute('inputmode', 'numeric');
  });

  it('keeps the editing hint off the non-editable wrapper', () => {
    const { container } = render(<NumberInput inputMode="decimal" />);
    expect(container.firstElementChild).not.to.have.attribute('inputmode');
  });

  it('updates the input mode and restores the default when the prop is removed', () => {
    const { rerender } = render(<NumberInput inputMode="numeric" />);
    const input = screen.getByRole('textbox');
    expect(input).to.have.attribute('inputmode', 'numeric');
    rerender(<NumberInput inputMode="none" />);
    expect(input).to.have.attribute('inputmode', 'none');
    rerender(<NumberInput />);
    expect(input).to.have.attribute('inputmode', 'numeric');
  });

  it('uses the provider default for the input', () => {
    render(
      <CustomProvider components={{ NumberInput: { defaultProps: { inputMode: 'decimal' } } }}>
        <NumberInput />
      </CustomProvider>
    );
    expect(screen.getByRole('textbox')).to.have.attribute('inputmode', 'decimal');
  });

  it('prefers the instance mode to the provider default', () => {
    render(
      <CustomProvider components={{ NumberInput: { defaultProps: { inputMode: 'decimal' } } }}>
        <NumberInput inputMode="numeric" />
      </CustomProvider>
    );
    expect(screen.getByRole('textbox')).to.have.attribute('inputmode', 'numeric');
  });
});
