import React, { StrictMode } from 'react';
import AutoSizer from '../AutoSizer';
import { describe, expect, it, vi } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';

function DefaultChildComponent({ height, width, foo, bar }) {
  return <div>{`width:${width}, height:${height}, foo:${foo}, bar:${bar}`}</div>;
}

describe('AutoSizer', () => {
  const Container = props => {
    const {
      bar = 123,
      ChildComponent = DefaultChildComponent,
      className = undefined,
      defaultHeight = undefined,
      defaultWidth = undefined,
      disableHeight = false,
      disableWidth = false,
      foo = 456,
      height = 100,
      onResize,
      paddingBottom = 0,
      paddingLeft = 0,
      paddingRight = 0,
      paddingTop = 0,
      style = undefined,
      width = 200,
      ...rest
    } = props;

    const wrapperStyle = {
      boxSizing: 'border-box',
      height,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
      width
    } as const;

    return (
      <div style={wrapperStyle}>
        <AutoSizer
          className={className}
          defaultHeight={defaultHeight}
          defaultWidth={defaultWidth}
          disableHeight={disableHeight}
          disableWidth={disableWidth}
          onResize={onResize}
          style={style}
          {...rest}
        >
          {({ height, width }) => (
            <ChildComponent
              width={disableWidth ? undefined : width}
              height={disableHeight ? undefined : height}
              bar={bar}
              foo={foo}
            />
          )}
        </AutoSizer>
      </div>
    );
  };

  it('should relay properties to ChildComponent or React child', () => {
    const { container } = render(<Container />);
    expect(container).to.contain.text('foo:456');
    expect(container).to.contain.text('bar:123');
  });

  it('should set the correct initial width and height of ChildComponent or React child', () => {
    const { container } = render(<Container />);

    expect(container).to.contain.text('height:100');
    expect(container).to.contain.text('width:200');
  });

  it('should account for padding when calculating the available width and height', () => {
    const { container } = render(
      <Container paddingBottom={10} paddingLeft={4} paddingRight={4} paddingTop={15} />
    );

    expect(container).to.contain.text('height:75');
    expect(container).to.contain.text('width:192');
  });

  it('should not update :width if :disableWidth is true', () => {
    const { container } = render(<Container disableWidth />);

    expect(container).to.contain.text('height:100');
    expect(container).to.contain.text('width:undefined');
  });

  it('should not update :height if :disableHeight is true', () => {
    const { container } = render(<Container disableHeight />);

    expect(container).to.contain.text('height:undefined');
    expect(container).to.contain.text('width:200');
  });

  describe.each([false, true])('resize observation (StrictMode=%s)', strict => {
    const wrapper = strict ? StrictMode : React.Fragment;

    it.each([
      { name: 'matching defaults', padding: 0 },
      { name: 'matching content dimensions with padding', padding: 10 }
    ])('should observe later resizes with $name', async ({ padding }) => {
      const onResize = vi.fn();
      const { getByTestId } = render(
        <div
          data-testid="parent"
          style={{ width: 200, height: 100, padding, boxSizing: 'border-box' }}
        >
          <AutoSizer
            defaultWidth={200 - padding * 2}
            defaultHeight={100 - padding * 2}
            onResize={onResize}
          >
            {({ width, height }) => <output data-testid="size">{`${width}x${height}`}</output>}
          </AutoSizer>
        </div>,
        { wrapper }
      );
      const parent = getByTestId('parent');
      expect(getByTestId('size').textContent).toBe(`${200 - padding * 2}x${100 - padding * 2}`);
      expect(onResize).not.toHaveBeenCalled();

      // Change layout without a React render, as a surrounding CSS layout would.
      act(() => Object.assign(parent.style, { width: '320px', height: '160px' }));
      await waitFor(() =>
        expect(getByTestId('size').textContent).toBe(`${320 - padding * 2}x${160 - padding * 2}`)
      );
      expect(onResize).toHaveBeenLastCalledWith({ width: 320, height: 160 });

      act(() => Object.assign(parent.style, { width: '150px', height: '80px' }));
      await waitFor(() =>
        expect(getByTestId('size').textContent).toBe(`${150 - padding * 2}x${80 - padding * 2}`)
      );
      expect(onResize).toHaveBeenCalledTimes(2);
      expect(onResize).toHaveBeenLastCalledWith({ width: 150, height: 80 });
    });

    it('measures React-driven parent dimensions before the next paint', () => {
      const onResize = vi.fn();
      const view = (width: number, height: number) => (
        <Container
          width={width}
          height={height}
          defaultWidth={200}
          defaultHeight={100}
          onResize={onResize}
        />
      );
      const { container, rerender } = render(view(200, 100), { wrapper });
      const child = container.firstElementChild?.firstElementChild?.firstElementChild;
      expect(onResize).not.toHaveBeenCalled();

      for (const [index, [width, height]] of [
        [320, 160],
        [150, 80],
        [0, 0],
        [200, 100]
      ].entries()) {
        rerender(view(width, height));
        expect(container).to.contain.text(`width:${width}, height:${height}`);
        expect(container.firstElementChild?.firstElementChild?.firstElementChild).toBe(child);
        expect(onResize).toHaveBeenCalledTimes(index + 1);
        expect(onResize).toHaveBeenLastCalledWith({ width, height });
        rerender(view(width, height));
        expect(onResize).toHaveBeenCalledTimes(index + 1);
      }
    });

    it('measures React-driven padding changes with an unchanged outer size', () => {
      const onResize = vi.fn();
      const view = (padding: number) => (
        <Container
          defaultWidth={200}
          defaultHeight={100}
          paddingTop={padding}
          paddingBottom={padding}
          paddingLeft={padding}
          paddingRight={padding}
          onResize={onResize}
        />
      );
      const { container, rerender } = render(view(0), { wrapper });
      rerender(view(10));
      expect(container).to.contain.text('width:180, height:80');
      expect(onResize).toHaveBeenCalledExactlyOnceWith({ width: 200, height: 100 });
      rerender(view(0));
      expect(container).to.contain.text('width:200, height:100');
      expect(onResize).toHaveBeenCalledTimes(2);
    });

    it.each(['width', 'height'])(
      'keeps the %s axis disabled during a React-driven resize',
      disabled => {
        const view = (width: number, height: number) => (
          <Container
            width={width}
            height={height}
            disableWidth={disabled === 'width'}
            disableHeight={disabled === 'height'}
          />
        );
        const { container, rerender } = render(view(200, 100), { wrapper });
        rerender(view(320, 160));
        expect(container).to.contain.text(
          disabled === 'width' ? 'width:undefined, height:160' : 'width:320, height:undefined'
        );
      }
    );

    it('should measure a parent revealed after initially mounting hidden', async () => {
      const { getByTestId } = render(
        <div data-testid="parent" style={{ display: 'none', width: 200, height: 100 }}>
          <AutoSizer>
            {({ width, height }) => <output data-testid="size">{`${width}x${height}`}</output>}
          </AutoSizer>
        </div>,
        { wrapper }
      );
      const parent = getByTestId('parent');
      expect(getByTestId('size').textContent).toBe('0x0');
      act(() => {
        parent.style.display = 'block';
      });
      await waitFor(() => expect(getByTestId('size').textContent).toBe('200x100'));
      act(() => Object.assign(parent.style, { width: '320px', height: '160px' }));
      await waitFor(() => expect(getByTestId('size').textContent).toBe('320x160'));
    });
  });
});
