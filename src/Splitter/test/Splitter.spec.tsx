import React, { useState } from 'react';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { testStandardProps } from '@test/cases';
import Splitter, { type SplitterProps } from '../Splitter';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';

function Layout(props: SplitterProps) {
  return (
    <Splitter style={{ width: 600, height: 300 }} {...props}>
      <Splitter.Panel aria-label="Navigation">Navigation</Splitter.Panel>
      <Splitter.Panel aria-label="Content">Content</Splitter.Panel>
    </Splitter>
  );
}

function mockCapture(handle: HTMLElement) {
  const captured = new Set<number>();
  vi.spyOn(handle, 'setPointerCapture').mockImplementation(id => {
    captured.add(id);
  });
  vi.spyOn(handle, 'hasPointerCapture').mockImplementation(id => captured.has(id));
  const release = vi.spyOn(handle, 'releasePointerCapture').mockImplementation(id => {
    captured.delete(id);
  });
  return release;
}

function startDrag(handle: HTMLElement, options: PointerEventInit = {}) {
  fireEvent.pointerDown(handle, {
    pointerId: 1,
    isPrimary: true,
    button: 0,
    clientX: 100,
    clientY: 100,
    ...options
  });
}

function panelLength(handle: HTMLElement, vertical = false) {
  return Array.from(handle.parentElement!.children)
    .filter((_, index) => index % 2 === 0)
    .reduce((sum, panel) => sum + panel.getBoundingClientRect()[vertical ? 'height' : 'width'], 0);
}

