import React from 'react';
import ReactDOM from 'react-dom';
import Slider from '../index';
import {
  createTestContainer,
  getDOMNode,
  getStyle,
  toRGB,
  getDefaultPalette,
  inChrome
} from '@test/testUtils';

import '../styles/index';

const { H500 } = getDefaultPalette();

describe('Slider styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Slider ref={instanceRef} />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    const barDom = dom.querySelector('.rs-slider-bar');
    const handleDom = dom.querySelector('.rs-slider-handle');
    assert.equal(getStyle(dom, 'position'), 'relative', 'Slider position');
    assert.equal(getStyle(barDom, 'backgroundColor'), toRGB('#f2f2f5'), 'Slider background-color');
    assert.equal(getStyle(handleDom, 'position'), 'absolute', 'Slider position');
    inChrome &&
      assert.equal(window.getComputedStyle(handleDom, '::before').border, `2px solid ${H500}`);
  });
});
