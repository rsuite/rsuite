import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import { getDOMNode, getInstance } from '../../../testUtils';
import Ripple from '../Ripple';

describe('Ripple', () => {
  it('Should render a Ripple', () => {
    const instance = getDOMNode(<Ripple />);
    assert.include(instance.className, 'rs-ripple');
  });

  it('Should call onMouseDown callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <div style={{ width: 100, height: 100 }}>
        <Ripple onMouseDown={doneOp} />
      </div>
    );
    ReactTestUtils.Simulate.mouseDown(instance.querySelector('.rs-ripple'));
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Ripple classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
