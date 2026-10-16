import React from 'react';
import ReactDOM, { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Uploader, { type UploaderProps, type UploaderInstance, type FileType } from '../Uploader';
import '../styles/index.scss';

const svg = (color: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><rect width="60" height="60" fill="${color}"/></svg>`;
const contents = { first: svg('blue'), second: svg('green') };
const files = {
  first: new File([contents.first], 'first.svg', { type: 'image/svg+xml' }),
  second: new File([contents.second], 'second.svg', { type: 'image/svg+xml' })
};
const images = Object.fromEntries(
  Object.entries(contents).map(([key, value]) => [key, `data:image/svg+xml;base64,${btoa(value)}`])
) as Record<keyof typeof contents, string>;
const NativeReader = window.FileReader;
let reads = 0;
window.FileReader = class extends NativeReader {
  readAsDataURL(file: Blob) {
    reads++;
    super.readAsDataURL(file);
  }
};
interface Options {
  listType: UploaderProps['listType'];
  blob?: keyof typeof files;
  url?: keyof typeof images;
  maxPreviewFileSize?: number;
  progress?: number;
  status?: FileType['status'];
  scenario?: string;
  pending?: boolean;
}
const uploader = React.createRef<UploaderInstance>();
const successes: string[] = [];
const approvals: ((value: boolean) => void)[] = [];
const root = createRoot(document.getElementById('root')!);
const fixture = {
  runtime: { react: React.version, reactDOM: ReactDOM.version },
  images,
  reads: () => reads,
  snapshot: () => ({ successes, approvals: approvals.length }),
  start: () => uploader.current?.start(),
  approve: () => approvals.shift()?.(true),
  render({
    listType,
    blob,
    url,
    maxPreviewFileSize,
    progress = 0,
    status = 'finished',
    scenario,
    pending = false
  }: Options) {
    flushSync(() =>
      root.render(
        <Uploader
          ref={uploader}
          action={scenario ? `/upload?scenario=${encodeURIComponent(scenario)}` : '/unused'}
          shouldUpload={
            pending ? () => new Promise<boolean>(resolve => approvals.push(resolve)) : undefined
          }
          onSuccess={(_response, file) => successes.push(file.blobFile!.name)}
          renderThumbnail={(file, element) => (
            <span
              data-testid="thumbnail-state"
              data-status={file.status}
              data-progress={file.progress}
              data-blob-name={file.blobFile?.name}
              style={{ display: 'contents' }}
            >
              {element}
            </span>
          )}
          autoUpload={false}
          listType={listType}
          maxPreviewFileSize={maxPreviewFileSize}
          fileList={[
            {
              fileKey: 'same',
              name: blob ? files[blob].name : 'image.svg',
              blobFile: blob ? files[blob] : undefined,
              url: url ? images[url] : undefined,
              progress,
              status
            }
          ]}
        />
      )
    );
  }
};
declare global {
  interface Window {
    __RSUITE_THUMBNAIL__: typeof fixture;
  }
}
window.__RSUITE_THUMBNAIL__ = fixture;
