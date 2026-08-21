import camelCase from 'lodash/camelCase';
import { describe, expect, it, vi } from 'vitest';
import { cssSystemPropAlias } from '@/internals/styled-system/css-alias';
import { supportedCSSProperties } from '@/internals/styled-system/css-properties';
import { extractBoxProps, omitBoxProps } from '../utils';

describe('Box prop utilities', () => {
  it('recognizes all public CSS properties, aliases and canonical alias names', () => {
    const props: Record<string, unknown> = {};

    supportedCSSProperties.forEach(property => {
      props[property] = 'initial';
    });

    Object.entries(cssSystemPropAlias).forEach(([alias, config]) => {
      props[alias] = 'initial';
      props[camelCase(config.property)] = 'initial';
    });

    expect(extractBoxProps(props)).toEqual(props);
    expect(omitBoxProps(props)).toEqual({});
  });

  it('keeps native element props out of the styled system', () => {
    const onLoad = vi.fn();
    const nativeProps = {
      src: '/demo.png',
      srcSet: '/demo.png 1x, /demo@2x.png 2x',
      loading: 'lazy',
      alt: 'demo',
      onLoad
    };

    expect(extractBoxProps(nativeProps)).toEqual({});
    expect(omitBoxProps(nativeProps)).toEqual(nativeProps);
  });

  it('partitions defined props and omits undefined styled-system values', () => {
    const props = {
      transform: 'scale(1)',
      overflow: 'hidden',
      objectFit: 'cover',
      p: 8,
      src: '/demo.png',
      alt: 'demo',
      cursor: undefined
    };

    expect(extractBoxProps(props)).toEqual({
      transform: 'scale(1)',
      overflow: 'hidden',
      objectFit: 'cover',
      p: 8
    });
    expect(omitBoxProps(props)).toEqual({ src: '/demo.png', alt: 'demo' });
  });
});
