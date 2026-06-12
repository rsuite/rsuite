import { getCheckTreeDefaultValue } from '../utils';
import { describe, expect, it } from 'vitest';

describe('CheckTree utils', () => {
  describe('getCheckTreeDefaultValue', () => {
    it('Should return the original array reference when no values are filtered out', () => {
      const value = ['a', 'b', 'c'];
      const uncheckableItemValues: string[] = [];

      const result = getCheckTreeDefaultValue(value, uncheckableItemValues);

      expect(result).to.equal(value);
    });

    it('Should filter out uncheckable values and return a new reference', () => {
      const value = ['a', 'b', 'c'];
      const uncheckableItemValues = ['b'];

      const result = getCheckTreeDefaultValue(value, uncheckableItemValues);

      expect(result).to.not.equal(value);
      expect(result).to.deep.equal(['a', 'c']);
    });

    it('Should preserve empty array reference', () => {
      const value: string[] = [];
      const uncheckableItemValues: string[] = [];

      const result = getCheckTreeDefaultValue(value, uncheckableItemValues);

      expect(result).to.equal(value);
    });

    it('Should handle non-array value', () => {
      const result = getCheckTreeDefaultValue('single-value' as any, ['other'] as any);

      expect(result).to.equal('single-value');
    });
  });
});
