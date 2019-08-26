import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../index';
import { createTestContainer, getStyle, getDOMNode, toRGB } from '@test/testUtils';

import '../styles/index';

describe('Modal styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef();
    ReactDOM.render(<Modal ref={instanceRef} show />, createTestContainer());
    const dom = getDOMNode(instanceRef.current);
    const backdropDom = dom.querySelector('.rs-modal-backdrop');
    const drawerDom = dom.querySelector('.rs-modal');
    assert.equal(getStyle(dom, 'position'), 'fixed', 'Modal wrapper position');
    assert.equal(getStyle(dom, 'zIndex'), '1050', 'Modal wrapper z-index');
    assert.equal(getStyle(drawerDom, 'position'), 'relative', 'Modal position');
    assert.equal(getStyle(drawerDom, 'zIndex'), '1050', 'Modal z-index');
    assert.equal(getStyle(drawerDom, 'overflow'), 'visible', 'Modal visible');
    assert.equal(
      getStyle(backdropDom, 'backgroundColor'),
      toRGB('#272c36'),
      'Modal backDrop background-color'
    );
  });
});
