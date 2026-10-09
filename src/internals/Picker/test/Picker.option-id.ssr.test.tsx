import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, it } from 'vitest';
import ListItem from '../ListItem';
import ListCheckItem from '../ListCheckItem';
import Tree from '../../../Tree';
import { ComboboxContext } from '../PickerToggleTrigger';

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

it.each([
  {
    name: 'list options',
    content: data.map(item => (
      <ListItem key={item.value} value={item.value}>
        {item.label}
      </ListItem>
    ))
  },
  {
    name: 'checked options',
    content: data.map(item => (
      <ListCheckItem key={item.value} value={item.value}>
        {item.label}
      </ListCheckItem>
    ))
  },
  { name: 'tree nodes', content: <Tree data={data} /> }
])('renders unique whitespace-free IDs for $name on the server', ({ content }) => {
  const html = renderToStaticMarkup(
    <ComboboxContext.Provider value={{ id: 'ssr-options', popupType: 'listbox' }}>
      {content}
    </ComboboxContext.Provider>
  );
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)]
    .map(match => match[1])
    .filter(id => id.startsWith('ssr-options-opt-'));
  expect(ids).toHaveLength(values.length);
  expect(new Set(ids).size).toBe(values.length);
  for (const id of ids) expect(id).not.toMatch(/[\t\n\f\r ]/);
  expect(ids[0]).not.toBe(ids[1]);
  expect(ids.at(-2)).not.toBe(ids.at(-1));
});
