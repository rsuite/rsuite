import React from 'react';
import SearchBox from '../SearchBox';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('SearchBox', () => {
  testStandardProps(<SearchBox />);

  it('Should output a input', () => {
    render(<SearchBox />);
    expect(screen.getByRole('searchbox')).to.be.exist;
  });

  it('Should call `onChange` callback', () => {
    const onChange = vi.fn();
    render(<SearchBox onChange={onChange} />);
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'a' } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
