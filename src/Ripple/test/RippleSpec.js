import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
import Ripple from '../Ripple';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('Ripple', () => {
  it('Should render a Ripple', () => {
    const instance = getDOMNode(<Ripple />);
    assert.include(instance.className, 'rs-ripple');
  });

  it('Should call onMouseDown callback', done => {
    const doneOp = () => {
      done();
    };
    const ref = React.createRef();
    ReactTestUtils.act(() => {
      ReactDOM.render(
        <div ref={ref} style={{ width: 100, height: 100 }}>
          <Ripple onMouseDown={doneOp} />
        </div>,
        container
      );
    });

    ReactTestUtils.act(() => {
      const event = new Event('mousedown');
      ref.current.dispatchEvent(event);
    });
  });

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Ripple classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
