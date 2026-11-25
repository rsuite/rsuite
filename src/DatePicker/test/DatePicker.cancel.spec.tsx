import React, { useState } from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from 'vitest/browser';
import { describe, expect, it, vi } from 'vitest';
import DatePicker from '..';
import TimePicker from '../../TimePicker';
import CustomProvider from '../../CustomProvider';
import '../styles/index.scss';

const pickers = [
  {
    name: 'DatePicker',
    Component: DatePicker,
    format: 'yyyy-MM-dd',
    initial: new Date(2022, 9, 14),
    changed: new Date(2022, 9, 13),
    role: 'gridcell',
    initialLabel: '14 Oct 2022',
    changedLabel: '13 Oct 2022',
    initialText: '2022-10-14',
    changedText: '2022-10-13'
  },
  {
    name: 'TimePicker',
    Component: TimePicker,
    format: 'HH:mm',
    initial: new Date(2022, 9, 14, 10, 20),
    changed: new Date(2022, 9, 14, 11, 20),
    role: 'option',
    initialLabel: '10 hours',
    changedLabel: '11 hours',
    initialText: '10:20',
    changedText: '11:20'
  }
];

describe.each(pickers)('$name pending selection', picker => {
  const { Component, initial, changed } = picker;
  describe.each([false, true])('controlled=%s', controlled => {
    it.each(['outside click', 'Escape on input', 'Escape on popup', 'Tab on input', 'OK'])(
      'reopens with the committed date after %s',
      async dismissal => {
        const onChange = vi.fn();
        const onClose = vi.fn();
        const onOk = vi.fn();
        const keys: KeyboardEvent[] = [];
        const capture = (event: KeyboardEvent) => keys.push(event);
        function Fixture() {
          const [value, setValue] = useState<Date | null>(initial);
          return (
            <CustomProvider reduceMotion>
              <Component
                defaultOpen
                responsive={false}
                format={picker.format}
                defaultValue={controlled ? undefined : initial}
                value={controlled ? value : undefined}
                onChange={(date, event) => {
                  onChange(date, event);
                  if (controlled) setValue(date);
                }}
                onClose={onClose}
                onOk={onOk}
              />
              <button type="button">Outside</button>
            </CustomProvider>
          );
        }
        render(<Fixture />);
        const input = screen.getByRole('textbox') as HTMLInputElement;
        expect(screen.getByRole(picker.role, { name: picker.initialLabel })).to.have.attribute(
          'aria-selected',
          'true'
        );
        await act(() =>
          userEvent.click(screen.getByRole(picker.role, { name: picker.changedLabel }))
        );
        expect(screen.getByRole(picker.role, { name: picker.changedLabel })).to.have.attribute(
          'aria-selected',
          'true'
        );
        expect(input.value).toBe(picker.initialText);
        expect(onChange).not.toHaveBeenCalled();
        document.addEventListener('keydown', capture, true);
        try {
          if (dismissal.startsWith('Escape') || dismissal === 'Tab on input') {
            const key = dismissal.startsWith('Tab') ? 'Tab' : 'Escape';
            const target = dismissal.endsWith('on input') ? input : screen.getByRole('dialog');
            act(() => target.focus());
            expect(target).to.have.focus;
            // Flush keydown dismissal before the document's keyup listener, as in a browser.
            await act(() => userEvent.keyboard(`{${key}>}`));
            await act(() => userEvent.keyboard(`{/${key}}`));
            expect(keys.map(event => event.key)).toEqual([key]);
            expect(keys[0].isTrusted).toBe(true);
          } else {
            await act(() =>
              userEvent.click(
                screen.getByRole('button', {
                  name: dismissal === 'OK' ? 'OK' : 'Outside'
                })
              )
            );
          }
          await waitFor(() => expect(screen.queryByRole('dialog')).not.to.exist);
          expect(onClose).toHaveBeenCalledOnce();
          const confirmed = dismissal === 'OK';
          expect(input.value).toBe(confirmed ? picker.changedText : picker.initialText);
          if (confirmed) {
            expect(onChange).toHaveBeenCalledExactlyOnceWith(changed, expect.anything());
            expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).toBe(true);
            expect(onOk).toHaveBeenCalledOnce();
          } else {
            expect(onChange).not.toHaveBeenCalled();
            expect(onOk).not.toHaveBeenCalled();
          }
          await act(() => userEvent.click(input));
          await waitFor(() => {
            expect(
              screen.getByRole(picker.role, {
                name: confirmed ? picker.changedLabel : picker.initialLabel
              })
            ).to.have.attribute('aria-selected', 'true');
          });
          expect(onClose).toHaveBeenCalledOnce();
        } finally {
          document.removeEventListener('keydown', capture, true);
        }
      }
    );
  });
});
