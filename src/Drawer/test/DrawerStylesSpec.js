import React from 'react';
import Drawer from '../index';
import { render } from '@testing-library/react';
import { getStyle } from '@test/testUtils';

import '../styles/index.less';

describe('Drawer styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();

    render(<Drawer ref={instanceRef} open />);

    const drawer = instanceRef.current.querySelector('.rs-drawer');

    assert.equal(getStyle(drawer, 'position'), 'fixed');
    assert.equal(getStyle(drawer, 'zIndex'), '1050');
    assert.equal(getStyle(drawer, 'overflow'), 'visible');
  });

  it('Should have a wrapper that fills the window', () => {
    const instanceRef = React.createRef();
    render(<Drawer ref={instanceRef} open />);

    const wrapper = instanceRef.current;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    assert.equal(getStyle(wrapper, 'position'), 'fixed');
    assert.equal(getStyle(wrapper, 'zIndex'), '1050');
    assert.equal(getStyle(wrapper, 'width'), `${windowWidth}px`);
    assert.equal(getStyle(wrapper, 'height'), `${windowHeight}px`);
    assert.equal(getStyle(wrapper, 'left'), `0px`);
    assert.equal(getStyle(wrapper, 'top'), `0px`);
  });
});
