import React from 'react';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';
import Row from '../Row';

describe('Row', () => {
  testStandardProps(<Row />);

  it('Should render a row', () => {
    render(
      <Row>
        <div />
      </Row>
    );

    expect(screen.getByRole('row')).to.have.class('rs-row');
  });

  it('Should render a row with gutter', () => {
    const { rerender } = render(<Row gutter={10}></Row>);

    expect(screen.getByRole('row')).to.have.style('--rs-grid-gutter', '10px');

    rerender(<Row gutter={'2rem'}></Row>);

    expect(screen.getByRole('row')).to.have.style('--rs-grid-gutter', '2rem');
  });
});
