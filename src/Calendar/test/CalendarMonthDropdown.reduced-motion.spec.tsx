import React from 'react';
import { renderToString } from 'react-dom/server.browser';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { commands, userEvent } from '@vitest/browser/context';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import CalendarContainer from '../CalendarContainer';
import { CalendarState } from '../hooks';
import CustomProvider from '../../CustomProvider';
import DatePicker from '../../DatePicker';
import '../../DatePicker/styles/index.scss';

const initial = new Date(2022, 9, 14);
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
  const content = host.querySelector('.rs-calendar-month-dropdown-scroll') as HTMLElement;
  expect(getComputedStyle(content).animationName).toBe(reduced ? 'none' : 'slideDown');
}

const calendar = (reduceMotion?: boolean) => (
  <CustomProvider reduceMotion={reduceMotion}>
    <CalendarContainer
      calendarDate={initial}
      format="yyyy-MM-dd"
      defaultState={CalendarState.MONTH}
    />
  </CustomProvider>
);

describe('Month dropdown reduced motion', () => {
  for (const preference of preferences) {
    it.each(policies)(`honors provider %s with system ${preference}`, async policy => {
      await commands.setMotionPreference(preference);
      const { container } = render(calendar(policy));
      expectMotion(container, policy ?? preference === 'reduce');
    });

    it.each(policies)(
      `honors provider %s in server markup with system ${preference}`,
      async policy => {
        await commands.setMotionPreference(preference);
        const host = document.createElement('div');
        host.innerHTML = renderToString(calendar(policy));
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
    const { container } = render(calendar());
    expectMotion(container, false);
    await act(() => commands.setMotionPreference('reduce'));
    expectMotion(container, true);
    await act(() => commands.setMotionPreference('no-preference'));
    expectMotion(container, false);
  });

  it('responds to provider changes and resumes the system policy', async () => {
    await commands.setMotionPreference('reduce');
    const { container, rerender } = render(calendar(false));
    expectMotion(container, false);
    rerender(calendar(true));
    expectMotion(container, true);
    rerender(calendar(false));
    expectMotion(container, false);
    rerender(calendar());
    expectMotion(container, true);
  });

  it('selects a month and date with native pointer input when motion is reduced', async () => {
    const onOk = vi.fn();
    render(
      <CustomProvider reduceMotion>
        <DatePicker
          defaultOpen
          responsive={false}
          defaultValue={initial}
          format="yyyy-MM-dd"
          onOk={onOk}
        />
      </CustomProvider>
    );
    await act(() => userEvent.click(screen.getByRole('button', { name: 'Select month' })));
    expectMotion(document.body, true);
    const month = screen.getByRole('gridcell', { name: 'Nov 2022' });
    // The virtual list disables pointer events until its initial scroll settles.
    await waitFor(() => expect(getComputedStyle(month).pointerEvents).toBe('auto'));
    await act(() => userEvent.click(month));
    await act(() => userEvent.click(screen.getByRole('gridcell', { name: '14 Nov 2022' })));
    await act(() => userEvent.click(screen.getByRole('button', { name: 'OK' })));
    expect(onOk).toHaveBeenCalledExactlyOnceWith(
      new Date(2022, 10, 14),
      expect.objectContaining({ nativeEvent: expect.objectContaining({ isTrusted: true }) })
    );
  });
});
