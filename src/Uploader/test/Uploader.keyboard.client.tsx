import React, { useState } from 'react';
import ReactDOM, { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Uploader, { type FileType, type UploaderProps } from '../Uploader';
import '../styles/index.scss';

type Options = Pick<
  UploaderProps,
  'listType' | 'disabledFileItem' | 'readOnly' | 'plaintext' | 'removable'
> & { controlled?: boolean; scenario: string };
const root = createRoot(document.getElementById('root')!);
const record = {
  removals: [] as string[],
  retries: [] as string[],
  changes: [] as { names: string[]; trusted: boolean }[],
  successes: [] as { name: string; trusted: boolean }[],
  clicks: [] as { name: string; trusted: boolean }[],
  submissions: 0
};
let generation = 0;

document.addEventListener('click', event => {
  const label = (event.target as Element).closest('[aria-label]')?.getAttribute('aria-label');
  if (label === 'Retry' || label === 'Remove file: alpha.png') {
    record.clicks.push({ name: label, trusted: event.isTrusted });
  }
});

function Fixture({ controlled, scenario, ...props }: Options) {
  const [files, setFiles] = useState<FileType[]>([
    {
      name: 'alpha.png',
      fileKey: 'alpha',
      status: 'error',
      blobFile: new File(['upload bytes'], 'alpha.png', { type: 'image/png' }),
      url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a4t8AAAAASUVORK5CYII='
    }
  ]);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        record.submissions++;
      }}
    >
      <button type="button">Before uploader</button>
      <Uploader
        {...props}
        action={`/upload?scenario=${encodeURIComponent(scenario)}`}
        {...(controlled ? { fileList: files } : { defaultFileList: files })}
        onRemove={file => record.removals.push(file.name!)}
        onReupload={file => record.retries.push(file.name!)}
        onChange={(next, event) => {
          setFiles(next);
          record.changes.push({
            names: next.map(file => file.name!),
            trusted: event.nativeEvent.isTrusted
          });
        }}
        onSuccess={(_response, file, event) => {
          record.successes.push({ name: file.name!, trusted: event.isTrusted });
        }}
      />
      <button type="button">After uploader</button>
    </form>
  );
}

const fixture = {
  runtime: { react: React.version, reactDOM: ReactDOM.version },
  mount(options: Options) {
    record.removals.length = 0;
    record.retries.length = 0;
    record.changes.length = 0;
    record.successes.length = 0;
    record.clicks.length = 0;
    record.submissions = 0;
    flushSync(() => root.render(<Fixture key={++generation} {...options} />));
  },
  snapshot: () => record
};

declare global {
  interface Window {
    __RSUITE_UPLOAD_KEYBOARD__: typeof fixture;
  }
}

window.__RSUITE_UPLOAD_KEYBOARD__ = fixture;
