import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import SidenavToggle from '../src/SidenavToggle';

describe('SidenavToggle', () => {
  it('Should render a toggle', () => {
    const instance = ReactTestUtils.renderIntoDocument(<SidenavToggle />);
    assert.include(findDOMNode(instance).className, 'rs-sidenav-toggle');
  });

  it('Should call onToggle callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(<SidenavToggle onToggle={doneOp} />);
    ReactTestUtils.Simulate.click(findDOMNode(instance).querySelector('.rs-btn-icon'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<SidenavToggle className="custom" />);
    assert.include(findDOMNode(instance).className, 'custom');
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<SidenavToggle style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should have a custom className prefix', () => {
    const instance = ReactTestUtils.renderIntoDocument(<SidenavToggle classPrefix="custom-prefix" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom-prefix\b/));
  });

});
