import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SelectPicker from '../SelectPicker';
import Cascader from '../../Cascader';
import '../styles/index.scss';
import '../../Cascader/styles/index.scss';

const values = ['quoted"value', 'left\\right'];

describe('Picker values treated as literal keys', () => {
  it.each(values)('SelectPicker focuses and selects the literal value %j', value => {
    const onChange = vi.fn();
    render(
      <SelectPicker
        defaultOpen
        searchable={false}
        onChange={onChange}
        data={[
          { label: 'Target', value },
          { label: 'Decoy', value: 'leftright' }
        ]}
      />
    );

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });

    expect(document.activeElement?.getAttribute('data-key')).toBe(value);
    expect(document.activeElement).toBe(screen.getByRole('option', { name: 'Target' }));
    fireEvent.keyDown(document.activeElement!, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledExactlyOnceWith(value, expect.any(Object));
  });

  it.each(values)('Cascader focuses and selects a child with literal value %j', value => {
    const onChange = vi.fn();
    render(
      <Cascader
        defaultOpen
        searchable={false}
        onChange={onChange}
        data={[
          {
            label: 'Parent',
            value: 'parent',
            children: [
              { label: 'Target', value },
              { label: 'Decoy', value: 'leftright' }
            ]
          }
        ]}
      />
    );

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
    expect(document.activeElement).toBe(screen.getByRole('treeitem', { name: 'Parent' }));
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' });

    expect(document.activeElement?.getAttribute('data-key')).toBe(value);
    expect(document.activeElement).toBe(screen.getByRole('treeitem', { name: 'Target' }));
    fireEvent.keyDown(document.activeElement!, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledExactlyOnceWith(value, expect.any(Object));
  });
});
