import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
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
  for (const method of ['checkAsync', 'checkForFieldAsync'] as Method[]) {
    it(`${method} retains its deferred input snapshot after a later edit`, async () => {
      const initial: Values = { name: 'before', untouched: { key: 'unchanged' } };
      const ref = React.createRef<FormInstance>();
      const inputs: { value: string; data: Values }[] = [];
      const proposals: Values[] = [];
      const callbacks: any[] = [];
      const pending: ((valid: boolean) => void)[] = [];
      const returns: any[] = [];
      const type = Schema.Types.StringType().addAsyncRule((value, data) => {
        inputs.push({ value, data: data as Values });
        return new Promise<boolean>(resolve => pending.push(resolve));
      }, message);
      render(
        <Form
          ref={ref}
          model={Schema.Model({ name: type })}
          checkTrigger={null}
          formDefaultValue={initial}
          onChange={next => {
            proposals.push(next as Values);
            if (next.name === 'after') returns.push(invoke(method, ref.current!, callbacks));
          }}
        >
          {nameControl()}
        </Form>
      );
      changeName('after');
      await waitFor(() => expect(pending).toHaveLength(1));
      expect(returns[0]).toBeInstanceOf(Promise);
      changeName('later');
      expect((screen.getByRole('textbox', { name: 'Name' }) as HTMLInputElement).value).toBe(
        'later'
      );
      expect(proposals.map(value => value.name)).toEqual(['after', 'later']);
      let result: any;
      await act(async () => {
        pending[0](inputs[0].value === 'after');
        result = await returns[0];
      });
      expect(inputs[0].value).toBe('after');
      expect(inputs[0].data).toBe(proposals[0]);
      expect(inputs[0].data.name).toBe('after');
      expect(inputs[0].data.untouched).toBe(initial.untouched);
      expectOutcome(method, result, true);
      expect(inputs).toHaveLength(1);
      expect(initial.name).toBe('before');
    });
  }

  for (const method of methods) {
    it(`${method} passes the accepted invocation snapshot to its resolver branch`, async () => {
      const initial: Values = { name: 'before', untouched: { key: 'unchanged' } };
      const ref = React.createRef<FormInstance>();
      const inputs: Values[] = [];
      const proposals: Values[] = [];
      const returns: any[] = [];
      const callbacks: any[] = [];
      const checks: any[] = [];
      const errors: any[] = [];
      const resolver = (value: Record<string, any>) => {
        inputs.push(value as Values);
        const result = { errors: value.name === 'after' ? {} : { name: message } };
        return method.endsWith('Async') ? Promise.resolve(result) : result;
      };
      render(
        <Form
          ref={ref}
          resolver={resolver}
          checkTrigger={null}
          formDefaultValue={initial}
          onChange={next => {
            proposals.push(next as Values);
            returns.push(invoke(method, ref.current!, callbacks));
          }}
          onCheck={value => checks.push(value)}
          onError={value => errors.push(value)}
        >
          {nameControl()}
        </Form>
      );
      changeName('after');
      let result: any;
      await act(async () => {
        result = await returns[0];
      });
      expect(inputs).toEqual([{ name: 'after', untouched: { key: 'unchanged' } }]);
      expect(inputs[0]).toBe(proposals[0]);
      expect(inputs[0].untouched).toBe(initial.untouched);
      expectOutcome(method, result, true);
      expect(checks).toEqual([{}]);
      expect(errors).toEqual([]);
      expect(callbacks).toEqual(
        method.endsWith('Async') ? [] : [method === 'check' ? {} : { hasError: false }]
      );
      expect(screen.queryByText(message)).toBeNull();
      expect(screen.getByRole('textbox', { name: 'Name' }).getAttribute('aria-invalid')).toBeNull();
      expect(initial.name).toBe('before');
    });
  }

  for (const asynchronous of [false, true]) {
    it(`${asynchronous ? 'checkAsync' : 'check'} shares the nested invocation snapshot${asynchronous ? '' : ' across a rule-triggered reset'}`, async () => {
      const initial = { profile: { name: 'before' }, confirm: 'before' };
      const ref = React.createRef<FormInstance>();
      const names: string[] = [];
      const crossFields: { value: string; data: typeof initial }[] = [];
      const proposals: (typeof initial)[] = [];
      const resets: any[] = [];
      const returns: any[] = [];
      let invoked = false;
      let resetDuringRule = false;
      const name = Schema.Types.StringType().addRule(value => {
        names.push(value);
        if (!asynchronous && !resetDuringRule) {
          resetDuringRule = true;
          ref.current!.reset();
        }
        return value === 'after';
      }, message);
      const confirm = Schema.Types.StringType().addRule((value, data) => {
        crossFields.push({ value, data: data as typeof initial });
        return value === 'before' && (data as typeof initial).profile.name === 'after';
      }, 'Cross-field snapshot changed');
      render(
        <Form
          ref={ref}
          model={Schema.Model({ profile: Schema.Types.ObjectType().shape({ name }), confirm })}
          nestedField
          checkTrigger={null}
          formDefaultValue={initial}
          onChange={next => {
            proposals.push(next as typeof initial);
            if (!invoked) {
              invoked = true;
              returns.push(asynchronous ? ref.current!.checkAsync() : ref.current!.check());
            }
          }}
          onReset={value => resets.push(value)}
        >
          <Form.Group controlId="profile-name">
            <Form.ControlLabel>Profile name</Form.ControlLabel>
            <Form.Control name="profile.name" />
          </Form.Group>
        </Form>
      );
      fireEvent.change(screen.getByRole('textbox', { name: 'Profile name' }), {
        target: { value: 'after' }
      });
      let result: any;
      await act(async () => {
        result = await returns[0];
      });
      expect(names.length).toBeGreaterThan(0);
      expect(names.every(value => value === 'after')).toBe(true);
      expect(crossFields).toHaveLength(1);
      expect(crossFields[0].value).toBe('before');
      expect(crossFields[0].data).toBe(proposals[0]);
      expect(crossFields[0].data.profile.name).toBe('after');
      if (asynchronous) expect(result).toEqual({ hasError: false, formError: {} });
      else {
        expect(result).toBe(true);
        expect(resets).toEqual([initial]);
        expect(proposals).toEqual([{ profile: { name: 'after' }, confirm: 'before' }, initial]);
        expect(
          (screen.getByRole('textbox', { name: 'Profile name' }) as HTMLInputElement).value
        ).toBe('before');
      }
      expect(initial).toEqual({ profile: { name: 'before' }, confirm: 'before' });
    });
  }
});
