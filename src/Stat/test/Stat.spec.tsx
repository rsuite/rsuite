import React from 'react';
import Stat from '../Stat';
import { describe, expect, it } from 'vitest';
import { testStandardProps } from '@test/cases';
import { render, screen } from '@testing-library/react';

describe('Stat', () => {
  testStandardProps(<Stat />);

  it('Should hava a border', () => {
    const { container } = render(<Stat bordered />);
    expect(container.firstChild).to.have.class('rs-stat-bordered');
  });

  it('Should render a icon', () => {
    render(<Stat icon={<i>Icon</i>} />);
    expect(screen.getByText('Icon')).to.exist;
  });
});
