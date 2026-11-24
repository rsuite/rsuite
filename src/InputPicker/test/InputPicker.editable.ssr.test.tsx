import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import InputPicker from '..';
import TagPicker from '../../TagPicker';

describe.each([
  { name: 'InputPicker', Picker: InputPicker },
  { name: 'TagPicker', Picker: TagPicker }
])('$name editable server markup', ({ Picker }) => {
  it('renders one input combobox with its public id and form ARIA without browser measurements', () => {
    const html = renderToString(
      <Picker
        id="country"
        aria-label="Country"
        aria-describedby="hint"
        data={[{ label: 'Alpha', value: 'a' }]}
        responsive
      />
    );
    expect(html.match(/role="combobox"/g)).toHaveLength(1);
    expect(html).toMatch(/<input[^>]*role="combobox"[^>]*id="country"/);
    expect(html).toContain('aria-label="Country"');
    expect(html).toContain('aria-describedby="hint"');
    expect(html).toContain('id="country-toggle"');
    expect(html).not.toContain('aria-activedescendant');
    expect(html).not.toContain('aria-controls');
  });
});
