import React from 'react';
import { act, render } from '@testing-library/react';
import { SchemaModel, StringType } from 'schema-typed';
import type { Schema } from 'schema-typed';
import { expect } from 'vitest';
import Form from '../Form';
import type { FormInstance } from '../hooks/useFormRef';
import type { Resolver } from '../resolvers';
import useFormControl from '../../useFormControl';

export type ErrorMap = Record<string, any>;
export type PublicField = ReturnType<typeof useFormControl>;

export const publicFieldKeys = [
  'value',
  'error',
  'plaintext',
  'readOnly',
  'disabled',
  'onChange',
  'onCheck',
  'onBlur',
  'setValue'
];

export interface ControlDefinition {
  name: string;
  shouldResetWithUnmount?: boolean;
}

interface Presentation {
  formError?: ErrorMap | null;
  errorMessage?: React.ReactNode;
  errorFromContext?: boolean;
  resolver?: Resolver;
  controls?: ControlDefinition[];
  visible?: boolean;
  'aria-invalid'?: React.AriaAttributes['aria-invalid'];
  'aria-errormessage'?: string;
  revision?: number;
}

interface MountOptions {
  model?: Schema;
  values?: Record<string, any>;
  defaultValues?: Record<string, any>;
  controlled?: boolean;
  initialError?: ErrorMap | null;
  nestedField?: boolean;
  controls?: ControlDefinition[];
  onCheck?: (payload: ErrorMap, accept: (payload: ErrorMap) => void) => void;
  onError?: (payload: ErrorMap) => void;
  resolver?: Resolver;
}

/** Ordinary declared callbacks; no native method is replaced or called here. */
export function blankFixture() {
  const values = { name: 'present-value' };
  const gate = { shouldFail: true };
  const rules: { value: unknown; data: unknown; name: unknown; failing: boolean }[] = [];
  const order: string[] = [];
  let factories = 0;
  const rule = (value: unknown, data: unknown, name: unknown) => {
    rules.push({ value, data, name, failing: gate.shouldFail });
    order.push('rule');
    return !gate.shouldFail;
  };
  const factory = () => {
    factories += 1;
    order.push('factory');
    return '';
  };
  const leaf = StringType().addRule(rule, factory);
  const model = SchemaModel({ name: leaf });
  return { values, gate, rules, order, rule, factory, leaf, model, factories: () => factories };
}

interface PassiveInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  plaintext?: boolean;
}

function PassiveInput({ value, plaintext, ...props }: PassiveInputProps) {
  const displayedValue = Array.isArray(value)
    ? value.join(',')
    : value == null
      ? ''
      : String(value);
  return <input {...props} value={displayedValue} readOnly data-plaintext={plaintext} />;
}

/** The owner and probe observe only owner props, public callbacks and the public hook. */
export function mountValidity(options: MountOptions = {}) {
  const formRef = React.createRef<FormInstance>();
  const fields: Record<string, PublicField> = {};
  const checks: ErrorMap[] = [];
  const errors: ErrorMap[] = [];
  const changes: unknown[] = [];
  const resets: unknown[] = [];
  const initialControls = options.controls ?? [{ name: 'name' }];
  let ownedError: ErrorMap | null = options.initialError ?? {};
  let updateOwner!: React.Dispatch<
    React.SetStateAction<{ error: ErrorMap | null; presentation: Presentation }>
  >;

  function Probe({ name, errorMessage }: { name: string; errorMessage?: React.ReactNode }) {
    const field = useFormControl({
      name,
      errorMessage,
      checkTrigger: null,
      shouldResetWithUnmount: false
    });
    React.useLayoutEffect(() => {
      fields[name] = field;
    });
    return null;
  }

  function Owner() {
    const [state, setState] = React.useState<{
      error: ErrorMap | null;
      presentation: Presentation;
    }>({
      error: options.initialError ?? {},
      presentation: { resolver: options.resolver }
    });
    updateOwner = setState;
    ownedError = state.error;
    const presentation = state.presentation;
    const controls = presentation.controls ?? initialControls;
    const accept = (payload: ErrorMap) =>
      setState(current =>
        Object.is(current.error, payload) ? current : { ...current, error: payload }
      );

    return (
      <Form
        ref={formRef}
        model={options.model}
        formValue={options.values}
        formDefaultValue={options.defaultValues}
        {...(options.controlled === false ? {} : { formError: state.error })}
        nestedField={options.nestedField}
        checkTrigger={null}
        errorFromContext={presentation.errorFromContext}
        resolver={presentation.resolver}
        onCheck={payload => {
          checks.push(payload);
          if (options.onCheck) {
            options.onCheck(payload, accept);
          } else if (options.controlled !== false) {
            accept(payload);
          }
        }}
        onError={payload => {
          errors.push(payload);
          options.onError?.(payload);
        }}
        onChange={payload => changes.push(payload)}
        onReset={payload => resets.push(payload)}
      >
        {presentation.visible !== false &&
          controls.map((control, index) => (
            <Form.Control
              key={control.name}
              id={`native-validity-${index}`}
              name={control.name}
              accepter={PassiveInput}
              errorMessage={presentation.errorMessage}
              shouldResetWithUnmount={control.shouldResetWithUnmount ?? false}
              {...(presentation['aria-invalid'] === undefined
                ? {}
                : { 'aria-invalid': presentation['aria-invalid'] })}
              {...(presentation['aria-errormessage'] === undefined
                ? {}
                : { 'aria-errormessage': presentation['aria-errormessage'] })}
            />
          ))}
        {initialControls.map(control => (
          <Probe key={control.name} name={control.name} errorMessage={presentation.errorMessage} />
        ))}
      </Form>
    );
  }

  const view = render(<Owner />);
  return {
    form: () => formRef.current!,
    root: () => formRef.current!.root!,
    fields,
    checks,
    errors,
    changes,
    resets,
    ownedError: () => ownedError,
    input(name = 'name') {
      return Array.from(formRef.current!.root!.querySelectorAll<HTMLInputElement>('input')).find(
        input => input.name === name
      )!;
    },
    /** One explicitly requested owner/presentation transition; no validation. */
    present(patch: Presentation) {
      act(() => {
        updateOwner(current => ({
          error: Object.prototype.hasOwnProperty.call(patch, 'formError')
            ? (patch.formError ?? null)
            : current.error,
          presentation: { ...current.presentation, ...patch }
        }));
      });
    },
    unmount: view.unmount
  };
}

export type ValidityHost = ReturnType<typeof mountValidity>;

export function expectField(
  host: ValidityHost,
  name: string,
  error: React.ReactNode,
  invalid: string | null,
  alert = false
) {
  expect(host.fields[name].error).toBe(error);
  expect(Object.keys(host.fields[name])).toEqual(publicFieldKeys);
  const input = host.input(name);
  expect(input.getAttribute('aria-invalid')).toBe(invalid);
  const wrapper = input.closest('[data-testid="form-control-wrapper"]')!;
  expect(wrapper.querySelectorAll('[role="alert"]').length).toBe(alert ? 1 : 0);
  if (!alert) {
    expect(input.hasAttribute('aria-errormessage')).toBe(false);
  } else {
    expect(input.getAttribute('aria-errormessage')).toBe(`${input.id}-error-message`);
  }
}

export function expectBlankCallbacks(host: ValidityHost, count = 1) {
  expect(host.checks).toHaveLength(count);
  expect(host.errors).toHaveLength(count);
  host.checks.forEach((payload, index) => {
    expect(host.errors[index]).toBe(payload);
  });
}
