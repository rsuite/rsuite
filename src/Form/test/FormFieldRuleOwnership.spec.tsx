import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { StringType } from 'schema-typed';
import Form from '../Form';
import Schema from '../../Schema';
import type { FormInstance } from '../hooks/useFormRef';

function checkField(ref: React.RefObject<FormInstance | null>, name: string) {
  let valid = false;
  act(() => {
    valid = ref.current!.checkForField(name);
  });
  return valid;
}

function renderDuplicateFields(nestedField: boolean, strict: boolean) {
  const ref = React.createRef<FormInstance>();
  const onCheck = vi.fn();
  const name = nestedField ? 'profile.name' : 'username';
  const firstRule = StringType().isRequired('First rule');
  const secondRule = StringType().minLength(5, 'Second rule');
  const values = nestedField ? { profile: { name: 'abc' } } : { username: 'abc' };
  const ui = (first: boolean, second: boolean) => {
    const form = (
      <Form ref={ref} nestedField={nestedField} formDefaultValue={values} onCheck={onCheck}>
        {first && (
          <Form.Control key="first" name={name} rule={firstRule} aria-label="First field" />
        )}
        {second && (
          <Form.Control key="second" name={name} rule={secondRule} aria-label="Second field" />
        )}
      </Form>
    );
    return strict ? <React.StrictMode>{form}</React.StrictMode> : form;
  };
  return { ...render(ui(true, true)), ref, name, ui };
}

describe('Form field rule ownership', () => {
  describe.each([false, true])('StrictMode=%s', strict => {
    it.each([false, true])(
      'restores the earlier rule after the last duplicate unmounts, nestedField=%s',
      nestedField => {
        const { ref, name, ui, rerender } = renderDuplicateFields(nestedField, strict);
        expect(checkField(ref, name)).to.equal(false);

        rerender(ui(true, false));

        expect(checkField(ref, name)).to.equal(true);
        expect(screen.getByRole('textbox', { name: 'First field' })).to.have.value('abc');
        expect(screen.getByRole('textbox', { name: 'First field' })).not.toHaveAttribute(
          'aria-invalid'
        );
        expect(screen.queryByText('Second rule')).to.be.null;
      }
    );

    it.each([false, true])(
      'retains the later rule after the first duplicate unmounts, nestedField=%s',
      nestedField => {
        const { ref, name, ui, rerender } = renderDuplicateFields(nestedField, strict);
        expect(checkField(ref, name)).to.equal(false);

        rerender(ui(false, true));

        expect(checkField(ref, name)).to.equal(false);
        expect(screen.getByRole('textbox', { name: 'Second field' })).to.have.value('abc');
        expect(screen.getByRole('textbox', { name: 'Second field' })).toHaveAttribute(
          'aria-invalid',
          'true'
        );
        expect(screen.getByText('Second rule')).to.exist;
      }
    );
  });

  it('moves only the owning rule when a duplicate changes its name', () => {
    const ref = React.createRef<FormInstance>();
    const firstRule = StringType().isRequired('First rule');
    const secondRule = StringType().minLength(5, 'Second rule');
    const ui = (name: string) => (
      <Form ref={ref} formDefaultValue={{ username: 'abc', email: 'abc' }}>
        <Form.Control key="first" name="username" rule={firstRule} aria-label="First field" />
        <Form.Control key="second" name={name} rule={secondRule} aria-label="Second field" />
      </Form>
    );
    const { rerender } = render(ui('username'));
    expect(checkField(ref, 'username')).to.equal(false);

    rerender(ui('email'));

    expect(checkField(ref, 'username')).to.equal(true);
    expect(checkField(ref, 'email')).to.equal(false);
    expect(screen.getByRole('textbox', { name: 'First field' })).not.toHaveAttribute(
      'aria-invalid'
    );
    expect(screen.getByRole('textbox', { name: 'Second field' })).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('preserves another field registration and the base model when a field unmounts', () => {
    const ref = React.createRef<FormInstance>();
    const firstRule = StringType().isRequired('First rule');
    const secondRule = StringType().minLength(5, 'Second rule');
    const model = Schema.Model({ email: StringType().isRequired('Base email rule') });
    const ui = (second: boolean) => (
      <Form ref={ref} model={model} formDefaultValue={{ username: 'abc', email: 'abc' }}>
        <Form.Control key="first" name="username" rule={firstRule} />
        {second && <Form.Control key="second" name="email" rule={secondRule} />}
      </Form>
    );
    const { rerender } = render(ui(true));
    expect(checkField(ref, 'username')).to.equal(true);
    expect(checkField(ref, 'email')).to.equal(false);

    rerender(ui(false));

    expect(checkField(ref, 'username')).to.equal(true);
    expect(checkField(ref, 'email')).to.equal(true);
  });

  it('updates a registered rule prop and removes its same owner on unmount', () => {
    const ref = React.createRef<FormInstance>();
    const onCheck = vi.fn();
    const model = Schema.Model({ username: StringType().minLength(4, 'Base rule') });
    const firstRule = StringType().minLength(5, 'First rule');
    const replacementRule = StringType().minLength(2, 'Replacement rule');
    const ui = (rule: typeof firstRule | null) => (
      <Form ref={ref} model={model} formDefaultValue={{ username: 'abc' }} onCheck={onCheck}>
        {rule && <Form.Control name="username" rule={rule} />}
      </Form>
    );
    const { rerender } = render(ui(firstRule));
    expect(checkField(ref, 'username')).to.equal(false);
    expect(onCheck.mock.lastCall?.[0]).to.deep.equal({ username: 'First rule' });

    rerender(ui(replacementRule));

    expect(checkField(ref, 'username')).to.equal(true);
    rerender(ui(null));
    expect(checkField(ref, 'username')).to.equal(false);
    expect(onCheck.mock.lastCall?.[0]).to.deep.equal({ username: 'Base rule' });
  });
});
