import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Row from '../Row';

describe('Row', () => {
  testStandardProps(<Row />);

  it('Should render a row', () => {
    render(<Row>Row</Row>);

    expect(screen.getByText('Row')).to.have.class('rs-row');
  });

  it('Should render a row with gutter', () => {
    const { rerender } = render(<Row gutter={10}>Row</Row>);

    expect(screen.getByText('Row')).to.have.style('--rs-grid-gutter', '10px');

    rerender(<Row gutter={'2rem'}>Row</Row>);

    expect(screen.getByText('Row')).to.have.style('--rs-grid-gutter', '2rem');
  });
});
