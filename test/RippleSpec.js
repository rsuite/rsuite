import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import { getDOMNode, getInstance } from './TestWrapper';
import Ripple from '../src/Ripple';

describe('Ripple', () => {
  it('Should render a Ripple', () => {
    const instance = getDOMNode(<Ripple />);
    assert.include(instance.className, 'rs-ripple');
  });

  it('Should call onMouseDown callback', done => {
    let ripple = null;
    const doneOp = () => {
      done();
    };
    const instance = getDOMNode(
      <div style={{ width: 100, height: 100 }}>
        <Ripple
          onMouseDown={doneOp}
          ref={ref => {
            ripple = ref;
          }}
        />
      </div>
    );
    ReactTestUtils.Simulate.mouseDown(instance.querySelector('.rs-ripple'));
  });

  it('Should call onMouseDown callback', () => {
    const instance = getDOMNode(
      <div style={{ width: 100, height: 100 }}>
        <Ripple />
      </div>
    );

    ReactTestUtils.Simulate.mouseDown(instance.querySelector('.rs-ripple'));
    assert.ok(instance.querySelector('.rs-ripple-rippling'));
  });
});
