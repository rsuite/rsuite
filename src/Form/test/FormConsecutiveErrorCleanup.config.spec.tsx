import React, { useLayoutEffect, useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form, { type FormInstance } from '..';
import Schema from '../../Schema';

describe('Form field cleanup uses committed path configuration', () => {
  it.each([false, true])('uses nestedField=%s in child layout through a saved method', nested => {
    const leaf = Object.freeze({ hasError: true, errorMessage: 'Structured error' });
    const branch = Object.freeze({
      array: Object.freeze([Object.freeze({ object: Object.freeze({ name: leaf }) })])
    });
    const errors = Object.freeze({
      'rows[0].name': 'Exact error',
      'rows.0.name': 'Alias error',
      rows: branch,
      keep: 'Retained error'
    });
    const original = JSON.stringify(errors);
    const ref = React.createRef<FormInstance<Record<string, any>, any>>();
    let saved: FormInstance<Record<string, any>, any>['cleanErrorForField'];
    const onCheck = vi.fn();
    const onError = vi.fn();
    const onChange = vi.fn();
    function Child({ committed }: { committed: boolean }) {
      useLayoutEffect(() => {
        if (committed) saved('rows[0].name');
      }, [committed]);
      return null;
    }
    function Owner() {
      const [committed, setCommitted] = useState(false);
      return (
        <Form
          ref={ref}
          nestedField={committed ? nested : !nested}
          formDefaultValue={{ rows: [{ name: 'A' }], 'rows[0].name': 'A', keep: '', probe: 'ok' }}
          model={Schema.Model({ probe: Schema.Types.StringType() })}
          onCheck={onCheck}
          onError={onError}
          onChange={onChange}
        >
          <Form.Control name="rows[0].name" aria-label="Edited" />
          <Form.Control name="keep" aria-label="Retained" />
          <Child committed={committed} />
          <button
            type="button"
            onClick={() => {
              saved = ref.current!.cleanErrorForField;
              setCommitted(true);
            }}
          >
            Change path configuration
          </button>
        </Form>
      );
    }
    render(<Owner />);
    act(() => ref.current!.resetErrors(errors));
    expect(screen.getByRole('textbox', { name: 'Edited' })).toHaveAttribute('aria-invalid', 'true');

    fireEvent.click(screen.getByRole('button', { name: 'Change path configuration' }));

    expect(screen.getByRole('textbox', { name: 'Edited' })).not.toHaveAttribute('aria-invalid');
    expect(screen.getByRole('textbox', { name: 'Retained' })).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(onCheck).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
    act(() => expect(ref.current!.checkForField('probe')).toBe(true));
    const observed = onCheck.mock.lastCall![0];
    expect(observed).not.toHaveProperty(['rows[0].name']);
    if (nested) {
      expect(observed).not.toHaveProperty(['rows.0.name']);
      expect(observed.rows.array[0].object).toEqual({});
    } else {
      expect(observed['rows.0.name']).toBe('Alias error');
      expect(observed.rows).toBe(branch);
    }
    expect(observed.keep).toBe('Retained error');
    expect(JSON.stringify(errors)).toBe(original);
  });
});
