import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputPicker from '../InputPicker';
import TagPicker from '../../TagPicker';

const data = [{ label: 'Bravo', value: 'bravo' }];

describe.each([
  ['InputPicker', InputPicker],
  ['TagPicker', TagPicker]
] as const)('%s', (_name, Picker) => {
  it('blocks option selection when disabled while open', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(<Picker data={data} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByText('Bravo')).toBeTruthy();

    rerender(<Picker data={data} onChange={onChange} disabled />);
    await user.click(screen.getByText('Bravo'));
    expect(onChange).not.toHaveBeenCalled();

    rerender(<Picker data={data} onChange={onChange} />);
    await user.click(screen.getByText('Bravo'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
