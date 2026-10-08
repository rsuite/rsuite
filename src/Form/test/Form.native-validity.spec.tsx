import React from 'react';
import { act } from '@testing-library/react';
import { ArrayType, ObjectType, SchemaModel, StringType } from 'schema-typed';
import { describe, expect, it } from 'vitest';
import {
  blankFixture,
  expectBlankCallbacks,
  expectField,
  mountValidity,
  publicFieldKeys
} from './nativeValidityTestUtils';
import type { ErrorMap } from './nativeValidityTestUtils';

// Authored action inventory, not an execution report. All eleven cases are UNRUN.
// Columns: native requests, resolver requests, clear/reset/removal, owner renders, releases.
export const nativeValidityCaseInventory = [
  ['FMV01', 1, 0, 0, 0, 0],
  ['FMV02', 1, 0, 0, 0, 0],
  ['FMV03', 1, 0, 0, 0, 0],
  ['FMV04', 1, 0, 0, 0, 0],
  ['FMV05', 1, 0, 0, 7, 0],
  ['FMV06', 2, 0, 0, 8, 0],
  ['FMV07', 0, 14, 0, 0, 0],
  ['FMV08', 3, 0, 0, 1, 0],
  ['FMV09', 0, 0, 0, 8, 0],
  ['FMV10', 6, 0, 5, 5, 0],
  ['FMV11', 1, 0, 2, 1, 1]
] as const;
// Actual finite action arithmetic: native 17; resolver 6*2+2=14; clears 4+1+2=7;
// explicit owner renders 7+8+1+8+3+2+1=30; deferred release 1; drivers/timers/drains 0.

