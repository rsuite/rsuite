import { describe, expect, it } from 'vitest';
import { getCSSVariables } from '../responsive';

describe('getCSSVariables', () => {
  it('generates variables for supported properties without aliases', () => {
    expect(
      getCSSVariables(
        {
          transform: 'scale(1)',
          overflow: 'hidden',
          objectFit: 'cover',
          src: '/demo.png'
        },
        '--rs-box-'
      )
    ).toEqual({
      '--rs-box-transform': 'scale(1)',
      '--rs-box-overflow': 'hidden',
      '--rs-box-object-fit': 'cover'
    });
  });

  it('generates responsive variables for supported properties without aliases', () => {
    expect(
      getCSSVariables(
        {
          transform: { xs: 'none', md: 'scale(1)' },
          overflow: { sm: 'hidden', lg: 'auto' }
        },
        '--rs-box-'
      )
    ).toEqual({
      '--rs-box-transform': { xs: 'none', md: 'scale(1)' },
      '--rs-box-overflow': { sm: 'hidden', lg: 'auto' }
    });
  });

  it('recognizes values using only the 2xl breakpoint alias', () => {
    expect(getCSSVariables({ overflow: { '2xl': 'hidden' } }, '--rs-box-')).toEqual({
      '--rs-box-overflow': { '2xl': 'hidden' }
    });
  });
});
