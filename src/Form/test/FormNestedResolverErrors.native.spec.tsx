import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form, { type FormInstance } from '..';
import { nativeErrorFixture } from './errorSnapshotNativeFixtures';

describe.each(['fields', 'whole async'] as const)(
  'Form native errors with owner overrides after %s',
  producer => {
    for (const key of ['users[0].name', 'users.0.name']) {
      it.each([undefined, null, ''])(`retires an observed ${key} override of %s`, async empty => {
        const fixture = nativeErrorFixture('array row');
        const ref = React.createRef<FormInstance>();
        const onCheck = vi.fn();
        const onError = vi.fn();
        const form = () => (
          <Form
            ref={ref}
            nestedField
            model={fixture.model}
            formDefaultValue={fixture.values}
            onCheck={onCheck}
            onError={onError}
          >
            <Form.Control name={fixture.edited} aria-label="Edited" />
            <Form.Control name={fixture.retained} aria-label="Retained" />
          </Form>
        );
        const { rerender } = render(form());
        await act(async () => {
          if (producer === 'fields') {
            await ref.current!.checkForFieldAsync(fixture.edited);
            await ref.current!.checkForFieldAsync(fixture.retained);
          } else await ref.current!.checkAsync();
        });
        for (const name of ['Edited', 'Retained']) {
          expect(screen.getByRole('textbox', { name })).toHaveAttribute('aria-invalid', 'true');
        }
        const original = onCheck.mock.lastCall![0];
        const contents = JSON.stringify(original);
        const count = onCheck.mock.calls.length;
        original[key] = empty;
        rerender(form());
        expect(screen.getByRole('textbox', { name: 'Edited' })).not.toHaveAttribute('aria-invalid');
        expect(screen.queryByRole('alert')).toBeNull();

        delete original[key];
        rerender(form());
        // An observed owner mutation retires this snapshot, including after data is restored.
        for (const name of ['Edited', 'Retained']) {
          expect(screen.getByRole('textbox', { name })).not.toHaveAttribute('aria-invalid');
        }
        expect(JSON.stringify(original)).toBe(contents);
        expect(onCheck).toHaveBeenCalledTimes(count);
        expect(onError).toHaveBeenCalledTimes(count);

        await act(async () => {
          expect((await ref.current!.checkForFieldAsync(fixture.edited)).hasError).toBe(true);
        });
        expect(screen.getByRole('textbox', { name: 'Edited' })).toHaveAttribute(
          'aria-invalid',
          'true'
        );
        expect(screen.getByRole('textbox', { name: 'Retained' })).not.toHaveAttribute(
          'aria-invalid'
        );
        expect(onCheck).toHaveBeenCalledTimes(count + 1);
        expect(onError).toHaveBeenCalledTimes(count + 1);
        expect(JSON.stringify(original)).toBe(contents);
      });
    }
  }
);
