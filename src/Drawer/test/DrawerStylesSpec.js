import React from 'react';
import ReactDOM from 'react-dom';
import Drawer from '../index';
import { createTestContainer, getStyle } from '@test/testUtils';

import '../styles/index.less';

describe('Drawer styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Drawer ref={instanceRef} open />, createTestContainer());
    const dom = instanceRef.current;
    const drawerDom = dom.querySelector('.rs-drawer');
    assert.equal(getStyle(dom, 'position'), 'fixed');
    assert.equal(getStyle(dom, 'zIndex'), '1050');
    assert.equal(getStyle(drawerDom, 'position'), 'fixed');
    assert.equal(getStyle(drawerDom, 'zIndex'), '1050');
    assert.equal(getStyle(drawerDom, 'overflow'), 'visible');

    // Skip this assertion
    // const backdropDom = dom.querySelector('.rs-drawer-backdrop');
    // assert.equal(getStyle(backdropDom, 'backgroundColor'), toRGB('#272c36'));
  });
});
