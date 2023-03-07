import React from 'react';
import { fireEvent, act, waitFor, render } from '@testing-library/react';
import sinon from 'sinon';
import { getDOMNode } from '@test/testUtils';
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

    const ref = React.createRef<HTMLDivElement>();
    const mousemoveEvent = new MouseEvent('mousemove', { bubbles: true });

    render(<Handle ref={ref} onDragMove={onDragMoveSpy} />);

    fireEvent.mouseDown(ref.current as HTMLElement);

    act(() => {
      (ref.current as HTMLElement).dispatchEvent(mousemoveEvent);
    });

    await waitFor(() => {
      expect((ref.current as HTMLElement).className).to.contain('active');
      expect(onDragMoveSpy).to.called;
    });
  });

  it('Should show tooltip', () => {
    const instance = getDOMNode(<Handle tooltip value={10} />);

    // eslint-disable-next-line testing-library/no-node-access
    expect((instance.querySelector('.rs-tooltip') as HTMLElement).style.left).to.empty;

    fireEvent.mouseEnter(instance);

    // eslint-disable-next-line testing-library/no-node-access
    expect((instance.querySelector('.rs-tooltip') as HTMLElement).style.left).to.not.empty;
  });
});
