import { describe, expect, it } from 'vitest';
import getOptionId from '../getOptionId';

describe('getOptionId', () => {
  it.each([0, '', 'plain-value', 'quoted"value', 'left\\right', '中文', '🚀', 'foo\u00a0bar'])(
    'preserves the existing ID for %j',
    value => {
      expect(getOptionId('picker', value)).toBe(`picker-opt-${value}`);
    }
  );

  it.each([
    ['%', '%25'],
    ['\t', '%09'],
    ['\n', '%0a'],
    ['\f', '%0c'],
    ['\r', '%0d'],
    [' ', '%20']
  ])('encodes the reserved character %j', (character, encoded) => {
    expect(getOptionId('picker', `foo${character}bar`)).toBe(`picker-opt-foo${encoded}bar`);
  });

  it('distinguishes escaped characters from percent-encoded literal values', () => {
    const values = ['foo bar', 'foo%20bar', 'foo%bar', 'foo%25bar', 'foo%2520bar'];

    expect(new Set(values.map(value => getOptionId('picker', value))).size).toBe(values.length);
  });

  it.each(['\ud800', '\udfff', 'foo\ud800 bar'])(
    'handles a lone surrogate in %j without URI encoding',
    value => {
      expect(() => getOptionId('picker', value)).not.toThrow();
      expect(getOptionId('picker', value)).not.toMatch(/[\t\n\f\r ]/);
    }
  );

  it('does not generate an option ID without a combobox ID', () => {
    expect(getOptionId(undefined, 'value')).toBeUndefined();
  });
});
