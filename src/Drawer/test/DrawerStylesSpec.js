import React from 'react';
import Drawer from '../index';
import { render, getStyle } from '@test/testUtils';

import '../styles/index.less';

describe('Drawer styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    render(<Drawer ref={instanceRef} open />);
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
