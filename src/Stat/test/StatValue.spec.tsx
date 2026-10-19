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

  const zeroFormats: { formatOptions?: Intl.NumberFormatOptions; expected: string }[] = [
    { expected: '0' },
    { formatOptions: { minimumFractionDigits: 2 }, expected: '0.00' },
    { formatOptions: { style: 'currency', currency: 'USD' }, expected: 'US$0.00' },
    { formatOptions: { style: 'percent' }, expected: '0%' }
  ];

  it.each(zeroFormats)('Should render a zero value as $expected', ({ formatOptions, expected }) => {
    render(<StatValue value={0} formatOptions={formatOptions} />);

    expect(screen.getByText(expected)).to.exist;
  });

  it.each([undefined, null])('Should preserve children when value is %j', value => {
    const { container } = render(
      <StatValue value={value as any} formatOptions={{ style: 'currency', currency: 'USD' }}>
        No data
      </StatValue>
    );

    expect(container.firstChild).to.have.text('No data');
  });
});
