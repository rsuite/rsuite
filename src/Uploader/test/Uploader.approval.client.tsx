import React, { useRef, useState } from 'react';
import ReactDOM, { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Uploader, { type FileType, type UploaderInstance } from '../Uploader';
import '../styles/index.scss';

const root = createRoot(document.getElementById('root')!);
const createFile = (name: string, fileKey = name): FileType => ({
  name: `${name}.txt`,
  fileKey,
  blobFile: new File(['upload bytes '.repeat(32768)], `${name}.txt`),
  status: 'inited'
});
type Options = { controlled?: boolean; strict?: boolean; action: string };
type NativeEvent = { name: string; trusted: boolean };
const record = {
  uploads: [] as string[],
  successes: [] as NativeEvent[],
  progress: [] as (NativeEvent & { percent: number })[],
  aborts: [] as NativeEvent[],
  rejections: [] as { reason: string; trusted: boolean }[],
  errors: [] as string[],
  changes: [] as { names: string[]; trusted: boolean }[],
  removals: [] as string[],
  completions: [] as { completed: string[]; failed: string[] }[],
  clicks: [] as NativeEvent[]
};
const approvals: {
  resolve: (value: boolean) => void;
  reject: (reason: Error) => void;
  settled: boolean;
}[] = [];
const names = (files: FileType[]) => files.map(file => file.name!);
window.addEventListener('unhandledrejection', event => {
  record.rejections.push({ reason: String(event.reason), trusted: event.isTrusted });
});
document.addEventListener('click', event => {
  const button = (event.target as Element).closest('button');
  if (button) {
    record.clicks.push({
      name: button.getAttribute('aria-label') || button.textContent || '',
      trusted: event.isTrusted
    });
  }
});

function Fixture({ controlled: initiallyControlled = false, action }: Options) {
  const ref = useRef<UploaderInstance>(null);
  const [controlled, setControlled] = useState(initiallyControlled);
  const [files, setFiles] = useState(() => [createFile('alpha')]);
  const [visible, setVisible] = useState(true);
  const settle = (value: boolean, all = false) => {
    const pending = approvals.filter(approval => !approval.settled);
    (all ? pending : pending.slice(0, 1)).forEach(approval => {
      approval.settled = true;
      approval.resolve(value);
    });
  };

  return (
    <>
      <button onClick={() => ref.current?.start()}>Start batch</button>
      <button onClick={() => settle(true)}>Approve oldest</button>
      <button onClick={() => settle(true, true)}>Approve all</button>
      <button onClick={() => settle(false)}>Deny oldest</button>
      <button
        onClick={() => {
          const pending = approvals.find(approval => !approval.settled);
          if (pending) {
            pending.settled = true;
            pending.reject(new Error('Upload approval rejected'));
          }
        }}
      >
        Reject oldest
      </button>
      <button onClick={() => setFiles([])}>Clear controlled queue</button>
      <button onClick={() => setFiles([createFile('replacement', 'alpha')])}>Reuse file key</button>
      <button
        onClick={() => {
          setControlled(true);
          setFiles([createFile('beta')]);
        }}
      >
        Next batch
      </button>
      <button onClick={() => setVisible(false)}>Unmount uploader</button>
      {visible && (
        <Uploader
          ref={ref}
          action={action}
          autoUpload={false}
          {...(controlled ? { fileList: files } : { defaultFileList: files })}
          shouldUpload={file => {
            if (file.name === 'beta.txt') return true;
            return new Promise<boolean>((resolve, reject) =>
              approvals.push({ resolve, reject, settled: false })
            );
          }}
          onUpload={(file, _data, xhr) => {
            record.uploads.push(file.name!);
            xhr.addEventListener('abort', event => {
              record.aborts.push({ name: file.name!, trusted: event.isTrusted });
            });
          }}
          onSuccess={(_response, file, event) => {
            record.successes.push({ name: file.name!, trusted: event.isTrusted });
          }}
          onProgress={(percent, file, event) => {
            record.progress.push({ name: file.name!, percent, trusted: event.isTrusted });
          }}
          onError={status => record.errors.push(status.type)}
          onRemove={file => record.removals.push(file.name!)}
          onChange={(files, event) => {
            record.changes.push({ names: names(files), trusted: event.nativeEvent.isTrusted });
          }}
          onCompletion={(completed, failed) => {
            record.completions.push({ completed: names(completed), failed: names(failed) });
          }}
        />
      )}
    </>
  );
}

const fixture = {
  runtime: { react: React.version, reactDOM: ReactDOM.version },
  mount(options: Options) {
    flushSync(() => {
      root.render(
        options.strict ? (
          <React.StrictMode>
            <Fixture {...options} />
          </React.StrictMode>
        ) : (
          <Fixture {...options} />
        )
      );
    });
  },
  snapshot: () => ({ ...record, approvals: approvals.length })
};

declare global {
  interface Window {
    __RSUITE_UPLOAD_APPROVAL__: typeof fixture;
  }
}
window.__RSUITE_UPLOAD_APPROVAL__ = fixture;
