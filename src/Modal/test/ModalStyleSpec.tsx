/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render } from '@testing-library/react';
import Modal from '../index';
import { getStyle } from '@test/testUtils';

import '../styles/index.less';

describe('Modal styles', () => {
  it('Should render the correct styles', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Modal ref={instanceRef} open />);
    const dom = instanceRef.current as HTMLElement;
    const drawerDom = dom.querySelector('.rs-modal') as HTMLElement;
    assert.equal(getStyle(dom, 'position'), 'fixed', 'Modal wrapper position');
    assert.equal(getStyle(dom, 'zIndex'), '1050', 'Modal wrapper z-index');
    assert.equal(getStyle(drawerDom, 'position'), 'relative', 'Modal position');
    assert.equal(getStyle(drawerDom, 'zIndex'), '1050', 'Modal z-index');
    assert.equal(getStyle(drawerDom, 'overflow'), 'visible', 'Modal visible');

    // Skip this assertion
    // const backdropDom = dom.querySelector('.rs-modal-backdrop');
    // assert.equal(
    //   getStyle(backdropDom, 'backgroundColor'),
    //   toRGB('#272c36'),
    //   'Modal backDrop background-color'
    // );
  });

  it('Should have correct margin-x: 60px in `full` size', () => {
    const instanceRef = React.createRef<HTMLDivElement>();
    render(<Modal ref={instanceRef} open size="full" />);
    const dom = instanceRef.current as HTMLElement;
    const dialog = dom.querySelector('.rs-modal-dialog') as HTMLElement;
    const { left, right } = dialog.getBoundingClientRect();
    assert.equal(left, 60, 'margin-left');
    assert.equal(window.innerWidth - right, 60, 'margin-right');
  });
});
