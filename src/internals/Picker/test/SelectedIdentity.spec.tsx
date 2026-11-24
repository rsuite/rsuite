import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CheckPicker from '../../../CheckPicker';
import TagPicker from '../../../TagPicker';

describe('selected picker value identity', () => {
  for (const Component of [CheckPicker, TagPicker] as React.ComponentType<any>[]) {
    it(`preserves stateful labels when mixed values reorder in ${Component.displayName}`, () => {
      const data = [
        { value: 0, label: <input aria-label="Number zero" defaultValue="number state" /> },
        { value: '0', label: <input aria-label="String zero" defaultValue="string state" /> }
      ];
      const onChange = vi.fn();
      const { rerender } = render(<Component data={data} value={[0, '0']} onChange={onChange} />);
      const number = screen.getByRole('textbox', { name: 'Number zero' });
      const string = screen.getByRole('textbox', { name: 'String zero' });

      rerender(<Component data={[...data].reverse()} value={['0', 0]} onChange={onChange} />);

      expect(screen.getByRole('textbox', { name: 'Number zero' })).toBe(number);
      expect(screen.getByRole('textbox', { name: 'String zero' })).toBe(string);
      expect(number).to.have.value('number state');
      expect(string).to.have.value('string state');
      expect(onChange).not.toHaveBeenCalled();
    });
  }
});
