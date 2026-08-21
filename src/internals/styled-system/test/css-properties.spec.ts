import kebabCase from 'lodash/kebabCase';
import { describe, expect, it } from 'vitest';
import { isSupportedCSSProperty, supportedCSSProperties } from '../css-properties';

describe('isSupportedCSSProperty', () => {
  it('recognizes every supported property in camelCase and kebab-case', () => {
    supportedCSSProperties.forEach(property => {
      expect(isSupportedCSSProperty(property)).toBe(true);
      expect(isSupportedCSSProperty(kebabCase(property))).toBe(true);
    });
  });

  it('does not classify native image props as styled-system props', () => {
    ['src', 'srcSet', 'loading', 'alt', 'onLoad', '--object-fit'].forEach(property => {
      expect(isSupportedCSSProperty(property)).toBe(false);
    });
  });
});
