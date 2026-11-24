import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Form from '../../Form';
import { createValue, label, Fields, setup, type Values } from './consecutiveValuesTestUtils';

describe('useFormControl consecutive values in one event', () => {
  for (const nested of [false, true]) {
    describe(nested ? 'nested fields' : 'flat fields', () => {
      for (const routes of [
        ['set', 'set'],
        ['change', 'change'],
        ['set', 'change'],
        ['change', 'set']
      ] as const) {
        it(`composes uncontrolled ${routes[0]} then ${routes[1]} values and validation inputs`, () => {
          const test = setup(nested, routes);
          test.updateBoth();
          expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('A');
          expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('B');
          expect(test.changes).toEqual([createValue(nested, 'A'), createValue(nested, 'A', 'B')]);
          expect(test.validations).toEqual([
            createValue(nested, 'A'),
            createValue(nested, 'A', 'B')
          ]);
          expect(test.initial).toEqual(createValue(nested));
          expect(test.events).toEqual([
            ...(routes[0] === 'set'
              ? ['change:A/old-b', 'validate:A/old-b', 'check']
              : ['validate:A/old-b', 'check', 'change:A/old-b']),
            ...(routes[1] === 'set'
              ? ['change:A/B', 'validate:A/B', 'check']
              : ['validate:A/B', 'check', 'change:A/B'])
          ]);
        });
      }

      it('composes uncontrolled onChange then setValue under StrictMode', () => {
        const initial = createValue(nested);
        const changes: Values[] = [];
        const validations: Values[] = [];
        const events: string[] = [];

        render(
          <React.StrictMode>
            <Form
              nestedField={nested}
              formDefaultValue={initial}
              resolver={nextValue => {
                validations.push(nextValue);
                events.push(`validate:${label(nextValue)}`);
                return { errors: {} };
              }}
              onCheck={() => events.push('check')}
              onChange={nextValue => {
                changes.push(nextValue);
                events.push(`change:${label(nextValue)}`);
              }}
            >
              <Fields nested={nested} routes={['change', 'set']} />
            </Form>
          </React.StrictMode>
        );

        expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('old-a');
        expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('old-b');
        fireEvent.click(screen.getByRole('button', { name: 'Update both' }));
        const proposals = [createValue(nested, 'A'), createValue(nested, 'A', 'B')];
        expect(changes).toEqual(proposals);
        expect(validations).toEqual(proposals);
        expect(events).toEqual([
          'validate:A/old-b',
          'check',
          'change:A/old-b',
          'change:A/B',
          'validate:A/B',
          'check'
        ]);
        expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('A');
        expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('B');

        fireEvent.click(screen.getByRole('button', { name: 'Update second' }));
        const next = createValue(nested, 'A', 'C');
        expect(changes).toEqual([...proposals, next]);
        expect(validations).toEqual([...proposals, next]);
        expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('A');
        expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('C');
        expect(initial).toEqual(createValue(nested));
      });

      it('composes a same-event edit from the values restored by reset', () => {
        const test = setup(nested, ['set', 'set'], 'uncontrolled', true);
        test.updateBoth();
        expect(test.changes).toEqual([
          createValue(nested, 'A'),
          createValue(nested),
          createValue(nested, 'old-a', 'B')
        ]);
        expect(test.resets).toEqual([createValue(nested)]);
        expect(test.events.indexOf('reset')).toBe(test.events.indexOf('change:old-a/old-b') + 1);
        expect(test.validations[1]).toEqual(createValue(nested, 'old-a', 'B'));
        expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('old-a');
        expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('B');
      });

      it('does not treat a rejected controlled reset as accepted values', () => {
        const test = setup(
          nested,
          ['set', 'set'],
          'reject',
          true,
          createValue(nested, 'accepted-a', 'accepted-b')
        );
        test.updateBoth();
        expect(test.changes).toEqual([
          createValue(nested, 'A', 'accepted-b'),
          createValue(nested),
          createValue(nested, 'accepted-a', 'B')
        ]);
        expect(test.validations[1]).toEqual(createValue(nested, 'accepted-a', 'B'));
        expect(screen.getByRole('textbox', { name: 'First' })).toHaveValue('accepted-a');
        expect(screen.getByRole('textbox', { name: 'Second' })).toHaveValue('accepted-b');
      });
    });
  }
});
