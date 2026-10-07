import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import CheckPicker from '..';
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

describe('CheckPicker keyboard value boundaries', () => {
  describe.each(targets)('$name', target => {
    it.each(['option', 'combobox'] as const)(
      'checks and unchecks the raw value once per Enter from %s',
      async enterTarget => {
        const destination = { value: target.value, label: 'Target option' };
        const other = { value: 'safe-other', label: 'Other option' };
        const onChange = vi.fn();
        const onSelect = vi.fn();
        const onEntered = vi.fn();
        const keys: KeyboardEvent[] = [];
        const capture = (event: KeyboardEvent) => keys.push(event);
        render(
          <CheckPicker
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
          expect(option).to.have.attribute('aria-selected', 'false');
          const checkbox = option.querySelector<HTMLInputElement>('input[type="checkbox"]');
          expect(checkbox).not.to.equal(null);
          expect(checkbox).not.to.be.checked;
          for (const checked of [true, false]) {
            const currentOption = screen.getByRole('option', { name: destination.label });
            if (enterTarget === 'combobox') {
              act(() => combobox.focus());
              expect(combobox).to.have.focus;
            } else {
              await waitFor(() => expect(currentOption).to.have.focus);
            }
            expect(document.activeElement).to.equal(
              enterTarget === 'combobox' ? combobox : currentOption
            );
            await nativeKey('Enter');
            const expectedCalls = checked ? 1 : 2;
            const expectedValue = checked ? [target.value] : [];
            console.info(
              '[picker-falsy-native-step]',
              JSON.stringify({
                component: 'CheckPicker',
                target: target.name,
                rawValue: target.value,
                rawType: typeof target.value,
                enterTarget,
                checkedRequested: checked,
                keys: keys.map(event => ({
                  key: event.key,
                  trusted: event.isTrusted,
                  role: (event.target as HTMLElement).getAttribute('role'),
                  dataKey: (event.target as HTMLElement).getAttribute('data-key')
                })),
                changeValues: onChange.mock.calls.map(call => call[0]),
                selectValues: onSelect.mock.calls.map(call => call[0]),
                expanded: combobox.getAttribute('aria-expanded'),
                actualChecked:
                  currentOption.querySelector<HTMLInputElement>('input[type="checkbox"]')?.checked,
                entered: onEntered.mock.calls.length
              })
            );
            expect(keys.map(event => event.key)).to.deep.equal(
              checked ? ['ArrowDown', 'Enter'] : ['ArrowDown', 'Enter', 'Enter']
            );
            expect(keys.every(event => event.isTrusted)).to.be.true;
            expect(onChange).toHaveBeenCalledTimes(expectedCalls);
            expect(onSelect).toHaveBeenCalledTimes(expectedCalls);
            expect(onChange.mock.lastCall?.[0]).to.deep.equal(expectedValue);
            expect(onSelect.mock.lastCall?.[0]).to.deep.equal(expectedValue);
            expect(onSelect.mock.lastCall?.[1]).to.deep.include(destination);
            expect(onSelect.mock.lastCall?.[1].value).to.equal(target.value);
            expect(typeof onSelect.mock.lastCall?.[1].value).to.equal(typeof target.value);
            if (checked) {
              expect(onChange.mock.lastCall?.[0][0]).to.equal(target.value);
              expect(typeof onChange.mock.lastCall?.[0][0]).to.equal(typeof target.value);
            }
            expect(onChange.mock.lastCall?.[1].nativeEvent.isTrusted).to.be.true;
            expect(onSelect.mock.lastCall?.[2].nativeEvent.isTrusted).to.be.true;
            expect(combobox).to.have.attribute('aria-expanded', 'true');
            expect(combobox).to.have.attribute('aria-activedescendant', currentOption.id);
            await waitFor(() =>
              expect(screen.getByRole('option', { name: destination.label })).to.have.attribute(
                'aria-selected',
                String(checked)
              )
            );
            const currentCheckbox = screen
              .getByRole('option', { name: destination.label })
              .querySelector<HTMLInputElement>('input[type="checkbox"]');
            await waitFor(() =>
              expect(currentCheckbox).to.have.attribute('aria-checked', String(checked))
            );
            if (checked) expect(currentCheckbox).to.be.checked;
            else expect(currentCheckbox).not.to.be.checked;
          }
        } finally {
          document.removeEventListener('keydown', capture, true);
        }
      }
    );
  });
});
