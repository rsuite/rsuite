import React from 'react';
import { fireEvent, act, waitFor } from '@testing-library/react';
import { getDOMNode, render } from '@test/testUtils';
import Handle from '../Handle';

describe('Slider - Handle', () => {
  it('Should call `onDragStart` callback', () => {
    const onDragStartSpy = sinon.spy();
    const instance = getDOMNode(<Handle onDragStart={onDragStartSpy} />);

    fireEvent.mouseDown(instance);

    expect(instance.className).to.contain('active');
    expect(onDragStartSpy).to.called;
  });

  it('Should call `onDragMove` callback', async () => {
    const onDragMoveSpy = sinon.spy();

    const ref = React.createRef();
    const mousemoveEvent = new MouseEvent('mousemove', { bubbles: true });

    act(() => {
      render(<Handle ref={ref} onDragMove={onDragMoveSpy} />);
    });

    act(() => {
      fireEvent.mouseDown(ref.current);
    });

    act(() => {
      ref.current.dispatchEvent(mousemoveEvent);
    });

    await waitFor(() => {
      expect(ref.current.className).to.contain('active');
      expect(onDragMoveSpy).to.called;
    });
  });

  it('Should show tooltip', () => {
    const instance = getDOMNode(<Handle tooltip value={10} />);

    expect(instance.querySelector('.rs-tooltip').style.left).to.empty;

    fireEvent.mouseEnter(instance);

    expect(instance.querySelector('.rs-tooltip').style.left).to.not.empty;
  });
});
