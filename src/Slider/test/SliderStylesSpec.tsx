import React from 'react';
import { render } from '@testing-library/react';
import Slider from '../index';
import { getDOMNode, getStyle, toRGB, getDefaultPalette, inChrome } from '@test/testUtils';

import '../styles/index.less';

const { H500 } = getDefaultPalette();

describe('Slider styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    render(<Slider ref={instanceRef} />);
    const dom = getDOMNode(instanceRef.current);
    const barDom = dom.querySelector('.rs-slider-bar') as HTMLElement;
    const handleDom = dom.querySelector('.rs-slider-handle') as HTMLElement;
    assert.equal(getStyle(dom, 'position'), 'relative', 'Slider position');
    assert.equal(getStyle(barDom, 'backgroundColor'), toRGB('#f2f2f5'), 'Slider background-color');
    assert.equal(getStyle(handleDom, 'position'), 'absolute', 'Slider position');
    inChrome &&
      assert.equal(window.getComputedStyle(handleDom, '::before').border, `2px solid ${H500}`);
  });
});
