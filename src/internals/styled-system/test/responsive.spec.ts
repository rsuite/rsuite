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
});
