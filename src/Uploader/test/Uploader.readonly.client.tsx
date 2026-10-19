import React, { useState } from 'react';
import ReactDOM, { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Uploader from '../Uploader';
import '../styles/index.scss';

type Shape = 'default' | 'button' | 'div';
type Options = {
  shape: Shape;
  readOnly?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  lockOnChange?: boolean;
  fieldset?: boolean;
  preventReset?: boolean;
};
const container = document.getElementById('root')!;
let root = createRoot(container);
let changes: string[][] = [];
let inputClicks: { trusted: boolean; prevented: boolean }[] = [];
let submissions = 0;
let nativeChanges = 0;
let nativeInputs = 0;
let updateDisabled: (value: boolean) => void;
let updateFieldset: (value: boolean) => void;
let updateReadOnly: (value: boolean) => void;

function Fixture({
  shape,
  readOnly: initialReadOnly,
  disabled: initialDisabled,
  multiple,
  lockOnChange,
  fieldset,
  preventReset
}: Options) {
  const [readOnly, setReadOnly] = useState(initialReadOnly);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [fieldsetDisabled, setFieldsetDisabled] = useState(false);
  updateFieldset = value => flushSync(() => setFieldsetDisabled(value));
  updateDisabled = value => flushSync(() => setDisabled(value));
  updateReadOnly = value => flushSync(() => setReadOnly(value));
  const control = (
    <Uploader
      action="/unused"
      autoUpload={false}
      name="attachments"
      readOnly={readOnly}
      disabled={disabled}
      multiple={multiple}
      onChange={files => {
        changes.push(files.map(file => file.name!));
        if (lockOnChange) setReadOnly(true);
      }}
    >
      {shape === 'default' ? undefined : shape === 'button' ? (
        <button type="button">Choose files</button>
      ) : (
        <div>Choose files</div>
      )}
    </Uploader>
  );
  return (
    <form
      onReset={event => {
        if (preventReset) event.preventDefault();
      }}
      onInput={() => nativeInputs++}
      onChange={() => nativeChanges++}
      onSubmit={event => {
        event.preventDefault();
        submissions++;
      }}
      onClick={event => {
        if ((event.target as HTMLElement).matches('input[type="file"]')) {
          inputClicks.push({ trusted: event.isTrusted, prevented: event.defaultPrevented });
        }
      }}
    >
      <button type="button" data-before="">
        Before
      </button>
      {fieldset ? <fieldset disabled={fieldsetDisabled}>{control}</fieldset> : control}
      <button type="button" data-after="">
        After
      </button>
    </form>
  );
}

const fixture = {
  runtime: { react: React.version, reactDOM: ReactDOM.version },
  mount(options: Options) {
    flushSync(() => root.unmount());
    root = createRoot(container);
    changes = [];
    inputClicks = [];
    submissions = 0;
    nativeChanges = 0;
    nativeInputs = 0;
    flushSync(() => root.render(<Fixture {...options} />));
  },
  readOnly(value: boolean) {
    updateReadOnly(value);
  },
  disabled(value: boolean) {
    updateDisabled(value);
  },
  fieldset(value: boolean) {
    updateFieldset(value);
  },
  reset() {
    container.querySelector('form')!.reset();
  },
  removeFirst() {
    const button = container.querySelector<HTMLButtonElement>('.rs-uploader-file-item-btn-remove')!;
    flushSync(() => button.click());
  },
  snapshot() {
    const input = container.querySelector<HTMLInputElement>('input[type="file"]')!;
    return {
      changes: changes.map(files => [...files]),
      inputClicks: [...inputClicks],
      submissions,
      nativeChanges,
      nativeInputs,
      disabled: input.disabled,
      effectiveDisabled: input.matches(':disabled'),
      readOnly: input.readOnly,
      files: [...input.files!].map(file => file.name),
      formFiles: new FormData(input.form!).getAll('attachments').map(file => (file as File).name)
    };
  }
};
window.__RSUITE_UPLOAD_READONLY__ = fixture;

declare global {
  interface Window {
    __RSUITE_UPLOAD_READONLY__: typeof fixture;
  }
}
