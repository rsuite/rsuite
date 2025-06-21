import React from 'react';
import Carousel from '../index';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { toRGB } from '@test/utils';

import '../styles/index.scss';

describe('Carousel styles', () => {
  it('Should render correct style ', () => {
    render(<Carousel data-testid="carousel" />);
    expect(screen.getByTestId('carousel')).to.have.style('background-color', toRGB('#717273'));
  });
});
