import React from 'react';
import Row from '../Row';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

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

  it('Should apply vertical alignment classes', () => {
    const { rerender } = render(<Row>Row</Row>);
    const rowElement = screen.getByText('Row');

    // Default - no alignment class
    expect(rowElement).to.not.have.class('rs-row-top');
    expect(rowElement).to.not.have.class('rs-row-middle');
    expect(rowElement).to.not.have.class('rs-row-bottom');

    // Top alignment
    rerender(<Row align="top">Row</Row>);
    expect(rowElement).to.have.class('rs-row-top');

    // Middle alignment
    rerender(<Row align="middle">Row</Row>);
    expect(rowElement).to.have.class('rs-row-middle');

    // Bottom alignment
    rerender(<Row align="bottom">Row</Row>);
    expect(rowElement).to.have.class('rs-row-bottom');
  });

  it('Should apply horizontal alignment classes', () => {
    const { rerender } = render(<Row>Row</Row>);
    const rowElement = screen.getByText('Row');

    // Default - no alignment class
    expect(rowElement).to.not.have.class('rs-row-start');
    expect(rowElement).to.not.have.class('rs-row-end');
    expect(rowElement).to.not.have.class('rs-row-center');
    expect(rowElement).to.not.have.class('rs-row-space-between');
    expect(rowElement).to.not.have.class('rs-row-space-around');

    // Start alignment
    rerender(<Row justify="start">Row</Row>);
    expect(rowElement).to.have.class('rs-row-start');

    // End alignment
    rerender(<Row justify="end">Row</Row>);
    expect(rowElement).to.have.class('rs-row-end');

    // Center alignment
    rerender(<Row justify="center">Row</Row>);
    expect(rowElement).to.have.class('rs-row-center');

    // Space between alignment
    rerender(<Row justify="space-between">Row</Row>);
    expect(rowElement).to.have.class('rs-row-space-between');

    // Space around alignment
    rerender(<Row justify="space-around">Row</Row>);
    expect(rowElement).to.have.class('rs-row-space-around');
  });

  it('Should combine multiple alignments', () => {
    render(
      <Row align="middle" justify="center">
        Row
      </Row>
    );
    const rowElement = screen.getByText('Row');

    expect(rowElement).to.have.class('rs-row-middle');
    expect(rowElement).to.have.class('rs-row-center');
  });
});
