import React, { useEffect, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { StringType } from 'schema-typed';
import Form, { type FormInstance } from '..';
import Button from '../../Button';
import '../../styles/index.scss';

interface AsyncPointerState {
  ready: boolean;
  requests: { value: unknown }[];
  checks: Record<string, unknown>[];
  settled: unknown[];
  events: boolean[];
  nativeSubmits: number;
}
declare global {
  interface Window {
    __RSUITE_ASYNC_POINTER__: AsyncPointerState;
    __RSUITE_ASYNC_POINTER_ACTIONS__: {
      check: (whole: boolean) => void;
      release: (id: number, valid: boolean) => void;
      clean: () => void;
    };
  }
}
const options = JSON.parse(decodeURIComponent(location.hash.slice(1))) as {
  adapter: 'schema' | 'resolver';
  sdkButton: boolean;
};
const state = (window.__RSUITE_ASYNC_POINTER__ = {
  ready: false,
  requests: [],
  checks: [],
  settled: [],
  events: [],
  nativeSubmits: 0
} as AsyncPointerState);
for (const type of ['pointerdown', 'pointerup', 'click', 'submit']) {
  document.addEventListener(
    type,
    event => {
      state.events.push(event.isTrusted);
      if (type === 'submit') state.nativeSubmits++;
    },
    true
  );
}

function Probe() {
  const form = useRef<FormInstance>(null);
  const releases = useRef<((valid: boolean) => void)[]>([]);
  const validate = (value: unknown) =>
    new Promise<boolean>(resolve => {
      state.requests.push({ value });
      releases.current.push(resolve);
    });
  const rule = useMemo(() => StringType().addAsyncRule(validate, 'Use valid value'), []);
  const resolver = useMemo(
    () => async (values: Record<string, unknown>) => ({
      errors: (await validate(values.field)) ? {} : { field: 'Use valid value' }
    }),
    []
  );
  useEffect(() => {
    window.__RSUITE_ASYNC_POINTER_ACTIONS__ = {
      check: whole => {
        const result = whole
          ? form.current!.checkAsync()
          : form.current!.checkForFieldAsync('field');
        void result.then(value => state.settled.push(value));
      },
      release: (id, valid) => releases.current[id](valid),
      clean: () => form.current!.cleanErrors()
    };
    state.ready = true;
  }, []);
  const Submit = options.sdkButton ? Button : 'button';
  return (
    <Form
      ref={form}
      checkTrigger="blur"
      noValidate
      formDefaultValue={{ field: 'value' }}
      {...(options.adapter === 'resolver' ? { resolver } : {})}
      onCheck={errors => state.checks.push(errors)}
    >
      <Form.Group controlId="async-pointer-field">
        <Form.Label>Value</Form.Label>
        <Form.Control
          name="field"
          checkAsync
          errorPlacement="static"
          {...(options.adapter === 'schema' ? { rule } : {})}
        />
      </Form.Group>
      <Submit
        id="async-pointer-submit"
        type="submit"
        style={{ display: 'block', width: 100, height: 34, marginTop: 20 }}
      >
        Submit
      </Submit>
    </Form>
  );
}
document.body.style.margin = '32px';
createRoot(document.querySelector('#root')!).render(<Probe />);
