import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Tooltip from '../Tooltip';

describe('Tooltip', () => {
  testStandardProps(<Tooltip />);

  it('Should render a Tooltip', () => {
    render(<Tooltip>Test</Tooltip>);

    expect(screen.getByRole('tooltip')).to.have.class('rs-tooltip');
    expect(screen.getByRole('tooltip')).to.have.class('rs-tooltip-arrow');
    expect(screen.getByRole('tooltip')).to.have.text('Test');
  });

  it('Should not have a arrow', () => {
    render(<Tooltip arrow={false}>Test</Tooltip>);
    expect(screen.getByRole('tooltip')).to.not.have.class('rs-tooltip-arrow');
  });

  it('Should have a id', () => {
    render(<Tooltip id="tooltip" />);

    expect(screen.getByRole('tooltip')).to.have.id('tooltip');
  });
});
