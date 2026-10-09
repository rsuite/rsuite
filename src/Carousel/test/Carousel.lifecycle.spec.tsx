import React from 'react';
import { act, cleanup, render, screen, within } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { afterEach, describe, expect, it } from 'vitest';
import Carousel from '../Carousel';

const Activity = (
  React as typeof React & {
    Activity?: React.ComponentType<{
      mode: 'visible' | 'hidden';
      children: React.ReactNode;
    }>;
  }
).Activity;

afterEach(cleanup);

const slides = [<div key="a">Slide A</div>, <div key="b">Slide B</div>, <div key="c">Slide C</div>];

function expectSelected(name: string, index: number) {
  const slider = within(screen.getByTestId('carousel-slider'));
  expect(slider.getByText(name).getAttribute('aria-hidden')).toBe('false');
  expect((screen.getAllByRole('radio')[index] as HTMLInputElement).checked).toBe(true);
}

describe('Carousel selection lifecycle', () => {
  it.each([false, true])('preserves the default selection on mount (StrictMode=%s)', strict => {
    const content = <Carousel defaultActiveIndex={2}>{slides}</Carousel>;
    render(strict ? <React.StrictMode>{content}</React.StrictMode> : content);
    expectSelected('Slide C', 2);
  });

  it.each([false, true])(
    'resets uncontrolled selection on children updates (StrictMode=%s)',
    strict => {
      const Wrapper = strict ? React.StrictMode : React.Fragment;
      const ui = (children: React.ReactNode) => (
        <Wrapper>
          <Carousel defaultActiveIndex={2}>{children}</Carousel>
        </Wrapper>
      );
      const view = render(ui(slides));
      expectSelected('Slide C', 2);
      view.rerender(ui([slides[0], slides[1]]));
      expectSelected('Slide A', 0);
    }
  );

  it.each([false, true])(
    'keeps controlled selection on children updates (StrictMode=%s)',
    strict => {
      const Wrapper = strict ? React.StrictMode : React.Fragment;
      const ui = (children: React.ReactNode) => (
        <Wrapper>
          <Carousel activeIndex={1}>{children}</Carousel>
        </Wrapper>
      );
      const view = render(ui(slides));
      view.rerender(ui([slides[0], slides[1]]));
      expectSelected('Slide B', 1);
    }
  );

  it.skipIf(!Activity).each([false, true])(
    'preserves a user selection when Activity reconnects (StrictMode=%s)',
    async strict => {
      const Boundary = Activity!;
      const Wrapper = strict ? React.StrictMode : React.Fragment;
      const ui = (mode: 'visible' | 'hidden') => (
        <Wrapper>
          <Boundary mode={mode}>
            <Carousel>{slides}</Carousel>
          </Boundary>
        </Wrapper>
      );
      const view = render(ui('visible'));
      const radios = screen.getAllByRole('radio');
      const trusted: boolean[] = [];
      radios[1].addEventListener('change', event => trusted.push(event.isTrusted));
      await act(() => userEvent.click(radios[1]));
      expect(trusted).toEqual([true]);
      expectSelected('Slide B', 1);
      const slider = screen.getByTestId('carousel-slider');
      view.rerender(ui('hidden'));
      view.rerender(ui('visible'));
      expect(screen.getByTestId('carousel-slider')).toBe(slider);
      expectSelected('Slide B', 1);
    }
  );

  it.skipIf(!Activity).each([false, true])(
    'applies hidden children changes (controlled=%s)',
    controlled => {
      const Boundary = Activity!;
      const ui = (mode: 'visible' | 'hidden', children: React.ReactNode) => (
        <React.StrictMode>
          <Boundary mode={mode}>
            <Carousel activeIndex={controlled ? 1 : undefined} defaultActiveIndex={2}>
              {children}
            </Carousel>
          </Boundary>
        </React.StrictMode>
      );
      const view = render(ui('visible', slides));
      const reduced = [slides[0], slides[1]];
      view.rerender(ui('hidden', reduced));
      view.rerender(ui('visible', reduced));
      expectSelected(controlled ? 'Slide B' : 'Slide A', controlled ? 1 : 0);
    }
  );
});
