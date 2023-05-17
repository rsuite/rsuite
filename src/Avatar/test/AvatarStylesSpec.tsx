import React from 'react';
import { render } from '@testing-library/react';
import Avatar from '../index';
import { getStyle, toRGB, itChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Avatar styles', () => {
  it('Should render the correct background', () => {
    const { container } = render(<Avatar />);

    expect(container.firstChild).to.have.style('background-color', toRGB('#d9d9d9'));
  });

  it('Should apply size class', () => {
    const { container } = render(<Avatar size="lg" />);
    const dom = container.firstChild as HTMLElement;
    assert.equal(getStyle(dom, 'width'), '60px');
    assert.equal(getStyle(dom, 'width'), getStyle(dom, 'height'));
    assert.equal(getStyle(dom, 'font-size'), '26px');
  });

  // @description Can't get border-radius value in other browser except chrome
  itChrome('Should render circle avatar', () => {
    const { container } = render(<Avatar circle />);

    expect(container.firstChild).to.have.style('border-radius', '50%');
  });
});
