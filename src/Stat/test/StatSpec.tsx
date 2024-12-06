import React from 'react';
import { testStandardProps } from '@test/utils';
import { render, screen } from '@testing-library/react';
import Stat from '../Stat';

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
