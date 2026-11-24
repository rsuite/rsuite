import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form, { type FormInstance } from '..';
import { nativeErrorFixture, type Operation } from './errorSnapshotNativeFixtures';

describe.each(['object', 'array row', 'array sibling'] as const)(
  'Form controlled native error snapshots in an %s',
  shape => {
    it.each(['check', 'checkAsync', 'clear', 'remove'] as Operation[])(
      'retains the owner-selected snapshot after rejecting %s',
      async operation => {
        const fixture = nativeErrorFixture(shape);
        const ref = React.createRef<FormInstance>();
        const onCheck = vi.fn();
        const onError = vi.fn();
        let selected = {};
        const form = (showEdited = true) => (
          <Form
            ref={ref}
            model={fixture.model}
            nestedField
            formError={selected}
            formDefaultValue={fixture.values}
            onCheck={onCheck}
            onError={onError}
          >
            {showEdited && (
              <Form.Control
                key="edited"
                name={fixture.edited}
                aria-label="Edited"
                shouldResetWithUnmount
              />
            )}
            <Form.Control key="retained" name={fixture.retained} aria-label="Retained" />
          </Form>
        );
        const { rerender } = render(form());
        await act(async () => {
          const result = await ref.current!.checkAsync();
          expect(result.hasError).toBe(true);
          selected = result.formError;
        });
        rerender(form());
        for (const name of ['Edited', 'Retained']) {
          expect(screen.getByRole('textbox', { name })).toHaveAttribute('aria-invalid', 'true');
        }
        const original = selected;
        const edited = fixture.readEdited(original);
        const retained = fixture.readRetained(original);
        const contents = JSON.stringify(original);
        fixture.gate.editedValid = true;

        if (operation === 'remove') rerender(form(false));
        else {
          await act(async () => {
            if (operation === 'clear') ref.current!.cleanErrorForField(fixture.edited);
            else if (operation === 'checkAsync') {
              expect(await ref.current!.checkForFieldAsync(fixture.edited)).toEqual({
                hasError: false
              });
            } else expect(ref.current!.checkForField(fixture.edited)).toBe(true);
          });
        }

        expect(fixture.readEdited(original)).toBe(edited);
        expect(fixture.readRetained(original)).toBe(retained);
        expect(JSON.stringify(original)).toBe(contents);
        if (operation === 'remove') rerender(form());
        for (const name of ['Edited', 'Retained']) {
          expect(screen.getByRole('textbox', { name })).toHaveAttribute('aria-invalid', 'true');
        }
        expect(onCheck).toHaveBeenCalledTimes(operation === 'clear' ? 1 : 2);
        expect(onError).toHaveBeenCalledTimes(1);
        expect(screen.queryByRole('alert')).toBeNull();

        if (operation !== 'clear') {
          const next = onCheck.mock.lastCall![0];
          expect(next).not.toBe(original);
          expect(fixture.readRetained(next)).toBe(retained);
          selected = next;
          rerender(form());
          expect(screen.getByRole('textbox', { name: 'Edited' })).not.toHaveAttribute(
            'aria-invalid',
            'true'
          );
          expect(screen.getByRole('textbox', { name: 'Retained' })).toHaveAttribute(
            'aria-invalid',
            'true'
          );
          selected = original;
          rerender(form());
          expect(screen.getByRole('textbox', { name: 'Edited' })).toHaveAttribute(
            'aria-invalid',
            'true'
          );
          expect(onCheck).toHaveBeenCalledTimes(2);
          expect(onError).toHaveBeenCalledTimes(1);
        }
      }
    );
  }
);
