import { describe, expect, it } from 'vitest';
import { createBreakpoints } from '../breakpoints';
import { BreakpointMap } from '../types';

describe('createBreakpoints', () => {
  const testBreakpoints: BreakpointMap = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400
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
    // down(breakpoint) 应该返回 max-width 为下一个断点减 0.01 的媒体查询
    // 例如：down('sm') 应该返回 max-width 为 md 断点值减 0.01，即 767.99px
    expect(breakpointSystem.down('xs')).to.equal('(max-width: 575.99px)');
    expect(breakpointSystem.down('sm')).to.equal('(max-width: 767.99px)');
    expect(breakpointSystem.down('md')).to.equal('(max-width: 991.99px)');
    expect(breakpointSystem.down('lg')).to.equal('(max-width: 1199.99px)');
    expect(breakpointSystem.down('xl')).to.equal('(max-width: 1399.99px)');
    // xxl 是最后一个断点，没有下一个断点，所以 max 为 null，返回空字符串
    expect(breakpointSystem.down('xxl')).to.equal('');
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
    // between(min, max) should return a media query with min-width set to the min breakpoint value
    // and max-width set to the max breakpoint's max value
    // For example: between('xs', 'sm') should return min-width as xs breakpoint value
    // and max-width as sm breakpoint's max value, which is md breakpoint value minus 0.01 (767.99px)
    expect(breakpointSystem.between('xs', 'sm')).to.equal(
      '(min-width: 0px) and (max-width: 767.99px)'
    );
    expect(breakpointSystem.between('sm', 'lg')).to.equal(
      '(min-width: 576px) and (max-width: 1199.99px)'
    );
    expect(breakpointSystem.between('md', 'xl')).to.equal(
      '(min-width: 768px) and (max-width: 1399.99px)'
    );
    // From lg to xxl, since xxl is the last breakpoint with no max value, only min-width is returned
    expect(breakpointSystem.between('lg', 'xxl')).to.equal('(min-width: 992px)');
  });

  it('Should generate all conditions correctly', () => {
    const { conditions } = breakpointSystem;

    // Basic conditions
    expect(conditions.xs).to.equal('(min-width: 0px)');
    expect(conditions.sm).to.equal('(min-width: 576px)');

    // Down conditions
    // xsDown should be max-width as sm breakpoint value minus 0.01, i.e. 575.99px
    expect(conditions.xsDown).to.equal('(max-width: 575.99px)');
    // smDown should be max-width as md breakpoint value minus 0.01, i.e. 767.99px
    expect(conditions.smDown).to.equal('(max-width: 767.99px)');

    // Only conditions
    expect(conditions.xsOnly).to.equal('(min-width: 0px) and (max-width: 575.99px)');
    expect(conditions.smOnly).to.equal('(min-width: 576px) and (max-width: 767.99px)');

    // Range conditions
    expect(conditions.xsToSm).to.equal('(min-width: 0px) and (max-width: 767.99px)');
    expect(conditions.smToMd).to.equal('(min-width: 576px) and (max-width: 991.99px)');
    expect(conditions.mdToLg).to.equal('(min-width: 768px) and (max-width: 1199.99px)');
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
      '(min-width: 576px) and (max-width: 1199.99px)'
    );
    expect(breakpointSystem.getCondition('nonExistent')).to.equal('');
  });

  it('Should handle non-standard breakpoint names and generate correct media query map', () => {
    const breakpointValues: BreakpointMap = {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
      '2xl': 1400
    };

    const breakpointSystem = createBreakpoints(breakpointValues);
    const mediaQuerySizeMap = breakpointSystem.createMediaQueryMap();

    // Use separate assertions to verify critical breakpoint mappings
    // Basic breakpoints
    expect(mediaQuerySizeMap.xs).to.equal('(max-width: 575.99px)');
    expect(mediaQuerySizeMap.sm).to.equal('(min-width: 576px)');
    expect(mediaQuerySizeMap.md).to.equal('(min-width: 768px)');
    expect(mediaQuerySizeMap.lg).to.equal('(min-width: 992px)');
    expect(mediaQuerySizeMap.xl).to.equal('(min-width: 1200px)');
    expect(mediaQuerySizeMap.xxl).to.equal('(min-width: 1400px)');
    expect(mediaQuerySizeMap['2xl']).to.equal('(min-width: 1400px)');

    // down conditions
    expect(mediaQuerySizeMap.xsDown).to.equal('(max-width: 575.99px)');
    expect(mediaQuerySizeMap.smDown).to.equal('(max-width: 767.99px)');
    expect(mediaQuerySizeMap.mdDown).to.equal('(max-width: 991.99px)');
    expect(mediaQuerySizeMap.lgDown).to.equal('(max-width: 1199.99px)');
    expect(mediaQuerySizeMap.xlDown).to.equal('(max-width: 1399.99px)');
    expect(mediaQuerySizeMap.xxlDown).to.equal('(max-width: 1399.99px)');
    expect(mediaQuerySizeMap['2xlDown']).to.equal('');

    // only conditions
    expect(mediaQuerySizeMap.xsOnly).to.equal('(min-width: 0px) and (max-width: 575.99px)');
    expect(mediaQuerySizeMap.smOnly).to.equal('(min-width: 576px) and (max-width: 767.99px)');
    expect(mediaQuerySizeMap.mdOnly).to.equal('(min-width: 768px) and (max-width: 991.99px)');
    expect(mediaQuerySizeMap.lgOnly).to.equal('(min-width: 992px) and (max-width: 1199.99px)');
    expect(mediaQuerySizeMap.xlOnly).to.equal('(min-width: 1200px) and (max-width: 1399.99px)');
    expect(mediaQuerySizeMap.xxlOnly).to.equal('(min-width: 1400px) and (max-width: 1399.99px)');
    expect(mediaQuerySizeMap['2xlOnly']).to.equal('(min-width: 1400px)');

    // Test some critical between conditions
    expect(mediaQuerySizeMap.xsToSm).to.equal('(min-width: 0px) and (max-width: 767.99px)');
    expect(mediaQuerySizeMap.smToMd).to.equal('(min-width: 576px) and (max-width: 991.99px)');
    expect(mediaQuerySizeMap.mdToLg).to.equal('(min-width: 768px) and (max-width: 1199.99px)');
    expect(mediaQuerySizeMap.lgToXl).to.equal('(min-width: 992px) and (max-width: 1399.99px)');
    expect(mediaQuerySizeMap.xlToXxl).to.equal('(min-width: 1200px) and (max-width: 1399.99px)');

    // Verify that the object contains all expected keys
    const expectedKeys = [
      'xs',
      'sm',
      'md',
      'lg',
      'xl',
      'xxl',
      '2xl',
      'xsDown',
      'smDown',
      'mdDown',
      'lgDown',
      'xlDown',
      'xxlDown',
      '2xlDown',
      'xsOnly',
      'smOnly',
      'mdOnly',
      'lgOnly',
      'xlOnly',
      'xxlOnly',
      '2xlOnly',
      'xsToSm',
      'xsToMd',
      'xsToLg',
      'xsToXl',
      'xsToXxl',
      'xsTo2xl',
      'smToMd',
      'smToLg',
      'smToXl',
      'smToXxl',
      'smTo2xl',
      'mdToLg',
      'mdToXl',
      'mdToXxl',
      'mdTo2xl',
      'lgToXl',
      'lgToXxl',
      'lgTo2xl',
      'xlToXxl',
      'xlTo2xl',
      'xxlTo2xl'
    ];

    expectedKeys.forEach(key => {
      expect(mediaQuerySizeMap).to.have.property(key);
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
    const singleBreakpoint = createBreakpoints({ sm: 576 });
    expect(singleBreakpoint.values).to.have.length(1);
    expect(singleBreakpoint.up('sm')).to.equal('(min-width: 576px)');
    expect(singleBreakpoint.only('sm')).to.equal('(min-width: 576px)');
  });

  it('Should handle numeric values', () => {
    const numericBreakpoints = createBreakpoints({
      sm: 30,
      md: 48
    });
    expect(numericBreakpoints.up('sm')).to.equal('(min-width: 30px)');
    // When there are only two breakpoints, between method returns up(minName)
    expect(numericBreakpoints.between('sm', 'md')).to.equal('(min-width: 30px)');
  });

  it('Should correctly sort breakpoints regardless of input order', () => {
    const unsortedBreakpoints = createBreakpoints({
      lg: 992,
      sm: 576,
      md: 768
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
