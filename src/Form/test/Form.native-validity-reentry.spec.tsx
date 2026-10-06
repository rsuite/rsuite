import { act } from '@testing-library/react';
import { ObjectType, SchemaModel, StringType } from 'schema-typed';
import { describe, expect, it } from 'vitest';
import { blankFixture, expectField, mountValidity } from './nativeValidityTestUtils';
import type { ErrorMap, ValidityHost } from './nativeValidityTestUtils';

// Authored action inventory, not runtime evidence. All four cases are UNRUN.
// Columns: native requests, resolver requests, clear/reset/removal, owner renders, releases.
export const nativeValidityReentryCaseInventory = [
  ['FMVR01', 4, 0, 0, 1, 0],
  ['FMVR02', 4, 0, 0, 0, 0],
  ['FMVR03', 2, 0, 2, 6, 0],
  ['FMVR04', 2, 2, 0, 4, 0]
] as const;
// These four contribute 12 native + 2 resolver = 14 requests, 2 resets and 11 owner renders.
// Together with FMV01..11: 29 native + 16 resolver = 45 requests, 9 clears/resets,
// 41 explicit owner renders, 1 release and 0 drivers/timers/helper task checkpoints.

describe('Form native validity through reentry and exact map reuse', () => {
  it('FMVR01 keeps selected native frames coherent through synchronous onCheck reentry', () => {
    const restoredFixture = blankFixture();
    const restoredTrace: string[] = [];
    let restoredA: ErrorMap;
    let restoredB: ErrorMap;
    let restoredInnerResult: unknown;
    let restoredWholeMap: unknown;
    let armed = true;
    const restored: ValidityHost = mountValidity({
      ...restoredFixture,
      onCheck(payload, accept) {
        if (armed) {
          restoredA = payload;
          restoredTrace.push('onCheck(A):enter');
          armed = false;
          restoredFixture.gate.shouldFail = false;
          const innerValid = restored.form().checkForField('name', result => {
            restoredInnerResult = result;
            restoredTrace.push('fieldCallback(B):originalValidResult');
          });
          restoredTrace.push(`inner:return(${innerValid})`);
          accept(restoredA);
          restoredTrace.push('onCheck(A):exit');
        } else {
          restoredB = payload;
          restoredTrace.push('onCheck(B):enter');
          accept(payload);
          restoredTrace.push('onCheck(B):exit');
        }
      },
      onError(payload) {
        expect(payload).toBe(restoredA);
        restoredTrace.push('onError(A):sameRootAsOnCheckA');
      }
    });
    try {
      let outerValid = true;
      act(() => {
        outerValid = restored.form().check(payload => {
          restoredWholeMap = payload;
          restoredTrace.push('wholeCallback(A):sameRootAsOnCheckA');
        });
        restoredTrace.push(`outer:return(${outerValid})`);
      });
      expect(outerValid).toBe(false);
      expect(restoredTrace).toEqual([
        'onCheck(A):enter',
        'onCheck(B):enter',
        'onCheck(B):exit',
        'fieldCallback(B):originalValidResult',
        'inner:return(true)',
        'onCheck(A):exit',
        'wholeCallback(A):sameRootAsOnCheckA',
        'onError(A):sameRootAsOnCheckA',
        'outer:return(false)'
      ]);
      expect(restoredA!).not.toBe(restoredB!);
      expect(restoredA!.name).toEqual({ hasError: true, errorMessage: '' });
      expect(Reflect.ownKeys(restoredB!)).toEqual([]);
      expect(restoredWholeMap).toBe(restoredA!);
      expect(restoredInnerResult).toEqual({ hasError: false });
      expect(restored.checks).toEqual([restoredA!, restoredB!]);
      expect(restored.checks[0]).toBe(restoredA!);
      expect(restored.checks[1]).toBe(restoredB!);
      expect(restored.errors).toEqual([restoredA!]);
      expect(restored.ownedError()).toBe(restoredA!);
      expect(restoredFixture.rules).toEqual([
        { value: 'present-value', data: restoredFixture.values, name: 'name', failing: true },
        { value: 'present-value', data: restoredFixture.values, name: 'name', failing: false }
      ]);
      restoredFixture.rules.forEach(call => expect(call.data).toBe(restoredFixture.values));
      expect(restoredFixture.factories()).toBe(2);
      expect(restoredFixture.order).toEqual(['rule', 'factory', 'rule', 'factory']);
      expectField(restored, 'name', '', 'true');
    } finally {
      restored.unmount();
    }

    const retainedFixture = blankFixture();
    const retainedTrace: string[] = [];
    let retainedA: ErrorMap;
    let retainedB: ErrorMap;
    let retainedOuterResult: unknown;
    let retainedInnerMap: unknown;
    let retainedArmed = true;
    const retained: ValidityHost = mountValidity({
      ...retainedFixture,
      onCheck(payload, accept) {
        if (retainedArmed) {
          retainedA = payload;
          retainedTrace.push('onCheck(A):enter');
          retainedArmed = false;
          retainedFixture.gate.shouldFail = false;
          const innerValid = retained.form().check(innerPayload => {
            retainedInnerMap = innerPayload;
            retainedTrace.push('wholeCallback(B):sameRootAsOnCheckB');
          });
          retainedTrace.push(`inner:return(${innerValid})`);
          retainedTrace.push('onCheck(A):exit');
        } else {
          retainedB = payload;
          retainedTrace.push('onCheck(B):enter');
          accept(payload);
          retainedTrace.push('onCheck(B):exit');
        }
      },
      onError(payload) {
        expect(payload).toBe(retainedA);
        retainedTrace.push('onError(A):sameRootAsOnCheckA');
      }
    });
    try {
      let outerValid = true;
      act(() => {
        outerValid = retained.form().checkForField('name', result => {
          retainedOuterResult = result;
          retainedTrace.push('fieldCallback(A):sameObjectAsA.name');
        });
        retainedTrace.push(`outer:return(${outerValid})`);
      });
      expect(outerValid).toBe(false);
      expect(retainedOuterResult).toBe(retainedA!.name);
      expect(retainedInnerMap).toBe(retainedB!);
      expect(Reflect.ownKeys(retainedB!)).toEqual([]);
      expect(retainedA!).not.toBe(retainedB!);
      expect(retained.ownedError()).toBe(retainedB!);
      expectField(retained, 'name', undefined, null);
      retained.present({ formError: retainedA! }); // One external exact-A reacceptance.
      retainedTrace.push('externalOwnerReacceptsOriginalA:noCallbacks');
      expect(retainedTrace).toEqual([
        'onCheck(A):enter',
        'onCheck(B):enter',
        'onCheck(B):exit',
        'wholeCallback(B):sameRootAsOnCheckB',
        'inner:return(true)',
        'onCheck(A):exit',
        'fieldCallback(A):sameObjectAsA.name',
        'onError(A):sameRootAsOnCheckA',
        'outer:return(false)',
        'externalOwnerReacceptsOriginalA:noCallbacks'
      ]);
      expectField(retained, 'name', '', 'true');
      expect(retained.ownedError()).toBe(retainedA!);
      expect(retained.checks).toHaveLength(2);
      expect(retained.errors).toEqual([retainedA!]);
      expect(retainedFixture.rules).toHaveLength(2);
      retainedFixture.rules.forEach(call => {
        expect(call.data).toBe(retainedFixture.values);
        expect(call.value).toBe('present-value');
        expect(call.name).toBe('name');
      });
      expect(retainedFixture.rules.map(call => call.failing)).toEqual([true, false]);
      expect(retainedFixture.factories()).toBe(2);
      expect(retainedFixture.order).toEqual(['rule', 'factory', 'rule', 'factory']);
    } finally {
      retained.unmount();
    }
  });

  it('FMVR02 keeps selected native frames coherent through asynchronous onCheck reentry', async () => {
    const wholeFixture = blankFixture();
    const wholeTrace: string[] = [];
    let wholeA: ErrorMap;
    let wholeB: ErrorMap;
    let wholeInnerResult: unknown;
    let armed = true;
    const whole: ValidityHost = mountValidity({
      ...wholeFixture,
      onCheck(payload, accept) {
        if (armed) {
          wholeA = payload;
          wholeTrace.push('onCheck(A):enter');
          armed = false;
          wholeFixture.gate.shouldFail = false;
          const innerValid = whole.form().checkForField('name', result => {
            wholeInnerResult = result;
            wholeTrace.push('fieldCallback(B):originalValidResult');
          });
          wholeTrace.push(`inner:return(${innerValid})`);
          accept(wholeA);
          wholeTrace.push('onCheck(A):exit');
        } else {
          wholeB = payload;
          wholeTrace.push('onCheck(B):enter');
          accept(payload);
          wholeTrace.push('onCheck(B):exit');
        }
      },
      onError(payload) {
        expect(payload).toBe(wholeA);
        wholeTrace.push('onError(A):sameRootAsOnCheckA');
      }
    });
    let wholePromise: Promise<any> | undefined;
    let wholeResult: any;
    try {
      await act(async () => {
        wholePromise = whole.form().checkAsync();
        wholeTrace.push('outer:returnsOriginalPublicPromiseQ');
        wholeResult = await wholePromise;
        wholeTrace.push('Q:resolves(hasError=true,formError===A)');
      });
      expect(wholePromise).toBeInstanceOf(Promise);
      expect(wholeResult.hasError).toBe(true);
      expect(wholeResult.formError).toBe(wholeA!);
      expect(wholeA!.name).toBe('');
      expect(Reflect.ownKeys(wholeB!)).toEqual([]);
      expect(wholeA!).not.toBe(wholeB!);
      expect(wholeInnerResult).toEqual({ hasError: false });
      expect(whole.ownedError()).toBe(wholeA!);
      expect(whole.checks).toHaveLength(2);
      expect(whole.errors).toEqual([wholeA!]);
      expect(wholeTrace).toEqual([
        'outer:returnsOriginalPublicPromiseQ',
        'onCheck(A):enter',
        'onCheck(B):enter',
        'onCheck(B):exit',
        'fieldCallback(B):originalValidResult',
        'inner:return(true)',
        'onCheck(A):exit',
        'onError(A):sameRootAsOnCheckA',
        'Q:resolves(hasError=true,formError===A)'
      ]);
      expect(wholeFixture.rules).toHaveLength(2);
      wholeFixture.rules.forEach(call => {
        expect(call.value).toBe('present-value');
        expect(call.data).toBe(wholeFixture.values);
        expect(call.name).toBe('name');
      });
      expect(wholeFixture.rules.map(call => call.failing)).toEqual([true, false]);
      expect(wholeFixture.factories()).toBe(2);
      expect(wholeFixture.order).toEqual(['factory', 'rule', 'rule', 'factory']);
      expectField(whole, 'name', '', 'true');
    } finally {
      whole.unmount();
    }

    const values = { user: { name: 'present-value' } };
    const originalUser = values.user;
    const gate = { shouldFail: true };
    const calls: { value: unknown; data: unknown; name: unknown; failing: boolean }[] = [];
    const order: string[] = [];
    let factories = 0;
    const model = SchemaModel({
      user: ObjectType().shape({
        name: StringType().addRule(
          (value, data, name) => {
            calls.push({ value, data, name, failing: gate.shouldFail });
            order.push('rule');
            return !gate.shouldFail;
          },
          () => {
            factories += 1;
            order.push('factory');
            return '';
          }
        )
      })
    });
    const nestedTrace: string[] = [];
    let nestedA: ErrorMap;
    let nestedB: ErrorMap;
    let nestedInnerResult: unknown;
    let nestedArmed = true;
    const nested: ValidityHost = mountValidity({
      model,
      values,
      nestedField: true,
      controls: [{ name: 'user.name' }],
      onCheck(payload, accept) {
        if (nestedArmed) {
          nestedA = payload;
          nestedTrace.push('onCheck(A):enter');
          nestedArmed = false;
          gate.shouldFail = false;
          const innerValid = nested.form().checkForField('user.name', result => {
            nestedInnerResult = result;
            nestedTrace.push('fieldCallback(B):sameObjectAsB.user.object.name');
          });
          nestedTrace.push(`inner:return(${innerValid})`);
          nestedTrace.push('onCheck(A):exit');
        } else {
          nestedB = payload;
          nestedTrace.push('onCheck(B):enter');
          accept(payload);
          nestedTrace.push('onCheck(B):exit');
        }
      },
      onError(payload) {
        expect(payload).toBe(nestedA);
        nestedTrace.push('onError(A):sameRootAsOnCheckA');
      }
    });
    let nestedPromise: Promise<any> | undefined;
    let nestedResult: any;
    try {
      await act(async () => {
        nestedPromise = nested.form().checkForFieldAsync('user.name');
        nestedTrace.push('outer:returnsOriginalPublicPromiseQ');
        nestedResult = await nestedPromise;
        nestedTrace.push('Q:resolves(originalRA)');
      });
      expect(nestedPromise).toBeInstanceOf(Promise);
      expect(nestedResult).toBe(nestedA!.user.object.name);
      expect(nestedResult).toEqual({ hasError: true, errorMessage: '' });
      expect(nestedInnerResult).toBe(nestedB!.user.object.name);
      expect(nestedInnerResult).toEqual({ hasError: false });
      expect(nestedResult).not.toBe(nestedInnerResult);
      expect(nestedA!).not.toBe(nestedB!);
      expect(nested.ownedError()).toBe(nestedB!);
      expect(nested.checks).toHaveLength(2);
      expect(nested.errors).toEqual([nestedA!]);
      expect(nestedTrace).toEqual([
        'outer:returnsOriginalPublicPromiseQ',
        'onCheck(A):enter',
        'onCheck(B):enter',
        'onCheck(B):exit',
        'fieldCallback(B):sameObjectAsB.user.object.name',
        'inner:return(true)',
        'onCheck(A):exit',
        'onError(A):sameRootAsOnCheckA',
        'Q:resolves(originalRA)'
      ]);
      expect(calls).toHaveLength(2);
      calls.forEach(call => {
        expect(call.value).toBe('present-value');
        expect(call.data).toBe(values);
        expect(call.name).toBe('user.name');
      });
      expect(calls.map(call => call.failing)).toEqual([true, false]);
      expect(values.user).toBe(originalUser);
      expect(factories).toBe(2);
      expect(order).toEqual(['factory', 'rule', 'rule', 'factory']);
      expectField(nested, 'user.name', undefined, null);
    } finally {
      nested.unmount();
    }
  });

  it('FMVR03 retains same-identity resets and commits retirement after root-map mutation', async () => {
    for (const controlled of [true, false]) {
      const fixture = blankFixture();
      const host = mountValidity({ ...fixture, controlled });
      let promise: Promise<any> | undefined;
      let result: any;
      let resetReturn: unknown;
      try {
        await act(async () => {
          promise = host.form().checkAsync();
          result = await promise;
        });
        const map = host.checks[0];
        expect(promise).toBeInstanceOf(Promise);
        expect(result.hasError).toBe(true);
        expect(result.formError).toBe(map);
        expect(host.errors[0]).toBe(map);
        expect(Object.getOwnPropertyDescriptor(map, 'name')).toEqual({
          value: '',
          writable: true,
          enumerable: true,
          configurable: true
        });
        if (controlled) expect(host.ownedError()).toBe(map);
        expectField(host, 'name', '', 'true');
        act(() => {
          resetReturn = host.form().resetErrors(map);
        });
        expect(resetReturn).toBeUndefined();
        host.present({ revision: 1 }); // M1/M2-T1: same intact selected frame after reset.
        if (controlled) expect(host.ownedError()).toBe(map);
        expectField(host, 'name', '', 'true');
        map.name = 'manual replacement'; // Only the projected primitive root property changes.
        host.present({ revision: 2 }); // M1/M2-T2: act completes the presentation effect commit.
        expect(map.name).toBe('manual replacement');
        expect(result.formError).toBe(map);
        expect(host.errors[0]).toBe(map);
        if (controlled) expect(host.ownedError()).toBe(map);
        expectField(host, 'name', '', null); // Original memoized message remains blank.
        map.name = '';
        host.present({ revision: 3 }); // Restoring A after committed retirement cannot revive it.
        expect(result.formError).toBe(map);
        expect(host.errors[0]).toBe(map);
        if (controlled) expect(host.ownedError()).toBe(map);
        expectField(host, 'name', '', null);
        expect(host.checks).toHaveLength(1);
        expect(host.errors).toHaveLength(1);
        expect(Reflect.ownKeys(map)).toEqual(['name']);
        expect(fixture.rules).toHaveLength(1);
        expect(fixture.rules[0].value).toBe('present-value');
        expect(fixture.rules[0].data).toBe(fixture.values);
        expect(fixture.rules[0].name).toBe('name');
        expect(fixture.factories()).toBe(1);
        expect(fixture.order).toEqual(['factory', 'rule']);
      } finally {
        host.unmount();
      }
    }
  });

  it('FMVR04 retains exact native A through whole resolver reuse and own-empty field C replacement', async () => {
    const wholeFixture = blankFixture();
    const wholeTrace: string[] = [];
    const wholeResolverInputs: unknown[] = [];
    const wholeResolverResults: { errors: ErrorMap }[] = [];
    let wholeA: ErrorMap;
    let wholePhase: 'native' | 'resolver' = 'native';
    const whole = mountValidity({
      ...wholeFixture,
      onCheck(payload, accept) {
        if (wholePhase === 'native') {
          wholeA = payload;
          wholeTrace.push('onCheck(A):nativeCaptureAndAccept');
        } else {
          expect(payload).toBe(wholeA);
          wholeTrace.push('onCheck(A):resolverSameA');
        }
        accept(payload);
      },
      onError(payload) {
        expect(payload).toBe(wholeA);
        wholeTrace.push(
          wholePhase === 'native' ? 'onError(A):nativeSameA' : 'onError(A):resolverSameA'
        );
      }
    });
    let wholePromise: Promise<any> | undefined;
    let wholeNativeResult: any;
    let wholeCallbackMap: unknown;
    try {
      await act(async () => {
        wholePromise = whole.form().checkAsync();
        wholeTrace.push('Q:returnsOriginalPublicPromise');
        wholeNativeResult = await wholePromise;
        wholeTrace.push('Q:resolves(originalHostResultWithFormErrorA)');
      });
      expect(wholePromise).toBeInstanceOf(Promise);
      expect(wholeNativeResult.hasError).toBe(true);
      expect(wholeNativeResult.formError).toBe(wholeA!);
      expect(whole.checks[0]).toBe(wholeA!);
      expect(whole.errors[0]).toBe(wholeA!);
      expect(wholeA!.name).toBe('');
      expectField(whole, 'name', '', 'true');
      const originalDescriptor = Object.getOwnPropertyDescriptor(wholeA!, 'name');
      const resolver = (value: unknown) => {
        wholeResolverInputs.push(value);
        const result = { errors: wholeA! };
        wholeResolverResults.push(result);
        wholeTrace.push('resolver(V):returnsErrorsOriginalA');
        return result;
      };
      wholePhase = 'resolver';
      whole.present({ resolver }); // RR1-T1: only the resolver prop changes.
      wholeTrace.push('RR1-T1:resolverOnlyRender');
      expectField(whole, 'name', '', 'true');
      let valid = true;
      act(() => {
        valid = whole.form().check(payload => {
          wholeCallbackMap = payload;
          wholeTrace.push('wholeResolverCallback(A):sameA');
        });
        wholeTrace.push(`resolverWhole:return(${valid})`);
      });
      expect(valid).toBe(false);
      whole.present({ revision: 1 }); // RR1-T2: bounded same-A presentation tick.
      wholeTrace.push('RR1-T2:presentationTickNoCallbacks');
      expect(wholeTrace).toEqual([
        'Q:returnsOriginalPublicPromise',
        'onCheck(A):nativeCaptureAndAccept',
        'onError(A):nativeSameA',
        'Q:resolves(originalHostResultWithFormErrorA)',
        'RR1-T1:resolverOnlyRender',
        'resolver(V):returnsErrorsOriginalA',
        'onCheck(A):resolverSameA',
        'wholeResolverCallback(A):sameA',
        'onError(A):resolverSameA',
        'resolverWhole:return(false)',
        'RR1-T2:presentationTickNoCallbacks'
      ]);
      expect(wholeCallbackMap).toBe(wholeA!);
      expect(wholeNativeResult.formError).toBe(wholeA!);
      expect(whole.ownedError()).toBe(wholeA!);
      expect(whole.checks).toHaveLength(2);
      expect(whole.checks[1]).toBe(wholeA!);
      expect(whole.errors).toHaveLength(2);
      expect(whole.errors[1]).toBe(wholeA!);
      expect(wholeResolverInputs).toHaveLength(1);
      expect(wholeResolverInputs[0]).toBe(wholeFixture.values);
      expect(wholeResolverResults).toHaveLength(1);
      expect(wholeResolverResults[0].errors).toBe(wholeA!);
      expect(Object.getOwnPropertyDescriptor(wholeA!, 'name')).toEqual(originalDescriptor);
      expect(Reflect.ownKeys(wholeA!)).toEqual(['name']);
      expect(wholeFixture.rules).toHaveLength(1);
      expect(wholeFixture.rules[0].data).toBe(wholeFixture.values);
      expect(wholeFixture.factories()).toBe(1);
      expect(wholeFixture.order).toEqual(['factory', 'rule']);
      expectField(whole, 'name', '', 'true');
    } finally {
      whole.unmount();
    }

    const fieldFixture = blankFixture();
    const fieldTrace: string[] = [];
    const fieldResolverInputs: unknown[] = [];
    const fieldResolverResults: { errors: ErrorMap }[] = [];
    let fieldA: ErrorMap;
    let fieldC: ErrorMap;
    let fieldPhase: 'native' | 'resolver' = 'native';
    const field = mountValidity({
      ...fieldFixture,
      onCheck(payload, accept) {
        if (fieldPhase === 'native') {
          fieldA = payload;
          fieldTrace.push('onCheck(A):nativeCaptureAndAccept');
        } else {
          fieldC = payload;
          fieldTrace.push('onCheck(C):acceptDistinctOwnEmptyC');
        }
        accept(payload);
      },
      onError(payload) {
        expect(payload).toBe(fieldA);
        fieldTrace.push('onError(A):nativeSameA');
      }
    });
    let fieldPromise: Promise<any> | undefined;
    let fieldNativeResult: any;
    let fieldCallbackResult: any;
    try {
      await act(async () => {
        fieldPromise = field.form().checkAsync();
        fieldTrace.push('Q:returnsOriginalPublicPromise');
        fieldNativeResult = await fieldPromise;
        fieldTrace.push('Q:resolves(originalHostResultWithFormErrorA)');
      });
      expect(fieldPromise).toBeInstanceOf(Promise);
      expect(fieldNativeResult.hasError).toBe(true);
      expect(fieldNativeResult.formError).toBe(fieldA!);
      expect(field.checks[0]).toBe(fieldA!);
      expect(field.errors[0]).toBe(fieldA!);
      expect(fieldA!.name).toBe('');
      expectField(field, 'name', '', 'true');
      const originalDescriptor = Object.getOwnPropertyDescriptor(fieldA!, 'name');
      const resolver = (value: unknown) => {
        fieldResolverInputs.push(value);
        const result = { errors: fieldA! };
        fieldResolverResults.push(result);
        fieldTrace.push('resolver(V):returnsErrorsOriginalA');
        return result;
      };
      fieldPhase = 'resolver';
      field.present({ resolver }); // RR2-T1
      fieldTrace.push('RR2-T1:resolverOnlyRender');
      expectField(field, 'name', '', 'true');
      let valid = false;
      act(() => {
        valid = field.form().checkForField('name', result => {
          fieldCallbackResult = result;
          fieldTrace.push('fieldResolverCallback(K):hostHasErrorFalseOnly');
        });
        fieldTrace.push(`resolverField:return(${valid})`);
      });
      expect(valid).toBe(true);
      expect(fieldC!).toBe(field.checks[1]);
      expect(fieldC!).not.toBe(fieldA!);
      expect(Reflect.ownKeys(fieldC!)).toEqual([]);
      expect(Object.prototype.hasOwnProperty.call(fieldC!, 'name')).toBe(false);
      expect(fieldCallbackResult).toEqual({ hasError: false });
      expect(fieldCallbackResult).not.toBe(fieldA!);
      expect(fieldCallbackResult).not.toBe(fieldC!);
      expect(Object.prototype.hasOwnProperty.call(fieldCallbackResult, 'errorMessage')).toBe(false);
      expect(field.ownedError()).toBe(fieldC!);
      expectField(field, 'name', undefined, null);
      field.present({ formError: fieldA! }); // RR2-T2: exact intact A, with no method call.
      fieldTrace.push('RR2-T2:reacceptOriginalANoCallbacks');
      expect(fieldTrace).toEqual([
        'Q:returnsOriginalPublicPromise',
        'onCheck(A):nativeCaptureAndAccept',
        'onError(A):nativeSameA',
        'Q:resolves(originalHostResultWithFormErrorA)',
        'RR2-T1:resolverOnlyRender',
        'resolver(V):returnsErrorsOriginalA',
        'onCheck(C):acceptDistinctOwnEmptyC',
        'fieldResolverCallback(K):hostHasErrorFalseOnly',
        'resolverField:return(true)',
        'RR2-T2:reacceptOriginalANoCallbacks'
      ]);
      expect(field.ownedError()).toBe(fieldA!);
      expect(fieldNativeResult.formError).toBe(fieldA!);
      expect(field.checks).toHaveLength(2);
      expect(field.errors).toHaveLength(1);
      expect(field.errors[0]).toBe(fieldA!);
      expect(fieldResolverInputs).toHaveLength(1);
      expect(fieldResolverInputs[0]).toBe(fieldFixture.values);
      expect(fieldResolverResults).toHaveLength(1);
      expect(fieldResolverResults[0].errors).toBe(fieldA!);
      expect(Object.getOwnPropertyDescriptor(fieldA!, 'name')).toEqual(originalDescriptor);
      expect(Reflect.ownKeys(fieldA!)).toEqual(['name']);
      expect(fieldFixture.rules).toHaveLength(1);
      expect(fieldFixture.rules[0].data).toBe(fieldFixture.values);
      expect(fieldFixture.factories()).toBe(1);
      expect(fieldFixture.order).toEqual(['factory', 'rule']);
      expectField(field, 'name', '', 'true');
    } finally {
      field.unmount();
    }
  });
});
