import React, { cloneElement, useRef, useState } from 'react';
import ReactDOM, { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Uploader, { type FileType, type UploaderProps } from '../Uploader';
import '../styles/index.scss';

type Mode =
  | 'normal'
  | 'no-image'
  | 'no-handler'
  | 'disabled-file'
  | 'disabled-upload'
  | 'readonly'
  | 'plaintext'
  | 'custom-default'
  | 'custom-owned'
  | 'move-focus'
  | 'focus-next';
interface Options {
  listType: UploaderProps['listType'];
  mode?: Mode;
  status?: FileType['status'];
}
const root = createRoot(document.getElementById('root')!);
let generation = 0;
const image =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><rect width="60" height="60" fill="#3498ff"/></svg>'
  );
const record = {
  previews: [] as { name: string; trusted: boolean; type: string; target: string }[],
  submissions: 0,
  custom: 0
};

function Fixture({ listType, mode = 'normal', status = 'finished' }: Options) {
  const after = useRef<HTMLButtonElement>(null);
  const [removable, setRemovable] = useState(true);
  const [files, setFiles] = useState<FileType[]>(
    (mode === 'focus-next' ? ['alpha.txt', 'beta.txt', 'gamma.txt'] : ['example.png']).map(
      name => ({
        name,
        fileKey: name,
        url: mode === 'no-image' ? undefined : image,
        status,
        progress: 50
      })
    )
  );
  const custom = (slot: string, element: React.ReactNode) =>
    mode === 'custom-owned' ? (
      <a href="#consumer-preview" aria-label={`Custom ${slot}`} onClick={() => record.custom++}>
        Custom {slot}
      </a>
    ) : (
      <span style={{ display: 'contents' }}>
        {cloneElement(element as React.ReactElement, { [`data-custom-${slot}`]: 'true' })}
      </span>
    );
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        record.submissions++;
      }}
    >
      <button type="button">Before uploader</button>
      <Uploader
        listType={listType}
        aria-label="Upload files"
        action="/unused"
        fileList={files}
        onChange={setFiles}
        removable={removable}
        onRemove={() => {
          if (mode === 'focus-next') setRemovable(false);
        }}
        disabledFileItem={mode === 'disabled-file'}
        disabled={mode === 'disabled-upload'}
        readOnly={mode === 'readonly'}
        plaintext={mode === 'plaintext'}
        renderFileInfo={
          mode.startsWith('custom-') ? (_file, element) => custom('filename', element) : undefined
        }
        renderThumbnail={
          mode.startsWith('custom-') ? (_file, element) => custom('thumbnail', element) : undefined
        }
        onPreview={
          mode === 'no-handler'
            ? undefined
            : (file, event) => {
                record.previews.push({
                  name: file.name!,
                  type: event.type,
                  trusted: event.nativeEvent.isTrusted,
                  target: (event.currentTarget as HTMLElement).tagName
                });
                if (mode === 'move-focus') after.current?.focus();
              }
        }
      />
      <button type="button" ref={after}>
        After uploader
      </button>
    </form>
  );
}

const fixture = {
  runtime: { react: React.version, reactDOM: ReactDOM.version },
  mount(options: Options) {
    record.previews.length = 0;
    record.submissions = 0;
    record.custom = 0;
    flushSync(() => root.render(<Fixture key={++generation} {...options} />));
  },
  snapshot: () => record
};
declare global {
  interface Window {
    __RSUITE_PREVIEW__: typeof fixture;
  }
}
window.__RSUITE_PREVIEW__ = fixture;
