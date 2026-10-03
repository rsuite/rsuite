import { describe, expect, it } from 'vitest';
import isRTL from '../utils/isRTL';

describe('isRTL', () => {
  it('Should return false when no dir attribute is set', () => {
    document.body.removeAttribute('dir');
    document.documentElement.dir = '';
    expect(isRTL()).to.equal(false);
  });

  it('Should return true when document.body has dir=rtl', () => {
    document.body.setAttribute('dir', 'rtl');
    expect(isRTL()).to.equal(true);
    document.body.removeAttribute('dir');
  });

  it('Should return false when document.body has dir=ltr', () => {
    document.body.setAttribute('dir', 'ltr');
    expect(isRTL()).to.equal(false);
    document.body.removeAttribute('dir');
  });

  it('Should return true when document.dir is rtl', () => {
    document.documentElement.dir = 'rtl';
    expect(isRTL()).to.equal(true);
    document.documentElement.dir = '';
  });
});
