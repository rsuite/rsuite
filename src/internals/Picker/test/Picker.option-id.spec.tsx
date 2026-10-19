import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SelectPicker from '../../../SelectPicker';
import CheckPicker from '../../../CheckPicker';
import TreePicker from '../../../TreePicker';
import AutoComplete from '../../../AutoComplete';

const values = [
  'foo bar',
  'foo%20bar',
  'foo\tbar',
  'foo%09bar',
  'foo\nbar',
  'foo%0abar',
  'foo\fbar',
  'foo%0cbar',
  'foo\rbar',
  'foo%0dbar',
  'foo%bar',
  'foo%25bar'
];
const data = values.map((value, index) => ({ value, label: `Option ${index}` }));

describe('Picker option IDs', () => {
  it.each([
    {
      name: 'SelectPicker',
      picker: <SelectPicker id="picker" data={data} open searchable={false} />,
      role: 'option',
      inputFocus: false
    },
    {
      name: 'CheckPicker',
      picker: <CheckPicker id="picker" data={data} open searchable={false} />,
      role: 'option',
      inputFocus: false
    },
    {
      name: 'TreePicker',
      picker: <TreePicker id="picker" data={data} open searchable={false} />,
      role: 'treeitem',
      inputFocus: false
    },
    {
      name: 'AutoComplete',
      picker: <AutoComplete id="picker" data={data} open filterBy={() => true} />,
      role: 'option',
      inputFocus: true
    }
  ])('references each unique, whitespace-free $name option when navigating', item => {
    render(item.picker);
    const combobox = screen.getByRole('combobox');
    const options = screen.getAllByRole(item.role);

    expect(options).toHaveLength(values.length);
    expect(new Set(options.map(option => option.id)).size).toBe(options.length);
    combobox.focus();

    options.forEach(option => {
      fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });

      expect(document.activeElement).toBe(item.inputFocus ? combobox : option);
      if (item.inputFocus) {
        expect(option.firstElementChild).to.have.class('rs-auto-complete-item-focus');
      }
      expect(combobox.getAttribute('aria-activedescendant')).toBe(option.id);
      expect(option.id).not.toMatch(/[\t\n\f\r ]/);
      expect(document.getElementById(option.id)).toBe(option);
    });
  });
});
