import { describe, expect, it } from 'vitest';
import { prefix } from '../utils/prefix';
import prefixCurried from '../utils/prefix';

describe('prefix', () => {
  it('Should return empty string when pre is empty', () => {
    expect(prefix('', 'active')).to.equal('');
  });

  it('Should return empty string when className is empty', () => {
    expect(prefix('btn', '')).to.equal('');
  });

  it('Should return prefixed class name', () => {
    expect(prefix('btn', 'active')).to.equal('btn-active');
  });

  it('Should handle array of class names', () => {
    expect(prefix('btn', ['active', 'disabled'])).to.equal('btn-active btn-disabled');
  });

  it('Should filter empty string in array', () => {
    expect(prefix('btn', ['active', '', 'disabled'])).to.equal('btn-active btn-disabled');
  });

  it('Should handle pre ending with dash', () => {
    expect(prefix('btn-', 'active')).to.equal('btn-active');
  });

  it('Should work as curried function', () => {
    const btnPrefix = prefixCurried('btn');
    expect(btnPrefix('active')).to.equal('btn-active');
  });
});
