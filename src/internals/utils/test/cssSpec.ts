import { getCssValue, mergeStyles, createOffsetStyles } from '../css';

describe('css utils', () => {
  describe('getCssValue', () => {
    it('should handle number values', () => {
      expect(getCssValue(10)).to.equal('10px');
      expect(getCssValue(0)).to.equal('0');
      expect(getCssValue(-5)).to.equal('-5px');
    });

    it('should return string values as is', () => {
      expect(getCssValue('10px')).to.equal('10px');
      expect(getCssValue('2em')).to.equal('2em');
      expect(getCssValue('50%')).to.equal('50%');
    });

    it('should handle undefined, null and empty string', () => {
      expect(getCssValue(undefined)).to.equal('');
      expect(getCssValue(null)).to.equal('');
      expect(getCssValue('')).to.equal('');
    });

    it('should handle custom units', () => {
      expect(getCssValue(10, 'em')).to.equal('10em');
      expect(getCssValue(20, '%')).to.equal('20%');
    });
  });

  describe('mergeStyles', () => {
    it('should merge multiple style objects', () => {
      const style1 = { color: 'red', fontSize: '12px' };
      const style2 = { backgroundColor: 'blue' };
      const style3 = { fontSize: '14px' };

      const result = mergeStyles(style1, style2, style3);

      expect(result).to.deep.equal({
        color: 'red',
        fontSize: '14px',
        backgroundColor: 'blue'
      });
    });

    it('should handle undefined and null values', () => {
      const style1 = { color: 'red' };
      const style2 = undefined;
      const style3 = null;
      const style4 = { backgroundColor: 'blue' };

      const result = mergeStyles(style1, style2, style3, style4);

      expect(result).to.deep.equal({
        color: 'red',
        backgroundColor: 'blue'
      });
    });

    it('should handle CSS variables', () => {
      const style1: any = { '--custom-color': '#ff0000' };
      const style2: any = { '--custom-bg': '#ffffff' };

      const result = mergeStyles(style1, style2);

      expect(result).to.deep.equal({
        '--custom-color': '#ff0000',
        '--custom-bg': '#ffffff'
      });
    });

    it('should handle empty objects', () => {
      const result = mergeStyles({}, {}, {});

      expect(result).to.deep.equal({});
    });
  });

  describe('createOffsetStyles', () => {
    it('should create offset CSS variables with numbers', () => {
      const result = createOffsetStyles([10, 20], '--rs-offset');

      expect(result).to.deep.equal({
        '--rs-offset-x': '10px',
        '--rs-offset-y': '20px'
      });
    });

    it('should create offset CSS variables with strings', () => {
      const result = createOffsetStyles(['10px', '20%'], '--rs-offset');

      expect(result).to.deep.equal({
        '--rs-offset-x': '10px',
        '--rs-offset-y': '20%'
      });
    });

    it('should handle mixed number and string values', () => {
      const result = createOffsetStyles([10, '20%'], '--rs-offset');

      expect(result).to.deep.equal({
        '--rs-offset-x': '10px',
        '--rs-offset-y': '20%'
      });
    });

    it('should use default prefix if not provided', () => {
      const result = createOffsetStyles([10, 20]);

      expect(result).to.deep.equal({
        '--rs-offset-x': '10px',
        '--rs-offset-y': '20px'
      });
    });

    it('should return undefined for undefined offset', () => {
      const result = createOffsetStyles(undefined);

      expect(result).to.be.undefined;
    });
  });
});
