import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Form, { type FormInstance } from '..';
import Schema from '../../Schema';
import {
  type Method,
  type Values,
  methods,
  message,
  invoke,
  nameControl,
  changeName,
  expectOutcome
} from './formImperativeValueFixtures';

describe('Form imperative value snapshots', () => {
  for (const method of methods) {
    it(`${method} keeps queued controlled acceptance committed until the later event`, async () => {
      const initial: Values = { name: 'before', untouched: { key: 'unchanged' } };
      const ref = React.createRef<FormInstance>();
      const inputs: { value: string; data: Values }[] = [];
      const returns: any[] = [];
      const callbacks: any[] = [];
      const checks: any[] = [];
      const errors: any[] = [];
      const type = Schema.Types.StringType();
      const record = (value: string, data: any) => {
        inputs.push({ value, data });
        return value === 'after';
      };
      if (method.endsWith('Async'))
        type.addAsyncRule(async (value, data) => record(value, data), message);
      else type.addRule(record, message);
      const model = Schema.Model({ name: type });
      function Owner() {
        const [value, setValue] = React.useState(initial);
        return (
          <Form
            ref={ref}
            model={model}
            checkTrigger={null}
            formValue={value}
            onChange={next => {
              setValue(next as Values);
              returns.push(invoke(method, ref.current!, callbacks));
            }}
            onCheck={result => checks.push(result)}
            onError={result => errors.push(result)}
          >
            {nameControl()}
            <button
              type="button"
              onClick={() => returns.push(invoke(method, ref.current!, callbacks))}
            >
              Check accepted
            </button>
          </Form>
        );
      }
      render(<Owner />);
      changeName('after');
      const results: any[] = [];
      await act(async () => {
        results.push(await returns[0]);
      });
      expect(inputs.map(input => input.value)).toEqual(['before']);
      expect(inputs[0].data).toBe(initial);
      expectOutcome(method, results[0], false);
      expect((screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement).value).toBe(
        'after'
      );
      fireEvent.click(screen.getByRole('button', { name: 'Check accepted' }));
      await act(async () => {
        results.push(await returns[1]);
      });
      expect(inputs.map(input => input.value)).toEqual(['before', 'after']);
      expect(inputs[1].data.untouched).toBe(initial.untouched);
      expectOutcome(method, results[1], true);
      expect(checks).toEqual([{ name: message }, {}]);
      expect(errors).toEqual([{ name: message }]);
      expect(screen.queryByText(message)).toBeNull();
      expect(screen.getByRole('textbox', { name: 'Name' }).getAttribute('aria-invalid')).toBeNull();
      expect(initial.name).toBe('before');
    });
  }

  for (const method of ['check', 'checkForFieldAsync'] as Method[]) {
    for (const controlled of [false, true]) {
      it(`${method} observes ${controlled ? 'rejected controlled' : 'accepted uncontrolled'} reset in onChange and onReset`, async () => {
        const initial: Values = { name: 'default', untouched: { key: 'unchanged' } };
        const owner: Values = { name: 'edited', untouched: initial.untouched };
        const ref = React.createRef<FormInstance>();
        const inputs: { value: string; data: Values }[] = [];
        const proposals: any[] = [];
        const resets: any[] = [];
        const returns: any[] = [];
        const callbacks: any[] = [];
        const checks: any[] = [];
        const type = Schema.Types.StringType();
        const record = (value: string, data: any) => {
          inputs.push({ value, data });
          return value === 'default';
        };
        if (method.endsWith('Async'))
          type.addAsyncRule(async (value, data) => record(value, data), message);
        else type.addRule(record, message);
        render(
          <Form
            ref={ref}
            model={Schema.Model({ name: type })}
            checkTrigger={null}
            formDefaultValue={initial}
            {...(controlled ? { formValue: owner } : {})}
            onChange={next => {
              proposals.push(next as Values);
              if (next.name === 'default') returns.push(invoke(method, ref.current!, callbacks));
            }}
            onReset={next => {
              resets.push(next);
              returns.push(invoke(method, ref.current!, callbacks));
            }}
            onCheck={result => checks.push(result)}
          >
            {nameControl()}
            <button type="button" onClick={() => ref.current!.reset()}>
              Reset and check
            </button>
          </Form>
        );
        if (!controlled) changeName('edited');
        expect((screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement).value).toBe(
          'edited'
        );
        expect(inputs).toEqual([]);
        fireEvent.click(screen.getByRole('button', { name: 'Reset and check' }));
        let results: any[] = [];
        await act(async () => {
          results = await Promise.all(returns);
        });
        expect(returns).toHaveLength(2);
        expect(resets).toEqual([initial]);
        expect(proposals[proposals.length - 1]).toBe(initial);
        expect(inputs.map(input => input.value)).toEqual(
          controlled ? ['edited', 'edited'] : ['default', 'default']
        );
        expect(inputs.every(input => input.data === (controlled ? owner : initial))).toBe(true);
        results.forEach(result => expectOutcome(method, result, !controlled));
        const expectedError = controlled ? { name: message } : {};
        // Overlapping async checks each resolve, but only the newest publishes onCheck.
        expect(checks).toEqual(
          method.endsWith('Async') ? [expectedError] : [expectedError, expectedError]
        );
        expect((screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement).value).toBe(
          controlled ? 'edited' : 'default'
        );
        expect(initial.name).toBe('default');
        expect(owner.name).toBe('edited');
      });
    }
  }
});
