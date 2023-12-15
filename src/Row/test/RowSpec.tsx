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

  it('Should render a gutter', () => {
    render(
      <Row gutter={10}>
        <div />
      </Row>
    );

    const row = screen.getByRole('row');

    expect(row).to.have.style('margin-left', '-5px');
    expect(row).to.have.style('margin-right', '-5px');
    expect(row.firstChild).to.have.style('padding-left', '5px');
    expect(row.firstChild).to.have.style('padding-right', '5px');
  });
});
