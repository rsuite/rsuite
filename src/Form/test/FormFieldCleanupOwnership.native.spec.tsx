import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form, { type FormInstance } from '..';
import { nativeErrorFixture } from './errorSnapshotNativeFixtures';

describe.each(['object', 'array row', 'array sibling'] as const)(
  '%s field cleanup inside native onCheck',
  shape => {
    for (const async of [false, true]) {
      for (const mutate of [false, true]) {
        it(`${async ? 'async' : 'sync'}: ${mutate ? 'retires mutated' : 'preserves native'} empty-message invalidity`, async () => {
          const fixture = nativeErrorFixture(shape);
          const ref = React.createRef<FormInstance>();
          let cleanup = false;
          let proposal: any;
          let contents: string;
          const onError = vi.fn();
          const onCheck = vi.fn((errors: any) => {
            if (!cleanup) return;
            proposal = errors;
            if (mutate) {
              // An owner override must not be trusted as a fresh native result.
              fixture.readEdited(errors).hasError = false;
            }
            contents = JSON.stringify(errors);
            ref.current!.cleanErrorForField(fixture.retained);
          });
          render(
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
          await act(async () => {
            await ref.current!.checkForFieldAsync(fixture.retained);
          });
          expect(screen.getByRole('textbox', { name: 'Retained' })).toHaveAttribute(
            'aria-invalid',
            'true'
          );
          cleanup = true;
          await act(async () => {
            if (async) await ref.current!.checkForFieldAsync(fixture.edited);
            else ref.current!.checkForField(fixture.edited);
          });
          const edited = screen.getByRole('textbox', { name: 'Edited' });
          if (mutate) expect(edited).not.toHaveAttribute('aria-invalid');
          else expect(edited).toHaveAttribute('aria-invalid', 'true');
          expect(screen.getByRole('textbox', { name: 'Retained' })).not.toHaveAttribute(
            'aria-invalid'
          );
          expect(screen.queryByRole('alert')).toBeNull();
          expect(JSON.stringify(proposal)).toBe(contents!);
          expect(fixture.readRetained(proposal).hasError).toBe(true);
          expect(onError).toHaveBeenCalledTimes(mutate ? 1 : 2);
        });
      }
    }
  }
);

it('keeps independent validation and cleanup across nested owner callbacks', async () => {
  const fixture = nativeErrorFixture('array row');
  const ref = React.createRef<FormInstance>();
  const proposals: { errors: any; contents: string }[] = [];
  let depth = 0;
  const onCheck = vi.fn((errors: any) => {
    proposals.push({ errors, contents: JSON.stringify(errors) });
    if (depth === 0) {
      depth++;
      expect(ref.current!.checkForField(fixture.retained)).toBe(false);
      depth--;
    } else ref.current!.cleanErrorForField('keep');
  });
  const onError = vi.fn();
  render(
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
      <Form.Control name="keep" aria-label="Keep" />
    </Form>
  );
  act(() => ref.current!.resetErrors({ keep: 'Keep' }));
  await act(async () => {
    expect((await ref.current!.checkForFieldAsync(fixture.edited)).hasError).toBe(true);
  });
  for (const name of ['Edited', 'Retained']) {
    expect(screen.getByRole('textbox', { name })).toHaveAttribute('aria-invalid', 'true');
  }
  expect(screen.getByRole('textbox', { name: 'Keep' })).not.toHaveAttribute('aria-invalid');
  expect(onCheck).toHaveBeenCalledTimes(2);
  expect(onError).toHaveBeenCalledTimes(2);
  const last = onError.mock.lastCall![0];
  expect(fixture.readEdited(last).hasError).toBe(true);
  expect(fixture.readRetained(last).hasError).toBe(true);
  expect(last).not.toHaveProperty('keep');
  for (const { errors, contents } of proposals) expect(JSON.stringify(errors)).toBe(contents);
});

it('allows a fresh check after an onCheck callback cleans a field and throws', async () => {
  const fixture = nativeErrorFixture('object');
  const ref = React.createRef<FormInstance>();
  const failure = new Error('Owner callback failed');
  let throws = true;
  const onCheck = vi.fn(() => {
    ref.current!.cleanErrorForField(fixture.retained);
    if (throws) throw failure;
  });
  const onError = vi.fn();
  render(
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
  await act(async () => {
    await expect(ref.current!.checkForFieldAsync(fixture.edited)).rejects.toBe(failure);
  });
  expect(onError).not.toHaveBeenCalled();
  throws = false;
  await act(async () => {
    expect((await ref.current!.checkForFieldAsync(fixture.edited)).hasError).toBe(true);
  });
  expect(screen.getByRole('textbox', { name: 'Edited' })).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByRole('textbox', { name: 'Retained' })).not.toHaveAttribute('aria-invalid');
  expect(onCheck).toHaveBeenCalledTimes(2);
  expect(onError).toHaveBeenCalledOnce();
});
