import React, { useRef, useState } from 'react';
import ReactDOM, { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Uploader, { type FileType, type UploaderInstance } from '../Uploader';
import '../styles/index.scss';

interface Options {
  scenario: string;
  mode: string;
  controlled: boolean;
  strict: boolean;
}
const root = createRoot(document.getElementById('root')!);
let generation = 0;
const record = {
  approvals: [] as string[],
  uploads: [] as string[],
  aborts: [] as { name: string; trusted: boolean }[],
  success: [] as { name: string; trusted: boolean }[],
  completions: [] as { completed: string[]; failed: string[] }[]
};
const names = (files: FileType[]) => files.map(file => file.name!);
function Fixture({ scenario, mode, controlled }: Options) {
  const ref = useRef<UploaderInstance>(null);
  const saved = useRef<UploaderInstance | null>(null);
  const [visible, setVisible] = useState(true);
  const [files] = useState<FileType[]>(() =>
    ['alpha', 'beta'].map(name => ({
      fileKey: name,
      name: `${name}.txt`,
      status: 'inited',
      blobFile: new File([name], `${name}.txt`)
    }))
  );
  const unmount = () => {
    if (ref.current) saved.current = ref.current;
    flushSync(() => setVisible(false));
  };
  return (
    <>
      <button onClick={() => (ref.current || saved.current)?.start()}>Start queue</button>
      <button onClick={unmount}>Unmount uploader</button>
      <output>{visible ? 'mounted' : 'unmounted'}</output>
      {visible && (
        <Uploader
          ref={ref}
          action={`/upload?scenario=${scenario}`}
          autoUpload={false}
          {...(controlled ? { fileList: files } : { defaultFileList: files })}
          shouldUpload={file => {
            record.approvals.push(file.name!);
            if (mode.startsWith('approval')) unmount();
            if (mode.endsWith('resolve') || mode === 'normal') return Promise.resolve(true);
            if (mode.endsWith('reject'))
              return Promise.reject(new Error('expected approval rejection'));
            if (mode.endsWith('pending')) return new Promise<boolean>(() => {});
            return !mode.endsWith('false');
          }}
          onUpload={(file, _data, xhr) => {
            record.uploads.push(file.name!);
            xhr.addEventListener('abort', event =>
              record.aborts.push({ name: file.name!, trusted: event.isTrusted })
            );
            if (mode === 'upload') unmount();
          }}
          onSuccess={(_response, file, event) =>
            record.success.push({ name: file.name!, trusted: event.isTrusted })
          }
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
  snapshot: () => record
};
declare global {
  interface Window {
    __RSUITE_UPLOAD_LIFETIME__: typeof fixture;
  }
}
window.__RSUITE_UPLOAD_LIFETIME__ = fixture;
