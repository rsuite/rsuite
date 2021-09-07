import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { getDOMNode, render } from '@test/testUtils';
import Handle from '../Handle';

describe('Slider - Handle', () => {
  it('Should call `onDragStart` callback', () => {
    const onDragStartSpy = sinon.spy();
    const instance = getDOMNode(<Handle onDragStart={onDragStartSpy} />);

    ReactTestUtils.Simulate.mouseDown(instance);

    assert.include(instance.className, 'active');
    assert.ok(onDragStartSpy.calledOnce);
  });

  it('Should call `onDragMove` callback', done => {
    const ref = React.createRef();
    const mousemoveEvent = new MouseEvent('mousemove', { bubbles: true });

    render(<Handle ref={ref} onDragMove={() => done()} />);

    ReactTestUtils.Simulate.mouseDown(ref.current);
    ref.current.dispatchEvent(mousemoveEvent);

    assert.include(ref.current.className, 'active');
  });

  it('Should show tooltip', () => {
    const instance = getDOMNode(<Handle tooltip value={10} />);

    assert.isEmpty(instance.querySelector('.rs-tooltip').style.left);

    ReactTestUtils.Simulate.mouseEnter(instance);
    assert.isNotEmpty(instance.querySelector('.rs-tooltip').style.left);
  });
});
