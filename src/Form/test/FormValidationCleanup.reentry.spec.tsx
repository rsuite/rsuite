import React from 'react';
import { flushSync } from 'react-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import { ObjectType, SchemaModel, StringType } from 'schema-typed';
import { describe, expect, it, vi } from 'vitest';
import Form from '../Form';
import type { FormInstance } from '../hooks/useFormRef';

describe.each(['resolver', 'schema'] as const)('Form cleanup during %s onCheck', adapter => {
  describe.each(['form', 'field'] as const)('%s check', api => {
    it.each(['reset', 'resetErrors', 'remove'] as const)(
      'preserves the newer %s and suppresses the stale onError',
      async cleanup => {
        const ref = React.createRef<FormInstance>();
        let cleaned = false;
        let hide!: () => void;
        const props =
          adapter === 'resolver'
            ? { resolver: async () => ({ errors: { name: 'Old error' } }) }
            : {
                model: SchemaModel({
                  name: StringType().addAsyncRule(async () => false, 'Old error')
                })
              };
        const onError = vi.fn();
        const onCheck = vi.fn(() => {
          if (cleaned) return;
          cleaned = true;
          if (cleanup === 'reset') ref.current!.reset();
          else if (cleanup === 'resetErrors') ref.current!.resetErrors({ name: 'Server error' });
          else flushSync(hide);
        });
        function Example() {
          const [shown, setShown] = React.useState(true);
          hide = () => setShown(false);
          return (
            <Form
              {...props}
              ref={ref}
              formDefaultValue={{ name: 'value' }}
              onCheck={onCheck}
              onError={onError}
            >
              {shown && <Form.Control name="name" aria-label="Name" shouldResetWithUnmount />}
            </Form>
          );
        }
        render(<Example />);
        await act(async () => {
          const result = await (api === 'form'
            ? ref.current!.checkAsync()
            : ref.current!.checkForFieldAsync('name'));
          expect(result.hasError).toBe(true);
        });

        expect(onCheck).toHaveBeenCalledTimes(cleanup === 'remove' ? 2 : 1);
        expect(onError).not.toHaveBeenCalled();
        if (cleanup === 'resetErrors')
          expect(screen.getByRole('alert')).toHaveTextContent('Server error');
        else expect(screen.queryByRole('alert')).toBeNull();
        if (cleanup === 'remove') expect(screen.queryByRole('textbox')).toBeNull();
        if (cleanup === 'reset')
          expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid', 'true');
      }
    );
  });
});

it('preserves a reset made by a nested field onCheck', async () => {
  const ref = React.createRef<FormInstance>();
  const model = SchemaModel({
    user: ObjectType().shape({ name: StringType().addAsyncRule(async () => false, 'Old error') })
  });
  const onCheck = vi.fn(() => ref.current!.reset());
  const onError = vi.fn();
  render(
    <Form
      ref={ref}
      model={model}
      nestedField
      formDefaultValue={{ user: { name: 'value' } }}
      onCheck={onCheck}
      onError={onError}
    >
      <Form.Control name="user.name" aria-label="Name" />
    </Form>
  );
  await act(async () => {
    expect((await ref.current!.checkForFieldAsync('user.name')).hasError).toBe(true);
  });
  expect(onCheck).toHaveBeenCalledOnce();
  expect(onError).not.toHaveBeenCalled();
  expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid', 'true');
  expect(screen.queryByRole('alert')).toBeNull();
});

it('retains explicitly selected native error provenance while cancelling a pending valid result', async () => {
  const ref = React.createRef<FormInstance>();
  const releases: ((valid: boolean) => void)[] = [];
  const model = SchemaModel({
    name: StringType().addAsyncRule(() =>
      new Promise<boolean>(resolve => releases.push(resolve)).then(valid => ({
        hasError: !valid,
        errorMessage: ''
      }))
    )
  });
  const onCheck = vi.fn();
  const onError = vi.fn();
  render(
    <Form
      ref={ref}
      model={model}
      formDefaultValue={{ name: 'value' }}
      onCheck={onCheck}
      onError={onError}
    >
      <Form.Control name="name" aria-label="Name" />
    </Form>
  );
  let first!: ReturnType<FormInstance['checkAsync']>;
  act(() => {
    first = ref.current!.checkAsync();
  });
  await waitFor(() => expect(releases).toHaveLength(1));
  let saved: any;
  await act(async () => {
    releases[0](false);
    saved = (await first).formError;
  });
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  let pending!: ReturnType<FormInstance['checkAsync']>;
  act(() => {
    pending = ref.current!.checkAsync();
  });
  await waitFor(() => expect(releases).toHaveLength(2));
  act(() => ref.current!.resetErrors(saved));
  onCheck.mockClear();
  onError.mockClear();
  await act(async () => {
    releases[1](true);
    expect((await pending).hasError).toBe(false);
  });
  expect(onCheck).not.toHaveBeenCalled();
  expect(onError).not.toHaveBeenCalled();
  expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  expect(screen.queryByRole('alert')).toBeNull();
});
