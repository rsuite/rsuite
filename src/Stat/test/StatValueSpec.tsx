import React from 'react';
import { testStandardProps } from '@test/utils';
import { render, screen } from '@testing-library/react';
import StatValue from '../StatValue';

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
