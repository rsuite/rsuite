import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { expect } from 'vitest';
import Form, { type FormInstance } from '..';

export type Method = 'check' | 'checkForField' | 'checkAsync' | 'checkForFieldAsync';
export type Values = { name: string; untouched: { key: string } };
export const methods: Method[] = ['check', 'checkForField', 'checkAsync', 'checkForFieldAsync'];
export const message = 'Name does not match the invocation';

export function invoke(method: Method, form: FormInstance, callbacks: any[]) {
  if (method === 'check') return form.check(result => callbacks.push(result));
  if (method === 'checkForField') {
    return form.checkForField('name', result => callbacks.push(result));
  }
  if (method === 'checkAsync') return form.checkAsync();
  return form.checkForFieldAsync('name');
}

export function nameControl() {
  return (
    <Form.Group controlId="name">
      <Form.ControlLabel>Name</Form.ControlLabel>
      <Form.Control name="name" />
    </Form.Group>
  );
}

export function changeName(value: string) {
  fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), { target: { value } });
}

export function expectOutcome(method: Method, result: any, valid: boolean) {
  if (method === 'check' || method === 'checkForField') expect(result).toBe(valid);
  else {
    expect(result.hasError).toBe(!valid);
    if (method === 'checkAsync') expect(result.formError).toEqual(valid ? {} : { name: message });
    else expect(result.errorMessage).toBe(valid ? undefined : message);
  }
}
