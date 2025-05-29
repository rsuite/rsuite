import React from 'react';
import Row from '../Row';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('Row', () => {
  testStandardProps(<Row />);

  it('Should render a row', () => {
    render(<Row>Row</Row>);

    expect(screen.getByText('Row')).to.have.class('rs-row');
  });

  describe('gutter', () => {
    it('Should render a row with fixed gutter', () => {
      const { rerender } = render(<Row gutter={10}>Row</Row>);

      expect(screen.getByText('Row')).to.have.style('--rs-grid-gutter', '10px');
      expect(screen.getByText('Row')).to.have.style('--rs-grid-row-gutter', '10px');

      rerender(<Row gutter={'2rem'}>Row</Row>);

      expect(screen.getByText('Row')).to.have.style('--rs-grid-gutter', '2rem');
      expect(screen.getByText('Row')).to.have.style('--rs-grid-row-gutter', '2rem');
    });

    it('Should render a row with array gutter', () => {
      const { rerender } = render(<Row gutter={[10, 20]}>Row</Row>);
      const rowElement = screen.getByText('Row');

      // Check horizontal and vertical gutters
      expect(rowElement).to.have.style('--rs-grid-gutter', '10px');
      expect(rowElement).to.have.style('--rs-grid-row-gutter', '20px');

      // Test with string values
      rerender(<Row gutter={['1rem', '2rem']}>Row</Row>);

      expect(rowElement).to.have.style('--rs-grid-gutter', '1rem');
      expect(rowElement).to.have.style('--rs-grid-row-gutter', '2rem');

      // Test with mixed values
      rerender(<Row gutter={[10, '2rem']}>Row</Row>);

      expect(rowElement).to.have.style('--rs-grid-gutter', '10px');
      expect(rowElement).to.have.style('--rs-grid-row-gutter', '2rem');
    });

    it('Should render a row with responsive gutter', () => {
      const { rerender } = render(
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
            xl: 40,
            xxl: 48
          }}
        >
          Row
        </Row>
      );

      const rowElement = screen.getByText('Row');

      // Check base gutter (xs)
      expect(rowElement).to.have.style('--rs-grid-gutter', '8px');

      // Check responsive gutters
      expect(rowElement).to.have.style('--rs-grid-gutter-sm', '16px');
      expect(rowElement).to.have.style('--rs-grid-gutter-md', '24px');
      expect(rowElement).to.have.style('--rs-grid-gutter-lg', '32px');
      expect(rowElement).to.have.style('--rs-grid-gutter-xl', '40px');
      expect(rowElement).to.have.style('--rs-grid-gutter-xxl', '48px');

      // Test with partial breakpoints
      rerender(
        <Row
          gutter={{
            xs: 8,
            md: 24
          }}
        >
          Row
        </Row>
      );

      expect(rowElement).to.have.style('--rs-grid-gutter', '8px');
      expect(rowElement).to.have.style('--rs-grid-gutter-md', '24px');

      // Check that other breakpoints are not set
      expect(rowElement.style.getPropertyValue('--rs-grid-gutter-sm')).to.equal('');
      expect(rowElement.style.getPropertyValue('--rs-grid-gutter-lg')).to.equal('');
      expect(rowElement.style.getPropertyValue('--rs-grid-gutter-xl')).to.equal('');
      expect(rowElement.style.getPropertyValue('--rs-grid-gutter-xxl')).to.equal('');

      // Test with string values
      rerender(
        <Row
          gutter={{
            xs: '1rem',
            md: '2rem'
          }}
        >
          Row
        </Row>
      );

      expect(rowElement).to.have.style('--rs-grid-gutter', '1rem');
      expect(rowElement).to.have.style('--rs-grid-gutter-md', '2rem');
    });

    it('Should render a row with responsive array gutter', () => {
      const { rerender } = render(
        <Row
          gutter={{
            xs: [8, 16],
            sm: [16, 24],
            md: [24, 32],
            lg: [32, 40],
            xl: [40, 48],
            xxl: [48, 56]
          }}
        >
          Row
        </Row>
      );

      const rowElement = screen.getByText('Row');

      // Check base gutter (xs)
      expect(rowElement).to.have.style('--rs-grid-gutter', '8px');
      expect(rowElement).to.have.style('--rs-grid-row-gutter', '16px');

      // Check responsive gutters
      expect(rowElement).to.have.style('--rs-grid-gutter-sm', '16px');
      expect(rowElement).to.have.style('--rs-grid-row-gutter-sm', '24px');

      expect(rowElement).to.have.style('--rs-grid-gutter-md', '24px');
      expect(rowElement).to.have.style('--rs-grid-row-gutter-md', '32px');

      expect(rowElement).to.have.style('--rs-grid-gutter-lg', '32px');
      expect(rowElement).to.have.style('--rs-grid-row-gutter-lg', '40px');

      expect(rowElement).to.have.style('--rs-grid-gutter-xl', '40px');
      expect(rowElement).to.have.style('--rs-grid-row-gutter-xl', '48px');

      expect(rowElement).to.have.style('--rs-grid-gutter-xxl', '48px');
      expect(rowElement).to.have.style('--rs-grid-row-gutter-xxl', '56px');

      // Test with partial breakpoints and mixed value types
      rerender(
        <Row
          gutter={{
            xs: [8, '1rem'],
            md: ['2rem', 32]
          }}
        >
          Row
        </Row>
      );

      expect(rowElement).to.have.style('--rs-grid-gutter', '8px');
      expect(rowElement).to.have.style('--rs-grid-row-gutter', '1rem');

      expect(rowElement).to.have.style('--rs-grid-gutter-md', '2rem');
      expect(rowElement).to.have.style('--rs-grid-row-gutter-md', '32px');

      // Check that other breakpoints are not set
      expect(rowElement.style.getPropertyValue('--rs-grid-gutter-sm')).to.equal('');
      expect(rowElement.style.getPropertyValue('--rs-grid-row-gutter-sm')).to.equal('');
      expect(rowElement.style.getPropertyValue('--rs-grid-gutter-lg')).to.equal('');
      expect(rowElement.style.getPropertyValue('--rs-grid-row-gutter-lg')).to.equal('');
    });

    it('Should handle undefined gutter', () => {
      const { rerender } = render(<Row>Row</Row>);
      const rowElement = screen.getByText('Row');

      expect(rowElement.style.getPropertyValue('--rs-grid-gutter')).to.equal('');

      rerender(<Row gutter={undefined}>Row</Row>);
      expect(rowElement.style.getPropertyValue('--rs-grid-gutter')).to.equal('');
    });
  });

  describe('align', () => {
    it('Should apply fixed alignment', () => {
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

    it('Should apply responsive alignment', () => {
      const { rerender } = render(
        <Row
          align={{
            xs: 'top',
            sm: 'middle',
            md: 'bottom',
            lg: 'top',
            xl: 'middle',
            xxl: 'bottom'
          }}
        >
          Row
        </Row>
      );

      const rowElement = screen.getByText('Row');

      // Check all breakpoint classes
      expect(rowElement).to.have.class('rs-row-xs-top');
      expect(rowElement).to.have.class('rs-row-sm-middle');
      expect(rowElement).to.have.class('rs-row-md-bottom');
      expect(rowElement).to.have.class('rs-row-lg-top');
      expect(rowElement).to.have.class('rs-row-xl-middle');
      expect(rowElement).to.have.class('rs-row-xxl-bottom');

      // Test with partial breakpoints
      rerender(
        <Row
          align={{
            xs: 'top',
            md: 'bottom'
          }}
        >
          Row
        </Row>
      );

      expect(rowElement).to.have.class('rs-row-xs-top');
      expect(rowElement).to.have.class('rs-row-md-bottom');
      expect(rowElement).to.not.have.class('rs-row-sm-middle');
      expect(rowElement).to.not.have.class('rs-row-lg-top');
      expect(rowElement).to.not.have.class('rs-row-xl-middle');
      expect(rowElement).to.not.have.class('rs-row-xxl-bottom');
    });

    it('Should handle undefined align', () => {
      const { rerender } = render(<Row>Row</Row>);
      const rowElement = screen.getByText('Row');

      expect(rowElement).to.not.have.class('rs-row-top');
      expect(rowElement).to.not.have.class('rs-row-middle');
      expect(rowElement).to.not.have.class('rs-row-bottom');

      rerender(<Row align={undefined}>Row</Row>);
      expect(rowElement).to.not.have.class('rs-row-top');
      expect(rowElement).to.not.have.class('rs-row-middle');
      expect(rowElement).to.not.have.class('rs-row-bottom');
    });
  });

  describe('justify', () => {
    it('Should apply fixed justify', () => {
      const { rerender } = render(<Row>Row</Row>);
      const rowElement = screen.getByText('Row');

      // Default - no justify class
      expect(rowElement).to.not.have.class('rs-row-start');
      expect(rowElement).to.not.have.class('rs-row-end');
      expect(rowElement).to.not.have.class('rs-row-center');
      expect(rowElement).to.not.have.class('rs-row-space-between');
      expect(rowElement).to.not.have.class('rs-row-space-around');

      // Start justify
      rerender(<Row justify="start">Row</Row>);
      expect(rowElement).to.have.class('rs-row-start');

      // End justify
      rerender(<Row justify="end">Row</Row>);
      expect(rowElement).to.have.class('rs-row-end');

      // Center justify
      rerender(<Row justify="center">Row</Row>);
      expect(rowElement).to.have.class('rs-row-center');

      // Space between justify
      rerender(<Row justify="space-between">Row</Row>);
      expect(rowElement).to.have.class('rs-row-space-between');

      // Space around justify
      rerender(<Row justify="space-around">Row</Row>);
      expect(rowElement).to.have.class('rs-row-space-around');
    });

    it('Should apply responsive justify', () => {
      const { rerender } = render(
        <Row
          justify={{
            xs: 'start',
            sm: 'end',
            md: 'center',
            lg: 'space-between',
            xl: 'space-around',
            xxl: 'start'
          }}
        >
          Row
        </Row>
      );

      const rowElement = screen.getByText('Row');

      // Check all breakpoint classes
      expect(rowElement).to.have.class('rs-row-xs-start');
      expect(rowElement).to.have.class('rs-row-sm-end');
      expect(rowElement).to.have.class('rs-row-md-center');
      expect(rowElement).to.have.class('rs-row-lg-space-between');
      expect(rowElement).to.have.class('rs-row-xl-space-around');
      expect(rowElement).to.have.class('rs-row-xxl-start');

      // Test with partial breakpoints
      rerender(
        <Row
          justify={{
            xs: 'start',
            md: 'center'
          }}
        >
          Row
        </Row>
      );

      expect(rowElement).to.have.class('rs-row-xs-start');
      expect(rowElement).to.have.class('rs-row-md-center');
      expect(rowElement).to.not.have.class('rs-row-sm-end');
      expect(rowElement).to.not.have.class('rs-row-lg-space-between');
      expect(rowElement).to.not.have.class('rs-row-xl-space-around');
      expect(rowElement).to.not.have.class('rs-row-xxl-start');
    });

    it('Should handle undefined justify', () => {
      const { rerender } = render(<Row>Row</Row>);
      const rowElement = screen.getByText('Row');

      expect(rowElement).to.not.have.class('rs-row-start');
      expect(rowElement).to.not.have.class('rs-row-end');
      expect(rowElement).to.not.have.class('rs-row-center');
      expect(rowElement).to.not.have.class('rs-row-space-between');
      expect(rowElement).to.not.have.class('rs-row-space-around');

      rerender(<Row justify={undefined}>Row</Row>);
      expect(rowElement).to.not.have.class('rs-row-start');
      expect(rowElement).to.not.have.class('rs-row-end');
      expect(rowElement).to.not.have.class('rs-row-center');
      expect(rowElement).to.not.have.class('rs-row-space-between');
      expect(rowElement).to.not.have.class('rs-row-space-around');
    });
  });

  it('Should combine multiple alignments', () => {
    render(
      <Row
        align={{
          xs: 'top',
          md: 'bottom'
        }}
        justify={{
          xs: 'start',
          md: 'center'
        }}
      >
        Row
      </Row>
    );
    const rowElement = screen.getByText('Row');

    expect(rowElement).to.have.class('rs-row-xs-top');
    expect(rowElement).to.have.class('rs-row-md-bottom');
    expect(rowElement).to.have.class('rs-row-xs-start');
    expect(rowElement).to.have.class('rs-row-md-center');
  });
});
