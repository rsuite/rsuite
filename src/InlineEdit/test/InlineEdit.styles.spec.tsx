import React from 'react';
import { describe, expect, it } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import InlineEdit from '../InlineEdit';

import '../styles/index.scss';

describe('InlineEdit standalone styles', () => {
  for (const dir of ['ltr', 'rtl'] as const) {
    it.each(['xs', 'sm', 'md', 'lg'] as const)(
      `styles its own action buttons at %s in ${dir}`,
      size => {
        const { container } = render(<InlineEdit dir={dir} size={size} defaultValue="Edit me" />);

        act(() => (container.firstElementChild as HTMLElement).focus());

        const save = screen.getByRole('button', { name: 'Save' }).getBoundingClientRect();
        const cancel = screen.getByRole('button', { name: 'Cancel' }).getBoundingClientRect();

        for (const button of [save, cancel]) {
          expect(button.width).toBeCloseTo(30, 1);
          expect(button.height).toBeCloseTo(30, 1);
        }
        expect(save.top).toBeCloseTo(cancel.top, 1);
        const gap = dir === 'ltr' ? cancel.left - save.right : save.left - cancel.right;
        expect(gap).toBeCloseTo(6, 1);
        expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('Edit me');
      }
    );
  }
});
