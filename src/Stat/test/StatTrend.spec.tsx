import React from 'react';
import StatTrend from '../StatTrend';
import { describe, expect, it } from 'vitest';
import { testStandardProps } from '@test/utils';
import { render, screen } from '@testing-library/react';

describe('StatTrend', () => {
  testStandardProps(<StatTrend />);

  it('Should render a trend indicator', () => {
    render(<StatTrend indicator="up">100</StatTrend>);

    expect(screen.getByText('100')).to.have.class('rs-stat-trend-up');
  });

  it('Should render as subtle appearance', () => {
    render(<StatTrend appearance="subtle">100</StatTrend>);

    expect(screen.getByText('100')).to.have.class('rs-stat-trend-subtle');
  });
});
