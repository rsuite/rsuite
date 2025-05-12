import React from 'react';
import PlaceholderGraph from '../PlaceholderGraph';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

describe('Placeholder.Graph', () => {
  testStandardProps(<PlaceholderGraph />);

  it('Should render a PlaceholderGraph', () => {
    render(<PlaceholderGraph data-testid="p" />);

    expect(screen.getByTestId('p')).to.have.class('rs-placeholder');
    expect(screen.getByTestId('p')).to.have.class('rs-placeholder-graph');
  });

  it('Should hava a custom height', () => {
    render(<PlaceholderGraph height={100} data-testid="p" />);

    expect(screen.getByTestId('p')).to.have.style('height', '100px');
  });

  it('Should hava a custom width', () => {
    render(<PlaceholderGraph width={100} data-testid="p" />);

    expect(screen.getByTestId('p')).to.have.style('width', '100px');
  });

  it('Should be active', () => {
    render(<PlaceholderGraph active data-testid="p" />);

    expect(screen.getByTestId('p')).to.have.class('rs-placeholder-active');
  });
});
