import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, it } from 'vitest';
import Tree from '..';
import { ComboboxContext } from '@/internals/Picker/PickerToggleTrigger';

it('renders unique canonical Tree item IDs before passive ref-key metadata is assigned', () => {
  const data = [
    { value: 1, label: 'Numeric one' },
    { value: 0, label: 'Numeric zero' },
    { value: '', label: 'Empty string' },
    { value: '1', label: 'String one' }
  ];
  const html = renderToStaticMarkup(
    <ComboboxContext.Provider value={{ id: 'initial-tree', popupType: 'tree' }}>
      <Tree data={data} />
    </ComboboxContext.Provider>
  );
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)]
    .map(match => match[1])
    .filter(id => id.startsWith('initial-tree-opt-'));
  expect(ids).toEqual([
    'initial-tree-opt-Number_1',
    'initial-tree-opt-Number_0',
    'initial-tree-opt-String_',
    'initial-tree-opt-String_1'
  ]);
  expect(new Set(ids).size).toBe(4);
});
