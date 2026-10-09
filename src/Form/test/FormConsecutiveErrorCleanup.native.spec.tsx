import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form, { type FormInstance } from '..';
import { nativeErrorFixture } from './errorSnapshotNativeFixtures';

describe.each(['object', 'array row', 'array sibling'] as const)(
  'Consecutive cleanup of native empty errors in %s',
  shape => {
    for (const producer of ['fields', 'whole async'] as const) {
      for (const clearAll of [false, true]) {
        it(`${producer}: preserves ${clearAll ? 'whole-form cleanup' : 'field cleanup and sibling validity'} in one event`, async () => {
          const fixture = nativeErrorFixture(shape);
          const ref = React.createRef<FormInstance>();
          const onCheck = vi.fn();
          const onError = vi.fn();
          const onChange = vi.fn();
          render(
            <Form
              ref={ref}
              nestedField
              model={fixture.model}
              formDefaultValue={fixture.values}
              onCheck={onCheck}
              onError={onError}
              onChange={onChange}
            >
              <Form.Control name={fixture.edited} aria-label="Edited" />
              <Form.Control name={fixture.retained} aria-label="Retained" />
              <button
                type="button"
                onClick={() => {
                  if (clearAll) ref.current!.cleanErrors();
                  ref.current!.cleanErrorForField(fixture.edited);
                  ref.current!.cleanErrorForField('absent');
                }}
              >
                Clean errors
              </button>
            </Form>
          );
          await act(async () => {
            if (producer === 'fields') {
              await ref.current!.checkForFieldAsync(fixture.edited);
              await ref.current!.checkForFieldAsync(fixture.retained);
            } else await ref.current!.checkAsync();
          });
          for (const name of ['Edited', 'Retained']) {
            expect(screen.getByRole('textbox', { name })).toHaveAttribute('aria-invalid', 'true');
          }
          const snapshots = onCheck.mock.calls.map(([errors]) => ({
            errors,
            contents: JSON.stringify(errors)
          }));
          onCheck.mockClear();
          onError.mockClear();

          fireEvent.click(screen.getByRole('button', { name: 'Clean errors' }));

          expect(screen.getByRole('textbox', { name: 'Edited' })).not.toHaveAttribute(
            'aria-invalid'
          );
          const retained = screen.getByRole('textbox', { name: 'Retained' });
          if (clearAll) expect(retained).not.toHaveAttribute('aria-invalid');
          else expect(retained).toHaveAttribute('aria-invalid', 'true');
          expect(screen.queryByRole('alert')).toBeNull();
          expect(onCheck).not.toHaveBeenCalled();
          expect(onError).not.toHaveBeenCalled();
          expect(onChange).not.toHaveBeenCalled();
          for (const snapshot of snapshots) {
            expect(JSON.stringify(snapshot.errors)).toBe(snapshot.contents);
          }
        });
      }
    }
  }
);