describe('Form native validity and selected error messages', () => {
  it('FMV01 retains native blank invalidity after controlled whole sync acceptance', () => {
    const fixture = blankFixture();
    const host = mountValidity(fixture);
    let callbackMap: ErrorMap | undefined;
    let valid = true;
    try {
      act(() => {
        valid = host.form().check(payload => {
          callbackMap = payload;
        });
      });
      const map = host.checks[0];
      expect(valid).toBe(false);
      expect(callbackMap).toBe(map);
      expect(host.ownedError()).toBe(map);
      expect(map).toEqual({ name: { hasError: true, errorMessage: '' } });
      expect(Reflect.ownKeys(map)).toEqual(['name']);
      expect(Reflect.ownKeys(map.name)).toEqual(['hasError', 'errorMessage']);
      expectBlankCallbacks(host);
      expect(fixture.rules).toEqual([
        { value: fixture.values.name, data: fixture.values, name: 'name', failing: true }
      ]);
      expect(fixture.rules[0].data).toBe(fixture.values);
      expect(fixture.factories()).toBe(1);
      expect(fixture.order).toEqual(['rule', 'factory']);
      expectField(host, 'name', '', 'true');
    } finally {
      host.unmount();
    }
  });

  it('FMV02 retains native blank invalidity after controlled field sync acceptance', () => {
    const fixture = blankFixture();
    const host = mountValidity(fixture);
    let callbackResult: unknown;
    let valid = true;
    try {
      act(() => {
        valid = host.form().checkForField('name', result => {
          callbackResult = result;
        });
      });
      const map = host.checks[0];
      expect(valid).toBe(false);
      expect(callbackResult).toBe(map.name);
      expect(callbackResult).toEqual({ hasError: true, errorMessage: '' });
      expect(host.ownedError()).toBe(map);
      expectBlankCallbacks(host);
      expect(fixture.rules).toHaveLength(1);
      expect(fixture.rules[0]).toEqual({
        value: fixture.values.name,
        data: fixture.values,
        name: 'name',
        failing: true
      });
      expect(fixture.rules[0].data).toBe(fixture.values);
      expect(fixture.factories()).toBe(1);
      expect(fixture.order).toEqual(['rule', 'factory']);
      expectField(host, 'name', '', 'true');
    } finally {
      host.unmount();
    }
  });

  it('FMV03 retains native blank invalidity after controlled field async acceptance', async () => {
    const fixture = blankFixture();
    const host = mountValidity(fixture);
    let result: any;
    let promise: Promise<any> | undefined;
    try {
      await act(async () => {
        promise = host.form().checkForFieldAsync('name');
        result = await promise;
      });
      const map = host.checks[0];
      expect(promise).toBeInstanceOf(Promise);
      expect(result).toBe(map.name);
      expect(result).toEqual({ hasError: true, errorMessage: '' });
      expect(host.ownedError()).toBe(map);
      expectBlankCallbacks(host);
      expect(fixture.rules).toHaveLength(1);
      expect(fixture.rules[0].data).toBe(fixture.values);
      expect(fixture.rules[0].name).toBe('name');
      expect(fixture.factories()).toBe(1);
      expect(fixture.order).toEqual(['factory', 'rule']);
      expectField(host, 'name', '', 'true');
    } finally {
      host.unmount();
    }
  });

  it('FMV04 retains native blank invalidity after controlled whole async acceptance', async () => {
    const fixture = blankFixture();
    const host = mountValidity(fixture);
    let result: any;
    let promise: Promise<any> | undefined;
    try {
      await act(async () => {
        promise = host.form().checkAsync();
        result = await promise;
      });
      const map = host.checks[0];
      expect(promise).toBeInstanceOf(Promise);
      expect(result.hasError).toBe(true);
      expect(result.formError).toBe(map);
      expect(Object.getOwnPropertyDescriptor(map, 'name')).toEqual({
        value: '',
        writable: true,
        enumerable: true,
        configurable: true
      });
      expect(host.ownedError()).toBe(map);
      expectBlankCallbacks(host);
      expect(fixture.rules).toHaveLength(1);
      expect(fixture.rules[0].data).toBe(fixture.values);
      expect(fixture.factories()).toBe(1);
      expect(fixture.order).toEqual(['factory', 'rule']);
      expectField(host, 'name', '', 'true');
    } finally {
      host.unmount();
    }
  });

  it('FMV05 preserves presentation suppression and caller ARIA precedence', () => {
    const fixture = blankFixture();
    const host = mountValidity({ ...fixture, controlled: false });
    let valid = true;
    const custom = <span>Custom error</span>;
    try {
      act(() => {
        valid = host.form().checkForField('name');
      });
      expect(valid).toBe(false);
      expectField(host, 'name', '', 'true');
      host.present({ errorMessage: null }); // T1
      expectField(host, 'name', null, null);
      host.present({ errorMessage: '' }); // T2
      expectField(host, 'name', '', null);
      host.present({ errorMessage: false }); // T3
      expectField(host, 'name', false, null);
      host.present({ errorMessage: 0 }); // T4
      expectField(host, 'name', 0, null);
      host.present({ errorMessage: custom }); // T5
      expectField(host, 'name', custom, 'true', true);
      expect(host.root().querySelector('[role="alert"]')?.textContent).toBe('Custom error');
      host.present({ errorMessage: undefined, errorFromContext: false }); // T6
      expectField(host, 'name', undefined, null);
      host.present({
        errorFromContext: true,
        'aria-invalid': false,
        'aria-errormessage': 'caller-error'
      }); // T7
      expect(host.fields.name.error).toBe('');
      expect(Object.keys(host.fields.name)).toEqual(publicFieldKeys);
      expect(host.input().getAttribute('aria-invalid')).toBe('false');
      expect(host.input().getAttribute('aria-errormessage')).toBe('caller-error');
      expect(host.root().querySelector('[role="alert"]')).toBeNull();
      expectBlankCallbacks(host);
      expect(fixture.rules).toHaveLength(1);
      expect(fixture.factories()).toBe(1);
    } finally {
      host.unmount();
    }
  });

  it('FMV06 keeps controlled rejected cloned and exact accepted native payload ownership', () => {
    const uncontrolledFixture = blankFixture();
    const uncontrolled = mountValidity({ ...uncontrolledFixture, controlled: false });
    try {
      let firstValid = true;
      let firstResult: unknown;
      act(() => {
        firstValid = uncontrolled.form().checkForField('name', result => {
          firstResult = result;
        });
      });
      expect(firstValid).toBe(false);
      expect(firstResult).toBe(uncontrolled.checks[0].name);
      expect(firstResult).toEqual({ hasError: true, errorMessage: '' });
      expectField(uncontrolled, 'name', '', 'true');
      expectBlankCallbacks(uncontrolled);
      expect(uncontrolledFixture.rules).toHaveLength(1);
      expect(uncontrolledFixture.factories()).toBe(1);
    } finally {
      uncontrolled.unmount();
    }

    const fixture = blankFixture();
    const empty = {};
    const host = mountValidity({ ...fixture, initialError: empty, onCheck: () => {} });
    let nativeResult: unknown;
    let secondValid = true;
    try {
      act(() => {
        secondValid = host.form().checkForField('name', result => {
          nativeResult = result;
        });
      });
      const map = host.checks[0];
      expect(secondValid).toBe(false);
      expect(nativeResult).toBe(map.name);
      expect(host.ownedError()).toBe(empty);
      host.present({ revision: 1 }); // T1: explicitly present controlled empty/rejected map
      expectField(host, 'name', undefined, null);
      host.present({ formError: null }); // T2
      expectField(host, 'name', undefined, null);
      host.present({ formError: map }); // T3
      expect(host.ownedError()).toBe(map);
      expectField(host, 'name', '', 'true');
      const clone = { ...map };
      host.present({ formError: clone }); // T4
      expect(clone).not.toBe(map);
      expect(clone.name).toBe(map.name);
      expectField(host, 'name', '', null);
      host.present({ formError: { name: '' } }); // T5
      expectField(host, 'name', '', null);
      host.present({ formError: { name: 'Manual error' } }); // T6
      expectField(host, 'name', 'Manual error', 'true', true);
      host.present({ formError: map, errorMessage: null }); // T7
      expectField(host, 'name', null, null);
      host.present({ formError: map, errorMessage: undefined }); // T8
      expectField(host, 'name', '', 'true');
      expect(host.ownedError()).toBe(map);
      expect(map.name).toBe(nativeResult);
      expect(map.name).toEqual({ hasError: true, errorMessage: '' });
      expectBlankCallbacks(host);
      expect(fixture.rules).toHaveLength(1);
      expect(fixture.factories()).toBe(1);
    } finally {
      host.unmount();
    }
  });

  it('FMV07 preserves resolver whole and field blank-value validity contracts', async () => {
    const cases: { errors: ErrorMap; fieldInvalid: boolean; selectedNode: React.ReactNode }[] = [
      { errors: {}, fieldInvalid: false, selectedNode: undefined },
      { errors: { name: undefined }, fieldInvalid: false, selectedNode: undefined },
      { errors: { name: null }, fieldInvalid: false, selectedNode: undefined },
      { errors: { name: '' }, fieldInvalid: false, selectedNode: '' },
      { errors: { name: false }, fieldInvalid: true, selectedNode: undefined },
      { errors: { name: 0 }, fieldInvalid: true, selectedNode: undefined }
    ];
    for (const entry of cases) {
      const values = { name: 'present-value' };
      const inputs: unknown[] = [];
      const host = mountValidity({
        values,
        resolver: value => {
          inputs.push(value);
          return { errors: entry.errors };
        }
      });
      let wholeMap: unknown;
      let fieldResult: any;
      let wholeValid = true;
      let fieldValid = true;
      try {
        act(() => {
          wholeValid = host.form().check(payload => {
            wholeMap = payload;
          });
        });
        expect(wholeValid).toBe(Object.keys(entry.errors).length === 0);
        expect(wholeMap).toBe(entry.errors);
        expect(host.checks[0]).toBe(entry.errors);
        expectField(host, 'name', entry.selectedNode, null);
        act(() => {
          fieldValid = host.form().checkForField('name', result => {
            fieldResult = result;
          });
        });
        expect(fieldValid).toBe(!entry.fieldInvalid);
        expect(fieldResult).toEqual(
          entry.fieldInvalid
            ? { hasError: true, errorMessage: entry.errors.name }
            : { hasError: false }
        );
        const merged = host.checks[1];
        expect(merged).not.toBe(entry.errors);
        expect(host.ownedError()).toBe(merged);
        expect(Object.prototype.hasOwnProperty.call(merged, 'name')).toBe(entry.fieldInvalid);
        expect(host.checks).toHaveLength(2);
        expect(host.errors).toHaveLength(
          (Object.keys(entry.errors).length > 0 ? 1 : 0) + (entry.fieldInvalid ? 1 : 0)
        );
        if (Object.keys(entry.errors).length > 0) {
          expect(host.errors[0]).toBe(entry.errors);
        }
        if (entry.fieldInvalid) {
          expect(host.errors[host.errors.length - 1]).toBe(merged);
        }
        expect(inputs).toEqual([values, values]);
        expect(inputs[0]).toBe(values);
        expect(inputs[1]).toBe(values);
        expectField(host, 'name', undefined, null);
      } finally {
        host.unmount();
      }
    }

    const values = { name: 'present-value' };
    const blank = { name: '' };
    const inputs: unknown[] = [];
    const host = mountValidity({
      values,
      resolver: value => {
        inputs.push(value);
        return Promise.resolve({ errors: blank });
      }
    });
    let wholeResult: any;
    let fieldResult: any;
    try {
      await act(async () => {
        const promise = host.form().checkAsync();
        wholeResult = await promise;
      });
      expect(wholeResult).toEqual({ hasError: true, formError: blank });
      expect(wholeResult.formError).toBe(blank);
      expect(host.checks[0]).toBe(blank);
      expect(host.errors[0]).toBe(blank);
      expectField(host, 'name', '', null);
      await act(async () => {
        const promise = host.form().checkForFieldAsync('name');
        fieldResult = await promise;
      });
      expect(fieldResult).toEqual({ hasError: false, errorMessage: '' });
      expect(host.checks[1]).not.toBe(blank);
      expect(Reflect.ownKeys(host.checks[1])).toEqual([]);
      expect(host.checks).toHaveLength(2);
      expect(host.errors).toHaveLength(1);
      expect(inputs).toEqual([values, values]);
      expectField(host, 'name', undefined, null);
    } finally {
      host.unmount();
    }
  });

  it('FMV08 projects native nested array blank paths without inventing terminal descendants', async () => {
    const nestedValues = { user: { name: 'present-value', other: 'valid-value' } };
    const nestedCalls: unknown[][] = [];
    let nestedFactories = 0;
    const nestedModel = SchemaModel({
      user: ObjectType().shape({
        name: StringType().addRule(
          (value, data, name) => {
            nestedCalls.push([value, data, name]);
            return false;
          },
          () => {
            nestedFactories += 1;
            return '';
          }
        ),
        other: StringType()
      })
    });
    const nested = mountValidity({
      model: nestedModel,
      values: nestedValues,
      nestedField: true,
      controls: [{ name: 'user.name' }, { name: 'user.other' }, { name: 'user' }]
    });
    let nestedResult: any;
    try {
      await act(async () => {
        const promise = nested.form().checkForFieldAsync('user.name');
        nestedResult = await promise;
      });
      expect(nestedResult).toBe(nested.checks[0].user.object.name);
      expect(nestedResult).toEqual({ hasError: true, errorMessage: '' });
      expect(nestedCalls).toEqual([['present-value', nestedValues, 'user.name']]);
      expect(nestedCalls[0][1]).toBe(nestedValues);
      expect(nestedFactories).toBe(1);
      expectBlankCallbacks(nested);
      expectField(nested, 'user.name', '', 'true');
      expectField(nested, 'user.other', undefined, null);
      expectField(nested, 'user', undefined, null);
    } finally {
      nested.unmount();
    }

    const arrayValues = { items: ['blank', 'later', 'valid'] };
    const itemCalls: unknown[][] = [];
    let itemFactories = 0;
    let itemMessage = '';
    const arrayModel = SchemaModel({
      items: ArrayType().of(
        StringType().addRule(
          (value, data, name) => {
            itemCalls.push([value, data, name]);
            itemMessage = value === 'later' ? 'Later invalid' : '';
            return value === 'valid';
          },
          () => {
            itemFactories += 1;
            return itemMessage;
          }
        )
      )
    });
    const array = mountValidity({
      model: arrayModel,
      values: arrayValues,
      nestedField: true,
      controls: [
        { name: 'items' },
        { name: 'items[0]' },
        { name: 'items[1]' },
        { name: 'items[2]' }
      ]
    });
    let arrayResult: any;
    try {
      await act(async () => {
        const promise = array.form().checkForFieldAsync('items');
        arrayResult = await promise;
      });
      expect(arrayResult).toBe(array.checks[0].items);
      expect(arrayResult).toEqual({
        hasError: true,
        array: [
          { hasError: true, errorMessage: '' },
          { hasError: true, errorMessage: 'Later invalid' },
          { hasError: false }
        ]
      });
      expect(Object.prototype.hasOwnProperty.call(arrayResult, 'errorMessage')).toBe(false);
      expect(itemCalls).toHaveLength(3);
      itemCalls.forEach((call, index) => {
        expect(call[0]).toBe(arrayValues.items[index]);
        expect(call[1]).toBe(arrayValues);
        expect(call[2]).toEqual(['items', `[${index}]`]);
      });
      expect(itemFactories).toBe(3);
      expectBlankCallbacks(array);
      expectField(array, 'items', '', 'true');
      expectField(array, 'items[0]', '', 'true');
      expectField(array, 'items[1]', 'Later invalid', 'true', true);
      expectField(array, 'items[2]', undefined, null);
    } finally {
      array.unmount();
    }

    const terminalValues = { user: 'primitive-value' };
    let childCalls = 0;
    let parentCalls = 0;
    let parentFactories = 0;
    const terminalModel = SchemaModel({
      user: ObjectType()
        .shape({
          name: StringType().addRule(() => {
            childCalls += 1;
            return false;
          }, 'Child invalid')
        })
        .addRule(
          () => {
            parentCalls += 1;
            return false;
          },
          () => {
            parentFactories += 1;
            return '';
          },
          true
        )
    });
    const terminal = mountValidity({
      model: terminalModel,
      values: terminalValues,
      nestedField: true,
      controls: [{ name: 'user' }, { name: 'user.name' }]
    });
    let valid = true;
    let callbackMap: unknown;
    try {
      act(() => {
        valid = terminal.form().check(payload => {
          callbackMap = payload;
        });
      });
      const map = terminal.checks[0];
      expect(valid).toBe(false);
      expect(callbackMap).toBe(map);
      expect(map.user).toEqual({ hasError: true, errorMessage: '' });
      expect(Object.prototype.hasOwnProperty.call(map.user, 'object')).toBe(false);
      expect(childCalls).toBe(0);
      expect(parentCalls).toBe(1);
      expect(parentFactories).toBe(1);
      expectBlankCallbacks(terminal);
      expectField(terminal, 'user', '', 'true');
      expectField(terminal, 'user.name', undefined, null);
      const literal = { ...map, 'user.object.name': 'Literal invalid' };
      terminal.present({ formError: literal }); // The single bounded literal-path presentation.
      expect(terminal.ownedError()).toBe(literal);
      expectField(terminal, 'user.name', 'Literal invalid', 'true', true);
      expectField(terminal, 'user', '', null);
      expect(childCalls).toBe(0);
      expect(terminal.checks).toHaveLength(1);
      expect(terminal.errors).toHaveLength(1);
    } finally {
      terminal.unmount();
    }
  });

  it('FMV09 preserves manual blank nodes and error-like object display', () => {
    const element = <span>Element error</span>;
    const cases: { map: ErrorMap; error: React.ReactNode; shown: boolean }[] = [
      { map: {}, error: undefined, shown: false },
      { map: { name: undefined }, error: undefined, shown: false },
      { map: { name: null }, error: undefined, shown: false },
      { map: { name: '' }, error: '', shown: false },
      { map: { name: 'String error' }, error: 'String error', shown: true },
      { map: { name: element }, error: element, shown: true },
      {
        map: { name: { hasError: false, errorMessage: 'Visible despite false' } },
        error: 'Visible despite false',
        shown: true
      },
      {
        map: {
          name: {
            array: [
              { hasError: true, errorMessage: '' },
              { hasError: true, errorMessage: 'Later error' }
            ]
          }
        },
        error: '',
        shown: false
      }
    ];
    const host = mountValidity();
    try {
      for (const entry of cases) {
        host.present({ formError: entry.map }); // Exactly eight manual owner presentations.
        expect(host.ownedError()).toBe(entry.map);
        expectField(host, 'name', entry.error, entry.shown ? 'true' : null, entry.shown);
      }
      expect(host.checks).toHaveLength(0);
      expect(host.errors).toHaveLength(0);
    } finally {
      host.unmount();
    }
  });

  it('FMV10 clears status only with accepted reset clean and unmount transactions', () => {
    const cleanupCases = ['field', 'all', 'errors', 'form'] as const;
    for (const cleanup of cleanupCases) {
      const fixture = blankFixture();
      const defaults = { ...fixture.values, other: 'sibling-value' };
      const host = mountValidity({
        model: fixture.model,
        defaultValues: defaults,
        controlled: false,
        controls: [{ name: 'name' }, { name: 'other' }]
      });
      let valid = true;
      let nativeResult: unknown;
      try {
        act(() => {
          valid = host.form().checkForField('name', result => {
            nativeResult = result;
          });
        });
        expect(valid).toBe(false);
        expect(nativeResult).toBe(host.checks[0].name);
        expectField(host, 'name', '', 'true');
        act(() => {
          if (cleanup === 'field') host.form().cleanErrorForField('name');
          if (cleanup === 'all') host.form().cleanErrors();
          if (cleanup === 'errors') host.form().resetErrors({});
          if (cleanup === 'form') host.form().reset();
        });
        expectField(host, 'name', undefined, null);
        expectField(host, 'other', undefined, null);
        expect(host.fields.other.value).toBe('sibling-value');
        expectBlankCallbacks(host);
        expect(fixture.rules).toHaveLength(1);
        expect(fixture.rules[0].data).toBe(defaults);
        expect(fixture.factories()).toBe(1);
        expect(host.changes).toHaveLength(cleanup === 'form' ? 1 : 0);
        expect(host.resets).toHaveLength(cleanup === 'form' ? 1 : 0);
        if (cleanup === 'form') {
          expect(host.changes[0]).toBe(defaults);
          expect(host.resets[0]).toBe(defaults);
        }
      } finally {
        host.unmount();
      }
    }

    const trueFixture = blankFixture();
    const trueValues = { ...trueFixture.values, other: 'sibling-value' };
    let original: ErrorMap | undefined;
    let omission: ErrorMap | undefined;
    const removed = mountValidity({
      model: trueFixture.model,
      values: trueValues,
      controls: [{ name: 'name', shouldResetWithUnmount: true }, { name: 'other' }],
      onCheck(payload, accept) {
        if (!original) {
          original = payload;
          accept(payload);
        } else {
          omission = payload;
        }
      }
    });
    try {
      let valid = true;
      let nativeResult: unknown;
      act(() => {
        valid = removed.form().checkForField('name', result => {
          nativeResult = result;
        });
      });
      expect(valid).toBe(false);
      expect(nativeResult).toBe(original!.name);
      expectField(removed, 'name', '', 'true');
      removed.present({ visible: false }); // T1: one actual unmount removal, rejected by owner.
      expect(omission).toBe(removed.checks[1]);
      expect(omission).not.toBe(original);
      expect(Reflect.ownKeys(omission!)).toEqual([]);
      expect(removed.ownedError()).toBe(original);
      expect(removed.fields.name.error).toBe('');
      expect(removed.changes).toEqual([{ other: 'sibling-value' }]);
      removed.present({ visible: true, controls: [{ name: 'name' }, { name: 'other' }] }); // T2: ordinary final teardown will not remove again.
      expectField(removed, 'name', '', 'true');
      removed.present({ formError: omission }); // T3: owner accepts the original omission payload.
      expect(removed.ownedError()).toBe(omission);
      expectField(removed, 'name', undefined, null);
      expectField(removed, 'other', undefined, null);
      expect(removed.fields.other.value).toBe('sibling-value');
      expect(removed.checks).toHaveLength(2);
      expect(removed.errors).toEqual([original]);
      expect(removed.errors[0]).toBe(original);
      expect(original!.name).toEqual({ hasError: true, errorMessage: '' });
      expect(trueFixture.rules).toHaveLength(1);
      expect(trueFixture.factories()).toBe(1);
    } finally {
      removed.unmount();
    }

    const falseFixture = blankFixture();
    const retained = mountValidity(falseFixture);
    try {
      let valid = true;
      let nativeResult: unknown;
      act(() => {
        valid = retained.form().checkForField('name', result => {
          nativeResult = result;
        });
      });
      const map = retained.checks[0];
      expect(valid).toBe(false);
      expect(nativeResult).toBe(map.name);
      expect(nativeResult).toEqual({ hasError: true, errorMessage: '' });
      retained.present({ visible: false }); // T4: no removal with the false cleanup flag.
      expect(retained.ownedError()).toBe(map);
      retained.present({ visible: true }); // T5
      expectField(retained, 'name', '', 'true');
      expect(retained.ownedError()).toBe(map);
      expectBlankCallbacks(retained);
      expect(retained.changes).toHaveLength(0);
      expect(falseFixture.rules).toHaveLength(1);
      expect(falseFixture.factories()).toBe(1);
    } finally {
      retained.unmount();
    }
  });

  it('FMV11 keeps reset and removed-field state while a late async check returns its own result', async () => {
    const values = { name: 'present-value' };
    let acknowledgeRuleEntry: () => void = () => {};
    const ruleEntered = new Promise<void>(resolve => {
      acknowledgeRuleEntry = resolve;
    });
    let release: (valid: boolean) => void = () => {};
    const deferred = new Promise<boolean>(resolve => {
      release = resolve;
    });
    const ruleCalls: unknown[][] = [];
    const order: string[] = [];
    let factories = 0;
    const model = SchemaModel({
      name: StringType().addAsyncRule(
        (value, data, name) => {
          ruleCalls.push([value, data, name]);
          order.push('rule');
          acknowledgeRuleEntry();
          return deferred;
        },
        // @ts-expect-error 2.4.2 omits the async message factory accepted by createValidatorAsync.
        () => {
          factories += 1;
          order.push('factory');
          return '';
        }
      )
    });
    const host = mountValidity({
      model,
      values,
      defaultValues: values,
      controls: [{ name: 'name', shouldResetWithUnmount: true }]
    });
    let promise: Promise<any> | undefined;
    let result: any;
    try {
      await act(async () => {
        promise = host.form().checkForFieldAsync('name');
        await ruleEntered;
      });
      expect(ruleCalls).toEqual([['present-value', values, 'name']]);
      expect(ruleCalls[0][1]).toBe(values);
      act(() => {
        host.form().reset();
      });
      expect(host.changes[0]).toBe(values);
      expect(host.resets[0]).toBe(values);
      host.present({ visible: false }); // One field-unmount owner transition and one removal.
      expect(host.checks).toHaveLength(1);
      expect(Reflect.ownKeys(host.checks[0])).toEqual([]);
      const removal = host.checks[0];
      expect(host.errors).toHaveLength(0);
      await act(async () => {
        release(false); // The single caller-owned deferred release.
        result = await promise;
      });
      expect(result).toEqual({ hasError: true, errorMessage: '' });
      expect(host.ownedError()).toBe(removal);
      expect(host.errors).toHaveLength(0);
      expect(host.checks).toHaveLength(1);
      expect(host.fields.name.error).toBeUndefined();
      expect(Object.keys(host.fields.name)).toEqual(publicFieldKeys);
      expect(host.root().querySelectorAll('input')).toHaveLength(0);
      expect(host.root().querySelector('[role="alert"]')).toBeNull();
      host.present({ visible: true, controls: [{ name: 'name' }] });
      expectField(host, 'name', undefined, null);
      expect(host.ownedError()).toBe(removal);
      expect(host.checks).toHaveLength(1);
      expect(ruleCalls).toHaveLength(1);
      expect(factories).toBe(1);
      expect(order).toEqual(['factory', 'rule']);
    } finally {
      host.unmount();
    }
  });
});
