import React from 'react';
import ReactDOM from 'react-dom';
import Avatar from '../index';
import { createTestContainer, getDOMNode, getStyle, toRGB, itChrome } from '@test/testUtils';

import '../styles/index';

describe('Avatar styles', () => {
  it('Should render the correct background', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Avatar ref={instanceRef} />, createTestContainer());
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'backgroundColor'), toRGB('#d9d9d9'));
  });

  it('Should apply size class', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Avatar size="lg" ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    assert.equal(getStyle(dom, 'width'), '60px');
    assert.equal(getStyle(dom, 'width'), getStyle(dom, 'height'));
    assert.equal(getStyle(dom, 'font-size'), '26px');
  });

  // @description Can't get border-radius value in other browser except chrome
  itChrome('Should render circle avatar', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Avatar ref={instanceRef} circle />, createTestContainer());
    assert.equal(getStyle(getDOMNode(instanceRef.current), 'borderRadius'), '50%');
  });
});
