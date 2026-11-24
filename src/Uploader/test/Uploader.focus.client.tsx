import React, { useRef, useState } from 'react';
import ReactDOM, { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Uploader, { type FileType, type UploaderProps } from '../Uploader';
import '../styles/index.scss';

type Options = Pick<UploaderProps, 'listType' | 'removable' | 'disabled' | 'autoUpload' | 'as'> & {
  controlled?: boolean;
  single?: boolean;
  shadow?: boolean;
  callback?:
    | 'outside'
    | 'blur'
    | 'outside-then-blur'
    | 'unmount'
    | 'hide-trigger'
    | 'hide-next'
    | 'make-readonly';
  trigger?: 'link' | 'aria-disabled-link' | 'hidden' | 'nonfocusable';
  keepPointerFocus?: boolean;
  scenario: string;
};
const container = document.getElementById('root')!;
let root = createRoot(container);
let generation = 0;
const record = {
  removals: [] as string[],
  retries: [] as string[],
  successes: 0,
  submissions: 0,
  trustedClicks: [] as boolean[]
};

function activeElement(): Element | null {
  let element = document.activeElement;
  while (element?.shadowRoot?.activeElement) element = element.shadowRoot.activeElement;
  return element;
}

function Fixture({
  controlled,
  single,
  callback,
  trigger,
  keepPointerFocus,
  scenario,
  ...props
}: Omit<Options, 'shadow'>) {
  const after = useRef<HTMLButtonElement>(null);
  const [shown, setShown] = useState(true);
  const [hideTrigger, setHideTrigger] = useState(false);
  const [hideNext, setHideNext] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [files, setFiles] = useState<FileType[]>(
    (single ? ['alpha'] : ['alpha', 'beta', 'gamma']).map(name => ({
      name: `${name}.txt`,
      fileKey: name,
      status: 'error',
      blobFile: new File(['upload bytes'], `${name}.txt`, { type: 'text/plain' })
    }))
  );
  const completeAction = () => {
    if (callback === 'outside' || callback === 'outside-then-blur' || callback === 'unmount')
      after.current?.focus();
    if (callback === 'blur' || callback === 'outside-then-blur')
      (activeElement() as HTMLElement)?.blur();
    if (callback === 'unmount') setShown(false);
    if (callback === 'hide-trigger') setHideTrigger(true);
    if (callback === 'hide-next') setHideNext(true);
    if (callback === 'make-readonly') setReadOnly(true);
  };
  const children =
    trigger === 'link' || trigger === 'aria-disabled-link' ? (
      <a href="#choose" aria-disabled={trigger === 'aria-disabled-link' || undefined}>
        Choose files
      </a>
    ) : trigger === 'nonfocusable' ? (
      <span>Choose files</span>
    ) : trigger === 'hidden' || hideTrigger ? (
      <button type="button" style={{ display: 'none' }}>
        Choose files
      </button>
    ) : undefined;

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        record.submissions++;
      }}
      onMouseDownCapture={event => {
        if (keepPointerFocus && (event.target as Element).closest('[aria-label^="Remove file:"]'))
          event.preventDefault();
      }}
      onClickCapture={event => {
        if ((event.target as Element).closest('[aria-label^="Remove file:"], [aria-label="Retry"]'))
          record.trustedClicks.push(event.nativeEvent.isTrusted);
      }}
    >
      {hideNext && <style>{'.rs-uploader-file-item:nth-child(2) { display: none; }'}</style>}
      <button type="button">Before uploader</button>
      {shown && (
        <Uploader
          {...props}
          readOnly={readOnly}
          aria-label="Attachments"
          action={`/upload?scenario=${encodeURIComponent(scenario)}`}
          {...(controlled ? { fileList: files } : { defaultFileList: files })}
          onChange={next => setFiles(next)}
          onRemove={file => {
            record.removals.push(file.name!);
            completeAction();
          }}
          onReupload={file => {
            record.retries.push(file.name!);
            completeAction();
          }}
          onSuccess={() => {
            record.successes++;
          }}
        >
          {children}
        </Uploader>
      )}
      <button type="button" ref={after}>
        After uploader
      </button>
    </form>
  );
}

const fixture = {
  runtime: { react: React.version, reactDOM: ReactDOM.version },
  mount({ shadow, ...options }: Options) {
    record.removals.length = 0;
    record.retries.length = 0;
    record.trustedClicks.length = 0;
    record.successes = 0;
    record.submissions = 0;
    if (shadow) {
      flushSync(() => root.unmount());
      const host = document.createElement('div');
      container.replaceChildren(host);
      const shadowRoot = host.attachShadow({ mode: 'open' });
      document.head
        .querySelectorAll('style')
        .forEach(style => shadowRoot.appendChild(style.cloneNode(true)));
      root = createRoot(shadowRoot.appendChild(document.createElement('div')));
    }
    flushSync(() => root.render(<Fixture key={++generation} {...options} />));
  },
  active: () => {
    const element = activeElement();
    return {
      tag: element?.tagName,
      label: element?.getAttribute('aria-label'),
      text: element === document.body ? null : element?.textContent
    };
  },
  snapshot: () => record
};

declare global {
  interface Window {
    __RSUITE_UPLOAD_FOCUS__: typeof fixture;
  }
}
window.__RSUITE_UPLOAD_FOCUS__ = fixture;
