import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Form from '../../Form';
import Schema from '../../Schema';
import useFormControl from '..';
import { createValue, label, Fields, type Values } from './consecutiveValuesTestUtils';

describe('useFormControl consecutive values in one event', () => {
  for (const nested of [false, true]) {
    describe(nested ? 'nested fields' : 'flat fields', () => {
      it('composes checkAsync resolver inputs for onChange then setValue', async () => {
        const initial = createValue(nested);
        const changes: Values[] = [];
        const validations: Values[] = [];
        const events: string[] = [];
        const checks: unknown[] = [];
        const errors: unknown[] = [];
        render(
          <Form
            nestedField={nested}
            formDefaultValue={initial}
            resolver={nextValue => {
              validations.push(nextValue);
              events.push(`validate:${label(nextValue)}`);
              return Promise.resolve({ errors: {} });
            }}
            onChange={nextValue => {
              changes.push(nextValue);
              events.push(`change:${label(nextValue)}`);
            }}
            onCheck={formError => {
              checks.push(formError);
              events.push('check');
            }}
            onError={formError => errors.push(formError)}
          >
            <Fields nested={nested} routes={['change', 'set']} checkAsync />
          </Form>
        );
        fireEvent.click(screen.getByRole('button', { name: 'Update both' }));
        await waitFor(() => expect(checks[checks.length - 1]).toEqual({}));
        const proposals = [createValue(nested, 'A'), createValue(nested, 'A', 'B')];
        expect(changes).toEqual(proposals);
        expect(validations).toEqual(proposals);
        expect(events.slice(0, 4)).toEqual([
          'validate:A/old-b',
          'change:A/old-b',
          'change:A/B',
          'validate:A/B'
        ]);
        expect(events.slice(4)).toEqual(checks.map(() => 'check'));
        expect(errors).toEqual([]);
        expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('A');
        expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('B');
        expect(initial).toEqual(createValue(nested));
      });

      for (const checkAsync of [false, true]) {
        it(`validates native cross-field schema against both updates ${checkAsync ? 'asynchronously' : 'synchronously'}`, async () => {
          const initial = createValue(nested);
          const ruleInputs: { value: string; data: Values }[] = [];
          const events: string[] = [];
          const check = (value: string, data: Values) => {
            ruleInputs.push({ value, data });
            events.push(`rule:${label(data)}`);
            return value === 'B' && (data.profile || data).first === 'A';
          };
          const rule = checkAsync
            ? Schema.Types.StringType().addAsyncRule(
                (value, data) => Promise.resolve(check(value, data)),
                'Both updates are required'
              )
            : Schema.Types.StringType().addRule(check, 'Both updates are required');
          const fields = { first: Schema.Types.StringType(), second: rule };
          const model = nested
            ? Schema.Model({ profile: Schema.Types.ObjectType().shape(fields) })
            : Schema.Model(fields);

          function NativeFields() {
            const first = useFormControl({ name: nested ? 'profile.first' : 'first' });
            const second = useFormControl({
              name: nested ? 'profile.second' : 'second',
              checkAsync
            });
            return (
              <>
                <input aria-label="First" value={first.value || ''} readOnly />
                <input aria-label="Second" value={second.value || ''} readOnly />
                <output aria-label="Second error">{second.error || 'valid'}</output>
                <button
                  type="button"
                  onClick={() => {
                    first.setValue('A');
                    second.setValue('B', true);
                  }}
                >
                  Update native fields
                </button>
              </>
            );
          }

          render(
            <Form
              nestedField={nested}
              formDefaultValue={initial}
              model={model}
              errorFromContext
              onChange={nextValue => events.push(`change:${label(nextValue)}`)}
              onCheck={() => events.push('check')}
            >
              <NativeFields />
            </Form>
          );
          fireEvent.click(screen.getByRole('button', { name: 'Update native fields' }));
          await waitFor(() => expect(events.filter(event => event === 'check')).toHaveLength(1));
          expect(ruleInputs).toEqual([{ value: 'B', data: createValue(nested, 'A', 'B') }]);
          expect(events).toEqual(['change:A/old-b', 'change:A/B', 'rule:A/B', 'check']);
          expect(screen.getByLabelText('Second error')).toHaveTextContent('valid');
          expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('A');
          expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('B');
          expect(initial).toEqual(createValue(nested));
        });
      }
    });
  }
});
