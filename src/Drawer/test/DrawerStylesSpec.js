import React from 'react';
import ReactDOM from 'react-dom';
import Drawer from '../index';
import { createTestContainer, getStyle, getDOMNode, toRGB } from '@test/testUtils';

import '../styles/index';

describe('Drawer styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Drawer ref={instanceRef} show />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    const backdropDom = dom.querySelector('.rs-drawer-backdrop');
    const drawerDom = dom.querySelector('.rs-drawer');
    assert.equal(getStyle(dom, 'position'), 'fixed', 'Drawer wrapper position');
    assert.equal(getStyle(dom, 'zIndex'), '1050', 'Drawer wrapper z-index');
    assert.equal(getStyle(drawerDom, 'position'), 'fixed', 'Drawer position');
    assert.equal(getStyle(drawerDom, 'zIndex'), '1050', 'Drawer z-index');
    assert.equal(getStyle(drawerDom, 'overflow'), 'visible', 'Drawer visible');
    assert.equal(
      getStyle(backdropDom, 'backgroundColor'),
      toRGB('#272c36'),
      'Drawer backDrop background-color'
    );
  });
});
