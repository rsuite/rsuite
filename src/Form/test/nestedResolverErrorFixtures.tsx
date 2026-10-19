import React from 'react';
import { act } from '@testing-library/react';
import { expect, vi } from 'vitest';
import type { FormInstance } from '..';
import Form from '..';
import Schema from '../../Schema';

export const values = { profile: { name: '', email: '' }, products: [{ name: '' }, { name: '' }] };

export const required = { hasError: true, errorMessage: 'Required' };

export const projectionRows = [
  { label: 'flat object', name: 'profile.name', errors: { 'profile.name': 'Required' } },
  { label: 'flat bracket', name: 'products[0].name', errors: { 'products[0].name': 'Required' } },
  {
    label: 'dot error for bracket field',
    name: 'products[0].name',
    errors: { 'products.0.name': 'Required' }
  },
  {
    label: 'bracket error for dot field',
    name: 'products.0.name',
    errors: { 'products[0].name': 'Required' }
  },
  {
    label: 'structured object',
    name: 'profile.name',
    errors: { profile: { object: { name: required } } }
  },
  { label: 'ordinary flat', name: 'name', errors: { name: 'Required' }, nested: false },
  {
    label: 'nonnested literal dot',
    name: 'profile.name',
    errors: { 'profile.name': 'Required' },
    nested: false
  },
  {
    label: 'root numeric bracket field',
    name: '[0].name',
    errors: { '0.name': 'Required' },
    values: [{ name: '' }]
  },
  {
    label: 'root numeric dotted field',
    name: '0.name',
    errors: { '[0].name': 'Required' },
    values: [{ name: '' }]
  },
  {
    label: 'mixed numeric spellings',
    name: 'groups[0].items.1.name',
    errors: { 'groups.0.items[1].name': 'Required' },
    values: { groups: [{ items: [{}, { name: '' }] }] }
  }
];

export function Control({
  name,
  id = 'target',
  reset = false
}: {
  name: string;
  id?: string;
  reset?: boolean;
}) {
  return <Form.Control name={name} id={id} aria-label={id} shouldResetWithUnmount={reset} />;
}

export function observeErrors(
  ref: React.RefObject<FormInstance<Record<string, any>, any> | null>,
  onCheck: ReturnType<typeof vi.fn>
) {
  act(() => {
    expect(ref.current?.checkForField('probe')).toBe(true);
  });
  return onCheck.mock.lastCall?.[0];
}

export const probeModel = () => Schema.Model({ probe: Schema.Types.StringType() });
