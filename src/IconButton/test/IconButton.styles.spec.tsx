import React from 'react';
import IconButton from '../index';
import type { AppearanceType, BasicSize } from '@/internals/types';
import SearchIcon from '@rsuite/icons/Search';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import '../styles/index.scss';

describe('IconButton styles', () => {
  describe('Icon button size', () => {
    const sizes = ['lg', 'md', 'sm', 'xs'];
    const sizesMap = {
      lg: '42px',
      md: '36px',
      sm: '30px',
      xs: '24px'
    };
    const appearances = ['default', 'primary', 'link', 'subtle', 'ghost'];

    appearances.forEach(appearance => {
      sizes.forEach(size => {
        it(`Should render the correct width and height for ${appearance} and ${size}`, () => {
          render(
            <IconButton
              icon={<SearchIcon />}
              appearance={appearance as AppearanceType}
              size={size as BasicSize}
            />
          );

          expect(screen.getByRole('button')).to.have.style('width', sizesMap[size]);
          expect(screen.getByRole('button')).to.have.style('height', sizesMap[size]);
        });
      });
    });
  });
});
