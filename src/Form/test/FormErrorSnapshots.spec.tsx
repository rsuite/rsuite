import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { StringType } from 'schema-typed';
import Form from '../Form';
import FormControl from '../../FormControl';
import type { FormInstance } from '../hooks/useFormRef';

describe('Form error snapshots', () => {
  it.each([false, true])(
    'preserves controlled nested errors during async=%s checks',
    async checkAsync => {
      const oldError = { hasError: true, errorMessage: 'Old error' };
      const errors = { profile: { object: { name: oldError } }, untouched: { enabled: true } };
      const onCheck = vi.fn();
      const ref = React.createRef<FormInstance<Record<string, any>, any>>();
      render(
        <Form
          ref={ref}
          nestedField
          formError={errors}
          formDefaultValue={{ profile: { name: '' } }}
          onCheck={onCheck}
        >
          <FormControl name="profile.name" rule={StringType().isRequired('Required')} />
        </Form>
      );

      let result: unknown;
      let callbackResult: unknown;
      await act(async () => {
        if (checkAsync) result = await ref.current?.checkForFieldAsync('profile.name');
        else {
          result = ref.current?.checkForField('profile.name', value => {
            callbackResult = value;
          });
        }
      });

      const next = onCheck.mock.lastCall?.[0];
      expect(next.profile.object.name.errorMessage).to.equal('Required');
      expect(errors.profile.object.name).to.equal(oldError);
      expect(next.profile).not.to.equal(errors.profile);
      expect(next.profile.object).not.to.equal(errors.profile.object);
      expect(next.untouched).to.equal(errors.untouched);
      if (checkAsync) expect(result).to.equal(next.profile.object.name);
      else {
        expect(result).to.equal(false);
        expect(callbackResult).to.equal(next.profile.object.name);
      }
    }
  );

  it.each([false, true])(
    'keeps earlier onCheck snapshots after async=%s edits',
    async checkAsync => {
      const onCheck = vi.fn();
      const onError = vi.fn();
      render(
        <Form
          nestedField
          formDefaultValue={{ profile: { name: 'Valid' } }}
          onCheck={onCheck}
          onError={onError}
        >
          <FormControl
            name="profile.name"
            checkAsync={checkAsync}
            rule={StringType().isRequired('Required')}
          />
        </Form>
      );

      fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });
      await waitFor(() => expect(onCheck).toHaveBeenCalledTimes(1));
      const first = onCheck.mock.calls[0][0];
      expect(first.profile.object.name.hasError).to.equal(true);
      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError.mock.calls[0][0]).to.equal(first);

      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Valid' } });
      await waitFor(() => expect(onCheck).toHaveBeenCalledTimes(2));
      const second = onCheck.mock.calls[1][0];
      expect(first.profile.object.name.hasError).to.equal(true);
      expect(first.profile.object.name.errorMessage).to.equal('Required');
      expect(second.profile.object.name.hasError).to.equal(false);
      expect(second.profile).not.to.equal(first.profile);
      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError.mock.calls[0][0].profile.object.name.hasError).to.equal(true);
    }
  );

  it.each([false, true])(
    'checks frozen nested errors without mutating them, async=%s',
    async checkAsync => {
      const oldError = Object.freeze({ hasError: true, errorMessage: 'Old error' });
      const errors = Object.freeze({
        profile: Object.freeze({ object: Object.freeze({ name: oldError }) })
      });
      const onCheck = vi.fn();
      const ref = React.createRef<FormInstance<Record<string, any>, any>>();
      render(
        <Form
          ref={ref}
          nestedField
          formError={errors}
          formDefaultValue={{ profile: { name: '' } }}
          onCheck={onCheck}
        >
          <FormControl name="profile.name" rule={StringType().isRequired('Required')} />
        </Form>
      );

      await act(async () => {
        if (checkAsync) await ref.current?.checkForFieldAsync('profile.name');
        else ref.current?.checkForField('profile.name');
      });

      expect(onCheck.mock.lastCall?.[0].profile.object.name.errorMessage).to.equal('Required');
      expect(errors.profile.object.name).to.equal(oldError);
    }
  );

  it.each([false, true])('copies an array error row during async=%s checks', async checkAsync => {
    const oldError = { hasError: true, errorMessage: 'Old error' };
    const sibling = { object: { name: { hasError: true, errorMessage: 'Other error' } } };
    const errors = { products: { array: [{ object: { name: oldError } }, sibling] } };
    const onCheck = vi.fn();
    const ref = React.createRef<FormInstance<Record<string, any>, any>>();
    render(
      <Form
        ref={ref}
        nestedField
        formError={errors}
        formDefaultValue={{ products: [{ name: '' }, { name: 'Other' }] }}
        onCheck={onCheck}
      >
        <FormControl name="products[0].name" rule={StringType().isRequired('Required')} />
      </Form>
    );

    await act(async () => {
      if (checkAsync) await ref.current?.checkForFieldAsync('products[0].name');
      else ref.current?.checkForField('products[0].name');
    });

    const next = onCheck.mock.lastCall?.[0];
    expect(next.products.array[0].object.name.errorMessage).to.equal('Required');
    expect(errors.products.array[0].object.name).to.equal(oldError);
    expect(next.products.array).not.to.equal(errors.products.array);
    expect(next.products.array[0]).not.to.equal(errors.products.array[0]);
    expect(next.products.array[1]).to.equal(sibling);
  });

  it('preserves an earlier array error snapshot when cleanErrorForField removes a leaf', () => {
    const oldError = { hasError: true, errorMessage: 'Old error' };
    const errors = { products: { array: [{ object: { name: oldError } }] } };
    const ref = React.createRef<FormInstance<Record<string, any>, any>>();
    render(
      <Form ref={ref} nestedField formDefaultValue={{ products: [{ name: '' }] }}>
        <FormControl name="products[0].name" />
      </Form>
    );
    act(() => ref.current?.resetErrors(errors));
    expect(screen.getByText('Old error')).to.exist;

    act(() => ref.current?.cleanErrorForField('products[0].name'));

    expect(errors.products.array[0].object.name).to.equal(oldError);
    expect(screen.queryByText('Old error')).not.to.exist;
  });

  it('preserves array errors when shouldResetWithUnmount removes a control', () => {
    const oldError = { hasError: true, errorMessage: 'Old error' };
    const sibling = { object: { name: { hasError: true, errorMessage: 'Other error' } } };
    const errors = { products: { array: [{ object: { name: oldError } }, sibling] } };
    const onCheck = vi.fn();
    const form = (show: boolean) => (
      <Form
        nestedField
        formError={errors}
        formDefaultValue={{ products: [{ name: '' }, { name: 'Other' }] }}
        onCheck={onCheck}
      >
        {show && <FormControl name="products[0].name" shouldResetWithUnmount />}
      </Form>
    );
    const { rerender } = render(form(true));

    rerender(form(false));

    const next = onCheck.mock.lastCall?.[0];
    expect(errors.products.array[0].object.name).to.equal(oldError);
    expect(next.products.array[0].object).not.to.have.property('name');
    expect(next.products.array).not.to.equal(errors.products.array);
    expect(next.products.array[1]).to.equal(sibling);
  });

  it('keeps literal dotted errors when nestedField is disabled', () => {
    const errors = { 'profile.name': 'Old error', profile: { untouched: true } };
    const onCheck = vi.fn();
    const ref = React.createRef<FormInstance<Record<string, any>, any>>();
    render(
      <Form
        ref={ref}
        formError={errors}
        onCheck={onCheck}
        formDefaultValue={{ 'profile.name': '' }}
      >
        <FormControl name="profile.name" rule={StringType().isRequired('Required')} />
      </Form>
    );

    act(() => ref.current?.checkForField('profile.name'));

    expect(onCheck.mock.lastCall?.[0]['profile.name']).to.equal('Required');
    expect(errors['profile.name']).to.equal('Old error');
    expect(onCheck.mock.lastCall?.[0].profile).to.equal(errors.profile);
  });

  it('cleans a literal dotted error without removing another branch', () => {
    const errors = { 'profile.name': 'Old error', profile: { name: 'Retained' } };
    const onCheck = vi.fn();
    const ref = React.createRef<FormInstance<Record<string, any>, any>>();
    render(
      <Form ref={ref} onCheck={onCheck} formDefaultValue={{ 'profile.name': '' }}>
        <FormControl name="profile.name" />
      </Form>
    );
    act(() => ref.current?.resetErrors(errors));

    act(() => ref.current?.cleanErrorForField('profile.name'));

    expect(errors['profile.name']).to.equal('Old error');
    expect(errors.profile.name).to.equal('Retained');
    expect(screen.queryByText('Old error')).not.to.exist;
    expect(onCheck).not.toHaveBeenCalled();
  });

  it('removes a literal dotted error on unmount while retaining sibling identity', () => {
    const errors = { 'profile.name': 'Old error', profile: { name: 'Retained' } };
    const onCheck = vi.fn();
    const form = (show: boolean) => (
      <Form
        formError={errors}
        onCheck={onCheck}
        formDefaultValue={{ 'profile.name': '' }}
        checkTrigger={null}
      >
        {show && <FormControl name="profile.name" shouldResetWithUnmount />}
      </Form>
    );
    const { rerender } = render(form(true));

    rerender(form(false));

    const next = onCheck.mock.lastCall?.[0];
    expect(next).not.to.have.property('profile.name');
    expect(next.profile).to.equal(errors.profile);
    expect(errors['profile.name']).to.equal('Old error');
    expect(errors.profile.name).to.equal('Retained');
  });
});
