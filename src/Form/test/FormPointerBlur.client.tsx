import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal, flushSync } from 'react-dom';
import { StringType, NumberType } from 'schema-typed';
import Form, { type FormInstance } from '..';
import Button from '../../Button';
import NumberInput from '../../NumberInput';
import type { PointerBlurCase } from './formPointerBlurCases';
import '../../styles/index.scss';

interface PointerBlurState {
  ready: boolean;
  events: { type: string; trusted: boolean }[];
  checks: Record<string, unknown>[];
  nativeSubmits: number;
  validSubmits: number;
  clicks: number;
  blurs: number;
  otherChecks: number;
}

declare global {
  interface Window {
    __RSUITE_FORM_POINTER__: PointerBlurState;
    __RSUITE_FORM_POINTER_ACTION__: () => void;
  }
}

const options = JSON.parse(
  new URL(location.href).hash.slice(1) && decodeURIComponent(location.hash.slice(1))
) as PointerBlurCase & { sdkButton: boolean };
const state = (window.__RSUITE_FORM_POINTER__ = {
  ready: false,
  events: [],
  checks: [],
  nativeSubmits: 0,
  validSubmits: 0,
  clicks: 0,
  blurs: 0,
  otherChecks: 0
} as PointerBlurState);
const CustomForm = React.forwardRef<HTMLFormElement, React.ComponentPropsWithoutRef<'form'>>(
  (props, ref) => <form {...props} ref={ref} />
);

async function mount() {
  let owner = document;
  const iframe = options.portal ? document.createElement('iframe') : null;
  if (iframe) {
    iframe.id = 'pointer-frame';
    Object.assign(iframe.style, {
      position: 'fixed',
      inset: '0',
      width: '790px',
      height: '590px',
      border: '0'
    });
    const loaded = new Promise<void>(resolve =>
      iframe.addEventListener('load', () => resolve(), { once: true })
    );
    iframe.srcdoc = '<!doctype html><html><head></head><body></body></html>';
    document.body.append(iframe);
    await loaded;
    owner = iframe.contentDocument!;
    for (const style of document.querySelectorAll('style'))
      owner.head.append(style.cloneNode(true));
  }
  owner.body.style.margin = '32px';
  for (const type of ['pointerdown', 'pointerup', 'pointercancel', 'click', 'submit']) {
    owner.addEventListener(
      type,
      event => {
        state.events.push({ type, trusted: event.isTrusted });
        if (type === 'submit') state.nativeSubmits++;
      },
      true
    );
  }

  function Probe() {
    const form = useRef<FormInstance>(null);
    const [disabled, setDisabled] = useState(false);
    const [buttonMounted, setButtonMounted] = useState(true);
    const [fieldMounted, setFieldMounted] = useState(true);
    const [formMounted, setFormMounted] = useState(true);
    const [otherMounted, setOtherMounted] = useState(true);
    const [value, setValue] = useState<{ field: string | number }>({
      field: options.number ? 0 : options.shift ? 'invalid' : 'valid'
    });
    const [trigger, setTrigger] = useState<'blur' | 'change'>('blur');
    const rule = useMemo(
      () =>
        options.number
          ? NumberType().min(1, 'Use valid value')
          : StringType().addRule(value => value === 'valid', 'Use valid value'),
      []
    );
    useEffect(() => {
      window.__RSUITE_FORM_POINTER_ACTION__ = () => {
        const action = options.action;
        if (action === 'unmount-field') setFieldMounted(false);
        else if (action === 'unmount-form') setFormMounted(false);
        else if (action === 'value') setValue({ field: 'valid' });
        else if (action === 'trigger') setTrigger('change');
        else if (action === 'supersede') form.current!.checkForField('field');
        else if (action === 'cleanErrorForField') form.current!.cleanErrorForField('field');
        else if (action === 'cleanErrors') form.current!.cleanErrors();
        else if (action === 'resetErrors') form.current!.resetErrors();
        else if (action === 'reset') form.current!.reset();
      };
      state.ready = true;
    }, []);
    const updateButton = (stage: 'check' | 'error', errors: Record<string, unknown>) => {
      if (!errors.field) return;
      if (options.callback === `${stage}-disable`) setDisabled(true);
      if (options.callback === `${stage}-remove`) setButtonMounted(false);
    };
    const Submit = options.sdkButton ? Button : 'button';
    const button = buttonMounted && (
      <Submit
        id="pointer-submit"
        type="submit"
        disabled={disabled}
        form={options.external ? 'pointer-form' : undefined}
        style={{ width: 100, height: 34, display: 'block', marginTop: 20 }}
        onPointerDown={event => {
          if (options.foreignCapture)
            owner.querySelector('#pointer-foreign')!.setPointerCapture(event.pointerId);
        }}
        onClick={event => {
          state.clicks++;
          if (options.prevent) event.preventDefault();
        }}
      >
        <span>Submit</span>
      </Submit>
    );
    const content = (
      <>
        {formMounted && (
          <Form
            ref={form}
            id="pointer-form"
            {...(options.customRoot ? { as: CustomForm } : {})}
            formValue={value}
            onChange={next => setValue({ field: next.field })}
            checkTrigger={trigger}
            noValidate
            onCheck={errors => {
              state.checks.push(errors);
              updateButton('check', errors);
              if (options.reentrant) flushSync(() => setOtherMounted(false));
            }}
            onError={errors => updateButton('error', errors)}
            onSubmit={() => state.validSubmits++}
          >
            {fieldMounted && (
              <Form.Group controlId="pointer-field">
                <Form.Label>Value</Form.Label>
                <Form.Control
                  name="field"
                  {...(options.number ? { accepter: NumberInput } : {})}
                  rule={rule}
                  errorPlacement="static"
                  onBlur={() => {
                    state.blurs++;
                    if (options.disableOnBlur) setDisabled(true);
                    if (options.removeOnBlur) setButtonMounted(false);
                  }}
                />
              </Form.Group>
            )}
            {!options.external && button}
          </Form>
        )}
        {options.external && button}
        {otherMounted && (options.action === 'unmount-form' || options.reentrant) && (
          <Form aria-label="Other" onCheck={() => state.otherChecks++}>
            <Form.Control name="other" aria-label="Other" checkTrigger="blur" rule={rule} />
          </Form>
        )}
        <div id="pointer-foreign" style={{ position: 'fixed', left: 600, top: 450 }}>
          Capture target
        </div>
      </>
    );
    return iframe ? createPortal(content, owner.body) : content;
  }
  createRoot(document.querySelector('#root')!).render(<Probe />);
}

void mount();
