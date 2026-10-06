import React from 'react';
import { act, render } from '@testing-library/react';
import { ObjectType, SchemaModel, StringType } from 'schema-typed';
import { describe, expect, it, vi } from 'vitest';
import Form from '../Form';
import type { FormInstance } from '../hooks/useFormRef';

describe('Form terminal parent errors', () => {
  it('preserves a required shaped parent error for an own undefined value', () => {
    const childRule = vi.fn(() => false);
    const parent = ObjectType()
      .isRequired('User required')
      .shape({ code: StringType().addRule(childRule, 'Code invalid', true) });
    const model = SchemaModel({ user: parent });
    const values = { user: undefined };
    const onCheck = vi.fn();
    const onError = vi.fn();
    const form = React.createRef<FormInstance>();

    expect(Object.prototype.hasOwnProperty.call(values, 'user')).toBe(true);
    const nativeResult = model.check(values);
    expect(nativeResult.user).toEqual({ hasError: true, errorMessage: 'User required' });
    expect(nativeResult.user).not.toHaveProperty('object');
    expect(childRule).toHaveBeenCalledTimes(0);

    const view = render(
      <Form
        ref={form}
        model={model}
        formValue={values}
        checkTrigger={null}
        onCheck={onCheck}
        onError={onError}
      />
    );

    try {
      let valid = true;
      act(() => {
        valid = form.current!.check();
      });

      expect(valid).toBe(false);
      expect(onCheck).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledTimes(1);
      expect(onCheck.mock.calls[0][0]).toEqual({ user: 'User required' });
      expect(onError.mock.calls[0][0]).toBe(onCheck.mock.calls[0][0]);
      expect(childRule).toHaveBeenCalledTimes(0);
    } finally {
      view.unmount();
    }
  });

  it('preserves a shaped parent priority error for a primitive value', () => {
    const childRule = vi.fn(() => false);
    const parentRule = vi.fn((value: unknown) => typeof value === 'object');
    const parent = ObjectType()
      .shape({ code: StringType().addRule(childRule, 'Code invalid', true) })
      .addRule(parentRule, 'User must be an object', true);
    const model = SchemaModel({ user: parent });
    const values = { user: 'invalid' };
    const onCheck = vi.fn();
    const onError = vi.fn();
    const form = React.createRef<FormInstance>();

    const nativeResult = model.check(values);
    expect(nativeResult.user).toEqual({ hasError: true, errorMessage: 'User must be an object' });
    expect(nativeResult.user).not.toHaveProperty('object');
    expect(childRule).toHaveBeenCalledTimes(0);

    const view = render(
      <Form
        ref={form}
        model={model}
        formValue={values}
        checkTrigger={null}
        onCheck={onCheck}
        onError={onError}
      />
    );

    try {
      let valid = true;
      act(() => {
        valid = form.current!.check();
      });

      expect(valid).toBe(false);
      expect(onCheck).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledTimes(1);
      expect(onCheck.mock.calls[0][0]).toEqual({ user: 'User must be an object' });
      expect(onError.mock.calls[0][0]).toBe(onCheck.mock.calls[0][0]);
      expect(childRule).toHaveBeenCalledTimes(0);
      expect(parentRule).toHaveBeenCalledTimes(2);
    } finally {
      view.unmount();
    }
  });

  it('retains child string messages inside an original object error aggregate', () => {
    const childRule = vi.fn(() => false);
    const parent = ObjectType().shape({
      code: StringType().addRule(childRule, 'Code invalid', true)
    });
    const model = SchemaModel({ user: parent });
    const values = { user: { code: 'invalid' } };
    const onCheck = vi.fn();
    const onError = vi.fn();
    const form = React.createRef<FormInstance>();

    const nativeResult = model.check(values);
    expect(nativeResult.user).toEqual({
      hasError: true,
      object: { code: { hasError: true, errorMessage: 'Code invalid' } }
    });
    expect(childRule).toHaveBeenCalledTimes(1);

    const view = render(
      <Form
        ref={form}
        model={model}
        formValue={values}
        checkTrigger={null}
        onCheck={onCheck}
        onError={onError}
      />
    );

    try {
      let valid = true;
      act(() => {
        valid = form.current!.check();
      });

      expect(valid).toBe(false);
      expect(onCheck).toHaveBeenCalledTimes(1);
      expect(onError).toHaveBeenCalledTimes(1);
      expect(onCheck.mock.calls[0][0]).toEqual({
        user: { hasError: true, object: { code: 'Code invalid' } }
      });
      expect(onError.mock.calls[0][0]).toBe(onCheck.mock.calls[0][0]);
      expect(childRule).toHaveBeenCalledTimes(3);
    } finally {
      view.unmount();
    }
  });
});
