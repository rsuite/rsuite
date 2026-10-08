import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ArrayType, ObjectType, SchemaModel, StringType } from 'schema-typed';
import Form from '../Form';
import FormControl from '../../FormControl';
import type { FormInstance } from '../hooks/useFormRef';

async function checkAsync(ref: React.RefObject<FormInstance | null>) {
  let result: any;
  await act(async () => {
    result = await ref.current!.checkAsync();
  });
  return result;
}

describe('Form asynchronous schema results', () => {
  it('preserves array object errors and the native result identity for callbacks and controls', async () => {
    const model = SchemaModel({
      products: ArrayType().of(
        ObjectType().shape({ name: StringType().isRequired('Required name') })
      )
    });
    const nativeCheck = vi.spyOn(Object.getPrototypeOf(model), 'checkForFieldAsync');
    const ref = React.createRef<FormInstance>();
    const onCheck = vi.fn();
    const onError = vi.fn();
    try {
      render(
        <Form
          ref={ref}
          nestedField
          model={SchemaModel.combine(model)}
          formDefaultValue={{ products: [{ name: '' }, { name: 'Valid' }] }}
          onCheck={onCheck}
          onError={onError}
        >
          <FormControl name="products[0].name" aria-label="First name" />
          <FormControl name="products[1].name" aria-label="Second name" />
        </Form>
      );

      const result = await checkAsync(ref);

      expect(result).toEqual({
        hasError: true,
        formError: {
          products: {
            hasError: true,
            array: [
              {
                hasError: true,
                object: { name: { hasError: true, errorMessage: 'Required name' } }
              },
              { hasError: false, object: { name: { hasError: false } } }
            ]
          }
        }
      });
      expect(result.formError.products).toBe(await nativeCheck.mock.results[0].value);
      expect(onCheck).toHaveBeenCalledOnce();
      expect(onCheck.mock.calls[0][0]).toBe(result.formError);
      expect(onError).toHaveBeenCalledOnce();
      expect(onError.mock.calls[0][0]).toBe(result.formError);
      const alert = screen.getByRole('alert');
      expect(alert).to.have.text('Required name');
      expect(screen.getByRole('textbox', { name: 'First name' })).to.have.attribute(
        'aria-errormessage',
        alert.id
      );
      expect(screen.getByRole('textbox', { name: 'First name' })).to.have.attribute(
        'aria-invalid',
        'true'
      );
      expect(screen.getByRole('textbox', { name: 'Second name' })).not.to.have.attribute(
        'aria-invalid'
      );
    } finally {
      nativeCheck.mockRestore();
    }
  });

  it('preserves leaf array errors at their corresponding controls', async () => {
    const ref = React.createRef<FormInstance>();
    const model = SchemaModel({ skills: ArrayType().of(StringType().minLength(3, 'Too short')) });
    render(
      <Form ref={ref} nestedField model={model} formDefaultValue={{ skills: ['a', 'Valid'] }}>
        <FormControl name="skills[0]" aria-label="First skill" />
        <FormControl name="skills[1]" aria-label="Second skill" />
      </Form>
    );

    const result = await checkAsync(ref);

    expect(result.formError.skills).toEqual({
      hasError: true,
      array: [{ hasError: true, errorMessage: 'Too short' }, { hasError: false }]
    });
    expect(screen.getByRole('alert')).to.have.text('Too short');
    expect(screen.getByRole('textbox', { name: 'First skill' })).to.have.attribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByRole('textbox', { name: 'Second skill' })).not.to.have.attribute(
      'aria-invalid'
    );
  });

  it('preserves nested object errors within array rows', async () => {
    const ref = React.createRef<FormInstance>();
    const model = SchemaModel({
      products: ArrayType().of(
        ObjectType().shape({
          address: ObjectType().shape({ city: StringType().isRequired('Required city') })
        })
      )
    });
    render(
      <Form
        ref={ref}
        nestedField
        model={model}
        formDefaultValue={{ products: [{ address: { city: '' } }] }}
      >
        <FormControl name="products[0].address.city" aria-label="City" />
      </Form>
    );

    const result = await checkAsync(ref);

    expect(result.formError.products.array[0].object.address.object.city).toEqual({
      hasError: true,
      errorMessage: 'Required city'
    });
    expect(screen.getByRole('alert')).to.have.text('Required city');
    expect(screen.getByRole('textbox', { name: 'City' })).to.have.attribute('aria-invalid', 'true');
  });

  it('preserves nested object results without an array', async () => {
    const ref = React.createRef<FormInstance>();
    const model = SchemaModel({
      profile: ObjectType().shape({
        address: ObjectType().shape({ city: StringType().isRequired('Required city') })
      })
    });
    render(
      <Form
        ref={ref}
        nestedField
        model={model}
        formDefaultValue={{ profile: { address: { city: '' } } }}
      >
        <FormControl name="profile.address.city" aria-label="City" />
      </Form>
    );

    const result = await checkAsync(ref);

    expect(result.formError.profile.object.address.object.city).toEqual({
      hasError: true,
      errorMessage: 'Required city'
    });
    expect(screen.getByRole('alert')).to.have.text('Required city');
  });

  it('clears a formerly invalid array after the controlled value becomes valid', async () => {
    const ref = React.createRef<FormInstance>();
    const model = SchemaModel({
      products: ArrayType().of(
        ObjectType().shape({ name: StringType().isRequired('Required name') })
      )
    });
    const onCheck = vi.fn();
    const onError = vi.fn();
    const form = (name: string) => (
      <Form
        ref={ref}
        nestedField
        checkTrigger={null}
        model={model}
        formValue={{ products: [{ name }] }}
        onCheck={onCheck}
        onError={onError}
      >
        <FormControl name="products[0].name" aria-label="Name" />
      </Form>
    );
    const { rerender } = render(form(''));
    const invalid = await checkAsync(ref);
    expect(screen.getByRole('alert')).to.have.text('Required name');

    rerender(form('Valid'));
    const valid = await checkAsync(ref);

    expect(valid).toEqual({ hasError: false, formError: {} });
    expect(onCheck).toHaveBeenCalledTimes(2);
    expect(onCheck.mock.calls[1][0]).toBe(valid.formError);
    expect(onError).toHaveBeenCalledOnce();
    expect(onError.mock.calls[0][0]).toBe(invalid.formError);
    expect(invalid.formError.products.array[0].object.name.errorMessage).toBe('Required name');
    expect(valid.formError).not.toBe(invalid.formError);
    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.getByRole('textbox', { name: 'Name' })).not.to.have.attribute('aria-invalid');
    expect(screen.getByRole('textbox', { name: 'Name' })).not.to.have.attribute(
      'aria-errormessage'
    );
  });

  it('keeps scalar errors as message strings and shares the published callback payload', async () => {
    const ref = React.createRef<FormInstance>();
    const model = SchemaModel({ name: StringType().isRequired('Required name') });
    const onCheck = vi.fn();
    const onError = vi.fn();
    render(
      <Form
        ref={ref}
        model={model}
        formDefaultValue={{ name: '' }}
        onCheck={onCheck}
        onError={onError}
      >
        <FormControl name="name" />
      </Form>
    );

    const result = await checkAsync(ref);

    expect(result).toEqual({ hasError: true, formError: { name: 'Required name' } });
    expect(onCheck.mock.calls[0][0]).toBe(result.formError);
    expect(onError.mock.calls[0][0]).toBe(result.formError);
    expect(screen.getByRole('alert')).to.have.text('Required name');
  });

  it('keeps an array-level validation message as a string', async () => {
    const ref = React.createRef<FormInstance>();
    const model = SchemaModel({
      skills: ArrayType()
        .minLength(2, 'At least two skills')
        .of(StringType().minLength(3, 'Too short'))
    });
    render(<Form ref={ref} model={model} formDefaultValue={{ skills: ['Valid'] }} />);

    const result = await checkAsync(ref);

    expect(result).toEqual({ hasError: true, formError: { skills: 'At least two skills' } });
  });

  it.each(['', null, 0, false] as const)(
    'keeps an explicit falsy message (%j) in returned and callback payloads',
    async message => {
      const ref = React.createRef<FormInstance>();
      const model = SchemaModel<{ name: string }, any>({
        name: StringType<{ name: string }, any>().isRequired(message)
      });
      const onCheck = vi.fn();
      const onError = vi.fn();
      render(
        <Form
          ref={ref}
          model={model}
          formDefaultValue={{ name: '' }}
          onCheck={onCheck}
          onError={onError}
        >
          <FormControl name="name" />
        </Form>
      );

      const result = await checkAsync(ref);

      expect(result).toEqual({ hasError: true, formError: { name: message } });
      expect(onCheck).toHaveBeenCalledOnce();
      expect(onCheck.mock.calls[0][0]).toBe(result.formError);
      expect(onError).toHaveBeenCalledOnce();
      expect(onError.mock.calls[0][0]).toBe(result.formError);
    }
  );

  it('omits valid array results and does not call onError', async () => {
    const ref = React.createRef<FormInstance>();
    const model = SchemaModel({
      products: ArrayType().of(
        ObjectType().shape({ name: StringType().isRequired('Required name') })
      )
    });
    const onCheck = vi.fn();
    const onError = vi.fn();
    render(
      <Form
        ref={ref}
        nestedField
        model={model}
        formDefaultValue={{ products: [{ name: 'Valid' }] }}
        onCheck={onCheck}
        onError={onError}
      >
        <FormControl name="products[0].name" />
      </Form>
    );

    const result = await checkAsync(ref);

    expect(result).toEqual({ hasError: false, formError: {} });
    expect(onCheck).toHaveBeenCalledOnce();
    expect(onCheck.mock.calls[0][0]).toBe(result.formError);
    expect(onError).not.toHaveBeenCalled();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('publishes scalar and structured errors together while omitting valid fields', async () => {
    const ref = React.createRef<FormInstance>();
    const model = SchemaModel({
      name: StringType().isRequired('Required name'),
      skills: ArrayType().of(StringType().minLength(3, 'Too short')),
      valid: StringType().isRequired('Required valid field')
    });
    const onCheck = vi.fn();
    const onError = vi.fn();
    render(
      <Form
        ref={ref}
        nestedField
        model={model}
        formDefaultValue={{ name: '', skills: ['a'], valid: 'Valid' }}
        onCheck={onCheck}
        onError={onError}
      >
        <FormControl name="name" />
        <FormControl name="skills[0]" />
        <FormControl name="valid" />
      </Form>
    );

    const result = await checkAsync(ref);

    expect(result).toEqual({
      hasError: true,
      formError: {
        name: 'Required name',
        skills: { hasError: true, array: [{ hasError: true, errorMessage: 'Too short' }] }
      }
    });
    expect(onCheck.mock.calls[0][0]).toBe(result.formError);
    expect(onError.mock.calls[0][0]).toBe(result.formError);
    expect(screen.getAllByRole('alert').map(alert => alert.textContent)).toEqual([
      'Required name',
      'Too short'
    ]);
  });
});
