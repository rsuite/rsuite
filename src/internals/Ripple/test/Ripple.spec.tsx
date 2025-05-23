import React from 'react';
import Ripple from '../Ripple';
import { describe, expect, it, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { testStandardProps } from '@test/cases';

describe('Ripple', () => {
  testStandardProps(<Ripple />);

  it('Should render a Ripple', () => {
    const { container } = render(<Ripple />);

    expect(container.firstChild).to.have.contain('.rs-ripple');
  });

  it('Should call onMouseDown callback', () => {
    const onMouseDown = vi.fn();
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

    expect(onMouseDown).toHaveBeenCalledTimes(1);
  });
});
