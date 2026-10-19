import React from 'react';
import ReactDOM, { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Uploader, { type FileType, type UploaderInstance, type UploaderProps } from '../Uploader';
import '../styles/index.scss';

interface Options {
  scenario: string;
  controlled: boolean;
  listType: UploaderProps['listType'];
  startOnRetry: boolean;
}
const root = createRoot(document.getElementById('root')!);
const record = {
  retries: [] as string[],
  uploads: [] as string[],
  successes: [] as { name: string; trusted: boolean }[],
  errors: [] as { name: string; trusted: boolean }[],
  completions: [] as { completed: string[]; failed: string[] }[],
  retryClicks: [] as boolean[]
};
document.addEventListener('click', event => {
  if ((event.target as Element).closest('[aria-label="Retry"]')) {
    record.retryClicks.push(event.isTrusted);
  }
});
let generation = 0;

function Fixture({ scenario, controlled, listType, startOnRetry }: Options) {
  const uploader = React.useRef<UploaderInstance>(null);
  const [files] = React.useState<FileType[]>(() => [
    {
      fileKey: 'alpha',
      name: 'alpha.txt',
      status: 'error',
      blobFile: new File(['alpha upload bytes'], 'alpha.txt', { type: 'text/plain' })
    },
    {
      fileKey: 'beta',
      name: 'beta.txt',
      status: 'inited',
      blobFile: new File(['beta upload bytes'], 'beta.txt', { type: 'text/plain' })
    }
  ]);
  return (
    <>
      <Uploader
        ref={uploader}
        action={`/upload?scenario=${encodeURIComponent(scenario)}`}
        autoUpload={false}
        listType={listType}
        {...(controlled ? { fileList: files } : { defaultFileList: files })}
        onReupload={file => {
          record.retries.push(file.name!);
          if (startOnRetry) uploader.current?.start(file);
        }}
        onUpload={file => record.uploads.push(file.name!)}
        onSuccess={(_response, file, event) =>
          record.successes.push({ name: file.name!, trusted: event.isTrusted })
        }
        onError={(_error, file, event) =>
          record.errors.push({ name: file.name!, trusted: event.isTrusted })
        }
        onCompletion={(completed, failed) =>
          record.completions.push({
            completed: completed.map(file => file.name!),
            failed: failed.map(file => file.name!)
          })
        }
      />
      <button type="button" onClick={() => uploader.current?.start(files[0])}>
        Start alpha
      </button>
      <button type="button" onClick={() => uploader.current?.start(files[1])}>
        Start beta
      </button>
    </>
  );
}

const fixture = {
  runtime: { react: React.version, reactDOM: ReactDOM.version },
  mount(options: Options) {
    Object.values(record).forEach(values => (values.length = 0));
    flushSync(() => root.render(<Fixture key={++generation} {...options} />));
  },
  snapshot: () => record
};
declare global {
  interface Window {
    __RSUITE_MANUAL_RETRY__: typeof fixture;
  }
}
window.__RSUITE_MANUAL_RETRY__ = fixture;
