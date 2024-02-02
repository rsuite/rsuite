import React from 'react';
import { render, screen } from '@testing-library/react';
import Message from '../index';
import { toRGB } from '@test/utils';
import '../styles/index.less';

describe('Message styles', () => {
  it('Should render the correct background color', () => {
    render(<Message />);
    expect(screen.getByRole('alert')).to.have.style('background-color', toRGB('#fff'));
  });

  it('Icon should render the correct color', () => {
    render(<Message showIcon type="info" />);

    expect(screen.getByRole('alert').querySelector('.rs-icon')).to.have.style(
      'color',
      toRGB('#2196f3')
    );
  });
});
