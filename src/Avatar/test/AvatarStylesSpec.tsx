import React from 'react';
import { render } from '@testing-library/react';
import Avatar from '../index';
import { getDOMNode, getStyle, toRGB, itChrome } from '@test/testUtils';

import '../styles/index.less';

describe('Avatar styles', () => {
  it('Should render the correct background', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Avatar ref={instanceRef} />);
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'backgroundColor'), toRGB('#d9d9d9'));
  });

  it('Should apply size class', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Avatar size="lg" ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'width'), '60px');
    assert.equal(getStyle(dom, 'width'), getStyle(dom, 'height'));
    assert.equal(getStyle(dom, 'font-size'), '26px');
  });

  // @description Can't get border-radius value in other browser except chrome
  itChrome('Should render circle avatar', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Avatar ref={instanceRef} circle />);
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'borderRadius'), '50%');
  });
});
