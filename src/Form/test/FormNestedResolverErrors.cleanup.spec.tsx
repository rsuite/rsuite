import React, { useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form, { FormInstance } from '..';
import {
  values,
  required,
  Control,
  observeErrors,
  probeModel
} from './nestedResolverErrorFixtures';

describe('Form nested resolver error paths', () => {
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
});
