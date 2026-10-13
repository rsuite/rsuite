import React from 'react';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import InputPicker from '../../../InputPicker';
import TagPicker from '../../../TagPicker';
import AutoComplete from '../../../AutoComplete';
import CustomProvider from '../../../CustomProvider';
import '../../../InputPicker/styles/index.scss';
import '../../../TagPicker/styles/index.scss';
import '../../../AutoComplete/styles/index.scss';

const cases = [
  { name: 'InputPicker', Component: InputPicker, multiple: false, gap: false },
  { name: 'TagPicker', Component: TagPicker, multiple: true, gap: false },
  { name: 'AutoComplete', Component: AutoComplete, multiple: false, gap: false },
  {
    name: 'InputPicker with disabled boundaries and gaps',
    Component: InputPicker,
    multiple: false,
    gap: true
  },
  {
    name: 'TagPicker with disabled boundaries and gaps',
    Component: TagPicker,
    multiple: true,
    gap: true
  }
];

describe.each(cases)('$name native keyboard scrolling', testCase => {
  it.each(['ArrowDown', 'ArrowUp'])(
    'keeps the active option visible with %s while the input retains focus',
    async key => {
      const Component = testCase.Component as React.ElementType;
      const data = Array.from({ length: testCase.gap ? 40 : 3 }, (_, value) => ({
        value: `value${value}`,
        label: `Option ${value}`
      }));
      const enabled = testCase.gap ? [4, 25, 35] : [0, 1, 2];
      const initial = data[enabled[0]].value;
      const targets =
        key === 'ArrowDown'
          ? [enabled[1], enabled[2], enabled[0], enabled[1]]
          : [enabled[2], enabled[1], enabled[0], enabled[2]];
      const onChange = vi.fn();
      const onSelect = vi.fn();
      const keys: KeyboardEvent[] = [];
      const capture = (event: KeyboardEvent) => keys.push(event);
      render(
        <CustomProvider reduceMotion>
          <Component
            data={data}
            defaultValue={testCase.multiple ? [initial] : initial}
            open
            filterBy={() => true}
            disabledItemValues={
              testCase.gap
                ? data.filter((_, index) => !enabled.includes(index)).map(item => item.value)
                : undefined
            }
            onChange={onChange}
            onSelect={onSelect}
            renderListbox={listbox =>
              React.cloneElement(listbox, {
                style: {
                  ...listbox.props.style,
                  maxHeight: 72,
                  overflowY: 'auto',
                  border: '2px solid transparent'
                }
              })
            }
          />
        </CustomProvider>
      );
      const input = screen.getByRole('combobox');
      expect(input.tagName).toBe('INPUT');
      act(() => input.focus());
      const pageTop = window.scrollY;
      document.addEventListener('keydown', capture, true);
      try {
        for (const value of targets) {
          await act(() => userEvent.keyboard(`{${key}}`));
          await waitFor(() => {
            const listbox = document.getElementById(input.getAttribute('aria-controls')!)!;
            const option = within(listbox).getByRole('option', {
              name: `Option ${value}`
            });
            const bounds = option.getBoundingClientRect();
            const top = listbox.getBoundingClientRect().top + listbox.clientTop;
            expect(input).to.have.focus;
            expect(input).to.have.attribute('aria-activedescendant', option.id);
            expect(document.getElementById(input.getAttribute('aria-controls')!)).to.contain(
              option
            );
            expect(listbox.clientTop).toBe(2);
            expect(bounds.height).toBeGreaterThan(0);
            expect(listbox.scrollHeight).toBeGreaterThan(listbox.clientHeight);
            expect(bounds.top).toBeGreaterThanOrEqual(top - 1);
            expect(bounds.bottom).toBeLessThanOrEqual(top + listbox.clientHeight + 1);
          });
          expect(window.scrollY).toBe(pageTop);
        }
        expect(keys.map(event => event.key)).toEqual(targets.map(() => key));
        expect(keys.every(event => event.isTrusted)).toBe(true);
        expect(onChange).not.toHaveBeenCalled();
        expect(onSelect).not.toHaveBeenCalled();
      } finally {
        document.removeEventListener('keydown', capture, true);
      }
    }
  );
});
