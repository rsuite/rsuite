import React, { useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form, { FormInstance } from '../index';
import Schema from '../../Schema';

const values = { profile: { name: '', email: '' }, products: [{ name: '' }, { name: '' }] };
const required = { hasError: true, errorMessage: 'Required' };
const projectionRows = [
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

function Control({
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

function observeErrors(
  ref: React.RefObject<FormInstance<Record<string, any>, any> | null>,
  onCheck: ReturnType<typeof vi.fn>
) {
  act(() => {
    expect(ref.current?.checkForField('probe')).toBe(true);
  });
  return onCheck.mock.lastCall?.[0];
}

const probeModel = () => Schema.Model({ probe: Schema.Types.StringType() });

describe('Form nested resolver error paths', () => {
  for (const row of projectionRows) {
    it(`exposes ${row.label} errors and connects the accessible error message`, () => {
      const errors = row.errors;
      const before = JSON.stringify(errors);
      render(
        <Form
          nestedField={row.nested !== false}
          formValue={row.values || values}
          formError={errors}
          resolver={() => ({ errors })}
        >
          <Control name={row.name} />
        </Form>
      );
      expect(screen.getByRole('textbox', { name: 'target' })).toHaveAttribute(
        'aria-invalid',
        'true'
      );
      expect(screen.getByRole('textbox', { name: 'target' })).toHaveAttribute(
        'aria-errormessage',
        'target-error-message'
      );
      expect(screen.getByRole('alert')).toHaveAttribute('id', 'target-error-message');
      expect(screen.getByRole('alert')).toHaveTextContent('Required');
      expect(JSON.stringify(errors)).toBe(before);
    });
  }

  for (const checkAsync of [false, true]) {
    for (const row of [
      projectionRows[0],
      projectionRows[2],
      projectionRows[3],
      projectionRows[4]
    ]) {
      it(`returns the raw ${row.label} field error from ${checkAsync ? 'async' : 'sync'} resolver checks`, async () => {
        const errors = row.errors;
        const expected = row === projectionRows[4] ? required : 'Required';
        const onCheck = vi.fn();
        const onError = vi.fn();
        const callback = vi.fn();
        const ref = React.createRef<FormInstance<Record<string, any>, any>>();
        render(
          <Form
            ref={ref}
            nestedField
            formDefaultValue={values}
            resolver={() => (checkAsync ? Promise.resolve({ errors }) : { errors })}
            onCheck={onCheck}
            onError={onError}
          >
            <Control name={row.name} />
          </Form>
        );
        if (checkAsync) {
          let result: any;
          await act(async () => {
            result = await ref.current?.checkForFieldAsync(row.name);
          });
          expect(result).toEqual({ hasError: true, errorMessage: expected });
          expect(result.errorMessage).toBe(expected);
        } else {
          act(() => {
            expect(ref.current?.checkForField(row.name, callback)).toBe(false);
          });
          expect(callback).toHaveBeenCalledTimes(1);
          expect(callback.mock.lastCall?.[0]).toEqual({ hasError: true, errorMessage: expected });
          expect(callback.mock.lastCall?.[0].errorMessage).toBe(expected);
        }
        expect(onCheck).toHaveBeenCalledTimes(1);
        expect(onError).toHaveBeenCalledTimes(1);
        expect(onCheck.mock.lastCall?.[0]).toEqual(errors);
        expect(onError.mock.lastCall?.[0]).toEqual(errors);
        if (row === projectionRows[4])
          expect(onCheck.mock.lastCall?.[0].profile).toBe(errors.profile);
        expect(screen.getByRole('alert')).toHaveTextContent('Required');
        expect(screen.getByRole('textbox', { name: 'target' })).toHaveAttribute(
          'aria-invalid',
          'true'
        );
      });
    }
  }

  for (const empty of [undefined, null, '']) {
    it(`lets an own exact ${String(empty)} error suppress aliases and structured fallback`, () => {
      const errors = {
        'products[0].name': empty,
        'products.0.name': 'Old alias',
        products: {
          array: [{ object: { name: { hasError: true, errorMessage: 'Old structured' } } }]
        }
      };
      render(
        <Form nestedField formValue={values} formError={errors}>
          <Control name="products[0].name" />
        </Form>
      );
      expect(screen.getByRole('textbox', { name: 'target' })).not.toHaveAttribute('aria-invalid');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(Object.prototype.hasOwnProperty.call(errors, 'products[0].name')).toBe(true);
    });
  }

  for (const checkAsync of [false, true]) {
    for (const empty of [undefined, null, '']) {
      it(`installs an own exact ${String(empty)} resolver success consistently after ${checkAsync ? 'async' : 'sync'} field checks`, async () => {
        const sibling = { object: { name: { hasError: true, errorMessage: 'Sibling' } } };
        const email = { hasError: true, errorMessage: 'Email' };
        const errors = {
          'products[0].name': empty,
          'products.0.name': 'Old alias',
          'products[1].name': 'Sibling',
          'products.array[0].object.name': 'Other literal',
          products: {
            hasError: true,
            errorMessage: 'Aggregate',
            array: [{ object: { name: required, email } }, sibling]
          }
        };
        const before = JSON.stringify(errors);
        const callback = vi.fn();
        const onCheck = vi.fn();
        const onError = vi.fn();
        const ref = React.createRef<FormInstance<Record<string, any>, any>>();
        render(
          <Form
            ref={ref}
            nestedField
            formDefaultValue={values}
            resolver={() => (checkAsync ? Promise.resolve({ errors }) : { errors })}
            onCheck={onCheck}
            onError={onError}
          >
            <Control name="products[0].name" />
            <Control name="products[1].name" id="sibling" />
          </Form>
        );
        if (checkAsync) {
          let result: any;
          await act(async () => {
            result = await ref.current?.checkForFieldAsync('products[0].name');
          });
          expect(result).toEqual({ hasError: false, errorMessage: empty });
        } else {
          act(() => {
            expect(ref.current?.checkForField('products[0].name', callback)).toBe(true);
          });
          expect(callback).toHaveBeenCalledExactlyOnceWith({ hasError: false });
        }
        expect(onCheck).toHaveBeenCalledTimes(1);
        const next = onCheck.mock.lastCall?.[0];
        expect(Object.prototype.hasOwnProperty.call(next, 'products[0].name')).toBe(false);
        expect(Object.prototype.hasOwnProperty.call(next, 'products.0.name')).toBe(false);
        expect(next.products.array[0].object).not.toHaveProperty('name');
        expect(next.products.array[0].object.email).toBe(email);
        expect(next.products.array[1]).toBe(sibling);
        expect(next.products.errorMessage).toBe('Aggregate');
        expect(next['products.array[0].object.name']).toBe('Other literal');
        expect(next['products[1].name']).toBe('Sibling');
        expect(onError).toHaveBeenCalledExactlyOnceWith(next);
        expect(onError.mock.lastCall?.[0]).toBe(next);
        expect(screen.getByRole('textbox', { name: 'target' })).not.toHaveAttribute('aria-invalid');
        expect(document.getElementById('target-error-message')).not.toBeInTheDocument();
        expect(document.getElementById('sibling-error-message')).toHaveTextContent('Sibling');
        expect(JSON.stringify(errors)).toBe(before);
        expect(Object.prototype.hasOwnProperty.call(errors, 'products[0].name')).toBe(true);
        expect(errors['products[0].name']).toBe(empty);
      });
    }
  }

  for (const checkAsync of [false, true]) {
    it(`keeps an own exact nonempty error ahead of an empty numeric alias during ${checkAsync ? 'async' : 'sync'} field checks`, async () => {
      const schema = {
        errorMessage: 'Aggregate',
        array: [
          { object: { name: required } },
          { object: { name: { hasError: true, errorMessage: 'Sibling' } } }
        ]
      };
      const errors = {
        'products[0].name': '',
        'products.0.name': 'Exact error',
        'products[1].name': 'Sibling',
        'products.array[0].object.name': 'Other literal',
        products: schema
      };
      const before = JSON.stringify(errors);
      const callback = vi.fn();
      const onCheck = vi.fn();
      const onError = vi.fn();
      const ref = React.createRef<FormInstance<Record<string, any>, any>>();
      render(
        <Form
          ref={ref}
          nestedField
          formDefaultValue={values}
          resolver={() => (checkAsync ? Promise.resolve({ errors }) : { errors })}
          onCheck={onCheck}
          onError={onError}
        >
          <Control name="products.0.name" />
          <Control name="products[1].name" id="sibling" />
        </Form>
      );
      const expected = { hasError: true, errorMessage: 'Exact error' };
      if (checkAsync) {
        let result: any;
        await act(async () => {
          result = await ref.current?.checkForFieldAsync('products.0.name');
        });
        expect(result).toEqual(expected);
      } else {
        act(() => {
          expect(ref.current?.checkForField('products.0.name', callback)).toBe(false);
        });
        expect(callback).toHaveBeenCalledExactlyOnceWith(expected);
      }
      expect(onCheck).toHaveBeenCalledTimes(1);
      const next = onCheck.mock.lastCall?.[0];
      expect(next['products.0.name']).toBe('Exact error');
      expect(Object.prototype.hasOwnProperty.call(next, 'products[0].name')).toBe(false);
      expect(next.products).toBe(schema);
      expect(next['products[1].name']).toBe('Sibling');
      expect(next['products.array[0].object.name']).toBe('Other literal');
      expect(onError).toHaveBeenCalledExactlyOnceWith(next);
      expect(onError.mock.lastCall?.[0]).toBe(next);
      expect(screen.getByRole('textbox', { name: 'target' })).toHaveAttribute(
        'aria-invalid',
        'true'
      );
      expect(document.getElementById('target-error-message')).toHaveTextContent('Exact error');
      expect(document.getElementById('sibling-error-message')).toHaveTextContent('Sibling');
      expect(JSON.stringify(errors)).toBe(before);
    });
  }

  it('clears every numeric alias and the same structured leaf while retaining sibling rows and aggregate messages', () => {
    const sibling = { object: { name: { hasError: true, errorMessage: 'Sibling' } } };
    const leafSibling = { hasError: true, errorMessage: 'Email' };
    const errors = {
      'products[0].name': 'Target',
      'products.0.name': 'Old alias',
      'products[1].name': 'Sibling',
      'unrelated.literal': 'Other literal',
      products: {
        hasError: true,
        errorMessage: 'Aggregate',
        array: [
          {
            object: { name: { hasError: true, errorMessage: 'Old structured' }, email: leafSibling }
          },
          sibling
        ]
      }
    };
    const before = JSON.stringify(errors);
    const ref = React.createRef<FormInstance<Record<string, any>, any>>();
    const onCheck = vi.fn();
    render(
      <Form
        ref={ref}
        nestedField
        model={probeModel()}
        formDefaultValue={{ ...values, probe: 'ok' }}
        onCheck={onCheck}
      >
        <Control name="products[0].name" />
        <Control name="products[1].name" id="sibling" />
      </Form>
    );
    act(() => ref.current?.resetErrors(errors));
    expect(screen.getByRole('textbox', { name: 'target' })).toHaveAttribute('aria-invalid', 'true');
    act(() => ref.current?.cleanErrorForField('products[0].name'));
    expect(screen.getByRole('textbox', { name: 'target' })).not.toHaveAttribute('aria-invalid');
    expect(screen.queryByText('Target')).not.toBeInTheDocument();
    const next = observeErrors(ref, onCheck);
    expect(Object.prototype.hasOwnProperty.call(next, 'products[0].name')).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(next, 'products.0.name')).toBe(false);
    expect(next.products.array[0].object).not.toHaveProperty('name');
    expect(next.products.array[0].object.email).toBe(leafSibling);
    expect(next.products.array[1]).toBe(sibling);
    expect(next.products.errorMessage).toBe('Aggregate');
    expect(next['unrelated.literal']).toBe('Other literal');
    expect(next['products[1].name']).toBe('Sibling');
    expect(screen.getByRole('textbox', { name: 'sibling' })).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(JSON.stringify(errors)).toBe(before);
  });

  it('reads and clears a schema leaf without stealing an unrelated root literal containing schema markers', () => {
    const email = { hasError: true, errorMessage: 'Email' };
    const errors = {
      'profile.object.name': 'Other literal',
      profile: { hasError: true, errorMessage: 'Aggregate', object: { name: required, email } }
    };
    const before = JSON.stringify(errors);
    const ref = React.createRef<FormInstance<Record<string, any>, any>>();
    const onCheck = vi.fn();
    render(
      <Form
        ref={ref}
        nestedField
        model={probeModel()}
        formDefaultValue={{ ...values, probe: 'ok' }}
        onCheck={onCheck}
      >
        <Control name="profile.name" />
        <Control name="profile.object.name" id="literal" />
      </Form>
    );
    act(() => ref.current?.resetErrors(errors));
    expect(document.getElementById('target-error-message')).toHaveTextContent('Required');
    act(() => ref.current?.cleanErrorForField('profile.name'));
    expect(screen.getByRole('textbox', { name: 'target' })).not.toHaveAttribute('aria-invalid');
    const next = observeErrors(ref, onCheck);
    expect(next['profile.object.name']).toBe('Other literal');
    expect(next.profile.object).not.toHaveProperty('name');
    expect(next.profile.object.email).toBe(email);
    expect(next.profile.errorMessage).toBe('Aggregate');
    expect(JSON.stringify(errors)).toBe(before);
  });

  it('keeps nonnested numeric spellings as separate literal fields during cleanup', () => {
    const branch = { array: [{ object: { name: required } }] };
    const errors = {
      'products[0].name': 'Target',
      'products.0.name': 'Other literal',
      products: branch
    };
    const ref = React.createRef<FormInstance<Record<string, any>, any>>();
    const onCheck = vi.fn();
    render(
      <Form ref={ref} model={probeModel()} formDefaultValue={{ probe: 'ok' }} onCheck={onCheck}>
        <Control name="products[0].name" />
        <Control name="products.0.name" id="literal" />
      </Form>
    );
    act(() => ref.current?.resetErrors(errors));
    act(() => ref.current?.cleanErrorForField('products[0].name'));
    const next = observeErrors(ref, onCheck);
    expect(Object.prototype.hasOwnProperty.call(next, 'products[0].name')).toBe(false);
    expect(next['products.0.name']).toBe('Other literal');
    expect(next.products).toBe(branch);
    expect(errors['products[0].name']).toBe('Target');
  });

  it('does not traverse a nonnested dotted name when that literal key is absent', () => {
    const branch = { name: 'Untouched' };
    const ref = React.createRef<FormInstance<Record<string, any>, any>>();
    const onCheck = vi.fn();
    render(
      <Form ref={ref} model={probeModel()} formDefaultValue={{ probe: 'ok' }} onCheck={onCheck}>
        <Control name="profile.name" />
      </Form>
    );
    act(() => ref.current?.resetErrors({ profile: branch }));
    act(() => ref.current?.cleanErrorForField('profile.name'));
    expect(observeErrors(ref, onCheck).profile).toBe(branch);
    expect(branch.name).toBe('Untouched');
  });

  for (const accept of [false, true]) {
    it(`proposes complete unmount cleanup while a controlled error owner ${accept ? 'accepts' : 'rejects'} it`, () => {
      const sibling = { object: { name: { hasError: true, errorMessage: 'Sibling' } } };
      const errors = {
        'products[0].name': 'Target',
        'products.0.name': 'Old alias',
        products: { errorMessage: 'Aggregate', array: [{ object: { name: required } }, sibling] }
      };
      const before = JSON.stringify(errors);
      const proposals: any[] = [];
      function Owner() {
        const [current, setCurrent] = useState<any>(errors);
        const [show, setShow] = useState(true);
        return (
          <Form
            nestedField
            formDefaultValue={values}
            formError={current}
            onCheck={next => {
              proposals.push(next);
              if (accept) setCurrent(next);
            }}
          >
            {show && <Control name="products[0].name" reset />}
            <Control name="products[1].name" id="sibling" />
            <button type="button" onClick={() => setShow(!show)}>
              Toggle target
            </button>
            <output aria-label="Owner errors">{JSON.stringify(current)}</output>
          </Form>
        );
      }
      render(<Owner />);
      fireEvent.click(screen.getByRole('button', { name: 'Toggle target' }));
      expect(proposals).toHaveLength(1);
      const next = proposals[0];
      expect(Object.prototype.hasOwnProperty.call(next, 'products[0].name')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(next, 'products.0.name')).toBe(false);
      expect(next.products.array[0].object).not.toHaveProperty('name');
      expect(next.products.array[1]).toBe(sibling);
      expect(next.products.errorMessage).toBe('Aggregate');
      expect(JSON.stringify(errors)).toBe(before);
      expect(screen.getByLabelText('Owner errors')).toHaveTextContent(
        JSON.stringify(accept ? next : errors)
      );
      fireEvent.click(screen.getByRole('button', { name: 'Toggle target' }));
      if (accept)
        expect(screen.getByRole('textbox', { name: 'target' })).not.toHaveAttribute('aria-invalid');
      else expect(document.getElementById('target-error-message')).toHaveTextContent('Target');
      expect(screen.getByRole('textbox', { name: 'sibling' })).toHaveAttribute(
        'aria-invalid',
        'true'
      );
    });
  }

  it('keeps leading-zero index tokens distinct from canonical numeric indices', () => {
    const errors = { 'products.01.name': 'Leading zero', 'products.1.name': 'Second row' };
    const ref = React.createRef<FormInstance<Record<string, any>, any>>();
    const onCheck = vi.fn();
    render(
      <Form
        ref={ref}
        nestedField
        model={probeModel()}
        formDefaultValue={{ ...values, probe: 'ok' }}
        onCheck={onCheck}
      >
        <Control name="products[01].name" />
        <Control name="products[1].name" id="sibling" />
      </Form>
    );
    act(() => ref.current?.resetErrors(errors));
    expect(document.getElementById('target-error-message')).toHaveTextContent('Leading zero');
    expect(document.getElementById('sibling-error-message')).toHaveTextContent('Second row');
    act(() => ref.current?.cleanErrorForField('products[01].name'));
    const next = observeErrors(ref, onCheck);
    expect(Object.prototype.hasOwnProperty.call(next, 'products.01.name')).toBe(false);
    expect(next['products.1.name']).toBe('Second row');
    expect(errors['products.01.name']).toBe('Leading zero');
  });

  for (const name of ['profile["labels.0"]', 'products\\[0].name']) {
    it(`keeps quoted or escaped literal ${name} separate from unquoted numeric aliases`, () => {
      const otherName = name.startsWith('profile') ? 'profile.labels.0' : 'products[0].name';
      const errors = { [name]: 'Literal target', [otherName]: 'Other path' };
      const ref = React.createRef<FormInstance<Record<string, any>, any>>();
      const onCheck = vi.fn();
      render(
        <Form
          ref={ref}
          nestedField
          model={probeModel()}
          formDefaultValue={{ ...values, probe: 'ok' }}
          onCheck={onCheck}
        >
          <Control name={name} />
          <Control name={otherName} id="sibling" />
        </Form>
      );
      act(() => ref.current?.resetErrors(errors));
      expect(document.getElementById('target-error-message')).toHaveTextContent('Literal target');
      act(() => ref.current?.cleanErrorForField(name));
      const next = observeErrors(ref, onCheck);
      expect(Object.prototype.hasOwnProperty.call(next, name)).toBe(false);
      expect(next[otherName]).toBe('Other path');
      expect(screen.getByRole('textbox', { name: 'sibling' })).toHaveAttribute(
        'aria-invalid',
        'true'
      );
      expect(errors[name]).toBe('Literal target');
    });
  }

  it('preserves a resolver React error element in UI and field callback payloads', () => {
    const error = <span>Element error</span>;
    const errors = { 'profile.name': error };
    const callback = vi.fn();
    const onCheck = vi.fn();
    const onError = vi.fn();
    const ref = React.createRef<FormInstance<Record<string, any>, any>>();
    render(
      <Form
        ref={ref}
        nestedField
        formDefaultValue={values}
        resolver={() => ({ errors })}
        onCheck={onCheck}
        onError={onError}
      >
        <Control name="profile.name" />
      </Form>
    );
    act(() => {
      expect(ref.current?.checkForField('profile.name', callback)).toBe(false);
    });
    expect(screen.getByRole('alert')).toHaveTextContent('Element error');
    expect(callback.mock.lastCall?.[0].errorMessage).toBe(error);
    expect(onCheck.mock.lastCall?.[0]['profile.name']).toBe(error);
    expect(onError.mock.lastCall?.[0]['profile.name']).toBe(error);
    expect(errors['profile.name']).toBe(error);
  });

  for (const checkAsync of [false, true]) {
    it(`keeps native object/array schema field errors compatible with ${checkAsync ? 'async' : 'sync'} checks`, async () => {
      const model = Schema.Model({
        profile: Schema.Types.ObjectType().shape({
          name: Schema.Types.StringType().isRequired('Object required')
        }),
        products: Schema.Types.ArrayType().of(
          Schema.Types.ObjectType().shape({
            name: Schema.Types.StringType().isRequired('Array required')
          })
        )
      });
      const ref = React.createRef<FormInstance<Record<string, any>, any>>();
      render(
        <Form ref={ref} nestedField model={model} formDefaultValue={values}>
          <Control name="profile.name" />
          <Control name="products[0].name" id="array" />
        </Form>
      );
      if (checkAsync) {
        await act(async () => {
          expect((await ref.current?.checkForFieldAsync('profile.name'))?.hasError).toBe(true);
        });
        await act(async () => {
          expect((await ref.current?.checkForFieldAsync('products[0].name'))?.hasError).toBe(true);
        });
      } else {
        act(() => {
          expect(ref.current?.checkForField('profile.name')).toBe(false);
        });
        act(() => {
          expect(ref.current?.checkForField('products[0].name')).toBe(false);
        });
      }
      expect(document.getElementById('target-error-message')).toHaveTextContent('Object required');
      expect(document.getElementById('array-error-message')).toHaveTextContent('Array required');
      expect(screen.getByRole('textbox', { name: 'target' })).toHaveAttribute(
        'aria-invalid',
        'true'
      );
      expect(screen.getByRole('textbox', { name: 'array' })).toHaveAttribute(
        'aria-invalid',
        'true'
      );
    });
  }
});
