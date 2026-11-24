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
const record = {
  uploads: [] as string[],
  success: [] as { name: string; trusted: boolean }[],
  error: [] as { name: string; trusted: boolean }[],
  completions: [] as { completed: string[]; failed: string[] }[],
  thrown: [] as { name: string; sameError: boolean }[]
};
let generation = 0;
const names = (files: FileType[]) => files.map(file => file.name!);

function Fixture({ scenario, mode, controlled }: Options) {
  const ref = useRef<UploaderInstance>(null);
  const fault = useRef(new Error(`expected ${mode} callback failure`));
  const [invalid, setInvalid] = useState(mode.startsWith('setup'));
  const [files] = useState<FileType[]>(() =>
    ['alpha', 'beta', 'gamma'].map(name => ({
      fileKey: name,
      name: `${name}.txt`,
      status: 'inited',
      blobFile: new File([name], `${name}.txt`)
    }))
  );
  const start = (file: FileType) => {
    try {
      ref.current!.start(file);
    } catch (error) {
      record.thrown.push({ name: (error as Error).name, sameError: error === fault.current });
    }
  };
  const terminal = (current: FileType, event: ProgressEvent, failed: boolean) => {
    record[failed ? 'error' : 'success'].push({ name: current.name!, trusted: event.isTrusted });
    if (current.name !== 'alpha.txt') return;
    if (mode === 'success' || mode === 'error' || mode.startsWith('reentrant')) {
      if (mode.startsWith('reentrant')) ref.current!.start(files[1]);
      throw fault.current;
    }
  };
  return (
    <>
      <button onClick={() => start(files[0])}>Start alpha</button>
      <button onClick={() => start(files[1])}>Start beta</button>
      <button onClick={() => start(files[2])}>Start gamma</button>
      <button onClick={() => setInvalid(true)}>Break configuration</button>
      <button onClick={() => setInvalid(false)}>Repair configuration</button>
      <output>{invalid ? 'invalid' : 'valid'}</output>
      <Uploader
        ref={ref}
        action={invalid && mode.includes('url') ? 'http://[' : `/upload?scenario=${scenario}`}
        headers={invalid && mode.includes('header') ? { 'invalid header': 'value' } : {}}
        autoUpload={false}
        {...(controlled ? { fileList: files } : { defaultFileList: files })}
        onUpload={current => {
          record.uploads.push(current.name!);
          if (mode === 'upload' && current.name === 'alpha.txt') throw fault.current;
        }}
        onSuccess={(_response, current, event) => terminal(current, event, false)}
        onError={(_status, current, event) => terminal(current, event, true)}
        onCompletion={(completed, failed) => {
          record.completions.push({ completed: names(completed), failed: names(failed) });
          if (mode === 'completion' && completed[0]?.name === 'alpha.txt') throw fault.current;
        }}
      />
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
    __RSUITE_UPLOAD_EXCEPTIONS__: typeof fixture;
  }
}
window.__RSUITE_UPLOAD_EXCEPTIONS__ = fixture;
