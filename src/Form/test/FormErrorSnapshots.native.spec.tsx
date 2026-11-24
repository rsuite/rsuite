import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form, { type FormInstance } from '..';
import { nativeErrorFixture, type Operation, type Producer } from './errorSnapshotNativeFixtures';

describe.each(['object', 'array row', 'array sibling'] as const)(
  'Form native error snapshots in an %s',
  shape => {
    for (const producer of ['fields', 'whole sync', 'whole async'] as Producer[]) {
      it.each(['check', 'checkAsync', 'clear', 'remove'] as Operation[])(
        `${producer} retains a sibling and the original map after %s`,
        async operation => {
          const fixture = nativeErrorFixture(shape);
          const ref = React.createRef<FormInstance>();
          const checks: any[] = [];
          const onError = vi.fn();
          const form = (showEdited: boolean) => (
            <Form
              ref={ref}
              model={fixture.model}
              nestedField
              formDefaultValue={fixture.values}
              onCheck={errors => checks.push(errors)}
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
          const { rerender } = render(form(true));
          await act(async () => {
            if (producer === 'fields') {
              await ref.current!.checkForFieldAsync(fixture.edited);
              await ref.current!.checkForFieldAsync(fixture.retained);
            } else if (producer === 'whole async') {
              expect((await ref.current!.checkAsync()).hasError).toBe(true);
            } else {
              expect(ref.current!.check()).toBe(false);
            }
          });

          expect(screen.getByRole('textbox', { name: 'Edited' })).toHaveAttribute(
            'aria-invalid',
            'true'
          );
          expect(screen.getByRole('textbox', { name: 'Retained' })).toHaveAttribute(
            'aria-invalid',
            'true'
          );
          expect(screen.queryByRole('alert')).toBeNull();
          const original = checks[checks.length - 1];
          const editedResult = fixture.readEdited(original);
          const retainedResult = fixture.readRetained(original);
          const contents = JSON.stringify(original);
          const checkCount = checks.length;
          const errorCount = onError.mock.calls.length;
          fixture.gate.editedValid = true;

          if (operation === 'remove') {
            rerender(form(false));
          } else {
            await act(async () => {
              if (operation === 'clear') ref.current!.cleanErrorForField(fixture.edited);
              else if (operation === 'checkAsync') {
                expect(await ref.current!.checkForFieldAsync(fixture.edited)).toEqual({
                  hasError: false
                });
              } else {
                expect(ref.current!.checkForField(fixture.edited)).toBe(true);
              }
            });
          }

          expect(screen.getByRole('textbox', { name: 'Retained' })).toHaveAttribute(
            'aria-invalid',
            'true'
          );
          if (operation === 'remove')
            expect(screen.queryByRole('textbox', { name: 'Edited' })).toBeNull();
          else
            expect(screen.getByRole('textbox', { name: 'Edited' })).not.toHaveAttribute(
              'aria-invalid',
              'true'
            );
          expect(checks).toHaveLength(checkCount + (operation === 'clear' ? 0 : 1));
          expect(onError).toHaveBeenCalledTimes(errorCount);
          expect(fixture.readEdited(original)).toBe(editedResult);
          expect(fixture.readRetained(original)).toBe(retainedResult);
          expect(JSON.stringify(original)).toBe(contents);

          if (operation === 'remove') rerender(form(true));
          // A caller-created copy has no native provenance, despite matching the original data.
          act(() => ref.current!.resetErrors({ ...original }));
          expect(screen.getByRole('textbox', { name: 'Edited' })).not.toHaveAttribute(
            'aria-invalid',
            'true'
          );
          expect(screen.getByRole('textbox', { name: 'Retained' })).not.toHaveAttribute(
            'aria-invalid',
            'true'
          );
          // Selecting the exact original map restores both native blank errors.
          act(() => ref.current!.resetErrors(original));
          expect(screen.getByRole('textbox', { name: 'Edited' })).toHaveAttribute(
            'aria-invalid',
            'true'
          );
          expect(screen.getByRole('textbox', { name: 'Retained' })).toHaveAttribute(
            'aria-invalid',
            'true'
          );
          expect(screen.queryByRole('alert')).toBeNull();
          expect(checks).toHaveLength(checkCount + (operation === 'clear' ? 0 : 1));
          expect(onError).toHaveBeenCalledTimes(errorCount);
        }
      );
    }
  }
);
