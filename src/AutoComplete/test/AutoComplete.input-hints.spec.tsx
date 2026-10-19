import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AutoComplete from '..';
import CustomProvider from '../../CustomProvider';

describe('AutoComplete input hints', () => {
  it('forwards hints to the input and keeps them off the wrapper', () => {
    const { container } = render(
      <AutoComplete data={[]} inputMode="decimal" enterKeyHint="done" />
    );
    const input = screen.getByRole('combobox');
    expect(input).to.have.attribute('inputmode', 'decimal');
    expect(input).to.have.attribute('enterkeyhint', 'done');
    expect(container.firstElementChild).not.to.have.attribute('inputmode');
    expect(container.firstElementChild).not.to.have.attribute('enterkeyhint');
  });

  it('updates and removes the input hints', () => {
    const { rerender } = render(<AutoComplete data={[]} inputMode="decimal" enterKeyHint="done" />);
    const input = screen.getByRole('combobox');
    expect(input).to.have.attribute('inputmode', 'decimal');
    rerender(<AutoComplete data={[]} inputMode="email" enterKeyHint="next" />);
    expect(input).to.have.attribute('inputmode', 'email');
    expect(input).to.have.attribute('enterkeyhint', 'next');
    rerender(<AutoComplete data={[]} />);
    expect(input).not.to.have.attribute('inputmode');
    expect(input).not.to.have.attribute('enterkeyhint');
  });

  it('leaves the browser hints unset by default', () => {
    render(<AutoComplete data={[]} />);
    const input = screen.getByRole('combobox');
    expect(input).not.to.have.attribute('inputmode');
    expect(input).not.to.have.attribute('enterkeyhint');
  });

  it('supports provider defaults and instance overrides', () => {
    const fixture = (override: boolean) => (
      <CustomProvider
        components={{
          AutoComplete: { defaultProps: { inputMode: 'decimal', enterKeyHint: 'done' } }
        }}
      >
        <AutoComplete
          data={[]}
          {...(override ? ({ inputMode: 'none', enterKeyHint: 'enter' } as const) : {})}
        />
      </CustomProvider>
    );
    const { rerender } = render(fixture(false));
    const input = screen.getByRole('combobox');
    expect(input).to.have.attribute('inputmode', 'decimal');
    expect(input).to.have.attribute('enterkeyhint', 'done');
    rerender(fixture(true));
    expect(input).to.have.attribute('inputmode', 'none');
    expect(input).to.have.attribute('enterkeyhint', 'enter');
  });
});
