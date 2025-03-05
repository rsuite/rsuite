import React from 'react';
import sinon from 'sinon';
import { render, act } from '@testing-library/react';
import { testStandardProps } from '@test/utils';

import Ripple from '../Ripple';

describe('Ripple', () => {
  testStandardProps(<Ripple />);

  it('Should render a Ripple', () => {
    const { container } = render(<Ripple />);

    expect(container.firstChild).to.have.contain('.rs-ripple');
  });

  it('Should call onMouseDown callback', () => {
    const onMouseDown = sinon.spy();
    const ref = React.createRef<HTMLDivElement>();
    render(
      <div ref={ref} style={{ width: 100, height: 100 }}>
        <Ripple onMouseDown={onMouseDown} />
      </div>
    );

    act(() => {
      const event = new Event('mousedown');
      (ref.current as HTMLElement).dispatchEvent(event);
    });

    expect(onMouseDown).to.have.been.calledOnce;
  });
});
