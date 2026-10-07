import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { describe, expect, it, vi } from 'vitest';
import SelectPicker from '..';
import '../styles/index.scss';

const targets = [
  { name: 'double quote', value: 'a"b' },
  { name: 'backslash', value: 'a\\b' }
];

async function nativeKey(key: string) {
  await act(async () => {
    await userEvent.keyboard(`{${key}}`);
  });
}

describe('SelectPicker literal option keys', () => {
  describe.each(targets)('$name', target => {
    it.each([false, true])('focuses the literal key with selected source=%s', async selected => {
      const source = { value: 'safe-source', label: 'Source option' };
      const destination = { value: target.value, label: 'Destination option' };
      const onChange = vi.fn();
      const onSelect = vi.fn();
      const keys: KeyboardEvent[] = [];
      const capture = (event: KeyboardEvent) => keys.push(event);
      render(
        <SelectPicker
          data={selected ? [source, destination] : [destination, source]}
          defaultValue={selected ? source.value : undefined}
          defaultOpen
          searchable={false}
          onChange={onChange}
          onSelect={onSelect}
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
        expect(onSelect).not.toHaveBeenCalled();
        const option = screen.getByRole('option', { name: destination.label });
        expect(option).to.have.attribute('data-key', target.value);
        await waitFor(() => expect(option).to.have.focus);
        await nativeKey('Enter');
        expect(keys.map(event => event.key)).to.deep.equal(['ArrowDown', 'Enter']);
        expect(keys.every(event => event.isTrusted)).to.be.true;
        expect(onChange).toHaveBeenCalledExactlyOnceWith(target.value, expect.anything());
        expect(onSelect).toHaveBeenCalledExactlyOnceWith(
          target.value,
          expect.objectContaining(destination),
          expect.anything()
        );
        expect(onChange.mock.calls[0][1].nativeEvent.isTrusted).to.be.true;
      } finally {
        document.removeEventListener('keydown', capture, true);
      }
    });
  });
});
