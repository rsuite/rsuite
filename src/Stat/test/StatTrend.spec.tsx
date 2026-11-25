import React from 'react';
import StatTrend from '../StatTrend';
import { describe, expect, it } from 'vitest';
import { testStandardProps } from '@test/cases';
import { render, screen } from '@testing-library/react';

describe('StatTrend', () => {
  testStandardProps(<StatTrend />);

  it('Should render a up trend indicator', () => {
    render(<StatTrend indicator="up">100</StatTrend>);

    expect(screen.getByText('100')).to.have.class('rs-stat-trend-up');
  });

  it('Should render a equal trend indicator', () => {
    render(<StatTrend indicator="equal">100</StatTrend>);

    expect(screen.getByText('100')).to.have.class('rs-stat-trend-equal');
  });

  it.each([
    { value: 1.5, direction: 'up' },
    { value: -2.5, direction: 'down' },
    { value: 0, direction: 'equal' },
    { value: -0, direction: 'equal' },
    { value: Number.NaN, direction: 'equal' },
    { value: Infinity, direction: 'up' },
    { value: -Infinity, direction: 'down' }
  ] as const)(
    'matches the $direction indicator for a numeric value of $value',
    ({ value, direction }) => {
      const { rerender } = render(<StatTrend indicator={direction}>Revenue</StatTrend>);
      const expectedIcon = screen.getByText('Revenue').querySelector('svg')?.innerHTML;
      expect(expectedIcon).toBeTruthy();

      rerender(<StatTrend indicator={value}>Revenue</StatTrend>);
      const trend = screen.getByText('Revenue');
      expect(trend).toHaveClass(`rs-stat-trend-${direction}`);
      expect(trend.querySelector('svg')?.innerHTML).toBe(expectedIcon);
    }
  );

  it('Should render as subtle appearance', () => {
    render(<StatTrend appearance="subtle">100</StatTrend>);

    expect(screen.getByText('100')).to.have.class('rs-stat-trend-subtle');
  });
});
