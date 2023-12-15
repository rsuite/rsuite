import React from 'react';
import { render } from '@testing-library/react';
import Avatar from '../index';
import { toRGB, itChrome } from '@test/utils';

import '../styles/index.less';

describe('Avatar styles', () => {
  it('Should render the correct background', () => {
    const { container } = render(<Avatar />);

    expect(container.firstChild).to.have.style('background-color', toRGB('#d9d9d9'));
  });

  // @description Can't get border-radius value in other browser except chrome
  itChrome('Should render circle avatar', () => {
    const { container } = render(<Avatar circle />);

    expect(container.firstChild).to.have.style('border-radius', '50%');
  });
});
