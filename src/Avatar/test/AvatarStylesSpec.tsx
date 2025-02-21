import React from 'react';
import Avatar from '../index';
import { render } from '@testing-library/react';
import { toRGB } from '@test/utils';
import '../styles/index.less';

describe('Avatar styles', () => {
  it('Should render the correct background', () => {
    const { container } = render(<Avatar />);

    expect(container.firstChild).to.have.style('background-color', toRGB('#d9d9d9'));
  });

  it('Should render circle avatar', () => {
    const { container } = render(<Avatar circle />);

    expect(container.firstChild).to.have.style('border-radius', '3.35544e+07px');
  });
});
