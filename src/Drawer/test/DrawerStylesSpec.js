import React from 'react';
import ReactDOM from 'react-dom';
import Drawer from '../index';
import { createTestContainer, getStyle, toRGB } from '@test/testUtils';

import '../styles/index';

describe('Drawer styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Drawer ref={instanceRef} open />, createTestContainer());
    const dom = instanceRef.current;
    const backdropDom = dom.querySelector('.rs-drawer-backdrop');
    const drawerDom = dom.querySelector('.rs-drawer');
    assert.equal(getStyle(dom, 'position'), 'fixed');
    assert.equal(getStyle(dom, 'zIndex'), '1050');
    assert.equal(getStyle(drawerDom, 'position'), 'fixed');
    assert.equal(getStyle(drawerDom, 'zIndex'), '1050');
    assert.equal(getStyle(drawerDom, 'overflow'), 'visible');
    assert.equal(getStyle(backdropDom, 'backgroundColor'), toRGB('#272c36'));
  });
});
