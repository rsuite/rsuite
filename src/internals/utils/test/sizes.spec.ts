import { describe, expect, it } from 'vitest';
import { SizeEnum } from '@/internals/types';
import { isPresetSize, getSizeStyle } from '../sizes';

describe('sizes utils', () => {
  describe('isPresetSize', () => {
    it('Should return false for undefined or null', () => {
      expect(isPresetSize(undefined)).to.be.false;
      expect(isPresetSize(null)).to.be.false;
    });

    it('Should return true for valid preset sizes', () => {
      expect(isPresetSize(SizeEnum.XS)).to.be.true;
      expect(isPresetSize(SizeEnum.SM)).to.be.true;
      expect(isPresetSize(SizeEnum.MD)).to.be.true;
      expect(isPresetSize(SizeEnum.LG)).to.be.true;
      expect(isPresetSize(SizeEnum.XL)).to.be.true;
    });

    it('Should return false for non-preset sizes', () => {
      expect(isPresetSize('xxl')).to.be.false;
      expect(isPresetSize(20)).to.be.false;
      expect(isPresetSize('20px')).to.be.false;
    });
  });

  describe('getSizeStyle', () => {
    it('Should return undefined when value or component is not provided', () => {
      expect(getSizeStyle(undefined, 'button')).to.be.undefined;
      expect(getSizeStyle(SizeEnum.MD, undefined)).to.be.undefined;
    });

    it('Should return style with CSS variable for preset sizes', () => {
      expect(getSizeStyle(SizeEnum.MD, 'button')).to.deep.equal({
        '--rs-button-size': 'var(--rs-button-size-md)'
      });

      expect(getSizeStyle(SizeEnum.LG, 'button')).to.deep.equal({
        '--rs-button-size': 'var(--rs-button-size-lg)'
      });
    });

    it('Should return style with pixel value for numeric sizes', () => {
      expect(getSizeStyle(16, 'button')).to.deep.equal({
        '--rs-button-size': '16px'
      });

      expect(getSizeStyle(0, 'button')).to.deep.equal({
        '--rs-button-size': '0'
      });
    });

    it('Should return style with raw value for string sizes', () => {
      expect(getSizeStyle('2em', 'button')).to.deep.equal({
        '--rs-button-size': '2em'
      });

      expect(getSizeStyle('auto', 'button')).to.deep.equal({
        '--rs-button-size': 'auto'
      });
    });

    it('Should handle custom prop name', () => {
      expect(getSizeStyle(SizeEnum.MD, 'button', 'width')).to.deep.equal({
        '--rs-button-width': 'var(--rs-button-width-md)'
      });
    });
  });
});
