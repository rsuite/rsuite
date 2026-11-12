import React from 'react';
import { expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AutoComplete from '../AutoComplete';

it('ignores selection from a controlled open list while disabled', async () => {
  const onChange = vi.fn();
  const onSelect = vi.fn();
  const props = { open: true, value: 'Br', data: ['Bravo'], onChange, onSelect };
  const { rerender } = render(<AutoComplete {...props} />);

  expect(await screen.findByRole('option', { name: 'Bravo' })).toBeTruthy();
  rerender(<AutoComplete {...props} disabled />);
  expect(screen.queryByRole('option', { name: 'Bravo' })).toBeNull();
  expect(onChange).not.toHaveBeenCalled();
  expect(onSelect).not.toHaveBeenCalled();

  rerender(<AutoComplete {...props} />);
  fireEvent.click(await screen.findByRole('option', { name: 'Bravo' }));
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onSelect).toHaveBeenCalledTimes(1);
});
