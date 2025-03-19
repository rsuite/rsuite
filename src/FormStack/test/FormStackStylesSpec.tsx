import React from 'react';
import { render, screen } from '@testing-library/react';
import FormHelpText from '../index';
import { toRGB } from '@test/utils';

import '../styles/index.less';

describe('FormHelpText styles', () => {
  it('Should render the correct styles', () => {
    render(<FormHelpText data-testid="test" />);

    expect(screen.getByTestId('test')).to.have.style('display', 'block');
    expect(screen.getByTestId('test')).to.have.style('color', toRGB('#717273'));
    expect(screen.getByTestId('test')).to.have.style('font-size', '12px');
    expect(screen.getByTestId('test')).to.have.style('line-height', '20px');
  });
});
