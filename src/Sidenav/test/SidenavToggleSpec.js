import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';

import SidenavToggle from '../SidenavToggle';

describe('SidenavToggle', () => {
  it('Should render a toggle', () => {
    const instance = getDOMNode(<SidenavToggle />);
    assert.include(instance.className, 'rs-sidenav-toggle');
  });

  it('Should call onToggle callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(<SidenavToggle onToggle={doneOp} />);
    ReactTestUtils.Simulate.click(instance.querySelector('.rs-btn-icon'));
  });

  it('Should have a custom className', () => {
    const instance = getDOMNode(<SidenavToggle className="custom" />);
    assert.include(instance.className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = getDOMNode(<SidenavToggle style={{ fontSize }} />);
    assert.equal(instance.style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<SidenavToggle classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
