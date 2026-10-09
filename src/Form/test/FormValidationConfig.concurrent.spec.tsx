import React, { Suspense, startTransition, useState } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Form, { type FormInstance } from '..';
import { configuration, invoke, type Values } from './formValidationConfigFixtures';

describe.each(['schema', 'resolver'] as const)('Form suspended %s configuration', adapter => {
  it.each(['check', 'submit'] as const)(
    'keeps committed callbacks during and after an abandoned %s render',
    async method => {
      const before: Values = Object.freeze({ name: 'before' });
      const after: Values = Object.freeze({ name: 'after' });
      const ref = React.createRef<FormInstance>();
      const inputs: { phase: string; data: Values }[] = [];
      const checks: string[] = [];
      const submissions: { phase: string; data: Values }[] = [];
      const first = configuration('before', inputs);
      const second = configuration('after', inputs);
      const never = new Promise<void>(() => {});
      let suspended = 0;
      function Block({ blocked }: { blocked: boolean }) {
        if (blocked) {
          suspended++;
          throw never;
        }
        return <Form.Control name="name" aria-label="Name" />;
      }
      function Owner() {
        const [state, setState] = useState({ value: before, blocked: false });
        const phase = state.value === before ? 'before' : 'after';
        const config = state.value === before ? first : second;
        return (
          <>
            <button
              onClick={() => startTransition(() => setState({ value: after, blocked: true }))}
            >
              Suspend new rules
            </button>
            <button onClick={() => setState({ value: before, blocked: false })}>Abandon</button>
            <button onClick={() => setState({ value: after, blocked: false })}>
              Commit new rules
            </button>
            <Suspense fallback={<span>Loading</span>}>
              <Form
                ref={ref}
                formValue={state.value}
                model={config.model}
                resolver={adapter === 'resolver' ? config.resolver : undefined}
                onCheck={() => checks.push(phase)}
                onSubmit={data => submissions.push({ phase, data: data as Values })}
              >
                <Block blocked={state.blocked} />
              </Form>
            </Suspense>
          </>
        );
      }
      render(<Owner />);
      const saved = ref.current!;
      fireEvent.click(screen.getByRole('button', { name: 'Suspend new rules' }));
      expect(suspended).toBeGreaterThan(0);
      expect(screen.queryByText('Loading')).toBeNull();
      expect(screen.getByRole('textbox')).toHaveValue('before');
      await act(async () => {
        invoke(method, saved);
      });
      fireEvent.click(screen.getByRole('button', { name: 'Abandon' }));
      await act(async () => {
        invoke(method, saved);
      });
      fireEvent.click(screen.getByRole('button', { name: 'Commit new rules' }));
      await act(async () => {
        invoke(method, saved);
      });

      expect(inputs).toEqual([
        { phase: 'before', data: before },
        { phase: 'before', data: before },
        { phase: 'after', data: after }
      ]);
      expect(inputs[0].data).toBe(before);
      expect(inputs[1].data).toBe(before);
      expect(inputs[2].data).toBe(after);
      expect(checks).toEqual(['before', 'before', 'after']);
      expect(submissions).toEqual(method === 'submit' ? inputs : []);
      if (method === 'submit') {
        expect(submissions[0].data).toBe(before);
        expect(submissions[2].data).toBe(after);
      }
      expect(screen.getByRole('textbox')).toHaveValue('after');
      expect(before).toEqual({ name: 'before' });
      expect(after).toEqual({ name: 'after' });
    }
  );
});
