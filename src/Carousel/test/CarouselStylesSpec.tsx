import React from 'react';
import { render, screen } from '@testing-library/react';
import Carousel from '../index';
import { toRGB } from '@test/utils';

import '../styles/index.less';

describe('Carousel styles', () => {
  it('Should render correct style ', () => {
    render(<Carousel data-testid="carousel" />);
    expect(screen.getByTestId('carousel')).to.have.style('background-color', toRGB('#717273'));
  });
});
