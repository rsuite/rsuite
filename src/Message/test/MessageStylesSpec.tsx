import React from 'react';
import { render, screen } from '@testing-library/react';
import Message from '../index';
import { toRGB } from '@test/utils';
import '../styles/index.less';

describe('Message styles', () => {
  it('Should render default Message with white background', () => {
    render(<Message />);
    expect(screen.getByRole('alert')).to.have.style('background-color', toRGB('#fff'));
  });

  it('Should render info Message with blue icon', () => {
    render(<Message showIcon type="info" />);

    expect(screen.getByRole('alert').querySelector('.rs-icon')).to.have.style(
      'color',
      toRGB('#2196f3')
    );
  });

  it('Should render bordered Message with left border and matching icon border', () => {
    render(<Message bordered showIcon />);

    expect(screen.getByRole('alert')).to.have.style('border-left-width', '4px');
    expect(screen.getByRole('alert')).to.have.style('border-color', toRGB('#2196f3'));
    expect(screen.getByRole('alert').querySelector('.rs-message-icon')).to.have.style(
      'border-width',
      '4px'
    );
  });
});
