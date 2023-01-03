import React from 'react';
import { render, act } from '@testing-library/react';
import { getDOMNode } from '@test/testUtils';
import Ripple from '../Ripple';
import Sinon from 'sinon';

describe('Ripple', () => {
  it('Should render a Ripple', () => {
    const instance = getDOMNode(<Ripple />);
    assert.include(instance.className, 'rs-ripple');
  });

  it('Should call onMouseDown callback', () => {
    const onMouseDown = Sinon.spy();
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

  it('Should have a custom className prefix', () => {
    const instance = getDOMNode(<Ripple classPrefix="custom-prefix" />);
    assert.ok(instance.className.match(/\bcustom-prefix\b/));
  });
});
