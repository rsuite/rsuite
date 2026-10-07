import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import MultiCascader from '..';
import '../styles/index.scss';

const targets = [
  { name: 'ordinary string control', value: 'normal-target' },
  { name: 'double quote', value: 'a"b' },
  { name: 'backslash', value: 'a\\b' },
  { name: 'numeric zero', value: 0 },
  { name: 'empty string', value: '' }
];

async function nativeKey(key: string) {
  await act(async () => {
    await userEvent.keyboard(`{${key}}`);
  });
}

describe('MultiCascader keyboard value boundaries', () => {
  describe.each(targets)('$name', target => {
    it.each(['treeitem', 'combobox'] as const)(
      'checks and unchecks the raw value once per Enter from %s',
      async enterTarget => {
        const destination = { value: target.value, label: 'Target option' };
        const other = { value: 'safe-other', label: 'Other option' };
        const onChange = vi.fn();
        const onCheck = vi.fn();
        const keys: KeyboardEvent[] = [];
        const capture = (event: KeyboardEvent) => keys.push(event);
        render(
          <MultiCascader
            data={[destination, other]}
            defaultOpen
            searchable={false}
            columnHeight={180}
            onChange={onChange}
            onCheck={onCheck}
          />
        );
        const combobox = screen.getByRole('combobox');
        await waitFor(() => expect(combobox).to.have.attribute('aria-expanded', 'true'));
        act(() => combobox.focus());
        expect(combobox).to.have.focus;
        document.addEventListener('keydown', capture, true);
        try {
          await nativeKey('ArrowDown');
          expect(keys.map(event => event.key)).to.deep.equal(['ArrowDown']);
          expect(keys.every(event => event.isTrusted)).to.be.true;
          expect(onChange).not.toHaveBeenCalled();
          expect(onCheck).not.toHaveBeenCalled();
          const option = screen.getByRole('treeitem', { name: destination.label });
          expect(option).to.have.attribute('data-key', String(target.value));
          await waitFor(() => expect(option).to.have.focus);
          const checkbox = option.querySelector<HTMLInputElement>('input[type="checkbox"]');
          expect(checkbox).not.to.equal(null);
          expect(checkbox).to.have.attribute('aria-checked', 'false');
          expect(checkbox).not.to.be.checked;
          for (const checked of [true, false]) {
            if (enterTarget === 'combobox') {
              act(() => combobox.focus());
              expect(combobox).to.have.focus;
            } else {
              await waitFor(
                () =>
                  expect(screen.getByRole('treeitem', { name: destination.label })).to.have.focus
              );
            }
            await nativeKey('Enter');
            const expectedCalls = checked ? 1 : 2;
            const expectedValue = checked ? [target.value] : [];
            expect(keys.map(event => event.key)).to.deep.equal(
              checked ? ['ArrowDown', 'Enter'] : ['ArrowDown', 'Enter', 'Enter']
            );
            expect(keys.every(event => event.isTrusted)).to.be.true;
            expect(onChange).toHaveBeenCalledTimes(expectedCalls);
            expect(onCheck).toHaveBeenCalledTimes(expectedCalls);
            expect(onChange.mock.lastCall?.[0]).to.deep.equal(expectedValue);
            expect(onCheck.mock.lastCall?.[0]).to.deep.equal(expectedValue);
            expect(onCheck.mock.lastCall?.[1]).to.deep.include(destination);
            expect(onCheck.mock.lastCall?.[1].value).to.equal(target.value);
            expect(typeof onCheck.mock.lastCall?.[1].value).to.equal(typeof target.value);
            expect(onCheck.mock.lastCall?.[2]).to.equal(checked);
            expect(onChange.mock.lastCall?.[1].nativeEvent.isTrusted).to.be.true;
            expect(onCheck.mock.lastCall?.[3].nativeEvent.isTrusted).to.be.true;
            await waitFor(() => expect(combobox).to.have.attribute('aria-expanded', 'true'));
            const currentOption = screen.getByRole('treeitem', { name: destination.label });
            const currentCheckbox =
              currentOption.querySelector<HTMLInputElement>('input[type="checkbox"]');
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
