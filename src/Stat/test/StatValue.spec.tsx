import React from 'react';
import StatValue from '../StatValue';
import { describe, expect, it } from 'vitest';
import { testStandardProps } from '@test/cases';
import { render, screen } from '@testing-library/react';

describe('StatValue', () => {
  testStandardProps(<StatValue />);

  it('Should render a value with text', () => {
    render(<StatValue>100</StatValue>);

    expect(screen.getByText('100')).to.exist;
  });

  it('Should render a value with number', () => {
    render(<StatValue value={100} />);

    expect(screen.getByText('100')).to.exist;
  });

  it('Should render a value with prefix', () => {
    render(<StatValue value={1000} formatOptions={{ style: 'currency', currency: 'USD' }} />);

    expect(screen.getByText('US$1,000.00')).to.exist;
  });
});
