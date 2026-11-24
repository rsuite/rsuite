import React, { useLayoutEffect, useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Form, { type FormInstance } from '..';
import Schema from '../../Schema';

const methods = ['check', 'checkForField', 'checkAsync', 'checkForFieldAsync'] as const;

describe.each(['schema', 'resolver'] as const)(
  'Saved Form methods after a controlled %s commit',
  adapter => {
    it.each(methods)('%s reads the new values from a child layout effect', async method => {
      const before = Object.freeze({ name: 'before', keep: Object.freeze({ value: 'untouched' }) });
      const after = Object.freeze({ name: 'after', keep: before.keep });
      const ref = React.createRef<FormInstance>();
      const inputs: unknown[] = [];
      const onCheck = vi.fn();
      const onError = vi.fn();
      let pending!: Promise<any>;
      let calls = 0;
      const record = (value: string, data: unknown) => {
        inputs.push(data);
        return value === 'after';
      };
      const type = Schema.Types.StringType();
      if (method.endsWith('Async')) {
        type.addAsyncRule(async (value, data) => record(value, data), 'Read an old value');
      } else {
        type.addRule(record, 'Read an old value');
      }
      const model = Schema.Model({ name: type });
      const resolver = (value: any) => {
        inputs.push(value);
        const result = { errors: value.name === 'after' ? {} : { name: 'Read an old value' } };
        return method.endsWith('Async') ? Promise.resolve(result) : result;
      };

      function LayoutProbe({ value }: { value: typeof before | typeof after }) {
        useLayoutEffect(() => {
          if (value !== after) return;
          calls++;
          const result =
            method === 'checkForField' || method === 'checkForFieldAsync'
              ? saved[method]('name')
              : saved[method]();
          pending = Promise.resolve(result);
        }, [value]);
        return <Form.Control name="name" aria-label="Name" />;
      }
      function Owner() {
        const [value, setValue] = useState<typeof before | typeof after>(before);
        return (
          <>
            <button type="button" onClick={() => setValue(after)}>
              Commit values
            </button>
            <Form
              ref={ref}
              formValue={value}
              model={model}
              resolver={adapter === 'resolver' ? resolver : undefined}
              onCheck={onCheck}
              onError={onError}
            >
              <LayoutProbe value={value} />
            </Form>
          </>
        );
      }
      render(<Owner />);
      const saved = ref.current!;
      fireEvent.click(screen.getByRole('button', { name: 'Commit values' }));
      expect(calls).toBe(1);
      let result: any;
      await act(async () => {
        result = await pending;
      });
      expect(inputs).toEqual([after]);
      expect(inputs[0]).toBe(after);
      if (method.endsWith('Async')) expect(result).toMatchObject({ hasError: false });
      else expect(result).toBe(true);
      expect(onCheck).toHaveBeenCalledExactlyOnceWith({});
      expect(onError).not.toHaveBeenCalled();
      expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('after');
      expect(before).toEqual({ name: 'before', keep: { value: 'untouched' } });
      expect(after).toEqual({ name: 'after', keep: { value: 'untouched' } });
    });
  }
);
