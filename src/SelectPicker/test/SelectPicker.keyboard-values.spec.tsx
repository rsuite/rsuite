import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import SelectPicker from '..';
import '../styles/index.scss';

const targets = [
  { name: 'ordinary string control', value: 'normal-target' },
  { name: 'numeric zero', value: 0 },
  { name: 'empty string', value: '' }
];

async function nativeKey(key: string) {
  await act(async () => {
    await userEvent.keyboard(`{${key}}`);
  });
}

describe('SelectPicker keyboard value boundaries', () => {
  describe.each(targets)('$name', target => {
    it.each(['option', 'combobox'] as const)(
      'selects the raw value once on Enter from %s',
      async enterTarget => {
        const destination = { value: target.value, label: 'Target option' };
        const other = { value: 'safe-other', label: 'Other option' };
        const onChange = vi.fn();
        const onSelect = vi.fn();
        const onEntered = vi.fn();
        const keys: KeyboardEvent[] = [];
        const capture = (event: KeyboardEvent) => keys.push(event);
        render(
          <SelectPicker
            data={[destination, other]}
            defaultOpen
            searchable={false}
            onChange={onChange}
            onSelect={onSelect}
            onEntered={onEntered}
          />
        );
        const combobox = screen.getByRole('combobox');
        await waitFor(() => expect(onEntered).toHaveBeenCalledTimes(1));
        expect(combobox).to.have.attribute('aria-expanded', 'true');
        act(() => combobox.focus());
        expect(combobox).to.have.focus;
        document.addEventListener('keydown', capture, true);
        try {
          await nativeKey('ArrowDown');
          expect(keys.map(event => event.key)).to.deep.equal(['ArrowDown']);
          expect(keys.every(event => event.isTrusted)).to.be.true;
          expect(onChange).not.toHaveBeenCalled();
          expect(onSelect).not.toHaveBeenCalled();
          const option = screen.getByRole('option', { name: destination.label });
          expect(option).to.have.attribute('data-key', String(target.value));
          await waitFor(() => expect(option).to.have.focus);
          expect(combobox).to.have.attribute('aria-activedescendant', option.id);
          expect(document.getElementById(option.id)).toBe(option);
          expect(document.getElementById(combobox.getAttribute('aria-controls')!)).to.contain(
            option
          );
          if (enterTarget === 'combobox') {
            act(() => combobox.focus());
            expect(combobox).to.have.focus;
          }
          expect(document.activeElement).to.equal(enterTarget === 'combobox' ? combobox : option);
          await nativeKey('Enter');
          console.info(
            '[picker-falsy-native-step]',
            JSON.stringify({
              component: 'SelectPicker',
              target: target.name,
              rawValue: target.value,
              rawType: typeof target.value,
              enterTarget,
              keys: keys.map(event => ({
                key: event.key,
                trusted: event.isTrusted,
                role: (event.target as HTMLElement).getAttribute('role'),
                dataKey: (event.target as HTMLElement).getAttribute('data-key')
              })),
              changeValues: onChange.mock.calls.map(call => call[0]),
              selectValues: onSelect.mock.calls.map(call => call[0]),
              expanded: combobox.getAttribute('aria-expanded'),
              entered: onEntered.mock.calls.length
            })
          );
          expect(keys.map(event => event.key)).to.deep.equal(['ArrowDown', 'Enter']);
          expect(keys.every(event => event.isTrusted)).to.be.true;
          expect(onChange).toHaveBeenCalledExactlyOnceWith(target.value, expect.anything());
          expect(onSelect).toHaveBeenCalledExactlyOnceWith(
            target.value,
            expect.objectContaining(destination),
            expect.anything()
          );
          expect(typeof onChange.mock.calls[0][0]).to.equal(typeof target.value);
          expect(onSelect.mock.calls[0][1].value).to.equal(target.value);
          expect(typeof onSelect.mock.calls[0][1].value).to.equal(typeof target.value);
          expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
          expect(onSelect.mock.calls[0][2].nativeEvent.isTrusted).to.be.true;
          await waitFor(() => expect(combobox).to.have.text(destination.label));
          await waitFor(() => expect(combobox).to.have.attribute('aria-expanded', 'false'));
          expect(combobox).not.to.have.attribute('aria-activedescendant');
          await waitFor(() => expect(screen.queryByRole('listbox')).toBeNull());
        } finally {
          document.removeEventListener('keydown', capture, true);
        }
      }
    );
  });
});
