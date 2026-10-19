import React, { useState } from 'react';
import ReactDOM, { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Uploader, { type FileType } from '../Uploader';
import '../styles/index.scss';

interface Options {
  mode: string;
  controlled: boolean;
  strict: boolean;
}

const root = createRoot(document.getElementById('root')!);
const record = {
  approvals: [] as string[][],
  changes: [] as string[][],
  uploadCallbacks: [] as string[],
  rejections: [] as { reason: string; trusted: boolean }[]
};
let pending: { resolve: (allowed: boolean) => void; reject: (reason: Error) => void } | undefined;
window.addEventListener('unhandledrejection', event => {
  record.rejections.push({ reason: String(event.reason), trusted: event.isTrusted });
});

function Fixture({ mode, controlled }: Options) {
  const [visible, setVisible] = useState(true);
  const [files, setFiles] = useState<FileType[]>([]);
  return (
    <>
      <button onClick={() => flushSync(() => setVisible(false))}>Unmount uploader</button>
      <output>{visible ? 'mounted' : 'unmounted'}</output>
      {visible && (
        <Uploader
          action="/upload"
          autoUpload={false}
          {...(controlled ? { fileList: files } : {})}
          shouldQueueUpdate={(_files, selected) => {
            record.approvals.push(
              (Array.isArray(selected) ? selected : [selected]).map(file => file.name!)
            );
            if (record.approvals.length > 1 || mode === 'allowed') return Promise.resolve(true);
            if (mode === 'sync false') return false;
            if (mode === 'already rejected')
              return Promise.reject(new Error('Queue approval rejected'));
            return new Promise<boolean>((resolve, reject) => {
              pending = { resolve, reject };
            });
          }}
          onChange={nextFiles => {
            record.changes.push(nextFiles.map(file => file.name!));
            setFiles(nextFiles);
          }}
          onUpload={() => record.uploadCallbacks.push('upload')}
          onSuccess={() => record.uploadCallbacks.push('success')}
          onError={() => record.uploadCallbacks.push('error')}
          onCompletion={() => record.uploadCallbacks.push('completion')}
        />
      )}
    </>
  );
}

const fixture = {
  runtime: { react: React.version, reactDOM: ReactDOM.version },
  mount(options: Options) {
    flushSync(() =>
      root.render(
        options.strict ? (
          <React.StrictMode>
            <Fixture {...options} />
          </React.StrictMode>
        ) : (
          <Fixture {...options} />
        )
      )
    );
  },
  settle(mode: string) {
    if (mode.endsWith('rejected')) pending?.reject(new Error('Queue approval rejected'));
    else pending?.resolve(mode.endsWith('true'));
    pending = undefined;
  },
  snapshot: () => record
};

declare global {
  interface Window {
    __RSUITE_QUEUE_APPROVAL__: typeof fixture;
  }
}
window.__RSUITE_QUEUE_APPROVAL__ = fixture;
