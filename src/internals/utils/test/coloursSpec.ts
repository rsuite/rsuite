import { createColorVariables, expandHexColor, getContrastText, getLuminance } from '../colours';

describe('colours utils', () => {
  describe('createColorVariables', () => {
    it('should create CSS variables for custom color', () => {
      const result = createColorVariables('#ff5733', '--rs-bg', '--rs-text');
      expect(result).to.deep.equal({
        '--rs-bg': '#ff5733',
        '--rs-text': '#ffffff'
      });
    });

    it('should handle short hex color', () => {
      const result = createColorVariables('#f00', '--rs-bg', '--rs-text');
      expect(result).to.deep.equal({
        '--rs-bg': '#ff0000',
        '--rs-text': '#ffffff'
      });
    });

    it('should handle light color and set dark text', () => {
      const result = createColorVariables('#ffeb3b', '--rs-bg', '--rs-text');
      expect(result).to.deep.equal({
        '--rs-bg': '#ffeb3b',
        '--rs-text': '#000000'
      });
    });

    it('should return undefined for preset colors', () => {
      const result = createColorVariables('red', '--rs-bg', '--rs-text');
      expect(result).to.be.undefined;
    });

    it('should return undefined for undefined color', () => {
      const result = createColorVariables(undefined, '--rs-bg', '--rs-text');
      expect(result).to.be.undefined;
    });

    it('should only create background variable when text field is not provided', () => {
      const result = createColorVariables('#ff5733', '--rs-bg');
      expect(result).to.deep.equal({
        '--rs-bg': '#ff5733'
      });
    });
  });

  describe('expandHexColor', () => {
    it('should expand short hex color', () => {
      expect(expandHexColor('#f00')).to.equal('#ff0000');
      expect(expandHexColor('#0f0')).to.equal('#00ff00');
      expect(expandHexColor('#00f')).to.equal('#0000ff');
    });

    it('should return full hex color as is', () => {
      expect(expandHexColor('#ff0000')).to.equal('#ff0000');
      expect(expandHexColor('#00ff00')).to.equal('#00ff00');
      expect(expandHexColor('#0000ff')).to.equal('#0000ff');
    });

    it('should handle uppercase hex colors', () => {
      expect(expandHexColor('#F00')).to.equal('#ff0000');
      expect(expandHexColor('#FF0000')).to.equal('#ff0000');
    });
  });

  describe('getLuminance', () => {
    it('should calculate luminance for primary colors', () => {
      expect(getLuminance('#ff0000')).to.be.closeTo(0.2126, 0.0001);
      expect(getLuminance('#00ff00')).to.be.closeTo(0.7152, 0.0001);
      expect(getLuminance('#0000ff')).to.be.closeTo(0.0722, 0.0001);
    });

    it('should calculate luminance for white and black', () => {
      expect(getLuminance('#ffffff')).to.be.closeTo(1, 0.0001);
      expect(getLuminance('#000000')).to.be.closeTo(0, 0.0001);
    });

    it('should handle short hex colors', () => {
      expect(getLuminance('#f00')).to.be.closeTo(0.2126, 0.0001);
      expect(getLuminance('#0f0')).to.be.closeTo(0.7152, 0.0001);
      expect(getLuminance('#00f')).to.be.closeTo(0.0722, 0.0001);
    });
  });

  describe('getContrastText', () => {
    it('should return white text for dark backgrounds', () => {
      expect(getContrastText('#000000')).to.equal('#ffffff');
      expect(getContrastText('#ff5733')).to.equal('#ffffff');
      expect(getContrastText('#2196f3')).to.equal('#ffffff');
    });

    it('should return black text for light backgrounds', () => {
      expect(getContrastText('#ffffff')).to.equal('#000000');
      expect(getContrastText('#ffeb3b')).to.equal('#000000');
      expect(getContrastText('#e1f5fe')).to.equal('#000000');
    });

    it('should return default text color for non-hex colors', () => {
      expect(getContrastText('red')).to.equal('var(--rs-text-primary)');
      expect(getContrastText('rgb(255, 0, 0)')).to.equal('var(--rs-text-primary)');
    });
  });
});
