import React from 'react';
import FormGroup from '../index';
import FormControl from '../../FormControl/index';
import FormControlLabel from '../../FormControlLabel/index';
import Form from '../../Form/index';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import '../../FormControl/styles/index.scss';
import '../../FormControlLabel/styles/index.scss';
import '../../Form/styles/index.scss';
import '../styles/index.scss';

describe('FormGroup styles', () => {
  it.each(['ltr', 'rtl'] as const)('lays out labels and controls horizontally in %s', direction => {
    render(
      <Form layout="horizontal" dir={direction} style={{ width: 640 }}>
        <FormGroup controlId="name">
          <FormControlLabel>Name</FormControlLabel>
          <FormControl name="name" />
        </FormGroup>
      </Form>
    );

    const label = screen.getByText('Name').getBoundingClientRect();
    const control = screen.getByRole('textbox', { name: 'Name' }).getBoundingClientRect();

    expect(
      Math.min(label.bottom, control.bottom) - Math.max(label.top, control.top)
    ).toBeGreaterThan(0);
    if (direction === 'ltr') {
      expect(control.left).toBeGreaterThan(label.right);
    } else {
      expect(control.right).toBeLessThan(label.left);
    }
  });
});
