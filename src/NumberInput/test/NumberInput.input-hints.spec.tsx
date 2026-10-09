import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NumberInput from '..';
import CustomProvider from '../../CustomProvider';

describe('NumberInput enterKeyHint', () => {
  it('forwards the hint to the input and keeps it off the wrapper', () => {
    const { container } = render(<NumberInput enterKeyHint="done" />);
    expect(screen.getByRole('textbox')).to.have.attribute('enterkeyhint', 'done');
    expect(container.firstElementChild).not.to.have.attribute('enterkeyhint');
  });

  it('updates and removes the hint', () => {
    const { rerender } = render(<NumberInput enterKeyHint="done" />);
    const input = screen.getByRole('textbox');
    expect(input).to.have.attribute('enterkeyhint', 'done');
    rerender(<NumberInput enterKeyHint="next" />);
    expect(input).to.have.attribute('enterkeyhint', 'next');
    rerender(<NumberInput />);
    expect(input).not.to.have.attribute('enterkeyhint');
    expect(input).to.have.attribute('inputmode', 'numeric');
  });

  it('uses provider defaults for the input', () => {
    render(
      <CustomProvider components={{ NumberInput: { defaultProps: { enterKeyHint: 'done' } } }}>
        <NumberInput />
      </CustomProvider>
    );
    expect(screen.getByRole('textbox')).to.have.attribute('enterkeyhint', 'done');
  });
});
