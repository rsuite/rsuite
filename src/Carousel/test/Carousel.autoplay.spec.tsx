import React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Carousel from '..';
import CustomProvider from '../../CustomProvider';
import zhCN from '../../locales/zh_CN';

const slides = [<div key="first">First</div>, <div key="second">Second</div>];
const tick = (ms = 1000) => act(() => vi.advanceTimersByTime(ms));

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('Carousel autoplay lifecycle', () => {
  it.each([0, 1])('does not offer playback or run a timer with %i slides', count => {
    const onSlideStart = vi.fn();
    render(
      <Carousel autoplay onSlideStart={onSlideStart}>
        {slides.slice(0, count)}
      </Carousel>
    );
    expect(screen.queryByRole('button')).toBeNull();
    tick(10000);
    expect(onSlideStart).not.toHaveBeenCalled();
  });

  it('cancels timers when autoplay is disabled and when the component unmounts', () => {
    const onSlideStart = vi.fn();
    const view = render(
      <Carousel autoplay autoplayInterval={1000} onSlideStart={onSlideStart}>
        {slides}
      </Carousel>
    );
    tick();
    expect(onSlideStart).toHaveBeenCalledTimes(1);
    view.rerender(
      <Carousel autoplay={false} autoplayInterval={1000} onSlideStart={onSlideStart}>
        {slides}
      </Carousel>
    );
    expect(screen.queryByRole('button')).toBeNull();
    tick();
    expect(onSlideStart).toHaveBeenCalledTimes(1);
    view.rerender(
      <Carousel autoplay autoplayInterval={1000} onSlideStart={onSlideStart}>
        {slides}
      </Carousel>
    );
    tick();
    expect(onSlideStart).toHaveBeenCalledTimes(2);
    view.unmount();
    tick();
    expect(onSlideStart).toHaveBeenCalledTimes(2);
  });

  it('uses an updated interval and callback without replaying an old timer', () => {
    const first = vi.fn();
    const latest = vi.fn();
    const view = render(
      <Carousel autoplay autoplayInterval={1000} onSlideStart={first}>
        {slides}
      </Carousel>
    );
    tick(500);
    view.rerender(
      <Carousel autoplay autoplayInterval={2000} onSlideStart={latest}>
        {slides}
      </Carousel>
    );
    tick(1999);
    expect(first).not.toHaveBeenCalled();
    expect(latest).not.toHaveBeenCalled();
    tick(1);
    expect(latest).toHaveBeenCalledWith(1, undefined);
  });

  it('retains controlled ownership and composes focus and hover callbacks', () => {
    const onSlideStart = vi.fn();
    const onFocusCapture = vi.fn();
    const onPointerEnter = vi.fn();
    const onPointerLeave = vi.fn();
    render(
      <Carousel
        data-testid="carousel"
        activeIndex={0}
        autoplay
        autoplayInterval={1000}
        onSlideStart={onSlideStart}
        onFocusCapture={onFocusCapture}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        {slides}
      </Carousel>
    );
    tick();
    expect(onSlideStart).toHaveBeenCalledWith(1, undefined);
    expect(screen.getAllByRole('radio')[0]).toBeChecked();
    const carousel = screen.getByTestId('carousel');
    fireEvent.pointerEnter(carousel, { pointerType: 'mouse' });
    tick();
    fireEvent.pointerLeave(carousel, { pointerType: 'mouse' });
    fireEvent.focus(screen.getAllByRole('radio')[0]);
    tick();
    expect(onSlideStart).toHaveBeenCalledTimes(1);
    expect(onPointerEnter).toHaveBeenCalledTimes(1);
    expect(onPointerLeave).toHaveBeenCalledTimes(1);
    expect(onFocusCapture).toHaveBeenCalledTimes(1);
  });

  it('keeps the pause local to the focused carousel', () => {
    const first = vi.fn();
    const second = vi.fn();
    render(
      <>
        <Carousel autoplay autoplayInterval={1000} onSlideStart={first}>
          {slides}
        </Carousel>
        <Carousel autoplay autoplayInterval={1000} onSlideStart={second}>
          {slides}
        </Carousel>
      </>
    );
    fireEvent.focus(screen.getAllByRole('radio')[0]);
    tick();
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledWith(1, undefined);
  });

  it('merges rotation labels from the provider and a partial component locale', () => {
    render(
      <CustomProvider locale={zhCN}>
        <Carousel autoplay locale={{ startRotation: 'Resume stories' }}>
          {slides}
        </Carousel>
      </CustomProvider>
    );
    const stop = screen.getByRole('button', { name: '停止自动播放' });
    fireEvent.focus(stop);
    expect(screen.getByRole('button', { name: 'Resume stories' })).toBe(stop);
  });

  it('accepts older provider translations with no rotation labels', () => {
    render(
      <CustomProvider
        locale={{ Carousel: { selectSlide: 'Choose story', slideLabel: 'Story {0}/{1}' } }}
      >
        <Carousel autoplay>{slides}</Carousel>
      </CustomProvider>
    );
    expect(screen.getByRole('button', { name: 'Stop slide rotation' })).toBeTruthy();
    expect(screen.getByRole('radiogroup', { name: 'Choose story' })).toBeTruthy();
  });
});
