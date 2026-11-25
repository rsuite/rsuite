import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import PaginationGroup, { PaginationGroupProps } from '../PaginationGroup';

import '../styles/index.scss';

describe('PaginationGroup styles', () => {
  const FONT_SIZES: Record<NonNullable<PaginationGroupProps['size']>, string> = {
    xs: '12px',
    sm: '14px',
    md: '14px',
    lg: '16px'
  };

  const sizes: NonNullable<PaginationGroupProps['size']>[] = ['xs', 'sm', 'md', 'lg'];

  sizes.forEach(size => {
    it(`Should render the correct font-size for total and skip when size is ${size}`, () => {
      render(
        <PaginationGroup
          layout={['total', 'skip']}
          total={100}
          size={size}
          locale={{ total: 'Total Rows: {0}', skip: 'Go to {0} page' }}
        />
      );

      expect(screen.getByText('Go to')).to.have.style('font-size', FONT_SIZES[size]);
      expect(screen.getByText('Total Rows:')).to.have.style('font-size', FONT_SIZES[size]);
    });
  });
});
