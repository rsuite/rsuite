import React from 'react';
import SelectPicker from '../SelectPicker';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@vitest/browser/context';
import { expect, it, vi } from 'vitest';
import '../styles/index.scss';

// This native keyboard integration runs in the serial *.keyboard.test.tsx CI step.
it('Should retain focus across consecutive native Arrow keys and select beyond the virtual window', async () => {
  const onChange = vi.fn();
  render(
    <SelectPicker
      defaultOpen
      virtualized
      searchable={false}
      data={Array.from({ length: 1000 }, (_, index) => ({
        label: `Option ${index + 1}`,
        value: index + 1
      }))}
      listboxMaxHeight={180}
      listProps={{ itemSize: 36, overscanCount: 0 }}
      onChange={onChange}
    />
  );

  await act(async () => {
    // Focus the toggle once; all subsequent keys must follow the option's native focus.
    await userEvent.type(screen.getByRole('combobox'), '{ArrowDown}');
  });
  expect(screen.getByRole('option', { name: 'Option 1' })).to.have.focus;

  await act(async () => {
    await userEvent.keyboard('{ArrowDown}');
  });
  expect(screen.getByRole('option', { name: 'Option 2' })).to.have.focus;

  for (let index = 0; index < 18; index++) {
    await act(async () => {
      await userEvent.keyboard('{ArrowDown}');
    });
  }
  expect(screen.getByRole('option', { name: 'Option 20' })).to.have.focus;

  await act(async () => {
    await userEvent.keyboard('{Enter}');
  });
  expect(onChange).toHaveBeenCalledExactlyOnceWith(20, expect.anything());
  expect(screen.getByRole('combobox')).to.have.focus;
});
