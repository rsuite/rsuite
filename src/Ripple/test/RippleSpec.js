import React from 'react';
import { render } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode } from '@test/testUtils';
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
    const ref = React.createRef();
    render(
      <div ref={ref} style={{ width: 100, height: 100 }}>
        <Ripple onMouseDown={doneOp} />
      </div>
    );

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
