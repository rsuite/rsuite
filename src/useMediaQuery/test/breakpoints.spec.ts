import { describe, expect, it } from 'vitest';
import { createBreakpoints } from '../breakpoints';
import { BreakpointMap } from '../types';

describe('createBreakpoints', () => {
  const testBreakpoints: BreakpointMap = {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px'
  };

  const breakpointSystem = createBreakpoints(testBreakpoints);

  it('Should create a breakpoint system with correct values', () => {
    expect(breakpointSystem.values).to.have.length(6);
    expect(breakpointSystem.values[0].name).to.equal('xs');
    expect(breakpointSystem.values[0].min).to.equal('0px');
    expect(breakpointSystem.values[5].name).to.equal('xxl');
    expect(breakpointSystem.values[5].min).to.equal('1400px');
  });

  it('Should generate correct up media queries', () => {
    expect(breakpointSystem.up('xs')).to.equal('(min-width: 0px)');
    expect(breakpointSystem.up('sm')).to.equal('(min-width: 576px)');
    expect(breakpointSystem.up('md')).to.equal('(min-width: 768px)');
    expect(breakpointSystem.up('lg')).to.equal('(min-width: 992px)');
    expect(breakpointSystem.up('xl')).to.equal('(min-width: 1200px)');
    expect(breakpointSystem.up('xxl')).to.equal('(min-width: 1400px)');
  });

  it('Should generate correct down media queries', () => {
    expect(breakpointSystem.down('sm')).to.equal('(max-width: 575.99px)');
    expect(breakpointSystem.down('md')).to.equal('(max-width: 767.99px)');
    expect(breakpointSystem.down('lg')).to.equal('(max-width: 991.99px)');
    expect(breakpointSystem.down('xl')).to.equal('(max-width: 1199.99px)');
    expect(breakpointSystem.down('xxl')).to.equal('(max-width: 1399.99px)');
  });

  it('Should generate correct only media queries', () => {
    expect(breakpointSystem.only('xs')).to.equal('(min-width: 0px) and (max-width: 575.99px)');
    expect(breakpointSystem.only('sm')).to.equal('(min-width: 576px) and (max-width: 767.99px)');
    expect(breakpointSystem.only('md')).to.equal('(min-width: 768px) and (max-width: 991.99px)');
    expect(breakpointSystem.only('lg')).to.equal('(min-width: 992px) and (max-width: 1199.99px)');
    expect(breakpointSystem.only('xl')).to.equal('(min-width: 1200px) and (max-width: 1399.99px)');
    expect(breakpointSystem.only('xxl')).to.equal('(min-width: 1400px)');
  });

  it('Should generate correct between media queries', () => {
    expect(breakpointSystem.between('xs', 'sm')).to.equal(
      '(min-width: 0px) and (max-width: 575.99px)'
    );
    expect(breakpointSystem.between('sm', 'lg')).to.equal(
      '(min-width: 576px) and (max-width: 991.99px)'
    );
    expect(breakpointSystem.between('md', 'xl')).to.equal(
      '(min-width: 768px) and (max-width: 1199.99px)'
    );
    expect(breakpointSystem.between('lg', 'xxl')).to.equal(
      '(min-width: 992px) and (max-width: 1399.99px)'
    );
  });

  it('Should generate all conditions correctly', () => {
    const { conditions } = breakpointSystem;

    // Basic conditions
    expect(conditions.xs).to.equal('(min-width: 0px)');
    expect(conditions.sm).to.equal('(min-width: 576px)');

    // Down conditions
    expect(conditions.xsDown).to.equal('(max-width: 0px)');
    expect(conditions.smDown).to.equal('(max-width: 575.99px)');

    // Only conditions
    expect(conditions.xsOnly).to.equal('(min-width: 0px) and (max-width: 575.99px)');
    expect(conditions.smOnly).to.equal('(min-width: 576px) and (max-width: 767.99px)');

    // Range conditions
    expect(conditions.xsToSm).to.equal('(min-width: 0px) and (max-width: 575.99px)');
    expect(conditions.smToMd).to.equal('(min-width: 576px) and (max-width: 767.99px)');
    expect(conditions.mdToLg).to.equal('(min-width: 768px) and (max-width: 991.99px)');
  });

  it('Should return correct keys', () => {
    const keys = breakpointSystem.keys();
    expect(keys).to.deep.equal(['base', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']);
  });

  it('Should get condition by key', () => {
    expect(breakpointSystem.getCondition('md')).to.equal('(min-width: 768px)');
    expect(breakpointSystem.getCondition('lgOnly')).to.equal(
      '(min-width: 992px) and (max-width: 1199.99px)'
    );
    expect(breakpointSystem.getCondition('smToLg')).to.equal(
      '(min-width: 576px) and (max-width: 991.99px)'
    );
    expect(breakpointSystem.getCondition('nonExistent')).to.equal('');
  });

  it('Should handle non-standard breakpoint names and generate correct media query map', () => {
    const breakpointValues: BreakpointMap = {
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
      '2xl': '1400px'
    };

    const breakpointSystem = createBreakpoints(breakpointValues);

    const mediaQuerySizeMap = breakpointSystem.createMediaQueryMap();

    expect(mediaQuerySizeMap).to.deep.equal({
      xs: '(max-width: 575.99px)',
      sm: '(min-width: 576px)',
      md: '(min-width: 768px)',
      lg: '(min-width: 992px)',
      xl: '(min-width: 1200px)',
      xxl: '(min-width: 1400px)',
      '2xl': '(min-width: 1400px)',
      xsDown: '(max-width: 0px)',
      xsOnly: '(min-width: 0px) and (max-width: 575.99px)',
      smDown: '(max-width: 575.99px)',
      smOnly: '(min-width: 576px) and (max-width: 767.99px)',
      mdDown: '(max-width: 767.99px)',
      mdOnly: '(min-width: 768px) and (max-width: 991.99px)',
      lgDown: '(max-width: 991.99px)',
      lgOnly: '(min-width: 992px) and (max-width: 1199.99px)',
      xlDown: '(max-width: 1199.99px)',
      xlOnly: '(min-width: 1200px) and (max-width: 1399.99px)',
      xxlDown: '(max-width: 1399.99px)',
      xxlOnly: '(min-width: 1400px) and (max-width: 1399.99px)',
      '2xlDown': '(max-width: 1399.99px)',
      '2xlOnly': '(min-width: 1400px)',
      xsToSm: '(min-width: 0px) and (max-width: 575.99px)',
      xsToMd: '(min-width: 0px) and (max-width: 767.99px)',
      xsToLg: '(min-width: 0px) and (max-width: 991.99px)',
      xsToXl: '(min-width: 0px) and (max-width: 1199.99px)',
      xsToXxl: '(min-width: 0px) and (max-width: 1399.99px)',
      xsTo2xl: '(min-width: 0px) and (max-width: 1399.99px)',
      smToMd: '(min-width: 576px) and (max-width: 767.99px)',
      smToLg: '(min-width: 576px) and (max-width: 991.99px)',
      smToXl: '(min-width: 576px) and (max-width: 1199.99px)',
      smToXxl: '(min-width: 576px) and (max-width: 1399.99px)',
      smTo2xl: '(min-width: 576px) and (max-width: 1399.99px)',
      mdToLg: '(min-width: 768px) and (max-width: 991.99px)',
      mdToXl: '(min-width: 768px) and (max-width: 1199.99px)',
      mdToXxl: '(min-width: 768px) and (max-width: 1399.99px)',
      mdTo2xl: '(min-width: 768px) and (max-width: 1399.99px)',
      lgToXl: '(min-width: 992px) and (max-width: 1199.99px)',
      lgToXxl: '(min-width: 992px) and (max-width: 1399.99px)',
      lgTo2xl: '(min-width: 992px) and (max-width: 1399.99px)',
      xlToXxl: '(min-width: 1200px) and (max-width: 1399.99px)',
      xlTo2xl: '(min-width: 1200px) and (max-width: 1399.99px)',
      xxlTo2xl: '(min-width: 1400px) and (max-width: 1399.99px)'
    });
  });

  it('Should generate correct legacy media query map', () => {
    expect(breakpointSystem.legacyMap).to.deep.equal({
      xs: '(max-width: 575.99px)',
      sm: '(min-width: 576px)',
      md: '(min-width: 768px)',
      lg: '(min-width: 992px)',
      xl: '(min-width: 1200px)',
      xxl: '(min-width: 1400px)'
    });
  });

  it('Should handle empty breakpoints object', () => {
    const emptyBreakpoints = createBreakpoints({});
    expect(emptyBreakpoints.values).to.have.length(0);
    expect(emptyBreakpoints.keys()).to.deep.equal(['base']);
  });

  it('Should handle single breakpoint', () => {
    const singleBreakpoint = createBreakpoints({ sm: '576px' });
    expect(singleBreakpoint.values).to.have.length(1);
    expect(singleBreakpoint.up('sm')).to.equal('(min-width: 576px)');
    expect(singleBreakpoint.only('sm')).to.equal('(min-width: 576px)');
  });

  it('Should handle non-pixel units', () => {
    const emBreakpoints = createBreakpoints({
      sm: '30em',
      md: '48em'
    });
    expect(emBreakpoints.up('sm')).to.equal('(min-width: 30em)');
    expect(emBreakpoints.between('sm', 'md')).to.equal(
      '(min-width: 30em) and (max-width: 47.99em)'
    );
  });

  it('Should correctly sort breakpoints regardless of input order', () => {
    const unsortedBreakpoints = createBreakpoints({
      lg: '992px',
      sm: '576px',
      md: '768px'
    });
    expect(unsortedBreakpoints.values[0].name).to.equal('sm');
    expect(unsortedBreakpoints.values[1].name).to.equal('md');
    expect(unsortedBreakpoints.values[2].name).to.equal('lg');
  });

  it('Should handle invalid breakpoint names gracefully', () => {
    expect(() => breakpointSystem.up('nonExistent')).to.throw();
    expect(breakpointSystem.getCondition('nonExistent')).to.equal('');
  });
});
