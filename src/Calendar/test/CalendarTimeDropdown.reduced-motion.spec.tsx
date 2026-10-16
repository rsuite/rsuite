import React from 'react';
import { renderToString } from 'react-dom/server.browser';
import { act, cleanup, render, screen } from '@testing-library/react';
import { commands, userEvent } from 'vitest/browser';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CalendarContainer from '../CalendarContainer';
import { CalendarState } from '../hooks';
import CustomProvider from '../../CustomProvider';
import TimePicker from '../../TimePicker';
import '../../TimePicker/styles/index.scss';

const initial = new Date(2022, 9, 14, 10, 20, 30);
const initialPreference = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ? 'reduce'
  : 'no-preference';
const policies = [undefined, true, false];
const preferences = ['reduce', 'no-preference'] as const;

beforeEach(() => commands.setMotionPreference('no-preference'));
afterEach(async () => {
  cleanup();
  await commands.setMotionPreference(initialPreference);
});

function expectMotion(host: ParentNode, reduced: boolean) {
  const content = host.querySelector('.rs-calendar-time-dropdown-content') as HTMLElement;
  expect(getComputedStyle(content).animationName).toBe(reduced ? 'none' : 'slideDown');
  const columns = host.querySelectorAll<HTMLElement>('[role="listbox"]');
  expect(columns).toHaveLength(3);
  columns.forEach(column => {
    expect(getComputedStyle(column).scrollBehavior).toBe(reduced ? 'auto' : 'smooth');
    if (reduced) {
      column.scrollTop = 0;
      column.scrollTop = 160;
      expect(column.scrollTop).toBe(160);
    }
  });
}

const picker = (reduceMotion?: boolean) => (
  <CustomProvider reduceMotion={reduceMotion}>
    <TimePicker defaultOpen responsive={false} defaultValue={initial} format="HH:mm:ss" />
  </CustomProvider>
);

describe('Time dropdown reduced motion', () => {
  for (const preference of preferences) {
    it.each(policies)(`honors provider %s with system ${preference}`, async policy => {
      await commands.setMotionPreference(preference);
      const { baseElement } = render(picker(policy));
      expectMotion(baseElement, policy ?? preference === 'reduce');
    });

    it.each(policies)(
      `honors provider %s in server markup with system ${preference}`,
      async policy => {
        await commands.setMotionPreference(preference);
        const host = document.createElement('div');
        host.innerHTML = renderToString(
          <CustomProvider reduceMotion={policy}>
            <CalendarContainer
              calendarDate={initial}
              format="HH:mm:ss"
              defaultState={CalendarState.TIME}
            />
          </CustomProvider>
        );
        document.body.appendChild(host);
        try {
          expectMotion(host, policy ?? preference === 'reduce');
        } finally {
          host.remove();
        }
      }
    );
  }

  it('responds to system preference changes while open', async () => {
    const { baseElement } = render(picker());
    expectMotion(baseElement, false);
    await act(() => commands.setMotionPreference('reduce'));
    expectMotion(baseElement, true);
    await act(() => commands.setMotionPreference('no-preference'));
    expectMotion(baseElement, false);
  });

  it('responds to provider changes and resumes the system policy', async () => {
    await commands.setMotionPreference('reduce');
    const { baseElement, rerender } = render(picker(false));
    expectMotion(baseElement, false);
    rerender(picker(true));
    expectMotion(baseElement, true);
    rerender(picker(false));
    expectMotion(baseElement, false);
    rerender(picker());
    expectMotion(baseElement, true);
  });

  it('selects offscreen time values with native pointer input when motion is reduced', async () => {
    const onOk = vi.fn();
    render(
      <CustomProvider reduceMotion>
        <TimePicker
          defaultOpen
          responsive={false}
          defaultValue={initial}
          format="HH:mm:ss"
          onOk={onOk}
        />
      </CustomProvider>
    );
    for (const name of ['22 hours', '52 minutes', '58 seconds']) {
      const option = screen.getByRole('option', { name });
      await act(() => userEvent.click(option));
      expect(option).to.have.attribute('aria-selected', 'true');
    }
    await act(() => userEvent.click(screen.getByRole('button', { name: 'OK' })));
    expect(onOk).toHaveBeenCalledExactlyOnceWith(
      new Date(2022, 9, 14, 22, 52, 58),
      expect.objectContaining({ nativeEvent: expect.objectContaining({ isTrusted: true }) })
    );
  });
});
