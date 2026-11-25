import React, { useRef, useState } from 'react';
import ReactDOM, { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Uploader, { type FileType, type UploaderInstance } from '../Uploader';
import '../styles/index.scss';

interface Options {
  scenario: string;
  controlled: boolean;
  strict: boolean;
  approval?: boolean;
  typed?: boolean;
  abortOnUpload?: boolean;
}
const file = (name: string, fileKey: string | number = name): FileType => ({
  name: `${name}.txt`,
  fileKey,
  blobFile: new File(['upload bytes '.repeat(8192)], `${name}.txt`),
  status: 'inited'
});
const root = createRoot(document.getElementById('root')!);
const names = (files: FileType[]) => files.map(file => file.name!);
const record = {
  uploads: [] as string[],
  successes: [] as string[],
  errors: [] as string[],
  aborts: [] as { name: string; trusted: boolean }[],
  completions: [] as { completed: string[]; failed: string[] }[],
  removals: [] as string[],
  removalClicks: [] as boolean[]
};
const requests: XMLHttpRequest[] = [];
const approvals: ((approved: boolean) => void)[] = [];
let generation = 0;
document.addEventListener('click', event => {
  if ((event.target as Element).closest('[aria-label^="Remove file:"]')) {
    record.removalClicks.push(event.isTrusted);
  }
});

function Fixture(options: Options) {
  const ref = useRef<UploaderInstance>(null);
  const saved = useRef<UploaderInstance | undefined>(undefined);
  const [controlled, setControlled] = useState(options.controlled);
  const [files, setFiles] = useState(() =>
    options.typed ? [file('alpha', 7), file('gamma', '7')] : [file('alpha')]
  );
  const [visible, setVisible] = useState(true);
  return (
    <>
      <button
        onClick={() => {
          saved.current = ref.current!;
          for (let index = 0; index < 2; index++) {
            if (options.approval) ref.current?.start();
            else ref.current?.start(files[0]);
          }
        }}
      >
        Start twice
      </button>
      <button onClick={() => ref.current?.start(files[0])}>Start first</button>
      <button onClick={() => ref.current?.start(files[1])}>Start other</button>
      <button onClick={() => ref.current?.start({ ...file('orphan'), fileKey: undefined })}>
        Start unkeyed
      </button>
      <button onClick={() => approvals.splice(0).forEach(resolve => resolve(true))}>
        Approve all
      </button>
      <button onClick={() => requests[0]?.abort()}>Abort first</button>
      <button onClick={() => setVisible(false)}>Unmount uploader</button>
      <button onClick={() => saved.current?.start(files[0])}>Retained start</button>
      <button
        onClick={() => {
          setControlled(true);
          setFiles([file('gamma', files[0].fileKey)]);
        }}
      >
        Replace blob
      </button>
      <button
        onClick={() => {
          setControlled(true);
          setFiles([file('beta')]);
          setVisible(true);
        }}
      >
        Next batch
      </button>
      {visible && (
        <Uploader
          ref={ref}
          autoUpload={false}
          action={`/upload?scenario=${encodeURIComponent(options.scenario)}`}
          {...(controlled ? { fileList: files } : { defaultFileList: files })}
          shouldUpload={
            options.approval
              ? () => new Promise<boolean>(resolve => approvals.push(resolve))
              : undefined
          }
          onUpload={(file, _data, xhr) => {
            requests.push(xhr);
            record.uploads.push(file.name!);
            xhr.addEventListener('abort', event =>
              record.aborts.push({ name: file.name!, trusted: event.isTrusted })
            );
            if (options.abortOnUpload && file.name !== 'beta.txt') xhr.abort();
          }}
          onSuccess={(_response, file) => record.successes.push(file.name!)}
          onError={status => record.errors.push(status.type)}
          onRemove={file => record.removals.push(file.name!)}
          onChange={next => {
            if (controlled) setFiles(next);
          }}
          onCompletion={(completed, failed) =>
            record.completions.push({ completed: names(completed), failed: names(failed) })
          }
        />
      )}
    </>
  );
}
const fixture = {
  runtime: { react: React.version, reactDOM: ReactDOM.version },
  mount(options: Options) {
    Object.values(record).forEach(values => (values.length = 0));
    requests.length = 0;
    approvals.length = 0;
    flushSync(() =>
      root.render(
        options.strict ? (
          <React.StrictMode>
            <Fixture key={++generation} {...options} />
          </React.StrictMode>
        ) : (
          <Fixture key={++generation} {...options} />
        )
      )
    );
  },
  snapshot: () => ({
    ...record,
    approvals: approvals.length,
    readyStates: requests.map(xhr => xhr.readyState)
  })
};
declare global {
  interface Window {
    __RSUITE_UPLOAD_REQUESTS__: typeof fixture;
  }
}
window.__RSUITE_UPLOAD_REQUESTS__ = fixture;