describe('Splitter', () => {
  testStandardProps(<Splitter />);
  testStandardProps(<Splitter.Panel />, {
    hasClassPrefix: false,
    customClassName: false,
    getRootElement: view => view.container.firstChild.firstChild
  });

  it('keeps panel refs, ids, classes, and ARIA on the layout frame while styling its content', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Splitter.Panel
        ref={ref}
        id="styled-panel"
        className="custom-panel"
        classPrefix="custom-prefix"
        aria-label="Panel"
        p={20}
        style={{ border: '2px solid', fontSize: 12 }}
      >
        Content
      </Splitter.Panel>
    );
    const frame = screen.getByRole('group', { name: 'Panel' });
    expect(ref.current).toBe(frame);
    expect(frame).toHaveAttribute('id', 'styled-panel');
    expect(frame).toHaveClass('custom-panel', 'rs-custom-prefix');
    expect(frame.firstElementChild).toHaveStyle({
      padding: '20px',
      borderWidth: '2px',
      fontSize: '12px'
    });
    expect(frame).not.toHaveAttribute('style');
  });

  it('associates a named, focusable separator with the primary panel', () => {
    render(<Layout />);
    const handle = screen.getByRole('separator', { name: 'Navigation' });
    expect(handle).toHaveAttribute('tabindex', '0');
    expect(handle).toHaveAttribute('aria-orientation', 'vertical');
    expect(handle).toHaveAttribute('aria-valuenow', '50');
    expect(document.getElementById(handle.getAttribute('aria-controls')!)).toHaveTextContent(
      'Navigation'
    );
  });

  it('hides zero-size content without losing its state or overriding nonzero aria-hidden', () => {
    const view = (sizes: number[]) => (
      <Splitter sizes={sizes}>
        <Splitter.Panel aria-hidden="false" tabIndex={0} style={{ display: 'flex' }}>
          <input aria-label="Draft" defaultValue="Saved" />
        </Splitter.Panel>
        <Splitter.Panel aria-hidden="true" />
      </Splitter>
    );
    const { rerender, container } = render(view([30, 70]));
    const input = screen.getByRole('textbox', { name: 'Draft' });
    fireEvent.change(input, { target: { value: 'Edited' } });
    rerender(view([0, 100]));
    expect(container.firstElementChild!.children[0]).toHaveAttribute('aria-hidden', 'true');
    expect(container.firstElementChild!.children[0]).toHaveAttribute('tabindex', '-1');
    expect(input.parentElement).toHaveStyle({ display: 'none' });
    rerender(view([30, 70]));
    expect(screen.getByRole('textbox', { name: 'Draft' })).toBe(input);
    expect(input).toHaveValue('Edited');
    expect(input.parentElement).toHaveStyle({ display: 'flex' });
    expect(container.firstElementChild!.children[0]).toHaveAttribute('aria-hidden', 'false');
    expect(container.firstElementChild!.children[0]).toHaveAttribute('tabindex', '0');
    expect(container.firstElementChild!.children[2]).toHaveAttribute('aria-hidden', 'true');
  });

  it('keeps responsive visibility on the content without changing the panel share', () => {
    render(
      <Splitter style={{ width: 600, height: 200 }}>
        <Splitter.Panel hideFrom="sm" aria-label="Navigation" />
        <Splitter.Panel />
      </Splitter>
    );
    const handle = screen.getByRole('separator');
    const panel = handle.previousElementSibling!;
    expect(panel).not.toHaveAttribute('data-hidden-from');
    expect(panel.firstElementChild).toHaveAttribute('data-hidden-from', 'sm');
    expect(getComputedStyle(panel.firstElementChild!).display).toBe('none');
    expect(panel.getBoundingClientRect().width).toBeCloseTo(panelLength(handle) / 2);
  });

  it('uses the primary panel visible label and explicit id', () => {
    render(
      <Splitter>
        <Splitter.Panel id="nav-panel" aria-labelledby="nav-title">
          <h2 id="nav-title">Folders</h2>
        </Splitter.Panel>
        <Splitter.Panel>Editor</Splitter.Panel>
      </Splitter>
    );
    const handle = screen.getByRole('separator', { name: 'Folders' });
    expect(handle).toHaveAttribute('aria-controls', 'nav-panel');
  });

  it('fits the initial equal shares within panel constraints', () => {
    render(
      <Splitter>
        <Splitter.Panel maxSize={30} aria-label="Navigation" />
        <Splitter.Panel />
      </Splitter>
    );
    expect(screen.getByRole('separator')).toHaveAttribute('aria-valuenow', '30');
  });

  it('resizes only the adjacent pair and applies both panels constraints', () => {
    const onResize = vi.fn();
    render(
      <Splitter defaultSizes={[25, 35, 40]} onResize={onResize}>
        <Splitter.Panel minSize={10} maxSize={50} />
        <Splitter.Panel minSize={20} maxSize={60} />
        <Splitter.Panel />
      </Splitter>
    );
    const handle = screen.getAllByRole('separator')[0];
    expect(handle).toHaveAttribute('aria-valuemin', '10');
    expect(handle).toHaveAttribute('aria-valuemax', '40');
    fireEvent.keyDown(handle, { key: 'End' });
    expect(onResize).toHaveBeenLastCalledWith([40, 20, 40], expect.any(Object));
    fireEvent.keyDown(handle, { key: 'Home' });
    expect(onResize).toHaveBeenLastCalledWith([10, 50, 40], expect.any(Object));
    fireEvent.keyDown(handle, { key: 'ArrowRight' });
    expect(onResize).toHaveBeenLastCalledWith([11, 49, 40], expect.any(Object));
  });

  it('uses the configured keyboard step, Shift multiplier, and layout axis', () => {
    const onResize = vi.fn();
    render(<Layout orientation="vertical" keyboardStep={0.5} onResize={onResize} />);
    const handle = screen.getByRole('separator');
    expect(handle).toHaveAttribute('aria-orientation', 'horizontal');
    fireEvent.keyDown(handle, { key: 'ArrowRight' });
    expect(onResize).not.toHaveBeenCalled();
    fireEvent.keyDown(handle, { key: 'ArrowDown', shiftKey: true });
    expect(onResize).toHaveBeenLastCalledWith([55, 45], expect.any(Object));
    fireEvent.keyDown(handle, { key: 'ArrowUp' });
    expect(onResize).toHaveBeenLastCalledWith([54.5, 45.5], expect.any(Object));
  });

  it('moves the separator in the physical arrow direction in RTL', () => {
    const onResize = vi.fn();
    render(
      <CustomProvider rtl>
        <Layout onResize={onResize} />
      </CustomProvider>
    );
    const handle = screen.getByRole('separator');
    fireEvent.keyDown(handle, { key: 'ArrowLeft' });
    expect(onResize).toHaveBeenLastCalledWith([51, 49], expect.any(Object));
    fireEvent.keyDown(handle, { key: 'ArrowRight' });
    expect(onResize).toHaveBeenLastCalledWith([50, 50], expect.any(Object));
  });

  it('keeps controlled sizes until the owner supplies the next layout', () => {
    const onResize = vi.fn();
    const { rerender } = render(<Layout sizes={[30, 70]} onResize={onResize} />);
    const handle = screen.getByRole('separator');
    fireEvent.keyDown(handle, { key: 'ArrowRight' });
    expect(onResize).toHaveBeenLastCalledWith([31, 69], expect.any(Object));
    expect(handle).toHaveAttribute('aria-valuenow', '30');
    rerender(<Layout sizes={[31, 69]} onResize={onResize} />);
    expect(handle).toHaveAttribute('aria-valuenow', '31');
  });

  it('does not expose mutable state arrays through callbacks', () => {
    const onResizeStart = vi.fn(sizes => {
      sizes[0] = -1;
    });
    const onResize = vi.fn(sizes => {
      sizes[0] = -1;
    });
    const onResizeEnd = vi.fn();
    render(<Layout onResizeStart={onResizeStart} onResize={onResize} onResizeEnd={onResizeEnd} />);
    const handle = screen.getByRole('separator');
    fireEvent.keyDown(handle, { key: 'ArrowRight' });
    expect(handle).toHaveAttribute('aria-valuenow', '51');
    expect(onResizeEnd).toHaveBeenCalledWith([51, 49], expect.any(Object));
  });

  it('disables the handles on both sides of a non-resizable panel', () => {
    const onResize = vi.fn();
    render(
      <Splitter onResize={onResize}>
        <Splitter.Panel />
        <Splitter.Panel resizable={false} />
        <Splitter.Panel />
      </Splitter>
    );
    screen.getAllByRole('separator').forEach(handle => {
      expect(handle).toHaveAttribute('aria-disabled', 'true');
      expect(handle).toHaveAttribute('tabindex', '-1');
      fireEvent.keyDown(handle, { key: 'ArrowRight' });
    });
    expect(onResize).not.toHaveBeenCalled();
  });

  it('does not start a disabled resize', () => {
    const onResizeStart = vi.fn();
    render(<Layout disabled onResizeStart={onResizeStart} />);
    const handle = screen.getByRole('separator');
    mockCapture(handle);
    startDrag(handle);
    fireEvent.keyDown(handle, { key: 'ArrowRight' });
    expect(onResizeStart).not.toHaveBeenCalled();
  });

  it.each([{ sizes: [40, 40] }, { sizes: [100] }, { sizes: [NaN, 100] }])(
    'warns and disables an invalid controlled layout $sizes',
    props => {
      const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<Layout {...props} />);
      expect(warning).toHaveBeenCalled();
      expect(screen.getByRole('separator')).toHaveAttribute('aria-disabled', 'true');
      warning.mockRestore();
    }
  );

  it('warns for impossible constraints without emitting NaN sizes', () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Splitter>
        <Splitter.Panel minSize={70} />
        <Splitter.Panel minSize={70} />
      </Splitter>
    );
    expect(warning).toHaveBeenCalled();
    expect(screen.getByRole('separator')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('separator')).toHaveAttribute('aria-valuenow', '50');
    warning.mockRestore();
  });

  it('resets an uncontrolled layout when the panel count changes', () => {
    const { rerender } = render(
      <Splitter defaultSizes={[20, 30, 50]}>
        <Splitter.Panel key="a" />
        <Splitter.Panel key="b" />
        <Splitter.Panel key="c" />
      </Splitter>
    );
    rerender(
      <Splitter>
        <Splitter.Panel key="a" />
        <Splitter.Panel key="b" />
      </Splitter>
    );
    expect(screen.getByRole('separator')).toHaveAttribute('aria-valuenow', '50');
  });

  it('warns when children are not direct panels', () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <Splitter>
        <div>Unsupported</div>
        <Splitter.Panel />
      </Splitter>
    );
    expect(warning).toHaveBeenCalledWith('Splitter only supports direct Splitter.Panel children.');
    expect(screen.queryByRole('separator')).not.toBeInTheDocument();
    warning.mockRestore();
  });

  it.each([
    { orientation: 'horizontal', dir: 'ltr' },
    { orientation: 'horizontal', dir: 'rtl' },
    { orientation: 'vertical', dir: 'ltr' }
  ] as const)(
    'tracks pointer movement without gap, padding, handle, or transform drift in $orientation $dir',
    ({ orientation, dir }) => {
      const onResize = vi.fn();
      render(
        <Splitter
          orientation={orientation}
          dir={dir}
          gap={16}
          style={{
            width: 640,
            height: 300,
            padding: 20,
            border: '4px solid',
            transform: 'scale(1.25)'
          }}
          onResize={onResize}
        >
          <Splitter.Panel style={{ padding: 20 }} aria-label="Navigation" />
          <Splitter.Panel style={{ padding: 10 }} />
        </Splitter>
      );
      const handle = screen.getByRole('separator');
      const vertical = orientation === 'vertical';
      const axis = vertical ? 'height' : 'width';
      const length = panelLength(handle, vertical);
      const primary = document.getElementById(handle.getAttribute('aria-controls')!)!;
      const initial = primary.getBoundingClientRect()[axis];
      const position = vertical
        ? { clientY: 100 + length / 10 }
        : { clientX: 100 + (dir === 'rtl' ? -1 : 1) * (length / 10) };
      mockCapture(handle);
      startDrag(handle);
      fireEvent.pointerMove(handle, { pointerId: 1, ...position });
      expect(onResize).toHaveBeenCalledTimes(1);
      expect(onResize.mock.calls[0][0][0]).toBeCloseTo(60);
      expect(primary.getBoundingClientRect()[axis] - initial).toBeCloseTo(length / 10, 0);
      fireEvent.pointerMove(handle, { pointerId: 1, ...position });
      expect(onResize).toHaveBeenCalledTimes(1);
      fireEvent.pointerUp(handle, { pointerId: 1 });
    }
  );

  it.each(['horizontal', 'vertical'] as const)(
    'preserves percentages with root gap and padded panels in %s layout',
    orientation => {
      render(
        <Splitter
          orientation={orientation}
          defaultSizes={[25, 75]}
          gap={16}
          style={{ width: 640, height: 280, padding: 20 }}
        >
          <Splitter.Panel
            id="padded-primary"
            aria-label="Padded panel"
            style={{ padding: 20, border: '2px solid' }}
          >
            Primary
          </Splitter.Panel>
          <Splitter.Panel style={{ padding: 12, border: '2px solid' }}>Secondary</Splitter.Panel>
        </Splitter>
      );
      const handle = screen.getByRole('separator');
      const primary = document.getElementById('padded-primary')!;
      const secondary = handle.nextElementSibling!;
      const axis = orientation === 'horizontal' ? 'width' : 'height';
      const length = panelLength(handle, orientation === 'vertical');
      expect(primary.parentElement!.getBoundingClientRect()[axis]).toBeCloseTo(
        length + handle.getBoundingClientRect()[axis] + 40 + 32
      );
      expect(primary.getBoundingClientRect()[axis]).toBeCloseTo(length / 4);
      expect(secondary.getBoundingClientRect()[axis]).toBeCloseTo((length * 3) / 4);
      fireEvent.keyDown(handle, { key: 'Home' });
      expect(handle).toHaveAttribute('aria-valuenow', '0');
      expect(primary.getBoundingClientRect()[axis]).toBe(0);
      expect(secondary.getBoundingClientRect()[axis]).toBeCloseTo(length);
      fireEvent.keyDown(handle, { key: 'End' });
      expect(handle).toHaveAttribute('aria-valuenow', '100');
      expect(secondary.getBoundingClientRect()[axis]).toBe(0);
      expect(primary.getBoundingClientRect()[axis]).toBeCloseTo(length);
    }
  );

  it('supports a primary touch pointer and ignores other pointers', () => {
    const onResize = vi.fn();
    render(<Layout onResize={onResize} />);
    const handle = screen.getByRole('separator');
    mockCapture(handle);
    startDrag(handle, { pointerId: 2, isPrimary: false });
    fireEvent.pointerMove(handle, { pointerId: 2, clientX: 200 });
    expect(onResize).not.toHaveBeenCalled();
    startDrag(handle, { pointerId: 3, pointerType: 'touch' });
    fireEvent.pointerMove(handle, { pointerId: 4, clientX: 200 });
    expect(onResize).not.toHaveBeenCalled();
    fireEvent.pointerMove(handle, { pointerId: 3, clientX: 100 + panelLength(handle) / 10 });
    expect(onResize).toHaveBeenLastCalledWith([60, 40], expect.any(Object));
    fireEvent.pointerUp(handle, { pointerId: 3 });
  });

  it.each(['pointerUp', 'pointerCancel', 'lostPointerCapture'] as const)(
    'ends %s exactly once and ignores later pointer movement',
    end => {
      const onResize = vi.fn();
      const onResizeEnd = vi.fn();
      render(<Layout onResize={onResize} onResizeEnd={onResizeEnd} />);
      const handle = screen.getByRole('separator');
      const release = mockCapture(handle);
      startDrag(handle);
      fireEvent.pointerMove(handle, { pointerId: 1, clientX: 100 + panelLength(handle) / 10 });
      fireEvent[end](handle, { pointerId: 1 });
      fireEvent.lostPointerCapture(handle, { pointerId: 1 });
      fireEvent.pointerMove(handle, { pointerId: 1, clientX: 300 });
      expect(onResize).toHaveBeenCalledTimes(1);
      expect(onResizeEnd).toHaveBeenCalledTimes(1);
      expect(onResizeEnd).toHaveBeenLastCalledWith([60, 40], expect.any(Object));
      expect(release).toHaveBeenCalledTimes(1);
    }
  );

  it('cancels capture when disabled during a drag', () => {
    const onResize = vi.fn();
    const onResizeEnd = vi.fn();
    const { rerender } = render(<Layout onResize={onResize} onResizeEnd={onResizeEnd} />);
    const handle = screen.getByRole('separator');
    const release = mockCapture(handle);
    startDrag(handle);
    rerender(<Layout disabled onResize={onResize} onResizeEnd={onResizeEnd} />);
    expect(release).toHaveBeenCalledTimes(1);
    fireEvent.pointerMove(handle, { pointerId: 1, clientX: 300 });
    fireEvent.pointerUp(handle, { pointerId: 1 });
    expect(onResize).not.toHaveBeenCalled();
    expect(onResizeEnd).not.toHaveBeenCalled();
  });

  it('releases pointer capture on unmount', () => {
    const onResizeEnd = vi.fn();
    const { unmount } = render(<Layout onResizeEnd={onResizeEnd} />);
    const handle = screen.getByRole('separator');
    const release = mockCapture(handle);
    startDrag(handle);
    unmount();
    expect(release).toHaveBeenCalledTimes(1);
    expect(onResizeEnd).not.toHaveBeenCalled();
  });

  it('discards a pointer gesture when keyboard resizing takes over', () => {
    const onResizeStart = vi.fn();
    const onResizeEnd = vi.fn();
    render(<Layout onResizeStart={onResizeStart} onResizeEnd={onResizeEnd} />);
    const handle = screen.getByRole('separator');
    const release = mockCapture(handle);
    startDrag(handle);
    fireEvent.pointerMove(handle, { pointerId: 1, clientX: 100 + panelLength(handle) / 10 });
    fireEvent.keyDown(handle, { key: 'ArrowRight' });
    fireEvent.pointerUp(handle, { pointerId: 1 });
    expect(release).toHaveBeenCalledTimes(1);
    expect(onResizeStart).toHaveBeenCalledTimes(2);
    expect(onResizeEnd).toHaveBeenCalledTimes(1);
    expect(onResizeEnd).toHaveBeenCalledWith(
      [61, 39],
      expect.objectContaining({ type: 'keydown' })
    );
  });

  it('keeps accepted controlled feedback active and cancels an external reset', () => {
    const onResize = vi.fn();
    let reset: () => void = () => {};
    function Controlled() {
      const [sizes, setSizes] = useState([30, 70]);
      reset = () => setSizes([30, 70]);
      return (
        <Layout
          sizes={sizes}
          onResize={(next, event) => {
            setSizes(next);
            onResize(next, event);
          }}
        />
      );
    }
    render(<Controlled />);
    const handle = screen.getByRole('separator');
    const release = mockCapture(handle);
    const length = panelLength(handle);
    startDrag(handle);
    fireEvent.pointerMove(handle, { pointerId: 1, clientX: 100 + length / 10 });
    expect(handle).toHaveAttribute('aria-valuenow', '40');
    fireEvent.pointerMove(handle, { pointerId: 1, clientX: 100 + length / 5 });
    expect(handle).toHaveAttribute('aria-valuenow', '50');
    // Trigger the owner reset through a real React event.
    render(<button onClick={reset}>Reset</button>);
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(release).toHaveBeenCalledTimes(1);
    fireEvent.pointerMove(handle, { pointerId: 1, clientX: 100 + length / 3 });
    expect(onResize).toHaveBeenCalledTimes(2);
    expect(handle).toHaveAttribute('aria-valuenow', '30');
  });
});
