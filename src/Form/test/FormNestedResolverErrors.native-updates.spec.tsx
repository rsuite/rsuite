import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form, { type FormInstance } from '..';
import { nativeErrorFixture } from './errorSnapshotNativeFixtures';

describe.each([false, true])('Form native updates with async=%s', checkAsync => {
  for (const key of ['users[0].name', 'users.0.name']) {
    it.each([false, true])(
      `replaces an old ${key} resolver error with native valid=%s`,
      async valid => {
        const fixture = nativeErrorFixture('array row');
        fixture.gate.editedValid = valid;
        const errors = { [key]: 'Old resolver error' };
        const ref = React.createRef<FormInstance>();
        const onCheck = vi.fn();
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
        act(() => ref.current!.resetErrors(errors));
        await act(async () => {
          await ref.current!.checkForFieldAsync(fixture.retained);
        });
        expect(screen.getByRole('alert')).toHaveTextContent('Old resolver error');
        expect(screen.getByRole('textbox', { name: 'Retained' })).toHaveAttribute(
          'aria-invalid',
          'true'
        );
        const previous = onCheck.mock.lastCall![0];
        const previousContents = JSON.stringify(previous);
        const retained = fixture.readRetained(previous);
        await act(async () => {
          if (checkAsync) {
            expect((await ref.current!.checkForFieldAsync(fixture.edited)).hasError).toBe(!valid);
          } else expect(ref.current!.checkForField(fixture.edited)).toBe(valid);
        });
        expect(screen.queryByRole('alert')).toBeNull();
        expect(screen.getByRole('textbox', { name: 'Edited' }).getAttribute('aria-invalid')).toBe(
          valid ? null : 'true'
        );
        expect(screen.getByRole('textbox', { name: 'Retained' })).toHaveAttribute(
          'aria-invalid',
          'true'
        );
        const next = onCheck.mock.lastCall![0];
        expect(next).not.toHaveProperty(key);
        expect(Object.prototype.hasOwnProperty.call(next, key)).toBe(false);
        expect(fixture.readEdited(next).hasError).toBe(!valid);
        expect(fixture.readRetained(next)).toBe(retained);
        expect(JSON.stringify(previous)).toBe(previousContents);
        expect(errors).toEqual({ [key]: 'Old resolver error' });
        expect(onCheck).toHaveBeenCalledTimes(2);
        expect(onError).toHaveBeenCalledTimes(valid ? 1 : 2);
      }
    );
  }

  it('writes a schema leaf without overwriting a different literal field', async () => {
    const fixture = nativeErrorFixture('array row');
    const literal = 'users.array[0].object.name';
    const errors = { [literal]: 'Unrelated literal error' };
    const ref = React.createRef<FormInstance>();
    const onCheck = vi.fn();
    render(
      <Form
        ref={ref}
        nestedField
        model={fixture.model}
        formDefaultValue={fixture.values}
        onCheck={onCheck}
      >
        <Form.Control name={fixture.edited} aria-label="Edited" />
        <Form.Control name={fixture.retained} aria-label="Retained" />
        <Form.Control name={literal} aria-label="Literal" />
      </Form>
    );
    act(() => ref.current!.resetErrors(errors));
    expect(screen.getByRole('alert')).toHaveTextContent('Unrelated literal error');
    expect(screen.getByRole('textbox', { name: 'Literal' })).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByRole('textbox', { name: 'Edited' })).not.toHaveAttribute('aria-invalid');
    await act(async () => {
      await ref.current!.checkForFieldAsync(fixture.retained);
    });
    const previous = onCheck.mock.lastCall![0];
    const retained = fixture.readRetained(previous);
    await act(async () => {
      if (checkAsync) {
        expect((await ref.current!.checkForFieldAsync(fixture.edited)).hasError).toBe(true);
      } else expect(ref.current!.checkForField(fixture.edited)).toBe(false);
    });
    const next = onCheck.mock.lastCall![0];
    expect(next[literal]).toBe('Unrelated literal error');
    expect(fixture.readEdited(next)).toEqual({ hasError: true, errorMessage: '' });
    expect(fixture.readRetained(next)).toBe(retained);
    for (const name of ['Edited', 'Retained', 'Literal']) {
      expect(screen.getByRole('textbox', { name })).toHaveAttribute('aria-invalid', 'true');
    }
    expect(screen.getAllByRole('alert')).toHaveLength(1);
    expect(errors[literal]).toBe('Unrelated literal error');
    expect(previous[literal]).toBe('Unrelated literal error');
    expect(onCheck).toHaveBeenCalledTimes(2);
  });
});
