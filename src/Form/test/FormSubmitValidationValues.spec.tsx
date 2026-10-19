import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Form, { type FormInstance } from '..';
import Schema from '../../Schema';

describe('Form submit validated values', () => {
  it.each(['schema', 'resolver'] as const)(
    'submits the valid accepted change instead of the invalid previous value (%s)',
    async adapter => {
      const initial = Object.freeze({ name: 'before' });
      const inputs: { name: string }[] = [];
      const proposals: { name: string }[] = [];
      const submissions: { value: { name: string }; event: unknown }[] = [];
      const returns: void[] = [];
      const ref = React.createRef<FormInstance>();
      const record = (value: string, data: any) => {
        inputs.push(data);
        return value === 'after';
      };
      const model = Schema.Model({
        name: Schema.Types.StringType().addRule(record, 'Invalid')
      });
      const resolver = (value: any) => ({
        errors: record(value.name, value) ? {} : { name: 'Invalid' }
      });
      render(
        <Form
          ref={ref}
          formDefaultValue={initial}
          model={model}
          checkTrigger={null}
          resolver={adapter === 'resolver' ? resolver : undefined}
          onChange={value => {
            proposals.push(value as { name: string });
            returns.push(ref.current!.submit());
          }}
          onSubmit={(value, event) => submissions.push({ value: value as { name: string }, event })}
        >
          <Form.Control name="name" aria-label="Name" />
        </Form>
      );
      await act(async () => {
        fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), {
          target: { value: 'after' }
        });
      });
      expect(inputs).toEqual([{ name: 'after' }]);
      expect(inputs[0]).toBe(proposals[0]);
      expect(submissions).toEqual([{ value: { name: 'after' }, event: undefined }]);
      expect(submissions[0].value).toBe(inputs[0]);
      expect(returns).toEqual([undefined]);
      expect(initial).toEqual({ name: 'before' });
      expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('after');
    }
  );
});
